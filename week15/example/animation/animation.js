// 管理多个动画，时间线
export class Timeline {
  constructor() {
    this.animations = [];
    this.requstId = null;
    this.state = 'inited';
    this.tick = () => {
      let t = Date.now() - this.startTime;
      // console.log('t: ', t);
      let animations = this.animations.filter(
        (animation) => !animation.finished
      );
      for (const animation of this.animations) {
        // t = animation.duration + animation.delay;

        let {
          object,
          property,
          start,
          end,
          timingFunction,
          delay,
          template,
          duration,
          startTime,
        } = animation;
        console.log('animation: ', startTime);

        let procession = timingFunction((t - delay - startTime) / duration); // 0 - 1 之间的数字

        if (t > duration + delay + startTime) {
          procession = 1;
          animation.finished = true; // 设置一个动画已结束的标志位
        }
        // console.log('procession: ', procession);
        let value = animation.valueFromProgression(procession);

        object[property] = template(value);
      }
      if (animations.length) {
        this.requstId = requestAnimationFrame(this.tick);
      }
    };
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.pauseTime = Date.now();
    if (this.requstId !== null) {
      cancelAnimationFrame(this.requstId);
    }
  }

  resume() {
    if (this.state !== 'paused') return;
    this.state = 'playing';
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  start() {
    if (this.state !== 'inited') return;
    this.state = 'playing';
    this.startTime = Date.now();
    console.log('todo', this);
    this.tick();
  }

  restart() {
    if (this.state === 'playing') {
      this.pause();
    }
    // this.animations = [];
    this.requstId = null;
    this.state = 'inited';
    this.startTime = Date.now();
    this.pauseTime = null;
    this.start();
  }

  add(animation, startTime) {
    this.animations.push(animation);
    animation.finished = false;
    if (this.state === 'playing') {
      animation.startTime =
        startTime != void 0 ? startTime : Date.now() - this.startTime;
    } else {
      animation.startTime = startTime != void 0 ? startTime : 0;
    }
    console.log('animation.startTime: ', animation.startTime);
  }
}

export class Animation {
  constructor(
    object,
    property,
    start,
    end,
    duration,
    delay,
    timingFunction,
    template
  ) {
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    // 对应ease linear什么的
    this.timingFunction = timingFunction;
  }

  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start);
  }
}

export class ColorAnimation {
  constructor(
    object,
    property,
    start,
    end,
    duration,
    delay,
    timingFunction,
    template
  ) {
    this.object = object;
    this.template = template || ((v) => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
    this.property = property;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    // 对应ease linear什么的
    this.timingFunction = timingFunction;
  }

  valueFromProgression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a),
    };
  }
}

/*
let animation = new Animation(object, property, start, end, duration, delay, timingFunction)
let animation2 = new Animation(object2, property2, start, end, duration, delay, timingFunction)

let timelint = new Timeline

timeline.add(animation)
timeline.add(animation2)

animation.start()
animation2.start()
animation.stop()

animation.pause()
animation.stop()
*/
