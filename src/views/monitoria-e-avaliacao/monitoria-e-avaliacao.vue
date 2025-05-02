<template>
    <div class="esg-advisory">
      <h1 class="text-center mb-4 mb-md-8">Eficiência Operacional</h1>
      
      <div class="container mx-auto px-2 px-sm-4">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 g-md-4">
          <div class="col" v-for="(card, index) in operationalCards" :key="index">
            <router-link :to="card.link" class="text-decoration-none">
              <div class="card h-100">
                <div class="card-img-wrapper">
                  <img class="card-img-top" :src="card.image" :alt="card.title">
                </div>
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title mb-2">{{ card.title }}</h5>
                  <p class="card-text flex-grow-1">{{ card.description }}</p>
                  <div class="mt-auto">
                    <span v-for="(tag, tagIndex) in card.tags" 
                          :key="tagIndex"
                          class="badge bg-success me-1 mb-1">
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
    name: 'EficienciaOperacional',
    data() {
      return {
        operationalCards: [
          {
            title: 'Monitoramento da Produção',
            image: './src/assets/img/sigra/Monitoramento da Produção.png',
            description: 'Maximização da eficiência produtiva através de análise de processos e implementação de melhorias contínuas.',
            tags: ['Eficiência', 'Produção', 'Monitoramento'],
            link: '/monitoramento-producao'
          },
          {
            title: 'Coleta e Análise de Dados',
            image: './src/assets/img/sigra/Coleta e Análise de Dados.png',
            description: 'Estratégias avançadas de manutenção preventiva e preditiva para maximizar a vida útil dos equipamentos.',
            tags: ['Análise de Dados', 'Manutenção', 'Gestão de Ativos'],
            link: '/coleta-analise-dados'
          },
          {
            title: 'Modelagem e Simulação de Reservatórios',
            image: './src/assets/img/sigra/Modelagem e Simulação de Reservatórios.jpg',
            description: 'Soluções para redução do consumo energético e implementação de práticas sustentáveis.',
            tags: ['Modelagem', 'Simulação', 'Sustentabilidade'],
            link: '/modelagem-simulacao'
          },
          {
            title: 'Análise de Integridade dos Poços',
            image: './src/assets/img/sigra/Análise de Integridade dos Poços.png',
            description: 'Gestão integrada da cadeia de suprimentos e logística para redução de custos e maior eficiência.',
            tags: ['Integridade', 'Logística', 'Eficiência'],
            link: '/analise-integridade'
          },
          {
            title: 'Gestão de Dados e Tomada de Decisão',
            image: './src/assets/img/sigra/Gestão de Dados e Tomada de Decisão.jpg',
            description: 'Implementação de tecnologias Industry 4.0 e soluções de automação para processos mais eficientes.',
            tags: ['Dados', 'Decisão', 'Indústria 4.0'],
            link: '/gestao-dados'
          },
          {
            title: 'Segurança e Conformidade',
            image: './src/assets/img/sigra/Segurança e Conformidade Regulatória.png',
            description: 'Gestão de segurança operacional e adequação às normas regulatórias do setor.',
            tags: ['Segurança', 'Compliance', 'Regulamentação'],
            link: '/seguranca-conformidade'
          },
          {
            title: 'Monitoramento de Injeção de Água e Gás',
            image: './src/assets/img/sigra/Monitoramento de Injeção de Água e Gás.jpg',
            description: 'Avaliação contínua da eficiência de injeção de água e gás para otimização de produção.',
            tags: ['Injeção', 'Água', 'Gás'],
            link: '/monitoramento-injecao'
          },
          {
            title: 'Análise de Declínio',
            image: './src/assets/img/sigra/Análise de Declínio e Recuperação.png',
            description: 'Estudo de tendências de declínio de produção para previsão e planejamento.',
            tags: ['Declínio', 'Produção', 'Análise'],
            link: '/analise-declinio'
          },
          {
            title: 'Monitoramento Sísmico 4D',
            image: './src/assets/img/sigra/Monitoramento Sísmico 4D.webp',
            description: 'Monitoramento em tempo real de atividades sísmicas para segurança e eficiência.',
            tags: ['Sísmico', '4D', 'Monitoramento'],
            link: '/monitoramento-sismico'
          },
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
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    background-color: #fff;
    border: none;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .card-img-wrapper {
    position: relative;
    padding-top: 60%; /* 3:5 Aspect Ratio */
    overflow: hidden;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  .card-img-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .card-body {
    padding: 1.25rem;
  }
  
  .card-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    line-height: 1.3;
  }
  
  .card-text {
    font-size: 0.9rem;
    color: #6c757d;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
  
  .badge {
    padding: 0.5em 0.8em;
    font-size: 0.75rem;
    font-weight: 500;
    display: inline-block;
  }
  
  /* Responsive adjustments */
  @media (max-width: 575.98px) {
    .container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    
    .card-title {
      font-size: 1rem;
    }
    
    .card-text {
      font-size: 0.85rem;
    }
    
    .badge {
      font-size: 0.7rem;
    }
  }
  
  @media (min-width: 576px) and (max-width: 767.98px) {
    .card-img-wrapper {
      padding-top: 65%; /* Slightly taller images on tablets */
    }
  }
  
  @media (min-width: 768px) and (max-width: 991.98px) {
    .card-img-wrapper {
      padding-top: 56.25%; /* 16:9 Aspect Ratio */
    }
  }
  
  @media (min-width: 992px) {
    .card-img-wrapper {
      padding-top: 60%; /* Back to 3:5 on larger screens */
    }
  }
  </style>
  
  
  