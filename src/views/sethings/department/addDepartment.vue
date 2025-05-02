src/views/user/AddUser.vue
<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <h4>Adicionar Departamento</h4>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="newDepartment.name" class="form-control form-control-md" placeholder="Nome do Departamento" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="newDepartment.description" class="form-control form-control-md" placeholder="Descrição" />
            </div>
        </div>
        <div class="col-auto d-flex">
            <button class="btn btn-success btn-md me-2" @click="addDepartment">Salvar Departamento</button>
            <router-link to="/departamentos">
                <button class="btn btn-secondary btn-md me-2">Cancelar</button>
            </router-link>
            <button class="btn btn-light btn-md" @click="clearForm">Limpar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AddDepartment",
    data() {
        return {
            newDepartment: {
                name: '',
                description: '',
            },
        };
    },
    methods: {
        addDepartment() {
            console.log('Departamento adicionado:', this.newDepartment);
            this.newDepartment = {};
        },
        clearForm() {
            this.newDepartment = {
                name: '',
                description: '',
            };
        },
    },
};
</script>

<style scoped>
.custom-checkbox {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
}

.custom-checkbox input {
    opacity: 0;
    width: 0;
    height: 0;
}

.checkmark {
    position: relative;
    height: 24px;
    width: 24px;
    background-color: #f0f0f0;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin-right: 10px;
    transition: background-color 0.3s, border-color 0.3s;
}

.custom-checkbox:hover .checkmark {
    background-color: #e0e0e0;
    border-color: #888;
}

.custom-checkbox input:checked + .checkmark {
    background-color: #4CAF50;
    border-color: #4CAF50;
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.custom-checkbox input:checked + .checkmark:after {
    display: block;
}

.custom-checkbox .checkmark:after {
    left: 9px;
    top: 4px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.checkbox-label {
    font-size: 16px;
    color: #333;
}
</style>