// components/wx-tabcontrol/wx-tabcontrol.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      tabcontrol:{
        type:Array,
        value:[]
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTabItem(e){
        // 1获取点击索引
        const {index}=e.currentTarget.dataset;
        //2发送事件个父组件
        this.triggerEvent("tabItemChange",{index})
    }
  }
})
