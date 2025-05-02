<template>
    <div class="py-4 container-fluid">
        <!-- Mostrar mensagem de erro se existir -->
        <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
        </div>
        <!-- Mostrar loading enquanto carrega -->
        <div v-if="loading" class="text-center mb-3">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Carregando...</span>
            </div>
        </div>
        <!-- Form de busca -->
        <form @submit.prevent="handleSearch" class="row g-2 align-items-center d-flex">
            <div class="d-flex align-items-center gap-2 flex-wrap">
                <!-- <input type="text" v-model="filters.searchTerm" class="form-control mb-3"
                    placeholder="Pesquise por data..." style="width: 200px; height: 42px;" /> -->

                <input type="date" v-model="filters.startDate" class="form-control mb-3"
                    style="width: 150px; height: 42px;" />
                <input type="date" v-model="filters.endDate" class="form-control mb-3"
                    style="width: 150px; height: 42px;" />
                <button type="submit" class="btn btn-success btn-md" :disabled="isSearching">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    {{ isSearching ? 'Buscando...' : 'Buscar' }}
                </button>
                <button type="button" class="btn btn-secondary btn-md" @click="clearFilters">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </button>
            </div>
        </form>
        <!-- Filtros ativos -->
        <div v-if="hasActiveFilters" class="mt-2 mb-3">
            <div class="d-flex align-items-center">
                <span class="me-2">Filtros ativos:</span>
                <div v-if="filters.searchTerm" class="badge bg-primary me-2">
                    Busca: {{ filters.searchTerm }}
                    <button class="btn-close btn-close-white ms-2" @click="removeFilter('searchTerm')"></button>
                </div>
                <div v-if="filters.startDate" class="badge bg-primary me-2">
                    De: {{ formatDate(filters.startDate) }}
                    <button class="btn-close btn-close-white ms-2" @click="removeFilter('startDate')"></button>
                </div>
                <div v-if="filters.endDate" class="badge bg-primary me-2">
                    Até: {{ formatDate(filters.endDate) }}
                    <button class="btn-close btn-close-white ms-2" @click="removeFilter('endDate')"></button>
                </div>
            </div>
        </div>
        
        <div class="row g-2 align-items-center d-flex">
            <div class="d-flex gap-2 justify-content-end w-100">
                <router-link to="/analise-declinio">
                    <button class="btn btn-secondary btn-md">Análise de Declínio</button>
                </router-link>
                <router-link to="/analise-declinio-upload">
                    <button class="btn btn-success btn-md">Carregar Dados</button>
                </router-link>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Produção</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Date</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Oil (scm/d)</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Water (scm/d)</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Gas (scm/d)</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            BHP (Bar)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="paginatedUsers.length === 0">
                                        <td colspan="5" class="text-center py-4">
                                            Nenhum dado encontrado
                                        </td>
                                    </tr>
                                    <tr v-else v-for="data in paginatedUsers" :key="data.id || data.date"
                                        class="table-row">
                                        <td style="padding-left: 30px;">{{ formatDate(data.date) }}</td>
                                        <td>{{ data.oil }}</td>
                                        <td>{{ data.water }}</td>
                                        <td>{{ data.gas }}</td>
                                        <td>{{ data.bhp }}</td>
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

        <!-- Tabela de Dados -->

    </div>
</template>

<script>
import api from '@/services/api/axios';
import Pagination from "@/components/Pagination.vue";
import axios from "axios";

export default {
    components: {
        Pagination
    },
    name: "TablesPage",
    data() {
        return {
            searchUser: '',
            startDate: '',
            endDate: '',
            newData: '',
            sortKey: 'cliente',
            sortOrder: 'asc',
            currentPage: 1,
            itemsPerPage: 10,
            productionData: [],
            totalPages: 1,
            loading: false,
            error: null,
            filters: {
                searchTerm: "",
                startDate: "",
                endDate: ""
            },
            isSearching: false,
            showFilters: false,
        };
    },
    computed: {
        paginatedUsers() {
            return this.productionData;
        },
        hasActiveFilters() {
            return this.filters.searchTerm || this.filters.startDate || this.filters.endDate;
        }
    },
    watch: {
        filters: {
            handler(newFilters) {
                this.saveFiltersToStorage();
            },
            deep: true
        },
    },
    methods: {
        formatDate(dateString) {
            if (!dateString) return '';
            return new Date(dateString).toLocaleDateString('pt-BR');
        },
        async fetchProductionData(resetPage = false) {
            this.loading = true;
            this.error = null;
            try {
                if (resetPage) this.currentPage = 1;
                const params = {
                    page: this.currentPage,
                    pageSize: this.itemsPerPage,
                    ...(this.filters.searchTerm && { searchTerm: this.filters.searchTerm }),
                    ...(this.filters.startDate && { startDate: this.filters.startDate }),
                    ...(this.filters.endDate && { endDate: this.filters.endDate }),
                };
                const response = await api.get("/get/decline-analyses", {
                    params,
                    headers: { 'token': localStorage.getItem('token') }
                });
                
                this.productionData = response.data.data || [];
                this.totalPages = response.data.pagination?.totalPages || 1;
                this.itemsPerPage = response.data.pagination?.pageSize || 10;
                this.currentPage = response.data.pagination?.currentPage || 1;
            } catch (err) {
                this.error = "Erro ao carregar os dados. Tente novamente.";
            } finally {
                this.loading = false;
                this.isSearching = false;
            }
        },
        async handleSearch() {
            // console.log('handleSearch chamado', this.filters);
            this.isSearching = true;
            await this.fetchProductionData(true);
        },
        clearFilters() {
            this.filters = { searchTerm: "", startDate: "", endDate: "" };
            this.currentPage = 1;
            this.fetchProductionData();
        },
        removeFilter(filterName) {
            this.filters[filterName] = "";
            this.handleSearch();
        },
        setDateRange(period) {
            const end = new Date();
            let start = new Date();
            switch (period) {
                case "today":
                    start = new Date();
                    start.setHours(0, 0, 0, 0);
                    break;
                case "week":
                    start.setDate(start.getDate() - 7);
                    break;
                case "month":
                    start.setMonth(start.getMonth() - 1);
                    break;
            }
            this.filters.startDate = start.toISOString().split("T")[0];
            this.filters.endDate = end.toISOString().split("T")[0];
            this.handleSearch();
        },
        async nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                await this.fetchProductionData();
            }
        },
        async prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                await this.fetchProductionData();
            }
        },
        addData() {
            if (this.newData) {
                this.productionData.push({ id: this.productionData.length + 1, name: this.newData });
                this.newData = '';
            }
        },
        editUser(user) {
            // console.log('Editando usuário:', user);
        },
        deleteUser(user) {
            // console.log('Excluindo usuário:', user);
        },
        clearData() {
            this.newData = '';
        },
        loadFiltersFromStorage() {
            const savedFilters = localStorage.getItem('declinioFilters');
            if (savedFilters) {
                this.filters = JSON.parse(savedFilters);
                this.handleSearch();
            }
        },
        async fetchExpenses(resetPage = false) {
            // ...
            if (response.data.success === true) {
                this.expensesData = response.data.data || response.data.expenses || [];
                if (response.data.pagination) {
                    this.totalPages = response.data.pagination.totalPages;
                    this.itemsPerPage = response.data.pagination.pageSize;
                }
            }
            // ...
        },
        saveFiltersToStorage() {
            localStorage.setItem('declinioFilters', JSON.stringify(this.filters));
        },
    },
    mounted() {
        this.fetchProductionData();
        this.loadFiltersFromStorage();


        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    },
};
</script>