const cropEmpty = ()=> import('./views/cultivation-empty.component.vue');
const crops= () => import('./views/cultivations.component.vue');
const cropsView = ()=>import('./views/cultivation-view.component.vue');
const newCrops = ()=>import('./views/new-cultivation.component.vue');

const cropsRoutes = [
    {path: 'crops', component: cropsView
        , children: [
            {path: '', components:{
                    "crops-view": crops
                }
            },
            {path: 'new', components: {
                    'crops-view': newCrops
                }},
            {path: 'empty', components: {
                'crops-view': cropEmpty
                }},
        ]},
]

export default cropsRoutes;