<template>
  <div id="app">
    <div class="header">
      <h1 class="title">表单设计器</h1>
      <img class="close" src="./assets/images/f-icon-21.png" />
    </div>
    <div class="design_body" :style="{'height': height, overflow:'hidden'}">
      <div class="col_left">
        <ul>
          <li v-for="(item,index) in cptName" :key="index">
            <component :is="item" v-drag="{show : show,index : index, cptShow: cptShow}"></component>
          </li>
        </ul>
      </div>
      <div class="col_middle">
        <div class="form_operate_group">
          <button class="issue">发布</button>
          <button class="save" @click="save">保存</button>
          <button class="preview" @click="preview">预览</button>
        </div>
        <ul class="drag_area">
          <li v-for="(item,index) in cptShow" :key="item.id" @click="select(index)" :style="{
            'width':item.liWidth,
            'display':item.display
          }">          
            <component :is="item.cpt" :class="{'on' : item.on}" v-model="item.data" v-drag-move="{id : item.id, cptShow: cptShow}" @del="del(index)"></component>
          </li>
        </ul>
      </div>
      <div class="col_right ">
        <!-- <p v-for="(item, index) in cptShow" style="font-size:12px;">{{ item }}</p> -->
        <div class="content"></div>
      </div>
    </div>
    <div class="tips" :class="{error:tipsClass == 'error', pass:tipsClass=='pass'}" v-show="tips != ''">{{ tips }}</div>
    <rabbit-preview v-if="previewShow"></rabbit-preview>
  </div>
</template>
<script>
  import './assets/js/rem.js';
  import './assets/css/app.styl';
  import './assets/js/drag.js';
  import './assets/js/verify.js';
  import $ from 'jquery';


  /*导入组件*/
  import Preview from './components/preview.vue';
  import {
    c
  } from './components/ttt.js';
  //  console.log(c);


  /*导入组件库*/
  import './assets/js/cptLib.js';



  export default {
    name: 'app',
    data: function () {
      return {
        cptName: ['single-input', 'select-input', 'date-input', 'pullselect-input', 'people-input', 'dept-input'],
        cptShow: [],
        height: '0',
        previewShow: false,
        tips: '',
        tipsClass: ''
      }
    },
    components: {
      'rabbit-preview': Preview
    },
    created: function () {
      var _this = this;                  
      console.log(localStorage.formData);
      this.cptShow = localStorage.formData ?　JSON.parse(localStorage.formData) : [];
      // $.post("http://lcyq.comsys.net.cn/mzodiac/getFormTemplate", {
      //   id: this.$root.id,
      // }, function (data) {
      //   data = JSON.parse(data);
      //   for (var i in data) {
      //     _this.cptShow.push(data[i]);
      //   }
      // });
    },
    mounted: function () {
      var _this = this;
      setTimeout(function () {
        $(window).on('load', function () {
          _this.height = ($(window).height() - $('.header').height()) + 'px';
          $('.drag_area').height(parseInt(_this.height) - $('.form_operate_group').height());
        });
      }, 0);
    },
    methods: {
      show: function (i, event) {
        var objCpt = {
          cptClass: this.cptName[i],
          cpt: this.cptName[i] + '-show',
          id: Math.random(),
          on: false,
          data: null,
          liWidth: '100%',
          display: 'block'
        }
        return objCpt;
      },
      select: function (i) {
        for (let j = 0; j < this.cptShow.length; j++) {
          this.cptShow[j].on = false;
        }
        this.cptShow[i].on = true;
      },
      del: function (i) {
        this.cptShow.splice(i, 1);
      },
      save: function (i) {
        localStorage.formData = JSON.stringify(this.cptShow);
        // $.post("http://lcyq.comsys.net.cn/mzodiac/saveFormTemplate", {
        //   id: this.$root.id,
        //   content: JSON.stringify(this.cptShow)
        // }, function (data) {
        //   if (data.res == 1) {
        //     console.log('success');
        //   }
        // });
      },
      preview: function () {
        if (this.check() == 'error') {
          return;
        }
        var _this = this;
        localStorage.formData = JSON.stringify(this.cptShow);
        this.previewShow = true;
        // $.post("http://lcyq.comsys.net.cn/mzodiac/saveFormTemplate", {
        //     id: this.$root.id,
        //     content: JSON.stringify(this.cptShow)
        //   },
        //   function (data) {
        //     //if (data.res == 1) {
        //     _this.previewShow = true
        //     //}
        //   }
        // );
      },
      check: function () {
        var _this = this;
        setTimeout(function () {
          _this.tips = '';
          _this.tipsClass = '';
        }, 2000);

        for (let i in this.cptShow) {
          if (this.cptShow[i].data.error) {
            this.tips = '表单设计中属性或样式有误，请检查';
            this.tipsClass = 'error';
            return 'error';
          }
        }
        // this.tips = '表单设计成功';
        // this.tipsClass = 'pass';
        return 'pass';
      }
    }
  }

</script>
