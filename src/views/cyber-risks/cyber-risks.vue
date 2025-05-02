<template>
    <div class="commercial">
      <h1 class="text-center mb-8">Riscos Cibernéticos</h1>
      
      <div class="container mx-auto px-4">
        <div class="row g-4">
          <div v-for="(item, index) in cyberRisksMenu" 
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
  name: 'CyberRisks',
  data() {
    return {
      cyberRisksMenu: [
        {
          name: 'Avaliação de Vulnerabilidades',
          icon: '/sigra/Avaliação de Vulnerabilidades.png',
          description: 'Identificação e análise de vulnerabilidades em sistemas e infraestrutura de TI.',
          link: '/cyber-risks/vulnerability-assessment',
          tags: ['Segurança', 'Vulnerabilidades', 'Análise']
        },
        {
          name: 'Gestão de Ameaças',
          icon: '/sigra/Gestão de Ameaças.jpg',
          description: 'Monitoramento e gestão de ameaças cibernéticas em tempo real.',
          link: '/cyber-risks/threat-management',
          tags: ['Ameaças', 'Monitoramento', 'Proteção']
        },
        {
          name: 'Conformidade e Regulamentações',
          icon: '/sigra/Conformidade e Regulamentações.jpg',
          description: 'Adequação às normas e regulamentações de segurança cibernética.',
          link: '/cyber-risks/compliance',
          tags: ['Compliance', 'LGPD', 'Normas']
        },
        {
          name: 'Resposta a Incidentes',
          icon: '/sigra/Resposta a Incidentes.png',
          description: 'Planos e procedimentos para resposta rápida a incidentes de segurança.',
          link: '/cyber-risks/incident-response',
          tags: ['Incidentes', 'Resposta', 'Contingência']
        },
        {
          name: 'Treinamento em Segurança',
          icon: '/sigra/Treinamento em Segurança.jpg',
          description: 'Capacitação de equipes em práticas de segurança cibernética.',
          link: '/cyber-risks/security-training',
          tags: ['Treinamento', 'Conscientização', 'Educação']
        },
        {
          name: 'Proteção de Dados',
          icon: '/sigra/Proteção de Dados.png',
          description: 'Estratégias e ferramentas para proteção de dados sensíveis.',
          link: '/cyber-risks/data-protection',
          tags: ['Dados', 'Privacidade', 'Segurança']
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
  height: 100%; /* Garante que todos os cards tenham a mesma altura */
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
  color: #212529;  /* Adiciona cor escura ao texto da descrição */
}
</style>
  
  
  