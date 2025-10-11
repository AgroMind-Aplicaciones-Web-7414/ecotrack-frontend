<script>
import AppSidebar from './app-sidebar.vue';
import AppTopbar from './app-topbar.vue';
export default { name: 'app-layout', components:{ AppSidebar, AppTopbar } };
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <main class="content">
      <AppTopbar />
      <section class="page">
        <slot />
      </section>
    </main>
  </div>
</template>

<style scoped>
.layout{display:flex;min-height:100vh;background:#e9eef2}
.content{flex:1;display:flex;flex-direction:column}
.page{padding:18px;width:100%;flex:1}
</style>
