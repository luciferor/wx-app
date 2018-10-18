Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    current: {
      type: String,
      value: 'homepage',
    }
  },
  data: {
    // 这里是一些组件内部数据
    current: 'homepage'
  },
  methods: {
    // 这里是一个自定义方法
    handleChange({ detail }) {
      this.setData({
        current: detail.key
      });
    }
  }
})