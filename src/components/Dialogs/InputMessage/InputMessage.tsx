import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type FormDataType ={
    inputMessage:string
  }

const InputMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="inputMessage" placeholder={"Enter your message"} component="textarea"/>
            </div>
            <div>
                <button>add message</button>
            </div>
        </form>
    )
}

 export const InputMessageReduxForm =reduxForm<FormDataType>({
    // a unique name for the form
    form: 'inputMessage'
})(InputMessageForm)

