<template>
    <div class="py-4 container-fluid">
        <div v-if="alert" :class="`alert alert-${alert.type} alert-dismissible fade show`" role="alert">
            {{ alert.message }}
            <button type="button" class="btn-close" @click="alert = null" aria-label="Close"></button>
        </div>
  
        <div class="row g-2 align-items-end d-flex">
            <!-- Campo Data Inicial -->
            <div class="col-auto mb-3">
                <label class="form-label">Data Inicial</label>
                <input 
                    type="date" 
                    v-model="startDate" 
                    class="form-control form-control-md"
                    :max="endDate || undefined"
                />
            </div>
            <!-- Campo Data Final -->
            <div class="col-auto mb-3">
                <label class="form-label">Data Final</label>
                <input 
                    type="date" 
                    v-model="endDate" 
                    class="form-control form-control-md"
                    :min="startDate || undefined"
                />
            </div>
            <!-- Botão Buscar -->
            <div class="col-auto d-flex align-self-end">
                <button 
                    class="btn btn-success btn-md" 
                    @click="fetchAndRenderCharts"
                    data-bs-toggle="tooltip" 
                    title="Buscar dados"
                >
                    <i class="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <!-- Botão Limpar -->
            <div class="col-auto d-flex align-self-end">
                <button class="btn btn-secondary btn-md" @click="clearData" data-bs-toggle="tooltip" title="Limpar">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </button>
            </div>
            <!-- Botão Dados -->
            <div class="col ms-auto d-flex align-self-end">
                <div class="ms-auto">
                    <router-link to="/analise-declinio-data">
                        <button class="btn btn-success btn-md">Dados</button>
                    </router-link>
                </div>
            </div>
            <!-- Botão Exportar Excel -->
            <div class="col-auto d-flex align-self-end">
                <button 
                    class="btn btn-primary btn-md" 
                    @click="exportToExcel"
                    data-bs-toggle="tooltip" 
                    title="Exportar para Excel"
                >
                    <i class="fa fa-download" aria-hidden="true"></i>
                </button>
            </div>
            <!-- Botão Exportar Gráficos -->
            <div class="col-auto d-flex align-self-end">
                <button class="btn btn-info btn-md" @click="downloadCharts" data-bs-toggle="tooltip" title="Exportar Gráficos">
                    <i class="fa fa-download" aria-hidden="true"></i>
                </button>
            </div>
        </div>
  
        <div class="row mb-3">
            <div class="col-auto">
                <label class="form-label">Intervalo de Amostragem</label>
                <select v-model="sampleInterval" class="form-select" @change="handleIntervalChange">
                    <option value="all">Todos os dados</option>
                    <option value="day">Diário</option>
                    <option value="week">Semanal</option>
                    <option value="month">Mensal</option>
                    <option value="year">Anual</option>
                </select>
            </div>
            <div class="col-auto">
                <label class="form-label">Tipo de Visualização</label>
                <select v-model="chartType" class="form-select" @change="updateChartType">
                    <option value="line">Linha</option>
                    <option value="scatter">Dispersão</option>
                    <option value="bar">Barra</option>
                </select>
            </div>
        </div>
  
        <!-- Gráficos -->
        <div class="chart">
            <div class="pb-0 card-header">
                <!-- <h6>Sales overview</h6>
                <p class="text-sm">
                    <i class="fa fa-arrow-up text-success"></i>
                    <span class="font-weight-bold">4% more</span> in 2021
                </p> -->
  
                <div class="p-3 card-body">
                    <div class="chart">
                        <canvas id="chart-line-1" class="chart-canvas" height="300"></canvas>
                    </div>
                    <div class="chart">
                        <canvas id="chart-line-2" class="chart-canvas" height="300"></canvas>
                    </div>
                    <div class="chart">
                        <canvas id="chart-line-3" class="chart-canvas" height="300"></canvas>
                    </div>
                    <div class="chart">
                        <canvas id="chart-line-4" class="chart-canvas" height="300"></canvas>
                    </div>
                    <div class="chart">
                        <canvas id="chart-line-5" class="chart-canvas" height="300"></canvas>
                    </div>
                </div>
            </div>
        </div>
  
        <!-- Adicione logo após o div container-fluid -->
        <div v-if="isLoading" class="loading-overlay">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Carregando...</span>
            </div>
        </div>
  
        
  
        <!-- Adicione esta seção após os gráficos -->
        <div class="row mt-4">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Estatísticas do Período</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="stat-card">
                                    <h6>Gás (scm/d)</h6>
                                    <p class="h4">{{ formatNumber(mediaGas) }}</p>
                                    <small>Média: {{ formatNumber(mediaGas) }}</small><br>
                                    <small>Máx: {{ formatNumber(maxGas) }}</small><br>
                                    <small>Mín: {{ formatNumber(minGas) }}</small>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="stat-card">
                                    <h6>Óleo (scm/d)</h6>
                                    <p class="h4">{{ formatNumber(mediaOil) }}</p>
                                    <small>Média: {{ formatNumber(mediaOil) }}</small><br>
                                    <small>Máx: {{ formatNumber(maxOil) }}</small><br>
                                    <small>Mín: {{ formatNumber(minOil) }}</small>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="stat-card">
                                    <h6>Água (scm/d)</h6>
                                    <p class="h4">{{ formatNumber(mediaWater) }}</p>
                                    <small>Média: {{ formatNumber(mediaWater) }}</small><br>
                                    <small>Máx: {{ formatNumber(maxWater) }}</small><br>
                                    <small>Mín: {{ formatNumber(minWater) }}</small>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="stat-card">
                                    <h6>BHP (Bar)</h6>
                                    <p class="h4">{{ formatNumber(mediaBhp) }}</p>
                                    <small>Média: {{ formatNumber(mediaBhp) }}</small><br>
                                    <small>Máx: {{ formatNumber(maxBhp) }}</small><br>
                                    <small>Mín: {{ formatNumber(minBhp) }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Chart from "chart.js/auto";
  import api from '@/services/api/axios';
  import Swal from 'sweetalert2';
  import * as ExcelJS from 'exceljs';
  // Importe o adaptador de data
  import 'chartjs-adapter-date-fns';
  import { ptBR } from 'date-fns/locale';
  import JSZip from 'jszip';
  import zoomPlugin from 'chartjs-plugin-zoom';
  Chart.register(zoomPlugin);
  
  
  export default {
    name: "TablesPage",
    data() {
        return {
            searchUser: '',
            startDate: '',
            endDate: '',
            newData: '',
            chartInstances: {}, // Para guardar as instâncias dos gráficos
            alert: null,
            isLoading: false,
            sampleInterval: 'all',
            chartType: 'line',
            averageGas: 0,
            averageOil: 0,
            rawData: [], // Para guardar os dados originais
            processedData: [], // Para guardar os dados após o processamento do intervalo
            mediaGas: 0,
            mediaOil: 0,
            mediaWater: 0,
            mediaBhp: 0,
            maxGas: 0,
            maxOil: 0,
            maxWater: 0,
            maxBhp: 0,
            minGas: 0,
            minOil: 0,
            minWater: 0,
            minBhp: 0,
        };
    },
    mounted() {
        // Recuperar filtros salvos
        const savedFilters = localStorage.getItem('declineAnalysisFilters');
        if (savedFilters) {
            const { startDate, endDate } = JSON.parse(savedFilters);
            this.startDate = startDate;
            this.endDate = endDate;
        }
        this.fetchAndRenderCharts();
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        showAlert(message, type = 'warning') {
            this.alert = {
                message,
                type
            };
            setTimeout(() => {
                this.alert = null;
            }, 5000);
        },
        async fetchAndRenderCharts() {
            try {
                this.isLoading = true;
                // Validação das datas
                if (this.startDate && !this.endDate) {
                    this.endDate = new Date().toISOString().split('T')[0];
                }
  
                const params = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    pageSize: 100 // Aumentar o tamanho da página para pegar todos os registros
                };
  
                // console.log('Buscando dados para:', params);
  
                // Primeira chamada para obter o total de páginas
                const response = await api.get("/get/decline-analyses", {
                    params,
                    headers: { 'token': localStorage.getItem('token') }
                });
  
                let allData = [...response.data.data];
                const totalPages = response.data.pagination.totalPages;
                const totalRecords = response.data.pagination.totalCount;
  
                // Se houver mais páginas, buscar as demais
                if (totalPages > 1) {
                    for (let page = 2; page <= totalPages; page++) {
                        const nextResponse = await api.get("/get/decline-analyses", {
                            params: { ...params, page },
                            headers: { 'token': localStorage.getItem('token') }
                        });
                        allData = [...allData, ...nextResponse.data.data];
                    }
                }
  
                if (!allData || allData.length === 0) {
                    this.showAlert(`Nenhum dado encontrado para o período selecionado`, 'warning');
                    return;
                }
  
                // Mostra mensagem com o total de registros encontrados
                this.showAlert(`Foram encontrados ${totalRecords} registros para o período selecionado`, 'success');
  
                // Ordena por data crescente
                allData.sort((a, b) => new Date(a.date) - new Date(b.date));
  
                // Guarda os dados originais
                this.rawData = allData;
                // Processa os dados com base no intervalo selecionado
                this.processedData = this.processDataByInterval(allData);
  
                // Atualiza os gráficos
                this.updateCharts();
  
                // Calcula a média de produção
                const totalGas = this.processedData.map(item => Number(item.gas)).reduce((total, value) => total + value, 0);
                const totalOil = this.processedData.map(item => Number(item.oil)).reduce((total, value) => total + value, 0);
                const totalWater = this.processedData.map(item => Number(item.water)).reduce((total, value) => total + value, 0);
                const totalBhp = this.processedData.map(item => Number(item.bhp)).reduce((total, value) => total + value, 0);
  
                const averageGas = totalGas / this.processedData.length;
                const averageOil = totalOil / this.processedData.length;
                const averageWater = totalWater / this.processedData.length;
                const averageBhp = totalBhp / this.processedData.length;
  
                this.averageGas = averageGas;
                this.averageOil = averageOil;
  
                // Após receber os dados da API
                this.calculateStats(allData);
            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
                this.showAlert('Erro ao buscar dados. Por favor, tente novamente.', 'danger');
            } finally {
                this.isLoading = false;
            }
        },
        createChart(chartId, labels, data, label, color) {
            const canvas = document.getElementById(chartId);
            if (!canvas) {
                console.warn(`Canvas com id ${chartId} não encontrado.`);
                return null;
            }
  
            // Verificar se já existe um gráfico neste canvas
            if (this.chartInstances[chartId]) {
                this.chartInstances[chartId].destroy();
                delete this.chartInstances[chartId];
            }
  
            const ctx = canvas.getContext("2d");
  
            // Prepara os dados para o formato scatter
            const scatterData = this.processedData.map(item => ({
                x: new Date(
                    this.sampleInterval === 'all' || this.sampleInterval === 'day'
                        ? item.date || item.key
                        : this.getDateForInterval(item.key)
                ),
                y: Number(item.oil)
            }));
  
            const chartConfig = {
                type: this.chartType,
                data: {
                    labels: this.chartType !== 'scatter' ? labels : undefined,
                    datasets: [{
                        label: label,
                        backgroundColor: color,
                        borderColor: color,
                        data: this.chartType === 'scatter' ? scatterData : data,
                        fill: false,
                        pointRadius: this.chartType === 'scatter' ? 6 : 3,
                        pointHoverRadius: this.chartType === 'scatter' ? 8 : 5,
                        showLine: this.chartType === 'scatter' ? false : true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: { top: 20, right: 20, bottom: 20, left: 20 }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                color: '#344767',
                                font: { size: 16, weight: 'bold', family: 'Roboto, Arial, sans-serif' },
                                padding: 20,
                                boxWidth: 18,
                                boxHeight: 18,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: {
                            backgroundColor: '#fff',
                            titleColor: '#009688',
                            bodyColor: '#344767',
                            borderColor: '#009688',
                            borderWidth: 1,
                            titleFont: { size: 16, weight: 'bold' },
                            bodyFont: { size: 15 },
                            padding: 12,
                            displayColors: true,
                            callbacks: {
                                title: function(tooltipItems) {
                                    if (this.chartType === 'scatter') {
                                        const date = new Date(tooltipItems[0].raw.x);
                                        return date.toLocaleDateString('pt-BR');
                                    }
                                    return tooltipItems[0].label;
                                },
                                label: function(context) {
                                    let value = context.raw;
                                    if (value && typeof value === 'object' && value.y !== undefined) {
                                        value = value.y;
                                    }
                                    if (typeof value !== 'number' || isNaN(value)) {
                                        return context.dataset.label;
                                    }
                                    if (value >= 1000000) {
                                        return `${context.dataset.label}: ${(value / 1000000).toFixed(2)}M`;
                                    }
                                    if (value >= 1000) {
                                        return `${context.dataset.label}: ${(value / 1000).toFixed(2)}k`;
                                    }
                                    return `${context.dataset.label}: ${value.toFixed(2)}`;
                                }
                            }
                        },
                        zoom: {
                            pan: {
                                enabled: true,
                                mode: 'x',
                            },
                            zoom: {
                                wheel: {
                                    enabled: true,
                                },
                                pinch: {
                                    enabled: true
                                },
                                mode: 'x',
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: this.chartType === 'scatter' ? 'time' : 'category',
                            time: this.chartType === 'scatter' ? {
                                unit: this.sampleInterval === 'day' || this.sampleInterval === 'all' ? 'day' :
                                      this.sampleInterval === 'week' ? 'week' :
                                      this.sampleInterval === 'month' ? 'month' : 'year',
                                displayFormats: {
                                    day: 'dd/MM/yy',
                                    week: "'Sem' ww/yy",
                                    month: 'MM/yyyy',
                                    year: 'yyyy'
                                }
                            } : undefined,
                            ticks: {
                                autoSkip: false,
                                maxRotation: 90,
                                minRotation: 45,
                                color: '#344767',
                                font: { size: 13 }
                            },
                            grid: {
                                color: '#e0e0e0'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#344767',
                                font: { size: 13 },
                                callback: function(value) {
                                    if (value >= 1000000) {
                                        return (value / 1000000).toFixed(1) + 'M';
                                    }
                                    if (value >= 1000) {
                                        return (value / 1000).toFixed(1) + 'k';
                                    }
                                    return value;
                                }
                            }
                        }
                    }
                }
            };
  
            try {
                return new Chart(ctx, chartConfig);
            } catch (error) {
                console.error(`Erro ao criar gráfico ${chartId}:`, error);
                return null;
            }
        },
        createCombinedChart(chartId, labels, gas, oil, water, bhp) {
            const canvas = document.getElementById(chartId);
            if (!canvas) {
                console.warn(`Canvas com id ${chartId} não encontrado.`);
                return null;
            }
  
            if (this.chartInstances[chartId]) {
                this.chartInstances[chartId].destroy();
                delete this.chartInstances[chartId];
            }
  
            const ctx = canvas.getContext("2d");
  
            // Função auxiliar para preparar dados scatter
            const prepareScatterData = (field) => {
                return this.processedData.map(item => ({
                    x: new Date(
                        this.sampleInterval === 'all' || this.sampleInterval === 'day'
                            ? item.date || item.key
                            : this.getDateForInterval(item.key)
                    ),
                    y: Number(item[field])
                }));
            };
  
            const datasets = [
                {
                    label: "Gas (scm/d)",
                    backgroundColor: "rgba(203,12,159,0.2)",
                    borderColor: "rgba(203,12,159,1)",
                    data: this.chartType === 'scatter' ? prepareScatterData('gas') : gas,
                    yAxisID: 'y-gas',
                    pointRadius: this.chartType === 'scatter' ? 6 : 3,
                    pointHoverRadius: this.chartType === 'scatter' ? 8 : 5,
                    showLine: this.chartType === 'scatter' ? false : true
                },
                {
                    label: "Oil (scm/d)",
                    backgroundColor: "rgba(12,203,159,0.2)",
                    borderColor: "rgba(12,203,159,1)",
                    data: this.chartType === 'scatter' ? prepareScatterData('oil') : oil,
                    yAxisID: 'y-oil',
                    pointRadius: this.chartType === 'scatter' ? 6 : 3,
                    pointHoverRadius: this.chartType === 'scatter' ? 8 : 5,
                    showLine: this.chartType === 'scatter' ? false : true
                },
                {
                    label: "Water (scm/d)",
                    backgroundColor: "rgba(159,12,203,0.2)",
                    borderColor: "rgba(159,12,203,1)",
                    data: this.chartType === 'scatter' ? prepareScatterData('water') : water,
                    yAxisID: 'y-water',
                    pointRadius: this.chartType === 'scatter' ? 6 : 3,
                    pointHoverRadius: this.chartType === 'scatter' ? 8 : 5,
                    showLine: this.chartType === 'scatter' ? false : true
                },
                {
                    label: "BHP (Bar)",
                    backgroundColor: "rgba(72,159,203,0.2)",
                    borderColor: "rgba(72,159,203,1)",
                    data: this.chartType === 'scatter' ? prepareScatterData('bhp') : bhp,
                    yAxisID: 'y-bhp',
                    pointRadius: this.chartType === 'scatter' ? 6 : 3,
                    pointHoverRadius: this.chartType === 'scatter' ? 8 : 5,
                    showLine: this.chartType === 'scatter' ? false : true
                },
            ];
  
            try {
                return new Chart(ctx, {
                    type: this.chartType,
                    data: {
                        labels: this.chartType !== 'scatter' ? labels : undefined,
                        datasets: datasets
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        layout: {
                            padding: { top: 20, right: 20, bottom: 20, left: 20 }
                        },
                        scales: {
                            x: {
                                type: this.chartType === 'scatter' ? 'time' : 'category',
                                time: this.chartType === 'scatter' ? {
                                    unit: 'day',
                                    displayFormats: {
                                        day: 'dd/MM/yy'
                                    }
                                } : undefined
                            },
                            'y-gas': {
                                type: 'linear',
                                display: true,
                                position: 'left',
                                ticks: {
                                    callback: value => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value
                                }
                            },
                            'y-oil': {
                                type: 'linear',
                                display: true,
                                position: 'left',
                                grid: { drawOnChartArea: false }
                            },
                            'y-water': {
                                type: 'linear',
                                display: true,
                                position: 'right',
                                grid: { drawOnChartArea: false }
                            },
                            'y-bhp': {
                                type: 'linear',
                                display: true,
                                position: 'right',
                                grid: { drawOnChartArea: false }
                            },
                        },
                        plugins: {
                            legend: { 
                                display: true,
                                position: 'top',
                                labels: {
                                    color: '#344767',
                                    font: { size: 16, weight: 'bold', family: 'Roboto, Arial, sans-serif' },
                                    padding: 20,
                                    boxWidth: 18,
                                    boxHeight: 18,
                                    usePointStyle: true,
                                    pointStyle: 'circle'
                                }
                            },
                            tooltip: {
                                mode: 'index',
                                intersect: false,
                                callbacks: {
                                    label: function(context) {
                                        let value = this.chartType === 'scatter' ? 
                                            context.raw.y : context.raw;
                                        if (value && typeof value === 'object' && value.y !== undefined) {
                                            value = value.y;
                                        }
                                        if (typeof value !== 'number' || isNaN(value)) {
                                            return context.dataset.label;
                                        }
                                        if (value >= 1000) {
                                            return `${context.dataset.label}: ${(value / 1000).toFixed(2)}k`;
                                        }
                                        return `${context.dataset.label}: ${value.toFixed(2)}`;
                                    }
                                }
                            },
                            zoom: {
                                pan: {
                                    enabled: true,
                                    mode: 'x',
                                },
                                zoom: {
                                    wheel: {
                                        enabled: true,
                                    },
                                    pinch: {
                                        enabled: true
                                    },
                                    mode: 'x',
                                }
                            }
                        },
                        interaction: {
                            mode: 'nearest',
                            axis: 'x',
                            intersect: false
                        }
                    }
                });
            } catch (error) {
                console.error(`Erro ao criar gráfico combinado:`, error);
                return null;
            }
        },
        addData() {
            if (this.newData) {
                this.usersData.push({ id: this.usersData.length + 1, name: this.newData });
                this.newData = '';
            }
        },
        clearData() {
            this.startDate = '';
            this.endDate = '';
            this.newData = '';
            this.alert = null;
            this.fetchAndRenderCharts();
            this.showAlert('Filtros limpos com sucesso', 'info');
        },
        async exportToExcel() {
            try {
                this.isLoading = true; // Adicione loading state
                
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('Análise de Declínio');
                
                // Estilização do cabeçalho
                worksheet.getRow(1).font = { bold: true };
                worksheet.columns = [
                    { header: 'Data', key: 'date', width: 15 },
                    { header: 'Gas (scm/d)', key: 'gas', width: 15 },
                    { header: 'Oil (scm/d)', key: 'oil', width: 15 },
                    { header: 'Water (scm/d)', key: 'water', width: 15 },
                    { header: 'BHP (Bar)', key: 'bhp', width: 15 }
                ];
  
                // Adiciona os dados
                const chartData = this.chartInstances['chart-line-5']; // Pega o primeiro gráfico como referência
                if (chartData && chartData.data) {
                    chartData.data.labels.forEach((label, index) => {
                        worksheet.addRow({
                            date: label,
                            gas: this.chartInstances['chart-line-1'].data.datasets[0].data[index],
                            oil: this.chartInstances['chart-line-2'].data.datasets[0].data[index],
                            water: this.chartInstances['chart-line-3'].data.datasets[0].data[index],
                            bhp: this.chartInstances['chart-line-4'].data.datasets[0].data[index]
                        });
                    });
                }
  
                // Formata as células numéricas
                worksheet.getColumn('gas').numFmt = '#,##0.00';
                worksheet.getColumn('oil').numFmt = '#,##0.00';
                worksheet.getColumn('water').numFmt = '#,##0.00';
                worksheet.getColumn('bhp').numFmt = '#,##0.00';
  
                // Gera o arquivo
                const buffer = await workbook.xlsx.writeBuffer();
                const blob = new Blob([buffer], { 
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
                });
                
                // Cria o nome do arquivo com a data atual
                const fileName = `analise-declinio_${new Date().toISOString().split('T')[0]}.xlsx`;
  
                // Faz o download
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
  
                this.showAlert('Dados exportados com sucesso!', 'success');
            } catch (error) {
                console.error('Erro ao exportar:', error);
                this.showAlert('Erro ao exportar os dados. Tente novamente.', 'danger');
            } finally {
                this.isLoading = false;
            }
        },
        handleError(error) {
            let message = 'Erro ao processar sua solicitação';
            
            if (error.response) {
                // Erro da API
                switch (error.response.status) {
                    case 401:
                        message = 'Sessão expirada. Por favor, faça login novamente.';
                        // Redirecionar para login
                        break;
                    case 403:
                        message = 'Você não tem permissão para acessar estes dados.';
                        break;
                    case 404:
                        message = 'Dados não encontrados.';
                        break;
                    default:
                        message = error.response.data.message || message;
                }
            } else if (error.request) {
                message = 'Erro de conexão. Verifique sua internet.';
            }
            
            this.showAlert(message, 'danger');
        },
        handleResize() {
            Object.values(this.chartInstances).forEach(chart => {
                if (chart) {
                    chart.resize();
                }
            });
        },
        saveFilters() {
            localStorage.setItem('declineAnalysisFilters', JSON.stringify({
                startDate: this.startDate,
                endDate: this.endDate
            }));
        },
        // Função para processar os dados baseado no intervalo selecionado
        processDataByInterval(data) {
            if (this.sampleInterval === 'all') return data;
  
            const groupedData = {};
            data.forEach(item => {
                const date = new Date(item.date);
                let key;
  
                switch(this.sampleInterval) {
                    case 'day':
                        key = date.toISOString().split('T')[0];
                        break;
                    case 'week':
                        // ISO week: pega a segunda-feira da semana
                        const day = date.getDay();
                        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
                        const monday = new Date(date.setDate(diff));
                        key = `${monday.getFullYear()}-W${String(this.getWeekNumber(monday)).padStart(2, '0')}`;
                        break;
                    case 'month':
                        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                        break;
                    case 'year':
                        key = `${date.getFullYear()}`;
                        break;
                    default:
                        key = date.toISOString().split('T')[0];
                }
  
                if (!groupedData[key]) {
                    groupedData[key] = {
                        key, // salva o agrupamento
                        oil: [],
                        water: [],
                        gas: [],
                        bhp: []
                    };
                }
  
                groupedData[key].oil.push(Number(item.oil));
                groupedData[key].water.push(Number(item.water));
                groupedData[key].gas.push(Number(item.gas));
                groupedData[key].bhp.push(Number(item.bhp));
            });
  
            // Calcula a média para cada período
            return Object.values(groupedData).map(group => ({
                key: group.key,
                oil: this.calculateAverage(group.oil),
                water: this.calculateAverage(group.water),
                gas: this.calculateAverage(group.gas),
                bhp: this.calculateAverage(group.bhp)
            })).sort((a, b) => a.key.localeCompare(b.key));
        },
        calculateAverage(arr) {
            return arr.reduce((a, b) => a + b, 0) / arr.length;
        },
        // Função auxiliar para semana ISO
        getWeekNumber(date) {
            const tempDate = new Date(date.getTime());
            tempDate.setHours(0, 0, 0, 0);
            tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
            const yearStart = new Date(tempDate.getFullYear(), 0, 1);
            const weekNo = Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);
            return weekNo;
        },
        // Atualiza os gráficos quando o intervalo muda
        handleIntervalChange() {
            if (!this.rawData.length) return;
            
            this.processedData = this.processDataByInterval(this.rawData);
            this.updateCharts();
            
            // Atualiza a mensagem de acordo com o intervalo selecionado
            const intervalText = {
                all: 'todos os dados',
                day: 'dados diários',
                week: 'dados semanais',
                month: 'dados mensais',
                year: 'dados anuais'
            }[this.sampleInterval];
            
            this.showAlert(`Visualizando ${intervalText}`, 'info');
        },
        // Atualiza o tipo de gráfico
        updateChartType() {
            if (!this.processedData.length) return;
            this.updateCharts();
        },
        // Novo método para atualizar os gráficos
        updateCharts() {
            // Limpa gráficos antigos
            this.destroyCharts();
  
            // Prepara os dados
            const labels = this.processedData.map(item => {
                if (!item.key) return ''; // Protege contra undefined
  
                switch(this.sampleInterval) {
                    case 'day':
                        // YYYY-MM-DD para DD/MM/YY
                        if (item.key.split('-').length === 3) {
                            const [y, m, d] = item.key.split('-');
                            return `${d}/${m}/${y.slice(-2)}`;
                        }
                        return item.key;
                    case 'week':
                        // YYYY-Wnn para "Semana nn/YYYY"
                        if (item.key.includes('-W')) {
                            const [year, week] = item.key.split('-W');
                            return `Sem ${week}/${year}`;
                        }
                        return item.key;
                    case 'month':
                        // YYYY-MM para MM/YYYY
                        if (item.key.split('-').length === 2) {
                            const [y2, m2] = item.key.split('-');
                            return `${m2}/${y2}`;
                        }
                        return item.key;
                    case 'year':
                        return item.key;
                    default:
                        return item.key;
                }
            });
  
            const oil = this.processedData.map(item => Number(item.oil));
            const water = this.processedData.map(item => Number(item.water));
            const gas = this.processedData.map(item => Number(item.gas));
            const bhp = this.processedData.map(item => Number(item.bhp));
  
            // Cria os gráficos novamente
            this.chartInstances['chart-line-1'] = this.createChart("chart-line-1", labels, gas, "Gas (scm/d)", "rgba(203,12,159,1)");
            this.chartInstances['chart-line-2'] = this.createChart("chart-line-2", labels, oil, "Oil (scm/d)", "rgba(12,203,159,1)");
            this.chartInstances['chart-line-3'] = this.createChart("chart-line-3", labels, water, "Water (scm/d)", "rgba(159,12,203,1)");
            this.chartInstances['chart-line-4'] = this.createChart("chart-line-4", labels, bhp, "BHP (Bar)", "rgba(72,159,203,1)");
            this.chartInstances['chart-line-5'] = this.createCombinedChart("chart-line-5", labels, gas, oil, water, bhp);
        },
        // Método para destruir gráficos de forma segura
        destroyCharts() {
            Object.values(this.chartInstances).forEach(chart => {
                if (chart && typeof chart.destroy === 'function') {
                    chart.destroy();
                }
            });
            this.chartInstances = {}; // Limpa o objeto
        },
        async downloadCharts() {
            try {
                // Cria um zip para armazenar múltiplos arquivos
                const zip = new JSZip();
                const chartIds = ['chart-line-1', 'chart-line-2', 'chart-line-3', 'chart-line-4', 'chart-line-5'];
                const chartNames = ['Gas', 'Oil', 'Water', 'BHP', 'Combined'];
  
                // Adiciona cada gráfico ao zip
                for (let i = 0; i < chartIds.length; i++) {
                    const canvas = document.getElementById(chartIds[i]);
                    if (canvas) {
                        // Converte o canvas para uma imagem PNG
                        const dataUrl = canvas.toDataURL('image/png');
                        // Remove o cabeçalho do data URL para obter apenas os dados binários
                        const data = atob(dataUrl.split(',')[1]);
                        // Adiciona a imagem ao zip
                        zip.file(`grafico_${chartNames[i]}.png`, data, {binary: true});
                    }
                }
  
                // Gera o arquivo zip
                const content = await zip.generateAsync({type: 'blob'});
                
                // Cria um link para download
                const link = document.createElement('a');
                link.href = URL.createObjectURL(content);
                link.download = `analise_declinio_${new Date().toISOString().split('T')[0]}.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
  
                this.showAlert('Gráficos exportados com sucesso!', 'success');
            } catch (error) {
                console.error('Erro ao exportar gráficos:', error);
                this.showAlert('Erro ao exportar os gráficos', 'danger');
            }
        },
        calculateStats(data) {
            if (!data || data.length === 0) return;
  
            // Calcula médias
            this.mediaGas = this.calculateAverage(data.map(item => Number(item.gas)));
            this.mediaOil = this.calculateAverage(data.map(item => Number(item.oil)));
            this.mediaWater = this.calculateAverage(data.map(item => Number(item.water)));
            this.mediaBhp = this.calculateAverage(data.map(item => Number(item.bhp)));
  
            // Calcula máximos
            this.maxGas = Math.max(...data.map(item => Number(item.gas)));
            this.maxOil = Math.max(...data.map(item => Number(item.oil)));
            this.maxWater = Math.max(...data.map(item => Number(item.water)));
            this.maxBhp = Math.max(...data.map(item => Number(item.bhp)));
  
            // Calcula mínimos
            this.minGas = Math.min(...data.map(item => Number(item.gas)));
            this.minOil = Math.min(...data.map(item => Number(item.oil)));
            this.minWater = Math.min(...data.map(item => Number(item.water)));
            this.minBhp = Math.min(...data.map(item => Number(item.bhp)));
        },
        formatNumber(value) {
            if (value === undefined || value === null) return '0';
            
            if (value >= 1000000) {
                return `${(value / 1000000).toFixed(2)}M`;
            }
            if (value >= 1000) {
                return `${(value / 1000).toFixed(2)}k`;
            }
            return value.toFixed(2);
        },
        getDateForInterval(key) {
            if (this.sampleInterval === 'week') {
                // key: YYYY-Wnn
                const [year, week] = key.split('-W');
                const simple = new Date(year, 0, 1 + (week - 1) * 7);
                const dow = simple.getDay();
                const monday = new Date(simple);
                if (dow <= 4) {
                    monday.setDate(simple.getDate() - simple.getDay() + 1);
                } else {
                    monday.setDate(simple.getDate() + 8 - simple.getDay());
                }
                return monday;
            }
            if (this.sampleInterval === 'month') {
                // key: YYYY-MM
                const [y, m] = key.split('-');
                return new Date(Number(y), Number(m) - 1, 1);
            }
            if (this.sampleInterval === 'year') {
                // key: YYYY
                return new Date(Number(key), 0, 1);
            }
            // day ou all
            return new Date(key);
        },
    },
  };
  </script>
  
  <style scoped>
  /* Adicione estilos conforme necessário */
  .alert {
    margin-bottom: 1rem;
  }
  
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .btn {
    margin-right: 0.5rem;
  }
  
  .fa {
    margin-right: 0.25rem;
  }
  
  .stat-card {
    padding: 1rem;
    border-radius: 8px;
    background-color: #f8f9fa;
    margin-bottom: 1rem;
  }
  
  .stat-card h6 {
    color: #6c757d;
    margin-bottom: 0.5rem;
  }
  
  .stat-card .h4 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  .stat-card small {
    color: #6c757d;
    display: block;
    line-height: 1.4;
  }
  
  .card {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  }
  
  .card-header {
    background-color: #fff;
    border-bottom: 1px solid rgba(0,0,0,.125);
  }
  
  .card-title {
    color: #2c3e50;
    margin-bottom: 0;
  }
  </style>