class Countdown {
  constructor() {
    this.intervalId = null;
    this.pauseTimeoutId = null;
    this.remainingTime = 0;
    this.initialTime = 0;
    this.onTickCb = () => {};
    this.onCompleteCb = () => {};
    this.isPaused = false;
  }

  start(seconds = 10, onTick, onComplete) {
    this.stop(); 
    this.initialTime = seconds;
    this.remainingTime = seconds;
    this.onTickCb = onTick || (() => {});
    this.onCompleteCb = onComplete || (() => {});
    this.onTickCb(this.remainingTime);

    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.remainingTime--;
        this.onTickCb(this.remainingTime);

        if (this.remainingTime <= 0) {
          this.stop();
          this.onCompleteCb();
        }
      }
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.clearPauseTimeout();
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false;
    }
  }

  reset() {
    this.stop();
    this.remainingTime = this.initialTime;
    this.isPaused = false;
    this.onTickCb(this.remainingTime);
    this.start(this.initialTime, this.onTickCb, this.onCompleteCb);
  }

  pauseAndReset(pauseDuration) {
    this.pause();
    this.clearPauseTimeout();
    this.pauseTimeoutId = setTimeout(() => {
      this.reset();
    }, pauseDuration * 1000);
  }

  clearPauseTimeout() {
    if (this.pauseTimeoutId) {
      clearTimeout(this.pauseTimeoutId);
      this.pauseTimeoutId = null;
    }
  }
}

module.exports = Countdown;
