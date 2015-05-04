'use strict';
(function() {
  if ('ontouchend' in window) {
    var customEvent;
    var target = {};
    var touches = {
      start: {},
      end: {},
      diff: {}
    };
    var swipeDistance = 40;
    var holdInterval = 500;
    var holdTimer;

    function initializeTouch(event) {
      target = event.target;
      touches.start = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
      // touchhold
      holdTimer = setTimeout(function() {
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

    function callEvents(event) {
      clearTimeout(holdTimer);
      // tap / taphold / swipeup / swipedown / swipeleft / swiperight / select
      var eventType = '';
      if(!touches.end.x) {
        eventType = 'tap';
      } else if(Math.abs(touches.diff.y) > Math.abs(touches.diff.x)) {
        if(Math.abs(touches.diff.y) > swipeDistance) {
          if(touches.diff.y > 0) eventType = 'swipeup';
          if(touches.diff.y < 0) eventType = 'swipedown';
        }
      } else if(Math.abs(touches.diff.x) > Math.abs(touches.diff.y)) {
        if(Math.abs(touches.diff.x) > swipeDistance) {
          if(touches.diff.x > 0) eventType = 'swipeleft';
          if(touches.diff.x < 0) eventType = 'swiperight';
        }
      }
      if(eventType) {
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
