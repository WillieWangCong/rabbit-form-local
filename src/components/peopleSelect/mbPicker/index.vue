<template>
  <div class="people_picker_mb">
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
        <div>
          <li v-for="(item, i) in list" :key="i" @click="enter(i)" v-if="item.dept">
            <label>{{ item.dept }}</label>
          </li>
        </div>
        <div v-for="(item,i) in list" v-if="!item.dept">
          <li v-if="item.list" v-for="(p,i) in item.list" :key="i" @click="select(item.list,i)">
            <label>
              <input type="checkbox" :value="p" v-model="selectedList" />{{ p.realname }}</label>
          </li>
          <li v-if="!item.list" :key="i" @click="select(i)">
            <label>
              <input type="checkbox" :value="item" v-model="selectedList" />{{ item.realname }}</label>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>


<script>
  import '../../../assets/css/peopleInput.styl';
  export default {
    name: 'people-picker-mb',
    props: ['dataList', 'value'],
    data: function () {
      return {
        list: this.dataList,
        selectedList: this.value ? this.value : [],
        allSelected: false,
        showBack: false
      }
    },
    watch: {
      list: function () {
        if (this.list == this.dataList) {
          this.showBack = false;
        } else {
          this.showBack = true;
        }

        let num = 0;
        let listNum = 0;
        for (let i in this.selectedList) {
          for (let j in this.list) {
            if (this.list[j].dept) {
              continue;
            }
            if (this.list[j].list) {
              for (let k in this.list[j].list) {
                if (this.selectedList[i] == this.list[j].list[k]) {
                  num++;
                  break;
                }
              }
            } else {
              if (this.selectedList[i] == this.list[j]) {
                num++;
                break;
              }
            }
          }
        }

        for (let i in this.list) {
          if (this.list[i].dept) {
            continue;
          }
          if (this.list[i].list) {
            listNum = this.list[i].list.length;
          } else {
            listNum = this.list.length;
          }
        }
        if (listNum == num) {
          this.allSelected = true;
        } else {
          this.allSelected = false;
        }

      },
      selectedList: function () {
        var num = 0;
        var listNum = 0;
        for (let j in this.list) {
          if (this.list[j].dept) {
            continue;
          }
          if (this.list[j].list) {
            listNum = this.list[j].list.length;
            for (let i in this.selectedList) {
              for (let k in this.list[j].list) {
                if (this.list[j].list[k] == this.selectedList[i]) {
                  num++;
                  continue;
                }
              }
            }
          } else {
            listNum = this.list.length;
            for (let i in this.selectedList) {
              if (this.list[j] == this.selectedList[i]) {
                num++;
                continue;
              }
            }
          }
        }
        if (listNum == num) {
          this.allSelected = true;
        } else {
          this.allSelected = false;
        }
      }
    },
    methods: {
      back: function () {
        var _this = this;

        function findList(l) {
          for (let i in l) {
            if (_this.list == l[i].list) {
              _this.list = l;
              return;
            } else {
              if (_this.list == _this.dataList) {
                _this.$parent.showPicker = false;
                return;
              }
              findList(l[i].list);
            }
          }
        }
        findList(this.dataList);
      },
      enter: function (i) {
        this.list = this.list[i].list;
      },
      clear: function () {
        this.selectedList = [];
      },
      selectAll: function () {
        this.allSelected = !this.allSelected;
        if (this.allSelected) { //全选
          outerloop: for (let i in this.list) {
            if (this.list[i].dept) {
              continue;
            }
            if (this.list[i].list) {
              outerloop02: for (let k in this.list[i].list) {
                for (let j in this.selectedList) {
                  if (this.list[i].list[k] == this.selectedList[j]) {
                    continue outerloop02;
                  }
                }
                this.selectedList.push(this.list[i].list[k]);
              }
            }
            else {
              for (let j in this.selectedList) {
                if (this.list[i] == this.selectedList[j]) {
                  continue outerloop;
                }
              }
              this.selectedList.push(this.list[i]);
            }
          };
        }
        else { //全不选
          for (let i in this.list) {
            if (this.list[i].dept) {
              continue;
            }
            if (this.list[i].list) {
              for (let k in this.list[i].list) {
                for (let j in this.selectedList) {
                  if (this.list[i].list[k] == this.selectedList[j]) {
                    this.selectedList.splice(j, 1);
                  }
                }
              }
            } else {
              for (let j in this.selectedList) {
                if (this.list[i] == this.selectedList[j]) {
                  this.selectedList.splice(j, 1);
                }
              }
            }
          }
        }
      },
      select: function (i) {
        var list = arguments[0];
        if (arguments.length == 2) {
          i = arguments[1];
          for (let j in this.selectedList) {
            if (list[i] == this.selectedList[j]) { //取消
              this.selectedList.splice(j, 1);
              this.allSelected = false;
              return;
            }
          }
          this.selectedList.push(list[i]);
        } else {
          for (let j in this.selectedList) {
            if (this.list[i] == this.selectedList[j]) { //取消
              this.selectedList.splice(j, 1);
              this.allSelected = false;
              return;
            }
          }
          this.selectedList.push(this.list[i]);
        }
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
