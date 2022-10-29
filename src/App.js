import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header"
import Form from "./components/Form"
import uuid from 'react-uuid';
import List from './components/todo-list';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Confetti from 'react-confetti';



function App() {

  //Main State to store the list of ToDo
  const [toDo, setToDo] = useState(
    JSON.parse(localStorage.getItem('toDo'))
    || [])

  //Temp State to store the form input and update toDo list
  const [taskInput, setTaskInput] = useState('')
  const [updateToDo, setUpdateToDo] = useState('')

  //Hook to store all values to localStorage
  useEffect(() => {
    localStorage.setItem('toDo', JSON.stringify(toDo))
  },[toDo])


  //Hook to check and manage updates
  useEffect (() => {
    updateToDo ? setTaskInput(updateToDo.task) : setTaskInput('')
  }, [setTaskInput, updateToDo])


  function isAllTaskCompleted() {
    return toDo.length && toDo.every((task) => task.isCompleted);
  }

  //Form input change handler
  function handleChange(event) {
        setTaskInput(event.target.value)
  }

   // Handle the completed task
  function handleCompleted(id) {
    const newTask = toDo.map(task => {
      if(task.id === id) {
        return ({...task, isCompleted: !task.isCompleted})
      }
      return task;
    })
    setToDo (newTask)
  }

  //Adding tasks to ToDo list on Add button
  function addToDo(event) {
    event.preventDefault()
    if(taskInput && !updateToDo) {
      let taskId = uuid()
      let tasks = {id: taskId, task: taskInput, isCompleted: false, timeStamp: Date.now()}
      setToDo([tasks, ...toDo])
      setTaskInput("")
    } 
    else {
      handleUpdate (updateToDo.id, taskInput, updateToDo.isCompleted)
    }
  }
  // Delete list items
  function handleDelete(id) {
    const newToDo = toDo.filter(list => {
      return list.id !== id
    })

    setToDo(newToDo)
  }
  
  //Edit todo list
  function handleEdit(id) {
    let taskFind = toDo.find(task => task.id === id)
    setUpdateToDo(taskFind)
  }

  //Update the edited value
  function handleUpdate(id, task, isCompleted) {
    let newTask = {id: id, task: task, isCompleted: isCompleted, timeStamp: Date.now()}
    const updatedTask = toDo.map(task => { 
      return task.id === id ? newTask : task
  })
    setToDo (updatedTask)
    setUpdateToDo('')

  }


  return (
    <div className="App bg-dark">
      {isAllTaskCompleted() && <Confetti />}
        <Header />
        <Form 
          handleChange={handleChange}
          handleSubmit={addToDo}
          value={taskInput}
          updateToDo={updateToDo}
        />
        <List 
          toDo={toDo}
          handleCompleted={handleCompleted}
          handleDelete = {handleDelete}
          handleEdit={handleEdit}
        />
        
    </div>
  );
}
export default App;
