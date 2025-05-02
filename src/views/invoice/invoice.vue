<template>
    <div class="py-4 container-fluid">
        <div class="row g-2 align-items-center d-flex">
            <!-- Contêiner flexível para alinhar os elementos -->
            <div class="col-auto mb-3 d-flex align-items-center">
                <!-- Campo de pesquisa com um tamanho maior e responsivo -->
                <input type="text" v-model="searchInvoice" class="form-control form-control-md"
                    placeholder="Pesquise por faturas" style="width: 350px;" data-bs-toggle="tooltip"
                    title="Pesquisar" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="startDate" class="form-control form-control-md" />
            </div>
            <div class="col-auto mb-3 d-flex">
                <input type="date" v-model="endDate" class="form-control form-control-md" />
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-success btn-md" @click="searchInvoices">
                    <i class="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <div class="col-auto d-flex">
                <button class="btn btn-secondary btn-md" @click="clearData" data-bs-toggle="tooltip" title="Limpar">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Faturas</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0 table-sm">
                                <thead>
                                    <tr>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">
                                            Data do Pagamento</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            ID da Fatura</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Valor da Fatura</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Valor Pago</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Valor Remanescente</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Crédito Disponível</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Data de Expiração</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Fonte</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Nome do Cliente</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Status</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                                            Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="invoice in paginatedInvoices" :key="invoice.id">
                                        <td style="padding: 20px;">{{ invoice.paymentDate }}</td>
                                        <td>{{ formatInvoiceId(invoice) }}</td>
                                        <td>{{ invoice.invoiceAmount }}</td>
                                        <td>{{ invoice.paymentAmount }}</td>
                                        <td>{{ invoice.remainingAmount }}</td>
                                        <td>{{ invoice.availableCredit }}</td>
                                        <td>{{ invoice.expirationDate }}</td>
                                        <td>{{ invoice.source }}</td>
                                        <td>{{ invoice.clientName }}</td>
                                        <td>
                                            <span :class="{
                                                'text-success': invoice.status === 'Pago',
                                                'text-warning': invoice.status === 'Pago Parcial',
                                                'text-danger': invoice.status === 'Não Pago',
                                                'text-secondary': invoice.status === 'Cancelada'
                                            }">{{ invoice.status }}</span>
                                        </td>
                                        <td class="align-middle text-center">

                                            <button class="btn btn-secondary p-0 me-1"
                                                style="width: 30px; height: 30px;" data-bs-toggle="tooltip"
                                                title="Pagamentos" @click="viewPayments(invoice)">
                                                <i class="fa fa-money-bill-wave text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-primary p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Visualizar"
                                                @click="showInvoiceDetails(invoice)">
                                                <i class="fa fa-eye text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-success p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Extracto" @click="showExtract(invoice)">
                                                <i class="fa fa-file-alt text-xs" aria-hidden="true"></i>
                                            </button>
                                            <button class="btn btn-danger p-0 me-1" style="width: 30px; height: 30px;"
                                                data-bs-toggle="tooltip" title="Cancelar"
                                                @click="cancelInvoice(invoice)">
                                                <i class="fa fa-ban text-xs" aria-hidden="true"></i>
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
        <!-- Modal de Confirmação -->
        <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmModalLabel">Tem certeza?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Esta ação é irreversível!
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não, manter</button>
                        <button type="button" class="btn btn-danger" @click="confirmCancel">Sim, cancelar!</button>
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
    name: "InvoicesPage",
    data() {
        return {
            searchInvoice: '',
            startDate: '',
            endDate: '',
            invoicesData: [
                { id: 1, paymentDate: '10/8/2024', invoiceId: 'tAiQ0mfuqTLUBnolALdFGr', invoiceAmount: 164.8, paymentAmount: 164.8, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Credito', status: 'Pago', district: 'Maputo', clientName: 'Cliente A' },
                { id: 2, paymentDate: '10/8/2024', invoiceId: 'tAiQ0mfuqTLUBnolALdFGr', invoiceAmount: 100, paymentAmount: 100, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente B' },
                { id: 3, paymentDate: '10/8/2024', invoiceId: 'tAiQ0mfuqTLUBnolALdFGr', invoiceAmount: 345, paymentAmount: 345, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente C' },
                { id: 4, paymentDate: '10/8/2024', invoiceId: 'uR0P8RgDixIvZbIi4TKg29', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente D' },
                { id: 5, paymentDate: '10/8/2024', invoiceId: 'uR0P8RgDixIvZbIi4TKg29', invoiceAmount: 617.6, paymentAmount: 617.6, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Credito', status: 'Pago', district: 'Maputo', clientName: 'Cliente E' },
                { id: 6, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente F' },
                { id: 7, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente G' },
                { id: 8, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente H' },
                { id: 9, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente I' },
                { id: 10, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente J' },
                { id: 11, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente K' },
                { id: 12, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente L' },
                { id: 13, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente M' },
                { id: 14, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente N' },
                { id: 15, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente O' },
                { id: 16, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente P' },
                { id: 17, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente Q' },
                { id: 18, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente R' },
                { id: 19, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente S' },
                { id: 20, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente T' },
                { id: 21, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente U' },
                { id: 22, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente V' },
                { id: 23, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente W' },
                { id: 24, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Dinheiro', status: 'Pago', district: 'Maputo', clientName: 'Cliente X' },
                { id: 25, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 0, remainingAmount: 200, availableCredit: 0, expirationDate: '10/15/2024', source: 'Credito', status: 'Não Pago', district: 'Maputo', clientName: 'Cliente Y' },
                { id: 26, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 100, remainingAmount: 100, availableCredit: 0, expirationDate: '10/15/2024', source: 'Credito', status: 'Pago Parcial', district: 'Maputo', clientName: 'Cliente Z' },
                { id: 27, paymentDate: '10/8/2024', invoiceId: 'aMD54jDrsh4LCBPeCWJmUd', invoiceAmount: 200, paymentAmount: 200, remainingAmount: 0, availableCredit: 0, expirationDate: '10/15/2024', source: 'Credito', status: 'Cancelada', district: 'Maputo', clientName: 'Cliente AA' },
            ],
            currentPage: 1,
            itemsPerPage: 8,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.invoicesData.length / this.itemsPerPage);
        },
        paginatedInvoices() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.invoicesData.slice(start, start + this.itemsPerPage);
        },
    },
    methods: {
        formatInvoiceId(invoice) {
            const districtInitials = invoice.district.substring(0, 3).toUpperCase();
            return `FAC-${districtInitials}-${String(invoice.id).padStart(3, '0')}`;
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
        addInvoice() {
            // Lógica para adicionar uma nova fatura
        },
        editInvoice(invoice) {
            console.log('Editando fatura:', invoice);
        },
        deleteInvoice(invoice) {
            console.log('Excluindo fatura:', invoice);
        },
        clearData() {
            this.searchInvoice = '';
            this.startDate = '';
            this.endDate = '';
        },
        searchInvoices() {
            // Lógica para pesquisar faturas com base nos campos de entrada
        },
        cancelInvoice(invoice) {
            this.invoiceToCancel = invoice; // Armazena a fatura a ser cancelada
            const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
            modal.show();
        },
        confirmCancel() {
            // Lógica para excluir a fatura
            this.invoicesData = this.invoicesData.filter(inv => inv.id !== this.invoiceToCancel.id);
            console.log('Fatura excluída:', this.invoiceToCancel);
            const modal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
            modal.hide();
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