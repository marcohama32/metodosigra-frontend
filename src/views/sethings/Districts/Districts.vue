<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <!-- Formulário de pesquisa -->
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="searchQuery" class="form-control form-control-md"
                    placeholder="Pesquise por distritos" style="width: 250px;" data-bs-toggle="tooltip"
                    title="Pesquisar" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="text" v-model="searchData.nomeProvincia" class="form-control form-control-md"
                    placeholder="Pesquisar Nome da Província" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="number" v-model="searchData.populacao" class="form-control form-control-md"
                    placeholder="Pesquisar População" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="number" v-model="searchData.area" class="form-control form-control-md"
                    placeholder="Pesquisar Área (km²)" />
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-success btn-md" @click="searchData">
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
                    <router-link to="/adicionar/distrito">
                        <button class="btn btn-success btn-md">Adicionar</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Distritos</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0" style="overflow-x: auto;">
                            <table class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Nome da Província</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Nome do Distrito</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            População</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Área (km²)</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="distrito in paginatedDistritos" :key="distrito.id">
                                        <td>
                                            <h6 class="mb-0 text-sm">{{ distrito.nomeProvincia }}</h6>
                                        </td>
                                        <td>
                                            <h6 class="mb-0 text-sm">{{ distrito.nome }}</h6>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ distrito.populacao }}</p>
                                        </td>
                                        <td>
                                            <span class="text-xs font-weight-bold">{{ distrito.area }}</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <button class="btn btn-secondary p-0 me-1"
                                                style="width: 30px; height: 30px;" data-bs-toggle="tooltip"
                                                title="Editar" @click="editProject(distrito)">
                                                <i class="fa fa-edit text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-danger p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Excluir"
                                                @click="deleteProject(distrito)">
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
import Pagination from "@/components/Pagination.vue";
export default {
    components: {
        Pagination
    },
    name: "TablesPage",
    data() {
        return {
            searchQuery: '',
            searchData: {
                nome: '',
                nomeProvincia: '',
                populacao: '',
                area: ''
            },
            distritosData: [
                { id: 1, nomeProvincia: 'Maputo', nome: 'Marracuene', populacao: '500,000', area: '50,000' },
                { id: 2, nomeProvincia: 'Maputo', nome: 'Matola', populacao: '500,000', area: '50,000' },
                { id: 3, nomeProvincia: 'Maputo', nome: 'Namaacha', populacao: '500,000', area: '50,000' },
                { id: 4, nomeProvincia: 'Nampula', nome: 'Nampula', populacao: '500,000', area: '50,000' },
                { id: 5, nomeProvincia: 'Maputo', nome: 'Nacala', populacao: '500,000', area: '50,000' },
                { id: 6, nomeProvincia: 'Nampula', nome: 'Nacala', populacao: '500,000', area: '50,000' },
                { id: 7, nomeProvincia: 'Nampula', nome: 'Nacala', populacao: '500,000', area: '50,000' },
                { id: 8, nomeProvincia: 'Nampula', nome: 'Nacala', populacao: '500,000', area: '50,000' },
                { id: 9, nomeProvincia: 'Nampula', nome: 'Nacala', populacao: '500,000', area: '50,000' },
                { id: 10, nomeProvincia: 'Nampula', nome: 'Nacala', populacao: '500,000', area: '50,000' },
               
            ],
            currentPage: 1,
            itemsPerPage: 5,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.distritosData.length / this.itemsPerPage);
        },
        paginatedDistritos() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.distritosData.slice(start, start + this.itemsPerPage);
        },
        filteredDistritos() {
            return this.distritosData.filter(distrito => {
                const matchesDistrict = this.searchQuery ? distrito.nome.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;
                return matchesDistrict;
            });
        },
    },
    methods: {
        searchData() {
            console.log(`Pesquisando por: ${this.searchQuery}`);
        },
        clearSearch() {
            this.searchQuery = '';
            this.searchData.nome = '';
            this.searchData.nomeProvincia = '';
            this.searchData.populacao = '';
            this.searchData.area = '';
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
        editProject(distrito) {
            console.log('Editando distrito:', distrito);
        },
        deleteProject(distrito) {
            console.log('Excluindo distrito:', distrito);
        },
        clearData() {
            this.searchQuery = '';
            this.searchData.nome = '';
            this.searchData.nomeProvincia = '';
            this.searchData.populacao = '';
            this.searchData.area = '';

            // Adicione aqui qualquer lógica adicional necessária para atualizar a tabela ou a interface
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