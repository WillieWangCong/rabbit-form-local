<template>
  <ul class="form_operate">
    <li v-show="data.exchange" @click="exchange"><img src="../../assets/images/f-icon-22.png" /></li>
    <li v-show="data.upShow" @click="up"><img src="../../assets/images/f-icon-23.png" /></li>
    <li @click="del"><img src="../../assets/images/f-icon-24.png" /></li>
  </ul>
</template>

<script>
  import '../../assets/css/formOperate.styl';
  import $ from 'jquery';

  export default {
    name: 'form-operate',
    props: ['operate'],
    data: function () {
      return {
        data: this.operate
      }
    },
    methods: {
      del: function (event) {
        var evt = event || window.event;
        evt.preventDefault();
        evt.stopPropagation();

        let app = this.$parent.$parent;
        let parent = this.$parent;
        let yCpt = null;
        let cptShow = app.cptShow;

        for (let i = 0; i < cptShow.length; i++) {
          if (cptShow[i].data == parent.data) {
            yCpt = cptShow[i];
            yCpt.display = 'block';
            yCpt.data.operate.exchange = false;
            if (cptShow[i - 1] && yCpt.groupId == cptShow[i - 1].groupId) {
              cptShow[i - 1].display = 'block';
              cptShow[i - 1].data.operate.exchange = false;
              yCpt.groupId = '';
              cptShow[i - 1].groupId = '';
            }
            if (cptShow[i + 1] && yCpt.groupId == cptShow[i + 1].groupId) {
              cptShow[i + 1].display = 'block';
              cptShow[i + 1].data.operate.exchange = false;
              yCpt.groupId = '';
              cptShow[i + 1].groupId = '';
            }
          }
        }

        this.$emit('del')
      },
      up: function (event) {
        var evt = event || window.event;
        evt.preventDefault();
        evt.stopPropagation();

        let app = this.$parent.$parent;
        let parent = this.$parent;
        for (let i = 0; i < app.cptShow.length; i++) {
          if (app.cptShow[i].data == parent.data) {
            var groupId = Math.random();
            if (parseInt(app.cptShow[i].liWidth) + parseInt(app.cptShow[i - 1].liWidth) <= 100) {
              if (!(app.cptShow[i].groupId || app.cptShow[i - 1].groupId)) {
                // 可以编组
                app.cptShow[i].groupId = groupId;
                app.cptShow[i - 1].groupId = groupId;
                app.cptShow[i].display = 'inline-block';
                app.cptShow[i - 1].display = 'inline-block';
                app.cptShow[i + 1] ? app.cptShow[i + 1].data.operate.upShow = false : '';
                app.cptShow[i].data.operate.upShow = false;
                app.cptShow[i - 1].data.operate.upShow = false;
                app.cptShow[i].data.operate.exchange = true;
                app.cptShow[i - 1].data.operate.exchange = true;
                break;
              }
            }
          }
        }
        /* 初始化cptShow */
        setTimeout(function () {
          for (let i = 0; i < $('.col_middle .drag_area > li').length; i++) {
            app.cptShow[i].initialY = app.cptShow[i].y = $('.col_middle .drag_area > li').eq(i).offset().top;
          }
        }, 0)
      },
      exchange: function (event) {
        var evt = event || window.event;
        evt.preventDefault();
        evt.stopPropagation();
        let app = this.$parent.$parent;
        let parent = this.$parent;
        for (let i = 0; i < app.cptShow.length; i++) {
          if (app.cptShow[i].data == parent.data) {
            if (app.cptShow[i - 1] && app.cptShow[i].groupId == app.cptShow[i - 1].groupId) {
              var p = app.cptShow[i];
              var p2 = app.cptShow[i - 1];
              app.cptShow.splice(i, 1, p2);
              app.cptShow.splice(i - 1, 1, p);
            } else if (app.cptShow[i + 1] && app.cptShow[i].groupId == app.cptShow[i + 1].groupId) {
              var p = app.cptShow[i];
              var p2 = app.cptShow[i + 1];
              app.cptShow.splice(i, 1, p2);
              app.cptShow.splice(i + 1, 1, p);
            }
            break;
          }
        }
      }
    }
  }

</script>
