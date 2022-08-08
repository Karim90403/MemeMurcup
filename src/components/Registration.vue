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
import axios from 'axios';
import router from '../router/index';

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
        this.register(user)
      } else {
        alert("Заполните все поля")
      }
    },
    async register(user) {
        try {
            await axios.post("https://dev.mememarkup.sdore.me/api/register", user )
            let member = {
                login: user.email,
                password: user.password
            }
            this.login(member)
        } catch (error) {
            console.log(error);
        }
    },
    async login(member) {
        try {
            let res = await axios.post("https://dev.mememarkup.sdore.me/api/login", member)
            localStorage.setItem("token", res.data.token)
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }
  }
};
</script>
