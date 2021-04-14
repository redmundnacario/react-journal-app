import React from 'react'

import TasksList from './tasks.list.component'
import Button from '../../shared/button/button.component'

import './tasks.page.styles.scss'

const TasksPage = (props) => {
    const { journal,
            button_props,
            tasks_today,
            tasks
        } = props
    return (
        
        <div className="container">
            <div className="task-page-title my-5">
                <h1 >🚀 {journal.title}</h1>
                <Button {...button_props}/>
            </div>
            {
                tasks_today.length > 0
                ? <TasksList tasks={tasks_today} title={"Due Today!"} />
                : ""
            }
            {
                tasks.length > 0
                ? <TasksList tasks={tasks} title={"All Tasks"} />
                : 
                (<div className="mt-5">
                    <h2>All Tasks</h2>
                    <h4>No Tasks yet. You can create one!</h4>
                </div>)
            }
        </div>
        
    )
}

export default TasksPage
