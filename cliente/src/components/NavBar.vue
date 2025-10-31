<template>
  <nav class="navbar">
    <h1>FerreInventory</h1>
    <ul>
      <li><router-link to="/">Inicio</router-link></li>
      <li><router-link to="/insert-item">Insertar Artículo</router-link></li>
      <li><router-link to="/get-item">Consultar Artículo</router-link></li>
      <li><router-link to="/check-connection">Probar Conexión</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
// No se requiere lógica adicional por ahora
</script>

<style scoped>
.navbar {
  background: #007bff;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
}

.navbar h1 {
  font-size: 1.5rem;
  margin: 0;
}

ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

li {
  margin: 0;
}

a {
  color: white;
  text-decoration: none;
  transition: all 0.2s;
}

a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}

a:hover {
  color: #ffe600;
}
</style>