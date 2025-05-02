<template>
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">Fatura: {{ invoiceDetails.invoiceNumber }}</h5>
        <p class="text-muted">Data de Vencimento: {{ invoiceDetails.dueDate }}</p>
      </div>
      <div class="card-body">
        <h6>Total: {{ invoiceDetails.totalAmount }}</h6>
        <ul class="list-group">
          <li class="list-group-item" v-for="(item, index) in invoiceDetails.items" :key="index">
            {{ item.description }} - {{ item.amount }}
          </li>
        </ul>
        <div class="mt-3">
          <button class="btn btn-primary" @click="payInvoice">Pagar Fatura</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "InvoiceCard",
    props: {
      invoiceDetails: {
        type: Object,
        required: true,
      },
    },
    methods: {
      payInvoice() {
        // Lógica para processar o pagamento da fatura
        alert(`Processando pagamento para a fatura ${this.invoiceDetails.invoiceNumber}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    margin-bottom: 20px;
  }
  </style>