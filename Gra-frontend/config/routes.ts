export default [
  {
    path: '/user',
    layout: false,
    routes: [{name: '登录', path: '/user/login', component: './User/Login'}],
  },
  // {path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome'},
  {
    path: '/manage', name: '管理', icon: '',
    routes: [{path: '/manage/product', name: '烟草管理', component: './Product'}]
  },
  {
    path: '/analyze', name: '分析', icon: '',
    routes: [{path: '/analyze/time', name: '销量分析', component: './AnalyzeByTime'}]
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {path: '/admin', redirect: '/admin/sub-page'},
      {path: '/admin/sub-page', name: '二级管理页', component: './Admin'},
    ],
  },
  // {name: '查询表格', icon: 'table', path: '/list', component: './TableList'},
  {path: '/', redirect: '/manage'},
  {path: '*', layout: false, component: './404'},
];
