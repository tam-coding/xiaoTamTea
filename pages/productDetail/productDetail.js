// pages/productDetail/productDetail.js
import {reqProductDetail} from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId:'',
    productDetail:{},
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {id}=options
    this.setData({
      productId:id
    },()=>{
      this.getPrudustDetail()
    })

  },

  async  getPrudustDetail(){
    let result=await reqProductDetail({id:this.data.productId})
    console.log(result);
    if(result.errCode==0){
      wx.setNavigationBarTitle({
        title: result.data.title,
      })
      this.setData({
        productDetail:result.data,
        isEmpty:false
      })
    }
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