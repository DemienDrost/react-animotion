interface AnimotionOptions {
  name: string;
  duration: string;
  timingFunction?: string;
  start: number;
  end: number;
  ref: React.RefObject<HTMLDivElement>;
}


interface AnimotionState {
  animationName: string;
  progress: number;
  isPaused: boolean;
  isRunning: boolean;
}


interface CSSAnimotionProperties {
  transform?: string; // CSS transform property
  opacity?: number; // CSS opacity property
  transition?: string; // CSS transition property
  animationName?: string; // CSS animation-name property
  animationDuration?: string; // CSS animation-duration property
  animationDelay?: string; // CSS animation-delay property
  animationIterationCount?: string | number; // CSS animation-iteration-count property
  animationDirection?: string; // CSS animation-direction property
  animationTimingFunction?: string; // CSS animation-timing-function property
  animationFillMode?: string; // CSS animation-fill-mode property
  color?: string; // Color of the element
  backgroundColor?: string; // Background color of the element
  fontSize?: string; // Font size of the element
  width?: string; // Width of the element
  height?: string; // Height of the element
  margin?: string; // Margin around the element
  padding?: string; // Padding within the element
  borderRadius?: string; // Border radius of the element
  boxShadow?: string; // Box shadow of the element
}


interface CSSStyles {
  [property: string]: string;
}


interface KeyframeAnimotion {
  keyframes: Keyframes;
  options: AnimotionOptions;
  state: AnimotionState;
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
  AnimotionState,
  CSSAnimotionProperties,
  CSSStyles,
  KeyframeAnimotion,
  Keyframes,
  ScrollAnimotionProperties,
  TransformOptions
}