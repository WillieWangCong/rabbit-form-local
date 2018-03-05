<template>
  <p class="rabbit_base_fontset">
    <rabbit-base-select class="font_size" label="字体大小" :data="fontSizeData" v-model="fontSet.fontSize"></rabbit-base-select>
    <rabbit-base-select class="font_style" label="字体样式" :data="fontStyleData" v-model="fontSet.fontStyle"></rabbit-base-select>
    <ul class="style_group">
      <li class="bold" :class="{on : fontSet.weight}" @click="bold"><span>B</span></li>
      <li class="under_line" :class="{on : fontSet.underLine}" @click="line"><span>U</span></li>
      <li class="font_color" @click="color">
        <span>A<i :style="{background:fontSet.color.hex}"></i></span>
      </li>
      <photoshop-picker class="color_picker" v-show="isShow" v-model="fontSet.color" />
    </ul>
  </p>
</template>

<script>
  import '../../assets/css/baseForm.styl';
  import {
    Sketch
  } from 'vue-color';

  var maxSize = 50;
  var fontSizeData = '';
  for (let i = 1; i <= maxSize; i++) {
    fontSizeData += i + 'px,';
  }
  fontSizeData = fontSizeData.slice(0, -1).toString();
  var defaultProps = '#194d33';
  export default {
    name: 'rabbit-base-fontset',
    props: ['value'],
    data: function () {
      return {
        fontSet: {
          fontSize: this.value.fontSize,
          fontStyle: this.value.fontStyle,
          weight: this.value.weight,
          underLine: this.value.underLine,
          color: this.value.color,
          fontSizeRem: this.value.fontSizeRem
        },
        isShow: false,
        fontStyleData: 'italic,normal',
        fontSizeData: fontSizeData,
      }
    },

    watch: {
      'fontSet': {
        handler: function () {
          console.log(123);
          this.fontSet.fontSizeRem = parseInt(this.fontSet.fontSize) / parseInt(document.documentElement
            .style.fontSize) + 'rem';
          this.$emit('input', this.fontSet);
        },
        deep: true
      }
    },
    components: {
      'photoshop-picker': Sketch
    },
    methods: {
      bold: function () {
        this.fontSet.weight = !this.fontSet.weight;
      },
      line: function () {
        this.fontSet.underLine = !this.fontSet.underLine;
      },
      color: function () {
        this.isShow = !this.isShow;
      }
    }
  }

</script>
