var order = ['red', 'yellow', 'blue', 'green', 'red'], app = getApp();
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    shopLogo: '../../image/logo.jpg',  //  店铺商标
    shopName: 'Tsunmersitiaotor',   //  店铺名字
    userList: [{
      userImg: '../../image/logo.jpg',
    }, {
      userImg: '../../image/logo.jpg',
    }], //  教练名字 
    swiperItem: [
      {
        linkUrl: '../xuqiu/xuqiu',
        imgUrl: '../../image/img.jpg',
      }, {
        linkUrl: '../xuqiu/xuqiu',
        imgUrl: '../../image/img.jpg',
      }, {
        linkUrl: '../xuqiu/xuqiu',
        imgUrl: '../../image/img.jpg',
      }
    ],
    //  需求图片
    xuqiuItem: [
      {
        linkUrl: '',
        imgUrl: '../images/demo/td1.png',
      },
      {
        linkUrl: '',
        imgUrl: '../images/demo/td2.png',
      }, {
        linkUrl: '',
        imgUrl: '../images/demo/td3.png',
      }, {
        linkUrl: '',
        imgUrl: '../images/demo/td4.png',
      }
    ]
  },
  information: function () {
    alert(1);
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  sendAjax: function (e) {
    // console.log(app.globalData.userName);
    //  添加回调
    wx.showLoading({
      title: '加载中...',
    });
    app.func.req('/portlist/getAllCoord.do', {}, function (ret) {
      console.log(ret);
    })
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  //   配置一下diolog
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
    var _date = new Date()
    var year = _date.getFullYear()  //年
    var month = _date.getMonth() + 1  //月
    var date = _date.getDate()    //日
    this.dialog.showThisDay(_date, year, month, date);
  },
  //  dialog 点击回调
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.toggleDialog();
  },
  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.toggleDialog();
  }

})