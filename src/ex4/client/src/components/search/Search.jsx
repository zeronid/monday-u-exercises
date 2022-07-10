import React, { useEffect, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import styles from './Search.module.css'

const Search = React.memo(({ setItems }) => {

    const reduxItems = useSelector(s => s.items)
    const searchBarRef = useRef(null)

    useEffect(() => {
        console.log(reduxItems)
    }, [reduxItems])

    const search = () => {
        const filteredItems = reduxItems.filter(item => {
            return item.itemName.includes(searchBarRef.current.value)
        })
        setItems(filteredItems)
    }

    const clear = () => {
        setItems(reduxItems)
    }

    return (
        <div className={styles.search_container}>
            <input ref={searchBarRef} className={styles.search_input}></input>
            <button className={styles.search_button} onClick={search}>S</button>
            <button className={styles.search_button} onClick={clear}>C</button>
        </div>
    )
})

export default Search