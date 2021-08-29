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
      const { playlistId } = event.currentTarget.dataset;
      wx.navigateTo({ url: `/pages/play-list/index?playlistId=${playlistId}` });
    }
  }
});