// pages/newsDetail/newsDetail.js
import {reqNewsDetail} from '../../api/api'
import dayjs from 'dayjs'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsDetail:{},
    newsId:'',
    showSkeleton:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      newsId:options.id
    })
    this.getNewsDetail()

  },
  async getNewsDetail(){
    let result =await reqNewsDetail({id:this.data.newsId})
    console.log(result);
    if(result.errCode==0&&result.data){
      const formattedDate = dayjs(result.data.publish_date).format('YYYY-MM-DD');
      result.data.publish_date=formattedDate
      result.data.view_count=result.data.view_count >= 1e3 && result.data.view_count < 1e4 ? (result.data.view_count / 1e3).toFixed(1) + 'k' : result.data.view_count >= 1e4 ? (result.data.view_count / 1e4).toFixed(1) + 'w' : result.data.view_count
      result.data.content=result.data.content.replace(/<p/gi,"<p class='pstyle'")
      result.data.content=result.data.content.replace(/<img/gi,"<img class='imgstyle'")
      wx.setNavigationBarTitle({
        title:result.data.title
      })
      this.setData({
        newsDetail:result.data,
      })
     
    }else if((result.errCode==0&&!result.data)||!result){
      this.setData({
        showSkeleton:Object.keys(this.data.newsDetail).length==0?true:false
        })
        console.log(this.data.showSkeleton);
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
    return {
      title:this.data.newsDetail.title,
      path:'pages/newsDetail/newsDetail?id='+this.data.newsId
    }
  },
  onShareTimeline(){
    return {
      title:this.data.newsDetail.title,
      path:'pages/newsDetail/newsDetail?id='+this.data.newsId
    }
  }
})