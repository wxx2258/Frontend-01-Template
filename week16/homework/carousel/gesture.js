export function enableGesture(element) {
  // let element = document.body;

  // let contexts = new Map();
  let contexts = Object.create(null);

  let MOUSE_SYMBOL = Symbol('mouse');

  if (element.ontouchstart !== null) {
    element.addEventListener('mousedown', (event) => {
      contexts[MOUSE_SYMBOL] = Object.create(null);
      start(event, contexts[MOUSE_SYMBOL]);
      let mousemove = (event) => {
        move(event, contexts[MOUSE_SYMBOL]);
      };
      let mouseend = (event) => {
        end(event, contexts[MOUSE_SYMBOL]);
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseend);
      };

      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseend);
    });
  }

  element.addEventListener('touchstart', (event) => {
    for (const touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier]);
    }
  });
  element.addEventListener('touchmove', (event) => {
    for (const touch of event.changedTouches) {
      move(touch, contexts[touch.identifier]);
    }
  });
  element.addEventListener('touchend', (event) => {
    for (const touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });
  element.addEventListener('touchcancel', (event) => {
    for (const touch of event.changedTouches) {
      cancle(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });

  // tap
  // pan  panstrat panmove panend
  // flick  - - -
  // press

  let start = (point, context) => {
    // console.log('point: ', point);
    element.dispatchEvent(
      new CustomEvent('start', {
        startX: point.clientX,
        startY: point.clientY,
        clientX: point.clientX,
        clientY: point.clientY,
      })
    );
    (context.startX = point.clientX), (context.startY = point.clientY);
    // console.log('start: ', context.startX, context.startY);
    context.moves = [];
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    context.timeoutHandler = setTimeout(() => {
      if (context.isPan) return;
      context.isTap = false;
      context.isPan = false;
      context.isPress = true;
      // console.log('pressStart');
      element.dispatchEvent(new CustomEvent('pressStart', {}));
    }, 500);
  };
  let move = (point, context) => {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY;
    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress) {
        element.dispatchEvent(new CustomEvent('presscannel', {}));
      }
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;
      // console.log('panstart');
      {
        let e = new CustomEvent('panstart');
        Object.assign(e, {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY,
        });
        element.dispatchEvent(e);
      }
    }

    if (context.isPan) {
      context.moves.push({
        dx,
        dy,
        t: Date.now(),
      });
      context.moves = context.moves.filter(
        (record) => Date.now() - record.t < 300
      );

      {
        let e = new CustomEvent('pan');
        Object.assign(e, {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY,
        });
        element.dispatchEvent(e);
      }
      // console.log('pan');
    }
    // console.log('move: ', dx, dy);
  };
  let end = (point, context) => {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY;
    if (context.isPan) {
      let record = context.moves[0];
      let speed = Math.sqrt(
        ((record.dx - dx) ** 2 + (record.dy - dy) ** 2) /
          (Date.now() - record.t)
      );

      let isFlick = speed > 2.5;
      if (isFlick) {
        // console.log('flick');
        element.dispatchEvent(
          Object.assign(new CustomEvent('flick', {}), {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
            speed: speed,
          })
        );
      }
      // console.log(context.moves);
      // console.log('panend', speed);
      element.dispatchEvent(
        Object.assign(new CustomEvent('panend', {}), {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY,
          speed: speed,
          isFlick: isFlick,
        })
      );
    }
    if (context.isTap) {
      element.dispatchEvent(new CustomEvent('tap', {}));
    }
    if (context.isPress) {
      // console.log('pressend');
      element.dispatchEvent(new CustomEvent('pressend', {}));
    }
    // console.log('end: ');
    clearTimeout(context.timeoutHandler);
  };
  let cancle = (point, context) => {
    // console.log('cancle');
    element.dispatchEvent(new CustomEvent('cancle', {}));

    clearTimeout(context.timeoutHandler);
  };
}
