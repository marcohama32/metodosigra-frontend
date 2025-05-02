<template>
    <div class="py-4 container-fluid">
        <h6>Página de Pagamentos</h6>
        <div class="row g-2 align-items-center d-flex">
            <div class="col-auto mb-3 d-flex align-items-center">
                <input type="text" v-model="searchInvoice" @input="validateSearch" class="form-control form-control-md"
                    placeholder="Pesquise por número da fatura" style="width: 350px;" data-bs-toggle="tooltip"
                    title="Pesquisar" aria-label="Pesquise por número da fatura" />
            </div>

            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="filterDate" class="form-control form-control-md" title="Filtrar por data" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <select v-model="filterStatus" class="form-control form-control-md" title="Filtrar por status">
                    <option value="">Todos</option>
                    <option value="pago">Pago</option>
                    <option value="pendente">Pendente</option>
                </select>
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-success btn-md" @click="searchPayments" aria-label="Pesquisar pagamentos">
                    <i class="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-secondary btn-md" @click="clearData" data-bs-toggle="tooltip" title="Limpar">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </button>
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-info btn-md" @click="exportData" title="Exportar Dados">
                    <i class="fa fa-file-export" aria-hidden="true"></i> Exportar
                </button>
            </div>
            <div class="col ms-auto d-flex">
                <div class="ms-auto">
                    <button id="openAlert" class="btn btn-success">Adicionar Pagamento</button>
                </div>
            </div>
        </div>
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr>
                                        <th @click="sortData('invoiceId')">Número da Fatura</th>
                                        <th @click="sortData('receiptId')">Número do Recibo</th>
                                        <th @click="sortData('clientName')">Cliente</th>
                                        <th @click="sortData('invoiceAmount')">Valor a Pagar</th>
                                        <th @click="sortData('paymentAmount')">Valor Pago</th>
                                        <th @click="sortData('status')">Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="invoice in paginatedPayments" :key="invoice.id">
                                        <td>{{ formatInvoiceId(invoice) }}</td>
                                        <td>{{ invoice.receiptId }}</td>
                                        <td>{{ invoice.clientName }}</td>
                                        <td>{{ invoice.invoiceAmount }}</td>
                                        <td>{{ invoice.paymentAmount }}</td>
                                        <td>{{ invoice.status }}</td>
                                        <td class="align-middle text-center">
                                            <button class="btn btn-primary p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Visualizar"
                                                @click="showPaymentDetails(invoice)">
                                                <i class="fa fa-eye text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-warning p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Editar" @click="editPayment(invoice)">
                                                <i class="fa fa-edit text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-info p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Visualizar Recibo"
                                                @click="viewReceipt(invoice)">
                                                <i class="fa fa-file-invoice text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-danger p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Apagar" @click="deletePayment(invoice)">
                                                <i class="fa fa-trash text-xs" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Pagination :current-page="currentPage" :total-pages="totalPages" @prev-page="previousPage"
                            @next-page="nextPage" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Seção para Visualizar Recibo -->
        <div v-if="selectedInvoice" class="mt-4 receipt">
            <h5>Detalhes do Recibo</h5>
            <div class="receipt-header">
                <h6>Nome da Empresa</h6>
                <p>Endereço da Empresa</p>
                <p>Telefone: (xx) xxxx-xxxx</p>
                <p>Email: contato@empresa.com</p>
            </div>
            <div class="receipt-client">
                <h6>Cliente</h6>
                <p><strong>Nome:</strong> {{ selectedInvoice.clientName }}</p>
                <p><strong>Número da Fatura:</strong> {{ formatInvoiceId(selectedInvoice) }}</p>
            </div>
            <div class="receipt-details">
                <p><strong>Valor a Pagar:</strong> R$ {{ selectedInvoice.invoiceAmount.toFixed(2) }}</p>
                <p><strong>Valor Pago:</strong> R$ {{ selectedInvoice.paymentAmount.toFixed(2) }}</p>
                <p><strong>Data:</strong> {{ selectedInvoice.date }}</p>
            </div>
            <button class="btn btn-secondary btn-sm me-2" @click="clearSelectedInvoice">Fechar</button>
            <button class="btn btn-primary btn-sm" @click="printReceipt">Imprimir Recibo</button>
        </div>

    

        <div v-if="invoice">
            <h6>Detalhes da Fatura</h6>
            <p><strong>Número da Fatura:</strong> {{ invoice.invoiceId }}</p>
            <p><strong>Cliente:</strong> {{ invoice.clientName }}</p>
            <p><strong>Valor Total:</strong> R$ {{ invoice.invoiceAmount }}</p>
        </div>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";


export default {
    components: {
        Pagination,
      
    },
    name: "PaymentsPage",
    data() {
        return {
            searchInvoice: '',
            searchClient: '',
            filterDate: '',
            filterStatus: '',
            paymentsData: [
                { id: 1, invoiceId: 'tAiQ0mfuqTLUBnolALdFGr', receiptId: 'REC-001', clientName: 'Cliente A', invoiceAmount: 164.8, paymentAmount: 164.8, status: 'pago' },
                { id: 2, invoiceId: 'tAiQ0mfuqTLUBnolALdFGr', receiptId: 'REC-002', clientName: 'Cliente B', invoiceAmount: 100, paymentAmount: 50, status: 'pago parcial' },
                { id: 3, invoiceId: 'tAiQ0mfuqTLUBnolALdFGr', receiptId: 'REC-003', clientName: 'Cliente C', invoiceAmount: 345, paymentAmount: 0, status: 'não pago' },
                { id: 4, invoiceId: 'tAiQ0mfuqTLUBnolALdFGr', receiptId: 'REC-004', clientName: 'Cliente D', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 5, invoiceId: 'tAiQ0mfuqTLUBnolALdFGr', receiptId: 'REC-005', clientName: 'Cliente E', invoiceAmount: 617.6, paymentAmount: 617.6, status: 'pago' },
                { id: 6, invoiceId: 'tAiQ0mfuqTLUBnolALdFGr', clientName: 'Cliente F', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 7, invoiceId: 'tAiQ0mfuqTLUBnolALdFGr', clientName: 'Cliente G', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 8, invoiceId: 'tAiQ0mfuqTLUBnolALdFGr', clientName: 'Cliente H', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 9, invoiceId: 'tAiQ0mfuqTLUBnolALdFGr', clientName: 'Cliente I', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 10, invoiceId: 'tAiQ0mfuqTLUBnolALdFGr', clientName: 'Cliente J', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 11, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente K', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 12, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente L', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 13, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente M', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 14, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente N', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 15, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente O', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 16, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente P', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 17, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente Q', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 18, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente R', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 19, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente S', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 20, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente T', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 21, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente U', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 22, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente V', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 23, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente W', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 24, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente X', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
                { id: 25, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente Y', invoiceAmount: 200, paymentAmount: 0, status: 'não pago' },
                { id: 26, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente Z', invoiceAmount: 200, paymentAmount: 100, status: 'pago parcial' },
                { id: 27, invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', clientName: 'Cliente AA', invoiceAmount: 200, paymentAmount: 200, status: 'pago' },
            ],
            currentPage: 1,
            itemsPerPage: 8,
            sortKey: '',
            sortOrder: 'asc',
            theme: 'light',
            selectedInvoice: null,
            errorMessage: '',
            paymentValue: null,
            invoice: null,
            selectedInvoiceToDelete: null,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredPayments.length / this.itemsPerPage);
        },
        paginatedPayments() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredPayments.slice(start, start + this.itemsPerPage);
        },
        filteredPayments() {
            return this.paymentsData.filter(invoice => {
                const matchesInvoice = this.searchInvoice ? invoice.invoiceId.includes(this.searchInvoice) : true;
                const matchesClient = this.searchClient ? invoice.clientName.includes(this.searchClient) : true;
                const matchesDate = this.filterDate ? invoice.date === this.filterDate : true;
                const matchesStatus = this.filterStatus ? (this.filterStatus === 'pago' ? invoice.paymentAmount > 0 : invoice.paymentAmount === 0) : true;
                return matchesInvoice && matchesClient && matchesDate && matchesStatus;
            }).sort((a, b) => {
                if (this.sortKey) {
                    const modifier = this.sortOrder === 'asc' ? 1 : -1;
                    if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
                    if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
                }
                return 0;
            });
        },
    },
    created() {
        // Definindo o diálogo personalizado
        if (!alertify.myAlert) {
            alertify.dialog('myAlert', function factory() {
                return {
                    main: function (message) {
                        this.message = message;
                    },
                    setup: function () {
                        return {
                            buttons: [{ text: "Adicionar", key: 13 /* Enter */ }, { text: "Cancelar", key: 27 /* Esc */ }],
                            focus: { element: 0 }
                        };
                    },
                    prepare: function () {
                        this.setContent(`
                            <label for="paymentValue">Valor a ser pago</label>
                            <input type="number" id="paymentValue" class="form-control" placeholder="Insira o valor" />
                        `);
                    },
                    callback: function (closeEvent) {
                        const valueInput = document.getElementById('paymentValue');
                        if (valueInput) {
                            const value = valueInput.value;
                            if (value) {
                                this.addPayment(value);
                            } else {
                                alertify.error('Você deve inserir um valor!');
                            }
                        }
                    },
                    addPayment: function (value) {
                        console.log(`Valor adicionado: R$ ${value}`);
                        // Aqui você pode adicionar o valor ao seu array de pagamentos ou realizar outra ação
                    }
                };
            });
        }
    },
    mounted() {
        // Adiciona os ouvintes de eventos após o componente ser montado
        document.getElementById('openAlert').addEventListener('click', this.openAddPaymentModal);
        document.getElementById('cancelButton').addEventListener('click', this.closeAlert);
        document.getElementById('confirmButton').addEventListener('click', this.addPayment);
        document.getElementById('cancelDeleteButton').addEventListener('click', this.closeDeleteConfirmation);
        document.getElementById('confirmDeleteButton').addEventListener('click', this.confirmDeletePayment);
        document.getElementById('closeSuccessButton').addEventListener('click', this.closeSuccessModal);

        // Busca as informações da fatura com base no ID da fatura
        this.fetchInvoiceDetails();
    },
    methods: {
        formatInvoiceId(invoice) {
            return `FAC-${String(invoice.id).padStart(3, '0')}`;
        },
        validateSearch() {
            this.errorMessage = this.searchInvoice ? '' : 'O número da fatura é obrigatório.';
        },
        searchPayments() {
            if (!this.searchInvoice) {
                alert("O número da fatura é obrigatório.");
                return;
            }
            // Lógica de pesquisa...
        },
        clearData() {
            this.searchInvoice = '';
            this.searchClient = '';
            this.filterDate = '';
            this.filterStatus = '';
        },
        showPaymentDetails(invoice) {
            alert(`Visualizando pagamento: ${JSON.stringify(invoice)}`);
        },
        editPayment(invoice) {
            alert(`Editando pagamento: ${JSON.stringify(invoice)}`);
            // Lógica para editar o pagamento
        },
        deletePayment(invoice) {
            this.selectedInvoiceToDelete = invoice; // Armazena o pagamento selecionado para exclusão
            document.getElementById('deleteConfirmationModal').style.display = 'flex'; // Mostra a modal de confirmação
        },
        confirmDeletePayment() {
            // Lógica para deletar o pagamento
            const index = this.paymentsData.findIndex(payment => payment.id === this.selectedInvoiceToDelete.id);
            if (index !== -1) {
                this.paymentsData.splice(index, 1); // Remove o pagamento da lista
                this.closeDeleteConfirmation(); // Fecha a modal de confirmação
                this.openSuccessModal(); // Abre a modal de sucesso
            }
        },
        openSuccessModal() {
            document.getElementById('successModal').style.display = 'flex'; // Mostra a modal de sucesso
            setTimeout(() => {
                this.closeSuccessModal(); // Fecha a modal após 3 segundos
            }, 3000); // 3000 milissegundos = 3 segundos
        },
        closeSuccessModal() {
            document.getElementById('successModal').style.display = 'none'; // Esconde a modal de sucesso
        },
        closeDeleteConfirmation() {
            document.getElementById('deleteConfirmationModal').style.display = 'none'; // Esconde a modal de confirmação
        },
        exportData() {
            const filteredData = this.filteredPayments.map(invoice => ({
                'Número da Fatura': this.formatInvoiceId(invoice),
                'Cliente': invoice.clientName,
                'Valor a Pagar': invoice.invoiceAmount,
                'Valor Pago': invoice.paymentAmount,
            }));

            const csvContent = [
                Object.keys(filteredData[0]).join(','), // Cabeçalho
                ...filteredData.map(row => Object.values(row).join(',')) // Dados
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', 'pagamentos.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.$notify({ message: 'Dados exportados com sucesso!', type: 'success' });
        },
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            document.body.className = this.theme;
        },
        sortData(key) {
            this.sortKey = key;
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        viewReceipt(invoice) {
            this.selectedInvoice = invoice; // Armazena o recibo selecionado
        },
        clearSelectedInvoice() {
            this.selectedInvoice = null; // Limpa a seleção do recibo
        },
        printReceipt() {
            const printContent = `
                <div style="text-align: center;">
                    <h5>Detalhes do Recibo</h5>
                    <div>
                        <h6>Nome da Empresa</h6>
                        <p>Endereço da Empresa</p>
                        <p>Telefone: (xx) xxxx-xxxx</p>
                        <p>Email: contato@empresa.com</p>
                    </div>
                    <div>
                        <h6>Cliente</h6>
                        <p><strong>Nome:</strong> ${this.selectedInvoice.clientName}</p>
                        <p><strong>Número da Fatura:</strong> ${this.formatInvoiceId(this.selectedInvoice)}</p>
                    </div>
                    <div>
                        <p><strong>Valor a Pagar:</strong> R$ ${this.selectedInvoice.invoiceAmount.toFixed(2)}</p>
                        <p><strong>Valor Pago:</strong> R$ ${this.selectedInvoice.paymentAmount.toFixed(2)}</p>
                        <p><strong>Data:</strong> ${this.selectedInvoice.date}</p>
                    </div>
                </div>
            `;

            const newWindow = window.open('', '_blank');
            newWindow.document.write(`
                <html>
                    <head>
                        <title>Recibo</title>
                        <style>
                            body { font-family: Arial, sans-serif; }
                            h5 { margin-bottom: 10px; }
                            p { margin: 5px 0; }
                        </style>
                    </head>
                    <body>${printContent}</body>
                </html>
            `);
            newWindow.document.close();
            newWindow.focus(); // Foca na nova janela
            newWindow.print(); // Chama a função de impressão
            newWindow.close(); // Fecha a janela após a impressão
        },
        openAddPaymentModal() {
            this.fetchInvoiceDetails(); // Busca as informações da fatura ao abrir o modal
            document.getElementById('customAlert').style.display = 'flex'; // Mostra o alerta
        },
        closeAlert() {
            document.getElementById('customAlert').style.display = 'none'; // Esconde o alerta
        },
        addPayment() {
            const paymentValue = document.getElementById('paymentValue').value;
            if (paymentValue) {
                console.log(`Valor adicionado: R$ ${paymentValue} para a fatura ${this.invoice.invoiceId}`);
                // Aqui você pode adicionar a lógica para processar o pagamento
                this.closeAlert(); // Fecha o alerta após adicionar
            } else {
                alert('Você deve inserir um valor!');
            }
        },
        fetchInvoiceDetails() {
            const invoiceId = this.$route.params.invoiceId; // Supondo que o ID da fatura vem da rota
            // Aqui você deve fazer a chamada para buscar os detalhes da fatura
            // Exemplo de dados fictícios
            const invoices = [
                { id: 1, invoiceId: 'FAC-001', clientName: 'Cliente A', invoiceAmount: 100.00 },
                { id: 2, invoiceId: 'FAC-002', clientName: 'Cliente B', invoiceAmount: 200.00 },
                // Adicione mais faturas conforme necessário
            ];

            // Simulando a busca da fatura
            this.invoice = invoices.find(inv => inv.id === parseInt(invoiceId));
        },
    },
};
</script>

<style>
body.light {
    background-color: white;
    color: black;
}

body.dark {
    background-color: black;
    color: white;
}

.receipt {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    background-color: #f9f9f9;
    margin-top: 20px;
}

.receipt-header,
.receipt-client,
.receipt-details {
    margin-bottom: 15px;
}

.receipt-header h6,
.receipt-client h6 {
    margin: 0;
    font-weight: bold;
}

.receipt-header p,
.receipt-client p,
.receipt-details p {
    margin: 5px 0;
}

.receipt-details p {
    font-size: 1.1em;
    font-weight: bold;
}

.alert {
    color: red;
}

.container {
    margin: 20px;
}

.custom-alert {
    display: none;
    /* Inicialmente escondido */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    /* Fundo escuro */
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* Para garantir que fique acima de outros elementos */
}

.alert-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.alert-buttons {
    margin-top: 15px;
}

.alert-buttons button {
    margin: 0 5px;
}
</style>