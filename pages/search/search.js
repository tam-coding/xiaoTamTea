// pages/search/search.js
import {reqProductList} from '../../api/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList:[],
    productList:[],
    total:0,
    keyword:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let searchKeyArr=wx.getStorageSync('searchKeyArr')
    if(searchKeyArr){
      this.setData({
        historyList:searchKeyArr
      })
    }
    
  },
  onChange(e){
    this.setData({
      keyword:e.detail
    })
  },
  onSearch(){
    let historyTemp=this.data.historyList ||[]
    if(this.data.keyword!=""){
      historyTemp.unshift(this.data.keyword)
      historyTemp=[...new Set(historyTemp)]
      historyTemp=historyTemp.slice(0,10)
      this.setData({
        historyList:historyTemp
      })
      wx.setStorageSync('searchKeyArr', historyTemp)
      this.getData()
    }

  },
 async getData(){
    let result=await reqProductList({
      keyword:this.data.keyword,
      limit:10
    })
    if(result.errCode==0){
      this.setData({
        total:result.total,
        productList:result.data,
         noData:false
         
      })
    }
    if(result.data&&result.data.length==0){
      this.setData({
        noData:true
      })
    }
  },
  onClear(){
    this.setData({
      keyword:'',
      productList:[],
      total:0,
      noData:false
    })
  },
  tapHisItem(e){
    this.setData({
      keyword:e.currentTarget.dataset.value
    })
    this.getData()
  },
  removeHis(){
    this.setData({
      historyList:[],
      total:0,
      keyword:'',
      productList:[],
      noData:false
    })
    wx.removeStorageSync('searchKeyArr')

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})