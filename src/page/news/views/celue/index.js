import index from './celue.vue'
export default [{
    path: '/celue',
    component: index,
    children: [{
        path: 'detail',
        component: _ => import('./detail')
    }]
}]
