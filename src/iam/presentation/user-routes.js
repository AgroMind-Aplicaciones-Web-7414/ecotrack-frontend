// ⬅️ PASA a import estático
import LoginView from './views/login-view.vue';
import RegisterView from './views/register-view.vue';

export default [
    { path: '/login', name: 'user-login', component: LoginView },
    { path: '/register', name: 'user-register', component: RegisterView }
];
