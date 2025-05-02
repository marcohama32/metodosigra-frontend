<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <h4>Informações do Cliente</h4>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="newClient.code" class="form-control form-control-md" placeholder="Código" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="newClient.name" class="form-control form-control-md" placeholder="Nome" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="newClient.address" class="form-control form-control-md" placeholder="Endereço" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="newClient.location" class="form-control form-control-md" placeholder="Localização" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="newClient.meterNumber" class="form-control form-control-md" placeholder="Número do Medidor" />
            </div>

            <h4>Documentos</h4>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="file" @change="onFileChange" class="form-control form-control-md" placeholder="Imagem do Medidor" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="file" @change="onFileChange" class="form-control form-control-md" placeholder="Documento" />
            </div>

            <h4>Leitura e Status</h4>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="number" v-model="newClient.initialReading" class="form-control form-control-md" placeholder="Leitura Inicial" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <select v-model="newClient.category" class="form-control form-control-md">
                    <option disabled value="">Selecione a Categoria</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <select v-model="newClient.meterStatus" class="form-control form-control-md">
                    <option disabled value="">Selecione o Status do Medidor</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <select v-model="newClient.status" class="form-control form-control-md">
                    <option disabled value="">Selecione o Status do Cliente</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="number" v-model="newClient.availableCredit" class="form-control form-control-md" placeholder="Crédito Disponível" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="date" v-model="newClient.contractDate" class="form-control form-control-md" />
            </div>

            <h4>Contatos</h4>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="newClient.contact1" class="form-control form-control-md" placeholder="Contato 1" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="newClient.contact2" class="form-control form-control-md" placeholder="Contato 2" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="email" v-model="newClient.email" class="form-control form-control-md" placeholder="Email (opcional)" />
            </div>

            <h4>Informações Adicionais</h4>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="newClient.docNumber" class="form-control form-control-md" placeholder="Número do Documento" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="newClient.nuit" class="form-control form-control-md" placeholder="NUIT" />
            </div>
            <div class="col-auto mb-3 d-flex align-items-center">
                <select v-model="newClient.district" class="form-control form-control-md" @change="fetchNeighborhoods(newClient.district)">
                    <option value="">Selecione o Distrito</option>
                    <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.name }}</option>
                </select>
            </div>
        </div>
        <div class="col-auto d-flex">
            <button class="btn btn-success btn-md me-2" @click="addClient">Salvar Cliente</button>
            <router-link to="/clientes">
                <button class="btn btn-secondary btn-md me-2">Cancelar</button>
            </router-link>
            <button class="btn btn-light btn-md" @click="clearForm">Limpar</button>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AddUser",
    data() {
        return {
            newClient: {
                code: '',
                name: '',
                address: '',
                meterNumber: '',
                meterImage: null,
                initialReading: null,
                category: '',
                contact1: '',
                contact2: '',
                docNumber: '',
                document: null,
                nuit: '',
                district: '',
                neighborhood: '',
                meterStatus: '',
                availableCredit: null,
                status: '',
                contractDate: '',
                email: '',
            },
            categories: [],
            districts: [],
            neighborhoods: [],
        };
    },
    created() {
        this.fetchCategories();
        this.fetchDistricts();
    },
    methods: {
        async fetchCategories() {
            try {
                const response = await axios.get('/api/categories'); // Substitua pela sua URL da API
                this.categories = response.data; // Supondo que a resposta seja um array de categorias
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        },
        async fetchDistricts() {
            try {
                const response = await axios.get('/api/districts'); // Substitua pela sua URL da API
                this.districts = response.data; // Supondo que a resposta seja um array de distritos
            } catch (error) {
                console.error('Erro ao buscar distritos:', error);
            }
        },
        async fetchNeighborhoods(district) {
            try {
                const response = await axios.get(`/api/neighborhoods?district=${district}`); // Substitua pela sua URL da API
                this.neighborhoods = response.data; // Supondo que a resposta seja um array de bairros
            } catch (error) {
                console.error('Erro ao buscar bairros:', error);
            }
        },
        addClient() {
            // Lógica para adicionar o cliente
            console.log('Cliente adicionado:', this.newClient);
            this.newClient = {}; // Limpa o formulário após adicionar
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (event.target.placeholder === "Imagem do Medidor") {
                this.newClient.meterImage = file;
            } else {
                this.newClient.document = file;
            }
        },
        
        clearForm() {
            this.newClient = { // Redefine o formulário para os valores iniciais
                code: '',
                name: '',
                address: '',
                meterNumber: '',
                meterImage: null,
                initialReading: null,
                category: '',
                contact1: '',
                contact2: '',
                docNumber: '',
                document: null,
                nuit: '',
                district: '',
                neighborhood: '',
                meterStatus: '',
                availableCredit: null,
                status: '',
                contractDate: '',
                email: '',
            };
        },
    },
};
</script>