<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <!-- Contêiner flexível para alinhar os elementos -->
            <div class="col-auto mb-3 d-flex align-items-center">
                <!-- Campo de pesquisa com um tamanho maior e responsivo -->
                <input type="text" v-model="newData" class="form-control form-control-md"
                    placeholder="Pesquise por dados ou informações" style="width: 350px;" data-bs-toggle="tooltip"
                    title="Pesquisar" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="newData" class="form-control form-control-md" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="newData" class="form-control form-control-md" />
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-success btn-md" @click="addData">
                    <i class="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-secondary btn-md" @click="clearData" data-bs-toggle="tooltip" title="Limpar">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </button>
            </div>
            <!-- Botão "Adicionar" totalmente à direita -->
            <div class="col ms-auto d-flex">
                <div class="ms-auto">
                    <router-link to="/adicionar/dispensa">
                        <button class="btn btn-success btn-md">Adicionar</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Funcionários</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0" style="overflow-x: auto;">
                            <table class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Nome do Funcionário</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Cargo</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Salário</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                                            Data de Admissão</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="funcionario in paginatedFuncionarios" :key="funcionario.id">
                                        <td style="padding: 20px;">
                                            <h6 class="mb-0 text-sm">{{ funcionario.nome }}</h6>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ funcionario.cargo }}</p>
                                        </td>
                                        <td>
                                            <span class="text-xs font-weight-bold">{{ funcionario.salario }}</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span class="text-xs font-weight-bold">{{ funcionario.dataAdmissao }}</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <button class="btn btn-secondary p-0 me-1"
                                                style="width: 30px; height: 30px;" data-bs-toggle="tooltip"
                                                title="Editar" @click="editProject(funcionario)">
                                                <i class="fa fa-edit text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-danger p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Excluir"
                                                @click="deleteProject(funcionario)">
                                                <i class="fa fa-trash text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-info p-0" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Detalhes">
                                                <i class="fa fa-info text-xs" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            :current-page="currentPage"
                            :total-pages="totalPages"
                            @prev-page="prevPage"
                            @next-page="nextPage"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
    name: "TablesPage",
    data() {
        return {
            newData: '',
            currentPage: 1,
            itemsPerPage: 5,
            funcionariosData: [
                { id: 1, nome: 'Funcionário 1', cargo: 'Cargo 1', salario: 'R$ 3,000', dataAdmissao: '2022-01-01' },
                { id: 2, nome: 'Funcionário 2', cargo: 'Cargo 2', salario: 'R$ 4,000', dataAdmissao: '2022-02-01' },
                { id: 3, nome: 'Funcionário 3', cargo: 'Cargo 3', salario: 'R$ 5,000', dataAdmissao: '2022-03-01' },
                { id: 4, nome: 'Funcionário 4', cargo: 'Cargo 4', salario: 'R$ 6,000', dataAdmissao: '2022-04-01' },
                { id: 5, nome: 'Funcionário 5', cargo: 'Cargo 5', salario: 'R$ 7,000', dataAdmissao: '2022-05-01' },
                { id: 6, nome: 'Funcionário 6', cargo: 'Cargo 6', salario: 'R$ 8,000', dataAdmissao: '2022-06-01' },
                { id: 7, nome: 'Funcionário 7', cargo: 'Cargo 7', salario: 'R$ 9,000', dataAdmissao: '2022-07-01' },
                { id: 8, nome: 'Funcionário 8', cargo: 'Cargo 8', salario: 'R$ 10,000', dataAdmissao: '2022-08-01' },
                { id: 9, nome: 'Funcionário 9', cargo: 'Cargo 9', salario: 'R$ 11,000', dataAdmissao: '2022-09-01' },
                { id: 10, nome: 'Funcionário 10', cargo: 'Cargo 10', salario: 'R$ 12,000', dataAdmissao: '2022-10-01' },
            ],
        };
    },
    components: {
        Pagination,
    },
    computed: {
        filteredFuncionarios() {
                return this.funcionariosData.filter(funcionario => 
                funcionario.nome.toLowerCase().includes(this.newData.toLowerCase())
            );
        },
        totalFuncionarios() {
            return this.funcionariosData.length;
        },
        paginatedFuncionarios() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.funcionariosData.slice(start, start + this.itemsPerPage);
        },
        totalPages() {
            return Math.ceil(this.totalFuncionarios / this.itemsPerPage);
        },
    },
    methods: {
        addData() {
            if (this.newData) {
                this.funcionariosData.push({ id: this.funcionariosData.length + 1, nome: this.newData });
                this.newData = '';
            }
        },
        editProject(funcionario) {
            console.log('Editando funcionário:', funcionario);
        },
        deleteProject(funcionario) {
            console.log('Excluindo funcionário:', funcionario);
        },
        clearData() {
            this.newData = '';
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
    },
    mounted() {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    },
};
</script>