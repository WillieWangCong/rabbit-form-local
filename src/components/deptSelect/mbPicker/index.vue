<template>
  <div class="dept_picker_mb">
    <div class="header">
      <span class="back" @click="back">
        <img src="../../../assets/images/f-icon-30.png" />
        <i>返回</i>
      </span>
      <span>人员选择</span>
      <!-- <span class="submit" @click="submit">确定</span> -->
    </div>
    <div class="body">
      <ul class="list">
        <li v-for="(item, i) in list" :key="i">
          <label>
            <input type="checkbox" :value="item" v-model="selectedList" />{{ item.dept }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
  import '../../../assets/css/deptInput.styl';

  function format(arr) {
    let newArr = [];
    let level = 0;

    function arrloop(a, l) {
      for (let i in a) {
        if (a[i].dept) {
          newArr.push({
            dept: a[i].dept,
            level: l
          });
          level = l;
        }
        if (a[i].list.length > 0) {
          arrloop(a[i].list, ++level)
        }
      }
    }
    arrloop(arr, level);
    return newArr;
  }
  export default {
    name: 'people-picker-mb',
    props: ['dataList', 'value'],
    data: function () {
      return {
        list: format(this.dataList),
        selectedList: this.value ? this.value : [],
        showBack: false
      }
    },
    watch: {
      selectedList: {
        handler: function (val) {
          this.$emit('input', val);
        },
        deep: true
      }
    },
    methods: {
      back: function () {
        this.$parent.showPicker = false;
      }
    }
  }

</script>
