// pages/class/class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow : false,
    initData: {
      toWeekDay: [], // 一周内几号
      toMouthDays: '', //  当月天数
      YMDArr: [], //   选择的当前年月日
      todayDate: '', // 当天日期
      today: '', //  当天年月日
      toWeek: '', //  当天周几
      chooseday: '', //  选择年月日
      chooseWeek: '', //  选择周几
      isYY: true,
      todayData: [], //当天数据
      chooseDayIndex : 0, //  选择的第几个日期
    },
    storeName: '英派斯健身',  // 店铺名称
    storeList: [
      {
        className: '动感舞蹈',
        classTime: '12:30-20:30',
        classUser: '0',
        classAllUser: '20',
        storeImg: '../../image/img.jpg',
        storeAddrss: '山东省青岛市黄岛区月亮湾路颐瑞凯莱酒店',
      }, {
        className: '肚皮舞教学',
        classTime: '12:30-20:30',
        classUser: '0',
        classAllUser: '20',
        storeImg: '../../image/img.jpg',
        storeAddrss: '山东省青岛市崂山区'
      }, {
        className: '肚皮舞教学',
        classTime: '12:30-20:30',
        classUser: '0',
        classAllUser: '20',
        storeImg: '../../image/img.jpg',
        storeAddrss: '山东省青岛市崂山区'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  初始化时间
    var that = this;
    var date = new Date();
    var _todayXXXXMMDD = date.getFullYear();
    that.initDate(date, _todayXXXXMMDD);
  },
  /*
   *   初始化时间
   */
  initDate: function (_today, _todayXXXXMMDD) {
    var that = this;
    if (_today.getMonth() < 10) {
      _todayXXXXMMDD = _todayXXXXMMDD + '-0' + (_today.getMonth() + 1).toString();
    } else {
      _todayXXXXMMDD = _todayXXXXMMDD + '-' + (_today.getMonth() + 1);
    }
    if (_today.getDate() < 10) {
      _todayXXXXMMDD = _todayXXXXMMDD + '-0' + _today.getDate().toString();
    } else {
      _todayXXXXMMDD = _todayXXXXMMDD + '-' + _today.getDate();
    }
    if (_today.getDay() == 0) {
      that.data.initData.toWeek = 7;
      that.data.initData.chooseWeek = 7;
    } else {
      that.data.initData.toWeek = _today.getDay();
      that.data.initData.chooseWeek = _today.getDay();
    };
    //  周几，0代表星期天
    that.data.initData.todayDate = _today.getDate();
    that.data.initData.today = _todayXXXXMMDD;
    that.data.initData.chooseday = _todayXXXXMMDD;
    that.data.initData.toMouthDays = new Date(_today.getFullYear(), (_today.getMonth() + 1), 0).getDate();
    that.initTwo(2);
  },
  /*
   *  将年月日赋值到前台
   */
  initTwo: function (type) {
    //  调用初始化时间数组
    var YMDArrDom = "initData.YMDArr";
    this.setData({
      [YMDArrDom]: []
    })
    var that = this, _weekDay = parseInt(4);
    var ymdArr = that.data.initData.today.split('-');
    var toMouthDays = that.data.initData.toMouthDays;
    // 当月天数
    var _day = that.data.initData.todayDate;
    var _toweek = that.data.initData.toWeek;
    var _noDay;
    var _todayDate = that.data.initData.today;
    //  获取星期几_toweek，然后通过当天日期来判断下面的天数
    var _mouth = ymdArr[1];
    //   循环完成以后让istoWeekDayBefore等于true
    for (var iweek = 0; iweek < _weekDay; iweek++) {
      //  把周封装进去
      if (parseInt(_day) + iweek > toMouthDays) {//   获取的天数大于当月天数
        that.data.initData.toWeekDay.push(parseInt(_day) + iweek - toMouthDays);
        if (ymdArr[1] == 12) {// 需要更换新年了
          _noDay = (parseInt(ymdArr[0]) + 1) + '-' + '01' + '-0' + parseInt(parseInt(_day) + iweek - toMouthDays).toString();
        } else if (ymdArr[1] < 10) {// 需要月+1
          _noDay = ymdArr[0] + '-0' + (parseInt(ymdArr[1]) + 1).toString() + '-0' + parseInt(parseInt(_day) + iweek - toMouthDays).toString();
        } else {// 9-11月
          _noDay = ymdArr[0] + '-' + (parseInt(ymdArr[1]) + 1) + '-0' + parseInt(parseInt(_day) + iweek - toMouthDays).toString();
        }
      } else {
        that.data.initData.toWeekDay.push(parseInt(_day) + parseInt(iweek));
        if (parseInt(_day) + parseInt(iweek) < 10) {
          _noDay = ymdArr[0] + '-' + ymdArr[1] + '-0' + (parseInt(_day) + parseInt(iweek)).toString();
        } else {
          _noDay = ymdArr[0] + '-' + ymdArr[1] + '-' + (parseInt(_day) + parseInt(iweek));
        }
      }
      var week_Chinese, date_m_d = _noDay.split('-'); 
      _toweek = _toweek > 7 ? _toweek-7 : _toweek;
      switch(_toweek){
        case 1 :
          week_Chinese = '周一';
        break;
        case 2 :
          week_Chinese = '周二';
          break;
        case 3 :
          week_Chinese = '周三';
          break;
        case 4 :
          week_Chinese = '周四';
          break;
        case 5 :
          week_Chinese = '周五';
          break;
        case 6 :
          week_Chinese = '周六';
          break;
        case 7 :
          week_Chinese = '周日';
          break;
        default:
        break;
      }
      var is_active = that.date_active(_todayDate,_noDay);
      var option = {
          today: date_m_d[1] + '/' + date_m_d[2],
          week: week_Chinese,
          active: is_active 
      };
      that.data.initData.YMDArr.push(option);
      _toweek = parseInt(_toweek) + 1;
    }
    var arr = that.data.initData.YMDArr.sort();
    that.setData({ 
      [YMDArrDom]: arr
    });
  },
  /**
   * 判断日期的active
   * 参数介绍：
   *    _today : 当天日期和点击的日期
   *    _chooseDay : 循环出来的日期
   */
  date_active : function(_today,_chooseDay){
    if(_today == _chooseDay)return true ;
    else return false;
  },
  /**
   *  更改下拉按钮状态
   */
  chooseCancelar : function(){
     this.setData({
       isShow : !this.data.isShow
     })
  },
  /**
   *  点击日历列表触发事件
   */
  click_calerlar_item : function(eq){
    var that = this, index = eq.currentTarget.dataset.listEq, oldIndex = that.data.initData.chooseDayIndex;
    // 选中日期
    var chooseDay = "initData.YMDArr[" + index +"].active";
    //  当前日期
    var oldChooseDay = "initData.YMDArr[" + oldIndex + "].active";
    //  当前选择数
    var oldChooseDayIndex = "initData.chooseDayIndex";
    that.setData({
      [chooseDay] : true,
      [oldChooseDay] : false,
      [oldChooseDayIndex] : index,
    })
  },
  /**
   * lookInfo : 查看课程详情
   */
  lookInfo : function(){
       
  },
  /**
   *  组件 : 点击了上面的日期回调
   */
  chooseEvent(e) {
      var that = this;
      //  点击以后获取到年月日，得到的样式是2018/06/01样式的
      var getThisDay = that.dialog.data.canlender.thisDay;
      var clickDayArr = getThisDay.split('/');
      var date = clickDayArr[0]+'-'+clickDayArr[1]+'-'+clickDayArr[2];
      var newDate = new Date(date), _todayXXXXMMDD = newDate.getFullYear();
      this.initDate(newDate,_todayXXXXMMDD);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
    var _date = new Date()
    var year = _date.getFullYear()  //年
    var month = _date.getMonth() + 1  //月
    var date = _date.getDate()    //日
    this.dialog.showThisDay(_date, year, month, date);
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