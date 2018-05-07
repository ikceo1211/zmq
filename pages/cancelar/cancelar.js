Page({
  data:{
    canlender:{
    	'month': new Date().getMonth()+1,
    	'date': new Date().getDate(),
    	"day": new Date().getDay(),
    	'year': new Date().getFullYear(),
      "weeks":[],
      //  这是第几个索引
      'thisIndex' : 0,
      'thisDay' : '1980/01/01',
    }
  },
  onLoad:function(options){
    var _date = new Date()
    var year = _date.getFullYear()  //年
    var month = _date.getMonth() + 1  //月
    var date = _date.getDate()    //日
    this.showThisDay(_date,year,month,date);
  },
  /**
   *  刷新页面值
   */
  showThisDay : function(date,_year,_month,_date1){
    // 页面初始化 options为页面跳转所带来的参数
    var canlender = [], _date = new Date(date);
    var year = _year, month = _month , date = _date1;
    console.info(year + "-" + month + "-" + date)
    var day = _date.getDay();
    var firstDay = new Date(year, month - 1, 1).getDay();
    var lastMonthDays = [];
    // 上个月需要显示的天数
    for (var i = firstDay - 1; i >= 0; i--) {
      console.warn(new Date(year, month, -i).getDate())
      lastMonthDays.push({
        'year': year,
        'date': new Date(year, month, -i).getDate() + '',
        'month': month - 1,
        'click': false,
        'noDay': true,
      })
    }
    var currentMonthDys = [];
    //  这个月显示的天数进行判断  如果已经过去则没法点击
    console.log('this date' + date);
    for (var i = 1; i <= new Date(year, month, 0).getDate(); i++) {
      if (i > date) {
        currentMonthDys.push({
          'year': year,
          'date': i + "",
          'month': month,
          'click': true,
          'noDay': false,
        })
      } else if (i == date) {
        //  这里会打印的从1开始的
        var fristDayLength = firstDay + i - 1;
        this.setData({
          'canlender.thisIndex': 0 + ',' + fristDayLength,
          'canlender.thisDay': year+'/'+month+'/'+i
        })
        currentMonthDys.push({
          'year': year,
          'date': i + "",
          'month': month,
          'click': false,
          'noDay': false,
        })
      } else {
        currentMonthDys.push({
          'year': year,
          'date': i + "",
          'month': month,
          'click': false,
          'noDay': true,
        })
      }
    }
    var nextMonthDays = []
    var endDay = new Date(year, month, 0).getDay();
    for (var i = 1; i < 7 - endDay; i++) {
      nextMonthDays.push({
        'year': year,
        'date': i + '',
        'month': parseInt(month) + 1,
        'click': false,
        'noDay': true,
      })
    }

    canlender = canlender.concat(lastMonthDays, currentMonthDys, nextMonthDays)
    var weeks = []

    for (var i = 0; i < canlender.length; i++) {
      if (i % 7 == 0) {
        weeks[parseInt(i / 7)] = new Array(7);
      }
      weeks[parseInt(i / 7)][i % 7] = canlender[i]
    }

    console.info(weeks)
    this.setData({
      "canlender.weeks": weeks
    })
  },
  /**
   *  获取到当前天数
   */
  getThisData : function(dom){
    var xy = dom.currentTarget.dataset.index, thisDay = dom.currentTarget.dataset.date;
    var xyArr = xy.split(',');
    var x = parseInt(xyArr[0]) , y = parseInt(xyArr[1]);
    if (xyArr[2] == true || xyArr[2] == 'true') return;
    //  index为从0开始的索引
    var thisDayDomClick = "canlender.weeks[" + x + "][" + [y]+"].click";
    var oldXy = this.data.canlender.thisIndex;
    var oldXyArr = oldXy.split(',');
    var oldx = parseInt(oldXyArr[0]), oldy = parseInt(oldXyArr[1]);
    var oldDayDom = "canlender.weeks[" + oldx + "][" + oldy +"].click";
    this.setData({
      [oldDayDom]: true,
      [thisDayDomClick] : false,
      'canlender.thisIndex' : x+','+y,
      'canlender.thisDay': thisDay,
    })
  },
  /**
   *  bindDateChange 
   */
  bindDateChange : function(e){
    var date = e.detail.value;
    var dateArr = date.split('-');
    var month = dateArr[1].substring(0, 1) == 0 || dateArr[1].substring(0, 1) == '0' ? dateArr[1].replace(/^[0-9]/, '') : dateArr[1];
    var day = dateArr[2].substring(0, 1) == 0 || dateArr[2].substring(0, 1) == '0' ? dateArr[2].replace(/^[0-9]/, '') : dateArr[2];
    var dateObj = new Date(dateArr[0]+'-'+month+'-'+day);
    this.showThisDay(dateObj,dateArr[0],month,day);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  tap: function(e){
      console.info(e)
  }
})