import React from 'react'
import classes from './MyPosts.module.css'
import { postDataType } from './MyPostsContainer'
import Post from './Posts/Post'
import { FormDataType, PostInputReduxForm } from './PostInput/PostInput'

type MyPostsType = {
   addPost: (value: string) => void
   posts: postDataType[]
   smallAvatar: string | undefined
}

const MyPosts = React.memo((props: MyPostsType) => {
   const postsElements = props.posts.map(message => (
      <Post
         key={message.id}
         message={message.message}
         likeCount={message.likeCount}
         smallAvatar={props.smallAvatar}
      />
   ))

   const addPost = (value: FormDataType) => {
      props.addPost(value.postInput)
   }

   return (
      <div className={classes.post_block}>
         <div>
            <h3> My New Post</h3>
            <PostInputReduxForm onSubmit={addPost} />
         </div>
         <div className={classes.posts}>{postsElements}</div>
      </div>
   )
})
export default MyPosts
