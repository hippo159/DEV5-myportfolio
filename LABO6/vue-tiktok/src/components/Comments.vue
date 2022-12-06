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
 const addComment = () => {
    const username = document.querySelector('#username').value;
    const comment = document.querySelector('#comment').value;
    const comments = 
        {
            "user": username,
            "text": comment
        }
    ;
    console.log()
    //post comment to api
    

     
    state.comments.push(comments)
 }
</script>

<template>
  <div>
  <div class="comments">
    <div class="comment" v-for="comment in state.comments" :key="comment.id">
    <img class="img" src="../assets/profile.gif" alt="profile">
    <div class ="user">
        <h4>{{comment.user}}</h4>
        <p>{{comment.text}}</p>
    </div>
</div>
  </div>
  <span class="post">
  <div class="input">
  <input type="text" id="username" class="placeComment" placeholder="Username" required>
  <input type="text" id="comment" class="placeComment" placeholder="comment" required>
  </div>
  <a href="#" @click.prevent="addComment" class="send">➡️</a>
</span>
</div>
</template>

<style lang="scss" scoped>
.post{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}
.send{
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin-left: 10px;
}
.placeComment{
    width: 80%;
    height: 1em;
    border-radius: 10px;
    border: none;
    padding: 10px;
    margin-top: 10px;
}
.comments{
  max-height: 500px;
  overflow:scroll;
    .comment{
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    margin-bottom: 10px;
    
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
