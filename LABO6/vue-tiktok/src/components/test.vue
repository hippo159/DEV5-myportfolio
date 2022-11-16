<script setup>
//import ref
    import { ref } from 'vue'
//import reactive
    import { reactive } from 'vue'

  let title = ref("Vue TikTok")
  const comments = reactive([
    "comment 1",
    "comment 2",
    "comment 3",
  ])
    const addComment = () => {
        comments.push(title.value)
    }

</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="comment in comments" :key="comment">
        {{ comment }}
      </li>
    </ul>

    <input type="text" v-model="title">
    <button @click="addComment">Add Comment</button>
  </div>
</template>

<style scoped>

</style>
