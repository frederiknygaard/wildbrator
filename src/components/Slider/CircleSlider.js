const EventEmitter = require("eventemitter3");

class CircleSlider extends EventEmitter {
  constructor(target, options) {
    super();

    // allow both "id" or "#id"
    this.root = target;
    this.outputAngle = 0;

    const defaultOptions = {
      clockwise: false,
      snapMultiplier: 0,
      startOffset: 90,
      maxAngle: 290,
    };

    const mergedOptions = { ...defaultOptions, ...options };

    this.clockwise = mergedOptions.clockwise;
    this.snapMultiplier = mergedOptions.snapMultiplier;
    this.startOffset = mergedOptions.startOffset;
    this.maxAngle = mergedOptions.maxAngle;

    // validation
    if (!this.root) {
      console.error(
        `CircleSlider: Didn't find any element with id ${targetId}`
      );
    }

    this.hc = document.querySelector("#handle-wrapper");

    this.hc.style.cssText = `transform: rotate(${this.startOffset}deg);`;

    this.events = {
      sliderMove: "sliderMove",
      sliderUp: "sliderUp",
    };

    this.active = false;
    this._addEventListeners("mousedown", "mousemove", "mouseup");
    this._addEventListeners("touchstart", "touchmove", "touchend");

    this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
  }

  getAngle() {
    return this.outputAngle;
  }

  setAngle(angle) {
    const rawAngle = this._formatInputAngle(angle);
    this._moveHandle(rawAngle);
  }

  _formatInputAngle(angle) {
    const rawAngle =
      this.clockwise === true
        ? CircleSlider._modulo(Math.round(angle) - 360 + this.startOffset, 360)
        : CircleSlider._modulo(360 - Math.round(angle) + this.startOffset, 360);
    return rawAngle;
  }

  _addEventListeners(startEvent, moveEvent, endEvent) {
    // user presses handle
    this.hc.addEventListener(startEvent, (e) => {
      // prevent text selection
      e.preventDefault();

      if (!this.active) {
        this.active = true;

        // user moves handle
        document.addEventListener(moveEvent, this._mouseMoveHandler, false);

        // user lets go
        const _this = this;
        document.addEventListener(endEvent, function endFunc(ev) {
          _this.active = false;
          document.removeEventListener(
            moveEvent,
            _this._mouseMoveHandler,
            false
          );
          _this.emit(_this.events.sliderUp, _this.outputAngle);

          // remove event listener after this has been fired once
          ev.currentTarget.removeEventListener(endEvent, endFunc, false);
        });
      }
    });
  }

  _mouseMoveHandler(e) {
    //e.preventDefault();
    this._moveHandle(this._getRawAngle(e));
  }

  _moveHandle(rawAngle) {
    let angle = rawAngle;
    // snap handle to multiples of snapMultiplier
    if (this.snapMultiplier) {
      const sm = this.snapMultiplier;
      const delta = Math.abs(angle - Math.round(angle / sm) * sm);
      if (delta <= 5) {
        angle = Math.round(angle / sm) * sm;
      }
    }

    this.outputAngle = this._formatOutputAngle(angle);

    if (this.outputAngle <= this.maxAngle) {
      // move the handle visually
      this.hc.style.cssText = `transform: rotate(${angle}deg);`;

      this.emit(this.events.sliderMove, this.outputAngle);
    }
  }

  _formatOutputAngle(angle) {
    const outputAngle =
      this.clockwise === true
        ? CircleSlider._modulo(360 + Math.round(angle) - this.startOffset, 360)
        : CircleSlider._modulo(360 - Math.round(angle) + this.startOffset, 360);
    return outputAngle;
  }

  _getRawAngle(e) {
    const pivot = CircleSlider._getCenter(this.root);
    let mouse;
    if (e.type === "touchmove") {
      mouse = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    } else {
      mouse = {
        x: e.clientX,
        y: e.clientY,
      };
    }

    const angle =
      CircleSlider._radToDeg(Math.atan2(mouse.y - pivot.y, mouse.x - pivot.x)) %
      360;

    return angle;
  }

  static _getCenter(elem) {
    const rect = elem.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  static _radToDeg(rad) {
    return rad * (180 / Math.PI);
  }

  static _modulo(n, m) {
    return ((n % m) + m) % m;
  }
}

export default CircleSlider;
