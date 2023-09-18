import dayjs from 'dayjs'
import {reqNavList,reqNewsList} from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData:[],//导航栏数据
    newsData:[],//新闻数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavData()
    this.getNewsData()
  },
  async getNavData(){
    let result=await reqNavList()
    console.log(result);
    if(result.errCode==0){
      this.setData({
        navData:result.data
      })
    }
  },
  // getNavData(){
  //   wx.request({
  //     url: 'https://tea.qingnian8.com/nav/get',
  //     method: 'post',
  //     success:res=>{
  //       // console.log(res);
  //       this.setData({
  //         navData:res.data.data
  //       })
  //     }
  //   })
  // },
  getNewsData(){
    wx.request({
      url: 'https://tea.qingnian8.com/news/get',
      method:"post",
      data:{
        limit:3,
        hot:true
      },
      success:(res)=>{
        // console.log(res);
        if(res.data.data){
          var newsTemp=res.data.data.map(item=>{
            // 使用dayjs将时间戳转换成月-日格式
            const formattedDate = dayjs(item.publish_date).format('MM-DD');
            item.publish_date=formattedDate
            item.view_count=item.view_count >= 1e3 && item.view_count < 1e4 ? (item.view_count / 1e3).toFixed(1) + 'k' : item.view_count >= 1e4 ? (item.view_count / 1e4).toFixed(1) + 'w' : item.view_count
              return item
            })
        }
        if(!newsTemp){
          var newsTemp=[]
        }
        this.setData({
          newsData:newsTemp
        })
      }
    })
  },
  // async getNavData() {
  
  //     const result = await wx.request({
  //       url: 'https://tea.qingnian8.com/nav/get',
  //       method: "POST",
  //     });
  //     console.log(result); 

  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})