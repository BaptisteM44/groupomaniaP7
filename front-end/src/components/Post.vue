<template>
    <div>
        <div class="container">
            <div class="">
                <div class="back-post">
                    <router-link to="/feed" class="">...retour aux posts</router-link>                
                </div>
                <div class="container-post" id="OnePost">
                    <!-- VOICI UN Post -->
                        <div class="post-header">
                            <span class="">
                                Posté par {{onePost.userName}}
                                <span v-if="!onePost.isActive" class="">(supprimé)</span>, 
                                le {{onePost.createdAt}}
                            </span>
                        </div> 
                        <div class="msg-post" :id="'PostContainer' + onePost.id">
                            <p class="" v-if="onePost.post !== ''"> {{onePost.post}} </p>
                        </div>
                        <div class="img-post">
                            <img  :src="onePost.postUrl" v-if="onePost.postUrl !== ''">
                        </div>
                        <div class="">
                            <p class="" v-if="onePost.comments === 0">Il n'y a aucun commentaire.</p>
                            <p class="h6 small" v-if="onePost.comments > 1">Il y a {{onePost.comments}} commentaires.</p>
                        </div>
                    <!-- FIN DU Post -->
                </div>
                <div class="">
                    <form enctype="multipart/form-data">
                        <div class="title-com">
                            <p>Poster un nouveau commentaire</p>
                        </div>
                        <div class="form-post">
                            <textarea class="right-post" v-model="newComment" id="newComment" name="comment" rows="10" placeholder="Votre commentaire ici..." required :class="{ 'is-invalid': submitted && !newComment }"></textarea>
                            <div v-show="submitted && !newComment" class="">Un commentaire est requis !</div>
                        </div>
                        <div class="valid-post">
                            <button type="submit" @click.prevent="addNewComment()" class="">Valider</button>
                            <router-link to="/feed" class="">annuler</router-link>
                        </div>
                    </form>
                </div>
                <div v-for="comment in comments" :key="comment.id" class="block-comments">
                    <div class="">
                        <span class="info-comment">
                            Commentaire de {{comment.User.userName}} 
                            <span v-if="!comment.User.isActive" class="">(supprimé)</span>, 
                            le {{comment.createdAt.slice(0,10).split('-').reverse().join('/')}}
                            <label @click.prevent="deleteComment(comment.id)" v-if="comment.UserId == this.currentUserId || this.isAdmin == 'true'" class="delete__comment" ><i class="fa fa-fw fa-trash"></i></label>
                        </span>
                        <div :id="'adcom' + comment.id"  v-if="comment.UserId == this.currentUserId || this.isAdmin == 'true'"></div>
                    </div>
                    <div class="comment">
                        <p> {{comment.comment}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "Commentaires",
    data() {
        return {
            newComment: null,
            currentUserId: "",
            postId: "",
            submitted: false,
            isAdmin: false,
            isActive: true,
            onePost: [],
            comments: [],
        }
    },
    methods: {
        addNewComment() {
            this.submitted = true
            axios.post("http://localhost:3000/api/comments/", { "PostId": this.$route.params.id, "UserId": this.currentUserId, "comment": this.newComment }, { headers: { "Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(()=> {
                location.reload();
            })
            .catch(function(error) {
                const codeError = error.post.split("code ")[1]
                console.log(codeError);
            })
        },
        deleteComment(commentId) {
            let confirmpostDelete = confirm("Voulez-vous vraiment supprimer ce commentaire ?");
            if (confirmpostDelete == true) {
                axios.delete("http://localhost:3000/api/comments/" + commentId,
                {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
                })
                .then((res)=> {
                    console.log(res)
                    location.reload()
                })
                .catch((error) => { 
                    location.reload();
                    console.log(error)})
            } else {
                return
            }
    },
    },
    created: function () {
        this.isAdmin = localStorage.getItem("role")
        this.currentUserId = localStorage.getItem("userId")
        axios.get("http://localhost:3000/api/posts/" + this.$route.params.id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {
            this.onePost = res.data
        })
        .catch((error)=> {
            console.log(error); 
        })
        axios.get("http://localhost:3000/api/comments/posts/" + this.$route.params.id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(cmt => {
            this.comments = cmt.data
        })
        .catch(function(error) {
            console.log(error);
        })
    }
}
</script>

<style>
body{
    font-family: 'Lato', sans-serif;
}
.back-post{
    margin-bottom: 2rem;
    padding-top: 2rem;
}
.back-post a{
    color: #fd2b01ab;
}
.back-post a:hover{
    color: #fd2b014b;
}
.valid-post button{
    margin-right: 1rem;
}
.block-comments{
    border-bottom: 1px solid black;
    padding-bottom: 1rem;
}
.title-com{
    margin: 1rem auto;
    font-weight: 700;
}
.info-comment{
    display: flex;
    justify-content: space-between;
    margin: 1rem;
    font-size: 12px;
}
.delete__comment{
    cursor: pointer;
    align-items:flex-end;
}
.comment{
    font-size: 18px;
    font-weight: 700;
}
    
</style>