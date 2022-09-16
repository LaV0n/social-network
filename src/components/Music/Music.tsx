import React from "react";
import styles from "./Music.module.css";

export const Music =  () => {
    return(
        <div className={styles.content}>
            Music example
            <audio src={'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'} controls/>
        </div>
    )
}
