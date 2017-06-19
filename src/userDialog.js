import React from 'react'
import './userDialog.css'
import {signUp,signIn,sendResetPasswordEmail} from './leanCloud'
import deepCopy from './deepCopy'
import SignInOrSignUp from './signInOrSignUp'
import forgetPasswordForm from './forgetPassword'

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
    resetPassword(e){
        e.preventDefault()
        let email=this.state.formDate.email
        let success=()=>{
            return alert('重置邮件已发送，请注意查收')
        }
        let fail=(error)=>{
            switch(error.code){
                case 1:
                alert(error)
                break
                case 205:
                alert("邮箱对应的账号不存在")
                break
                case 204:
                alert("请输入邮箱账号")
                break
                default:
                alert(error)
            }
        }
        sendResetPasswordEmail(email,success,fail)
    }
    render(){
        return (
            <div className="dialog-container">
                <div className="dialog">
                    {this.state.loginPanel==="signInOrSignUp"?<SignInOrSignUp
                    copyState={this.state}
                    onChangePanel={this.switch.bind(this)}
                    onChangeForm={this.changeForm.bind(this)}
                    onSignIn={this.signIn.bind(this)}
                    onSwitchPanel={this.switchPanel.bind(this)}
                    onSignUp={this.signUp.bind(this)}
                    onCheckPassword={this.checkPassword.bind(this)}
                    />:null}
                    {this.state.loginPanel==="forgetPassword"?
                    <forgetPasswordForm
                    formDate={this.state.formDate}
                    onChangeForm={this.changeForm.bind(this)}
                    onResetPasswrod={this.resetPassword.bind(this)}
                    onSwitchPanel={this.switchPanel.bind(this)}
                    />:null}
                </div>
            </div>
        )
    }
}
export default userDialog