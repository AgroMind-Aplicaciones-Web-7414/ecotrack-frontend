const cropEmpty = ()=> import('./views/cultivation-empty.component.vue');
const crops= () => import('./views/cultivations.component.vue');
const cropsView = ()=>import('./views/cultivation-view.component.vue');
const newCrops = ()=>import('./views/new-cultivation.component.vue');

const cropsRoutes = [
    {
        path: '/crops',
        component: cropsView,
        redirect: '/crops',
        children: [
            {
                path: '',
                component: crops
            },
            {
                path: 'new',
                component: newCrops
            },
            {
                path: 'empty',
                component: cropEmpty
            },
        ]
    },
]

export default cropsRoutes;