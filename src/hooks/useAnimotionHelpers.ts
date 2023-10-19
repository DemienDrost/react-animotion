import { KeyframeAnimotion } from "../common/types";

export default function useAnimotionHelpers() {
  const getStyle = (property: string, value: number | string) => {
    let newProperty: string;
    let newValue: string | number;
    switch (property) {
      case "y":
        newProperty = "transform";
        newValue = `translateY(${value}px)`;
        break;
      case "opacity":
        newProperty = property;
        newValue = value;
        break;
      default:
        newProperty = property;
        newValue = value + "px";
        break;
    }

    return [newProperty, newValue];
  };

  const tween = (
    animations: KeyframeAnimotion[],
    percentageProgressed: number
  ) => {
    animations.forEach((animation) => {
      if (
        percentageProgressed >= animation.options.start &&
        percentageProgressed <= animation.options.end
      ) {
        const maxRange = animation.options.end - animation.options.start;
        const internalProgress =
          (percentageProgressed - animation.options.start) / maxRange;

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
          if (!keyframe || !keyframe[0] || !keyframe[1] ) return;

          const [property, value] = getStyle(
            keyframe[0].toString(),
            keyframe[1]
          );

          animation.options.ref.current?.style.setProperty(
            property.toString(),
            value.toString()
          );
        });
      } else if (
        percentageProgressed < animation.options.start ||
        percentageProgressed > animation.options.end
      ) {
        let keyframe = animation.keyframes[Object.keys(animation.keyframes)[0]];
        if (percentageProgressed > animation.options.end) {
          const keys = Object.keys(animation.keyframes);
          keyframe = animation.keyframes[keys[keys.length - 1]];
        }

        Object.keys(keyframe).forEach((key) => {
          const property = key as keyof typeof keyframe;
          const value = keyframe[property] ?? 0;

          const [propertyString, valueString] = getStyle(
            property.toString(),
            value
          );

          animation.options.ref.current?.style.setProperty(
            propertyString.toString(),
            valueString.toString()
          );
        });
      }
    });
  };

  return { getStyle, tween };
}
