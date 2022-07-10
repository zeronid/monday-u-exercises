import React, { useEffect, useState } from 'react'
import Card from '../../components/card/Card'
import AddTask from '../../components/add_task/AddTask'
import TaskList from '../../components/task_list/TaskList'
import styles from './Home.module.css'
import Loader from '../../components/loader/Loader'
import Search from '../../components/search/Search'
import { useDispatch, useSelector } from 'react-redux'
import ItemClient from '../../api/itemClient'
import { set_items } from '../../REDUX/actions/constants'
import DoneBar from '../../components/done_bar/DoneBar'

function Home() {

    const [itemsFlag, setItemsFlag] = useState(true)
    const [loading, setLoading] = useState(false)

    const [items, setItems] = useState([])
    const dispatch = useDispatch()
    const reduxItems = useSelector(s => s.items)

    useEffect(() => {
        if (reduxItems?.length > 0) {
            setItems(reduxItems)
        }
    }, [reduxItems])

    useEffect(() => {
        const getItemsFromServer = async () => {
            setLoading(true)
            const client = new ItemClient()
            const newItems = await client.getItems()
            dispatch(set_items(newItems))
            setLoading(false)
        }
        getItemsFromServer()
    }, [itemsFlag])

    return (
        <div className={styles.home_container}>
            {loading && <Loader />}
            <Card width={"30%"} height={"75%"} heading={"Todo App"}>
                <AddTask setLoading={setLoading} flag={itemsFlag} setFlag={setItemsFlag} />
                <Search setItems={setItems} />
                <DoneBar setItems={setItems} />
                <TaskList
                    setLoading={setLoading}
                    flag={itemsFlag}
                    setFlag={setItemsFlag}
                    items={items}
                    setItems={setItems}
                />
            </Card>
        </div>
    )
}

export default Home