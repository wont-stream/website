import AnimatedCursor from '../../node_modules/animated-cursor/dist/index.modern.js';

AnimatedCursor({
    color: '#FFFFFF',
    outerAlpha: 0.1,
    size: {
        inner: 4,
        outer: 24
    },
    hoverScale: {
        inner: 0.5,
        outer: 1.4
    },
    clickScale: {
        inner: 1.5,
        outer: 0
    }
}).init();