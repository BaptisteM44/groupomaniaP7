<template>
  <!-- Profil -->
  <section class="section__profil">
      <h1>Bonjour {{ userName }} !</h1>
      <div class="profil__date">
          <h2>Ancienneté : </h2>
          <p>Membre depuis le {{ createdAt.slice(0,10) }}</p>
      </div>
      <div class="profil__date">
          <h2>Adresse Email :</h2>
          <p>{{ email }}</p>
      </div>
      <!-- Supprimer son compte -->
      <div class="delete__section">
          <button v-if="this.role === 'Utilisateur'" @click="deleteMyAccount(userId)">SUPPRIMER VOTRE COMPTE</button>
      </div>
  </section>
</template>



<script>
import axios from "axios";
import router from "../router";
export default {
  data() {
    return {
        userName: "",
        userId: "",
        email: "", 
        role: "",
        isAdmin: "",
        createdAt: "",
        file: null, 
        submitted: false
    };
  },
  methods: {
      deleteMyAccount() {
            let confirmUserDeletion = confirm("voulez-vous vraiment supprimer votre compte ?");
            if (confirmUserDeletion == true) {
                axios.delete("http://localhost:3000/api/users/" + localStorage.getItem("userId"), {headers: { "Authorization": "Bearer " + localStorage.getItem("token") },})
                .then((res)=> {
                    console.log(res);
                    localStorage.clear();
                    this.$emit('login');
                    router.push({ path : "/login" });
                })
                .catch((error) => { 
                    console.log(error)
                })
            } else {
                return 
            }
        },
    
  },
  created: function(){
        axios.get("http://localhost:3000/api/users/" + localStorage.getItem("userId"),{ headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(user => {
            this.userName = user.data.userName
            this.email = user.data.email
            this.role = user.data.role
            this.createdAt = user.data.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + user.data.createdAt.slice(11,16)
        })
        .catch(function(error) {
            console.log(error);
            })
    }
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

.section__profil{
    width: 100%;
    padding: 10px 0;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fd2b01ab;
    outline: none;
    align-items: center;
}
.profil__date{
    margin: 2rem;
    display: flex;
    align-items: baseline;
}
.profil__date h2{
    margin-right: 1rem;
}
button {
  align-items: center;
  background-color: #ffffff;
  border: 2px solid #fd2b01ab;
  border-radius: 8px;
  box-sizing: border-box;
  color: #111;
  cursor: pointer;
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