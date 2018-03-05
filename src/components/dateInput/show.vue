<template>
  <div class="date_input_show" @mouseover="showTure" @mouseout="showFalse" @click="edit">
    <label :style="{
      'font-family' : data.style.font,
      'font-size' : data.style.fontSet.fontSizeRem,
      'font-style' : data.style.fontSet.fontStyle,
      'font-weight': data.style.fontSet.weight ? 'bold' : 'normal',
      'text-decoration' : data.style.fontSet.underLine ? 'underline' : 'none',
      'color' : data.style.fontSet.color.hex,
      'display' : data.style.title.pst == 'top' ? 'block' : 'inline-block',
      'width' : data.style.title.width + '%',
      'float' : data.style.title.pst == 'top' ? 'none' : 'left',
      'text-align' : data.style.title.pst == 'top' ? 'left' : data.style.title.pst,
      'margin-top' : data.style.title.pst == 'top' ? '0' : '0.6rem',
    }">{{ data.base.title }}</label>


    <w-datetime-picker :style="{
      'width': data.style.title.pst == 'top' ? '100%' :  100 - data.style.title.width + '%',
      'display' : 'inline-block'
    }" placeholder="请选择日期" v-model="data.base.value"></w-datetime-picker>

    <div v-if="!use" class="shade"></div>
    <form-operate v-if="!use" v-show="data.isShow" :operate="data.operate" @del="del"></form-operate>
    <span class="error" v-if="data.error">* 组件属性或样式设置有误</span>
    <!-- {{data.base}} {{data.style}} -->
  </div>
</template>

<script>
  import '../../assets/css/dateInput.styl';
  import $ from 'jquery';
  import Vue from 'vue';
  import FormOperate from '../form-operate/index.vue';
  import Edit from './edit.vue';
  import DataTime from './dataPicker/index.vue';

  /* 如果组件宽度小于100%且为进行编组，则显示往上挤的按钮 */
  function upBtnShow(vue) {
    for (let i = 0; i < vue.$parent.cptShow.length; i++) {
      if (i == 0) {
        vue.$parent.cptShow[0].data.operate.upShow = false;
      }
      if (vue.$parent.cptShow[i].data.style.cptWidth != '100%' && !vue.$parent.cptShow[i].groupId) {
        if (vue.$parent.cptShow[i + 1] && !vue.$parent.cptShow[i + 1].groupId) {
          vue.$parent.cptShow[i + 1].data.operate.upShow = true;
        }
      } else {
        if (vue.$parent.cptShow[i + 1]) {
          vue.$parent.cptShow[i + 1].data.operate.upShow = false;
        }
      }
    }
  }




  var Data = function () {
    return {
      base: {
        name: '',
        value: '',
        title: '日期',
        req: false
      },
      style: {
        font: '',
        fontSet: {
          fontSize: '14px',
          fontSizeRem: '',
          fontStyle: 'normal',
          weight: false,
          underLine: false,
          color: '#000'
        },
        title: {
          pst: 'top',
          width: 50
        },
        cptWidth: '100%'
      },
      isShow: false,
      operate: {
        upShow: false,
        exchange: false
      },
      error: true
    }
  }

  export default {
    name: 'date-input-show',
    props: ['value', 'use'],
    data: function () {
      return {
        data: this.value ? this.value : new Data()
      }
    },
    mounted: function () {
      if (!this.use) {
        this.data.isShow = false;
        this.$emit('input', this.data);
        upBtnShow(this);
      }
    },
    watch: {
      'data.style.cptWidth': function () {
        for (let i = 0; i < this.$parent.cptShow.length; i++) {
          if (this.$parent.cptShow[i].data == this.data) {
            this.$parent.cptShow[i].liWidth = this.data.style.cptWidth;
          }
        }
        upBtnShow(this);
      }
    },
    components: {
      'form-operate': FormOperate,
      'w-datetime-picker': DataTime,
    },
    methods: {
      showTure: function () {
        this.data.isShow = true;
      },
      showFalse: function () {
        this.data.isShow = false;
      },
      edit: function () {
        if (this.use) {
          return;
        }
        var self = this;
        var EditClass = Vue.extend(Edit);
        this.editObj = new EditClass();
        this.editObj.$parent = this;
        this.editObj.data = this.data;
        this.editObj.$mount('.col_right .content');
      },
      del: function () {
        this.$emit('del');
        this.editObj ? this.editObj.$destroy() : '';
        this.$destroy();
        $('.col_right .content').html('');
        upBtnShow(this);
      }
    }
  }

</script>
