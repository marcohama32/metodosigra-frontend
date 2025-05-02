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
                    <router-link to="/adicionar/provincia">
                        <button class="btn btn-success btn-md">Adicionar</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Bairros</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0" style="overflow-x: auto;">
                            <table class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Nome do Bairro</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            População</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Área (km²)</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                                            Distrito</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="bairro in paginatedBairros" :key="bairro.id">
                                        <td>
                                            <h6 class="mb-0 text-sm">{{ bairro.nome }}</h6>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ bairro.populacao }}</p>
                                        </td>
                                        <td>
                                            <span class="text-xs font-weight-bold">{{ bairro.area }}</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span class="text-xs font-weight-bold">{{ bairro.distrito }}</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <button class="btn btn-secondary p-0 me-1"
                                                style="width: 30px; height: 30px;" data-bs-toggle="tooltip"
                                                title="Editar" @click="editProject(bairro)">
                                                <i class="fa fa-edit text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-danger p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Excluir" @click="deleteProject(bairro)">
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
                        <Pagination :current-page="currentPage" :total-pages="totalPages" @prev-page="prevPage"
                            @next-page="nextPage" />
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
    components: {
        Pagination
    },
    data() {
        return {
            newData: '',
            bairrosData: [
                { id: 1, nome: 'Bairro 1', populacao: '100,000', area: '10', distrito: 'Distrito 1' },
                { id: 2, nome: 'Bairro 2', populacao: '150,000', area: '15', distrito: 'Distrito 2' },
                { id: 3, nome: 'Bairro 3', populacao: '200,000', area: '20', distrito: 'Distrito 3' },
                { id: 4, nome: 'Bairro 4', populacao: '250,000', area: '25', distrito: 'Distrito 4' },
                { id: 5, nome: 'Bairro 5', populacao: '300,000', area: '30', distrito: 'Distrito 5' },
                { id: 6, nome: 'Bairro 6', populacao: '350,000', area: '35', distrito: 'Distrito 6' },
            ],
            sortKey: 'bairro',
            sortOrder: 'asc',
            currentPage: 1,
            itemsPerPage: 5,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.bairrosData.length / this.itemsPerPage);
        },
        paginatedBairros() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.bairrosData.slice(start, start + this.itemsPerPage);
        },
        filteredBairros() {
            return this.bairrosData.filter(bairro => {
                const matchesBairro = this.searchBairro ? bairro.nome.toLowerCase().includes(this.searchBairro.toLowerCase()) : true;
                const matchesStartDate = this.startDate ? new Date(bairro.data) >= new Date(this.startDate) : true;
                const matchesEndDate = this.endDate ? new Date(bairro.data) <= new Date(this.endDate) : true;
                return matchesBairro && matchesStartDate && matchesEndDate;
            });
        },
    },
    methods: {
        searchBairros() {
            console.log('Pesquisando bairro:', this.searchBairro);
            console.log('Data de Início:', this.startDate);
            console.log('Data de Fim:', this.endDate);
        },
        clearSearch() {
            this.searchBairro = '';
            this.startDate = '';
            this.endDate = '';
        },
        sortTable(column) {
            this.sortKey = column;
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        },
        exportData() {
            console.log('Exportando dados...');
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        addData() {
            if (this.newData) {
                this.bairrosData.push({ id: this.bairrosData.length + 1, nome: this.newData, populacao: '0', area: '0', distrito: 'Novo Distrito' });
                this.newData = '';
            }
        },
        editProject(bairro) {
            console.log('Editando bairro:', bairro);
        },
        deleteProject(bairro) {
            console.log('Excluindo bairro:', bairro);
        },
        clearData() {
            this.newData = '';
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