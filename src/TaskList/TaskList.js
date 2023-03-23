import React from "react";
import View from "../View/View";
import './TaskList.css'

const TaskList = ({dataTasks}) => {
  const itemTasks = dataTasks.map(item => {
    
    return <li key={item.id} className={item.class}>
                <View descr={item.descr}/> 
                <input type={"text"} className="edit" value={"Editing task"}></input> 
           </li>
  })


  return <ul className="todo-list">
            {itemTasks}
         </ul>
}


export default TaskList