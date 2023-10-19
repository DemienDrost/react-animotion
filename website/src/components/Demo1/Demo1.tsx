import {
  StickyContainer,
  Sticky,
  useAnimotionHelpers,
  KeyframeAnimotion,
} from "react-animotion";
import { CodeBlock, dracula } from "react-code-blocks";
import styles from "./Demo1.module.scss";
import { useEffect, useRef, useState } from "react";

const Demo1 = () => {
  const [percentageProgressed, setPercentageProgressed] = useState(0);
  const { tween } = useAnimotionHelpers();

  const block1ref = useRef(null);
  const block2ref = useRef(null);

  useEffect(() => {
    const animations: KeyframeAnimotion[] = [
      {
        options: {
          name: "block--1",
          start: 0,
          end: 0.75,
          ref: block1ref,
        },
        keyframes: {
          0: {
            opacity: 1,
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
        options: {
          name: "block--2",
          start: 0.25,
          end: 1,
          ref: block2ref,
        },
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

    tween(animations, percentageProgressed);
  }, [percentageProgressed, tween]);

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
