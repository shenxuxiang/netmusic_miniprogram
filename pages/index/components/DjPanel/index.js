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
});