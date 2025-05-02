<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <h4>Adicionar Distrito</h4>

            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="text" v-model="newDistrict.name" class="form-control form-control-md"
                    placeholder="Nome do Distrito" required />
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="number" v-model="newDistrict.code" class="form-control form-control-md"
                    placeholder="Código do Distrito" required />
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <select v-model="newDistrict.provinceId" class="form-control form-control-md" required>
                    <option disabled value="">Selecione a Província</option>
                    <option v-for="province in provinces" :key="province.id" :value="province.id">
                        {{ province.name }}
                    </option>
                </select>
            </div>

            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="number" v-model="newDistrict.population" class="form-control form-control-md"
                    placeholder="População" required />
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="number" v-model="newDistrict.area" class="form-control form-control-md"
                    placeholder="Área (km²)" required />
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="text" v-model="newDistrict.capital" class="form-control form-control-md"
                    placeholder="Capital" required />
            </div>
            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="date" v-model="newDistrict.founded" class="form-control form-control-md"
                    placeholder="Data de Fundação" required />
            </div>

            <div class="col-3 mb-3 d-flex align-items-center">
                <input type="file" @change="onFileChange" class="form-control form-control-md" />
            </div>
            <div class="col-12 mb-3">
                <textarea v-model="newDistrict.description" class="form-control form-control-md" placeholder="Descrição"
                    rows="3"></textarea>
            </div>
        </div>
        <div class="col-auto d-flex">
            <button class="btn btn-primary btn-md me-2" @click="addDistrict">Atualizar</button>
            <button class="btn btn-secondary btn-md me-2" @click="goBack">Cancelar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AddDistrict",
    data() {
        return {
            newDistrict: {
                name: '',
                code: '',
                description: '',
                population: '',
                area: '',
                capital: '',
                founded: '',
                image: null,
                provinceId: '',
            },
            provinces: [],
        };
    },
    created() {
        this.fetchProvinces();
    },
    methods: {
        fetchProvinces() {
            axios.get('/api/provinces')
                .then(response => {
                    this.provinces = response.data;
                })
                .catch(error => {
                    console.error('Erro ao buscar províncias:', error);
                });
        },
        onFileChange(event) {
            this.newDistrict.image = event.target.files[0];
        },
        addDistrict() {
            console.log('Distrito adicionado:', this.newDistrict);
        },

        clearForm() {
            this.newDistrict = {
                name: '',
                code: '',
                description: '',
                population: '',
                area: '',
                capital: '',
                founded: '',
                image: null,
                provinceId: '',
            };
        },

        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>