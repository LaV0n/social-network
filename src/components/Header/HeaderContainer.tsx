import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../redux/AuthReducer'
import { RootState } from '../../redux/redux-store'

type HeaderContainertype = {
   login: string | null
   isAuth: boolean
   logout: () => void
}

class HeaderContainer extends React.Component<HeaderContainertype> {
   render() {
      return (
         <Header login={this.props.login} isAuth={this.props.isAuth} logout={this.props.logout} />
      )
   }
}

const mapStateToProps = (state: RootState) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login,
})
export default connect(mapStateToProps, { logout })(HeaderContainer)
