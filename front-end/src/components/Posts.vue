<template>
    <div>
        <h2>Posts</h2>
        <div class="posts-block">
            <ul class="gradient-list" >
                <li v-text="post"></li>
                
            </ul>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            posts:["My very", "First", "Message"]
        };
    },
    async created(){
      this.posts = await (await axios.get(process.env.VUE_APP_API)).data;
    }
};
</script>

<style scoped>
*{
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  background-color: white;
  color: black;
}

.posts-block {
  display: block;
  margin: 0 auto;
  max-width: 40rem;
  padding: 1rem;
}


.gradient-list {
  counter-reset: gradient-counter;
  list-style: none;
  margin: 1.75rem 0;
  padding-left: 1rem;
}
li {
background: white;
border-radius: 0 0.5rem 0.5rem 0.5rem;
box-shadow: 0.25rem 0.25rem 0.6rem;
counter-increment: gradient-counter;
margin-top: 1rem;
min-height: 3rem;
padding: 1rem 1rem 1rem 3rem;
position: relative;
}

</style>