const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    curLang: {},
    langList: app.globalData.langList
  },
  //当change这个页面显示/切入前台时触发
  onShow(){
    this.setData({ 'curLang': app.globalData.curLang})
  },
  onTapItem(e){
    //存储所有以data-开头的属性的值，你在页面上定义的data-chs="{{language.chs}}" data-lang="{{language.lang}}" data-index="{{index}}比如你点击中文，langObj就是{chs: "中文", index: 1, lang: "zh"}，这里键名与data-后面的对应
    let langObj = e.currentTarget.dataset
    wx.setStorageSync("curLang", langObj)
    this.setData({"curLang": langObj})
    app.globalData.curLang = langObj
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})