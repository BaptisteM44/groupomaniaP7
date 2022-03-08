<template>
  <main>
    <section>
      <div class="formcard">
        <div class="logo-card">
          <img src="../assets/images/icon.svg" alt="logo groupomania">
        </div>
        <h2>Login</h2>
        <form  @submit.prevent="login">
          <div class="form-container">
              <input v-on:keydown="isInvalid = false" v-model="inputEmail" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="votre email">
          </div>
          <div class="form-container">
              <input v-on:keydown="isInvalid = false" v-model="inputPassword" type="password" class="form-control" id="inputPassword" aria-describedby="passwordHelp" placeholder="votre mot de passe">                       
          </div>
          <button type="submit">SE CONNECTER</button>
          
          <router-link to="/register">Pas de compte ? S'inscrire</router-link>
        </form>   
      </div>
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
    font-family: 'Lato', sans-serif;
}
.container{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fd2b01ab;
  text-align: center;
}
.logo-card img{
  width: 80%;
}
.form-control{
  width: 100%;
  padding: 10px 0;
  font-size: 13px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fd2b01ab;
  outline: none;
  background: transparent;
  align-items: center;
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
  padding: 2.5em;
  box-shadow: 0 2.2em 3.2em 0.1em rgb(128 128 128 / 30%);
  border-radius: 10px;
}
form div{
  display:flex;
  flex-direction: column;
  width:100%;
}
button {
  align-items: center;
  background-color: #ffffff;
  border: 2px solid #fd2b01ab;
  border-radius: 8px;
  box-sizing: border-box;
  color: #111;
  cursor: pointer;
  display: flex;
  font-family: Inter,sans-serif;
  font-size: 16px;
  height: 48px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-bottom: 2rem;
}

button:after {
  background-color: #111;
  border-radius: 8px;
  content: "";
  display: block;
  height: 48px;
  left: 0;
  width: 100%;
  position: absolute;
  top: -2px;
  transform: translate(8px, 8px);
  transition: transform .2s ease-out;
  z-index: -1;
}

button:hover:after {
  transform: translate(0, 0);
}

button:active {
  background-color: #ffdeda;
  outline: 0;
}

button:hover {
  outline: 0;
}

@media (min-width: 768px) {
  button {
    padding: 0 40px;
  }
}
</style>