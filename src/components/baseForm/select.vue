<template>
  <p class="rabbit_base_select">
    <label>{{ label }}</label>
    <select v-model="v ">
        <option v-for="(item,i) in d" :key="i" :value ="item ">{{ item }}</option>        
    </select>
  </p>
</template>
<script>
  import '../../assets/css/baseForm.styl';
  export default {
    name: 'rabbit-base-select',
    props: ['label', 'data', 'value'],
    data: function () {
      return {
        v: this.value,
        d: this.data.split(',')
      }
    },
    watch: {
      v: function () {
        this.$emit('input', this.v);
      }
    }
  }

</script>
