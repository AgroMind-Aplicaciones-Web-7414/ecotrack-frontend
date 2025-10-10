import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router.js';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);

// Loguea cualquier error de runtime en consola
app.config.errorHandler = (err, instance, info) => {
    console.error('[VueError]', err, info);
};

app.use(router);
app.use(PrimeVue, { theme: { preset: Aura } });
app.mount('#app');
