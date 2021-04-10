import React from 'react'

import TaskCard from '../../layout/cards/tasks/task.card.component'

const TaskList = ({tasks, title}) => {

    return (
        <div className="task-list">
            <h3>{title}</h3>
            <div>
                {
                tasks.map((single_task, index) => (
                    // console.log(single_tasks)
                    // console.log(index)
                    <TaskCard key ={index} task={single_task}/>
                ))
                }
            </div>
        </div>
    )
}

export default TaskList
