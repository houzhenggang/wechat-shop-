// pages/myhuodong/myhuodong.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataAy:[]
  },
  quxaio:function(e){
// 取消
    var that = this;
    util.requestUrl(getApp().globalData.newBaseUrl + 'cancleActOrder', { 'orderNo': e.currentTarget.id }, function (res) {
      console.log(res);
      if (res.data.status == '200') {
        that.requestData();
      }
      else
      {
        wx.showToast({
          image: '../../Asset/tanhao.png',
          title: '取消失败',
        })
      }
    });
  },
  payNow:function(e){
// 付款
    var that = this;
    util.requestUrl(getApp().globalData.newBaseUrl + 'preWechatActivity', { 'orderNo': e.currentTarget.id }, function (res) {
      console.log(res);
      if (res.data.status == '200') {

        var dic = JSON.parse(res.data.wechat);

        wx.requestPayment({
          timeStamp: dic.timeStamp,
          nonceStr: dic.nonceStr,
          package: dic.package,
          signType: 'MD5',
          paySign: dic.paySign,
          'success': function (res) {
            wx.showToast({
              title: '付款成功',
            });

            that.requestData();

          },
          'fail': function (res) {
            wx.showToast({
              image: '../../Asset/tanhao.png',
              title: '付款失败',
            })
          }
        });


      }
    });
  },

  requestData:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    util.requestUrl(getApp().globalData.newBaseUrl + 'getWechatAllOrder',
      {
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {

        console.log(res);

        wx.hideLoading();

        if (res.data.status == '200') {


          that.setData({ dataAy: res.data.data });

        }


      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.requestData();
  },

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