<template>
    <div>
        <main>
        <!-- Profil -->
        <section >
        <h1>Bonjour {{ userName }} !</h1>
        <div class="profile__date">
            <h2>Ancienneté</h2>
            <p>Membre depuis le {{ createdAt.slice(0,10) }}</p>
        </div>
        <div class="profile__date">
            <h2>Adresse Email</h2>
            <p>{{ email }}</p>
        </div>
        <!-- Supprimer son compte -->
        <div class="delete__section">
            <p class="">Depuis cette page vous pouvez supprimer votre compte.</p>
            <button class="delete__account" @click="deleteMyAccount(userId)">SUPPRIMER VOTRE COMPTE</button>
        </div>
        </section>
        
    </main>
  </div>
</template>



<script>
import axios from "axios";
import router from "../router";
export default {
  data() {
    return {
        userName: "", 
        email: "", 
        role: "", 
        createdAt: "",
        file: null, 
        submitted: false
    };
  },
  methods: {
      deleteMyAccount(userId) {
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
            this.postsCount = user.data.postsCount
            this.commentsCount = user.data.commentsCount
        })
        .catch(function(error) {
            console.log(error);
            })
    }
};
</script>