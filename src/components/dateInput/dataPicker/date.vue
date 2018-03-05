<template>
  <div class="w-date">
    <w-scroller class="w-date-list year" :data="years" v-model="year" :unit="yUnit"></w-scroller>
    <w-scroller class="w-date-list month" :data="months" v-model="month" :unit="mUnit"></w-scroller>
    <w-scroller class="w-date-list day" :data="days" v-model="day" :unit="dUnit"></w-scroller>
  </div>
</template>

<script>
  import Scroller_W from './scroller.vue';
  export default {
    props: ['dvalue'],
    data: function () {
      return {
        yUnit: '年',
        mUnit: '月',
        dUnit: '日',
        year: this.dvalue ? this.dvalue.split('-')[0] : '',
        month: this.dvalue ? this.dvalue.split('-')[1] : '',
        day: this.dvalue ? this.dvalue.split('-')[2] : '',
        years: [],
        months: [],
        days: []
      }
    },
    computed: {
      fullDate: function () {
        return this.year + '-' + this.month + '-' + this.day;
      }
    },
    watch: {
      year: function () {
        this.getDays();
        for (var n = 1; n <= 2; n++) {
          this.days.push('');
        }
      },
      month: function () {
        this.getDays();
        for (var n = 1; n <= 2; n++) {
          this.days.push('');
        }
      },
      fullDate: function () {
        this.$emit('input', this.fullDate);
      }
    },
    mounted: function () {
      this.years = ['', ''];
      for (var y = 1975; y <= new Date().getFullYear() + 30; y++) {
        this.years.push(y);
      }
      this.months = ['', ''];
      for (var m = 1; m <= 12; m++) {
        this.months.push(m.toString().length > 1 ? m : '0' + m);
      }
      this.getDays();

      for (var n = 1; n <= 2; n++) {
        this.years.push('');
        this.months.push('');
        this.days.push('');
      }
    },
    methods: {
      getDays: function () {
        var days = 31;
        if (/^2$/gi.test(this.month)) {
          if (this.year % 4 == 0) {
            days = 29;
          } else if (this.year % 4 != 0) {
            days = 28;
          }
        } else if (/^[469]$|^11$/gi.test(this.month)) {
          days = 30;
        }
        this.days = ['', ''];
        for (var d = 1; d <= days; d++) {
          this.days.push(d.toString().length > 1 ? d : '0' + d);
        }
      }
    },
    components: {
      'w-scroller': Scroller_W
    }
  }

</script>
