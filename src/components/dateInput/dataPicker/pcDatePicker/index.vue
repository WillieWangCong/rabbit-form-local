<template>
  <div class="w_datetime_picker_pc bottom">
    <div class="w_picker_pc_bg" @click="close"></div>
    <div class="w-calendar">
      <div class="date" v-show="md == 'date'">
        <h3>
          <i class="icon_left">
            <em @click="toYear('prev')">&lt;&lt;</em>
            <em @click="toMonth('prev')">&lt;</em>
          </i>
          <span>{{ year }} - {{ showMonth }}</span>
          <i class="icon_right">
            <em @click="toMonth('next')">&gt;</em>
            <em @click="toYear('next')">&gt;&gt;</em>          
          </i>
        </h3>
        <div class="dateTitles">
          <p v-for="(item,index) in dateTitles" :key="index">{{ item }}</p>
        </div>
        <ul>
          <li v-for="(item,index) in dates" :key="index" :class="{on : item == showDate}" @click="selectDate(index)"><span>{{ item }}</span></li>
        </ul>
      </div>
      <div class="time" v-show="md == 'time'">
        <h3>
          <span>{{ year }} - {{ showMonth }} - {{ showDate }}</span>
        </h3>
        <div class=" time_box ">
          <div class="hours ">
            <ul>
              <li v-for="(item,index) in hours " :key="index" :class="{on : item == time.split(':')[0]}" @click="hoursSlt(index)"><span>{{ item }}</span></li>
            </ul>
          </div>
          <div class="minutes ">
            <ul>
              <li v-for="(item,index) in minutes " :key="index" :class="{on : item == time.split(':')[1]}" @click="minutesSlt(index)"><span>{{ item }}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="btm ">
        <span @click="exchange('time')" v-show="md=='date'">选择时间</span>
        <span @click="exchange('date')" v-show="md=='time'">选择日期</span>
        <button @click="submit ">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';

  function getDay(vue) {
    var dates = 31;
    var date = new Date();
    var year = vue.year;
    var month = arguments.length == 1 ? vue.showMonth : arguments[2] == 'm' ? arguments[1] : vue.showMonth;
    var day = (new Date(year + '-' + month + '-' + 1)).getDay();

    if (/^2$/gi.test(month)) {
      if (year % 4 == 0) {
        dates = 29;
      } else if (year % 4 != 0) {
        dates = 28;
      }
    } else if (/^[469]$|^11$/gi.test(month)) {
      dates = 30;
    }

    vue.showMonth = (month.toString().length == 1 ? ('0' + month) : month);


    vue.dates = [];
    for (var i = 1; i <= day; i++) {
      vue.dates.push('');
    }
    for (var i = 1; i <= dates; i++) {
      vue.dates.push(i.toString().length == 1 ? '0' + i : i);
    }
  }


  export default {
    name: 'w-datetime-picker-pc',
    props: ['dvalue'],
    data: function () {
      return {
        year: (new Date()).getFullYear(),
        dateTitles: ['日', '一', '二', '三', '四', '五', '六'],
        dates: [],
        showMonth: (new Date()).getMonth() + 1,
        showDate: (new Date()).getDate(),
        md: 'date',
        time: '00:00',
        hours: [],
        minutes: []
      }
    },
    watch: {
      time: function () {
        var time = ''
        if (this.time != '') {
          time = this.year + '-' + this.showMonth + '-' + this.showDate + '  ' + this.time;
        }
        this.$emit('input', time);
      }
    },
    mounted: function () {
      /* 初始化数据 */
      if (this.dvalue) {
        var date = this.dvalue ? this.dvalue.slice(0, 10) : '';
        var time = this.dvalue ? this.dvalue.slice(-5) : '';
        this.year = parseInt(date.split('-')[0]);
        this.showMonth = parseInt(date.split('-')[1]);
        this.showDate = parseInt(date.split('-')[2]);
        this.time = time;
      }

      for (let i = 0; i < 24; i++) {
        this.hours.push(i.toString().length == 1 ? '0' + i : i);
      }

      for (let i = 0; i < 60; i++) {
        this.minutes.push(i.toString().length == 1 ? '0' + i : i);
      }

      var that = this;
      window.setTimeout(function () {
        getDay(that);
        that.$emit('input', that.year + '-' + that.showMonth + '-' + that.showDate);
      }, 0);


      var initialTop = $('.w_datetime_picker_pc').offset().top;

      function pickerPst() {
        console.log($(window).height() - initialTop);
        if ($(window).height() - initialTop > $('.w_datetime_picker_pc').outerHeight()) {
          $('.w_datetime_picker_pc').removeClass('top').addClass('bottom');
        } else {
          $('.w_datetime_picker_pc').removeClass('bottom').addClass('top');
        }
      }

      window.setTimeout(function () {
        pickerPst();
        $(window).on('scroll.picker', pickerPst);
        $(window).on('resize.picker', pickerPst);
      }, 0)
    },
    methods: {
      toYear: function (t) {
        var date = new Date();
        var year = parseInt(this.year);
        if (t == 'prev') {
          year = year - 1;
          this.year = this.year - 1;
          getDay(this, year, 'y');
        } else if (t == 'next') {
          year = year + 1;
          this.year = this.year + 1;
          getDay(this, year, 'y');
        }
      },
      toMonth: function (t) {
        var date = new Date();
        var month = parseInt(this.showMonth);
        if (t == 'prev') {
          if (month == 1) {
            this.year = this.year - 1;
            month = 12;
          } else {
            month--;
          }
          getDay(this, month, 'm');
        } else if (t == 'next') {
          if (month == 12) {
            this.year = this.year + 1;
            month = 1;
          } else {
            month++;
          }
          getDay(this, month, 'm');
        }
      },
      selectDate: function (index) {
        if (this.dates[index] == '') {
          return;
        }
        this.showDate = this.dates[index];
      },
      submit: function () {
        $(window).off('.picker');
        this.$emit('picker', this.year + '-' + this.showMonth + '-' + this.showDate + ' ' + this.time);
      },
      exchange: function (t) {
        this.md = t;
      },
      hoursSlt: function (i) {
        this.time = this.hours[i] + ':' + this.time.split(':')[1];
      },
      minutesSlt: function (i) {
        this.time = this.time.split(':')[0] + ':' + this.minutes[i];
      },
      close: function () {
        $(window).off('.picker');
        this.$emit('picker', 'cancel');
      }
    },
  }

</script>
