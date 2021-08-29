const { queryRecommendProgram, queryRecommendDjRadio, queryRecommendHotRadio } = require('../../../../service/api')

Component({
  options: {
    styleIsolation: 'isolated',
    virtualHost: true,
    pureDataPattern: /^_/,
  },
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    isFirstRender: true,
    recommendProgramList: [],
    recommendDjList: [],
    recommendHotList: [],
  },
  lifetimes: {},
  methods: {
    onPageInit() {
      queryRecommendProgram()
        .then(response => {
          const { programs, code, msg } = response;
          if (code === 200) {
            this.setData({ recommendProgramList: programs });
          } else {
            wx.showToast({ icon: 'none', title: msg })
          }
        });
      queryRecommendDjRadio()
        .then(response => {
          const { djRadios, code, msg } = response;
          if (code === 200) {
            this.setData({ recommendDjList: djRadios });
          } else {
            wx.showToast({ icon: 'none', title: msg })
          }
        });

      queryRecommendHotRadio()
        .then(response => {
          const { djRadios, code, msg } = response;
          if (code === 200) {
            this.setData({ recommendHotList: djRadios });
          } else {
            wx.showToast({ icon: 'none', title: msg })
          }
        });
    },
  },
  observers: {
    visible(value) {
      if (value && this.data.isFirstRender) {
        this.setData({ isFirstRender: false });
        this.onPageInit();
      }
    }
  }
});