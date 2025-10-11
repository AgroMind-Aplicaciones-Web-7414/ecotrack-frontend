import OrganizationCreateView from './views/organization-create-view.vue';
import OrganizationDetailView from './views/organization-detail-view.vue';

export default [
    {
        path: '/organizations/create',
        name: 'organization-create',
        component: OrganizationCreateView
    },
    {
        path: '/organizations/:id',
        name: 'organization-detail',
        component: OrganizationDetailView,
        props: true
    }
];
