<template>
  <div>
    <h1>Notificações</h1>
    <div class="notification-list">
      <div class="notification" v-for="notification in notifications" :key="notification.id">
        <p>{{ notification.message }}</p>
        <span class="date">{{ notification.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [
        { id: 1, message: 'Lembrete: Pagamento da fatura vencido.', date: '2023-10-01' },
        { id: 2, message: 'Manutenção programada para o dia 10.', date: '2023-10-05' },
        // Adicione mais notificações conforme necessário
      ]
    };
  }
}
</script>

<style>
.notification-list {
  margin: 20px;
}
.notification {
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