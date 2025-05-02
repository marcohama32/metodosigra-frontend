<template>
  <div>
    <h1>Manutenção</h1>
    <div class="maintenance-list">
      <div class="maintenance" v-for="item in maintenanceRecords" :key="item.id">
        <p>{{ item.description }}</p>
        <span class="date">{{ item.date }}</span>
      </div>
    </div>
    <button @click="addMaintenance">Adicionar Manutenção</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maintenanceRecords: [
        { id: 1, description: 'Troca de filtro no furo 1.', date: '2023-10-01' },
        { id: 2, description: 'Reparo na bomba do furo 2.', date: '2023-10-05' },
        // Adicione mais registros de manutenção conforme necessário
      ]
    };
  },
  methods: {
    addMaintenance() {
      // Lógica para adicionar uma nova manutenção
      console.log('Adicionar nova manutenção');
    }
  }
}
</script>

<style>
.maintenance-list {
  margin: 20px;
}
.maintenance {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}
.date {
  font-size: 0.8em;
  color: #888;
}
</style> 