<template>
  <main>
    <section>  
      <form class="formcard" @submit.prevent="login">
        <div class="form-container">
            <input v-on:keydown="isInvalid = false" v-model="inputEmail" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="votre email">
        </div>
        <div class="form-container">
            <input v-on:keydown="isInvalid = false" v-model="inputPassword" type="password" class="form-control" id="inputPassword" aria-describedby="passwordHelp" placeholder="votre mot de passe">                       
        </div>
        <button type="submit">SE CONNECTER</button>
        
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
          localStorage.setItem("userName", res.data.userName);
          localStorage.setItem("isAdmin", res.data.isAdmin);
          localStorage.setItem("role", res.data.role);
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
.form-container{
  margin:10px;
  width: 10rem;
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
  width: 400px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin:auto;
  padding:1em;
  box-shadow: 0 2.2em 3.2em 0.1em rgb(128 128 128 / 30%);
}
form div{
  display:flex;
  flex-direction: column;
  width:100%;
}
</style>