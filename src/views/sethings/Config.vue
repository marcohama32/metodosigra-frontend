<template>
    <div class="py-4 container-fluid">
        <h4>Configurações</h4>
        <div class="row g-2 align-items-center d-flex">
            <div class="col-md-4">
                <router-link to="/provincias" class="card text-center card-small bg-primary text-white">
                    <div class="card-body">
                        <i class="fas fa-map-marker-alt"></i>
                        <h5 class="card-title">Províncias</h5>
                        <p class="card-text">Clique para cadastrar novas províncias.</p>
                    </div>
                </router-link>
            </div>
            <div class="col-md-4">
                <router-link to="/distritos" class="card text-center card-small bg-success text-white">
                    <div class="card-body">
                        <i class="fas fa-building"></i>
                        <h5 class="card-title">Distritos</h5>
                        <p class="card-text">Clique para cadastrar novos distritos.</p>
                    </div>
                </router-link>
            </div>
            <div class="col-md-4">
                <router-link to="/bairros" class="card text-center card-small bg-warning text-dark">
                    <div class="card-body">
                        <i class="fas fa-home"></i>
                        <h5 class="card-title">Bairros</h5>
                        <p class="card-text">Clique para cadastrar novos bairros.</p>
                    </div>
                </router-link>
            </div>
            <div class="col-md-4">
                <router-link to="/tarifas" class="card text-center card-small bg-info text-white">
                    <div class="card-body">
                        <i class="fas fa-tags"></i>
                        <h5 class="card-title">Tarifa</h5>
                        <p class="card-text">Clique para gerenciar tarifas.</p>
                    </div>
                </router-link>
            </div>
            <div class="col-md-4">
                <router-link to="/categorias" class="card text-center card-small bg-secondary text-white">
                    <div class="card-body">
                        <i class="fas fa-th-list"></i>
                        <h5 class="card-title">Categorias</h5>
                        <p class="card-text">Clique para gerenciar categorias.</p>
                    </div>
                </router-link>
            </div>
            <div class="col-md-4">
                <router-link to="/departamentos" class="card text-center card-small bg-info text-white">
                    <div class="card-body">
                        <i class="fas fa-sitemap"></i>
                        <h5 class="card-title">Departamentos</h5>
                        <p class="card-text">Clique para gerenciar departamentos.</p>
                    </div>
                </router-link>
            </div>
            <div class="col-md-4">
                <router-link to="/infracoes" class="card text-center card-small"
                    style="background-color: #007bff; color: #ffffff;">
                    <div class="card-body">
                        <i class="fas fa-exclamation-triangle" style="color: #ffffff;"></i>
                        <h5 class="card-title" style="color: #ffffff;">Infrações</h5>
                        <p class="card-text" style="color: #ffffff;">Clique para gerenciar infracções.</p>
                    </div>
                </router-link>
            </div>

            <div class="col-md-4" >
                <router-link to="/impoistobeneficios" style="background-color: #94db7d; color: #99ed7d;" class="card text-center card-small bg-success text-white" >
                    <div class="card-body">
                        <i class="fas fa-gift"></i>
                        <h5 class="card-title" >Impostos e Benefícios</h5>
                        <p class="card-text">Clique para gerenciar benefícios.</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style>
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: transform 0.2s;
    cursor: pointer;
}

.card-small {
    padding: 10px;
    font-size: 0.9rem;
}

.card:hover {
    transform: scale(1.05);
}

.card-title {
    font-size: 1.2rem;
    font-weight: bold;
}

.card-text {
    color: #fff;
}

.custom-bg {
    background-color: #94db7d !important; /* Cor de fundo do cartão */
    color: #99ed7d !important; /* Cor do texto do cartão */
}
</style>