<script setup>
import {ref,onMounted, reactive} from 'vue'
import 'animate.css'
 let videos = reactive({data: []});
 let videoSrc = ref("")
 let counter = ref(0);
 let animation = ref("")
 //on mounted
    onMounted(() => {
    const apiUrl = "https://app.fakejson.com/q/lBPXdBGN?token=g5frKzilW_Od5FAeboQuow"
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      videos.data = data.videos;
      videoSrc  .value = data.videos[0].video;
      console.log(data.videos[0].video)
    });
    });
const nextVideo = (() =>{
    animation.value = "animate__fadeOut"
    
    setTimeout(() => {
    videoSrc.value = videos.data[counter.value].video;
    animation.value = "animate__fadeIn"
    }, 650);
    counter.value++
    
    
})
</script>

<template>
  <div class="blur">
    <div class="controls">
        <a @click.prevent="nextVideo" href = "#">⬇️</a>
    </div>
    <video
    :src="videoSrc"
    :class = "animation"
    class="animate__animated"
    autoplay
    muted
    loop
    ></video>
  </div>
</template>

<style scoped>
 video{
    max-height: 100vh;
    max-width: 100%;
 }
 .blur{
    /* set background to blur.jpg */
    background-image: url("../assets/blur.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    position: relative;
 }
 .controls{
    position: absolute;
    text-decoration: none;
    top: 0;
    right: 0;
    padding: 1rem;
    color: white;
    font-size: 1.5rem;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 100%;
 }
</style>
