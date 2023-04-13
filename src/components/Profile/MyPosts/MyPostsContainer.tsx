import MyPosts from './MyPosts'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { addPost } from '../../../redux/ProfileReducer'
import { RootState } from '../../../redux/redux-store'

export type profileStateType = {
   postsData: postDataType[]
}
export type postDataType = {
   id: number
   message: string
   likeCount: number
}

const mapStateToProps = (state: RootState) => {
   return {
      posts: state.profilePage.postsData,
      smallAvatar: state.profilePage.profile?.photos?.small,
   }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
   return {
      addPost: (value: string) => {
         dispatch(addPost(value))
      },
   }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
