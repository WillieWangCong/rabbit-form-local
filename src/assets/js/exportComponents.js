/*注册全局大组件*/
import Vue from 'vue';
import './verify';

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
