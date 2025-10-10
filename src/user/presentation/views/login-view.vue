<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from '../../application/user.store.js';

// PrimeVue
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Card from 'primevue/card';

export default {
  name: 'login-view',
  components: { InputText, Password, Button, Card },
  setup() {
    const router = useRouter();

    // Form state
    const email = ref('');
    const password = ref('');

    // Store state
    const loading = computed(() => userStore.state.loading);
    const errorKey = computed(() => userStore.state.errorKey);

    // Logo desde Catbox (tu link)
    const logoUrl = 'https://files.catbox.moe/2ws3bu.png';

    // Actions
    const goRegister = () => router.push({ name: 'user-register' });
    const submit = async () => {
      if (loading.value) return;
      const ok = await userStore.login({
        email: email.value.trim(),
        password: password.value
      });
      if (ok) router.push({ name: 'dashboard' });
    };

    return { email, password, loading, errorKey, submit, goRegister, logoUrl };
  }
};
</script>

<template>
  <!-- Fondo verde -->
  <div class="min-h-screen" style="background:#226B2F;">
    <div class="flex align-items-center justify-content-center p-3">
      <!-- Tarjeta blanca -->
      <Card
          class="w-full sm:w-10 md:w-7 lg:w-5 xl:w-4 border-round-2xl shadow-2 surface-card text-900"
          style="max-width: 560px; background:#ffffff;"
      >
        <!-- Header con imagen circular -->
        <template #header>
          <div class="flex justify-content-center mt-4">
            <div class="avatar-circle">
              <img :src="logoUrl" alt="EcoTrack" class="avatar-img" />
            </div>
          </div>
        </template>

        <!-- Título -->
        <template #title>
          <div class="text-center mt-2">
            <h2 class="m-0 text-900">Iniciar Sesión</h2>
            <p class="m-0 mt-2 text-600 font-medium">¡Bienvenido!</p>
          </div>
        </template>

        <!-- Contenido -->
        <template #content>
          <div class="p-fluid mt-3">
            <!-- Correo -->
            <div class="field">
              <label class="font-semibold mb-2 block">Correo electrónico:</label>
              <InputText v-model="email" placeholder="nombre@example.com" type="email" class="w-full" />
            </div>

            <!-- Contraseña (debajo del correo) -->
            <div class="field mt-3">
              <label class="font-semibold mb-2 block">Contraseña:</label>
              <Password v-model="password" :feedback="false" toggleMask inputClass="w-full" class="w-full" />
            </div>

            <!-- Error -->
            <div v-if="errorKey" class="mt-2 mb-1 text-red-600 text-sm">
              {{ $t ? $t(errorKey) : 'Credenciales inválidas' }}
            </div>

            <!-- Enlace a registro -->
            <div class="mt-3">
              <small>
                <router-link :to="{ name: 'user-register' }">¿No tienes cuenta? Regístrate aquí</router-link>
              </small>
            </div>

            <!-- Botones -->
            <div class="flex gap-2 mt-4">
              <Button label="Registrarse" class="p-button-text w-6" @click="goRegister" />
              <Button label="Ingresar" class="w-6" :loading="loading" @click="submit" />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.avatar-circle {
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: #2e7d32; /* color de fondo por si la imagen no carga */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;     /* recorta la imagen en círculo */
  box-shadow: 0 4px 14px rgba(0,0,0,.15);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;    /* llena el círculo sin deformar */
}
</style>
