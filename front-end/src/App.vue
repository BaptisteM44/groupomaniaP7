<!-- Fichier central de l'qpplication Vue.-->
<template>
<header>
<div v-if="checkLogIn(token)">
  <NavBar @logout="refreshToken()" ></NavBar>
</div>
</header>
<router-view @login="refreshToken()" />
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
    this.refreshToken()
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
    refreshToken(){
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
.logo{
  display:flex;
  justify-content: center;
}
#logo {
  height:12em;
  margin-bottom: 2em;
}
#app {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a {
  text-decoration: none;
  color: #999;
}
</style>