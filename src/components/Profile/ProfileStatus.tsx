import React, {ChangeEvent} from "react";

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: ProfileStatusType, prevState: ProfileStatusType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div onDoubleClick={this.activateEditMode}
                 onBlur={this.deactivateEditMode}
                 style={{cursor:'help'}}
            >
                <span style={{
                    fontSize: "1rem",
                    color: "rgba(214, 223, 237, 0.67)",
                    cursor:'pointer'
                }}
                > status </span>
                {!this.state.editMode
                    ? this.props.status || "no status"
                    : <input value={this.state.status}
                             autoFocus={true}
                             onChange={this.onStatusChange}
                    />
                }
            </div>
        )
    }
}

