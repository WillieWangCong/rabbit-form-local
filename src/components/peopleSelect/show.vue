<template>
  <div class="people_input_show" @mouseover.stop.prevent="showTure" @mouseout.stop.prevent="showFalse" @click.stop.prevent="edit">
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
    }" :value="data.base.value | showValue" v-verify="{vfy:[data.base.req == 'true' ? 'required' : '' ], use: use || 'false'}"
      />
    </div>

    <people-picker-pc v-if="showPicker && this.$root.device=='pc'" :data-list="data.base.peopleList" v-model="data.base.value"></people-picker-pc>
    <people-picker-mb v-if="showPicker && this.$root.device=='phone'" :data-list="data.base.peopleList" v-model="data.base.value"></people-picker-mb>

    <div v-if="!use" class="shade"></div>
    <form-operate v-if="!use" v-show="data.isShow" :operate="data.operate" @del="del"></form-operate>
    <span class="error" v-if="data.error">* 组件属性或样式设置有误</span>
    <!-- {{data.base}} {{data.style}} -->
  </div>
</template>

<script>
  import '../../assets/css/peopleInput.styl';
  import $ from 'jquery';
  import Vue from 'vue';
  import FormOperate from '../form-operate/index.vue';
  import Edit from './edit.vue';
  import peoplePickerPc from './pcPicker/index.vue';
  import peoplePickerMB from './mbPicker/index.vue';

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
        title: '人员选择',
        req: false,
        peopleList: [{
            dept: '部门1',
            list: [{
              dept: '部门1-1',
              list: [{
                  dept: '部门1-1-1',
                  list: [{
                    id: 1,
                    realname: 'a'
                  }, {
                    id: 2,
                    realname: 'b'
                  }, {
                    id: 3,
                    realname: 'c'
                  }, {
                    id: 4,
                    realname: 'd'
                  }, {
                    id: 5,
                    realname: 'e'
                  }]
                },
                {
                  list: [{
                    id: 6,
                    realname: 'aa'
                  }, {
                    id: 7,
                    realname: 'bb'
                  }, {
                    id: 8,
                    realname: 'cc'
                  }, {
                    id: 9,
                    realname: 'dd'
                  }, {
                    id: 10,
                    realname: 'ee'
                  }]
                }
              ]
            }]
          },
          {
            dept: '部门2',
            list: [{
                dept: '部门2-1',
                list: [{
                  id: 11,
                  realname: 'a1'
                }, {
                  id: 12,
                  realname: 'b1'
                }, {
                  id: 13,
                  realname: 'c1'
                }, {
                  id: 14,
                  realname: 'd1'
                }, {
                  id: 15,
                  realname: 'e1'
                }]
              },
              {
                dept: '部门2-2',
                list: [{
                  dept: '部门2-2-1',
                  list: [{
                    id: 16,
                    realname: 'a2'
                  }, {
                    id: 17,
                    realname: 'b2'
                  }, {
                    id: 18,
                    realname: 'c2'
                  }, {
                    id: 19,
                    realname: 'd2'
                  }, {
                    id: 20,
                    realname: 'e2'
                  }]
                }]
              }
            ]
          },
          {
            list: [{
              id: 21,
              realname: 'xx'
            }, {
              id: 22,
              realname: 'yy'
            }]
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
    name: 'people-input-show',
    props: ['value', 'use'],
    data: function () {
      return {
        data: this.value ? this.value : new Data(),
        showPicker: false
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
      'people-picker-pc': peoplePickerPc,
      'people-picker-mb': peoplePickerMB
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
          v += value[i].realname + ',';
        }
        return v.slice(0, -1);
      }
    }
  }

</script>
