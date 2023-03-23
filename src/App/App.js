 import React from "react";
 import Header from "../Header/Header";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
 import './App.css'

 const App = () => {

    const data = [
        {descr:'Завершенная задача',class:'completed',id:1},
        {descr:'Editing task',class:'editing',id:2},
        {descr:'Активная задача',class : null,id:3},

    ]

    return (
        <section className="todoapp">
            <Header/>
            <section  className="main">
                <TaskList dataTasks={data}/>
                <Footer/>
            </section>
        </section>
    )

}


export default App