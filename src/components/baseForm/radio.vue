<template>
  <p class="rabbit_base_radio">
    <label>{{ label }}</label>
    <label v-for="(item,i) in d" :key="i"><input type="radio" :value="item" v-model="v" />{{ dLabel[i] }}</label>
  </p>
</template>

<script>
  import '../../assets/css/baseForm.styl';
  export default {
    name: 'rabbit-base-radio',
    props: ['label', 'value', 'data', 'dataLabel'],
    data: function () {
      return {
        v: this.value,
        d: this.data.split(','),
        dLabel: this.dataLabel.split(',')
      }
    },
    watch: {
      v: function () {
        this.$emit('input', this.v);
      }
    }
  }

</script>
