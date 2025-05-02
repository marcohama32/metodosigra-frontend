<template>
  <div>
    <h1>Pagamentos</h1>
    <div class="payment-controls">
      <button @click="addPayment">Adicionar Pagamento</button>
      <input type="text" v-model="searchQuery" placeholder="Buscar por ID ou Cliente" />
    </div>
    <table class="payments-table">
      <thead>
        <tr>
          <th>ID da Fatura</th>
          <th>Cliente</th>
          <th>Valor Total</th>
          <th>Valor Pago</th>
          <th>Dívida Remanescente</th>
          <th>Data do Último Pagamento</th>
          <th>Data de Expiração</th>
          <th>Valor Acrescido</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in filteredInvoices" :key="invoice.id">
          <td>{{ invoice.id }}</td>
          <td>{{ invoice.customerName }}</td>
          <td>R$ {{ invoice.totalAmount.toFixed(2) }}</td>
          <td>R$ {{ invoice.paidAmount.toFixed(2) }}</td>
          <td>R$ {{ invoice.remainingDebt.toFixed(2) }}</td>
          <td>{{ invoice.lastPaymentDate }}</td>
          <td>{{ invoice.expirationDate }}</td>
          <td>R$ {{ invoice.accruedAmount.toFixed(2) }}</td>
          <td>{{ invoice.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      invoices: [
        { id: 1, customerName: 'Cliente A', totalAmount: 300.00, paidAmount: 100.00, remainingDebt: 200.00, lastPaymentDate: '2023-09-15', expirationDate: '2023-10-15', accruedAmount: 0.00, status: 'Pendente' },
        { id: 2, customerName: 'Cliente B', totalAmount: 150.00, paidAmount: 150.00, remainingDebt: 0.00, lastPaymentDate: '2023-10-01', expirationDate: '2023-10-31', accruedAmount: 0.00, status: 'Quitada' },
        { id: 3, customerName: 'Cliente C', totalAmount: 500.00, paidAmount: 200.00, remainingDebt: 300.00, lastPaymentDate: '2023-09-20', expirationDate: '2023-10-20', accruedAmount: 0.00, status: 'Pendente' },
        // Adicione mais faturas conforme necessário
      ]
    };
  },
  computed: {
    filteredInvoices() {
      return this.invoices.filter(invoice => {
        return (
          invoice.id.toString().includes(this.searchQuery) ||
          invoice.customerName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    }
  },
  methods: {
    addPayment() {
      // Lógica para adicionar um novo pagamento
      console.log('Adicionar novo pagamento');
    },
    updateDebt() {
      const today = new Date();
      this.invoices.forEach(invoice => {
        const lastPaymentDate = new Date(invoice.lastPaymentDate);
        const expirationDate = new Date(invoice.expirationDate);
        const daysDiff = Math.floor((today - lastPaymentDate) / (1000 * 60 * 60 * 24));
        
        // Verifica se a dívida deve ser aumentada
        if (daysDiff > 30 && invoice.remainingDebt > 0) {
          // Aumenta a dívida remanescente em 10% após 30 dias
          const accruedValue = invoice.remainingDebt * 0.10;
          invoice.remainingDebt += accruedValue;
          invoice.accruedAmount += accruedValue; // Atualiza o valor acrescido
        }

        // Atualiza a data de expiração se a dívida ainda estiver pendente
        if (invoice.remainingDebt > 0) {
          const newExpirationDate = new Date(expirationDate);
          newExpirationDate.setDate(newExpirationDate.getDate() + 30); // Adiciona 30 dias
          invoice.expirationDate = newExpirationDate.toISOString().split('T')[0]; // Formata a data
        }
      });
    }
  },
  mounted() {
    this.updateDebt(); // Atualiza a dívida ao montar o componente
  }
}
</script>

<style>
.payment-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.payments-table {
  width: 100%;
  border-collapse: collapse;
}
.payments-table th, .payments-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}
input[type="text"] {
  padding: 10px;
  width: 200px;
}
button {
  padding: 10px 20px;
  background-color: #00796b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #005f57;
}
</style> 