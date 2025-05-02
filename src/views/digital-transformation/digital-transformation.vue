<template>
    <div class="commercial">
      <h1 class="text-center mb-8">Transformação Digital</h1>
      
      <div class="container mx-auto px-4">
        <div class="row g-4">
          <div v-for="(item, index) in digitalTransformationMenu" 
               :key="index" 
               class="col-12 col-sm-6 col-lg-4">
            <router-link :to="item.link" class="text-decoration-none">
              <div class="card h-100">
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
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
export default {
  name: 'DigitalTransformation',
  data() {
    return {
      digitalTransformationMenu: [
        {
          name: 'Estratégia Digital',
          icon: '/sigra/Estratégia Digital.jpg',
          description: 'Desenvolvimento e implementação de estratégias para transformação digital.',
          link: '/digital-transformation/strategy',
          tags: ['Estratégia', 'Inovação', 'Planejamento']
        },
        {
          name: 'Cultura Digital',
          icon: '/sigra/Cultura Digital.jpg',
          description: 'Transformação da cultura organizacional para a era digital.',
          link: '/digital-transformation/culture',
          tags: ['Cultura', 'Mudança', 'Pessoas']
        },
        {
          name: 'Automação de Processos',
          icon: '/sigra/Automação de Processos.png',
          description: 'Automatização e otimização de processos empresariais.',
          link: '/digital-transformation/automation',
          tags: ['Automação', 'Eficiência', 'Processos']
        },
        {
          name: 'Cloud Computing',
          icon: '/sigra/Cloud Computing.png',
          description: 'Migração e gerenciamento de infraestrutura e serviços na nuvem.',
          link: '/digital-transformation/cloud-computing',
          tags: ['Cloud', 'Infraestrutura', 'Escalabilidade']
        },
        {
          name: 'Analytics e Dados',
          icon: '/sigra/Analytics e Dados.jpg',
          description: 'Análise de dados e insights para tomada de decisões.',
          link: '/digital-transformation/analytics',
          tags: ['Dados', 'Analytics', 'Insights']
        },
        {
          name: 'Tecnologias Emergentes',
          icon: '/sigra/Tecnologias Emergentes.jpg',
          description: 'Implementação de tecnologias emergentes para inovação.',
          link: '/digital-transformation/emerging-tech',
          tags: ['Inovação', 'Tecnologia', 'Futuro']
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

.btn-primary {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-primary:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

@media (max-width: 576px) {
  .card-img-top {
    height: 180px;
  }
}

.card-text {
  color: #212529; /* Cor escura padrão do Bootstrap */
}
</style>
  
  
  