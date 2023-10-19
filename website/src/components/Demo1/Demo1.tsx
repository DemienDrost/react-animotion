import { StickyContainer, Sticky, useAnimotionHelpers } from "react-animotion";
import { CodeBlock, dracula } from "react-code-blocks";
import styles from "./Demo1.module.scss";
import { useEffect, useRef, useState } from "react";

type AnimationType = Array<{
    name: string;
    start: number;
    end: number;
    ref: React.RefObject<HTMLDivElement>;
    keyframes: {
      [key: string]: {
        [key: string]: number | string;
      };
    };
  }>;
  

const Demo1 = () => {
  const [percentageProgressed, setPercentageProgressed] = useState(0);
  const { getStyle } = useAnimotionHelpers();

  const block1ref = useRef(null);
  const block2ref = useRef(null);

  useEffect(() => {
    const animations : AnimationType = [
      {
        name: "block--1",
        start: 0,
        end: 0.75,
        ref: block1ref,
        keyframes: {
          0: {
            opqacity: 1,
            y: -100,
          },
          75: {
            opacity: 1,
            y: -25,
          },
          100: {
            opacity: 0,
            y: 0,
          },
        },
      },
      {
        name: "block--2",
        start: 0.25,
        end: 1,
        ref: block2ref,
        keyframes: {
          0: {
            opqacity: 0,
            y: 100,
          },
          25: {
            opacity: 1,
            y: 75,
          },
          100: {
            opacity: 0,
            y: 0,
          },
        },
      },
    ];

    animations.forEach((animation) => {
      if (
        percentageProgressed >= animation.start &&
        percentageProgressed <= animation.end
      ) {
        const maxRange = animation.end - animation.start;
        const internalProgress =
          (percentageProgressed - animation.start) / maxRange;

        const nextKeyframeIndex = Object.keys(animation.keyframes).findIndex(
          (keyframe) => Number(keyframe) > internalProgress * 100
        );

        if (nextKeyframeIndex === 0 || nextKeyframeIndex === undefined) return;

        const previousKeyframeIndex = nextKeyframeIndex - 1;

        if (previousKeyframeIndex < 0 || previousKeyframeIndex === undefined)
          return;

        const keys = Object.keys(animation.keyframes) as unknown as Array<
          keyof typeof animation.keyframes
        >;

        const nextKeyframe = animation.keyframes[keys[nextKeyframeIndex]];
        const previousKeyframe =
          animation.keyframes[keys[previousKeyframeIndex]];

        const animate = Object.keys(nextKeyframe ?? -1).map((key) => {
          if (!nextKeyframe || !previousKeyframe) return;

          const property = key as keyof typeof nextKeyframe;
          const nextValue = nextKeyframe[property];
          const previousValue = previousKeyframe[property];

          const previousFrameStart = Number(keys[previousKeyframeIndex]);
          const previousFrameEnd = Number(keys[nextKeyframeIndex]);
          const maxFrameRange = previousFrameEnd - previousFrameStart;
          const internalFrameProgress =
            (internalProgress * 100 - previousFrameStart) / maxFrameRange;

          if (
            typeof nextValue === "number" &&
            typeof previousValue === "number"
          ) {
            const value =
              (nextValue - previousValue) * internalFrameProgress +
              previousValue;
            return [property, value];
          }

          return [property, nextValue];
        });

        animate.forEach((keyframe) => {
          if (!keyframe) return;

          const [property, value] = getStyle(
            keyframe[0].toString(),
            keyframe[1]
          );

          animation.ref.current?.style.setProperty(
            property.toString(),
            value.toString()
          );
        });
      } else if (
        percentageProgressed < animation.start ||
        percentageProgressed > animation.end
      ) {
        let keyframe = animation.keyframes[Object.keys(animation.keyframes)[0]];
        if (percentageProgressed > animation.end) {
          const keys = Object.keys(animation.keyframes);
          keyframe = animation.keyframes[keys[keys.length - 1]];
        }

        Object.keys(keyframe).forEach((key) => {
          const property = key as keyof typeof keyframe;
          const value = keyframe[property];

          const [propertyString, valueString] = getStyle(
            property.toString(),
            value
          );

          animation.ref.current?.style.setProperty(
            propertyString.toString(),
            valueString.toString()
          );
        });
      }
    });
  }, [getStyle, percentageProgressed]);

  return (
    <section className={styles.demo_1}>
      <div className="container-fluid">
        <div className="left">
          <StickyContainer
            height="300vh"
            percentageScrolledCallback={(value) =>
              setPercentageProgressed(value)
            }
          >
            <Sticky className={styles.stickyDemo1}>
              <div className="block block--1" ref={block1ref}></div>
              <div className="block block--2" ref={block2ref}></div>
            </Sticky>
          </StickyContainer>
        </div>
        <div className="right">
          <StickyContainer height="300vh">
            <Sticky>
              <div className="center">
                <h2>Keyframe on scroll</h2>
                <CodeBlock
                  text={`
                          <StickyContainer height="300vh">
                              <Sticky>
                                  <div className="block"></div>
                              </Sticky>
                          </StickyContainer>
                      `}
                  language="javascript"
                  showLineNumbers={true}
                  theme={dracula}
                />
              </div>
            </Sticky>
          </StickyContainer>
        </div>
      </div>
    </section>
  );
};

export default Demo1;
