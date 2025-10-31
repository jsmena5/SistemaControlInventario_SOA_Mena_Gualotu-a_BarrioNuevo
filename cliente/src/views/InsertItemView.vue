<script setup>
import { ref } from 'vue'
import soapService from '../services/soapService'

// DTO del artículo
const dto = ref({
  Code: '',
  Name: '',
  Category: '',
  PurchasePrice: '',
  SalePrice: '',
  Stock: '',
  MinStock: '',
  Supplier: ''
})

const responseMsg = ref('')
const loading = ref(false)

const sendItem = async () => {
  responseMsg.value = ''
  loading.value = true

  // Validación básica
  if (!dto.value.Code.trim() || !dto.value.Name.trim()) {
    responseMsg.value = '⚠️ El código y el nombre son obligatorios.'
    loading.value = false
    return
  }

  // Preparar payload solo con los campos esperados por el servidor SOAP
  const payload = {
    Code: dto.value.Code,
    Name: dto.value.Name,
    Category: dto.value.Category || '',
    PurchasePrice: dto.value.PurchasePrice || 0,
    SalePrice: dto.value.SalePrice || 0,
    Stock: dto.value.Stock || 0,
    MinStock: dto.value.MinStock || 0,
    Supplier: dto.value.Supplier || ''
  }

  try {
    await soapService.insertItem(payload)
    responseMsg.value = `✅ Artículo "${dto.value.Name}" insertado correctamente.`

    // Reiniciar formulario
    dto.value = {
      Code: '',
      Name: '',
      Category: '',
      PurchasePrice: '',
      SalePrice: '',
      Stock: '',
      MinStock: '',
      Supplier: ''
    }
  } catch (err) {
    console.error('Error al insertar el artículo:', err)
    responseMsg.value = '❌ Error al insertar el artículo. Verifica la conexión o la base de datos.'
  } finally {
    loading.value = false
  }
}

// Limpiar mensajes
const clearMessage = () => {
  responseMsg.value = ''
}
</script>

<template>
  <div class="container">
    <h2>🧱 Insertar nuevo artículo</h2>

    <form @submit.prevent="sendItem" class="form">
      <div class="form-group">
        <label for="code">Código *</label>
        <input 
          id="code"
          v-model="dto.Code" 
          placeholder="Ej: ITEM-001" 
          required 
          @input="clearMessage"
        />
      </div>

      <div class="form-group">
        <label for="name">Nombre *</label>
        <input 
          id="name"
          v-model="dto.Name" 
          placeholder="Nombre del artículo" 
          required 
          @input="clearMessage"
        />
      </div>

      <div class="form-group">
        <label for="category">Categoría</label>
        <input 
          id="category"
          v-model="dto.Category" 
          placeholder="Categoría" 
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="purchasePrice">Precio Compra</label>
          <input 
            id="purchasePrice"
            v-model="dto.PurchasePrice" 
            type="number" 
            step="0.01" 
            placeholder="0.00" 
          />
        </div>

        <div class="form-group">
          <label for="salePrice">Precio Venta</label>
          <input 
            id="salePrice"
            v-model="dto.SalePrice" 
            type="number" 
            step="0.01" 
            placeholder="0.00" 
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="stock">Stock</label>
          <input 
            id="stock"
            v-model="dto.Stock" 
            type="number" 
            placeholder="0" 
          />
        </div>

        <div class="form-group">
          <label for="minStock">Stock Mínimo</label>
          <input 
            id="minStock"
            v-model="dto.MinStock" 
            type="number" 
            placeholder="0" 
          />
        </div>
      </div>

      <div class="form-group">
        <label for="supplier">Proveedor</label>
        <input 
          id="supplier"
          v-model="dto.Supplier" 
          placeholder="Nombre del proveedor" 
        />
      </div>

      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? 'Enviando...' : 'Guardar artículo' }}
      </button>
    </form>

    <div v-if="responseMsg" :class="['response', responseMsg.includes('✅') ? 'success' : 'error']">
      {{ responseMsg }}
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  background: #ffffff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
  font-size: 0.9rem;
}

input {
  padding: 0.7rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: 0.3s;
}

input:focus {
  border-color: #42b983;
  outline: none;
  box-shadow: 0 0 6px #42b98360;
}

input:required {
  border-left: 3px solid #42b983;
}

.submit-btn {
  margin-top: 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #36996b;
}

.submit-btn:disabled {
  background: #a5d6b1;
  cursor: not-allowed;
}

.response {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}

.response.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.response.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>