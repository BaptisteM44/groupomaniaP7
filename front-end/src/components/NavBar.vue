<!-- Composant Bar de Navigation -->
<template>
    <nav class="navbar">
        <img src="../assets/images/icon-left-black.png" alt="logo header groupomania" >
        <router-link class="link" to="/Feed">
            <p>Accueil</p>
        </router-link>
        <router-link class="link" to="/Profil">
            <p>Profil</p>
        </router-link>
        <a @click="disconnect">
            <p>Se déconnecter</p>
        </a>
    </nav>
</template>

<script>

export default {
    name: "Navigation",

    methods:{
        disconnect() {
            localStorage.clear();
            this.$emit('logout');
        }
    }
}
</script>
<style scoped>
body{
    font-family: 'Lato', sans-serif;
}
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
    cursor: pointer;
}
.navbar {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px;
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