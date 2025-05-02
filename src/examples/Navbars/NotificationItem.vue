<template>
  <li class="notification-item">
    <div class="d-flex align-items-center">
      <i v-if="notification.icon" :class="notification.icon"></i>
      <div class="ms-3">
        <h6 class="mb-0">{{ notification.title }}</h6>
        <p class="text-sm mb-0">{{ notification.message }}</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "NotificationItem",
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.notification-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.2s ease;
}

.notification-item:hover {
  background-color: #f8f9fa;
}
</style>