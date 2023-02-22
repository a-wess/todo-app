<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="content">
    <RouterView />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body {
  margin: 0;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: #292929;
  background-color: #cfe2ff;
}

button {
  font-family: 'Roboto', sans-serif;
  color: #292929;
}

.field-input {
  font-size: 16px;
  padding: 2px 4px;
  border: 1px solid #c2c2c2;
  border-radius: 4px;
  outline-color: rgb(84 105 212 / 0.5);
  background-color: rgb(255, 255, 255);
}
</style>

<style scoped>
#content {
  width: 100%;
  margin: 0;
}

@media only screen and (min-width: 1024px) {
  #content {
    width: 1024px;
    margin-left: calc(50% - 512px);
    margin-right: calc(50% - 512px);
    min-height: 100vh;
  }
}
</style>