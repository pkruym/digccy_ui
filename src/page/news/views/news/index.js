import index from './views/index'
export default [{
    path: '/news',
    component: index,
    children: [{
            path: '',
            component: _ => import('./views/time')
        },
        {
            path: 'main',
            component: _ => import('./views/main')
        }
    ]
}]
