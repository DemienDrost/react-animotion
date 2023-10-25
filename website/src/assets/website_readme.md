# React Animotion

An open source library for React, made by Arcadians.

Animotion powers intricate animations that respond to the user's scroll position and move along a keyframes like timeline. Use Animotion to create effect you might recognize from Apple in their product pages.

# 🐰🎩 Features

React Animotion has out-of-the-box support for:

- Keyframes;
- Sticky views;
- Tweening;

# 🚴🏼💨 Quick start

Install `react-animotion` in your React project using your package manager:

```
npm install react-animotion
```

1: Create a section where you want to 'slow down time', want something to become sticky, or something to happen.

```jsx
import { StickyContainer, Sticky, useAnimotionHelpers } from "react-animotion";

export const MyComponent = () => {
  return (
    <StickyContainer
      height="300vh" // Choose the distance the user has to scroll to pass the sticky element.
    >
      <Sticky>
        <div className="block block--1" />
        <div className="block block--2" />
      </Sticky>
    </StickyContainer>
  );
};
```

2: Create an array of type `KeyframeAnimotion` containing your animations.

```ts
interface KeyframeAnimotion {
  keyframes: Keyframes;
  options: AnimotionOptions;
}

interface Keyframes {
  [percentage: string]: CSSAnimotionProperties;
}

interface AnimotionOptions {
  name: string;
  start: number;
  end: number;
  ref: React.RefObject<HTMLDivElement>;
}
```

```jsx
const animations = [
  {
    options: {
      name: "block--1", // Personal reference
      start: 0, // Start percentage the animation is active (0.00 - 1.00)
      end: 0.75, // End percentage the animation is active (0.00 - 1.00)
      ref: block1ref, // ref to the element,
    },
    keyframes: {
      0: {
        // Keyframe position (0 - 100)
        opacity: 1, // HTML DOM Style object property with numerical value.
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
        opacity: 0,
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
```

3: Trigger the animation by adding a callback to the `StickyContainer`.

```jsx
import { useRef } from "react";
import { StickyContainer, Sticky, useAnimotionHelpers } from "react-animotion";

export const MyComponent = () => {
  const animations = [(...)];
  const { tween } = useAnimotionHelpers();

  const block1ref = useRef(null);
  const block2ref = useRef(null);

  return (
    <StickyContainer
      height="300vh" // Choose the distance the user has to scroll to pass the sticky element.
      percentageScrolledCallback={(percentage) => tween(animations, percentage)}
    >
      <Sticky>
        <div className="block block--1" ref={block1ref} />
        <div className="block block--2" ref={block2ref} />
      </Sticky>
    </StickyContainer>
  );
};
```

4: Scroll the page and see your animotion!

# 🧑🏼‍💻👾 Contribute

For working on the (demo) website, we use pnpm.

```
% pnpm install                           # install packages
% pnpm -F react-animotion rollup         # build the package
% pnpm -F website dev                    # start the website in watch mode
```

For working on the package, fork the repository and resolve the issue before you create a pull request.

# 🧑🏼‍⚖️⚖️ License

React Animotion is MIT licensed.
