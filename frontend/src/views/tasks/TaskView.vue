<template>
    <div class="root">
        <div class="container">
            <div class="head">
                <h2 class="title">Список дел</h2>
                <span class="day">{{ new Date().toLocaleDateString('ru-RU', { day: '2-digit' }) }} - </span>
                <span class="weekday">{{ new Date().toLocaleDateString('ru-RU', { weekday: 'long' }) }}</span>

                <div class="button-container">
                    <button @click="() => action = 'SEARCH'" class="round-button"
                        :class="{ 'round-button--active': action === 'SEARCH' }">
                        <img width="16" height="16" src="/search.svg" />
                    </button>
                    <button @click="() => action = 'ADD'" class="round-button"
                        :class="{ 'round-button--active': action === 'ADD' }">
                        <img width="24" height="24" src="/plus.svg" />
                    </button>
                </div>
            </div>

            <div class="list">
                <task-form :type="action" @created="onNewTask" @updated="onUpdate" />
                <task v-for="(task, index) in tasks" :key="task.text" :task="task" @checked="(task) => onCheck(index, task)"
                    @removed="() => onRemove(index)">
                    {{ task.text }}
                </task>
            </div>
        </div>
    </div>
</template>

<script setup>
import API from "@/services/tasks.api.js"
import { ref } from "vue"
import Task from './Task.vue'
import TaskForm from './TaskForm.vue'

const tasks = ref([])
const query = ref('');
const action = ref('SEARCH')

function fetchList() {
    API.list({ query: query.value }).then(resp => {
        tasks.value = resp.data
    })
}

function onCheck(idx, task) {
    tasks.value[idx] = task
}

function onRemove(idx) {
    tasks.value.splice(idx, 1)
}

function onNewTask(task) {
    tasks.value = [...tasks.value, task]
}

function onUpdate(newTasks) {
    tasks.value = newTasks
}

fetchList()
</script>

<style scoped>
.root {
    display: flex;
    justify-content: center;
}

.container {
    background-color: white;
    min-height: 100vh;
    width: 100%;
}

.day {
    font-size: 2rem;
    font-weight: 500;
    vertical-align: middle;
}

.weekday {
    font-size: 1.5rem;
    font-weight: 500;
    vertical-align: middle;
}

.title {
    margin-top: 0;
}

.head {
    background-color: #f8f9fa;
    padding: 1rem;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    color: 6c757d;
}

.button-container {
    display: inline-flex;
    align-items: center;
    margin-left: 2rem;
}

.round-button {
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 50%;
    border: none;
    margin-left: 8px;
}

.round-button:hover {
    opacity: 0.5;
}

.round-button--active {
    opacity: 0.95;
    background-color: #0d6efd;
}

.round-button--active img {
    filter: brightness(0) invert(1);
}

@media only screen and (min-width: 1024px) {
    .container {
        background-color: white;
        border-radius: 0.25rem;
        width: 75%;
    }
}
</style>