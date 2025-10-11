<script setup>
import { ref, getCurrentInstance } from 'vue';
import AppLayout from '../components/app-layout.vue';

// PrimeVue
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';

// Estado UI
const activePanel = ref('subscription'); // 'subscription' | 'language'
const notifications = ref(true);

// Idioma
const currentLang = ref('es'); // 'es' | 'en'

// Aplica idioma al i18n si está disponible
function applyLanguage(lang) {
  currentLang.value = lang;

  // Intento 1: Vue I18n v9 (Composition)
  try {
    // @ts-ignore
    const inst = getCurrentInstance();
    // @ts-ignore
    if (inst?.appContext?.config?.globalProperties?.$i18n) {
      // @ts-ignore
      inst.appContext.config.globalProperties.$i18n.locale = lang;
    }
  } catch (_) {}

  // Si usas useI18n/locale.value desde composable, puedo cambiarlo a esa API cuando me digas cómo lo montaste.
}

// Acciones (placeholders)
function changePlan() { alert('Cambiar plan (WIP)'); }
function cancelPlan() { alert('Cancelar plan (WIP)'); }
</script>

<template>
  <AppLayout>
    <div class="wrap">
      <div class="grid">
        <!-- Panel izquierdo -->
        <Card class="left-card">
          <template #title>
            <div class="card-title">Configuración</div>
          </template>
          <template #content>
            <div class="stack">
              <Button
                  label="Suscripción"
                  class="w-full"
                  :severity="activePanel === 'subscription' ? undefined : 'secondary'"
                  @click="activePanel = 'subscription'"
              />
              <Button
                  label="Cambiar idioma"
                  class="w-full"
                  :severity="activePanel === 'language' ? undefined : 'secondary'"
                  @click="activePanel = 'language'"
              />

              <div class="notif">
                <span>Notificaciones</span>
                <InputSwitch v-model="notifications" />
              </div>
            </div>
          </template>
        </Card>

        <!-- Panel derecho -->
        <Card class="right-card">
          <!-- Suscripción -->
          <template v-if="activePanel === 'subscription'" #title>
            <div class="card-title">Plan Actual:</div>
          </template>
          <template v-if="activePanel === 'subscription'" #content>
            <div class="subgrid">
              <div class="row">
                <div class="label">Plan</div>
                <div class="value">Plan</div>
              </div>
              <div class="row">
                <div class="label">Fecha de Pago:</div>
                <div class="value">DD/MM</div>
              </div>

              <div class="actions">
                <Button label="Cambiar plan" severity="warning" @click="changePlan" />
                <Button label="Cancelar plan" severity="secondary" disabled @click="cancelPlan" />
              </div>
            </div>
          </template>

          <!-- Idioma -->
          <template v-if="activePanel === 'language'" #title>
            <div class="card-title">Seleccionar Idioma</div>
          </template>
          <template v-if="activePanel === 'language'" #content>
            <div class="lang">
              <Button
                  label="Español"
                  :severity="currentLang === 'es' ? 'warning' : 'secondary'"
                  @click="applyLanguage('es')"
              />
              <Button
                  label="Inglés"
                  :severity="currentLang === 'en' ? 'warning' : 'secondary'"
                  @click="applyLanguage('en')"
              />
            </div>
            <small class="hint">Se aplica inmediatamente si el i18n está configurado.</small>
          </template>
        </Card>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.wrap { max-width: 1100px; margin: 0 auto; }
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  margin-top: 14px;
}

.left-card, .right-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 22px rgba(0,0,0,.06);
  color: #111;
}
.card-title { font-weight: 800; color: #111; }

.stack { display: flex; flex-direction: column; gap: 14px; }
.notif {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 8px; border-top: 1px dashed #e5e7eb; margin-top: 8px; color: #111;
}

.subgrid { display: grid; gap: 12px; }
.row { display: grid; grid-template-columns: 160px 1fr; gap: 10px; align-items: center; }
.label { font-weight: 700; color: #111; }
.value { color: #111; }

.actions { display: flex; gap: 10px; margin-top: 8px; }

.lang { display: flex; gap: 12px; }
.hint { display: block; margin-top: 10px; color: #6b7280; }

@media (max-width: 920px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
