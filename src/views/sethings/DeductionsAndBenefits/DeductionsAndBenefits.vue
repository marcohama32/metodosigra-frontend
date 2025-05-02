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
                    <router-link to="/adicionar/imposto">
                        <button class="btn btn-success btn-md">Adicionar</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Impostos e Benefícios</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr class="padding: 20px;">
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Nome</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Tipo</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Percentual</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Valor Fixo</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Descrição</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in paginatedDeductionsAndBenefits" :key="item.name">
                                        <td style="padding: 20px;">
                                            <h6 class="mb-0 text-sm">{{ item.name }}</h6>
                                        </td>
                                        <td>
                                            <p class="text-sm mb-0">{{ item.type }}</p>
                                        </td>
                                        <td>
                                            <p class="text-sm mb-0">{{ item.percentage }}</p>
                                        </td>
                                        <td>
                                            <p class="text-sm mb-0">{{ item.fixedValue }}</p>
                                        </td>
                                        <td>
                                            <p class="text-sm mb-0">{{ item.description }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <button class="btn btn-secondary p-0 me-1"
                                                style="width: 30px; height: 30px;" data-bs-toggle="tooltip"
                                                title="Editar" @click="editClient(item)">
                                                <i class="fa fa-edit text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-danger p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Excluir" @click="deleteClient(item)">
                                                <i class="fa fa-trash text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-info p-0" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Detalhes"
                                                @click="showClientDetails(item)">
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

            newClientsData: [],
            currentPage: 1,
            totalPages: 10,
            itemsPerPage: 5,
            deductionsAndBenefits: [
                { name: 'INSS', type: 'Tax', percentage: '11%', fixedValue: 0, description: 'Contribuição Previdenciária' },
                { name: 'IRRF', type: 'Tax', percentage: '15%', fixedValue: 0, description: 'Imposto de Renda Retido na Fonte' },
                { name: 'FGTS', type: 'Tax', percentage: '8%', fixedValue: 0, description: 'Fundo de Garantia por Tempo de Serviço' },
                { name: 'Vale Transporte', type: 'Benefit', percentage: '0', fixedValue: 300, description: 'Ajuda de custo para transporte' },
                { name: 'Vale Alimentação', type: 'Benefit', percentage: '0', fixedValue: 500, description: 'Benefício de alimentação' },
                { name: 'Plano de Saúde', type: 'Benefit', percentage: '0', fixedValue: 100, description: 'Plano de Saúde' },
                { name: 'Plano Odontológico', type: 'Benefit', percentage: '0', fixedValue: 100, description: 'Plano Odontológico' },
                { name: 'Seguro de Vida', type: 'Benefit', percentage: '0', fixedValue: 100, description: 'Seguro de Vida' },
                { name: 'Seguro de Vida', type: 'Benefit', percentage: '0', fixedValue: 100, description: 'Seguro de Vida' },
                { name: 'Seguro de Vida', type: 'Benefit', percentage: '0', fixedValue: 100, description: 'Seguro de Vida' },
                { name: 'Seguro de Vida', type: 'Benefit', percentage: '0', fixedValue: 100, description: 'Seguro de Vida' },
                { name: 'Seguro de Vida', type: 'Benefit', percentage: '0', fixedValue: 100, description: 'Seguro de Vida' },
                { name: 'Seguro de Vida', type: 'Benefit', percentage: '0', fixedValue: 100, description: 'Seguro de Vida' },
                { name: 'Seguro de Vida', type: 'Benefit', percentage: '0', fixedValue: 100, description: 'Seguro de Vida' },
                { name: 'Seguro de Vida', type: 'Benefit', percentage: '0', fixedValue: 100, description: 'Seguro de Vida' },
                { name: 'Seguro de Vida', type: 'Benefit', percentage: '0', fixedValue: 100, description: 'Seguro de Vida' },
                { name: 'Seguro de Vida', type: 'Benefit', percentage: '0', fixedValue: 100, description: 'Seguro de Vida' },
                { name: 'Seguro de Vida', type: 'Benefit', percentage: '0', fixedValue: 100, description: 'Seguro de Vida' },
                { name: 'Seguro de Vida', type: 'Benefit', percentage: '0', fixedValue: 100, description: 'Seguro de Vida' },
            ],
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.deductionsAndBenefits.length / this.itemsPerPage);
        },
        paginatedDeductionsAndBenefits() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.deductionsAndBenefits.slice(startIndex, endIndex);
        },
                
               

    },
    methods: {
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
        addData() {
            if (this.newData) {
                this.deductionsAndBenefits.push({ id: this.deductionsAndBenefits.length + 1, name: this.newData, type: '', percentage: '', fixedValue: '', description: '' });
                this.newData = '';
            }
        },
        editClient(client) {
            console.log('Editando cliente:', client);
        },
        deleteClient(client) {
            console.log('Excluindo cliente:', client);
        },
        clearData() {
            this.newData = '';
        },
        showClientDetails(client) {
            // Implemente a lógica para mostrar os detalhes do cliente
            console.log('Mostrando detalhes do cliente:', client);
        },
        editItem(item) {
            console.log('Editando item:', item);
            // Implemente a lógica de edição aqui
        },
        deleteItem(item) {
            console.log('Excluindo item:', item);
            // Implemente a lógica de exclusão aqui
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