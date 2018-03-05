<template>
  <div class="select_picker">
    <div class="body" :class="{on : show}">
      <div class="operate">
        <p class="cancel" @click="cancel">取消</p>
        <p class="ok" @click="ok">确定</p>
      </div>
      <w-scroller :data="list" v-model="v"></w-scroller>
    </div>
  </div>
</template>

<script>
  import WScroller from './scroller.vue';
  import $ from 'jquery';
  export default {
    name: 'select-picker',
    props: ['dataList', 'value'],
    data: function () {
      return {
        list: [],
        v: this.value,
        show: false
      }
    },
    mounted: function () {
      $.extend(this.list, this.dataList);
      if (this.list[0] != '') {
        this.list.unshift('');
        this.list.unshift('');
        this.list.push('');
        this.list.push('');
      }
      var _this = this;
      let timer = setTimeout(function () {
        _this.show = true;
        window.clearTimeout(timer);
      }, 0);
    },
    components: {
      'w-scroller': WScroller
    },
    methods: {
      cancel: function () {
        var _this = this;
        this.show = false;
        let timer = setTimeout(function () {
          _this.$parent.showPicker = false;
          window.clearTimeout(timer);
        }, 300);

      },
      ok: function () {
        var _this = this;
        this.show = false;
        let timer = setTimeout(function () {
          _this.$parent.showPicker = false;
          window.clearTimeout(timer);
        }, 300);
        this.$emit('input', this.v);
      }
    }
  }

</script>
