<template>
  <div class="people_input_edit content">
    <div class="base_attr">
      <h3>基本属性</h3>
      <div class="edit_content">
        <rabbit-base-input label="字段名称" v-model="data.base.name" v-verify="{vfy:['required'], data:data}"></rabbit-base-input>
        <rabbit-base-input label="字段标题" v-model="data.base.title"></rabbit-base-input>
        <rabbit-base-radio label="是否必填" data="true,false" data-label="是,否" v-model="data.base.req"></rabbit-base-radio>
      </div>
    </div>
    <div class="base_style ">
      <h3>基本样式</h3>
      <div class="edit_content ">
        <rabbit-base-select label="字体名称" data="黑体,宋体,微软雅黑,幼圆" v-model="data.style.font"></rabbit-base-select>
        <rabbit-base-fontset v-model="data.style.fontSet"></rabbit-base-fontset>
        <rabbit-base-titlepst v-model="data.style.title"></rabbit-base-titlepst>
        <rabbit-base-cptwidth v-model="data.style.cptWidth"></rabbit-base-cptwidth>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../assets/css/peopleInput.styl';
  export default {
    name: 'people-input-edit'
  }

</script>
