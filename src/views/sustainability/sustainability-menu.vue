<template>
  <div class="esg-advisory">
    <h1 class="text-center mb-8">Sustentabilidade</h1>

    <div class="container mx-auto px-4">
      <div class="row g-4">
        <div v-for="(card, index) in sustainabilityCards" :key="index" class="col-12 col-sm-6 col-lg-4">
          <div class="card h-100" @click="openModal(card.modalType || card.title)">
            <img class="card-img-top" :src="card.image" :alt="card.title">
            <div class="card-body">
              <h5 class="card-title">{{ card.title }}</h5>
              <p class="card-text">{{ card.description }}</p>
              <div class="mb-3">
                <span v-for="(tag, tagIndex) in card.tags" :key="tagIndex" class="badge bg-success me-1">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grievance Mechanism Modal -->
    <div class="modal" v-if="showModal && selectedCard === 'GRIEVANCE'">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Grievance Mechanism Form</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitGrievanceForm">
              <!-- Basic Information -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Informações Básicas</h6>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Nome (opcional)</label>
                    <input 
                      type="text" 
                      v-model="grievanceForm.name" 
                      class="form-control"
                      placeholder="Seu nome"
                    >
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Canal de Recebimento</label>
                    <select v-model="grievanceForm.channel" class="form-control">
                      <option value="">Selecione o Canal</option>
                      <option value="form">Formulário online</option>
                      <option value="email">E-mail</option>
                      <option value="presential">Presencial</option>
                      <option value="phone">Telefone</option>
                    </select>
                  </div>
                  <div class="col-md-12" v-if="grievanceForm.channel === 'email'">
                    <label class="form-label">Endereço de E-mail</label>
                    <input 
                      type="email" 
                      v-model="grievanceForm.emailAddress" 
                      class="form-control"
                      placeholder="seu.email@exemplo.com"
                      required
                    >
                  </div>
                  <div class="col-md-12" v-if="grievanceForm.channel === 'phone'">
                    <label class="form-label">Número de Telefone</label>
                    <input 
                      type="tel" 
                      v-model="grievanceForm.phoneNumber" 
                      class="form-control"
                      placeholder="+258 XX XXX XXXX"
                      pattern="[0-9+\s-]*"
                      required
                    >
                    <small class="text-muted">Formato: +258 XX XXX XXXX</small>
                  </div>
                </div>
              </div>

              <!-- Complaint Details -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Detalhes da Queixa</h6>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Categoria</label>
                    <select v-model="grievanceForm.category" class="form-control" required>
                      <option value="">Selecione a Categoria</option>
                      <option value="harassment">Assédio</option>
                      <option value="safety">Segurança</option>
                      <option value="environment">Meio Ambiente</option>
                      <option value="ethics">Ética</option>
                      <option value="other">Outros</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Descrição da Queixa</label>
                    <textarea 
                      v-model="grievanceForm.description" 
                      class="form-control" 
                      rows="4"
                      required
                      placeholder="Descreva detalhadamente sua queixa"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Processing Information -->
              <div class="analysis-section mb-4">
                <h6 class="section-title">Informações de Processamento</h6>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Urgência</label>
                    <select v-model="grievanceForm.urgency" class="form-control">
                      <option value="">Selecione a Urgência</option>
                      <option value="high">Alta</option>
                      <option value="medium">Média</option>
                      <option value="low">Baixa</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Setor Responsável</label>
                    <select v-model="grievanceForm.department" class="form-control">
                      <option value="">Selecione o Setor</option>
                      <option value="hr">Recursos Humanos</option>
                      <option value="ethics">Comitê de Ética</option>
                      <option value="environmental">Meio Ambiente</option>
                      <option value="safety">Segurança</option>
                      <option value="other">Outro</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Fechar</button>
                <button type="submit" class="btn btn-primary">Enviar Queixa</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sustainability',
  data() {
    return {
      showModal: false,
      selectedCard: null,
      grievanceForm: {
        name: '',
        channel: '',
        emailAddress: '',
        phoneNumber: '',
        category: '',
        description: '',
        urgency: '',
        department: '',
        status: 'Recebido',
        dateReceived: new Date().toISOString()
      },
      sustainabilityCards: [
        {
          title: 'Escopo do Projeto',
          image: '/sigra/Escopodoprojecto2.png',
          description: 'Definição e gerenciamento do escopo do projeto para garantir alinhamento com objetivos sustentáveis.',
          tags: ['Planejamento', 'Gestão', 'Escopo'],
          link: '/project-scope'
        },
        {
          title: 'Impacto nos Stakeholders',
          image: '/sigra/Impacto nos Stakeholders.png',
          description: 'Avaliação e mensuração do impacto das iniciativas nos diferentes grupos de interesse.',
          tags: ['Stakeholders', 'Impacto', 'Análise'],
          link: '/stakeholder-impact'
        },
        {
          title: 'Análise Detalhada de Stakeholders',
          image: '/sigra/Análise Detalhada de Stakeholders.png',
          description: 'Mapeamento e análise aprofundada dos diferentes grupos de interesse e suas necessidades.',
          tags: ['Análise', 'Stakeholders', 'Mapeamento'],
          link: '/detailed-analysis'
        },
        {
          title: 'Stakeholders para Engajamento',
          image: '/sigra/Stakeholders para Engajamento.jpg',
          description: 'Identificação e priorização de stakeholders-chave para ações de engajamento direcionado.',
          tags: ['Engajamento', 'Priorização', 'Stakeholders'],
          link: '/targeted-engagement'
        },
        {
          title: 'Estratégia de Comunicação',
          image: '/sigra/Estratégia de Comunicação.jpg',
          description: 'Desenvolvimento e implementação de estratégias efetivas de comunicação com stakeholders.',
          tags: ['Comunicação', 'Estratégia', 'Gestão'],
          link: '/communication-strategy'
        },
        {
          title: 'Atividades de Engajamento',
          image: '/sigra/Atividades de Engajamento.png',
          description: 'Planejamento e execução de atividades para promover o engajamento dos stakeholders.',
          tags: ['Engajamento', 'Atividades', 'Participação'],
          link: '/engagement-activities'
        },
        {
          title: 'Integração de Feedback',
          image: '/sigra/Integração de Feedback.jpg',
          description: 'Processo de coleta, análise e integração de feedback dos stakeholders no projeto.',
          tags: ['Feedback', 'Integração', 'Melhoria'],
          link: '/feedback-integration'
        },
        {
          title: 'Grivance Mechanism',
          image: '/sigra/Grivance Mechanism.jpg',
          description: 'Processo de coleta, análise e integração de feedback dos stakeholders no projeto.',
          tags: ['Feedback', 'Integração', 'Melhoria'],
          modalType: 'GRIEVANCE'
        }
      ]
    }
  },
  methods: {
    openModal(cardType) {
      this.selectedCard = cardType;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedCard = null;
    },
    submitGrievanceForm() {
      console.log('Grievance form submitted:', this.grievanceForm);
      this.closeModal();
      // Resetar o formulário
      this.grievanceForm = {
        name: '',
        channel: '',
        emailAddress: '',
        phoneNumber: '',
        category: '',
        description: '',
        urgency: '',
        department: '',
        status: 'Recebido',
        dateReceived: new Date().toISOString()
      };
    }
  }
}
</script>

<style scoped>
.esg-advisory {
  padding: 1rem;
  background-color: #f8f9fa;
}

@media (min-width: 768px) {
  .esg-advisory {
    padding: 2rem;
  }
}

.card {
  transition: transform 0.3s ease;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

@media (max-width: 576px) {
  .card-img-top {
    height: 180px;
  }
}

.btn-primary {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-primary:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.card-text {
  color: #212529 !important;
  /* cor escura padrão Bootstrap */
  font-size: 1rem;
  overflow: visible;
  white-space: normal;
}

.modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}

.modal-dialog {
  margin: 1.75rem auto;
  max-width: 800px;
  width: 95%;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.3rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.analysis-section {
  border: 1px solid #dee2e6;
  padding: 1.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-weight: bold;
  margin-bottom: 1rem;
  color: #495057;
}

.form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.375rem 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.modal-footer {
  padding: 1rem;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.col-md-12 {
  transition: all 0.3s ease;
}

.text-muted {
  font-size: 0.875rem;
  color: #6c757d;
  margin-top: 0.25rem;
}
</style>