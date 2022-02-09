<template>
    <div class="card-newpost">
        <h2>Nouveau Post</h2>
        <div class="posts-block">
            <input v-model="postBody" type="text" name="post" id="post" placeholder="Nouveau Post" autocomplete="off" required />
            <button @click="publier">Publier</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            postBody: ""
        };
    },
    async created(){
      this.posts = await (await axios.get(process.env.VUE_APP_API)).data;
    },
    methods:{
        publier(){
            console.log(this.postBody);
        }
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
.card-newpost{
    margin: 0 auto;
    max-width: 60%;
    border-bottom: solid;
    padding-bottom: 30px;
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
</style>