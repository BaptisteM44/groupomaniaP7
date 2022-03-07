<!-- Fichier central de l'qpplication Vue.-->
<template>
  <div>
    <header>
      <div>
        <NavBar @logout="handleLogout()" ></NavBar>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import router from "./router";

export default {
  name: "App",
  components: {
    NavBar
  },
  methods:{
    handleLogout() {
      router.push({ path : "/login" });
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
  color: rgb(0, 0, 0);
}
</style>