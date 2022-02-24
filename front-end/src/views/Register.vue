<template>
  <main class="container">
    <section>
      <h1>INSCRIPTION</h1>
      <div v-show="invalid!=null" class="invalid_txt" key="invalid">
          <p>{{invalid}}</p>
      </div>
      <form @submit.prevent="sendDataForm(event)" >
        
        <div>
          <label for="inputUsername">Nom d'utilisateur</label>
          <input
            v-model="inputUsername"
            type="text"
            aria-describedby="usernameHelp"
            placeholder="Votre pseudo"  
            minlength="4"
          />
        </div>
        <div>
          <label for="inputEmail">Email</label>
          <input
            v-model="inputEmail"
            type="email"
            aria-describedby="emailHelp"
            placeholder="Votre email"            
          />
        </div>
        <div>
          <label for="inputPassword">Mot de passe</label>
          <input
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
}
.container{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
section{
  margin-top:3em;
  width:20em;
}
form{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
}
form div{
  display:flex;
  flex-direction: column;
  width:100%;
}
</style>