<template>
    <div class="task-root">
        <template v-if="!isLoading">
            <button class="checkbox" :class="{ 'checkbox--active': task.finished }" @click="check">
                &nbsp;
            </button>
            <span class="text" :class="{ 'text--active': task.finished }">
                {{ task.text }}
            </span>
            <button @click="remove" class="delete-button">
                <img width="14" height="14" src="/delete.svg" />
            </button>
        </template>
        <template v-else>
            <loader style="margin: auto auto;" />
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import API from '@/services/tasks.api.js'
import Loader from '@/components/Loader.vue'

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['checked', 'removed'])

const isLoading = ref(false)

function check() {
    if (props.task.finished) return

    isLoading.value = true;
    API.update(props.task.id, { finished: !props.task.finished })
        .then(resp => emit('checked', resp.data))
        .finally(() => isLoading.value = false)
}

function remove () {
    isLoading.value = true;
    API.remove(props.task.id)
        .then(() => emit('removed', props.task.id))
        .finally(() => isLoading.value = false)
}

</script>

<style scoped>
.task-root {
    padding: 1rem;
    border-bottom: 1px solid #adb5bd;
    display: flex;
    align-items: center;
}

.checkbox {
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    border: 1px solid #adb5bd;
    background-color: white;
}

.checkbox--active {
    background-color: #0d6efd;
    border-width: 2px;
}

.text {
    font-size: 1rem;
    margin-left: 1rem;
}

.text--active {
    text-decoration: line-through;
}

.delete-button {
    border: 1px solid red;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    padding: 0;
    background-color: white;
    margin-left: auto;
}

.delete-button:hover {
    opacity: 0.5;
    cursor: pointer;
}
</style>