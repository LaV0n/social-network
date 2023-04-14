import React, { ChangeEvent, useEffect, useState } from 'react'
import { updateStatus } from '../../../../redux/ProfileReducer'
import { useAppDispatch, useAppSelector } from '../../../../redux/redux-store'

export function ProfileStatus({ isOwner }: { isOwner: boolean }) {
   const initialStatus = useAppSelector(state => state.profilePage.status)
   const [editMode, setEditMode] = useState(false)
   const [status, setStatus] = useState(initialStatus)
   const dispatch = useAppDispatch()

   useEffect(() => {
      setStatus(initialStatus)
   }, [initialStatus])

   const activateEditMode = () => {
      setEditMode(true)
   }
   const diactivateEditMode = () => {
      setEditMode(false)
      dispatch(updateStatus(status))
   }
   const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
      setStatus(e.currentTarget.value)
   }

   return (
      <div
         onDoubleClick={activateEditMode}
         onBlur={diactivateEditMode}
         style={isOwner ? { cursor: 'pointer' } : { cursor: 'default' }}
      >
         <span
            style={{
               fontSize: '1rem',
               color: 'rgba(214, 223, 237, 0.67)',
               marginRight: '2px',
            }}
         >
            status
         </span>
         {editMode && isOwner ? (
            <input value={status} autoFocus={true} onChange={onStatusChange} />
         ) : (
            status
         )}
      </div>
   )
}
