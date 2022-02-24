<template>
  <main>
    <section>  
      <form class="formcard" @submit.prevent="login">
        <div class="form-container">
            <input v-on:keydown="isInvalid = false" v-model="inputEmail" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="votre email">
        </div>
        <div class="form-container">
            <input v-on:keydown="isInvalid = false" v-model="inputPassword" type="password" class="form-control" id="inputPassword" aria-describedby="passwordHelp" placeholder="votre mot de passe">
            <button type="submit">SE CONNECTER</button>                       
        </div>
        
        <router-link to="/register">Pas de compte ? S'incrire</router-link>
      </form> 
    </section>
    <div class="invalid" v-show="isInvalid">
          Veuillez vérifier vos informations de connexion
    </div>
  </main>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  data() {
    return {
      inputEmail: "",
      inputPassword: "",
      isInvalid: false,
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.inputEmail,
          password: this.inputPassword,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("isAdmin", res.data.isAdmin);
          this.$emit('login');
          window.alert(
            "connexion réussie, redirection vers la page principale"
          );
          router.push({ path: "/Feed" });
        })
        .catch((error) => {
          this.isInvalid = true;
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
*,
*::after,
*::before {
    margin: 0;
    padding: 0;
}
.container{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
section{
   display:flex;
  justify-content: center;
  align-items: center;
  margin:auto;
  padding:1em;
  width:90%;
}
.formcard{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin:auto;
  padding:1em;
}
form div{
  display:flex;
  flex-direction: column;
  width:100%;
}
</style>