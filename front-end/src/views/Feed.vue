<template>
    <!--Création post-->
    <div>
        <div class="container">
            <div class="">
                <div class="" id="allposts">
                    <form enctype="multipart/form-data">
                        <div class="">
                            <p class="modal-title h5">Poster un nouveau post</p>
                        </div>
                        <div class="">
                            <div class="">
                                <label for="newPost" class="sr-only">Post :</label>
                                <textarea class="" v-model="newPost" id="newPost" name="Post" rows="10" placeholder="Votre post ici..."></textarea>
                            </div>
                            <div class="">
                                <img :src="newImage" class="">
                                <p class="">Image à partager</p>
                            </div>
                            <div class="">
                                <div class="">
                                    <label for="File" class="">Choisir une nouvelle photo</label>
                                    <input @change="onFileChange()" type="file" ref="file" name="image" class="" id="File" accept=".jpg, .jpeg, .gif, .png">
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <div class="">
                                <div class=""><button type="submit" @click.prevent="addNewPost()" class="">Valider</button></div>
                            </div>
                        </div>
                    </form>
                    <!--affichage posts-->
                    <div>
                        <h1 v-if ="posts.length !=0">Dernières Publications</h1>   
                        <h1 v-else> Aucune publication pour le moment, soyez le premier à en créer une ! </h1>
                    </div>
                    <div v-for="post in posts" :key="post.id" class="">
                        <div class="">
                            <div>
                                <span class="" >
                                    Posté par {{post.userName}} 
                                    le {{post.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + post.createdAt.slice(11,16)}}
                                </span>
                            </div>
                            <div v-if="post.UserId == this.currentUserId || this.isAdmin == 'true'">
                                <a :href="'#/post/edit/' + post.id">Editer post</a>
                                <a :href="'#/post/drop/' + post.id">Supprimer post</a>
                            </div>                     
                        </div>
                        <div class="container-post">
                            <p class="" v-if="post.post !== ''"> {{post.post}} </p>
                            <img class="w-100" :src="post.postUrl" v-if="post.postUrl !== ''">
                        </div>
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
            axios.post("http://127.0.0.1:3000/api/posts", formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
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
        }
    },
    created: function() {
        this.isAdmin = localStorage.getItem("role")
        this.currentUserId = localStorage.getItem("userId")
        if (localStorage.getItem("refresh")===null) {
            localStorage.setItem("refresh", 0)
            location.reload()
        }
        axios.get("http://127.0.0.1:3000/api/posts",{ headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {
            this.posts = res.data.ListePosts
            console.log(this.post)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
}
</script>

<style>
    body {
        background-color: #6c7d99;
        text-align: center;
        align-items: center;
    }
    .container{
        text-align: center;
    }

    .container-post {
        text-align: center;
        margin: auto 50px;
        padding: 40px;
        border: 1px solid;
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