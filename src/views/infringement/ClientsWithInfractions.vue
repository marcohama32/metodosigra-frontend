<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <div class="col-auto mb-3 d-flex">
                <input type="text" v-model="searchClient" class="form-control form-control-md"
                    placeholder="Pesquisar Cliente" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="startDate" class="form-control form-control-md" placeholder="Data de Início" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="endDate" class="form-control form-control-md" placeholder="Data de Fim" />
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-primary btn-md" @click="searchClients">
                    <i class="fa fa-search" aria-hidden="true"></i> Pesquisar
                </button>
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-secondary btn-md" @click="clearSearch" data-bs-toggle="tooltip" title="Limpar">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </button>
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-info btn-md" @click="exportData">
                    <i class="fa fa-download" aria-hidden="true"></i> Exportar
                </button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Clientes com Infrações</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0" style="overflow-x: auto;">
                            <table class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr>
                                        <th @click="sortTable('cliente')" class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Cliente</th>
                                        <th @click="sortTable('tipo')" class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Tipo de Infração</th>
                                        <th @click="sortTable('valor')" class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Valor</th>
                                        <th @click="sortTable('data')" class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Data da Infração</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="infraction in paginatedInfractions" :key="infraction.id">
                                        <td style="padding: 20px;">
                                            <h6 class="mb-0 text-sm">{{ infraction.cliente }}</h6>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ infraction.tipo }}</p>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ infraction.valor }}</p>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ infraction.data }}</p>
                                        </td>
                                    </tr>
                                    <tr v-if="filteredInfractions.length === 0">
                                        <td colspan="4" class="text-center font-weight-bold">Nenhum resultado encontrado</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="text-end font-weight-bold">Total:</td>
                                        <td class="font-weight-bold">{{ totalValue }}</td>
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
    name: "ClientsWithInfractions",
    components: {
        Pagination
    },
    data() {
        return {
            searchClient: '',
            startDate: '',
            endDate: '',
            infractionsData: [
                { id: 1, cliente: 'Cliente A', data: '2023-01-01', valor: '7,500.00', tipo: 'Roubo de água' },
                { id: 2, cliente: 'Cliente B', data: '2023-01-02', valor: '10,000.00', tipo: 'Vandalização do sistema' },
                { id: 3, cliente: 'Cliente C', data: '2023-01-03', valor: '5,000.00', tipo: 'Corte Por Dívida' },
                { id: 4, cliente: 'Cliente D', data: '2023-01-04', valor: '3,200.00', tipo: 'A pedido do Cliente' },
                { id: 5, cliente: 'Cliente E', data: '2023-01-05', valor: '8,750.00', tipo: 'Contador não encontrado' },
                { id: 6, cliente: 'Cliente F', data: '2023-01-06', valor: '12,300.00', tipo: 'Contador não Visível' },
            ],
            sortKey: 'cliente',
            sortOrder: 'asc',
            currentPage: 1,
            itemsPerPage: 5,
        };
    },
    watch: {
        filteredInfractions(newVal) {
            this.currentPage = 1; // Reseta a página atual ao filtrar
        },
    },
    computed: {
        totalPages() {
            return Math.ceil(this.infractionsData.length / this.itemsPerPage);
        },
        paginatedInfractions() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.infractionsData.slice(start, start + this.itemsPerPage);
        },
        filteredInfractions() {
            return this.infractionsData.filter(infraction => {
                const matchesClient = this.searchClient ? infraction.cliente.toLowerCase().includes(this.searchClient.toLowerCase()) : true;
                const matchesStartDate = this.startDate ? new Date(infraction.data) >= new Date(this.startDate) : true;
                const matchesEndDate = this.endDate ? new Date(infraction.data) <= new Date(this.endDate) : true;
                return matchesClient && matchesStartDate && matchesEndDate;
            });
        },
        // paginatedInfractions() {
        //     const start = (this.currentPage - 1) * this.itemsPerPage;
        //     return this.filteredInfractions.slice(start, start + this.itemsPerPage);
        // },
        // totalPages() {
        //     return Math.ceil(this.filteredInfractions.length / this.itemsPerPage);
        // },
        totalValue() {
            return this.filteredInfractions.reduce((total, infraction) => {
                return total + parseFloat(infraction.valor.replace(/,/g, ''));
            }, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        },
    },
    methods: {
        searchClients() {
            console.log('Pesquisando cliente:', this.searchClient);
            console.log('Data de Início:', this.startDate);
            console.log('Data de Fim:', this.endDate);
        },
        clearSearch() {
            this.searchClient = '';
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
    },
};
</script>

<style scoped>
/* Estilos específicos para a página, se necessário */
</style> 