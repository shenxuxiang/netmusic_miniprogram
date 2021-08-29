Component({
  options: {
    virtualHost: true,
  },
  properties: {
    visible: {
      type: Boolean,
      value: false,
    }
  },
  data: {
    hasShow: false,
  },
  interval: null,
  observers: {
    visible (value) {
      clearTimeout(this.interval);
      if (value) {
        this.interval = setTimeout(() => {
          this.setData({ hasShow: true });
        }, 2000);
      } else {
        this.setData({ hasShow: false });
      }
    },
  }
})