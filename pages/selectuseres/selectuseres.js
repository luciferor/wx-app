Page({
  data: {
    cities: [
      {"id":1,"name":"张三"},
      {"id":2,"name":"李四"},
      {"id":3,"name":"王二"},
      {"id":4,"name":"麻子"}
    ]
  },
  onChange(event) {
    console.log(event.detail, '点击右侧菜单回调日期')
  },
  onReady() {
    let storeCity = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    })
    cities.forEach((item) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      storeCity[index].list.push({
        name: item.name,
        key: firstName
      });
    })
    this.data.cities = storeCity;
    this.setData({
      cities: this.data.cities
    })
  }
});