<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <h4>Adicionar Funcionário</h4>

            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="text" v-model="newEmployee.name" class="form-control form-control-md"
                    placeholder="Nome do Funcionário" required />
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="text" v-model="newEmployee.position" class="form-control form-control-md"
                    placeholder="Cargo" required />
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="number" v-model="newEmployee.salary" class="form-control form-control-md"
                    placeholder="Salário" required />
            </div>

            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="date" v-model="newEmployee.hireDate" class="form-control form-control-md"
                    placeholder="Data de Contratação" required />
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <select v-model="newEmployee.department" class="form-control form-control-md" required>
                    <option value="">Selecione o Departamento</option>
                    <option v-for="dept in departments" :key="dept.id" :value="dept.name" placeholder="Departamento">
                        {{ dept.name }}
                    </option>
                </select>
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="file" @change="onFileChange" class="form-control form-control-md" />
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="email" v-model="newEmployee.email" class="form-control form-control-md"
                    placeholder="Email" required />
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="text" v-model="newEmployee.phone" class="form-control form-control-md"
                    placeholder="Telefone" required />
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="text" v-model="newEmployee.address" class="form-control form-control-md"
                    placeholder="Endereço" required />
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="date" v-model="newEmployee.birthDate" class="form-control form-control-md"
                    placeholder="Data de Nascimento" required />
            </div>
            <div class="col-12 mb-3">
                <textarea v-model="newEmployee.description" class="form-control form-control-md" placeholder="Descrição"
                    rows="3"></textarea>
            </div>
        </div>
        <div class="col-auto d-flex">
            <button class="btn btn-primary btn-md me-2" @click="addEmployee">Adicionar</button>
            <button class="btn btn-secondary btn-md me-2" @click="goBack">Cancelar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AddEmployee",
    data() {
        return {
            newEmployee: {
                name: '',
                position: '',
                salary: '',
                hireDate: '',
                department: '',
                image: null,
                description: '',
                email: '',
                phone: '',
                address: '',
                birthDate: '',
            },
            departments: [],
        };
    },
    created() {
        this.fetchDepartments();
    },
    methods: {
        fetchDepartments() {
            axios.get('/api/departments')
                .then(response => {
                    this.departments = response.data;
                })
                .catch(error => {
                    console.error('Erro ao buscar departamentos:', error);
                });
        },
        onFileChange(event) {
            this.newEmployee.image = event.target.files[0];
        },
        addEmployee() {
            console.log('Funcionário adicionado:', this.newEmployee);
        },

        clearForm() {
            this.newEmployee = {
                name: '',
                position: '',
                salary: '',
                hireDate: '',
                department: '',
                image: null,
                description: '',
                email: '',
                phone: '',
                address: '',
                birthDate: '',
            };
        },

        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>