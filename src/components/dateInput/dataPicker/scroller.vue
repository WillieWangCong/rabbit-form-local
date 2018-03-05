<template>
  <div class="w-scroller">
    <ul class="w-scroller-ul" :style="{transform : 'translateY(' + y + 'em)'}" @touchstart="ts" @touchmove="tm" @touchend="te">
      <li v-for="(item, index) in data" :key="index" :class="{on : item == v}">{{ item }}{{item ? unit : null}}</li>
    </ul>
    <p class="light-height"></p>
  </div>
</template>

<script>
  import $ from 'jquery';
  export default {
    props: ['data', 'value', 'unit'],
    data: function () {
      return {
        v: '',
        y: 0,
        rootPX: parseInt($('html').css('fontSize')),
        touch: {
          s: 0,
          m: 0,
          e: 0,
          y: 0, // 记录上次选择的位置
          b: 2.25 // 定位的关键数
        }
      }
    },
    watch: {
      data: function () {
        if (!this.value) {
          this.v = this.data[2];
          this.$emit('input', this.v);
        } else {
          if (this.v > this.data[this.data.length - 3]) {
            this.v = this.data[this.data.length - 3];
            this.y = -(this.data.length - 5) * this.touch.b;
          } else {
            this.v = this.value;
            for (var i = 0; i < this.data.length; i++) {
              if (this.v == this.data[i]) {
                this.y = -(i - 2) * this.touch.b;
                this.touch.y = this.y;
              }
            }
          }
        }
      },
      v: function () {
        this.$emit('input', this.v);
      }
    },
    methods: {
      ts: function (event) {
        var evt = event || window.event;
        evt = evt.touches[0];
        this.touch.s = evt.clientY;
      },
      tm: function (event) {
        var evt = event || window.event;
        var limit = 0;
        evt = evt.touches[0];
        this.touch.m = evt.clientY - this.touch.s;
        this.y = this.touch.m / this.rootPX + this.touch.y;
        limit = parseInt(this.y);
        if (limit > 0) {
          this.y = 0;
        }
        if (limit <= -(this.data.length - 5) * this.touch.b) {
          this.y = -(this.data.length - 5) * this.touch.b;
        }
      },
      te: function (event) {
        var evt = event || window.event;
        if (Math.abs((this.y % this.touch.b) / this.touch.b) >= 0.5) {
          this.y = (Math.floor(this.y / this.touch.b)) * this.touch.b;
        } else if (Math.abs((this.y % this.touch.b) / this.touch.b) > 0 && (Math.abs((this.y % this.touch.b) / this.touch
            .b) < 0.5)) {
          this.y = (Math.floor(this.y / this.touch.b) + 1) * this.touch.b;
        }
        this.touch.y = this.y;
        this.v = this.data[Math.abs(this.y / this.touch.b) + 2];
      }
    }
  }

</script>
