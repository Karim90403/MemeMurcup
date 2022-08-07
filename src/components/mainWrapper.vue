<template>
  <div class="mem-image">
    <img src="@/assets/mem.png" />
    <div v-if="isLiked" class="like" @click="toggle"><img src="@/assets/like.svg" /></div>
    <div v-else class="like" @click="toggle"><img src="@/assets/notLike.png" /></div>
  </div>
  <div class="caption">text:{{ $store.state.user }}</div>

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
  <div class="button dualbutton">Следующий мем</div>
</template>

<style>
</style>

<script>
export default {
  name: "mainWrapper",
  data(){
    return{
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
    log(){
      console.log("Works!")
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
    }
  },
  computed:{
    isSearchActive(){
      return this.search.length > 0;
    }
  }
};
</script>