<template>
    <table class="table">
        <thead>
            <tr>
                <th>Projeto</th>
                <th>Orçamento</th>
                <th>Status</th>
                <th>Conclusão</th>
                <th>Ações</th> <!-- Cabeçalho para as ações -->
            </tr>
        </thead>
        <tbody>
            <tr v-for="project in data" :key="project.id">
                <td>{{ project.title }}</td>
                <td>{{ project.budget }}</td>
                <td>{{ project.status }}</td>
                <td>{{ project.completion }}%</td>
                <td>
                    <button class="btn btn-primary" @click="$emit('edit', project)">Editar</button>
                    <button class="btn btn-danger" @click="$emit('delete', project)">Excluir</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
};
</script> 