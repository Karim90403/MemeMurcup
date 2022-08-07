<template>
  <header>
    <div class="title">Вход</div>
  </header>
  <div class="center">
    <input type="text" v-model="username" placeholder="Имя" />
    <input type="mail" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Пароль" />
    <div class="button" @click="addUser(user)"> Войти </div>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: "Registration",
  data() {
    return {
      user:{},
      username: '',
      email: '',
      password: '',
    };
  },
  methods:{
    addUser(user){
      if (this.username.length > 0 && this.email.length > 0 && this.username.length > 0){
        user = {
          name: this.username,
          email: this.email,
          password: this.password
        }
        this.$store.commit('register', user)
      } else {
        alert("Заполните все поля")
      }
      
    },
    
  }
};
</script>
