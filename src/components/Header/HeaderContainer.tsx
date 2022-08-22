import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout } from "../../redux/AuthReducer";
import {stateType} from "../../App";


type HeaderContainertype = {
    login:string |null
    isAuth:boolean
    getAuthUserData:()=>void
    logout:()=>void
}

class HeaderContainer extends React.Component<HeaderContainertype> {
    componentDidMount() {
        this.props.getAuthUserData()
    };

    render() {
        return (
            <Header login={this.props.login}
                    isAuth={this.props.isAuth}
                    logout={this.props.logout}/>
        )
    }
}


const mapStateToProps = (state: stateType) => ({
    isAuth: state.auth.isAuth,
    login:state.auth.login
})
export default connect(mapStateToProps, {getAuthUserData,logout})(HeaderContainer);