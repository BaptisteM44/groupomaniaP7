<!-- Composant Bar de Navigation -->

<template>
    <nav class="navbar">
        <img src="../assets/images/icon-left-black.png" alt="" >
        <router-link class="link" to="/Feed">
            <p>Accueil</p>
        </router-link>
        <a @click="localClear">
            <p>Se déconnecter</p>
        </a>
    </nav>
</template>

<script>
import router from "../router";
export default {
    name: "Navigation",
    methods:{
        localClear() {
        localStorage.clear();
        this.$emit('logout');
        router.push({ path : "/login" });
        }
    }
}
</script>
<style scoped>
img{
    height: 150px;
    position: absolute;
    left: 5%;
    top: -32px;
}
p{
    font-size: 20px;
    text-transform: uppercase;
}
a{
    color:#fd2b01ab;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.navbar {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px;
    margin-bottom: 3em;
    box-shadow: 0 1.2em 1.2em -0.9em rgba(128, 128, 128, 0.185);
}
.navbar a {
    float: left;
    padding: 12px;
    color: #fd2b01ab;
    text-decoration: none;
    font-size: 17px;
}
a:hover{
    color: #be2303ab;
}
@media screen and (max-width: 900px) {
  img {
    display: none;
  }
}

</style>