import React from "react";
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/AuthReducer";
import {stateType} from "../../App";

type HeaderContainertype = {
    setAuthUserData:(id:number,email:string, login:string)=>void
    login:string |null
    isAuth:boolean
}

class HeaderContainer extends React.Component<HeaderContainertype> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email,login} = response.data.data;
                    this.props.setAuthUserData(id,email,login)
                }
            })
    };


    render() {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth}/>
        )
    }
}

const mapStateToProps = (state: stateType) => ({
    isAuth: state.auth.isAuth,
    login:state.auth.login
})
export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);