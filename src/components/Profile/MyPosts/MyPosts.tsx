import React from 'react'
import classes from './MyPosts.module.css'
import Post from './Posts/Post'
import { FormDataType, PostInputReduxForm } from './PostInput/PostInput'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { addPost } from '../../../redux/ProfileReducer'

export const MyPosts = React.memo(() => {
   const dispatch = useAppDispatch()
   const posts = useAppSelector(state => state.profilePage.postsData)
   const userId = useAppSelector(state => state.profilePage.profile?.userId)
   const loginId = useAppSelector(state => state.auth.id)
   const smallAvatar = useAppSelector(state => state.profilePage.profile?.photos?.small)
   const postsElements = posts.map(message => (
      <Post
         key={message.id}
         message={message.message}
         likeCount={message.likeCount}
         smallAvatar={smallAvatar}
      />
   ))

   const addPostHandler = (value: FormDataType) => {
      dispatch(addPost(value.postInput))
   }

   return (
      <div className={classes.post_block}>
         {userId === loginId && (
            <div>
               <h3> My New Post</h3>
               <PostInputReduxForm onSubmit={addPostHandler} />
            </div>
         )}
         <div className={classes.posts}>{postsElements}</div>
      </div>
   )
})
