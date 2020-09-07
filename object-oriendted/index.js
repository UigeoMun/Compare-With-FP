class Clock {
    constructor() {
      this.targetDOM = document.getElementById("time");
      this.interval = 1000;
    }

    serializeClockTime() {
      const date = new Date();
      return {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
      }
    }

    civilianHours(clockTime) {
      return {
        ...clockTime,
        hours: clockTime.hours > 12 ? clockTime.hours - 12 : clockTime.hours
      };
    }

    appendAMPM(clockTime) {
      return {
        ...clockTime,
        ampm: clockTime.hours >= 12 ? "PM" : "AM"
      };
    }

    prependZero(clockTime) {
      return {
        ...clockTime,
        hours: clockTime.hours < 10 ? "0" + clockTime.hours : clockTime.hours,
        minutes:
          clockTime.minutes < 10 ? "0" + clockTime.minutes : clockTime.minutes,
        seconds:
          clockTime.seconds < 10 ? "0" + clockTime.seconds : clockTime.seconds
      };
    }
    
    getClockTime() {
      const clockTime = this.serializeClockTime();
      const appendAMPM = this.appendAMPM(clockTime);
      const civilianed = this.civilianHours(appendAMPM);
      const prependZero = this.prependZero(civilianed);
      return prependZero;
    }

    serialize(clockTime) {
        return `${clockTime.hours}:${clockTime.minutes}:${clockTime.seconds}:${clockTime.ampm}`
    }

    start() {
      setInterval(() => {
        const time = this.getClockTime();
        this.targetDOM.innerHTML = this.serialize(time);
      }, this.interval);
    }

  }
  const clock = new Clock();
  clock.start();