import { createRouter, createWebHistory } from 'vue-router';
import userRoutes from './user/presentation/user-routes.js';

const routes = [
    { path: '/', redirect: '/login' },
    ...userRoutes,

    { path: '/dashboard', name: 'dashboard', component: () => import('./shared/presentation/views/dashboard-view.vue') },
    { path: '/organization/create', name: 'organization-create', component: () => import('./organization/presentation/views/organization-create-view.vue') },
    { path: '/organization/:id', name: 'organization-detail', component: () => import('./organization/presentation/views/organization-detail-view.vue') },

    { path: '/organization/:id', name: 'organization-detail', component: () => import('./organization/presentation/views/organization-detail-view.vue') },
    { path: '/parcel/create', name: 'parcel-create', component: () => import('./parcel/presentation/views/parcel-create-view.vue') },



    { path: '/profile', name: 'user-profile', component: () => import('./shared/presentation/views/profile-view.vue') },
    { path: '/settings', name: 'settings', component: () => import('./shared/presentation/views/settings-view.vue') },

    // Not found
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./shared/presentation/views/page-not-found.vue') }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
