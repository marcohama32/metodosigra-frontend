<template>
    <div class="esg-advisory">
      <h1 class="text-center mb-8">Eficiência Operacional</h1>
      
      <div class="container mx-auto px-4">
        <div class="row g-4">
          <div v-for="(card, index) in operationalCards" 
               :key="index" 
               class="col-12 col-sm-6 col-lg-4">
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
            title: 'Otimização de Produção',
            image: '/sigra/Otimização de Produção 2.jpg',
            description: 'Maximização da eficiência produtiva através de análise de processos e implementação de melhorias contínuas.',
            tags: ['Lean Manufacturing', 'Processos']
          },
          {
            title: 'Gestão de Ativos e Manutenção',
            image: '/sigra/Gestão de Ativos e Manutenção.jpg',
            description: 'Estratégias avançadas de manutenção preventiva e preditiva para maximizar a vida útil dos equipamentos.',
            tags: ['Manutenção', 'Gestão de Ativos']
          },
          {
            title: 'Eficiência Energética',
            image: '/sigra/Eficiência Energética.jpg',
            description: 'Soluções para redução do consumo energético e implementação de práticas sustentáveis.',
            tags: ['Energia', 'Sustentabilidade']
          },
          {
            title: 'Otimização de Supply Chain',
              image: '/sigra/Otimização de Supply Chain.png',
            description: 'Gestão integrada da cadeia de suprimentos e logística para redução de custos e maior eficiência.',
            tags: ['Logística', 'Supply Chain']
          },
          {
            title: 'Digitalização e Automação',
            image: '/sigra/Digitalização e Automação.png',
            description: 'Implementação de tecnologias Industry 4.0 e soluções de automação para processos mais eficientes.',
            tags: ['Automação', 'Indústria 4.0']
          },
          {
            title: 'Segurança e Conformidade',
            image: '/sigra/Segurança e Conformidade.jpg',
            description: 'Gestão de segurança operacional e adequação às normas regulatórias do setor.',
            tags: ['Segurança', 'Compliance']
          },
          
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .esg-advisory {
    padding: 2rem;
    background-color: #f8f9fa;
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
  
  .btn-primary {
    background-color: #28a745;
    border-color: #28a745;
  }
  
  .btn-primary:hover {
    background-color: #218838;
    border-color: #1e7e34;
  }
  .card-text {
  color: #212529; /* Cor escura padrão do Bootstrap */
}
  </style>
  
  
  