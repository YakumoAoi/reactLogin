import React, { Component } from 'react';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoItem from './todoItem'
import TodoInput from './todoInput'
import * as local from './localStorage'

// var APP_ID = 'bgqkvywT0kEB881JDKJwgqIS-gzGzoHsz';
// var APP_KEY = 'vCwj1qbJtDaiwmQSulSq9ohj';
// AV.init({
//   appId: APP_ID,
//   appKey: APP_KEY
// });

class App extends Component {
	constructor(props){
		super(props)
		this.state={
			newTodo:"test",
			todoList:JSON.parse(local.load('todoList'))||[]
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
				<h1>我的待办</h1>
				<div className="inputWarp">
					<TodoInput content={this.state.newTodo}
					onsubmit={this.addTodo.bind(this)}
					onChange={this.changetitle.bind(this)}/>
				</div>
				<ol className="inputItem">
					{todos}
				</ol>
      		</div>
		)
	}
	componentDidUpdate(){
		local.save('todoList',this.state.todoList)
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