import React from 'react'
import classes from './MyPosts.module.css'
import Post from './Posts/Post'
import { PostInput } from './PostInput/PostInput'
import { useAppSelector } from '../../../redux/store'

export const MyPosts = () => {
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

   return (
      <div className={classes.post_block}>
         {userId === loginId && (
            <div>
               <h3> My New Post</h3>
               <PostInput />
            </div>
         )}
         <div className={classes.posts}>{postsElements}</div>
      </div>
   )
}
