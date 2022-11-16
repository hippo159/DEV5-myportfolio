
<script setup>
 //import VideoPlayer
  import VideoPlayer from './components/VideoPlayer.vue'
  import Description from './components/Description.vue'
  import Comments from './components/Comments.vue'
</script>

<template>
  <div class ="app">
    <VideoPlayer />
    <Description />
    <Comments />
   
  </div>
</template>

<style lang="scss" scoped>
.app{
  display: grid;
  grid-template-columns: 8fr 4fr;
  grid-template-rows: 200px 1fr;
  grid-template-areas: 
  "video description"
  "video comments";
  .blur{
    grid-area: video;
  }
  .description{
    grid-area: description;
  }
  .comments{
    grid-area: comments;
    background-color: aliceblue;
  }
}
</style>
