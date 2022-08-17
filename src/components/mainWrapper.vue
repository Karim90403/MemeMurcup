<template>
  <div class="mem-image">
    <img :src= "`${ this.mem.url }`" alt="Url not found" />
    <div v-if="isLiked" class="like" @click="toggle"><img src="@/assets/like.svg" /></div>
    <div v-else class="like" @click="toggle"><img src="@/assets/notLike.png" /></div>
  </div>
  <div class="caption">{{ this.mem.text }}</div>

  <input class="search" type="text" v-model="search" @input="searchingProcess" placeholder="Поиск по тегам" />
  <div class="tag-list">
    <div class="tag active" v-for="tag in activeTags" @click="removeActiveTag(tag)">
      {{ tag }}
    </div>
    <div v-if="!isSearchActive" class="tag" v-for="tag in $store.state.tags" @click="addActiveTag(tag)">
      {{ tag }}
    </div>
    <div v-else class="tag" v-for="tag in searching" @click="addActiveTag(tag)">
         {{ tag }}
    </div>
    
  </div>
  <div class="button dualbutton" @click="$router.push('/addTag')">
    Добавить новый тег
  </div>
  <div class="button dualbutton" @click="nextMem">Следующий мем</div>
</template>

<style>
</style>

<script>
import axios from 'axios';
import router from '../router/index';

export default {
  name: "mainWrapper",
  data(){
    return{
      mem: {
            id: '',
            lang: null,
            text: '-------------------',
            url: 'https://dev.mememarkup.sdore.me/api/data/startup_img_0_3_1727.jpg'
        },
      search: '',
      searching: [],
      activeTags: [],
      isLiked: false
    }
  },
  methods:{
    toggle() {
      this.isLiked = !this.isLiked
    },
    searchingProcess(){
      this.searching = this.$store.state.tags.filter((t) => t.includes(this.search))
    },
    addActiveTag(tag){
      this.activeTags.push(tag)
      this.$store.state.tags = this.$store.state.tags.filter((t) => t !== tag)
      this.searching = this.$store.state.tags.filter((t) => t.includes(this.search))
      console.log(this.activeTags)
      console.log(this.$store.state.tags)

    },
    removeActiveTag(tag){
      this.$store.state.tags.push(tag)
      this.activeTags = this.activeTags.filter((t) => t !== tag)
      this.searching = this.$store.state.tags.filter((t) => t.includes(this.search))
    },
    nextMem(){
      this.submitMem()
      this.loadMem()
      this.isLiked = false
      this.$store.state.tags = this.activeTags.concat(this.$store.state.tags)
      this.activeTags = []
    },
    async submitMem() {
      try {
        let memData = {
          id: this.mem.id,
          tags: this.activeTags,
          is_liked: this.isLiked
        }
        console.log(memData)
        await axios.post("https://dev.mememarkup.sdore.me/api/submit",memData, {
            headers: {
                Authorization: 'Bearer ' + `${localStorage.getItem("token")}`
            }
        })
      }catch (error) {
          console.log(error);
      }
    },
    async loadMem() {
      try {
        let res = await axios.get("https://dev.mememarkup.sdore.me/api/task",{
            headers: {
                Authorization: 'Bearer ' + `${localStorage.getItem("token")}`
            }
        })
        this.mem.id = res.data.id
        this.mem.lang = res.data.lang
        this.mem.text = res.data.text
        this.mem.url = 'https://dev.mememarkup.sdore.me/' + res.data.url
      }catch (error) {
        console.log(error);
      }
    }
  },
  computed:{
    isSearchActive(){
      return this.search.length > 0;
    }
  },
  mounted(){
    if (localStorage.getItem("tagsArray")){
      this.$store.state.tags = JSON.parse(localStorage.getItem("tagsArray"))
    }
    if (!localStorage.getItem("token")){
      router.push('/register')
    }
  },
  unmounted(){
    this.$store.state.tags = this.activeTags.concat(this.$store.state.tags)
    localStorage.setItem("tagsArray", JSON.stringify(this.$store.state.tags))
  }
};
</script>