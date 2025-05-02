<template>
  <div class="card h-100 mb-4">
    <div class="card-header pb-0 px-3">
      <div class="row">
        <div class="col-md-6">
          <h6 class="mb-0">Transações do Sistema</h6>
        </div>
        <div class="col-md-6 d-flex justify-content-end align-items-center">
          <i class="far fa-calendar-alt me-2" aria-hidden="true"></i>
          <small>{{ period }}</small>
        </div>
      </div>
    </div>
    <div class="card-body pt-4 p-3">
      <h6 class="text-uppercase text-body text-xs font-weight-bolder mb-3">Transações Recentes</h6>
      <ul class="list-group">
        <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
          v-for="transaction in transactions" :key="transaction.id">
          <div class="d-flex align-items-center">
            <vsud-button :color="transaction.type === 'debit' ? 'danger' : 'success'" variant="outline" size="sm"
              class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center">
              <i :class="transaction.type === 'debit' ? 'fas fa-arrow-down' : 'fas fa-arrow-up'" aria-hidden="true"></i>
            </vsud-button>
            <div class="d-flex flex-column">
              <h6 class="mb-1 text-dark text-sm">{{ transaction.name }}</h6>
              <span class="text-xs">{{ transaction.date }}</span>
            </div>
          </div>
          <div class="d-flex align-items-center" :class="transaction.type === 'debit' ? 'text-danger' : 'text-success'">
            {{ transaction.type === 'debit' ? '-' : '+' }} $ {{ transaction.amount }}
          </div>
        </li>
      </ul>
      <h6 class="text-uppercase text-body text-xs font-weight-bolder my-3">Faturas do Sistema</h6>
      <ul class="list-group">
        <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
          v-for="invoice in invoices" :key="invoice.id">
          <div class="d-flex align-items-center">
            <div class="d-flex flex-column">
              <h6 class="mb-1 text-dark text-sm">{{ invoice.name }}</h6>
              <span class="text-xs">Status: {{ invoice.status }}</span>
            </div>
          </div>
          <div class="d-flex align-items-center"
            :class="invoice.status === 'Paga' ? 'text-success' : invoice.status === 'Pendente' ? 'text-warning' : 'text-danger'">
            {{ invoice.status === 'Paga' ? '+' : '-' }} $ {{ invoice.amount }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VsudButton from "@/components/VsudButton.vue";

export default {
  name: "TransactionCard",
  components: {
    VsudButton,
  },
  data() {
    return {
      period: "01 - 07 Abril 2023",
      transactions: [
        { id: 1, name: "Transação 1", date: "05 Abril 2023, às 10:00 AM", type: "debit", amount: 1200 },
        { id: 2, name: "Transação 2", date: "06 Abril 2023, às 02:30 PM", type: "credit", amount: 3500 },
      ],
      invoices: [
        { id: 1, name: "Fatura 1", status: "Paga", amount: 2000 },
        { id: 2, name: "Fatura 2", status: "Pendente", amount: 750 },
        { id: 3, name: "Fatura 3", status: "Cancelada", amount: 500 },
      ],
    };
  },
};
</script>
