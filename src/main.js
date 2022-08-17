import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './assets/style.scss'
import router from './router/index'

const mainStore = createStore({
    state: {
        tags: ['Животные', 'Политика', 'Демотиватор', 'Фильмы', 'Переписки', 'Новость', 'Наука', 'Спорт', 'Футбол', 'Ну нахер', 'НеМем']
    },
    mutations: {
        addTag(state, tag) {
            state.tags.push(tag)
            localStorage.setItem("tagsArray", JSON.stringify(state.tags))
            router.push('/')
        },
    }
})

createApp(App)
    .use(router)
    .use(mainStore)
    .mount('#app')


