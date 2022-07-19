import React from "react";
import {addMessageActionCreate, updateMessageActionCreate} from "../../redux/DialogsReducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = () => {

    return <StoreContext.Consumer>
            {store => {
                let onChangeMessageHandler = (text: string) => {
                    store.dispatch(updateMessageActionCreate(text));
                }

                let addMessageHandler = () => {
                    store.dispatch(addMessageActionCreate());
                }
                return <Dialogs onChangeMessageHandler={onChangeMessageHandler}
                                addMessageHandler={addMessageHandler}
                                dialogs={store.getState().messagesPage.dialogsData}
                                messagesList={store.getState().messagesPage.messagesData.messageList}
                                newMessage={store.getState().messagesPage.messagesData.newMessage}
                />
            }
            }
        </StoreContext.Consumer>
}
export default DialogsContainer