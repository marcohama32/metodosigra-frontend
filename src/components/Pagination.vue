<template>
    <div class="pagination d-flex justify-content-center align-items-center mt-3">
        <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
        <span class="mx-2">Página {{ currentPage }} de {{ totalPages }}</span>
        <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    methods: {
        nextPage() {
            this.$emit('next-page');
        },
        prevPage() {
            this.$emit('prev-page');
        }
    }
};
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}

.pagination-button {
    background-color: #007bff; /* Cor do botão */
    color: white; /* Cor do texto */
    border: none; /* Sem borda */
    border-radius: 50%; /* Bordas arredondadas para formato circular */
    width: 40px; /* Largura do botão */
    height: 40px; /* Altura do botão */
    display: flex; /* Flexbox para centralizar o ícone */
    align-items: center; /* Centraliza verticalmente */
    justify-content: center; /* Centraliza horizontalmente */
    cursor: pointer; /* Cursor de ponteiro */
    transition: background-color 0.3s; /* Transição suave */
}

.pagination-button:disabled {
    background-color: #ccc; /* Cor do botão desativado */
    cursor: not-allowed; /* Cursor de não permitido */
}

.pagination-button:hover:not(:disabled) {
    background-color: #0056b3; /* Cor ao passar o mouse */
}
</style> 