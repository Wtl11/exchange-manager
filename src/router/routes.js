export default [
  {
    path: '/',
    name: 'index',
    redirect: '/mall/goods/product-list',
    component: () => import('@pages/index/index'),
    children: [
      // 商品列表
      {
        path: '/mall',
        name: 'mall',
        meta: {
          type: 'first_menu', // 一级标示
          title: '商品管理',
          icon: require('./icon-goods_pressed@2x.png'),
          iconSelected: '',
        },
        component: {render: h => h('router-view')},
        children: [
          {
            path: 'goods',
            name: 'goods',
            text: '商品',
            component: {render: h => h('router-view')},
            children: [
              {
                path: '/mall/goods/product-list',
                name: 'mall-goods-product-list',
                component: () => import('@pages/product-list/product-list'),
                meta: {
                  title: '商品列表',
                  type: 'sec-menu', // 二级标识
                  crumbs: ['商品列表']
                },
              },
              // 新建商品
              {
                path: '/mall/goods/product-list/edit-product',
                name: 'mall-goods-product-list-edit',
                component: () => import('@pages/edit-product/edit-product'),
                meta: {
                  type: '',
                  title: '编辑商品',
                  variableIndex: 1,
                  crumbs: ['商品列表', '商品']
                }
              }
            ]

          }
        ],
      },
      // 客户管理
      {
        path: '/client',
        name: 'client',
        meta: {
          type: 'first_menu', // 一级标示
          title: '客户管理',
          icon: require('./icon-client@2x.png'),
          iconSelected: '',
        },
        component: {render: h => h('router-view')},
        children: [
            {
            path: 'customer',
            name: 'customer',
            text: '客户',
            component: {render: h => h('router-view')},
            children: [
              // 客户列表
              {
                path: '/client/customer/customer-list',
                name: 'customer-list',
                component: () => import('@pages/customer-list/customer-list'),
                meta: {
                  title: '客户列表',
                  type: 'sec-menu', // 二级标识
                  crumbs: ['客户列表']
                },
              }
            ]
          }
        ],
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: require('@pages/_404/_404').default,
    props: true
  },
  {
    path: '*',
    redirect: '404'
  }
]
