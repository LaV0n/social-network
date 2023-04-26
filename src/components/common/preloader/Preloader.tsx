import React from 'react'
import PreloaderImg from './../../../assets/img/preloader.svg'
import styles from './Preloader.module.css'

export const Preloader = () => {
   return (
      <div className={styles.block}>
         <img src={PreloaderImg} alt="0" className={styles.img} />
      </div>
   )
}
