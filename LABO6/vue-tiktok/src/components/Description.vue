<script setup>

import {ref,onMounted} from 'vue'

  let username = ref("");
  let description = ref("");
    onMounted(() => {
    const apiUrl = "https://app.fakejson.com/q/lBPXdBGN?token=g5frKzilW_Od5FAeboQuow"
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      username.value = data.videos[0].username
      description.value = data.videos[0].description
      console.log(data.videos[0].username)
      console.log(data.videos[0].description)
    
    });
 });

</script>

<template>
  <div class="description">
    <h2>{{username}}</h2>
    <p>{{description}}</p>
  </div>
</template>

<style scoped>
.description{
    padding: 20px;
}
</style>
