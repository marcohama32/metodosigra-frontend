<template>
    <div class="py-4 container-fluid">
        <h2>Relatórios de Despesas</h2>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Resumo das Despesas</h6>
                    </div>
                    <div class="card-body">
                        <table class="table align-items-center justify-content-center mb-0 table-sm">
                            <thead>
                                <tr>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Descrição</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                        Valor</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                                        Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="despesa in despesasData" :key="despesa.id">
                                    <td>
                                        <h6 class="mb-0 text-sm">{{ despesa.descricao }}</h6>
                                    </td>
                                    <td>
                                        <span class="text-xs font-weight-bold">{{ despesa.valor }}</span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-xs font-weight-bold">{{ despesa.data }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Gráfico de Despesas</h6>
                    </div>
                    <div class="card-body">
                        <!-- Aqui você pode integrar uma biblioteca de gráficos, como Chart.js ou ECharts -->
                        <canvas id="despesasChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: "ExpenseReport",
    data() {
        return {
            despesasData: [
                { id: 1, descricao: 'Despesa 1', valor: 'R$ 100', data: '2022-01-01' },
                { id: 2, descricao: 'Despesa 2', valor: 'R$ 200', data: '2022-02-01' },
                { id: 3, descricao: 'Despesa 3', valor: 'R$ 300', data: '2022-03-01' },
                { id: 4, descricao: 'Despesa 4', valor: 'R$ 400', data: '2022-04-01' },
                { id: 5, descricao: 'Despesa 5', valor: 'R$ 500', data: '2022-05-01' },
                { id: 6, descricao: 'Despesa 6', valor: 'R$ 600', data: '2022-06-01' },
            ],
        };
    },
    mounted() {
        this.renderChart();
    },
    methods: {
        renderChart() {
            const ctx = document.getElementById('despesasChart').getContext('2d');
            const labels = this.despesasData.map(d => d.descricao);
            const data = this.despesasData.map(d => parseFloat(d.valor.replace('R$ ', '').replace('.', '').replace(',', '.')));

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Valor das Despesas',
                        data: data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    },
};
</script> 