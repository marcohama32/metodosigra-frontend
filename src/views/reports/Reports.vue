<template>
    <div class="container">
        <h1 class="text-center">Relatórios</h1>
        <div class="form-container mb-4">
            <div class="row g-2 align-items-center d-flex justify-content-center">
            <!-- Contêiner flexível para alinhar os elementos -->
            <div class="col-auto mb-3 d-flex align-items-center">
                <!-- Campo de pesquisa com um tamanho maior e responsivo -->
                <input type="text" v-model="searchUser" class="form-control form-control-md"
                    placeholder="Pesquise por usuários" style="width: 250px;" data-bs-toggle="tooltip"
                    title="Pesquisar" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="date1" class="form-control form-control-md" style="width: 250px;" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="date2" class="form-control form-control-md" style="width: 250px;" />
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-success btn-md" @click="addData" style="width: 100px;">
                    <i class="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-secondary btn-md" @click="clearData" data-bs-toggle="tooltip" title="Limpar" style="width: 100px;">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </button>
            </div>
            </div>
        </div>
        
        <div class="card-container">
            <div class="report-card" v-for="report in reports" :key="report.id" @click="viewReport(report.id)">
                <div class="report-card-icon">
                    <i class="fas fa-file-alt"></i>
                </div>
                <h2 class="report-card-title">{{ report.title }}</h2>
                <p class="report-card-description">{{ report.description }}</p>
                <div class="tooltip">{{ report.title }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            reports: [
                { id: 1, title: 'Relatório de Clientes', description: 'Mostra todos os clientes cadastrados no sistema' },
                { id: 2, title: 'Relatório de Faturas', description: 'Mostra todas as faturas geradas' },
                { id: 3, title: 'Relatório de Despesas', description: 'Mostra todas as despesas registradas' },
                { id: 5, title: 'Relatório de Consumo de Água', description: 'Mostra o consumo de água por cliente' },
                { id: 6, title: 'Relatório de Pagamentos', description: 'Mostra todos os pagamentos realizados' },
                { id: 7, title: 'Relatório de Manutenção', description: 'Mostra as manutenções realizadas nos furos de água' },
                { id: 8, title: 'Relatório de Análise de Despesas', description: 'Análise detalhada das despesas ao longo do tempo' },
                { id: 9, title: 'Relatório de Clientes com Infrações', description: 'Mostra todos os clientes com infrações registradas' },
            ],
            originalReports: [],
            searchUser: '',
            date1: '',
            date2: ''
        };
    },
    created() {
        this.originalReports = [...this.reports];
    },
    methods: {
        viewReport(id) {
            // Lógica para visualizar o relatório
            if (id === 9) {
                this.$router.push('/clientes-com-infracoes');
            } else {
                console.log(`Visualizando relatório com ID: ${id}`);
            }
        },
        clearData() {
            this.searchUser = ''; // Limpa o campo de pesquisa
            this.date1 = ''; // Limpa o primeiro campo de data
            this.date2 = ''; // Limpa o segundo campo de data
            this.reports = [...this.originalReports]; // Reinicia a lista de relatórios
        },
        addData() {
            console.log(`Pesquisando por: ${this.searchUser}, ${this.date1}, ${this.date2}`);
            // Filtra os relatórios com base no valor de searchUser
            this.reports = this.originalReports.filter(report => 
                report.title.toLowerCase().includes(this.searchUser.toLowerCase())
            );
        }
    }
}
</script>

<style>
.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px;
}

.report-card {
    position: relative;
    border: none;
    border-radius: 10px;
    padding: 20px;
    margin: 15px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    width: 220px;
    text-align: center;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    overflow: hidden;
}

.report-card:nth-child(odd) {
    background-color: #e0f7fa;
}

.report-card-icon {
    font-size: 40px;
    margin-bottom: 10px;
    color: #00796b;
}

.report-card:hover {
    background-color: #b2ebf2;
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.report-card-title {
    color: #00796b;
    font-size: 1.2em;
    margin: 0;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
}

.report-card-description {
    color: #555;
}

.tooltip {
    visibility: hidden;
    width: auto;
    min-width: 120px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
}

.report-card:hover .tooltip {
    visibility: visible;
    opacity: 1;
}
</style>
