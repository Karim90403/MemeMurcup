import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './assets/style.scss'
import router from './router/index'

const mainStore = createStore({
    state: {
        tags: [
            'Животные', 'Политика', 'Демотиватор', 'Фильмы', 'Переписки', 'Новость', 'Наука', 'Спорт', 'Футбол', 'Ну нахер', 'НеМем'
            // { id: id++, text: 'Животные' },
            // { id: id++, text: 'Политика' },
            // { id: id++, text: 'Демотиватор' },
            // { id: id++, text: 'Фильмы' },
            // { id: id++, text: 'Переписки' },
            // { id: id++, text: 'Новость' },
            // { id: id++, text: 'Наука' },
            // { id: id++, text: 'Спорт' },
            // { id: id++, text: 'Футбол' },
            // { id: id++, text: 'Ну нахер' },
            // { id: id++, text: 'НеМем' }
        ]
    },
    mutations: {
        addTag(state, tag) {
            // state.tags.push({ id: id++, text: tag })
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


