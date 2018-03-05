<template>
  <div class="rabbit_base_ace">
    <editor class="ace_body" v-model="content" @init="editorInit" lang="javascript" theme="chrome" width="100%" height="100"></editor>
    <ul class="ace_btn">
      <li @click="submit">提交</li>
      <li @click="detection">检测</li>
      <li>取消</li>
    </ul>
  </div>
</template>

<script>
  import editor from 'vue2-ace-editor-support-chinese'
  import '../../assets/css/baseForm.styl';
  import {
    Base64
  } from 'js-base64';

  export default {
    name: 'rabbit-base-ace',
    prop: ['value'],
    data: function () {
      return {
        content: this.value ? this.value : ''
      }
    },
    components: {
      editor,
    },
    methods: {
      editorInit: function () {
        require('brace/mode/html');
        require('brace/mode/javascript');
        require('brace/mode/less');
        require('brace/theme/chrome');
        require('brace/theme/github');
      },
      submit: function () {
        this.$emit('input', this.content)
      },
      detection: function () {
        console.log(Base64.encode(this.content));
        console.log('检测');
      }
    },
  }

</script>
