<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <!-- ENCABEZADO -->
    <header class="header">
      <img src="./assets/vue.svg" alt="Logo" class="logo" />
      <h1>FerreInventory Client</h1>
    </header>

    <!-- MENÚ DE NAVEGACIÓN -->
    <nav class="nav">
      <RouterLink to="/" class="nav-link">Inicio</RouterLink>
      <RouterLink to="/get-item" class="nav-link">Consultar Artículo</RouterLink>
      <RouterLink to="/insert-item" class="nav-link">Agregar Artículo</RouterLink>
      <router-link to="/check-connection" class="nav-link">Probar Conexión</router-link>

    </nav>

    <!-- CONTENIDO DE LAS VISTAS -->
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  background: #f5f6fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #42b983;
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.logo {
  height: 40px;
}

.nav {
  background: #e3e3e3;
  padding: 0.7rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  border-bottom: 2px solid #ccc;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: 0.3s;
}

.nav-link:hover {
  color: #42b983;
}

.main {
  flex: 1;
  padding: 2rem;
}
</style>