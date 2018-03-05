<template>
  <div class="rabbit_base_list">
    <label>{{ label }}</label>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <img v-show="!item.selected" src="../../assets/images/f-icon-26.png" @click="select(index)" />
        <img v-show="item.selected" src="../../assets/images/f-icon-27.png" @click="select(index)" />
        <input type="text" v-model="item.label" />
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
    name: 'rabbit-base-list',
    props: ['label', 'data', 'value', ],
    data: function () {
      return {
        list: this.data.data,
        cData: this.data,
        type: 'radio'
      }
    },

    mounted: function () {
      this.$watch('cData.multiple', function (newVal, oldVal) {
        for (let j in this.list) {
          this.list[j].selected = false;
        }
        if (this.cData.multiple == 'true') {
          this.cData.type = 'checkbox';
          this.$emit('input', []);
        } else {
          this.cData.type = 'radio';
          this.$emit('input', null)
        }
      })
    },
    methods: {
      select: function (i) {
        if (this.cData.multiple == 'true') {
          this.list[i].selected = !this.list[i].selected;
          let arr = [];
          for (let j in this.list) {
            if (this.list[j].selected) {
              arr.push(this.list[j].label);
            }
          }
          this.$emit('input', arr);
        } else {
          for (let j in this.list) {
            if (i == j) {
              continue;
            }
            this.list[j].selected = false;
          }
          this.list[i].selected = !this.list[i].selected;
          if (this.list[i].selected) {
            this.$emit('input', this.list[i].label);
          } else {
            this.$emit('input', null);
          }
        }
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
        this.list.push({
          selected: false,
          label: ''
        });
      },
      del: function (i) {
        this.list.splice(i, 1);
      }
    }
  }

</script>
