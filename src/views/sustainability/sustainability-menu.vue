<template>
    <div class="esg-advisory">
      <h1 class="text-center mb-8">Sustentabilidade</h1>
      
      <div class="container mx-auto px-4">
        <div class="row g-4">
          <div v-for="(card, index) in sustainabilityCards" 
               :key="index" 
               class="col-12 col-sm-6 col-lg-4">
            <router-link :to="card.link" class="text-decoration-none">
              <div class="card h-100">
                <img class="card-img-top" :src="card.image" :alt="card.title">
                <div class="card-body">
                  <h5 class="card-title">{{ card.title }}</h5>
                  <p class="card-text">{{ card.description }}</p>
                  <div class="mb-3">
                    <span v-for="(tag, tagIndex) in card.tags" 
                          :key="tagIndex"
                          class="badge bg-success me-1">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </router-link>
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
        sustainabilityCards: [
          {
            title: 'Escopo do Projeto',
            image: '/sigra/Escopo do projeto.jpg',
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
          }
        ]
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
    color: #212529 !important; /* cor escura padrão Bootstrap */
    font-size: 1rem;
    overflow: visible;
    white-space: normal;
  }
  </style>
  
  
  