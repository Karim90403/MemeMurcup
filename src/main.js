import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './assets/style.scss'
import router from './router/index'
import axios from 'axios';

let id = 0

const mainStore = createStore({
    state: {
        user:{},
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
        async login(state, user) {
            try {
                let res = await axios.post("https://dev.mememarkup.sdore.me/api/register", user )
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


