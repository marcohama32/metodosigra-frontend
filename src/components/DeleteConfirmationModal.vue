<template>
    <div class="custom-alert" v-if="isVisible">
        <div class="alert-content">
            <h5>Confirmar Exclusão</h5>
            <p>Você tem certeza que deseja excluir este pagamento?</p>
            <div class="alert-buttons">
                <button @click="confirmDelete" class="btn btn-danger">Excluir</button>
                <button @click="cancelDelete" class="btn btn-secondary">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            required: true
        },
        onDelete: {
            type: Function,
            required: true
        },
        onCancel: {
            type: Function,
            required: true
        }
    },
    methods: {
        confirmDelete() {
            this.onDelete(); // Chama a função de exclusão passada como prop
        },
        cancelDelete() {
            this.onCancel(); // Chama a função de cancelamento passada como prop
        }
    }
};
</script>

<style>
.custom-alert {
    display: flex; /* Exibe a modal */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro */
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Para garantir que fique acima de outros elementos */
}
.alert-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}
.alert-buttons {
    margin-top: 15px;
}
.alert-buttons button {
    margin: 0 5px;
}
</style> 