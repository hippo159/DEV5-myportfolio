<script setup>
import {ref,onMounted} from 'vue'
  let username = ref("test");
  let comment = ref("test");
  onMounted(() => {
    const apiUrl = "https://app.fakejson.com/q/lBPXdBGN?token=g5frKzilW_Od5FAeboQuow"
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      username.value = data.comments[0].username
      comment.value = data.comments[0].comment
     
    
    });
 });
</script>

<template>
  <div class="comments">
    <div class="comment">
    <img class="img" src="../assets/profile.gif" alt="profile">
    <div class ="user">
        <h4>{{username}}</h4>
        <p>{{comment}}</p>
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
