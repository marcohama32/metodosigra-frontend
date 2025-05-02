<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <!-- Contêiner flexível para alinhar os elementos -->
            <div class="col-auto mb-3 d-flex align-items-center">
                <!-- Campo de pesquisa com um tamanho maior e responsivo -->
                <input type="text" v-model="searchProvince" class="form-control form-control-md"
                    placeholder="Pesquise por dados ou informações" style="width: 350px;" data-bs-toggle="tooltip"
                    title="Pesquisar" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="startDate" class="form-control form-control-md" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="endDate" class="form-control form-control-md" />
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-success btn-md" @click="searchProvinces">
                    <i class="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-secondary btn-md" @click="clearSearch" data-bs-toggle="tooltip" title="Limpar">
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
                        <h6>Provincias</h6>
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
                                            População</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Área (km²)</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                                            Capital</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="provincia in filteredProvinces" :key="provincia.id">
                                        <td>
                                            <h6 class="mb-0 text-sm">{{ provincia.nome }}</h6>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ provincia.populacao }}</p>
                                        </td>
                                        <td>
                                            <span class="text-xs font-weight-bold">{{ provincia.area }}</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span class="text-xs font-weight-bold">{{ provincia.capital }}</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <button class="btn btn-secondary p-0 me-1"
                                                style="width: 30px; height: 30px;" data-bs-toggle="tooltip"
                                                title="Editar" @click="editProject(provincia)">
                                                <i class="fa fa-edit text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-danger p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Excluir"
                                                @click="deleteProject(provincia)">
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
            searchProvince: '',
            startDate: '',
            endDate: '',
            newData: '',
            provinciasData: [
                { id: 1, nome: 'Maputo', populacao: '1,000,000', area: '100,000', capital: 'Cidade 1' },
                { id: 2, nome: 'Nampula', populacao: '1,000,000', area: '100,000', capital: 'Cidade 1' },
                { id: 3, nome: 'Niassa', populacao: '1,000,000', area: '100,000', capital: 'Cidade 1' },
                { id: 4, nome: 'Tete', populacao: '1,000,000', area: '100,000', capital: 'Cidade 1' },
                { id: 5, nome: 'Zambezia', populacao: '1,000,000', area: '100,000', capital: 'Cidade 1' },
                { id: 6, nome: 'Sofala', populacao: '1,000,000', area: '100,000', capital: 'Cidade 1' },
                { id: 7, nome: 'Manica', populacao: '1,000,000', area: '100,000', capital: 'Cidade 1' },
                { id: 8, nome: 'Inhambane', populacao: '1,000,000', area: '100,000', capital: 'Cidade 1' },
                { id: 9, nome: 'Gaza', populacao: '1,000,000', area: '100,000', capital: 'Cidade 1' },
                { id: 10, nome: 'Cabo Delgado', populacao: '1,000,000', area: '100,000', capital: 'Cidade 1' },


            ],
            sortKey: 'provincia',
            sortOrder: 'asc',
            currentPage: 1,
            itemsPerPage: 5,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredProvinces.length / this.itemsPerPage);
        },
        paginatedProvinces() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredProvinces.slice(start, start + this.itemsPerPage);
        },
        filteredProvinces() {
            return this.provinciasData.filter(provincia => {
                const matchesProvince = this.searchProvince ? provincia.nome.toLowerCase().includes(this.searchProvince.toLowerCase()) : true;
                const matchesStartDate = this.startDate ? new Date(provincia.data) >= new Date(this.startDate) : true;
                const matchesEndDate = this.endDate ? new Date(provincia.data) <= new Date(this.endDate) : true;
                return matchesProvince && matchesStartDate && matchesEndDate;
            });
        },
    },
    methods: {
        searchProvinces() {
            console.log('Pesquisando província:', this.searchProvince);
            console.log('Data de Início:', this.startDate);
            console.log('Data de Fim:', this.endDate);
        },
        clearSearch() {
            this.searchProvince = '';
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
                this.provinciasData.push({ id: this.provinciasData.length + 1, nome: this.newData });
                this.newData = '';
            }
        },
        editProject(provincia) {
            console.log('Editando província:', provincia);
        },
        deleteProject(provincia) {
            console.log('Excluindo província:', provincia);
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