src/views/user/AddUser.vue
<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <h4>Informações do Usuário</h4>
            <div class="col-auto mb-3">
                <div class="card p-3">
                    <label class="custom-checkbox">
                        <input type="checkbox" v-model="newUser.isEmployee" @change="toggleEmployeeFields" />
                        <span class="checkmark"></span>
                        <span class="checkbox-label">É Funcionário?</span>
                    </label>
                </div>
            </div>
            <div class="col-auto mb-3 d-flex align-items-center" v-if="newUser.isEmployee">
                <select v-model="newUser.employeeId" class="form-control form-control-md">
                    <option disabled value="">Selecione o Funcionário</option>
                    <option v-for="employee in employees" :key="employee.id" :value="employee.id">{{ employee.name }}
                    </option>
                </select>
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="newUser.name" class="form-control form-control-md" placeholder="Nome"
                    v-if="!newUser.isEmployee" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="date" v-model="newUser.birthDate" class="form-control form-control-md"
                    placeholder="Data de Nascimento"  v-if="!newUser.isEmployee" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="email" v-model="newUser.email" class="form-control form-control-md" placeholder="Email" v-if="!newUser.isEmployee" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="tel" v-model="newUser.phone" class="form-control form-control-md"
                    placeholder="Telemóvel" v-if="!newUser.isEmployee" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="newUser.username" class="form-control form-control-md"
                    placeholder="Usuário" />
            </div>
            <!-- <div class="col-auto mb-3 d-flex align-items-center">
                <select v-model="newUser.department" class="form-control form-control-md" v-if="!newUser.isEmployee">
                    <option disabled value="">Selecione o Departamento</option>
                    <option v-for="department in departments" :key="department.id" :value="department.id">{{
                        department.name }}</option>
                </select>
            </div> -->
            <div class="col-auto mb-3 d-flex align-items-center">
                <select v-model="newUser.district" class="form-control form-control-md">
                    <option disabled value="">Selecione o Distrito</option>
                    <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.name }}
                    </option>
                </select>
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="password" v-model="newUser.password" class="form-control form-control-md"
                    placeholder="Senha" />
            </div>
           
            
        </div>
        <div class="col-auto d-flex">
            <button class="btn btn-success btn-md me-2" @click="addUser">Salvar Usuário</button>
            <router-link to="/usuarios">
                <button class="btn btn-secondary btn-md me-2">Cancelar</button>
            </router-link>
            <button class="btn btn-light btn-md" @click="clearForm">Limpar</button>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AddUser",
    data() {
        return {
            newUser: { // Campos atualizados conforme solicitado
                name: '',
                birthDate: '',
                email: '',
                phone: '',
                username: '',
                department: '',
                district: '',
                password: '',
                isEmployee: false, // Novo campo para indicar se é funcionário
                employeeId: '', // ID do funcionário, se aplicável
            },
            departments: [], // Array para armazenar departamentos
            districts: [], // Array para armazenar distritos
            employees: [], // Array para armazenar funcionários
        };
    },
    created() {
        this.fetchDepartments(); // Busca departamentos ao criar o componente
        this.fetchDistricts(); // Busca distritos ao criar o componente
        this.fetchEmployees(); // Busca funcionários ao criar o componente
    },
    methods: {
        async fetchDepartments() {
            try {
                const response = await axios.get('/api/departments'); // Substitua pela sua URL da API
                this.departments = response.data; // Supondo que a resposta seja um array de departamentos
            } catch (error) {
                console.error('Erro ao buscar departamentos:', error);
            }
        },
        async fetchDistricts() {
            try {
                const response = await axios.get('/api/districts'); // Substitua pela sua URL da API
                this.districts = response.data; // Supondo que a resposta seja um array de distritos
            } catch (error) {
                console.error('Erro ao buscar distritos:', error);
            }
        },
        async fetchEmployees() {
            try {
                const response = await axios.get('/api/employees'); // Substitua pela sua URL da API
                this.employees = response.data; // Supondo que a resposta seja um array de funcionários
            } catch (error) {
                console.error('Erro ao buscar funcionários:', error);
            }
        },
        toggleEmployeeFields() {
            if (this.newUser.isEmployee) {
                // Limpa os campos que não são necessários se o usuário for um funcionário
                this.newUser.name = '';
                this.newUser.birthDate = '';
                this.newUser.email = '';
                this.newUser.phone = '';
                this.newUser.department = '';
                // Limpe outros campos se necessário
            }
        },
        addUser() { // Método para adicionar o usuário
            console.log('Usuário adicionado:', this.newUser);
            this.newUser = {}; // Limpa o formulário após adicionar
        },

        clearForm() {
            this.newUser = { // Limpa o formulário
                name: '',
                birthDate: '',
                email: '',
                phone: '',
                username: '',
                department: '',
                district: '',
                password: '',
                isEmployee: false,
                employeeId: '',
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