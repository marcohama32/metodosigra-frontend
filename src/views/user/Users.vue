<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <!-- Contêiner flexível para alinhar os elementos -->
            <div class="col-auto mb-3 d-flex align-items-center">
                <!-- Campo de pesquisa com um tamanho maior e responsivo -->
                <input type="text" v-model="searchUser" class="form-control form-control-md"
                    placeholder="Pesquise por usuários" style="width: 350px;" data-bs-toggle="tooltip"
                    title="Pesquisar" @keyup.enter="fetchUsers" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="newData" class="form-control form-control-md" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="newData" class="form-control form-control-md" />
            </div>
            <div class="col-auto d-flex">
                <button 
                    class="btn btn-success btn-md" 
                    @click.prevent="fetchUsers"
                    :disabled="loading"
                >
                    <i 
                        :class="{'fa fa-search': !loading, 'fa fa-spinner fa-spin': loading}" 
                        aria-hidden="true"
                    ></i>
                    {{ loading ? 'Buscando...' : 'Buscar' }}
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
                    <button class="btn btn-success btn-md" @click="showAddUserModal">Adicionar</button>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Usuários</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <div v-if="loading" class="text-center p-4">
                                Carregando...
                            </div>
                            <table v-else class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Nome</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Usuário</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Email</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Contato</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="paginatedUsers.length === 0">
                                        <td colspan="5" class="text-center">Nenhum usuário encontrado</td>
                                    </tr>
                                    <tr v-else v-for="user in paginatedUsers" :key="user._id">
                                        <td>{{ user.name }}</td>
                                        <td>{{ user.username }}</td>
                                        <td>{{ user.email }}</td>
                                        <td>{{ user.contact }}</td>
                                        <td class="align-middle text-center">
                                            <button class="btn btn-secondary p-0 me-1"
                                                style="width: 30px; height: 30px;" data-bs-toggle="tooltip"
                                                title="Editar" @click="editUser(user)">
                                                <i class="fa fa-edit text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-danger p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Excluir" @click="deleteUser(user)">
                                                <i class="fa fa-trash text-xs" aria-hidden="true"></i>
                                            </button>
                                            <!-- <button class="btn btn-info p-0" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Detalhes"
                                                @click="showClientDetails(user)">
                                                <i class="fa fa-info text-xs" aria-hidden="true"></i>
                                            </button> -->
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="p-3">
                                <small>Debug: {{ paginatedUsers.length }} usuários encontrados</small>
                            </div>
                        </div>
                        <Pagination :current-page="currentPage" :total-pages="totalPages" @prev-page="prevPage"
                            @next-page="nextPage" />

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Edição -->
    <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editUserModalLabel">Editar Usuário</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="updateUser">
                        <div class="mb-3">
                            <label for="editName" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="editName" v-model="editingUser.name" required>
                        </div>
                        <div class="mb-3">
                            <label for="editUsername" class="form-label">Usuário</label>
                            <input type="text" class="form-control" id="editUsername" v-model="editingUser.username" required>
                        </div>
                        <div class="mb-3">
                            <label for="editEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="editEmail" v-model="editingUser.email" required>
                        </div>
                        <div class="mb-3">
                            <label for="editContact" class="form-label">Contato</label>
                            <input type="text" class="form-control" id="editContact" v-model="editingUser.contact" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary" :disabled="updating">
                                <span v-if="updating">Salvando...</span>
                                <span v-else>Salvar</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteUserModalLabel">Confirmar Exclusão</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Tem certeza que deseja excluir o usuário <strong>{{ editingUser.name }}</strong>?</p>
                    <p class="text-danger">Esta ação não pode ser desfeita.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" @click="confirmDelete" :disabled="updating">
                        <span v-if="updating">Excluindo...</span>
                        <span v-else>Excluir</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Adição de Usuário -->
    <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addUserModalLabel">Adicionar Novo Usuário</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="validateAndCreateUser" novalidate>
                        <div v-if="formErrors.general" class="alert alert-danger mb-3">
                            {{ formErrors.general }}
                        </div>
                        <div class="mb-3">
                            <label for="addName" class="form-label">Nome</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                :class="{'is-invalid': formErrors.name}"
                                id="addName" 
                                v-model="newUser.name"
                                @blur="validateField('name', newUser.name)"
                                required
                            >
                            <div class="invalid-feedback" v-if="formErrors.name">
                                {{ formErrors.name }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="addUsername" class="form-label">Usuário</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                :class="{'is-invalid': formErrors.username}"
                                id="addUsername" 
                                v-model="newUser.username"
                                @blur="validateField('username', newUser.username)"
                                required
                            >
                            <div class="invalid-feedback" v-if="formErrors.username">
                                {{ formErrors.username }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="addEmail" class="form-label">Email</label>
                            <input 
                                type="email" 
                                class="form-control" 
                                :class="{'is-invalid': formErrors.email}"
                                id="addEmail" 
                                v-model="newUser.email"
                                @blur="validateField('email', newUser.email)"
                                required
                            >
                            <div class="invalid-feedback" v-if="formErrors.email">
                                {{ formErrors.email }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="addContact" class="form-label">Contato</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                :class="{'is-invalid': formErrors.contact}"
                                id="addContact" 
                                v-model="newUser.contact"
                                @blur="validateField('contact', newUser.contact)"
                                required
                            >
                            <div class="invalid-feedback" v-if="formErrors.contact">
                                {{ formErrors.contact }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="addPassword" class="form-label">Senha</label>
                            <input 
                                type="password" 
                                class="form-control" 
                                :class="{'is-invalid': formErrors.password}"
                                id="addPassword" 
                                v-model="newUser.password"
                                @blur="validateField('password', newUser.password)"
                                required
                            >
                            <div class="invalid-feedback" v-if="formErrors.password">
                                {{ formErrors.password }}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button 
                                type="submit" 
                                class="btn btn-success" 
                                :disabled="updating || !validateForm()"
                            >
                                <span v-if="updating">Salvando...</span>
                                <span v-else>Criar Usuário</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import axios from "axios";
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';
import api from '@/services/api/axios';

// Configuração global do axios para debug
axios.interceptors.request.use(request => {
    // console.log('Requisição sendo enviada:', request);
    return request;
});

axios.interceptors.response.use(
    response => {
        // console.log('Resposta recebida:', response);
        return response;
    },
    error => {
        console.error('Erro na requisição:', error);
        return Promise.reject(error);
    }
);

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
            usersData: [],
            currentPage: 1,
            itemsPerPage: 10,
            totalPages: 1,
            totalUsers: 0,
            loading: false,
            editingUser: {
                _id: '',
                name: '',
                username: '',
                email: '',
                contact: ''
            },
            editModal: null,
            updating: false,
            deleteModal: null,
            userToDelete: null,
            addModal: null,
            newUser: {
                name: '',
                username: '',
                email: '',
                contact: '',
                password: '',
                role: 'admin'
            },
            formErrors: {},
            validationRules: {
                name: {
                    required: true,
                    minLength: 3,
                    message: 'O nome deve ter pelo menos 3 caracteres'
                },
                username: {
                    required: true,
                    minLength: 3,
                    message: 'O usuário deve ter pelo menos 3 caracteres'
                },
                email: {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Digite um email válido'
                },
                contact: {
                    required: true,
                    pattern: /^[0-9]{9}$/,
                    message: 'Digite um número de telefone válido (9 dígitos)'
                },
                password: {
                    required: true,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    message: 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número'
                }
            }
        };
    },
    computed: {
        paginatedUsers() {
            // console.log('Computed paginatedUsers:', this.usersData); // Debug
            return Array.isArray(this.usersData) ? this.usersData : [];
        }
    },
    watch: {
        currentPage() {
            this.fetchUsers();
        }
    },
    methods: {
        async fetchUsers() {
            // console.log('Iniciando busca...'); // Debug
            // console.log('Termo de busca:', this.searchUser); // Debug
            this.loading = true;
            try {
                const response = await api.get("/users/all", {
                    params: {
                        page: this.currentPage,
                        pageSize: this.itemsPerPage,
                        search: this.searchUser
                    }
                });
                
                if (response.success) {
                    this.usersData = response.users;
                    this.totalPages = response.totalPages;
                    this.totalUsers = response.total;
                    // console.log('Dados atualizados:', this.usersData);
                }
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                
                // Mostra a mensagem de erro específica da API
                const errorMessage = error.response?.data?.message || 'Erro ao buscar usuários';
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: errorMessage
                });
            } finally {
                this.loading = false;
            }
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
        clearData() {
            this.searchUser = '';
            this.currentPage = 1;
            this.fetchUsers();
        },
        editUser(user) {
            this.editingUser = { ...user }; // Copia os dados do usuário para o form
            this.editModal.show();
        },
        deleteUser(user) {
            this.userToDelete = user;
            this.editingUser = { ...user }; // Para mostrar o nome no modal
            this.deleteModal.show();
        },
        addData() {
            if (this.newData) {
                this.usersData.push({ id: this.usersData.length + 1, name: this.newData });
                this.newData = '';
            }
        },
        showClientDetails(user) {
            //  console.log('Mostrando detalhes do usuário:', user);
        },
        async updateUser() {
            this.updating = true;
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                const response = await api.put(
                    `/user/update/${this.editingUser._id}`,
                    this.editingUser,
                    config
                );

                if (response.success) {
                    const index = this.usersData.findIndex(u => u._id === this.editingUser._id);
                    if (index !== -1) {
                        this.usersData[index] = { ...this.editingUser };
                    }
                    
                    this.editModal.hide();
                    await this.fetchUsers();
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: 'Usuário atualizado com sucesso!'
                    });
                }
            } catch (error) {
                console.error('Erro ao atualizar usuário:', error);
                
                // Captura a mensagem de erro específica da API
                const errorMessage = error.response?.data?.message || 'Erro ao atualizar usuário';
                
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: errorMessage,
                    html: this.formatValidationErrors(error.response?.data?.errors)
                });
            } finally {
                this.updating = false;
            }
        },
        async confirmDelete() {
            if (!this.userToDelete) return;
            
            this.updating = true;
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                const response = await api.delete(
                    `/user/delete/${this.userToDelete._id}`,
                    config
                );

                if (response.success) {
                    this.deleteModal.hide();
                    await this.fetchUsers();
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: 'Usuário excluído com sucesso!'
                    });
                }
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
                
                // Captura a mensagem de erro específica da API
                const errorMessage = error.response?.data?.message || 'Erro ao excluir usuário';
                
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: errorMessage
                });
            } finally {
                this.updating = false;
                this.userToDelete = null;
            }
        },
        showAddUserModal() {
            this.resetForm();
            this.addModal.show();
        },
        validateField(field, value) {
            const rules = this.validationRules[field];
            if (!rules) return true;

            if (rules.required && !value) {
                this.formErrors[field] = rules.message;
                return false;
            }

            if (rules.minLength && value.length < rules.minLength) {
                this.formErrors[field] = rules.message;
                return false;
            }

            if (rules.pattern && !rules.pattern.test(value)) {
                this.formErrors[field] = rules.message;
                return false;
            }

            delete this.formErrors[field];
            return true;
        },
        validateForm() {
            let isValid = true;
            Object.keys(this.newUser).forEach(field => {
                if (!this.validateField(field, this.newUser[field])) {
                    isValid = false;
                }
            });
            return isValid;
        },
        async validateAndCreateUser() {
            this.formErrors = {};
            
            if (!this.validateForm()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro de Validação',
                    html: Object.values(this.formErrors).join('<br>')
                });
                return;
            }

            await this.createUser();
        },
        async createUser() {
            this.updating = true;
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'token': `${token}`
                    }
                };

                const response = await api.post(
                    '/user/add',
                    this.newUser,
                    config
                );

                if (response.success) {
                    this.addModal.hide();
                    await this.fetchUsers();
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: 'Usuário criado com sucesso!'
                    });

                    this.resetForm();
                }
            } catch (error) {
                console.error('Erro ao criar usuário:', error);
                
                // Se o status for 400, mostra o erro
                if (error.response?.status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: error.response.data.error || 'Erro ao criar usuário'
                    });
                }
            } finally {
                this.updating = false;
            }
        },
        handleApiValidationErrors(errorData) {
            // Limpa erros anteriores
            this.formErrors = {};
            
            // Verifica se temos um erro direto
            if (errorData.error) {
                const errorMessage = errorData.error;
                if (errorMessage.toLowerCase().includes('email')) {
                    this.formErrors.email = errorMessage;
                } else if (errorMessage.toLowerCase().includes('username')) {
                    this.formErrors.username = errorMessage;
                } else {
                    this.formErrors.general = errorMessage;
                }
                return;
            }
            
            // Se temos uma mensagem de erro direta
            if (errorData.message) {
                if (errorData.message.toLowerCase().includes('email')) {
                    this.formErrors.email = errorData.message;
                } else if (errorData.message.toLowerCase().includes('username')) {
                    this.formErrors.username = errorData.message;
                } else {
                    this.formErrors.general = errorData.message;
                }
            }

            // Se temos erros específicos por campo
            if (errorData.errors) {
                Object.entries(errorData.errors).forEach(([field, message]) => {
                    if (this.newUser.hasOwnProperty(field)) {
                        this.formErrors[field] = Array.isArray(message) ? message[0] : message;
                    }
                });
            }
        },
        resetForm() {
            this.newUser = {
                name: '',
                username: '',
                email: '',
                contact: '',
                password: '',
                role: 'admin'
            };
            this.formErrors = {};
        },
        formatValidationErrors(errors) {
            if (!errors) return '';
            
            // Se errors for uma string, retorna diretamente
            if (typeof errors === 'string') return errors;
            
            // Se for um array de erros
            if (Array.isArray(errors)) {
                return errors.join('<br>');
            }
            
            // Se for um objeto com múltiplos erros
            if (typeof errors === 'object') {
                return Object.values(errors)
                    .flat()
                    .join('<br>');
            }
            
            return '';
        }
    },
    mounted() {
        this.fetchUsers();
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // Inicializa o modal
        this.editModal = new bootstrap.Modal(document.getElementById('editUserModal'));

        // Inicializa o modal de exclusão
        this.deleteModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));

        // Inicializa o modal de adição
        this.addModal = new bootstrap.Modal(document.getElementById('addUserModal'));
    },
};
</script>

<style>
/* Backdrop do modal */
.modal-backdrop {
    z-index: 99998 !important;
    opacity: 0.5 !important;
    background-color: #000 !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
}

/* Container do modal */
.modal {
    z-index: 99999 !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    outline: 0 !important;
}

/* Conteúdo do modal */
.modal-content {
    position: relative !important;
    z-index: 100000 !important;
    background: white !important;
    border: none !important;
    border-radius: 8px !important;
    box-shadow: 0 0 20px rgba(0,0,0,0.2) !important;
}

/* Dialog do modal */
.modal-dialog {
    position: relative !important;
    margin: 1.75rem auto !important;
    max-width: 500px !important;
    pointer-events: all !important;
}

/* Quando o modal está visível */
.modal.show {
    display: block !important;
    background-color: rgba(0, 0, 0, 0.5) !important;
}

/* Garante que o modal fique por cima de absolutamente tudo */
#editUserModal {
    isolation: isolate !important;
}

/* Adiciona o mesmo isolamento para o modal de adição */
#addUserModal {
    isolation: isolate !important;
}

/* Estilos para validação de formulário */
.is-invalid {
    border-color: #dc3545;
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.invalid-feedback {
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: #dc3545;
}

/* Adicione estes estilos para o SweetAlert2 */
.swal2-container {
    z-index: 100001 !important; /* Maior que o z-index do modal */
}

/* Opcional: ajuste a aparência do SweetAlert2 para combinar com seu design */
.swal2-popup {
    border-radius: 8px !important;
    font-size: 14px !important;
}
</style>