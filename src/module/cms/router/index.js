//@符号表示的是src目录
import Home from '@/module/home/page/home.vue';
import page_list from '@/module/cms/page/page_list.vue';
import page_add from '@/module/cms/page/page_add.vue';
import page_edit from '@/module/cms/page/page_edit.vue';

export default [{
    path: '/',
    component: Home, //这个是添加的组件
    name: 'CMS菜单', //菜单名称
    hidden: false,
    children:[
      {path:'/cms/page/list',name:'页面列表',component: page_list,hidden:false},
      {path:'/cms/page/add',name:'新增页面',component: page_add,hidden:true},
      {path:'/cms/page/edit/:pageId',name:'修改页面',component: page_edit,hidden:true}
    ]
  }
]
