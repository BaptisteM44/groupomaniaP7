<template>
    <!--Création post-->
    <div>
        <div class="container">
            <div class="">
                <div class="" id="allposts">
                    <form class="new-post" enctype="multipart/form-data">
                        <div class="main-title">
                            <p>Poster un message</p>
                        </div>
                        <div class="form-post">
                            <div class="">
                                <label for="newPost" class="">Post :</label>
                                <textarea class="right-post" v-model="newPost" id="newPost" name="Post" rows="10" placeholder="Votre post ici..."></textarea>
                            </div>
                            
                        </div>
                        <div class="file-post">
                            <img :src="newImage" class="show-img">
                            <label for="File" class=""></label>
                            <input @change="onFileChange()" type="file" ref="file" name="image" class="" id="File" accept=".jpg, .jpeg, .gif, .png">
                        </div>
                        <div class="">
                            <div class=""><button type="submit" @click.prevent="addNewPost()" class="">Valider</button></div>
                        </div>
                    </form>
                    <!--affichage posts-->
                    <div>
                        <h1 v-if ="posts.length !=0">Dernières Publications</h1>   
                        <h1 v-else> Aucune publication pour le moment, soyez le premier à en créer une ! </h1>
                    </div>
                    <div v-for="post in posts" :key="post.id" class="post">
                        <div class="post-header">
                            <div>
                                <span class="" >
                                    Posté par {{post.userName}} 
                                    le {{post.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + post.createdAt.slice(11,16)}}
                                </span>
                            </div>
                            <div class="icon-post">
                                <label class="label-post" @click="deletepost(post.id)" v-if="post.UserId == this.currentUserId || this.isAdmin == 'true'" >
                                    <i class="fa fa-trash"></i>
                                </label>
                            </div>           
                        </div>
                        <div class="container-post">
                            <p class="" v-if="post.post !== ''"> {{post.post}} </p>
                            <div class="img-post">
                                <img :src="post.postUrl" v-if="post.postUrl !== ''">
                            </div>
                            <div class="com-post">
                                <router-link :to="{ path: '/post/' + post.id}">commenter</router-link>
                            </div>
                        </div>
                        <!-- Section commentaire -->
                        
                    </div>
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
            const formData = new FormData()
            formData.set("image", this.file)
            formData.set("UserId", this.currentUserId.toString())
            formData.set("post", this.newPost.toString())
            axios.post("http://localhost:3000/api/posts", formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then(()=> {
                this.UserId = ""
                this.newPost = ""
                this.file = null
                alert('publication réussie')
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
    }
    
    .container{
        text-align: center;
    }
    .main-title{
        margin: 1.5rem;
        font-size: 1.5rem;
    }
    .new-post{
        width: auto;
        margin: 2rem auto;
    }
    /* .file-post{
        
    } */
    .show-img{
        max-width: 30rem;
        object-fit: cover;
    }
    .form-post{
        margin: 1rem 5rem;
        align-items: center;

    }
    .right-post{
        border-radius: 1em;
        width:40%;
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

    }
    .container-post {
        width: 50%;
        text-align: center;
        padding: 40px;
        border: 1px solid #fd2b01ab;
        display: block;
        margin: 0 auto;
        box-shadow: 0 1.2em 1.2em -0.5em rgb(128 128 128 / 19%) ;
    }
    .img-post img{
        max-width: 200px;
    }
    .item{
        align-items: center;
        margin: 10px auto;
        width: 60%;
        height: 100%;
        background-color: ivory;
        border-radius: 10px;
    }
</style>