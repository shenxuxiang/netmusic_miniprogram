Component({
  options: {
    virtualHost: true,
    styleIsolation: 'isolated',
    pureDataPattern: /^_/,
  },
  properties: {
    sourceList: {
      type: Array,
      value: [],
    },
  },
  methods: {
    handleClick(event) {
      const { songId } = event.currentTarget.dataset;
      wx.navigateTo({ url: `/pages/play/index?songId=${songId}` });
    }

  }
});