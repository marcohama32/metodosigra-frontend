<template>
  <div class="esg-advisory">
    <h1 class="text-center mb-8">ESG Advisory</h1>
    
    <div class="container mx-auto px-4">
      <div class="row g-4">
        <div v-for="(card, index) in esgCards" 
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
  name: 'EsgAdvisory',
  data() {
    return {
      esgCards: [
        {
          title: 'Diagnóstico ESG',
          image: './src/assets/img/sigra/Diagnóstico ESG.png',
          description: 'Análise completa da maturidade ESG e identificação de oportunidades.',
          tags: ['Diagnóstico', 'Benchmark']
        },
        {
          title: 'Governança',
          image: './src/assets/img/sigra/Governança.png',
          description: 'Estruturação de políticas e comitês ESG.',
          tags: ['Governança', 'Compliance']
        },
        {
          title: 'Relatórios ESG',
          image: './src/assets/img/sigra/Relatórios ESG.webp',
          description: 'Relatórios alinhados aos frameworks GRI, SASB e TCFD.',
          tags: ['Reporting', 'GRI']
        },
        {
          title: 'Gestão Climática',
          image: './src/assets/img/sigra/Gestão Climática.jpg',
          description: 'Inventário GEE e estratégias de descarbonização.',
          tags: ['Clima', 'Net Zero']
        },
        {
          title: 'Stakeholders',
          image: './src/assets/img/sigra/Stakeholders.jpg',
          description: 'Mapeamento e engajamento de stakeholders.',
          tags: ['Engajamento', 'Comunicação']
        },
        {
          title: 'Finanças ESG',
          image: './src/assets/img/sigra/Finanças ESG.webp',
          description: 'Assessoria em green bonds e produtos sustentáveis.',
          tags: ['Finanças', 'Green Bonds']
        },
        {
          title: 'Biodiversidade',
          image: './src/assets/img/sigra/Biodiversidade.jpg',
          description: 'Gestão de impactos na biodiversidade e capital natural.',
          tags: ['Biodiversidade', 'Natural']
        },
        {
          title: 'Cadeia de Valor',
          image: './src/assets/img/sigra/Cadeia de Valor.png',
          description: 'Gestão ESG na cadeia de fornecedores.',
          tags: ['Fornecedores', 'Supply Chain']
        },
        
      ]
    }
  }
}
</script>

<style scoped>
.esg-advisory {
  padding: 1rem;
}

@media (min-width: 768px) {
  .esg-advisory {
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


