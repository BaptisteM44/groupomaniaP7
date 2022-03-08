<template>
    <!--Création post-->
    <div>
        <div class="container">
            <div class="" id="allposts">
                <form class="new-post" enctype="multipart/form-data">
                    <div class="main-title">
                        <p>Poster un message</p>
                    </div>
                    <div class="form-post">
                        <textarea class="right-post" v-model="newPost" id="newPost" name="Post" rows="10" placeholder="Votre post ici..."></textarea>
                    </div>
                    <div class="file-post">
                        <img :src="newImage" class="show-img">
                        <input @change="onFileChange()" type="file" ref="file" name="image" class="" id="File" accept=".jpg, .jpeg, .gif, .png">
                    </div>
                    <div class="">
                        <button type="submit" @click.prevent="addNewPost()" class="">Valider</button>
                    </div>
                </form>
                <!--affichage posts-->
                <div class="container-post">
                    <h1 v-if ="posts.length !=0">Dernières Publications</h1>   
                    <h1 v-else> Aucune publication pour le moment, soyez le premier à en créer une ! </h1>
                </div>
                <div v-for="post in posts" :key="post.id" class="post">
                    <div class="container-post">
                        <div class="post-header">
                            <span>
                                Posté par {{post.userName}} 
                                le {{post.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + post.createdAt.slice(11,16)}}
                            </span>
                        </div>
                        <div class="msg-post">
                            <p v-if="post.post !== ''"> {{post.post}} </p>
                        </div>
                        <div class="img-post">
                            <img :src="post.postUrl" v-if="post.postUrl !== ''">
                        </div>
                        <div class="footer-post">
                            <div class="com-post">
                                <router-link :to="{ path: '/post/' + post.id}"><i class="fa-solid fa-comments"></i></router-link>
                            </div>
                            <div class="icon-post">
                                <label class="label-post" @click="deletepost(post.id)" v-if="post.UserId == this.currentUserId || this.isAdmin == 'true'" >
                                    <i class="fa fa-trash"></i>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Section commentaire -->
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "Posts",
    components: {
        
        
    },
    data() {
        return {
            isAdmin: false,
            isActive: true,
            newImage: "",
            currentUserId: "", 
            newPost: "",
            file: null,
            posts: [],
        }
    },
    methods: {
        onFileChange() {
            this.file = this.$refs.file.files[0];
            this.newImage = URL.createObjectURL(this.file)
        },
        addNewPost() {
            if (this.newPost == '') {
                return alert('Publication vide');
            }
            const formData = new FormData()
            formData.set("image", this.file)
            formData.set("UserId", this.currentUserId.toString())
            formData.set("post", this.newPost.toString())
            axios.post("http://localhost:3000/api/posts", formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then(()=> {
                this.UserId = ""
                this.newPost = ""
                this.file = null
                location.reload();
            })
            .catch((error)=>{
                console.log(error);
            })
        },
        deletepost(postId) {
            let confirmpostDelete = confirm("voulez-vous vraiment supprimer ce post ? Tous les commentaires associés seront également supprimés.");
            if (confirmpostDelete == true) {
                axios.delete("http://localhost:3000/api/posts/" + postId, 
                {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
                })
                .then((res)=> {
                  console.log(res)
                  location.reload()
                })
                .catch((error) => { 
                  console.log(error)})
            } else {
                return
            }
        }
    },
    created: function() {
        this.isAdmin = localStorage.getItem("role")
        this.currentUserId = localStorage.getItem("userId")
        if (localStorage.getItem("refresh")===null) {
            localStorage.setItem("refresh", 0)
            location.reload()
        }
        axios.get("http://localhost:3000/api/posts",{ headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {
            this.posts = res.data.ListePosts
            console.log(this.post)
        })
        .catch((error)=>{
            console.log(error);
        })
    },
    
    
}
</script>

<style>
    body {
        background-color: #ffffff;
        text-align: center;
        align-items: center;
        font-family: 'Lato', sans-serif;
    }
    
    .container{
        text-align: center;
        margin: 0 auto;
        border-left: 1px solid #fd2b01ab;
        border-right: 1px solid #fd2b01ab;
        max-width: 650px;
        box-shadow: 0 1.2em 5.2em -0.5em rgb(128 128 128 / 19%);
    }
    .main-title{
        padding: 2rem;
        font-size: 1.5rem;
        font-weight: 700;
    }
    .new-post{
        width: auto;
        margin: 0 auto;
        border-bottom: 1px solid #fd2b01ab;
    }
    .file-post input{
        margin: 1rem auto;
    }
    .show-img{
        max-width: 30rem;
        object-fit: cover;
        border-radius: 15px;
    }
    .form-post{
        margin: 1rem 5rem;
        align-items: center;

    }
    .right-post{
        border-radius: 1em;
        width:60%;
        height:5em;
        padding: 1em 0.5em 1em 0.5em;
        font-size: 1em;
        border-bottom-color: rgba(0,0,0,.42);
        resize: none;
        outline: none;
    }
    /* POST CSS */
    .post {
        margin: 2rem auto;
    }
    .post-header{
        display: inline-flex;
        position: absolute;
        left: 9px;
        top: -9px;
        border-bottom: 1px solid #8d8d8dad;
    }
    .container-post {
        width: 100%;
        text-align: center;
        padding: 1rem;
        border-bottom: 1px solid #fd2b01ab;
        display: block;
        margin: 0 auto;
        box-shadow: 0 1.2em 1.2em -0.5em rgb(128 128 128 / 19%) ;
        position: relative;
    }
    .msg-post{
        margin: 1rem auto;
        font-size: 19px;
        width: 74%;
        text-align: left;
    }
    .img-post img{
        width: 80%;
        border-radius: 15px;
    }
    .footer-post{
        display: flex;
        justify-content: space-around;
        width: 95%;
        margin: 1rem auto;
    }
    .com-post{
        color: black;
    }
    .label-post{
        cursor: pointer;
    }
button {
  align-items: center;
  background-color: #ffffff;
  border: 2px solid #fd2b01ab;
  border-radius: 8px;
  box-sizing: border-box;
  color: #111;
  cursor: pointer;
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