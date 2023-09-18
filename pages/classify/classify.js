// pages/classify/classify.js
import {reqNavList,reqProductList} from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navActive:0,
    navArr:[],
    proArr:[],
    navid:'',
    loading:false,
    isData:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let {idx}=options

   await this.getNavList()
   if(idx){
    this.navChange(idx)
   }
  },
  async getProductList(size=0){
    this.setData({
      loading:true
    })
    let result =await reqProductList({
      navid:this.data.navid,
      size
    })
    if(result.errCode==0){
      this.setData({
        proArr:[...result.data,...this.data.proArr],
        loading:false
      },()=>{
        if(this.data.proArr.length==result.total){
          this.setData({
            isData:true
          })
        }
      })
    }
  },


  async getNavList(){
    let result= await reqNavList()
    // console.log(result);
    if(result.errCode==0){
      this.setData({
        navArr:result.data
      },()=>{
        this.setData({
          navid:this.data.navArr[0]._id
        })
        this.getProductList()
      })
    }
  },

  navChange(e){

    let index=e?.detail?.index ?? e
    let navid=this.data.navArr[index]._id
    this.setData({
      proArr:[],
      isData:false,
      navid,
      navActive:Number(index)
    })    
    this.getProductList()
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
    this.getProductList(this.data.proArr.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})