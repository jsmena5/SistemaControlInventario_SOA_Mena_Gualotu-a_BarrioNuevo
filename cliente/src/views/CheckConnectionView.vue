<script setup>
import { ref } from 'vue'
import soapService from '../services/soapService'

const connectionStatus = ref('')
const loading = ref(false)

// Función para probar conexión al servidor SOAP
const testConnection = async () => {
  loading.value = true
  connectionStatus.value = 'Verificando conexión...'

  try {
    // Simplemente llamamos al método getItemByCode con un código ficticio
    const result = await soapService.getItemByCode('TEST-CODE')
    if (result) {
      connectionStatus.value = '✅ Conexión exitosa con el servidor SOAP.'
    } else {
      connectionStatus.value = '⚠️ El servidor respondió, pero no devolvió datos.'
    }
  } catch (error) {
    console.error(error)
    connectionStatus.value = '❌ No se pudo conectar con el servidor SOAP.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="check-container">
    <h2>🔌 Probar conexión con el servidor SOAP</h2>
    <p>Este test verifica si la dirección configurada responde correctamente.</p>

    <button @click="testConnection" :disabled="loading">
      {{ loading ? 'Verificando...' : 'Probar conexión' }}
    </button>

    <p class="status" :class="{ success: connectionStatus.includes('✅'), error: connectionStatus.includes('❌') }">
      {{ connectionStatus }}
    </p>
  </div>
</template>

<style scoped>
.check-container {
  max-width: 600px;
  margin: 3rem auto;
  text-align: center;
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
button {
  padding: 10px 20px;
  border: none;
  background-color: #42b883;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}
button:hover {
  background-color: #2f9e6b;
}
.status {
  margin-top: 1.5rem;
  font-weight: bold;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>