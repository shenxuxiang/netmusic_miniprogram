Component({
  options: {
    virtualHost: true,
    styleIsolation: 'isolated',
    pureDataPattern: /^_/,
  },
  properties: {
    duration: {
      type: Number,
      value: 0,
    }, 
    currentTime: {
      type: Number,
      value: 0,
    },
  },
  data: {
    playTimeLabel: '00:00',
    durationTimeLabel: '00:00',
    sliderValue: 0,
  },
  lifetimes: {},
  methods: {
    handleChange(event) {
      const { value } = event.detail;
      this.triggerEvent('on-change', { value });
    },
    convertNumToDate(value) {
      const num = Number(value.toFixed(0));
      let minute = Math.floor(num / 60);
      minute = minute < 10 ? `0${minute}` : `${minite}`;
      let second = num % 60;
      second = second < 10 ? `0${second}` : `${second}`;
      return `${minute}:${second}`;
    }
  },
  observers: {
    'duration, currentTime': function(v1, v2) {
      const value = Math.ceil(v2 / v1 * 100);
      this.setData({ 
        sliderValue: value || 0,
        durationTimeLabel: this.convertNumToDate(v1),
        playTimeLabel: this.convertNumToDate(v2),
      });
    }
  }
});