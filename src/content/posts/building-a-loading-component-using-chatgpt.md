---
title: "Building a Loading Component Using ChatGPT"
excerpt: "A fun exercise to stretch the limits of ChatGPT and how far it can go in creating entire components and UI. Can AI write a progress bar component for me?"
date: "2023-01-28"
tags:
  - React
  - ChatGPT
  - AI
readingTime: "6 min read"
---

Have you ever seen the red progress bar on Youtube or the blue progress bar on GitHub when navigating from one page to the next?

![youtube loading bar](https://user-images.githubusercontent.com/17012976/215293411-0e52235e-77ce-4077-ba6b-c6297f27f381.gif)


![github progress bar](https://user-images.githubusercontent.com/17012976/215293185-b5dc15c9-c20f-4b57-acb6-2723d720201b.gif)


I like that little component; it's elegant and subtle and perfectly fits with Remix and React Router transitions.

So I decided to build my own


![That was easy](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/90g1l5od3ieh73lylmeu.jpeg)

Here are the rules:

- I am really lazy! Can ChatGPT write for me?
- I want to use React, no vanilla JS
- No external dependencies (duh)
- It needs to support animations

Here we go! 💪

## ChatGPT first attempt:

### Prompt:
"Write a react component that creates a red bar 3px in height with a dynamic width that starts at 0% and start incrementing every 10ms and dissapears when it reaches 100% width with a fade out animation. Reply with code blocks"

```js
import React, { useState, useEffect } from 'react';
import './ProgressBar.css';

const ProgressBar = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWidth(prevWidth => (prevWidth >= 100 ? 100 : prevWidth + 1));
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={`progress-bar ${width === 100 ? 'fade-out' : ''}`}
      style={{ width: `${width}%`, height: '3px' }}
    />
  );
};

export default ProgressBar;
```

```css
.progress-bar {
  background-color: red;
}

.fade-out {
  animation: fade-out 0.5s;
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

That was a good start!
 
![loader](https://user-images.githubusercontent.com/17012976/215224365-cf907d69-abf8-45e4-a944-c3df9a006e0b.gif)

### Next Prompt:

"Now, I want the progress bar to conditional render and mount an unmount when a condition is true or false, when it is unmounted it should fill the width to 100% and then fade out and disappear."

```js
export const ProgressBar2 = ({ show }) => {
  const [width, setWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let intervalId;
    if (show && !isAnimating) {
      setIsAnimating(true);
      intervalId = setInterval(() => {
        setWidth((prevWidth) => {
          if (prevWidth >= 100) {
            return prevWidth;
          }
          return prevWidth + 1;
        });
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [show, isAnimating]);

  useEffect(() => {
    if (!show && width === 100) {
      setTimeout(() => {
        setWidth(0);
        setIsAnimating(false);
      }, 500);
    }
  }, [show, width]);

  if (!show) {
    return null;
  }

  return (
    <div
      className={`progress-bar ${width === 100 ? 'fade-out' : ''}`}
      style={{
        width: `${width}%`,
        height: '3px',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    />
  );
};
```
Prompt:
"What? That doesn't work at all! the bar never appears!"

ChatGPT:
I apologize for the confusion, it looks like my previous response did not include the necessary CSS for the animation.

...

### What CSS? That code doesn't even make sense!

...

Many prompts later... an increasing list of `useEffect` functions, and a  very apologetic ChatGPT, I decided to give up and build it myself.

Boy, that was a big mistake!

## Random trickle:

The width increments were gradual every 10ms, but I want to add some randomness to the bar progress to give the impression that some non-deterministic async operation is actually happening... (Seriously, the bar is an illusion! It doesn't have anything to do with how long the operation takes 😂)

```js
const Bar = (props: ProgressBarProps) => {
  const [width, setWidth] = useState(0);
  const progressSpeed = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prevValue: number) => {
        const random = Math.random() / 100;
        if (prevValue + random >= 0.95) {
          clearInterval(interval);
          return prevValue;
        }
        return prevValue + random;
      });
    }, progressSpeed);
    
    return () => clearInterval(interval);
  }, [progressSpeed]);
...
```
That was easy wasn't it?

## React Animations

You know what's not easy? Animations in React


![Animations in React ](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cbj75pfk5a7qrdn5i3p9.jpeg)


It turns out that Animations in React are a pain!

When the component is unmounted, I want to fill the bar to 100% then show a fade animation. 

In good old JQuery is a one-liner, as simple as:
```js
$('#progress-bar').fadeOut(300, function(){ $(this).remove();});
```
Oh, but not React; React wants you to suffer! (unless you use a library like [react-transition-group](https://github.com/reactjs/react-transition-group/tree/v1-stable), of course.

**But the rules are the rules, and I said no libraries...** 😅

So after consulting with ChatGPT's arch enemy and more reliable predecessor, StackOverflow. I found that you can wrap your component in a container and use a method called [onAnimationEnd](https://reactjs.org/docs/events.html#animation-events) to detect when the animation finishes and then hide the element.

So here is the result:

```js
import React, { useEffect, useState } from 'react';
import './progress-bar.css';

interface ProgressBarProps {
  show: boolean;
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { show } = props;
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) {
      setRender(false);
    }
  };

  return (
    shouldRender && (
      <div
        aria-label="progress-bar-container"
        style={{
          animation: `${show ? '' : 'fadeOut 0.5s'}`,
        }}
        onAnimationEnd={onAnimationEnd}
      >
        <Bar {...props} show={show} />
      </div>
    )
  );
};

const Bar = (props: ProgressBarProps) => {
  const { show } = props;
  const [width, setWidth] = useState(0);
  const progressSpeed = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prevValue: number) => {
        const random = Math.random() / 100;
        if (prevValue + random >= 0.95) {
          clearInterval(interval);
          return prevValue;
        }
        return prevValue + random;
      });
    }, progressSpeed);

    return () => clearInterval(interval);
  }, [progressSpeed, show]);

  return (
    <div
      aria-label="progress-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2147483647,
        backgroundColor: '#FF0000',
        height: '3px',
        width: `${10 + width * 90}%`,
        transition: `width ${progressSpeed}ms`,
        transform: 'translate3d(0, 0, 0)',
      }}
    />
  );
};
```

**It works!**

![loading bar](https://user-images.githubusercontent.com/17012976/215228399-c6c85dbf-acf2-4c8b-9386-9d52a654ad65.gif)

Except it doesn't! There is an annoying "flashing glitch" when the component unmounts that I couldn't be bothered finding out why (I am lying; I spent way too long trying but then gave up)

## Conclusion
Use [nProgress](https://www.npmjs.com/package/nprogress) 😂

That's it!

## Real Conclusion:

This was a fun exercise to stretch the limits of ChatGPT and how far it can go in creating entire components and UI. It did very well with the basics, but when you start adding more complex interactions, it just goes round and round in circles spitting out incoherent and repetitive code. (not without apologising, of course 😅)

Worth noting that I couldn't make the component work 100% either!, mainly due to lack of time (or lack of React expertise 😂).

If anyone wants to judge my midnight coding and fix the bug, and let me know why the glitch happens, here is the link to the code:
https://stackblitz.com/edit/github-9eintn-ru5xtl?file=src%2Fprogress-bar.tsx

## My Conclusion:

I need to get better at React animations.

