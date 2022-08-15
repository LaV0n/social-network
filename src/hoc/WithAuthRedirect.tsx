import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {storeType} from "../redux/redux-store";

type MapStatePropsType = {
    isAuth:boolean
}

let mapsStateToPropsForRedirect = (state:storeType ):MapStatePropsType => {
    return {
        isAuth:state.auth.isAuth
    }
}


export function WithAuthRedirect <T>(Component:ComponentType<T>) {
    function RedirectComponent(props:MapStatePropsType) {
        let {isAuth, ...restProps} =props
        if (!isAuth) return <Redirect to='/login'/>
        return <Component {...restProps as T}/>;
    }

    let ConnectedAuthRedirectComponent = connect(mapsStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}
