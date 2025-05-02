<template>
  <div class="container-fluid mt-4">
    <div class="row align-items-center">
      <div class="col-lg-4 col-sm-8">
        <nav-pill />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <div class="row mt-4">
          <div class="col-xl-6 mb-xl-0 mb-4">
            <master-card :title="masterCardTitle" :description="masterCardDescription" />
          </div>
          <div class="col-xl-6">
            <div class="row">
              <div class="col-md-6">
                <default-info-card
                  :class-icon="cobrancas.classIcon"
                  :title="cobrancas.title"
                  :desc="cobrancas.desc"
                  :price="cobrancas.price"
                  :status="cobrancas.status"
                />
              </div>
              <div class="col-md-6">
                <default-info-card
                  :class-icon="paypal.classIcon"
                  :title="paypal.title"
                  :desc="paypal.desc"
                  :price="paypal.price"
                />
              </div>
            </div>
          </div>
          <div class="col-md-12 mb-4">
            <payment-card :payment-method="cobrancas.paymentMethod" :last-payment-date="cobrancas.lastPaymentDate" />
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <invoice-card :invoice-details="invoiceDetails" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-7">
        <billing-card :billing-info="billingInfo" />
      </div>
      <div class="col-md-5 mt-4">
        <transaction-card :transactions="transactionList" />
      </div>
    </div>
  </div>
</template>

<script>
import setTooltip from "@/assets/js/tooltip.js";
import NavPill from "./components/NavPill.vue";
import MasterCard from "@/examples/Cards/MasterCard.vue";
import DefaultInfoCard from "@/examples/Cards/DefaultInfoCard.vue";
import PaymentCard from "./components/PaymentCard.vue";
import InvoiceCard from "./components/InvoiceCard.vue";
import BillingCard from "./components/BillingCard.vue";
import TransactionCard from "./components/TransactionCard.vue";

export default {
  name: "CobrançasPage",
  components: {
    NavPill,
    MasterCard,
    DefaultInfoCard,
    PaymentCard,
    InvoiceCard,
    BillingCard,
    TransactionCard,
  },
  data() {
    return {
      masterCardTitle: "MasterCard",
      masterCardDescription: "Gerencie suas cobranças com o MasterCard.",
      cobrancas: {
        classIcon: "text-white fas fa-money-bill-wave",
        title: "Cobranças",
        desc: "Gerenciamento de Cobranças",
        price: "+$2000",
        status: "Ativo",
        lastPaymentDate: "2023-10-01",
        paymentMethod: "Cartão de Crédito",
      },
      paypal: {
        classIcon: "text-white fab fa-paypal",
        title: "Paypal",
        desc: "Freelance Payment",
        price: "$455.00",
      },
      invoiceDetails: {
        invoiceNumber: "INV-12345",
        dueDate: "2023-11-01",
        totalAmount: "$2455.00",
        items: [
          { description: "Serviço A", amount: "$1500" },
          { description: "Serviço B", amount: "$955" },
        ],
      },
      billingInfo: {
        totalDue: "$2000",
        lastPayment: "2023-10-01",
        nextPayment: "2023-11-01",
      },
      transactionList: [
        { id: 1, date: "2023-10-01", amount: "$2000", status: "Pago", method: "Cartão de Crédito" },
        { id: 2, date: "2023-09-15", amount: "$455", status: "Pago", method: "Paypal" },
      ],
    };
  },
  mounted() {
    setTooltip();
  },
};
</script>
