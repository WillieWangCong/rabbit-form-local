<template>
  <div class="rabbit_base_titlepst">
    <p class="titlepst">
      <label>标题位置</label>
      <ul>
        <li :class="{'on' : title.pst=='top'}" @click="pst('top')">居上</li>
        <li :class="{'on' : title.pst=='left'}" @click="pst('left')">居左</li>
        <li :class="{'on' : title.pst=='right'}" @click="pst('right')">居右</li>
      </ul>
    </p>
    <p class="titlewidth">
      <label>标题宽度</label>
      <input type="number" min="0" max="100" v-model="title.width" />
    </p>
  </div>
</template>

<script>
  export default {
    name: 'rabbit-base-titlepst',
    props: ['value'],
    data: function () {
      return {
        title: {
          pst: this.value.pst,
          width: this.value.width
        }
      }
    },
    watch: {
      title: {
        handler: function () {
          this.$emit('input', this.title);
        },
        deep: true
      }
    },
    methods: {
      pst: function (p) {
        this.title.pst = p;
      }
    }
  }

</script>
