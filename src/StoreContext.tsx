import React from "react";
import {storeType} from "./redux/redux-store";

const StoreContext = React.createContext({} as storeType)

type ProviderType={
    store:storeType
    children:any
}

export  const Provider = (props:ProviderType) =>{
    return <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
}

export default StoreContext