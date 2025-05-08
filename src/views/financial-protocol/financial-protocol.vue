<template>
    <div class="financial-protocol">
      <h1 class="text-center mb-8">Financial Protocol</h1>
      
      <div class="container mx-auto px-4">
        <div class="row g-4">
          <div v-for="(card, index) in protocolCards" 
               :key="index" 
               class="col-12 col-sm-6 col-lg-4">
            <router-link v-if="card.link" :to="card.link" class="text-decoration-none">
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
            <div v-else class="card h-100">
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
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FinancialProtocol',
    data() {
      return {
        protocolCards: [
          {
            title: 'Estrutura Organizacional Financeira',
            image: '/sigra/Estrutura Organizacional Financeira.png',
            description: 'Definição clara das responsabilidades e fluxos financeiros da organização',
            tags: ['Organização', 'Governança', 'Processos'],
            link: '/financial-protocol/estrutura-organizacional'
          },
          {
            title: 'Planejamento Financeiro',
            image: '/sigra/Planejamento Financeiro.jpg',
            description: 'Estratégias e projeções para gestão financeira eficiente',
            tags: ['Orçamento', 'Projeções', 'Planejamento'],
            link: '/financial-protocol/planejamento'
          },
          {
            title: 'Políticas de Contabilidade',
            image: '/sigra/Políticas de Contabilidade.png',
            description: 'Diretrizes e padrões para registros contábeis',
            tags: ['Contabilidade', 'IFRS', 'Compliance'],
            link: '/financial-protocol/politicas-contabeis'
          },
          {
            title: 'Gestão de Pagamentos',
            image: '/sigra/Gestão de Pagamentos.jpg',
            description: 'Processos e controles para gestão de despesas',
            tags: ['Pagamentos', 'Despesas', 'Controle'],
            link: '/financial-protocol/gestao-pagamentos'
          },
          {
            title: 'Gestão de Receitas',
            image: '/sigra/Gestão de Receitas.jpg',
            description: 'Controle e acompanhamento das entradas financeiras',
            tags: ['Receitas', 'Faturamento', 'Cobrança'],
            link: '/financial-protocol/gestao-receitas'
          },
          {
            title: 'Controle Bancário',
            image: '/sigra/Controle Bancário.jpg',
            description: 'Gestão e controle das operações bancárias',
            tags: ['Banco', 'Conciliação', 'Investimentos'],
            link: '/financial-protocol/controle-bancario'
          },
          {
            title: 'Gestão de Documentação',
            image: '/sigra/Gestão de Documentação.jpg',
            description: 'Organização e controle de documentos financeiros',
            tags: ['Documentação', 'Arquivo', 'Compliance'],
            link: '/financial-protocol/documentacao'
          },
          {
            title: 'Segurança e Controle Interno',
            image: '/sigra/Segurança e Controle Interno.png',
            description: 'Medidas de proteção e controle dos processos financeiros',
            tags: ['Segurança', 'Auditoria', 'Controle'],
            link: '/financial-protocol/seguranca'
          },
          {
            title: 'Relatórios Financeiros',
                image: '/sigra/Relatórios Financeiros.jpg',
            description: 'Geração e análise de informações financeiras',
            tags: ['Relatórios', 'KPIs', 'Análise'],
            link: '/financial-protocol/relatorios'
          },
          {
            title: 'Conformidade Legal e Tributária',
            image: '/sigra/Conformidade Legal e Tributária.jpg',
            description: 'Gestão das obrigações legais e tributárias',
            tags: ['Legal', 'Tributário', 'Compliance'],
            link: '/financial-protocol/conformidade'
          },
          {
            title: 'Contratos e Parcerias',
            image: '/sigra/Contratos e Parcerias.png',
            description: 'Gestão de acordos e relacionamentos comerciais',
            tags: ['Contratos', 'Parcerias', 'Gestão'],
            link: '/financial-protocol/contratos'
          }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .financial-protocol {
    padding: 1rem;
  }
  
  @media (min-width: 768px) {
    .financial-protocol {
      padding: 2rem;
    }
  }
  
  .card {
    transition: transform 0.2s;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  
  .card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .card-text {
    color: #222 !important;
    font-size: 1rem;
  }
  </style>
  
  
  