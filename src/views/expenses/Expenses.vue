<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <!-- Campo de pesquisa para despesas -->
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="newDescription" class="form-control form-control-md"
                    placeholder="Descrição da despesa" style="width: 350px;" data-bs-toggle="tooltip"
                    title="Pesquisar" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="number" v-model="newValue" class="form-control form-control-md"
                    placeholder="Valor da despesa" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="newDate" class="form-control form-control-md" />
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
            <div class="col ms-auto d-flex">
                <div class="ms-auto">
                    <router-link to="/adicionar/despesa">
                        <button class="btn btn-success btn-md">Adicionar</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Despesas</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0" style="overflow-x: auto;">
                            <table class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Despesa</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Valor</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">
                                            Descrição</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7">
                                            Data</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7">
                                            Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="despesa in paginatedDespesas" :key="despesa.id">
                                        <td class="align-middle" style="padding: 20px;">
                                            <h6 class="mb-0 text-sm">{{ despesa.descricao }}</h6>
                                        </td>
                                        <td class="align-middle">
                                            <span class="text-xs font-weight-bold">{{ despesa.valor }}</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span class="text-xs font-weight-bold">{{ despesa.descricao }}</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span class="text-xs font-weight-bold">{{ despesa.data }}</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <button class="btn btn-secondary p-0 me-1"
                                                style="width: 30px; height: 30px;" data-bs-toggle="tooltip"
                                                title="Editar" @click="editExpense(despesa)">
                                                <i class="fa fa-edit text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-danger p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Excluir"
                                                @click="deleteExpense(despesa)">
                                                <i class="fa fa-trash text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-info p-0" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Detalhes">
                                                <i class="fa fa-info text-xs" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="text-end font-weight-bold">Total de Despesas do Mês:</td>
                                        <td class="font-weight-bold text-end">{{ totalMonthlyExpenses }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="mt-3 d-flex justify-content-between align-items-center">
                                
                                <div class="flex-grow-1 text-center">
                                    <Pagination :current-page="currentPage" :total-pages="totalPages" @prev-page="prevPage"
                                        @next-page="nextPage" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
    name: "ExpensesPage",
    data() {
        return {
            newDescription: '',
            newValue: '',
            newDate: '',
            currentPage: 1,
            itemsPerPage: 5,
            despesasData: [
                { id: 1, descricao: 'Despesa 1', valor: 'R$ 100', descricao: 'Descrição da Despesa 1', data: '2022-01-01' },
                { id: 2, descricao: 'Despesa 2', valor: 'R$ 200', descricao: 'Descrição da Despesa 2', data: '2022-02-01' },
                { id: 3, descricao: 'Despesa 3', valor: 'R$ 300', descricao: 'Descrição da Despesa 3', data: '2022-03-01' },
                { id: 4, descricao: 'Despesa 4', valor: 'R$ 400', descricao: 'Descrição da Despesa 4', data: '2022-04-01' },
                { id: 5, descricao: 'Despesa 5', valor: 'R$ 500', descricao: 'Descrição da Despesa 5', data: '2022-05-01' },
                { id: 6, descricao: 'Despesa 6', valor: 'R$ 600', descricao: 'Descrição da Despesa 6', data: '2022-06-01' },
                { id: 7, descricao: 'Despesa 7', valor: 'R$ 700', descricao: 'Descrição da Despesa 7', data: '2022-07-01' },
                { id: 8, descricao: 'Despesa 8', valor: 'R$ 800', descricao: 'Descrição da Despesa 8', data: '2022-08-01' },
                { id: 9, descricao: 'Despesa 9', valor: 'R$ 900', descricao: 'Descrição da Despesa 9', data: '2022-09-01' },
                { id: 10, descricao: 'Despesa 10', valor: 'R$ 1000', descricao: 'Descrição da Despesa 10', data: '2022-10-01' },
                { id: 11, descricao: 'Despesa 11', valor: 'R$ 1100', descricao: 'Descrição da Despesa 11', data: '2022-11-01' },
                { id: 12, descricao: 'Despesa 12', valor: 'R$ 1200', descricao: 'Descrição da Despesa 12', data: '2022-12-01' },
                { id: 13, descricao: 'Despesa 13', valor: 'R$ 1300', descricao: 'Descrição da Despesa 13', data: '2022-13-01' },
                { id: 14, descricao: 'Despesa 14', valor: 'R$ 1400', descricao: 'Descrição da Despesa 14', data: '2022-14-01' },
                { id: 15, descricao: 'Despesa 15', valor: 'R$ 1500', descricao: 'Descrição da Despesa 15', data: '2022-15-01' },    
                
            ],
        };
    },
    components: {
        Pagination,
    },
    computed: {
        totalPages() {
            return Math.ceil(this.despesasData.length / this.itemsPerPage);
        },
        paginatedDespesas() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.despesasData.slice(start, start + this.itemsPerPage);
        },
        totalMonthlyExpenses() {
            const currentMonth = new Date().getMonth(); // Mês atual (0-11)
            const currentYear = new Date().getFullYear(); // Ano atual
            return this.despesasData.reduce((total, despesa) => {
                const despesaDate = new Date(despesa.data);
                if (despesaDate.getMonth() === currentMonth && despesaDate.getFullYear() === currentYear) {
                    return total + parseFloat(despesa.valor.replace('R$ ', '').replace('.', '').replace(',', '.'));
                }
                return total;
            }, 0).toFixed(2).replace('.', ','); // Formatação para moeda
        },
    },
    methods: {
        addExpense() {
            if (this.newDescription && this.newValue && this.newDate) {
                this.despesasData.push({
                    id: this.despesasData.length + 1,
                    descricao: this.newDescription,
                    valor: this.newValue,
                    data: this.newDate
                });
                this.newDescription = '';
                this.newValue = '';
                this.newDate = '';
            }
        },
        editExpense(despesa) {
            console.log('Editando despesa:', despesa);
        },
        deleteExpense(despesa) {
            console.log('Excluindo despesa:', despesa);
        },
        clearData() {
            this.newDescription = '';
            this.newValue = '';
            this.newDate = '';
        },
        sortTable(column) {
            this.sortKey = column;
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
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