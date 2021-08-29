Component({
  properties: {
    navList: {
      type: Array, 
      value: [],
    },
    activeKey: {
      type: String,
      value: '',
    },
  },
  data: {
    indicatorNum: 0,
  },
  options: {
    virtualHost: true,
    styleIsolation: 'isolated',
    _pureDataPattern: /^_/,
  },
  lifetimes: {},
  methods: {
    handleClick(event) {
      const { index } = event.currentTarget.dataset;
      const activeKey = this.data.navList[index].id;
      this.triggerEvent('change-tab', { key: activeKey });
    }
  },
  observers: {
    activeKey(value) {
      const index = this.data.navList.findIndex(item => item.id === value);
      if (index < 0) return;

      this.setData({ indicatorNum: index });
    },
  },
});