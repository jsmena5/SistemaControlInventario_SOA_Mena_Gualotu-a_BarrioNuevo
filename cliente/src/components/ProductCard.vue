<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="product-card">
    <div class="card-header">
      <h3>{{ product.Name }}</h3>
      <span class="code">{{ product.Code }}</span>
    </div>
    
    <div class="card-body">
      <div class="info-grid">
        <div class="info-item">
          <label>Categoría:</label>
          <span>{{ product.Category || 'N/A' }}</span>
        </div>
        
        <div class="info-item">
          <label>Proveedor:</label>
          <span>{{ product.Supplier || 'N/A' }}</span>
        </div>
        
        <div class="info-item">
          <label>Precio Compra:</label>
          <span class="price purchase">${{ product.PurchasePrice?.toFixed(2) || '0.00' }}</span>
        </div>
        
        <div class="info-item">
          <label>Precio Venta:</label>
          <span class="price sale">${{ product.SalePrice?.toFixed(2) || '0.00' }}</span>
        </div>
        
        <div class="info-item">
          <label>Stock Actual:</label>
          <span :class="['stock', product.Stock <= product.MinStock ? 'low' : 'normal']">
            {{ product.Stock || 0 }}
          </span>
        </div>
        
        <div class="info-item">
          <label>Stock Mínimo:</label>
          <span class="min-stock">{{ product.MinStock || 0 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #42b983;
}

.card-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.code {
  background: #42b983;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.info-item label {
  font-weight: 600;
  color: #6c757d;
  font-size: 0.85rem;
}

.info-item span {
  color: #2c3e50;
  font-size: 1rem;
}

.price.purchase {
  color: #dc3545;
  font-weight: bold;
}

.price.sale {
  color: #28a745;
  font-weight: bold;
}

.stock.normal {
  color: #28a745;
  font-weight: bold;
}

.stock.low {
  color: #dc3545;
  font-weight: bold;
  animation: pulse 2s infinite;
}

.min-stock {
  color: #6c757d;
  font-weight: bold;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

@media (max-width: 480px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}
</style>