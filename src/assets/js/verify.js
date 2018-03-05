import Vue from 'vue';
import $ from 'jquery';


function vfy(el, binding, vnode) {
  var label = '';
  var value = '';
  var rules = '';
  var data = '';

  if (binding.value.use) { //生成表单后的验证    
    if (binding.value.use == 'false') {
      return;
    }
    label = vnode.context.data.base.title;
    value = vnode.context.data.base.value;
    rules = binding.value.vfy;
    data = false;
  } else { // 表单设计器中的验证
    label = vnode.componentOptions.propsData.label;
    value = vnode.data.model.value;
    rules = binding.value.vfy;
    data = binding.value.data;
  }




  for (let i in rules) {
    if (rules[i] == 'required') {
      if ((typeof value).toLocaleLowerCase() == 'object') {
        if (value.length == 0) {
          value = 0;
        }
      }

      if (!value) { // 验证错误
        $(el).next().hasClass('error') ? null : $(el).after('<span class="error">* ' + label + '为必填项</span>');
        break;
      } else { // 验证通过
        $(el).next().hasClass('error') ? $(el).next().remove() : null;
      }
    }


    if (rules[i] == 'length-15') {
      if (value.length > 15) { // 验证错误
        $(el).next().hasClass('error') ? null : $(el).after('<span class="error">* ' + label + '不能大于15位</span>');
        break;
      } else { // 验证通过
        $(el).next().hasClass('error') ? $(el).next().remove() : null;
      }
    }



  }
  if (data) {
    if ($('.col_right .error').length > 0) {
      data.error = true;
    } else {
      data.error = false;
    }
  };





}


Vue.directive('verify', {
  inserted: function (el, binding, vnode) {
    vfy(el, binding, vnode)
  },
  componentUpdated: function (el, binding, vnode) {
    vfy(el, binding, vnode)
  }
});
