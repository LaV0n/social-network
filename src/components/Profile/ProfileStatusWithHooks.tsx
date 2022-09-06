import React, {ChangeEvent, useEffect, useState} from "react";


type ProfileStatusWithHooksType = {
    status: string
    updateStatus: (status: string) => void
}

export function ProfileStatusWithHooks(props: ProfileStatusWithHooksType) {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(()=>{
        setStatus(props.status)
    },[props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const diactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div onDoubleClick={activateEditMode}
             onBlur={diactivateEditMode}>
                <span style={{
                    fontSize: "1rem",
                    color: "rgba(214, 223, 237, 0.67)"
                }}
                > status </span>
            {!editMode
                ? status || "no status"
                : <input value={status}
                         autoFocus={true}
                         onChange={onStatusChange}
                />
            }
        </div>
    )
}

