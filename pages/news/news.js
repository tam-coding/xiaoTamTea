// pages/news/news.js
import dayjs from 'dayjs'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsData:[],
    loading:false,
    isFull:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getNewsData()
  },
  getNewsData(size=0){
    this.setData({
      loading:true
    })
    wx.request({
      url: 'https://tea.qingnian8.com/news/get',
      method:"post",
      data:{
        limit:8,
        size
      },
      success:(res)=>{
        console.log(res);
        if(res.data.data){
          var newsTemp=res.data.data.map(item=>{
            // 使用dayjs将时间戳转换成月-日格式
            const formattedDate = dayjs(item.publish_date).format('MM-DD');
            item.publish_date=formattedDate
            item.view_count=item.view_count >= 1e3 && item.view_count < 1e4 ? (item.view_count / 1e3).toFixed(1) + 'k' : item.view_count >= 1e4 ? (item.view_count / 1e4).toFixed(1) + 'w' : item.view_count
              return item
            })
        }
        // if(res.data.errCode!=400){
          if(!newsTemp){
            var newsTemp=[]
          }
          let oldData=this.data.newsData
          wx.stopPullDownRefresh()
          this.setData({
            newsData:[...oldData,...newsTemp],
            loading:false
          })
        // }

        if(res.data.total!=undefined&&res.data.total==this.data.newsData.length){
          this.setData({
            isFull:true
          })
        }
      },

    
    })
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
    this.setData({
      newsData:[],
      isFull:false,
      loading:false
    })
    this.getNewsData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.isFull) return;
    this.getNewsData(this.data.newsData.length)
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})