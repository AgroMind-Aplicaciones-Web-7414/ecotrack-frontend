<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from '../../application/user.store.js';

// PrimeVue
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Card from 'primevue/card';

export default {
  name: 'register-view',
  components: { InputText, Password, Checkbox, Button, Card },
  setup() {
    const router = useRouter();

    // Form
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    // Roles (al menos uno)
    const roles = ref({
      agronomo: false,
      agricultor: false
    });

    // Logo (puedes cambiarlo)
    const logoUrl = 'https://files.catbox.moe/2ws3bu.png';

    const loading = computed(() => userStore.state.loading);

    const goLogin = () => router.push({ name: 'user-login' });

    const submit = async () => {
      // Validaciones mínimas locales (por ahora no pegamos al backend)
      if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        alert('Completa todos los campos.');
        return;
      }
      if (password.value !== confirmPassword.value) {
        alert('Las contraseñas no coinciden.');
        return;
      }
      if (!roles.value.agronomo && !roles.value.agricultor) {
        alert('Selecciona al menos un rol.');
        return;
      }

      // Aquí iría el llamado real: await authApi.register(...)
      // Por ahora, redirige a Login como pediste:
      router.push({ name: 'user-login' });
    };

    return {
      name, email, password, confirmPassword,
      roles, logoUrl, loading, goLogin, submit
    };
  }
};
</script>

<template>
  <!-- Fondo verde -->
  <div class="min-h-screen" style="background:#226B2F;">
    <div class="flex align-items-center justify-content-center p-3">
      <!-- Tarjeta blanca centrada -->
      <Card
          class="w-full sm:w-10 md:w-7 lg:w-5 xl:w-4 border-round-2xl shadow-2 surface-card text-900"
          style="max-width: 600px; background:#ffffff;"
      >
        <!-- Header: logo circular -->
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
            <h2 class="m-0 text-900">Crear Cuenta</h2>
          </div>
        </template>

        <!-- Contenido -->
        <template #content>
          <div class="p-fluid mt-3">

            <div class="field">
              <label class="font-semibold mb-2 block">Nombre:</label>
              <InputText v-model="name" placeholder="Name" class="w-full" />
            </div>

            <div class="field mt-3">
              <label class="font-semibold mb-2 block">Correo electrónico:</label>
              <InputText v-model="email" type="email" placeholder="nombre@example.com" class="w-full" />
            </div>

            <div class="field mt-3">
              <label class="font-semibold mb-2 block">Contraseña:</label>
              <Password v-model="password" :feedback="false" toggleMask inputClass="w-full" class="w-full" placeholder="Password" />
            </div>

            <div class="field mt-3">
              <label class="font-semibold mb-2 block">Confirmar contraseña:</label>
              <Password v-model="confirmPassword" :feedback="false" toggleMask inputClass="w-full" class="w-full" placeholder="Confirm password" />
            </div>

            <!-- Link a Login -->
            <div class="mt-2">
              <small>
                <a href="" @click.prevent="goLogin">¿Ya tienes cuenta? Inicia sesión</a>
              </small>
            </div>

            <!-- Roles -->
            <div class="flex align-items-center gap-5 mt-4">
              <div class="flex align-items-center gap-2">
                <Checkbox v-model="roles.agronomo" :binary="true" inputId="role-agronomo" />
                <label for="role-agronomo" class="cursor-pointer">Agronomo</label>
              </div>
              <div class="flex align-items-center gap-2">
                <Checkbox v-model="roles.agricultor" :binary="true" inputId="role-agricultor" />
                <label for="role-agricultor" class="cursor-pointer">Agricultor</label>
              </div>
            </div>

            <!-- Botón registrar (también navega a login por ahora) -->
            <div class="mt-4">
              <Button label="Registrarse" class="w-12rem" :loading="loading" @click="submit" />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.avatar-circle {
  width: 82px;
  height: 82px;
  border-radius: 50%;
  background: #2e7d32;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0,0,0,.12);
}
.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
