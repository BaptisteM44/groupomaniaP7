<!-- Fichier central de l'qpplication Vue.-->
<template>
  <header>
    <div v-if="checkLogIn(token)">
      <NavBar @logout="getTokenFromLocalStorage()" ></NavBar>
    </div>
  </header>
  <router-view @login="getTokenFromLocalStorage()" />
</template>

<script>
import NavBar from "./components/NavBar.vue";
 
export default {
  name: "App",
  data(){
    return{
      token:null,
    }
  },
  created(){
    this.getTokenFromLocalStorage()
  },
  components: {
    NavBar
  },
  methods:{
    checkLogIn(key){
          if(key){
            return true
          } else {
            false
          }
        },
    getTokenFromLocalStorage(){
      this.token= localStorage.getItem("token");
    },
  }
};
</script>

<style>
*,
*::after,
*::before {
    margin: 0 ;
    padding: 0;
    box-sizing: border-box;
}
button{
  cursor:pointer;
}
header{
  display: flex;
  flex-direction: column;
}
#app {
  color: #2c3e50;
}
a {
  text-decoration: none;
  color: #999;
}
</style>