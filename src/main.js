import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './assets/style.scss'
import router from './router/index'
import axios from 'axios';

let id = 0

const mainStore = createStore({
    state: {
        login: '',
        password: '',
        tags: [
            { id: id++, text: 'Животные' },
            { id: id++, text: 'Политика' },
            { id: id++, text: 'Демотиватор' },
            { id: id++, text: 'Фильмы' },
            { id: id++, text: 'Переписки' },
            { id: id++, text: 'Новость' },
            { id: id++, text: 'Наука' },
            { id: id++, text: 'Спорт' },
            { id: id++, text: 'Футбол' },
            { id: id++, text: 'Ну нахер' },
            { id: id++, text: 'НеМем' }
        ]
    },
    mutations: {
        addTag(state, tag) {
            state.tags.push({ id: id++, text: tag })
            router.push('/')
        },
        async register(state, user) {
            try {
                await axios.post("https://dev.mememarkup.sdore.me/api/register", user )
                console.log(user)
                let member = {
                    login: user.email,
                    password: user.password
                }
                console.log(member)
                commit('login', member)
            } catch (error) {
                console.log(error);
            }
        },
        async login(state, member) {
            try {
                res = await axios.post("https://dev.mememarkup.sdore.me/api/login", member)
                console.log(res.data)
                router.push('/')
            } catch (error) {
                console.log(error);
            }
        }
    }
})

createApp(App)
    .use(router)
    .use(mainStore)
    .mount('#app')


