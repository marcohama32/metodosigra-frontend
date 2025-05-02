<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <!-- Campo de pesquisa para departamentos -->
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="searchDepartment" class="form-control form-control-md"
                    placeholder="Pesquise por departamentos" style="width: 350px;" data-bs-toggle="tooltip"
                    title="Pesquisar" />
            </div>
            <!-- <div class="col-auto mb-3 d-flex">
                <input type="text" v-model="newDepartment" class="form-control form-control-md" 
                    placeholder="Novo Departamento" />
            </div> -->
            <div class="col-auto d-flex">
                <button class="btn btn-success btn-md" @click="searchDepartments">
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
                    <router-link to="/adicionar/departamento">
                        <button class="btn btn-success btn-md">Adicionar</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Departamentos</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Nome</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="department in paginatedDepartments" :key="department.id">
                                        <td>{{ department.name }}</td>
                                        <td class="align-middle text-center">
                                            <button class="btn btn-secondary p-0 me-1"
                                                style="width: 30px; height: 30px;" data-bs-toggle="tooltip"
                                                title="Editar" @click="editDepartment(department)">
                                                <i class="fa fa-edit text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-danger p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Excluir" @click="deleteDepartment(department)">
                                                <i class="fa fa-trash text-xs" aria-hidden="true"></i>
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
    name: "DepartmentsPage",
    data() {
        return {
            searchDepartment: '',
            newDepartment: '',
            departmentsData: [
                { id: 1, name: 'Recursos Humanos' },
                { id: 2, name: 'Desenvolvimento' },
                { id: 3, name: 'Marketing' },
                { id: 4, name: 'Vendas' },
                { id: 5, name: 'Financeiro' },
                { id: 6, name: 'Suporte' },
                { id: 7, name: 'Administrativo' },
                { id: 8, name: 'Compras' },
                { id: 9, name: 'RH' },
                { id: 10, name: 'TI' },
                // ... outros departamentos
            ],
            currentPage: 1,
            itemsPerPage: 5,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.departmentsData.length / this.itemsPerPage);
        },
        paginatedDepartments() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.departmentsData.slice(start, start + this.itemsPerPage);
        },
        filteredDepartments() {
            return this.departmentsData.filter(department => {
                const matchesDepartment = this.searchDepartment ? department.name.toLowerCase().includes(this.searchDepartment.toLowerCase()) : true;
                return matchesDepartment;
            });
        },
    },
    methods: {
        addDepartment() {
            if (this.newDepartment) {
                this.departmentsData.push({ id: this.departmentsData.length + 1, name: this.newDepartment });
                this.newDepartment = '';
            }
        },
        editDepartment(department) {
            console.log('Editando departamento:', department);
        },
        deleteDepartment(department) {
            console.log('Excluindo departamento:', department);
        },
        clearData() {
            this.newDepartment = '';
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