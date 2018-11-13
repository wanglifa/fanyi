//index.js
import translate from '../../utils/api.js'
const app = getApp()

Page({
  data: {
    hideClearIcon: true,
    query: '',
    result: null,
    curLang: {}
  },
  //页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数
  onLoad: function(options) {
    //如果当前页面有查询参数，那么直接把查询参数的内容赋给你的query，也就是从历史页面过来，把历史数据的查询参数传过来
    if(options.query){
      this.setData({query: options.query})
    }
  },
  onShow(){
    //如果从历史页面过来，当前设置的语言不是之前的语言
    if(this.data.curLang !== app.globalData.curLang){
      this.setData({'curLang': app.globalData.curLang})
      //当你从历史页面点某个历史过来的时候，它会自动翻译，所以就是触发了onConfirm
      this.onConfirm()
    }
  },
  onInput(e){
    this.setData({query: e.detail.value})
    if(this.data.query){
      this.setData({hideClearIcon: ''})
    }else{
      this.setData({hideClearIcon: true})
    }
  },
  onTapClose(){
    this.setData({query: '',hideClearIcon: true})
    this.setData({result: ''})
  },
  onConfirm(){
    if(!this.data.query) return
    translate(this.data.query,{from: 'auto', to: this.data.curLang.lang})
    .then(res=>{
      this.setData({'result': res.trans_result})
      let history = wx.getStorageSync('history') || []
      history.unshift({query: this.data.query, result: res.trans_result[0].dst})
      history.length = history.length > 10 ? 10 : history.length
      wx.setStorageSync('history', history)
    })
  }

})
