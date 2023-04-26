import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './Users.module.css'
import { getUsers, setCurrentPage } from '../../redux/UsersReducer'
import { Pagination, Typography } from '@mui/material'
import { User } from './User/User'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Preloader } from '../common/preloader/Preloader'

export const Users = () => {
   const users = useAppSelector(state => state.usersPage.users)
   const pageSize = useAppSelector(state => state.usersPage.pageSize)
   const totalUserCount = useAppSelector(state => state.usersPage.totalUserCount)
   const currentPage = useAppSelector(state => state.usersPage.currentPage)
   const isFetching = useAppSelector(state => state.usersPage.isFetching)
   const dispatch = useAppDispatch()

   const pageCount = Math.ceil(totalUserCount / pageSize)
   const [editMode, setEditMode] = useState(false)
   const [page, setPage] = useState(currentPage)

   const changeCurrentPage = (page: number) => {
      dispatch(getUsers({ currentPage: page, pageSize }))
      dispatch(setCurrentPage(page))
   }
   const editPage = () => {
      setEditMode(false)
      changeCurrentPage(page)
   }
   const setPageHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setPage(Number(e.currentTarget.value))
   }
   const handleChange = (event: any, value: number) => {
      changeCurrentPage(value)
   }

   useEffect(() => {
      dispatch(getUsers({ currentPage, pageSize }))
   }, [])

   return (
      <div>
         {isFetching && <Preloader />}
         <div className={styles.pagesBlock}>
            <Pagination
               count={pageCount}
               onChange={handleChange}
               page={currentPage}
               variant={'text'}
            />
            {editMode ? (
               <input value={page} type={'number'} onBlur={editPage} onChange={setPageHandler} />
            ) : (
               <Typography onDoubleClick={() => setEditMode(true)}>Page: {currentPage}</Typography>
            )}
         </div>
         {users.map(u => (
            <User {...u} key={u.id} />
         ))}
      </div>
   )
}
