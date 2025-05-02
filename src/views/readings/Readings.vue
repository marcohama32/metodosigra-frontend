<template>
  <div class="py-4 container-fluid">
    <div class="row g-2 align-items-center d-flex">
      <!-- Contêiner flexível para alinhar os elementos -->
      <div class="col-auto mb-3 d-flex align-items-center">
        <!-- Campo de pesquisa com um tamanho maior e responsivo -->
        <input type="text" v-model="searchUser" class="form-control form-control-md" placeholder="Pesquise por leituras"
          style="width: 350px;" data-bs-toggle="tooltip" title="Pesquisar" />
      </div>
      <div class="col-auto mb-3 d-flex">
        <input type="date" v-model="newData" class="form-control form-control-md" />
      </div>
      <div class="col-auto mb-3 d-flex">
        <input type="date" v-model="newData" class="form-control form-control-md" />
      </div>
      <div class="col-auto d-flex">
        <button class="btn btn-success btn-md" @click="addData">
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
      <div class="col-auto d-flex">
        <button class="btn btn-secondary btn-md" @click="clearData" data-bs-toggle="tooltip" title="Limpar">
          <i class="fa fa-spinner" aria-hidden="true"></i>
        </button>
      </div>
      <!-- Botão "Adicionar" totalmente à direita -->

    </div>
    <div class="row mt-3">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Leituras</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0 table-sm">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">
                      Data da Leitura</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Cliente</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Leitura Atual</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Leitura Anterior</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Consumo</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Imagem do Medidor</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Anomalia</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Localização</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      ID do Cliente</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in paginatedUsers" :key="user.id">
                    <td style="padding: 20px;">{{ user.readingDate }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.currentReading }}</td>
                    <td>{{ user.previousReading }}</td>
                    <td>{{ user.consumption }}</td>
                    <td><img :src="user.meterImage" alt="Imagem do Medidor" style="width: 50px; height: auto;" /></td>
                    <td>{{ user.anomaly }}</td>
                    <td>{{ user.location }}</td>
                    <td>{{ user.clientId }}</td>
                    <td class="align-middle text-center">
                      <!-- Botões movidos para o final -->
                      <button class="btn btn-secondary p-0 me-1" style="width: 30px; height: 30px;"
                        data-bs-toggle="tooltip" title="Editar" @click="editClient(user)">
                        <i class="fa fa-edit text-xs" aria-hidden="true"></i>
                      </button>
                      <button class="btn btn-danger p-0 me-1" style="width: 30px; height: 30px;"
                        data-bs-toggle="tooltip" title="Excluir" @click="deleteClient(user)">
                        <i class="fa fa-trash text-xs" aria-hidden="true"></i>
                      </button>
                      <button class="btn btn-info p-0" style="width: 30px; height: 30px;" data-bs-toggle="tooltip"
                        title="Detalhes" @click="showClientDetails(user)">
                        <i class="fa fa-info text-xs" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination :current-page="currentPage" :total-pages="totalPages" @prev-page="prevPage"
              @next-page="nextPage" />

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
  name: "TablesPage",
  data() {
    return {
      searchUser: '',
      startDate: '',
      endDate: '',
      newData: '',
      usersData: [
        { id: 1, name: 'João Silva', username: 'joaosilva', email: 'joao@example.com', contact: '123456789', readingDate: '2023-10-01', meterImage: 'path/to/image1.jpg', currentReading: 150, previousReading: 120, consumption: 30, anomaly: 'Nenhuma', location: 'Rua A, 123', clientId: 'C001' },
        { id: 2, name: 'Maria Oliveira', username: 'mariaoliveira', email: 'maria@example.com', contact: '987654321', readingDate: '2023-10-02', meterImage: 'path/to/image2.jpg', currentReading: 200, previousReading: 180, consumption: 20, anomaly: 'Nenhuma', location: 'Rua B, 456', clientId: 'C002' },
        { id: 3, name: 'Pedro Santos', username: 'pedrosantos', email: 'pedro@example.com', contact: '1122334455', readingDate: '2023-10-03', meterImage: 'path/to/image3.jpg', currentReading: 250, previousReading: 230, consumption: 20, anomaly: 'Nenhuma', location: 'Rua C, 789', clientId: 'C003' },
        { id: 4, name: 'Ana Costa', username: 'anacosta', email: 'ana@example.com', contact: '6677889900', readingDate: '2023-10-04', meterImage: 'path/to/image4.jpg', currentReading: 300, previousReading: 290, consumption: 10, anomaly: 'Nenhuma', location: 'Rua D, 101', clientId: 'C004' },
        { id: 5, name: 'Carlos Ferreira', username: 'carlosferreira', email: 'carlos@example.com', contact: '5544332211', readingDate: '2023-10-05', meterImage: 'path/to/image5.jpg', currentReading: 350, previousReading: 340, consumption: 10, anomaly: 'Nenhuma', location: 'Rua E, 202', clientId: 'C005' },
        { id: 6, name: 'João Silva', username: 'joaosilva', email: 'joao@example.com', contact: '123456789', readingDate: '2023-10-01', meterImage: 'path/to/image1.jpg', currentReading: 150, previousReading: 120, consumption: 30, anomaly: 'Nenhuma', location: 'Rua A, 123', clientId: 'C001' },
        { id: 7, name: 'Maria Oliveira', username: 'mariaoliveira', email: 'maria@example.com', contact: '987654321', readingDate: '2023-10-02', meterImage: 'path/to/image2.jpg', currentReading: 200, previousReading: 180, consumption: 20, anomaly: 'Nenhuma', location: 'Rua B, 456', clientId: 'C002' },
        { id: 8, name: 'Pedro Santos', username: 'pedrosantos', email: 'pedro@example.com', contact: '1122334455', readingDate: '2023-10-03', meterImage: 'path/to/image3.jpg', currentReading: 250, previousReading: 230, consumption: 20, anomaly: 'Nenhuma', location: 'Rua C, 789', clientId: 'C003' },
        { id: 9, name: 'Ana Costa', username: 'anacosta', email: 'ana@example.com', contact: '6677889900', readingDate: '2023-10-04', meterImage: 'path/to/image4.jpg', currentReading: 300, previousReading: 290, consumption: 10, anomaly: 'Nenhuma', location: 'Rua D, 101', clientId: 'C004' },
        { id: 10, name: 'Carlos Ferreira', username: 'carlosferreira', email: 'carlos@example.com', contact: '5544332211', readingDate: '2023-10-05', meterImage: 'path/to/image5.jpg', currentReading: 350, previousReading: 340, consumption: 10, anomaly: 'Nenhuma', location: 'Rua E, 202', clientId: 'C005' },
        { id: 11, name: 'Carlos Ferreira', username: 'carlosferreira', email: 'carlos@example.com', contact: '5544332211', readingDate: '2023-10-05', meterImage: 'path/to/image5.jpg', currentReading: 350, previousReading: 340, consumption: 10, anomaly: 'Nenhuma', location: 'Rua E, 202', clientId: 'C005' },
        { id: 12, name: 'Carlos Ferreira', username: 'carlosferreira', email: 'carlos@example.com', contact: '5544332211', readingDate: '2023-10-05', meterImage: 'path/to/image5.jpg', currentReading: 350, previousReading: 340, consumption: 10, anomaly: 'Nenhuma', location: 'Rua E, 202', clientId: 'C005' },
        { id: 13, name: 'Carlos Ferreira', username: 'carlosferreira', email: 'carlos@example.com', contact: '5544332211', readingDate: '2023-10-05', meterImage: 'path/to/image5.jpg', currentReading: 350, previousReading: 340, consumption: 10, anomaly: 'Nenhuma', location: 'Rua E, 202', clientId: 'C005' },
        { id: 14, name: 'Carlos Ferreira', username: 'carlosferreira', email: 'carlos@example.com', contact: '5544332211', readingDate: '2023-10-05', meterImage: 'path/to/image5.jpg', currentReading: 350, previousReading: 340, consumption: 10, anomaly: 'Nenhuma', location: 'Rua E, 202', clientId: 'C005' },
        { id: 15, name: 'Carlos Ferreira', username: 'carlosferreira', email: 'carlos@example.com', contact: '5544332211', readingDate: '2023-10-05', meterImage: 'path/to/image5.jpg', currentReading: 350, previousReading: 340, consumption: 10, anomaly: 'Nenhuma', location: 'Rua E, 202', clientId: 'C005' },
        { id: 16, name: 'Carlos Ferreira', username: 'carlosferreira', email: 'carlos@example.com', contact: '5544332211', readingDate: '2023-10-05', meterImage: 'path/to/image5.jpg', currentReading: 350, previousReading: 340, consumption: 10, anomaly: 'Nenhuma', location: 'Rua E, 202', clientId: 'C005' },
        { id: 17, name: 'Carlos Ferreira', username: 'carlosferreira', email: 'carlos@example.com', contact: '5544332211', readingDate: '2023-10-05', meterImage: 'path/to/image5.jpg', currentReading: 350, previousReading: 340, consumption: 10, anomaly: 'Nenhuma', location: 'Rua E, 202', clientId: 'C005' },

        // ... outros usuários
      ],
      sortKey: 'cliente',
      sortOrder: 'asc',
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.usersData.length / this.itemsPerPage);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.usersData.slice(start, start + this.itemsPerPage);
    },
    filteredUsers() {
      return this.usersData.filter(user => {
        const matchesClient = this.searchUser ? user.name.toLowerCase().includes(this.searchUser.toLowerCase()) : true;
        return matchesClient;
      });
    },
  },
  methods: {
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
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    addData() {
      if (this.newData) {
        this.usersData.push({ id: this.usersData.length + 1, name: this.newData });
        this.newData = '';
      }
    },
    editUser(user) {
      console.log('Editando usuário:', user);
    },
    deleteUser(user) {
      console.log('Excluindo usuário:', user);
    },
    clearData() {
      this.newData = '';
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