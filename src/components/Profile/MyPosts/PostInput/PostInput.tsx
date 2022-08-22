import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type FormDataType ={
    newPost:string
}

const PostInputForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="postInput" placeholder={"Enter your message"} component="textarea"/>
            </div>
            <div>
                <button>post</button>
            </div>
        </form>
    )
}

export const PostInputReduxForm =reduxForm<FormDataType>({
    // a unique name for the form
    form: 'postInput'
})(PostInputForm)

