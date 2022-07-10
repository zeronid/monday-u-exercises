import React from 'react'
import { useSelector } from 'react-redux'
import styles from './Done.module.css'

const DoneBar = React.memo(({ setItems }) => {

    const reduxItems = useSelector(s => s.items)

    const showDone = () => {
        console.log(reduxItems)
        const newItems = reduxItems.filter(item => {
            return item.status
        })
        setItems(newItems)
    }

    const hideDone = () => {
        const newItems = reduxItems.filter(item => {
            return !item.status
        })
        setItems(newItems)
    }

    return (
        <div className={styles.done_container}>
            <button className={styles.button} onClick={showDone}>Show done</button>
            <button className={styles.button} onClick={hideDone}>Hide Done</button>
        </div>
    )
})

export default DoneBar