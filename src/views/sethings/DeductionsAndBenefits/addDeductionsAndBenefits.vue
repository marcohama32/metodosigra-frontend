src/views/user/AddUser.vue
<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <h4>Cadastrar Imposto ou Benefício</h4>
            <div class="col-auto mb-3 d-flex flex-column align-items-start">
                <label for="type">Tipo</label>
                <select v-model="newItem.type" class="form-control form-control-md" id="type">
                    <option disabled value="">Selecione o Tipo</option>
                    <option value="Imposto">Imposto</option>
                    <option value="Beneficio">Benefício</option>
                </select>
            </div>
            <div class="col-auto mb-3 d-flex flex-column align-items-start">
                <label for="name">Nome</label>
                <input type="text" v-model="newItem.name" class="form-control form-control-md" placeholder="Nome"
                    id="name" />
                <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
            </div>

            <div class="col-auto mb-3 d-flex flex-column align-items-start" v-if="newItem.type === 'Beneficio'">
                <label for="percentage">Percentual</label>
                <input type="number" v-model="newItem.percentage" class="form-control form-control-md"
                    placeholder="Percentual" id="percentage" />
                <span v-if="errors.percentage" class="text-danger">{{ errors.percentage }}</span>
            </div>
            <div class="col-auto mb-3 d-flex flex-column align-items-start" v-if="newItem.type === 'Imposto'">
                <label for="fixedValue">Valor Fixo</label>
                <input type="number" v-model="newItem.fixedValue" class="form-control form-control-md"
                    placeholder="Valor Fixo" id="fixedValue" />
            </div>
            <div class="row">
                <div class="col-6 mb-3 d-flex flex-column align-items-start">
                    <label for="description">Descrição</label>
                    <textarea v-model="newItem.description" class="form-control form-control-md" placeholder="Descrição"
                        id="description" rows="3"></textarea>
                </div>
            </div>
        </div>
        <div class="col-auto d-flex">
            <button class="btn btn-success btn-md me-2" @click="addItem">Salvar</button>
            <router-link to="/impoistobeneficios">
                <button class="btn btn-secondary btn-md me-2">Cancelar</button>
            </router-link>
            <button class="btn btn-light btn-md" @click="clearForm">Limpar</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddItem",
    data() {
        return {
            newItem: {
                name: '',
                type: '',
                percentage: 0,
                fixedValue: 0,
                description: '',
            },
            errors: {},
        };
    },
    methods: {
        addItem() {
            this.errors = {};
            if (!this.newItem.name) {
                this.errors.name = 'O nome é obrigatório.';
            }
            if (this.newItem.type === 'Beneficio' && (this.newItem.percentage < 0 || this.newItem.percentage > 100)) {
                this.errors.percentage = 'O percentual deve estar entre 0 e 100.';
            }
            if (Object.keys(this.errors).length === 0) {
                console.log('Item adicionado:', this.newItem);
                this.clearForm();
            }
        },
        clearForm() {
            this.newItem = {
                name: '',
                type: '',
                percentage: 0,
                fixedValue: 0,
                description: '',
            };
            this.errors = {};
        },
    },
};
</script>

<style scoped>
/* Estilos podem ser adicionados aqui conforme necessário */
</style>