interface AnimotionOptions {
  name: string;
  start: number;
  end: number;
  ref: React.RefObject<HTMLDivElement>;
}

interface CSSAnimotionProperties {
  [key: string]: number;
}

interface KeyframeAnimotion {
  keyframes: Keyframes;
  options: AnimotionOptions;
}

interface Keyframes {
  [percentage: string]: CSSAnimotionProperties;
}

interface ScrollAnimotionProperties {
  scrollTrigger: string; // Selector for the scroll trigger element
  scrollDuration: string; // Animotion duration
  scrollOffset: string; // Offset from the trigger element
  /* Add other scroll-specific properties */
}

interface TransformOptions {
  rotate?: string;
  scale?: string;
  skewX?: string;
  skewY?: string;
  /* Add other transform options as needed */
}

export {
  AnimotionOptions,
  CSSAnimotionProperties,
  KeyframeAnimotion,
  Keyframes,
  ScrollAnimotionProperties,
  TransformOptions,
};
