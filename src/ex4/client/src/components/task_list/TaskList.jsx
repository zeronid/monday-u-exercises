import React from 'react'
import Task from '../task/Task'
import { v4 as uuidv4 } from 'uuid';
import styles from './TaskList.module.css'
import PropTypes from 'prop-types';
function TaskList({ flag, setFlag, setLoading, items, setItems }) {

  return (
    <div className={styles.task_list_container}>
      <ul className={styles.task_list_ul}>
        {items.map((item) => {
          return (
            <div key={uuidv4()}>
              <Task setLoading={setLoading} setFlag={setFlag} item={item} />
              <hr ></hr>
            </div>
          )
        })}
      </ul >
    </div>
  )
}

TaskList.propTypes = {
  flag: PropTypes.bool,
  setFlag: PropTypes.func,
  setLoading: PropTypes.func,
}

export default TaskList