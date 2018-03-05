<template>
  <div class="rabbit_base_select_list">
    <label>{{ label }}</label>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <img v-show="item == '' || item != v" src="../../assets/images/f-icon-26.png" @click="select(index)" />
        <img v-show="item != '' && item == v" src="../../assets/images/f-icon-27.png" @click="select(index)" />
        <input type="text" v-model="list[index]" />
        <div class="move">
          <span class="up" @click="up(index)"></span>
          <span class="down" @click="down(index)"></span>
        </div>
        <img src="../../assets/images/f-icon-25.png" @click="del(index)" />
      </li>
    </ul>
    <div class="add" @click="add"><span>+</span>添加选项</div>
  </div>
</template>

<script>
  import '../../assets/css/baseForm.styl';
  export default {
    name: 'rabbit-base-select-list',
    props: ['label', 'data', 'value', ],
    data: function () {
      return {
        list: this.data,
        v: this.value,
      }
    },
    methods: {
      select: function (i) {
        if (this.v == this.list[i]) {
          this.v = '';
          this.$emit('input', this.v);
          return;
        }
        this.v = this.list[i];
        this.$emit('input', this.v);
      },
      up: function (i) {
        if (i == 0) {
          return;
        }
        let y = this.list.splice(i, 1)[0];
        this.list.splice(i - 1, 0, y);
      },
      down: function (i) {
        if (i == this.list.length - 1) {
          return
        }
        let y = this.list.splice(i, 1)[0];
        this.list.splice(i + 1, 0, y);
      },
      add: function () {
        this.list.push('');
      },
      del: function (i) {
        this.list.splice(i, 1);
      }
    }
  }

</script>
