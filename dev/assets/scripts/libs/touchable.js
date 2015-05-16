( () => {
  if ('ontouchend' in window) {
    let customEvent;
    let target = {};
    let touches = {
      start: {},
      end: {},
      diff: {}
    };
    let swipeDistance = 40;
    let holdInterval = 500;
    let holdTimer;

    function initializeTouch(event) {
      target = event.target;
      touches.start = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
      // touchhold
      holdTimer = setTimeout(() => {
        customEvent = new Event('touchhold');
        customEvent.touches = touches;
        event.target.dispatchEvent(customEvent);
      }, holdInterval);
    }

    function samplingTouch(event) {
      clearTimeout(holdTimer);
      touches.end = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
      touches.diff.x = touches.start.x - touches.end.x;
      touches.diff.y = touches.start.y - touches.end.y;
      customEvent = new Event('_touchmove');
      customEvent.touches = touches;
      document.dispatchEvent(customEvent);
    }

    function callEvents() {
      clearTimeout(holdTimer);
      // tap / taphold / swipeup / swipedown / swipeleft / swiperight / select
      let eventType = '';
      if (!touches.end.x) {
        eventType = 'tap';
      } else if (Math.abs(touches.diff.y) > Math.abs(touches.diff.x)) {
        if (Math.abs(touches.diff.y) > swipeDistance) {
          if (touches.diff.y > 0) eventType = 'swipeup';
          if (touches.diff.y < 0) eventType = 'swipedown';
        }
      } else if (Math.abs(touches.diff.x) > Math.abs(touches.diff.y)) {
        if (Math.abs(touches.diff.x) > swipeDistance) {
          if (touches.diff.x > 0) eventType = 'swipeleft';
          if (touches.diff.x < 0) eventType = 'swiperight';
        }
      }
      if (eventType) {
        customEvent = new Event(eventType);
        customEvent.touches = touches;
        target.dispatchEvent(customEvent);
      }
      touches = { start: {}, end: {}, diff: {} };
    }

    document.addEventListener('touchstart', initializeTouch);
    document.addEventListener('touchmove', samplingTouch);
    document.addEventListener('touchend', callEvents);
  }
})();
