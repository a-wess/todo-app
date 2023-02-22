<template>
    <div class="task-form-root">
        <div style="display: flex;">
            <template v-if="!isLoading">
                <input v-model="text">
                <button @click="() => type === 'ADD' ? upload() : search()">
                    {{ type === 'ADD' ? 'Создать' : 'Поиск' }}
                </button>
            </template>
            <loader v-else style="margin: auto auto;" />
        </div>
        <p v-if="error.length > 0" style="color: red">
            {{ error }}
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import API from "@/services/tasks.api.js";
import Loader from "@/components/Loader.vue";

const emit = defineEmits(['created', 'updated'])
const props = defineProps(['type'])
const text = ref('')
const error = ref('')
const isLoading = ref(false)

function upload() {
    error.value = ''
    isLoading.value = true;
    API.create({ text: text.value })
        .then(resp => {
            text.value = '';
            emit('created', resp.data)
        })
        .catch(err => error.value = err.message)
        .finally(() => isLoading.value = false)
}

function search() {
    error.value = ''
    isLoading.value = true;
    API.list({ query: text.value })
        .then(resp => emit('updated', resp.data))
        .catch(err => error.value = err.message)
        .finally(() => isLoading.value = false)
}

</script>

<style scoped>
.task-form-root {
    border: 1px solid #adb5bd;
    border-left: none;
    border-right: none;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

input {
    width: 100%;
    border: none;
    padding-left: 1rem;
    font-size: 0.75rem;
}

input:focus {
    outline: none;
}

button {
    text-transform: uppercase;
    padding: 8px 8px;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    margin-right: 1rem;
}

button:hover {
    background-color: rgba(1, 1, 1, 0.05);
}
</style>