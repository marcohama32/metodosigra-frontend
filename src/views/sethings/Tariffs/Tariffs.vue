<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <h4>Tarifa</h4>

            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="number" v-model="newCategory.tariff" class="form-control form-control-md"
                    placeholder="Taxa de cobranca" required /> <!-- Novo campo Tariff -->
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="number" v-model="newCategory.maxLimit" class="form-control form-control-md"
                    placeholder="Limite maximo" required /> <!-- Novo campo Max Limit -->
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="number" v-model="newCategory.reconnectionFee" class="form-control form-control-md"
                    placeholder="Taxa de reeligacao" required /> <!-- Novo campo Max Limit -->
            </div>
            <div class="col-12 mb-3">
                <textarea v-model="newCategory.description" class="form-control form-control-md" placeholder="Descrição"
                    rows="3"></textarea>
            </div>
        </div>
        <div class="col-auto d-flex">
            <button class="btn btn-primary btn-md me-2" @click="updateCategory">Atualizar</button>
            <!-- Botão de Atualizar -->
            <button class="btn btn-secondary btn-md me-2" @click="goBack">Cancelar</button> <!-- Botão de Cancelar -->

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AddCategory",
    data() {
        return {
            newCategory: {
                name: '',
                chargeValue: null,
                tariff: null, // Novo campo Tariff
                maxLimit: null, // Novo campo Max Limit
                reconnectionFee: null, // Novo campo Reconnection Fee
                description: '',
            },
        };
    },
    methods: {
        addCategory() {
            // Lógica para adicionar a categoria
            if (this.validateFields()) {
                console.log('Categoria adicionada:', this.newCategory);
                this.newCategory = {}; // Limpa o formulário após adicionar
            }
        },

        updateCategory() {
            // Lógica para atualizar a categoria
            if (this.validateFields()) {
                console.log('Categoria atualizada:', this.newCategory);
                // Aqui você pode adicionar a lógica para atualizar a categoria no backend
            }
        },

        validateFields() {
            // Verifica se os campos Tariff e Max Limit não são nulos
            if (this.newCategory.tariff == null || this.newCategory.maxLimit == null || this.newCategory.reconnectionFee == null) {
                alert('Os campos Tariff, Max Limit e Reconnection Fee não podem ser nulos.');
                return false;
            }
            return true;
        },

        clearForm() {
            this.newCategory = { // Redefine o formulário para os valores iniciais
                name: '',
                chargeValue: null,
                tariff: null,
                maxLimit: null,
                reconnectionFee: null,
                description: '',
            };
        },

        goBack() {
            this.$router.go(-1); // Volta para a página anterior
        },
    },
};
</script>