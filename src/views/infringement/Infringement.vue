<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <!-- Formulário de pesquisa -->
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="searchData.descricao" class="form-control form-control-md"
                    placeholder="Pesquisar Descrição da Infração" style="width: 350px;" data-bs-toggle="tooltip"
                    title="Pesquisar" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="text" v-model="searchData.local" class="form-control form-control-md"
                    placeholder="Pesquisar Local da Infração" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="searchData.data" class="form-control form-control-md"
                    placeholder="Pesquisar Data" />
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
                    <router-link to="/adicionar/infracao">
                        <button class="btn btn-success btn-md">Adicionar</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Infrações</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0" style="overflow-x: auto;">
                            <table class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Descrição</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Valor</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="infracao in infracoesData" :key="infracao.id">
                                        <td>
                                            <h6 class="mb-0 text-sm">{{ infracao.descricao }}</h6>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ infracao.valor }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <button class="btn btn-secondary p-0 me-1"
                                                style="width: 30px; height: 30px;" data-bs-toggle="tooltip"
                                                title="Editar" @click="editProject(infracao)">
                                                <i class="fa fa-edit text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-danger p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Excluir"
                                                @click="deleteProject(infracao)">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "InfractionsPage",
    data() {
        return {
            searchData: {
                descricao: '',
                local: '',
                data: ''
            },
            infracoesData: [
                { id: 1, descricao: 'Roubo de água', valor: '7,500.00' },
                { id: 2, descricao: 'Vandalização do sistema', valor: '10,000.00' },
                { id: 3, descricao: 'Corte Por Dívida', valor: '5,000.00' },
                { id: 4, descricao: 'A pedido do Cliente', valor: '0' },
                { id: 5, descricao: 'Contador não encontrado', valor: '0' },
                { id: 6, descricao: 'Contador não Visível', valor: '0' },
            ],
        };
    },
    methods: {
        searchData() {
            // Implementar lógica de pesquisa aqui
            console.log('Pesquisando dados com:', this.searchData);
        },
        editProject(infracao) {
            console.log('Editando infração:', infracao);
        },
        deleteProject(infracao) {
            console.log('Excluindo infração:', infracao);
        },
        clearData() {
            this.searchData.descricao = '';
            this.searchData.local = '';
            this.searchData.data = '';

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