<template>
  <div class="w-time">
    <w-scroller class="w-time-list hour" :data="hours" v-model="hour" :unit="hUnit"></w-scroller>
    <w-scroller class="w-time-list minute" :data="minutes" v-model="minute" :unit="mUnit"></w-scroller>
  </div>
</template>

<script>
  import Scroller_W from './scroller.vue';
  export default {
    props: ['dvalue'],
    data: function () {
      return {
        hUnit: '时',
        mUnit: '分',
        hour: this.dvalue ? this.dvalue.split(':')[0] : '',
        minute: this.dvalue ? this.dvalue.split(':')[1] : '',
        hours: [],
        minutes: [],
      }
    },
    computed: {
      fullTime: function () {
        return this.hour + ':' + this.minute;
      }
    },
    watch: {
      fullTime: function () {
        this.$emit('input', this.fullTime);
      }
    },
    mounted: function () {
      this.hours = ['', ''];
      for (var h = 0; h <= 23; h++) {
        this.hours.push(h.toString().length > 1 ? h : '0' + h);
      }
      this.minutes = ['', ''];
      for (var m = 0; m <= 59; m++) {
        this.minutes.push(m.toString().length > 1 ? m : '0' + m);
      }
      for (var n = 1; n <= 2; n++) {
        this.hours.push('');
        this.minutes.push('');
      }
    },
    components: {
      'w-scroller': Scroller_W
    }
  }

</script>
