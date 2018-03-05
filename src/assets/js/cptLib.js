import Vue from 'vue';
/*导入全局组件*/
import Placeholder from '../../components/placeholder.vue';
import BaseFormInput from '../../components/baseForm/input.vue';
import BaseFormRadio from '../../components/baseForm/radio.vue';
import BaseFormSelect from '../../components/baseForm/select.vue';
import BaseFormFontSet from '../../components/baseForm/fontSet.vue';
import BaseFormTitlePst from '../../components/baseForm/titlePst.vue';
import BaseFormCptWidth from '../../components/baseForm/cptWidth.vue';
import BaseFormList from '../../components/baseForm/list.vue';
import BaseAce from '../../components/baseForm/ace.vue';
import BaseFormSelectList from '../../components/baseForm/list02.vue';



/*导入大组件*/
import SingleInput from '../../components/singleInput/index.vue';
import SingleInputShow from '../../components/singleInput/show.vue';
import SelectInput from '../../components/selectInput/index.vue';
import SelectInputShow from '../../components/selectInput/show.vue';
import DateInput from '../../components/dateInput/index.vue';
import DateInputShow from '../../components/dateInput/show.vue';
import PullSelectInput from '../../components/pullSelectInput/index.vue';
import PullSelectInputShow from '../../components/pullSelectInput/show.vue';
import PeopleInput from '../../components/peopleSelect/index.vue';
import PeopleInputShow from '../../components/peopleSelect/show.vue';
import DeptInput from '../../components/deptSelect/index.vue';
import DeptInputShow from '../../components/deptSelect/show.vue';






/*注册全局小组件*/
Vue.component(Placeholder.name, Placeholder);
Vue.component(BaseFormInput.name, BaseFormInput);
Vue.component(BaseFormRadio.name, BaseFormRadio);
Vue.component(BaseFormSelect.name, BaseFormSelect);
Vue.component(BaseFormFontSet.name, BaseFormFontSet);
Vue.component(BaseFormTitlePst.name, BaseFormTitlePst);
Vue.component(BaseFormCptWidth.name, BaseFormCptWidth);
Vue.component(BaseFormList.name, BaseFormList);
Vue.component(BaseAce.name, BaseAce);
Vue.component(BaseFormSelectList.name, BaseFormSelectList);
/*注册全局大组件*/
Vue.component(SingleInput.name, SingleInput);
Vue.component(SingleInputShow.name, SingleInputShow);
Vue.component(SelectInput.name, SelectInput);
Vue.component(SelectInputShow.name, SelectInputShow);
Vue.component(DateInput.name, DateInput);
Vue.component(DateInputShow.name, DateInputShow);
Vue.component(PullSelectInput.name, PullSelectInput);
Vue.component(PullSelectInputShow.name, PullSelectInputShow);
Vue.component(PeopleInput.name, PeopleInput);
Vue.component(PeopleInputShow.name, PeopleInputShow);
Vue.component(DeptInput.name, DeptInput);
Vue.component(DeptInputShow.name, DeptInputShow);








/*注册局部组件*/
export default Vue
