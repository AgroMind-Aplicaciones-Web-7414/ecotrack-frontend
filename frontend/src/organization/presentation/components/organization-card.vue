<script>
import Button from 'primevue/button';
export default {
  name:'organization-card',
  components:{ Button },
  props:{ org:{ type:Object, required:true }},
  emits:['enter','delete']
};
</script>

<template>
  <div class="org-card">
    <div class="left">
      <h2 class="title">{{ org.name }}</h2>
      <div class="meta">
        <i class="pi pi-users"></i>
        <span>Cantidad de miembros</span>
      </div>
    </div>

    <div class="right">
      <Button icon="pi pi-trash" text rounded @click="$emit('delete', org)" />
      <Button label="Entrar" severity="warning" @click="$emit('enter', org)" />
    </div>
  </div>
</template>

<style scoped>
.org-card{
  background:#fff;border-radius:16px;display:grid;grid-template-columns:1fr auto;
  align-items:center;padding:24px 18px;margin:0 auto 18px auto;
  box-shadow:0 6px 18px rgba(0,0,0,.06);width:100%;max-width:900px; /* ← más ancha */
}
.left{padding-right:12px}
.title{margin:0 0 8px 0;color:#111}     /* ← texto negro */
.meta{display:flex;align-items:center;gap:.5rem;color:#111} /* ← texto negro */
.right{
  display:flex;align-items:center;gap:10px;background:#2a7c3e;
  padding:18px;border-radius:12px
}
</style>
