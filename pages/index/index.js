var szd = "自动"
var suoding = true
var h = [4, 1, 3, 2, 4, 1, 3, 2]
var l = [2, 3, 1, 4, 2, 3, 1, 4]
var m = ['滗水', '进水', '曝气', '沉淀']
var shix = 0
var jihao_ = 0
var shiXu_1_active = 0
var test_D = {}

Page({
  data: {
    timer: 10000,
    timer_1: 12342,
    shiXu_1_active: 10086,

  },

  readd: function() {

    try {
      let value = wx.getStorageSync('test_D')
      if (value) {
        test_D = value
      } else {

        test_D['p_A'] = 12
        test_D['p_B'] = 0.03
        test_D['n_A'] = 12
        test_D['n_B'] = 0.03
        test_D['qi'] = 1
        test_D['hao'] = 1
        test_D['shixu'] = 1
        test_D['zhouqi'] = 3600
        test_D['time1'] = 1543753965457
        test_D['qi_2'] = 2
        test_D['hao_2'] = 2
        test_D['shixu_2'] = 2
        test_D['zhouqi_2'] = 3000
        test_D['time1_2'] = 1543883219378
        test_D['xz'] = 0.99998
        test_D['xz_2'] = 1.00026


      }
    } catch (e) {}
  },

  onLoad: function() {

    var that = this
    this.readd()
    this.reset()
    this.setData({
      shouzidong: szd,
      xz: test_D['xz'],
      xz2: test_D['xz_2'],
      swp_crt: '0',
      suoding: '锁定状态，不能续秒，点此解锁',
      p_A: test_D['p_A'],
      p_B: test_D['p_B'],
 
      n_A: test_D['n_A'],
      n_B: test_D['n_B'],
      asdf: Math.random()
    })
  },

  print_text: function(n = 1) {
    if (n < 1 || n > 4) {
      n = 1
    }
    let output_text = ''

    for (let i = 1; i < 5; i++) {
      if (l[i] == n) {
        for (let j = i; j < i + 4; j++) {
          output_text += l[j] + "号" + m[j - i] + '\n'
        }
        return output_text
        break;
      }
    }
  },

  reset: function() {

    let that = this

    var time2 = new Date()
    time2.getTime()

    var x = parseInt(((time2 - test_D['time1']) * test_D['xz']) / 1000) /*x，距离keytime经过的秒数 */
    var b = test_D['zhouqi'] //b是周期
    var c = x % b //c是秒数除以周期的余数，当前时序
    var d = parseInt(x / b) % 4 /*秒数除以周期所得轮数，除以四得到的余数 */
    var z = test_D['hao']
    for (var i = 0; i < 4; i++) {
      if (h[i] == z) {
        var y = i;
        break;
      }
    }
    var g = h[d + y]

    jihao_ = g
    //shix = c

    this.setData({
      qi: test_D['qi'],
      hao: g,
      shixu: c,
      zhouqi: b,
      tteexxtt: this.print_text(g)
      //xz: xz
    })

    var x_2 = parseInt(((time2 - test_D['time1_2']) * test_D['xz_2']) / 1000)
    var b_2 = test_D['zhouqi_2']
    var c_2 = x_2 % b_2
    var d_2 = parseInt(x_2 / b_2) % 4
    var z_2 = test_D['hao_2']
    for (var i_2 = 0; i_2 < 4; i_2++) {
      if (h[i_2] == z_2) {
        var y_2 = i_2;
        break;
      }
    }
    var g_2 = h[d_2 + y_2]

    this.setData({
      qi2: test_D['qi_2'],
      hao2: g_2,
      shixu2: c_2,
      zhouqi2: b_2,
      tteexxtt2: this.print_text(g_2)
    })


    if (szd == "自动") {
      setTimeout(function() {
        that.reset()
      }, 1000)
    }
  },

  saveData: function() {
    wx.setStorage({
      key: 'test_D',
      data: test_D,
    })

  },

  form_value: function(e) {
    let that = this
    if (szd == "手动") {
      //shiXu_1_miao = zhouqi = e.detail.value.zhouqi
      

      ///////////
      test_D['time1'] = new Date()
      test_D['time1'].getTime()
      test_D['time1'] = test_D['time1'] - (e.detail.value.shixu * 1000 / test_D['xz']) - (e.detail.value.zhouqi * 4 * 600 * 1000 / test_D['xz'])

      test_D['qi'] = e.detail.value.qi
      test_D['hao'] = e.detail.value.hao
      test_D['shixu'] = e.detail.value.shixu
      test_D['zhouqi'] = e.detail.value.zhouqi
      test_D['time1'] = test_D['time1']

      wx.setStorage({
        key: 'test_D',
        data: test_D
      })

      wx.showToast({
        title: test_D['qi'] + '期设置成功',
        icon: 'success',
        duration: 500
      })

    } else {
      wx.showToast({
        title: '自动状态无法设置',
        //icon: 'loading',
        image: '/tan.png',
        duration: 500
      })
    }
  },

  form_value_2: function(e) {


    if (szd == "手动") {
      ///////////
      test_D['time1_2'] = new Date()
      test_D['time1_2'].getTime()
      test_D['time1_2'] = test_D['time1_2'] - (e.detail.value.shixu_2 * 1000 / test_D['xz_2']) - (e.detail.value.zhouqi_2 * 4 * 600 * 1000 / test_D['xz_2'])

      test_D['qi_2'] = e.detail.value.qi_2
      test_D['hao_2'] = e.detail.value.hao_2
      test_D['shixu_2'] = e.detail.value.shixu_2
      test_D['zhouqi_2'] = e.detail.value.zhouqi_2
      test_D['time1_2'] = test_D['time1_2']

      wx.setStorage({
        key: 'test_D',
        data: test_D
      })
      wx.setStorage({
        key: 'test_D',
        data: test_D
      })
      wx.showToast({
        title: test_D['qi_2'] + '期设置成功',
        icon: 'success',
        duration: 618
      })

    } else {
      wx.showToast({
        title: '需改成手动',
        icon: 'loading',
        duration: 600
      })
    }

  },

  onHide: function() {

    const that = this

    clearInterval(that.data.shiXu_1_active)

    wx.setStorage({
      key: "szd",
      data: szd
    })

    szd = "手动"
    that.setData({
      shouzidong: "手动"
    })

    that.setData({
      swp_crt: 2
    })


  },
  onShow: function() {

    const that = this
    szd = "自动"
    that.setData({
      shouzidong: "自动"
    })

    that.reset()


    that.setData({
      swp_crt: 0
    })
  },
  shouzidong: function() {
    const that = this

    if (szd == "手动") {

      szd = "自动"
      this.setData({
        shouzidong: "自动"
      })
      this.reset()

    } else {
      clearInterval(that.data.shiXu_1_active)
      szd = "手动"
      this.setData({
        shouzidong: "手动"
      })

    }

  },


  xz: function(e) {
    test_D['xz'] = parseFloat(e.detail.value)
    wx.setStorage({
      key: 'test_D',
      data: test_D,
    })

  },

  xz2: function(e) {
    test_D['xz_2'] = parseFloat(e.detail.value)
    
    wx.setStorage({
      key: 'test_D',
      data: test_D,
    })

  },

  jia_x: function(startpoint, xz_x) {

    let time_x = new Date()
    time_x.getTime()
    let cha = (time_x - startpoint) / 1000
    return xz_x * (cha + 1) / cha
  },

  jian_x: function(startpoint, xz_x) {
    let time_x = new Date()
    time_x.getTime()
    let cha = (time_x - startpoint) / 1000
    return xz_x * (cha - 1) / cha
  },

  jia1_1: function() {
    let xz = 0
    if (!suoding)
      xz = this.jia_x(test_D['time1'], test_D['xz'])
    if (xz > 1.001)
      xz = 1.001
    this.setData({
      xz: xz
    })
    test_D['xz'] = xz
    wx.setStorage({
      key: 'test_D',
      data: test_D,
    })
  },
  jian1_1: function() {
    let xz = 0
    if (!suoding)
      xz = this.jian_x(test_D['time1'], test_D['xz'])
    if (xz < 0.999)
      xz = 0.999
    this.setData({
      xz: xz
    })
    test_D['xz'] = xz
    wx.setStorage({
      key: 'test_D',
      data: test_D,
    })
  },
  jia1_2: function() {
    let xz_2 = 0
    if (!suoding)
      xz_2 = this.jia_x(test_D['time1_2'], test_D['xz_2'])
    if (xz_2 > 1.001)
      xz_2 = 1.001
    this.setData({
      xz2: xz_2
    })
    test_D['xz_2'] = xz_2
    wx.setStorage({
      key: 'test_D',
      data: test_D,
    })
  },
  jian1_2: function() {
    let xz_2 = 0
    if (!suoding)
      xz_2 = this.jian_x(test_D['time1_2'], test_D['xz_2'])
    if (xz_2 < 0.999)
      xz_2 = 0.999
    this.setData({
      xz2: xz_2
    })
    test_D['xz_2'] = xz_2
    wx.setStorage({
      key: 'test_D',
      data: test_D,
    })
  },
  suoding: function() {
    const that = this
    if (suoding) {
      that.setData({
        suoding: '解锁状态，可以续秒，点此锁定'
      })
      suoding = false
    } else {
      that.setData({
        suoding: '锁定状态，不能续秒，点此解锁'
      })
      suoding = true
    }
  },
  c_qi1: function(e) {
    const self = this
    test_D['qi'] = e.detail.value
    wx.setStorage({
      key: 'test_D',
      data: test_D,
    })
  },


  c_p: function(e) {
    let p_A = parseFloat(e.detail.value.p_A)
    let p_B = parseFloat(e.detail.value.p_B)
    let p_V1 = parseFloat(e.detail.value.p_V1)
    let p_V2 = parseFloat(e.detail.value.p_V2)
    //显示结果
    this.setData({
      p_rst: Math.log10(p_V1 / p_V2) * p_A + p_B
    })
    //储存p_A和p_B
    test_D['p_A'] = e.detail.value.p_A
    test_D['p_B'] = e.detail.value.p_B

    wx.setStorage({
      key: 'test_D',
      data: test_D,
    })


  },


  c_n: function (e) {
    let n_A = parseFloat(e.detail.value.n_A)
    let n_B = parseFloat(e.detail.value.n_B)
    let n_99 = parseFloat((9.9 - n_B) / n_A)
    let n_149 = parseFloat((14.9 - n_B) / n_A)
    let n_C = parseFloat(e.detail.value.n_C)
    
    //let n_V2 = parseFloat(e.detail.value.p_V2)
    //显示结果
    this.setData({
      n_99 : n_99,
      n_149 : n_149,
      n_rst: n_C * n_A + n_B
    })
    //储存p_A和p_B
    test_D['n_A'] = e.detail.value.n_A
    test_D['n_B'] = e.detail.value.n_B
    

    wx.setStorage({
      key: 'test_D',
      data: test_D,
    })


  },

  

})