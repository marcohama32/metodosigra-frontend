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
                    <router-link to="/add-category">
                        <button class="btn btn-success btn-md">Adicionar</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Tabela de Categorias</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Categoria</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Taxa de Cobrança</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Descrição</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                                            Ações</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="category in paginatedCategories" :key="category.id">
                                        <td style="padding: 20px;">
                                            <h6 class="mb-0 text-sm">{{ category.name }}</h6>
                                        </td>
                                        <td>
                                            <span class="text-xs font-weight-bold">{{ category.fee }}</span>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ category.description }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <button class="btn btn-secondary p-0 me-1"
                                                style="width: 30px; height: 30px;" data-bs-toggle="tooltip"
                                                title="Editar" @click="editCategory(category)">
                                                <i class="fa fa-edit text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-danger p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Excluir" @click="deleteCategory(category)">
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
                        <!-- Componente de Paginação -->
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
import Pagination from '@/components/Pagination.vue'; // Ajuste o caminho conforme necessário

export default {
    name: "CategoriesPage",
    components: {
        Pagination,
    },
    data() {
        return {
            newData: '',
            categoriesData: [
                { id: 1, name: 'Categoria 1', fee: '10%', description: 'Descrição da Categoria 1', status: 'ativa' },
                { id: 2, name: 'Categoria 2', fee: '15%', description: 'Descrição da Categoria 2', status: 'inativa' },
                { id: 3, name: 'Categoria 3', fee: '20%', description: 'Descrição da Categoria 3', status: 'ativa' },
                { id: 4, name: 'Categoria 4', fee: '25%', description: 'Descrição da Categoria 4', status: 'inativa' },
                { id: 5, name: 'Categoria 5', fee: '30%', description: 'Descrição da Categoria 5', status: 'ativa' },
                { id: 6, name: 'Categoria 6', fee: '35%', description: 'Descrição da Categoria 6', status: 'inativa' },
                { id: 7, name: 'Categoria 7', fee: '40%', description: 'Descrição da Categoria 7', status: 'ativa' },
                { id: 8, name: 'Categoria 8', fee: '45%', description: 'Descrição da Categoria 8', status: 'inativa' },
                { id: 9, name: 'Categoria 9', fee: '50%', description: 'Descrição da Categoria 9', status: 'ativa' },
                { id: 10, name: 'Categoria 10', fee: '55%', description: 'Descrição da Categoria 10', status: 'inativa' },
                { id: 11, name: 'Categoria 11', fee: '60%', description: 'Descrição da Categoria 11', status: 'ativa' },
                { id: 12, name: 'Categoria 12', fee: '65%', description: 'Descrição da Categoria 12', status: 'inativa' },
                { id: 13, name: 'Categoria 13', fee: '70%', description: 'Descrição da Categoria 13', status: 'ativa' },
                { id: 14, name: 'Categoria 14', fee: '75%', description: 'Descrição da Categoria 14', status: 'inativa' },
                { id: 15, name: 'Categoria 15', fee: '80%', description: 'Descrição da Categoria 15', status: 'ativa' },
                { id: 16, name: 'Categoria 16', fee: '85%', description: 'Descrição da Categoria 16', status: 'inativa' },
                
                // Adicione mais categorias conforme necessário
            ],
            currentPage: 1,
            itemsPerPage: 5, // Número de itens por página
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.categoriesData.length / this.itemsPerPage);
        },
        paginatedCategories() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.categoriesData.slice(start, start + this.itemsPerPage);
        },
    },
    methods: {
        addData() {
            if (this.newData) {
                this.categoriesData.push({ id: this.categoriesData.length + 1, name: this.newData, fee: 'Nova taxa', description: 'Nova descrição', status: 'ativa' });
                this.newData = '';
            }
        },
        editCategory(category) {
            console.log('Editando categoria:', category);
        },
        deleteCategory(category) {
            console.log('Excluindo categoria:', category);
        },
        clearData() {
            this.newData = '';
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
    mounted() {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    },
};
</script>