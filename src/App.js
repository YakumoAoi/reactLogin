import React, { Component } from 'react';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoItem from './todoItem'
import TodoInput from './todoInput'
import UserDialog from './userDialog'
import {getCurrentUser,logOut,todoModel} from './leanCloud'
import deepCopy from './deepCopy'

class App extends Component {
	constructor(props){
		super(props)
		this.state={
			user: getCurrentUser() || {},
			newTodo:"test",
			todoList:[]
		}
		let user=getCurrentUser()
		if(user){
			todoModel.getByUser(user,(todo)=>{
				let copyState=JSON.parse(JSON.stringify(this.state))
				copyState.todoList=todo
				this.setState(copyState)
			})
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
				{this.state.user.id ? <button onClick={this.logOut.bind(this)}>登出</button> : null}
				<div className="inputWarp">
					<TodoInput content={this.state.newTodo}
					onsubmit={this.addTodo.bind(this)}
					onChange={this.changetitle.bind(this)}/>
				</div>
				<ol className="inputItem">
					{todos}
				</ol>
				{this.state.user.id ? null : <UserDialog onSignUp={this.login.bind(this)} onSignIn={this.login.bind(this)}/>}
      		</div>
		)
	}
	logOut(){
		logOut()
		let copyState=deepCopy(this.state)
		copyState.user={}
		this.setState(copyState)
	}
	login(usr){
		let copyState=deepCopy(this.state)
		copyState.user=usr
		this.setState(copyState)
	}
	addTodo(event){
		if(!event.target.value){
			return 0
		}
		let newTodo={
			title:event.target.value,
			status:'',
			deleted:false
		}
		todoModel.create(newTodo,(id)=>{
			newTodo.id=id
			console.log('新添加的todo的deleted属性的值是'+''+newTodo.deleted)
			console.log('新添加的todo的标题是'+''+newTodo.title)
			console.log('新添加的todo的id是'+''+id)
			this.state.todoList.push(newTodo)
			this.setState({
				newTodo:'',
				todoList: this.state.todoList
			})
		},(error)=>{
			console.log(error)
		})
	}
	changetitle(event){
		this.setState({
			newTodo:event.target.value,
			todoList:this.state.todoList
		})
	}
	toggle(event,todo){
		let previousStatus=todo.state
		todo.status = todo.status === 'completed' ? '' : 'completed'
		todoModel.update(todo,()=>{
			this.setState(this.state)
		},(error)=>{
			todo.state=previousStatus
			this.setState(this.state)
		})
	}
	delete(event,todo){
		todoModel.destory(todo.id,()=>{
			todo.deleted=true
			this.setState(this.state)
		})
	}
}

export default App;
