<template>
  <div class="picker_background">
    <div class="picker_main" :class="{on : ts}">
      <p class="picker_operate">
        <span class="cancel" @click="cancel">取消</span>
        <span class="ok" @click="ok">确定</span>
      </p>
      <div class="picker-select">
        <span class="picker-date" :class="{on : pickerName=='date'}" @click="to('date')">日期</span>
        <span class="picker-time" :class="{on : pickerName=='time'}" @click="to('time')">时间</span>
      </div>
      <w-date v-model="date" v-show="pickerName=='date'" :dvalue="dvalue.slice(0,10)"></w-date>
      <w-time v-model="time" v-show="pickerName=='time'" :dvalue="dvalue.slice(-5)"></w-time>
    </div>
  </div>
</template>

<script>
  import Date_W from './date.vue';
  import Time_W from './time.vue';
  export default {
    props: ['dvalue'],
    data: function () {
      return {
        ts: false,
        pickerName: 'date',
        date: this.dvalue ? this.dvalue.slice(0, 10) : '',
        time: this.dvalue ? this.dvalue.slice(-5) : ''
      }
    },
    mounted: function () {
      var _this = this;
      window.setTimeout(function () {
        _this.ts = true;
      }, 0);
    },
    computed: {
      fullDataTime: function () {
        return this.date + '  ' + this.time;
      }
    },
    components: {
      'w-date': Date_W,
      'w-time': Time_W
    },
    methods: {
      to: function (t) {
        this.pickerName = t;
      },
      cancel: function () {
        var _this = this;
        this.$emit('picker', 'cancel')
        window.setTimeout(function () {
          _this.ts = false;
        }, 0);
      },
      ok: function () {
        var _this = this;
        this.$emit('picker', this.fullDataTime);
        window.setTimeout(function () {
          _this.ts = false;
        }, 0);
      }
    }
  }

</script>
