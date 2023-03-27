 import React, {Component} from "react";
 import Header from "../Header/Header";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
 import './App.css'

export default class App extends Component {

    state = {
        data: [
            {descr:'Завершенная задача',class:'completed',id:0},
            {descr:'Editing task',class:'edit',id:1},
            {descr:'Активная задача',class : null,id:2},
    
        ],
        done: false
    }
    // onToggle = (id) => {
    //     this.setState(({data,done}) => {
    //         const arr = data
    //         const res = arr.map((el,i) => {
    //             return id === i ?(done ? {...el, class:null} :{...el, class:'completed'} ) : el
    //         })

    //         return {
    //             done:!done,
    //             data:res
                
                
    //         }
    //     })
        
    // }
    
    render () {
        const {data} = this.state
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
   

}


