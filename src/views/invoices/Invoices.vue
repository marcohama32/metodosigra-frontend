<template>
  <div>
    <h1>Faturas</h1>
    <div class="invoice-list">
      <div class="invoice" v-for="invoice in invoices" :key="invoice.id">
        <p>Fatura ID: {{ invoice.id }} - Valor: R$ {{ invoice.amount }}</p>
        <span class="date">{{ invoice.date }}</span>
      </div>
    </div>
    <button @click="generateInvoice">Gerar Nova Fatura</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      invoices: [
        { id: 1, amount: 100.00, date: '2023-10-01' },
        { id: 2, amount: 150.00, date: '2023-10-05' },
        // Adicione mais faturas conforme necessário
      ]
    };
  },
  methods: {
    generateInvoice() {
      // Lógica para gerar uma nova fatura
      console.log('Gerar nova fatura');
    }
  }
}
</script>

<style>
.invoice-list {
  margin: 20px;
}
.invoice {
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