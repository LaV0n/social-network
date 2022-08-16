import React from "react";


type ProfileStatusType = {
    aboutMe: string
}

export class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode: false
    }
    activateEditMode = () => {
        this.setState({
            editMode:true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode:false
        })
    }

    render() {
        return (
            <div onDoubleClick={this.activateEditMode}

            onBlur={this.deactivateEditMode}>
                <span style={{
                    fontSize: "1rem",
                    color: "rgba(214, 223, 237, 0.67)"
                }}
                > about me </span>
                {!this.state.editMode
                    ? this.props.aboutMe
                    : <input value={this.props.aboutMe}   autoFocus={true}/>
                }
            </div>
        )
    }
}

