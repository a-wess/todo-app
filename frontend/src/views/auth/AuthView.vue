<template>
    <div class="root">
        <div class="panel">
            <div>
                <button class="tab" :class="{ 'tab--active': tab === 'Login' }" @click="() => tab = 'Login'">
                    Авторизация
                </button>
                <button class="tab" :class="{ 'tab--active': tab === 'Register' }" @click="() => tab = 'Register'">
                    Регистрация
                </button>
            </div>

            <label for="name">Имя пользователя</label>
            <input v-model="form.name" id="name" class="field-input">

            <label for="name" style="margin-top: 1rem">Пароль</label>
            <input v-model="form.password" id="password" type="password" class="field-input">

            <p v-if="error.length > 0" style="color: red">{{ error }}</p>

            <button class="submit" @click="authorize">
                Отправить
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import API from "@/services/user.api.js"

const tab = ref('Login');
const error = ref('');
const form = reactive({
    name: '',
    password: '',
});

function authorize() {
    error.value = '';
    const callback = tab.value === 'Login' ? API.login : API.register;
    callback(form).then((resp) => {
        localStorage.setItem('jwt-token', resp.data.token)
        window.location.href = '/'
    }).catch(err => {
        error.value = err.response.data.message
    })
}
</script>

<style scoped>
label {
    font-weight: 500;
    margin-bottom: 8px;
}

.root {
    display: flex;
    justify-content: center;
    padding-top: 35%;
}

.panel {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 1.5rem;
    padding-top: 1rem;
    border-radius: 0.25rem;
}

.tab {
    border: none;
    background-color: white;
    padding: 0.25rem;
    width: 50%;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
}

.tab--active {
    background-color: #0d6efd;
    color: white;
}

.submit {
    background-color: #0d6efd;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: none;
    margin-top: 1rem;
}
</style>