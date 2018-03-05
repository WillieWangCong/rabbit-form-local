<template>
  <p class="rabbit_base_input">
    <label>{{ label }}</label>
    <input type="text" v-model="v" />
  </p>
</template>

<script>
  import '../../assets/css/baseForm.styl';
  export default {
    name: 'rabbit-base-input',
    props: ['label', 'value'],
    data: function () {
      return {
        v: this.value
      }
    },
    watch: {
      v: function () {
        this.$emit('input', this.v);
      }
    }
  }

</script>
