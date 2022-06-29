import React, { useState, useEffect } from 'react'
import styles from './Task.module.css'
import Trash from '../../icons/Trash'
import ItemClient from '../../api/itemClient'



function Task({ item, flag, setFlag, loading, setLoading }) {

    const [checked, setChecked] = useState(item.status)

    const deleteItem = async (name) => {
        setLoading(true)
        const client = new ItemClient()
        const result = await client.deleteItem(name)
        if (result.status !== 200) {
            setLoading(false)
            alert("Something went wrong")
            return
        }
        setFlag(!flag)
        setLoading(false)
    }

    const changeStatus = async (item) => {
        setLoading(true)
        const client = new ItemClient()
        const result = await client.statusChanged(item)
        if (result.status !== 200) {
            setLoading(false)
            alert("Something went wrong")
            return
        }
        setFlag(!flag)
        setChecked(prev => !prev)
        setLoading(false)
    }

    return (
        <div className={styles.task_container}>
            <input
                onChange={(e) => changeStatus({ item: item.itemName, status: e.target.checked })}
                type='checkbox'
                className={styles.task_checkbox}
                checked={checked}>
            </input>
            <span className={styles.task_task_name}>{item.itemName}</span>
            <div className={styles.task_trash_icon} onClick={() => deleteItem(item.itemName)}>
                <Trash />
            </div>
        </div>
    )
}

export default Task