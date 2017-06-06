import React, { Component } from 'react';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoItem from './todoItem'
import TodoInput from './todoInput'
import UserDialog from './userDialog'

class App extends Component {
	constructor(props){
		super(props)
		this.state={
			user:{},
			newTodo:"test",
			todoList:[]
		}
	}
	render() {
		let todos=this.state.todoList.filter((item)=>!item.deleted)
		.map((item,index)=>{
			return (    //需要返回多行内容或是内容的开头和return语句不在同一行时，需要加上()来让return返回括号内数据
				<li key={index}>
					<TodoItem todo={item} onToggle={this.toggle.bind(this)}
					onDelete={this.delete.bind(this)}/> 
				</li>
			)
		})
		return (
			<div className="App">
				<h1>{this.state.user.username||"我"}的待办</h1>
				<div className="inputWarp">
					<TodoInput content={this.state.newTodo}
					onsubmit={this.addTodo.bind(this)}
					onChange={this.changetitle.bind(this)}/>
				</div>
				<ol className="inputItem">
					{todos}
				</ol>
				<UserDialog onSignUp={this.signUp.bind(this)}/>
      		</div>
		)
	}
	componentDidUpdate(){
	}
	signUp(user){
		this.state.user=user
		this.setState(this.state.user)
	}
	addTodo(event){
		if(!event.target.value){
			return 0
		}
		this.state.todoList.push({
			id:count(),
			title:event.target.value,
			status:null,
			deleted:false
		})
		this.setState({
			newTodo:'',
			todoList:this.state.todoList
		})
	}
	changetitle(event){
		this.setState({
			newTodo:event.target.value,
			todoList:this.state.todoList
		})
	}
	toggle(event,todo){
		todo.status = todo.status === 'completed' ? '' : 'completed'
		this.setState(this.state)
	}
	delete(event,todo){
		todo.deleted=true
		this.setState(this.state)
	}
}

export default App;

let id=0

function count(){
	id+=1
	return id
}