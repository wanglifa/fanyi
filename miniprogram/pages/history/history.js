// pages/userConsole/userConsole.js
const app = getApp()
Page({

  data: {
    history: []
  },

  onShow(){
    this.setData({ 'history': wx.getStorageSync('history')})
  },
  onTapItem(e){
    wx.reLaunch({
      url: `/pages/index/index?query=${e.currentTarget.dataset.query}`,
    })
  }
  
})