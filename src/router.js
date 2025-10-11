import {createRouter, createWebHistory} from "vue-router"
import userRoutes from "./iam/presentation/user-routes.js"
import tasksRoutes from "./task/presentation/tasks-routes.js"
import organizationRoutes from "./organization/presentation/organization-routes.js"
import weatherRoutes from "./weather/presentation/weather-routes.js"
import DashboardView from "./shared/presentation/views/dashboard-view.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/dashboard', name: 'dashboard', component: DashboardView },
        ...userRoutes,
        ...tasksRoutes,
        ...organizationRoutes,
        ...weatherRoutes
    ]
})

export default router
