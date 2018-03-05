<template>
  <div v-if="!this.$root.isIE" class="select_input_show" @mouseover="showTure" @mouseout="showFalse" @click="edit">
    <label :style="{
      'font-family' : data.style.font,
      'font-size' : data.style.fontSet.fontSize,
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

    <ul :style="{
      'width': data.style.title.pst == 'top' ? '100%' :  100 - data.style.title.width + '%'
    }">
      <li v-for="(item,index) in data.base.list.data" :key="index">
        <label><input :type="data.base.list.type" name="list" v-model="data.base.value"/>{{ item.label }}</label>
        <!-- <label><input :type="data.base.list.type" v-model="data.base.value" :value="item.label" />{{ item.label }}</label> -->
      </li>
    </ul>

    <!-- <div v-if="!use" class="shade"></div> -->
    <form-operate v-if="!use" v-show="data.isShow" :operate="data.operate" @del="del"></form-operate>
    <!-- {{data.base}} {{data.style}} -->
  </div>
</template>

<script>
  import '../../assets/css/selectInput.styl';
  import $ from 'jquery';
  import Vue from 'vue';
  import FormOperate from '../form-operate/index.vue';
  import Edit from './edit.vue';

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
        value: null,
        title: '选择标题',
        req: false,
        list: {
          data: [],
          multiple: false,
          type: 'radio' //checkbox
        },
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
      }
    }
  }

  export default {
    name: 'select-input-show',
    props: ['value', 'use'],
    data: function () {
      return {
        data: this.value ? this.value : new Data(),
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
      'form-operate': FormOperate
    },
    methods: {
      showTure: function () {
        this.data.isShow = true;
      },
      showFalse: function () {
        this.data.isShow = false;
      },
      edit: function () {
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
