<template>
  <div class="mem-image">
    <img :src= "`${ this.mem.url }`" alt="Url not found" />
    <div v-if="isLiked" class="like" @click="toggle"><img src="@/assets/like.svg" /></div>
    <div v-else class="like" @click="toggle"><img src="@/assets/notLike.png" /></div>
  </div>
  <div class="caption">{{ this.mem.text }}</div>

  <input class="search" type="text" v-model="search" @input="searchingProcess" placeholder="Поиск по тегам" />
  <div class="tag-list">
    <div class="tag active" v-for="tag in activeTags" :key="tag.id" @click="removeActiveTag(tag)">
      {{ tag.text }}
    </div>
    <div v-if="!isSearchActive" class="tag" v-for="tag in $store.state.tags" :key="tag.id" @click="addActiveTag(tag)">
      {{ tag.text }}
    </div>
    <div v-else class="tag" v-for="tag in searching" :key="tag.id" @click="addActiveTag(tag)">
         {{ tag.text }}
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
      this.searching = this.$store.state.tags.filter((t) => t.text.includes(this.search))
    },
    addActiveTag(tag){
      this.activeTags.push({ id: tag.id, text: tag.text })
      this.$store.state.tags = this.$store.state.tags.filter((t) => t.text !== tag.text)
      this.searching = this.$store.state.tags.filter((t) => t.text.includes(this.search))
    },
    removeActiveTag(tag){
      this.$store.state.tags.push({ id: tag.id, text: tag.text })
      this.activeTags = this.activeTags.filter((t) => t.text !== tag.text)
      this.searching = this.$store.state.tags.filter((t) => t.text.includes(this.search))
    },
    nextMem(){
      this.submitMem()
      this.loadMem()
    },
    async submitMem() {
      try {
        console.log("SASATT")
        let memData = {
          id: this.mem.id,
          tags: this.activeTags,
          isLiked: this.isLiked
        }
        console.log(memData)
        await axios.post("https://dev.mememarkup.sdore.me/api/task",memData, {
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
    this.loadMem()
  }
};
</script>