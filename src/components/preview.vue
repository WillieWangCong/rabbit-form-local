<template>
  <div class="body rabbit_preview">
    <div class="wrapper rabbit_preview" :class="className">
      <div class="main">
        <div class="header">表单预览</div>
        <img class="close" :src="closeSrc" @mouseover="mv('close')" @mouseout="mo('close')" @click="close" />
        <ul class="preview">
          <li class="pc" @click="exchange('pc')">
            <img :src="pcSrc" @mouseover="mv('pc')" @mouseout="mo('pc')" />
            <p>电脑预览</p>
          </li>
          <li class="mt" @click="exchange('phone')">
            <img :src="phoneSrc" @mouseover="mv('phone')" @mouseout="mo('phone')" />
            <p>手机预览</p>
          </li>
          <li>
            <img :src="fbSrc" @mouseover="mv('fb')" @mouseout="mo('fb')" />
            <p>发布</p>
          </li>
        </ul>
        <div id="app">
          <ul>
            <li v-for="(item, index) in cptList" :key="index" :style="{
        'width' : item.liWidth.replace('％', '%'),
        'display' : item.display
        }">
              <component :is="item.cpt" use="true" v-model="item.data"></component>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../assets/css/preview.styl';
  import $ from 'jquery';


  export default {
    data: function () {
      return {
        cptList: [],
        className: '',
        closeSrc: require('../assets/images/prev-imgs/f-icon-close.png'),
        pcSrc: require('../assets/images/prev-imgs/f-icon-1.png'),
        phoneSrc: require('../assets/images/prev-imgs/f-icon-2-a.png'),
        fbSrc: require('../assets/images/prev-imgs/f-icon-3-a.png'),
      }
    },
    created: function () {
      var _this = this;
      console.log(JSON.parse(localStorage.formData));
      this.cptList = localStorage.formData ?　JSON.parse(localStorage.formData) : [];
      // $.post("http://lcyq.comsys.net.cn/mzodiac/getFormTemplate", {
      //   id: 15,
      // }, function (data) {
      //   data = JSON.parse(data);
      //   _this.cptList = data;
      // });
    },
    methods: {
      close: function () {
        $('html').removeClass('htmlFont');
        this.$parent.previewShow = false;
      },
      exchange: function (t) {
        if (t == 'pc') {
          this.phoneSrc = require('../assets/images/prev-imgs/f-icon-2-a.png')
          $('html').removeClass('htmlFont');
          this.className = '';
          this.$root.device = 'pc';
        } else if (t == 'phone') {
          this.pcSrc = require('../assets/images/prev-imgs/f-icon-1-a.png');
          $('html').addClass('htmlFont');
          this.className = 'phone';
          this.$root.device = 'phone';
        }
      },
      mv: function (t) {
        if (t == 'close') {
          this.closeSrc = require('../assets/images/prev-imgs/f-icon-close-a.png')
        }
        if (t == 'pc') {
          this.pcSrc = require('../assets/images/prev-imgs/f-icon-1.png')
        }
        if (t == 'phone') {
          this.phoneSrc = require('../assets/images/prev-imgs/f-icon-2.png')
        }
        if (t == 'fb') {
          this.fbSrc = require('../assets/images/prev-imgs/f-icon-3.png')
        }
      },
      mo: function (t) {
        if (t == 'close') {
          this.closeSrc = require('../assets/images/prev-imgs/f-icon-close.png')
        }
        if (t == 'pc') {
          if (this.className == '') {
            return;
          }
          this.pcSrc = require('../assets/images/prev-imgs/f-icon-1-a.png')
        }
        if (t == 'phone') {
          if (this.className == 'phone') {
            return;
          }
          this.phoneSrc = require('../assets/images/prev-imgs/f-icon-2-a.png')
        }
        if (t == 'fb') {
          this.fbSrc = require('../assets/images/prev-imgs/f-icon-3-a.png')
        }
      }
    }
  }

</script>
<style>
  .htmlFont {
    font-size: 32px!important;
  }

</style>
