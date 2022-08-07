<template>
  <div class="main-wrap">
    <div class="white-box">
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      newTag: "",
    };
  },
};
</script>
