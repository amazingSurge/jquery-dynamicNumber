export default {
  from: 0,
  to: 100,
  duration: 1000,
  decimals: 0,
  format: function(n, options) {
    return n.toFixed(options.decimals);
  },
  percentage: {
    decimals: 0
  },
  currency: {
    indicator: '$',
    size: 3,
    decimals: '2',
    separator: ',',
    decimalsPoint: '.'
  },
  group: {
    size: 3,
    decimals: '2',
    separator: ',',
    decimalsPoint: '.'
  }
};
