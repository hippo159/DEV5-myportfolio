<script setup>
import {ref,onMounted,reactive} from 'vue'
  let state = reactive({comments: []});
  
  
  onMounted(() => {
    const apiUrl = "https://lab5-p379.onrender.com/api/v1/messages/"
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      state.comments = data;
      console.log(state);
     
    
    });
 });
</script>

<template>
  <div class="comments">
    <div class="comment" v-for="comment in state.comments" :key="comment.id">
    <img class="img" src="../assets/profile.gif" alt="profile">
    <div class ="user">
        <h4>{{comment.user}}</h4>
        <p>{{comment.text}}</p>
    </div>
</div>
  </div>
</template>

<style lang="scss" scoped>
.comments{
    .comment{
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    
    p{
            margin: 0;
    }
    h4{
        margin: 6px;
    }
    }
    padding: 20px;
    .img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        
    }
}
</style>
