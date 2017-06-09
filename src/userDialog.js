import React from 'react'
import './userDialog.css'
import {signUp,signIn} from './leanCloud'
import deepCopy from './deepCopy'

class userDialog extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selected:'signIn',
            loginPanel:'signInOrSignUp',
            formDate:{
                username:'',
                password:'',
                email:''
            },
            checkPassword:''
        }
    }
    switch(e){
        this.setState({
            selected:e.target.value
        })
    }
    signIn(e){
         e.preventDefault()
        let {password,username}=this.state.formDate
        let success=(username)=>{
            this.props.onSignIn.call(null,username)
        }
        let error=(error)=>{
            switch(error.code){
                case 210:
                alert("用户名和密码不匹配")
                break
                case 211:
                alert("用户名不存在")
                break
                default:
                alert(error)
            }
        }
        signIn(username,password,success,error)
    }
    signUp(e){
        e.preventDefault()
        let {email,password,username}=this.state.formDate
        if(!username){return alert("请输入用户名")}
        if(!password){return alert("请输入密码")}
        if(!email){return alert("邮箱不得为空")}
        let checkPassword=this.state.checkPassword
        if(password!==checkPassword){
            return alert("两次密码不一致")
        }
        let success=(username)=>{
            this.props.onSignUp.call(null,username)
        }
        let error=(error)=>{
            switch(error.code){
                case 202:
                alert("用户名已存在")
                break
                default:
                alert(error)
            }

        }
        signUp(email,username,password,success,error)
    }
    changeForm(key,e){
        let stateCopy=deepCopy(this.state)
        stateCopy.formDate[key]=e.target.value
        this.setState(stateCopy)
    }
    checkPassword(e){
        let stateCopy=deepCopy(this.state)
        stateCopy.checkPassword=e.target.value
        this.setState(stateCopy)
    }
    switchPanel(key){
        let stateCopy=deepCopy(this.state)
        stateCopy.loginPanel=key
        this.setState(stateCopy)
    }
    render(){
        let signInForm=
            <form className="login" onSubmit={this.signIn.bind(this)}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text"  value={this.state.formDate.username} onChange={this.changeForm.bind(this,"username")}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formDate.password} onChange={this.changeForm.bind(this,"password")}/>
                </div>
                <div className="row actions">
                    <button type="submit">登陆</button>
                    <a href="#" onClick={this.switchPanel.bind(this,'forgetPassword')}>忘记密码了吗？</a>
                </div>

            </form>
        let signUpForm=                        
            <form className="register" onSubmit={this.signUp.bind(this)}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text"  value={this.state.formDate.username} onChange={this.changeForm.bind(this,"username")}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formDate.password} onChange={this.changeForm.bind(this,"password")}/>
                </div>
                <div className="row confirm">
                    <label>确认密码</label>
                    <input type="password" value={this.state.checkPassword} onChange={this.checkPassword.bind(this)}/>
                </div>
                <div className="row">
                    <label>邮箱</label>
                    <input type="email" value={this.state.formDate.email} onChange={this.changeForm.bind(this,"email")}/>
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>
        let signInOrSignUp=
            <div>
                <nav onChange={this.switch.bind(this)}>
                    <label><input type="radio" value="signIn" checked={this.state.selected==="signIn"} onChange={this.switch.bind(this)}/>登陆</label>
                    <label><input type="radio" value="signUp" checked={this.state.selected==="signUp"} onChange={this.switch.bind(this)}/>注册</label>
                </nav>
                <div className="pane">
                    {this.state.selected==="signIn"?signInForm:null}
                    {this.state.selected==="signUp"?signUpForm:null}
                </div>
            </div>
        let forgetPassword=
            <div className="forgetPassword">
                <h3>
                    重置密码
                </h3>
                <form>
                    <div className="row">
                        <label>邮箱</label>
                        <input type="email" value={this.state.formDate.email} onChange={this.changeForm.bind(this,"email")}/>
                    </div>
                    <div className="row actions">
                        <button type="submit">找回密码</button>
                        <a href="#" onClick={this.switchPanel.bind(this,'signInOrSignUp')}>返回登陆</a>
                    </div>
                </form>
            </div>
        return (
            <div className="dialog-container">
                <div className="dialog">
                    {this.state.loginPanel==="signInOrSignUp"?signInOrSignUp:null}
                    {this.state.loginPanel==="forgetPassword"?forgetPassword:null}
                </div>
            </div>
        )
    }
}
export default userDialog