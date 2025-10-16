import PlotCreateView from './views/plot-create-view.vue';
import PlotEditView from './views/plot-edit-view.vue';

export default [
    {
        path: '/plots/create',
        name: 'parcel-create',
        component: PlotCreateView
    },
    {
        path: '/plots/:id/edit',
        name: 'parcel-edit',
        component: PlotEditView,
        props: true
    }
];
