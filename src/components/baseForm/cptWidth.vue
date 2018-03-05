<template>
  <p class="rabbit_base_cptwidth">
    <label>组件宽度</label>
    <ul>
      <li v-for="(item,index) in cptWList" :key="index" :class="{on : item == value}" @click="select(index)">{{ item }}</li>
    </ul>
  </p>
</template>
<script>
  export default {
    name: 'rabbit-base-cptwidth',
    props: ['value'],
    data: function () {
      return {
        cptW: this.value,
        cptWList: ['20%', '40%', '60%', '80%', '100%']
      }
    },
    watch: {
      cptW: function () {
        this.$emit('input', this.cptW);
      }
    },
    methods: {
      select: function (i) {
        this.cptW = this.cptWList[i];
      }
    }
  }

</script>
