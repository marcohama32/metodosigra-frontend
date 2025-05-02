<template>
    <div class="commercial">
      <h1 class="text-center mb-8">Comercial</h1>
      
      <div class="container mx-auto px-4">
        <div class="row">
          <div v-for="(item, index) in commercialMenu" 
               :key="index" 
               class="col-12 col-sm-6 col-lg-4 mb-4">
            <div class="card h-100">
              <router-link :to="item.link">
                <img class="card-img-top" :src="item.icon" :alt="item.name">
                <div class="card-body">
                  <h5 class="card-title">{{ item.name }}</h5>
                  <p class="card-text">{{ item.description }}</p>
                  <div class="mb-3">
                    <span v-for="(tag, tagIndex) in item.tags" 
                          :key="tagIndex"
                          class="badge bg-success me-1">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
export default {
  name: 'Commercial',
  data() {
    return {
      commercialMenu: [
        {
          name: 'Planejamento Estratégico de Vendas',
          icon: '/sigra/Planejamento Estratégico de Vendas.jpg',
          description: 'Desenvolvimento de estratégias e planos de ação para maximizar resultados comerciais.',
          link: '/commercial/strategic-planning',
          tags: ['Estratégia', 'Vendas', 'Planejamento']
        },
        {
          name: 'Desenvolvimento de Processos Comerciais',
          icon: '/sigra/Desenvolvimento de Processos Comerciais.jpg',
          description: 'Estruturação e otimização de processos para maior eficiência comercial.',
          link: '/commercial/process-development',
          tags: ['Processos', 'Metodologia', 'Comercial']
        },
        {
          name: 'Treinamento e Capacitação de Equipes',
          icon: '/sigra/Treinamento e Capacitação de Equipes.png',
          description: 'Programas de desenvolvimento e capacitação para equipes comerciais.',
          link: '/commercial/team-training',
          tags: ['Treinamento', 'Capacitação', 'Equipe']
        },
        {
          name: 'Prospecção e Geração de Leads',
          icon: '/sigra/Prospecção e Geração de Leads.png',
          description: 'Estratégias e ferramentas para identificação e captação de novos clientes.',
          link: '/commercial/lead-generation',
          tags: ['Leads', 'Prospecção', 'Marketing']
        },
        {
          name: 'Otimização do Relacionamento com Clientes',
          icon: '/sigra/Otimização do Relacionamento com Clientes.png',
          description: 'Gestão e aprimoramento do relacionamento com clientes para maior retenção.',
          link: '/commercial/customer-relationship',
          tags: ['CRM', 'Relacionamento', 'Clientes']
        },
        {
          name: 'Análise de Indicadores e Resultados',
          icon: '/sigra/Análise de Indicadores e Resultados.png',
          description: 'Monitoramento e análise de KPIs comerciais para tomada de decisão.',
          link: '/commercial/analytics',
          tags: ['KPIs', 'Análise', 'Resultados']
        },
        {
          name: 'Expansão e Crescimento do Negócio',
          icon: '/sigra/Expansão e Crescimento do Negócio.png',
          description: 'Estratégias para expansão de mercado e crescimento sustentável.',
          link: '/commercial/business-growth',
          tags: ['Crescimento', 'Expansão', 'Negócios']
        }
      ]
    }
  }
}
</script>
  
<style scoped>
.commercial {
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

.card-body {
  padding: 1.25rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.card-text {
  font-size: 0.95rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.badge {
  font-size: 0.75rem;
  padding: 0.4rem 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 575.98px) {
  .commercial {
    padding: 1rem;
  }
  
  .card-img-top {
    height: 180px;
  }
}

@media (min-width: 576px) and (max-width: 991.98px) {
  .card-img-top {
    height: 190px;
  }
}
</style>
  
  
  