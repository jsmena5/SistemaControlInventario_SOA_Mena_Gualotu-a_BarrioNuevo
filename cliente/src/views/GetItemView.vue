<script setup>
import { ref } from 'vue'
import soapService from '../services/soapService'
import ProductCard from '../components/ProductCard.vue'

const code = ref('')
const item = ref(null)
const errorMsg = ref('')
const loading = ref(false)

// Buscar artículo por código
const getItem = async () => {
  if (!code.value.trim()) {
    errorMsg.value = '⚠️ Por favor ingresa un código.'
    return
  }

  loading.value = true
  errorMsg.value = ''
  item.value = null

  try {
    const res = await soapService.getItemByCode(code.value.trim())

    if (res && res.Code) {
      item.value = res
      errorMsg.value = ''
    } else {
      errorMsg.value = '❌ Artículo no encontrado en la base de datos.'
    }
  } catch (err) {
    console.error('Error al consultar el artículo:', err)
    errorMsg.value = '❌ Error al consultar el artículo. Verifica la conexión o el servidor.'
  } finally {
    loading.value = false
  }
}

// Limpiar búsqueda
const clearSearch = () => {
  code.value = ''
  item.value = null
  errorMsg.value = ''
}
</script>

<template>
  <div class="get-item-container">
    <h2>🔍 Consultar artículo</h2>

    <div class="search-section">
      <div class="form">
        <input
          v-model="code"
          type="text"
          placeholder="Código del artículo (Ej: ITEM-001)"
          @keyup.enter="getItem"
          @input="clearSearch"
        />
        <button @click="getItem" :disabled="loading" class="search-btn">
          {{ loading ? 'Buscando...' : 'Buscar' }}
        </button>
      </div>

      <button v-if="item" @click="clearSearch" class="clear-btn">
        Limpiar
      </button>
    </div>

    <div v-if="errorMsg" class="error-message">
      {{ errorMsg }}
    </div>

    <transition name="fade">
      <div v-if="item" class="result">
        <h3>📋 Información del Artículo</h3>
        <ProductCard :product="item" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.get-item-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
}

h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

.search-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form {
  display: flex;
  gap: 10px;
  justify-content: center;
}

input {
  padding: 0.7rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  width: 70%;
  font-size: 1rem;
  transition: 0.3s;
}

input:focus {
  border-color: #42b983;
  outline: none;
  box-shadow: 0 0 5px #42b98350;
}

.search-btn {
  background: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  transition: background 0.3s;
  font-weight: 500;
}

.search-btn:hover {
  background: #36996b;
}

.search-btn:disabled {
  background: #a5d6b1;
  cursor: not-allowed;
}

.clear-btn {
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.3s;
  align-self: center;
  width: fit-content;
}

.clear-btn:hover {
  background: #545b62;
}

.error-message {
  color: #d9534f;
  font-weight: bold;
  margin-top: 1rem;
  text-align: center;
  padding: 0.5rem;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
}

.result {
  margin-top: 1.5rem;
}

/* Animación suave */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>