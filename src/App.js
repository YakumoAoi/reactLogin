import React, { Component } from 'react';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoItem from './todoItem'
import TodoInput from './todoInput'
import UserDialog from './userDialog'
import {getCurrentUser,logOut} from './leanCloud'
import deepCopy from './deepCopy'
import AV from './leanCloud'

 var TodoFolder = AV.Object.extend('TodoFolder');
  // 新建对象
  var todoFolder = new TodoFolder();
  // 设置名称
  todoFolder.set('name','工作');
  // 设置优先级
  todoFolder.set('priority',1);
  todoFolder.save().then(function (todo) {
    console.log('objectId is ' + todo.id);
  }, function (error) {
    console.error(error);
  });

class App extends Component {
	constructor(props){
		super(props)
		this.state={
			user: getCurrentUser() || {},
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