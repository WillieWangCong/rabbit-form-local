<template>
  <div class="dept_picker_pc bottom">
    <div class="bg" @click="cancel"></div>
    <div class="m_body">
      <h3>选择部门</h3>
      <div class="body">
        <div class="allList">
          <p>
            <em><label><input type="checkbox" v-model="allSelected"/>全选</label></em>
          </p>
          <ul>
            <li v-for="(item, i) in list" :style="{'paddingLeft': item.level * 10 + 'px'}"><label><input type="checkbox" :value="item" v-model="selectedList" />{{item.dept}}</label></li>
          </ul>
        </div>
        <div class="selectList">
          <p><label>已选({{selectedList.length}})</label><span @click="clear">清空</span></p>
          <ul>
            <li v-for="(item, i) in selectedList" :key="i"><label>{{ item.dept }}</label></li>
          </ul>
        </div>
      </div>
      <div class="btn_group">
        <button class="cancel" @click="cancel">取消</button>
        <button class="ok" @click="submit">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../assets/css/deptInput.styl';
  import $ from 'jquery';

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
    name: 'dept-picker-pc',
    props: ['dataList', 'value'],
    data: function () {
      return {
        list: format(this.dataList),
        selectedList: this.value ? this.value : [],
        allSelected: false
      }
    },

    mounted: function () {

      var initialTop = $('.dept_picker_pc').offset().top;

      function pickerPst() {
        if ($(window).height() - initialTop > $('.dept_picker_pc').outerHeight()) {
          $('.dept_picker_pc').removeClass('top').addClass('bottom');
        } else {
          $('.dept_picker_pc').removeClass('bottom').addClass('top');
        }
      }

      window.setTimeout(function () {
        pickerPst();
        $(window).on('scroll.picker', pickerPst);
        $(window).on('resize.picker', pickerPst);
      }, 0)
    },
    watch: {
      allSelected: function (val, oldVal) {
        if (val) {
          this.selectedList = this.list;
        } else {
          if (this.selectedList.length == this.list.length) {
            this.selectedList = [];
          }
        }
      },
      selectedList: {
        handler: function (val) {
          if (val.length == this.list.length) {
            this.allSelected = true;
          } else {
            this.allSelected = false;
          }
        },
        deep: true
      }
    },
    methods: {
      clear: function () {
        this.selectedList = [];
      },
      cancel: function () {
        this.$parent.showPicker = false;
      },
      submit: function () {
        this.$emit('input', this.selectedList);
        this.$parent.showPicker = false;
      }
    }
  }

</script>
