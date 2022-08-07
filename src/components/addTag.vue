<template>
  <header>
    <router-link class="back" :to="{ path: '/' }">
      <img src="https://img.icons8.com/ios-filled/50/000000/undo.png" />
    </router-link>
    <div class="title">Добавить тэг</div>
  </header>
  <div class="center">
    <form @submit.prevent="$store.commit('addTag', newTag)">
      <input v-model="newTag" type="text" placeholder="Название тега" />
        <button class="button">Добавить</button>
    </form>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: "addTag",
  data() {
    return {
      newTag: "",
    };
  },
};
</script>