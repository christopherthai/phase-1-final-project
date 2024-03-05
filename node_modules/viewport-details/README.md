# Viewport details

Get viewport details

[![GitHub release](https://img.shields.io/github/release/bameyrick/viewport-details.svg)](https://github.com/bameyrick/viewport-details/releases)
[![Build Status](https://travis-ci.com/bameyrick/viewport-details.svg?branch=master)](https://travis-ci.com/bameyrick/viewport-details)
[![codecov](https://codecov.io/gh/bameyrick/viewport-details/branch/master/graph/badge.svg)](https://codecov.io/gh/bameyrick/viewport-details)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/7f4bdaa3b82d42a9b96a6f17c80b32bb)](https://www.codacy.com/manual/bameyrick/viewport-details)

## Install

You can install via npm or yarn

### npm

```bash
npm install --save viewport-details
```

### yarn

```bash
yarn add viewport-details
```

## Usage

### Importing

You can import using ES6 imports

```javascript
import { getViewportDetails } from 'viewport-details';
```

### Getting details

```javascript
console.log(getViewportDetails());
```

Will return:

```typescript
interface ViewportDetails {
  /**
   * The width of the viewport
   */
  width: number;

  /**
   * The height of the viewport
   */
  height: number;

  /**
   * The hight of the viewport if the browser controlls have collapsed (e.g. in iOS Safari)
   */
  heightCollapsedControls: number;

  /**
   * The scroll x position of the viewport
   */
  scrollX: number;

  /**
   * The scroll y position of the viewport
   */
  scrollY: number;

  /**
   * Whether the viewport has resized since the last time getViewportDetails was called
   */
  resized: boolean;

  /**
   * Whether the viewport scrolled since the last time getViewportDetails was called
   */
  scrolled: boolean;

  /**
   * The direction in which the user is scrolling on the x axis. (This will not update until getViewportDetails has been called once)
   */
  scrollDirectionX: ScrollDirectionX;

  /**
   * The direction in which the user is scrolling on the y axis. (This will not update until getViewportDetails has been called once)
   */
  scrollDirectionY: ScrollDirectionY;

  /**
   * The previous getViewportDetails result
   */
  previous?: ViewportDetails;

  /**
   * Whether any of the values have changes since the last time getViewport details was called
   */
  changed?: boolean;
}
```

#### Note

`heightCollapsedControls` is the height that the viewport will be once the user has scrolled and the browser controlls shrink, such as on iOS Safari.

`resized` represents whether the viewport resized since the previous animation frame.

`scrolled` represents whether the viewport scrolled since the previous animation frame.

`scrollDirectionX` represents a the direction of scroll. 0 means no movement, 1 means scrolling to the right, and -1 means scrolling to the left.

If you're using TypeScript an enum (`ScrollDirectionX`) is also available, with the options None, Right, and Left.

`scrollDirectionY` represents a the direction of scroll. 0 means no movement, 1 means scrolling down, and -1 means scrolling up.

If you're using TypeScript an enum (`ScrollDirectionY`) is also available, with the options None, Up, and Down.
