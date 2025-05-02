<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <h4>Informações da Categoria</h4>
            <div class="col-6 mb-3 d-flex align-items-center">
                <input type="text" v-model="newCategory.name" class="form-control form-control-md"
                    placeholder="Nome da Categoria" required />
            </div>
            <div class="col-6 mb-3 d-flex align-items-center">
                <input type="number" v-model="newCategory.chargeValue" class="form-control form-control-md"
                    placeholder="Taxa de Cobrança (%)" required />
            </div>

            <div class="col-12 mb-3">
                <textarea v-model="newCategory.description" class="form-control form-control-md" placeholder="Descrição"
                    rows="3"></textarea>
            </div>
        </div>
        <div class="col-auto d-flex">
            <button class="btn btn-success btn-md me-2" @click="addCategory">Salvar Categoria</button>
            <!-- <button class="btn btn-primary btn-md me-2" @click="updateCategory">Atualizar</button> -->
            <router-link to="/categorias">
                <button class="btn btn-secondary btn-md me-2">Cancelar</button>
            </router-link>
            <button class="btn btn-light btn-md" @click="clearForm">Limpar</button>
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
                tariff: null,
                maxLimit: null,
                description: '',
            },
        };
    },
    methods: {
        addCategory() {
            if (this.validateFields()) {
                console.log('Categoria adicionada:', this.newCategory);
                this.newCategory = {};
            }
        },

        updateCategory() {
            if (this.validateFields()) {
                console.log('Categoria atualizada:', this.newCategory);
            }
        },

        validateFields() {
            if (this.newCategory.tariff == null || this.newCategory.maxLimit == null) {
                alert('Os campos Tariff e Max Limit não podem ser nulos.');
                return false;
            }
            return true;
        },

        clearForm() {
            this.newCategory = {
                name: '',
                chargeValue: null,
                tariff: null,
                maxLimit: null,
                description: '',
            };
        },
    },
};
</script>