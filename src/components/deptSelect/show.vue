<template>
  <div class="dept_input_show" @mouseover.stop.prevent="showTure" @mouseout.stop.prevent="showFalse" @click.stop="edit">
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
    <div @click="isPicker">
      <input type="text" disabled="disabled" :style="{
      'width': data.style.title.pst == 'top' ? '100%' :  100 - data.style.title.width + '%'
    }" :value="data.base.value | showValue" />
    </div>




    <dept-picker-pc v-if="showPicker && this.$root.device=='pc'" :data-list="data.base.deptList" v-model="data.base.value"></dept-picker-pc>
    <dept-picker-mb v-if="showPicker && this.$root.device=='phone'" :data-list="data.base.deptList" v-model="data.base.value"></dept-picker-mb>

    <div v-if="!use" class="shade"></div>
    <form-operate v-if="!use" v-show="data.isShow" :operate="data.operate" @del="del"></form-operate>
    <span class="error" v-if="data.error">* 组件属性或样式设置有误</span>
    <!-- {{data.base}} {{data.style}} -->
  </div>
</template>

<script>
  import '../../assets/css/deptInput.styl';
  import $ from 'jquery';
  import Vue from 'vue';
  import FormOperate from '../form-operate/index.vue';
  import Edit from './edit.vue';
  import deptPickerPc from './pcPicker/index.vue';
  import deptPickerMb from './mbPicker/index.vue';


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
        value: [],
        title: '部门选择',
        req: false,
        deptList: [{
            "dept": "学院一",
            "list": [{
                "dept": "计科系1",
                "list": [{
                    "dept": "软工1",
                    "list": []
                  },
                  {
                    "dept": "计科1",
                    "list": []
                  },
                  {
                    "list": []
                  }
                ]
              },
              {
                "dept": "外语系1",
                "list": [{
                    "dept": "英语1",
                    "list": []
                  },
                  {
                    "dept": "日语1",
                    "list": []
                  },
                  {
                    "list": []
                  }
                ]
              },
              {
                "list": []
              }
            ]
          },
          {
            "dept": "学院二",
            "list": [{
                "dept": "计科系2",
                "list": [{
                    "dept": "软工2",
                    "list": []
                  },
                  {
                    "dept": "计科2",
                    "list": []
                  },
                  {
                    "list": []
                  }
                ]
              },
              {
                "dept": "外语系2",
                "list": [{
                    "dept": "英语2",
                    "list": []
                  },
                  {
                    "dept": "日语2",
                    "list": []
                  },
                  {
                    "list": []
                  }
                ]
              },
              {
                "list": []
              }
            ]
          },
          {
            "dept": "学院三",
            "list": [{
                "dept": "计科系3",
                "list": []
              },
              {
                "dept": "外语系3",
                "list": []
              },
              {
                "list": []
              }
            ]
          },
          {
            "dept": "学院四",
            "list": []
          },
          {
            "list": []
          }
        ]
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
    name: 'dept-input-show',
    props: ['value', 'use'],
    data: function () {
      return {
        data: this.value ? this.value : new Data(),
        showPicker: false,
        initialTop: ''
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
      'dept-picker-pc': deptPickerPc,
      'dept-picker-mb': deptPickerMb
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
      },
      isPicker: function () {
        this.showPicker = true;
      }
    },
    filters: {
      showValue: function (value) {
        var v = ''
        for (let i in value) {
          v += value[i].dept + ',';
        }
        return v.slice(0, -1);
      }
    }
  }

</script>
