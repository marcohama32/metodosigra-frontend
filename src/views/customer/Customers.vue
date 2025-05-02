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
                    <router-link to="/adicionar/cliente">
                        <button class="btn btn-success btn-md">Adicionar</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Clientes</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Nome</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Data de Registro</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Endereço</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Distrito</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Bairro</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Contato 1</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Número do Medidor</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Crédito Disponível</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="client in paginatedClients" :key="client.id">
                                        <td style="padding: 20px;">
                                            <h6 class="mb-0 text-sm">{{ client.name }}</h6>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ client.contractDate }}</p>
                                        </td>
                                        <td>
                                            <p class="text-sm mb-0">{{ client.address }}</p>
                                        </td>
                                        <td>
                                            <p class="text-sm mb-0">{{ client.district }}</p>
                                        </td>
                                        <td>
                                            <p class="text-sm mb-0">{{ client.neighborhood }}</p>
                                        </td>
                                        <td>
                                            <p class="text-sm mb-0">{{ client.contact1 }}</p>
                                        </td>
                                        <td>
                                            <p class="text-sm mb-0">{{ client.meterNumber }}</p>
                                        </td>
                                        <td>
                                            <p class="text-sm mb-0">{{ client.availableCredit }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <button class="btn btn-secondary p-0 me-1"
                                                style="width: 30px; height: 30px;" data-bs-toggle="tooltip"
                                                title="Editar" @click="editClient(client)">
                                                <i class="fa fa-edit text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-danger p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Excluir" @click="deleteClient(client)">
                                                <i class="fa fa-trash text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-info p-0" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Detalhes"
                                                @click="showClientDetails(client)">
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
    components: {
        Pagination
    },
    data() {
        return {
            newData: '',
            clientsData: [
                { id: 1, name: 'João Silva', email: 'joao@example.com', status: 'Ativo', contractDate: '2023-01-15' },
                { id: 2, name: 'Maria Oliveira', email: 'maria@example.com', status: 'Inativo', contractDate: '2022-12-10' },
                { id: 3, name: 'Carlos Pereira', email: 'carlos@example.com', status: 'Ativo', contractDate: '2023-02-20' },
                { id: 4, name: 'Ana Costa', email: 'ana@example.com', status: 'Ativo', contractDate: '2023-03-15' },
                { id: 5, name: 'Pedro Santos', email: 'pedro@example.com', status: 'Inativo', contractDate: '2022-11-25' },
                { id: 6, name: 'Lucas Oliveira', email: 'lucas@example.com', status: 'Ativo', contractDate: '2023-04-10' },
                { id: 7, name: 'Mariana Ferreira', email: 'mariana@example.com', status: 'Inativo', contractDate: '2022-09-15' },
                { id: 8, name: 'Rafael Gomes', email: 'rafael@example.com', status: 'Ativo', contractDate: '2023-05-25' },
                { id: 9, name: 'Camila Lima', email: 'camila@example.com', status: 'Inativo', contractDate: '2022-08-12' },
                { id: 10, name: 'Bruno Alves', email: 'bruno@example.com', status: 'Ativo', contractDate: '2023-06-18' },
                { id: 11, name: 'Laura Rodrigues', email: 'laura@example.com', status: 'Ativo', contractDate: '2023-07-22' },
                { id: 12, name: 'Gustavo Martins', email: 'gustavo@example.com', status: 'Inativo', contractDate: '2022-07-14' },
                { id: 13, name: 'Isabela Carvalho', email: 'isabela@example.com', status: 'Ativo', contractDate: '2023-08-30' },
                { id: 14, name: 'Matheus Oliveira', email: 'matheus@example.com', status: 'Inativo', contractDate: '2022-06-20' },
                { id: 15, name: 'Julia Santos', email: 'julia@example.com', status: 'Ativo', contractDate: '2023-09-12' },



                // ... adicione mais clientes conforme necessário

            ],
            newClientsData: [],
            currentPage: 1,
            totalPages: 10,
            itemsPerPage: 5,
        };
    },
    computed: {
        paginatedClients() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.clientsData.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.clientsData.length / this.itemsPerPage);
        },
     
    },
    methods: {
        prevPage() {
            this.currentPage--;
        },
        nextPage() {
            this.currentPage++;
        },
        addData() {
            if (this.newData) {
                this.clientsData.push({ id: this.clientsData.length + 1, name: this.newData, email: '', status: 'Ativo', contractDate: new Date().toISOString().split('T')[0] });
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
    },
    mounted() {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    },
};
</script>