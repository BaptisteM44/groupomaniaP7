<template>
  <main class="container">
    <section>
      <div class="formcard">
        <h2>INSCRIPTION</h2>
        <div v-show="invalid!=null" class="invalid_txt" key="invalid">
            <p>{{invalid}}</p>
        </div>
        <form @submit.prevent="sendDataForm(event)" >
          <div class="form-container">
            <input
              class="form-control"
              v-model="inputUsername"
              type="text"
              aria-describedby="usernameHelp"
              placeholder="Votre pseudo"  
              minlength="4"
            />
          </div>
          <div>
            <input
              class="form-control"
              v-model="inputEmail"
              type="email"
              aria-describedby="emailHelp"
              placeholder="Votre email"            
            />
          </div>
          <div>
            <input
              class="form-control"
              v-model="inputPassword"
              type="password"
              id="inputPassword"
              aria-describedby="passwordHelp"
              placeholder="Votre mot de passe"
              autocomplete="new-password"
            />
          </div>
          <button type="submit">S'inscrire</button>
          <router-link to="/login">
          Déjà inscrit ? S'identifier
          </router-link>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  name: "Inscription",
  data() {
    return {
      inputUsername: "",
      inputEmail: "",
      inputPassword: "",
      invalid: "",
    };
    
  },
  methods: {
    sendDataForm() {
      
      if ( !this.inputUsername || !this.inputEmail || !this.inputPassword ) {
                return this.invalid='Veuillez remplir tous les champs';
      }
      if (this.inputUsername.length >= 13 || this.inputUsername.length <= 4) {
        return this.invalid='Pseudo invalide (doit comporter 5 à 12 caractères)';
      }
      if (this.inputEmail == '' || this.inputUsername == '' || this.inputPassword == '') {
        return this.invalid='Un des champs est invalide';
      }
    
      axios.post("http://localhost:3000/api/auth/signup", {
                userName: this.inputUsername,
                email: this.inputEmail,
                password: this.inputPassword,
        })
        
        .then(() => {
          alert("Inscription réussie, redirection vers le module de connexion");
          router.push({ path: "/login" });
        })
        .catch((error) => {
          alert(error.status);
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
  padding: 4em;
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