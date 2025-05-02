<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <!-- Instructions for CSV upload -->
            <div class="col-12 mb-3">
                <p>Por favor, faça upload de um arquivo CSV com os seguintes campos: Date, Oil, Water, Gas, BHP.</p>
            </div>
            <!-- File upload input -->
            <div class="col-auto mb-3 d-flex">
                <input type="file" @change="handleFileUpload" class="form-control form-control-md" accept=".csv" />
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-success btn-md" @click="addData">
                    <i class="fa fa-upload" aria-hidden="true"></i> Adicionar Dados
                </button>
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-secondary btn-md" @click="clearData" data-bs-toggle="tooltip" title="Limpar">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </button>
            </div>
            <div class="col ms-auto d-flex justify-content-end align-items-end">
                <router-link to="/analise-declinio" class="me-2">
                    <button class="btn btn-secondary btn-md">Análise de Declínio</button>
                </router-link>
                <router-link to="/analise-declinio-data">
                    <button class="btn btn-success btn-md">Dados</button>
                </router-link>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Pré-visualização dos Dados</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Date</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Oil (scm/d)</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Water (scm/d)</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Gas (scm/d)</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            BHP (Bar)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="data in paginatedData" :key="data.date" class="table-row">
                                        <td style="padding-left: 30px;">{{ data.date }}</td>
                                        <td>{{ data.oil }}</td>
                                        <td>{{ data.water }}</td>
                                        <td>{{ data.gas }}</td>
                                        <td>{{ data.bhp }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-if="filteredData.length > 0" class="text-end me-4 p-3 border rounded bg-light shadow">
                            <h5 class="text-primary">Dados Carregados</h5>
                            <p class="text-color-primary">Total Entries: <strong>{{ filteredData.length }}</strong></p>
                            <p class="text-color-primary">Average Oil: <strong>{{ averageOil }}</strong></p>
                            <p class="text-color-primary">Average Water: <strong>{{ averageWater }}</strong></p>
                            <p class="text-color-primary">Average Gas: <strong>{{ averageGas }}</strong></p>
                            <p class="text-color-primary">Average BHP: <strong>{{ averageBHP }}</strong></p>
                        </div>
                        <Pagination :current-page="currentPage" :total-pages="totalPages" @prev-page="prevPage"
                            @next-page="nextPage" />

                    </div>
                </div>

            </div>

        </div>

        <div v-if="loading">Loading...</div>

    </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import axios from 'axios';
import { notify } from "@kyvg/vue3-notification";

import api from '@/services/api';

export default {
    components: {
        Pagination
    },
    name: "TablesPage",
    data() {
        return {
            newData: '',
            previewData: [], // New data property for preview
            errors: [], // New data property for validation errors

            sortKey: 'date', // Default sort key
            sortOrder: 'asc', // Default sort order
            currentPage: 1,
            itemsPerPage: 10, // Set the number of items per page
            
            loading: false,
            filteredData: [], // Inicialize filteredData como um array vazio
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.previewData.length / this.itemsPerPage);
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.previewData.slice(start, start + this.itemsPerPage);
        },
        sortedData() {
            return this.previewData.sort((a, b) => {
                const modifier = this.sortOrder === 'asc' ? 1 : -1;
                if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
                if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
                return 0;
            });
        },
        averageOil() {
            console.log('Filtered Data for Average Oil:', this.filteredData); // Verifique os dados filtrados
            if (this.filteredData.length === 0) return 0; // Evita divisão por zero
            const total = this.filteredData.reduce((sum, data) => sum + data.oil, 0);
            return (total / this.filteredData.length).toFixed(2);
        },
        averageWater() {
            if (this.filteredData.length === 0) return 0;
            const total = this.filteredData.reduce((sum, data) => sum + data.water, 0);
            return (total / this.filteredData.length).toFixed(2);
        },
        averageGas() {
            if (this.filteredData.length === 0) return 0;
            const total = this.filteredData.reduce((sum, data) => sum + data.gas, 0);
            return (total / this.filteredData.length).toFixed(2);
        },
        averageBHP() {
            if (this.filteredData.length === 0) return 0;
            const total = this.filteredData.reduce((sum, data) => sum + data.bhp, 0);
            return (total / this.filteredData.length).toFixed(2);
        },


    },
    methods: {
        addData() {
            if (this.previewData.length === 0) {
                alert('Nenhum dado carregado para enviar.');
                return;
            }
            this.loading = true;

            // Adiciona o cabeçalho
            const csvHeader = 'Date,Oil,Water,Gas,BHP';
            const csvContent = this.previewData.map(row =>
                [row.date, row.oil, row.water, row.gas, row.bhp].join(',')
            ).join('\n');
            const fullCsv = csvHeader + '\n' + csvContent;
            const blob = new Blob([fullCsv], { type: 'text/csv' });

            // Imprime para debug
            console.log('CSV enviado:\n', fullCsv);

            const formData = new FormData();
            formData.append('csvfile', blob, 'dados.csv');

            // Ler o conteúdo do Blob para o console
            const reader = new FileReader();
            reader.onload = function(e) {
                console.log('Conteúdo do arquivo enviado:\n', e.target.result);
            };
            reader.readAsText(blob);

            // Imprime o conteúdo do FormData (nome do campo e tipo de valor)
            for (let pair of formData.entries()) {
                if (pair[1] instanceof Blob) {
                    console.log(pair[0] + ':', pair[1], 'nome do arquivo:', pair[1].name);
                } else {
                    console.log(pair[0] + ':', pair[1]);
                }
            }

            api.post('/upload/decline-analysis', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': localStorage.getItem('token')
                }
            })
                .then(() => {
                    notify({
                    title: "Sucesso",
                    text: "Dados enviados com sucesso!",
                    type: "success"
                });
                    alert('Dados enviados com sucesso!');
                    this.clearData();
                })
                .catch((error) => {
                    alert('Erro ao enviar dados: ' + (error.response?.data?.detail || error.message));
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        editUser(user) {
            console.log('Editando usuário:', user);
        },
        deleteUser(user) {
            console.log('Excluindo usuário:', user);
        },
        clearData() {
            this.newData = '';
            this.previewData = [];
            this.currentPage = 1; // Reset to the first page
        },
        handleFileUpload(event) {
            this.loading = true;
            const file = event.target.files[0];
            if (file && file.type === 'text/csv') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const text = e.target.result;
                    this.parseCSV(text);
                    console.log('Preview Data:', this.previewData);
                    console.log('Filtered Data:', this.filteredData);
                };
                reader.readAsText(file);
            } else {
                alert('Por favor, selecione um arquivo CSV válido.');
            }
            this.loading = false;
        },
        parseCSV(text) {
            const lines = text.split('\n');
            this.previewData = [];
            this.errors = []; // Reset errors

            lines.forEach((line, index) => {
                const [date, oil, water, gas, bhp] = line.split(',');
                const errorMessages = this.validateData(date, oil, water, gas, bhp);
                if (errorMessages.length > 0) {
                    this.errors.push(`Linha ${index + 1}: ${errorMessages.join(', ')}`);
                } else {
                    this.previewData.push({ date, oil: parseFloat(oil), water: parseFloat(water), gas: parseFloat(gas), bhp: parseFloat(bhp) });
                }
            });

            // Atualize filteredData após o upload
            this.filteredData = [...this.previewData]; // Usando spread operator para garantir reatividade

            if (this.errors.length > 0) {
                alert(this.errors.join('\n'));
            }
        },
        validateData(date, oil, water, gas, bhp) {
            const errors = [];
            if (!date || !this.isValidDate(date)) {
                errors.push('Data inválida');
            }
            if (isNaN(oil) || parseFloat(oil) < 0) {
                errors.push('Valor de Oil inválido');
            }
            if (isNaN(water) || parseFloat(water) < 0) {
                errors.push('Valor de Water inválido');
            }
            if (isNaN(gas) || parseFloat(gas) < 0) {
                errors.push('Valor de Gas inválido');
            }
            if (isNaN(bhp) || parseFloat(bhp) < 0) {
                errors.push('Valor de BHP inválido');
            }
            return errors;
        },
        isValidDate(dateString) {
            const regex = /^\d{2}-[A-Za-z]{3}-\d{2}$/; // Matches format DD-MMM-YY
            return regex.test(dateString);
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
        changeSort(key) {
            this.sortOrder = this.sortKey === key && this.sortOrder === 'asc' ? 'desc' : 'asc';
            this.sortKey = key;
        },
        async submitData() {
            try {
                const response = await axios.post('/api/data', this.previewData);
                alert('Data submitted successfully!');
            } catch (error) {
                console.error('Error submitting data:', error);
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

<style>
/* Adicione isso ao seu arquivo CSS */
.padding-left {
    padding-left: 15px;
    /* Ajuste o valor conforme necessário */
}
</style>