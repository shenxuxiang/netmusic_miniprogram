Component({
  options: {
    virtualHost: true,
  },
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    status: {
      type: String,
      value: 'done',
    },
  },
  data: {
    text: '上拉加载更多数据',
  },
  observers: {
    status(value) {
      let text = '';
      if (value === 'done') {
        text = '上拉加载更多数据';
      } else if (value === 'loading') {
        text = '努力加载中';
      } else {
        text = '没有跟多数据了';
      }
      this.setData({ text });
    }
  }
});