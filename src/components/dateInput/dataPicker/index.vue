<template>
  <div class="w-datetime-picker">
    <div @click="pickerShow">
      <input type="text" :placeholder="placeholder" :value="value" disabled/>
    </div>
    <w-picker v-if="show && this.$root.device=='phone'" @picker="reception" :dvalue="value"></w-picker>
    <w-picker-pc v-if="show && this.$root.device=='pc'" @picker="reception" :dvalue="value"></w-picker-pc>
  </div>
</template>

<script>
  import Picker_W from './picker.vue'
  import PCPicker_W from './pcDatePicker/index.vue'
  export default {
    name: 'w-datetime-picker',
    props: ['placeholder', 'value'],
    data: function () {
      return {
        show: false,
      }
    },
    components: {
      'w-picker': Picker_W,
      'w-picker-pc': PCPicker_W
    },
    methods: {
      pickerShow: function () {
        this.show = true;
      },
      reception: function (v) {
        var _this = this;
        if (v != 'cancel') {
          this.$emit('input', v);
        }
        window.setTimeout(function () {
          _this.show = false;
        }, 300);
      }
    }
  }

</script>
