import React from 'react'
import './userDialog.css'

class userDialog extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selected:'signIn',
            formDate:{
                user:'',
                password:''
            }
        }
    }
    switch(e){
        this.setState({
            selected:e.target.value
        })
    }
    signIn(e){}
    signUp(e){}
    changeForm(key,e){
        let stateCopy=JSON.parse(JSON.stringify(this.state))
        stateCopy.formDate[key]=e.target.value
        this.setState(stateCopy)
    }
    render(){
        let signInForm=
            <form className="login" onSubmit={this.signIn.bind(this)}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text"  value={this.state.formDate.user} onChange={this.changeForm.bind(this,"user")}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formDate.password} onChange={this.changeForm.bind(this,"password")}/>
                </div>
                    <div className="row actions">
                    <button type="submit">登陆</button>
                </div>
            </form>
        let signUpForm=                        
            <form className="register" onSubmit={this.signUp.bind(this)}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text"  value={this.state.formDate.user} onChange={this.changeForm.bind(this,"user")}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formDate.password} onChange={this.changeForm.bind(this,"password")}/>
                </div>
                <div className="row confirm">
                    <label>确认密码</label>
                    <input type="password" />
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>

        return (
            <div className="dialog-container">
                <div className="dialog">
                    <nav onChange={this.switch.bind(this)}>
                        <label><input type="radio" value="signIn" checked={this.state.selected==="signIn"} onChange={this.switch.bind(this)}/>登陆</label>
                        <label><input type="radio" value="signUp" checked={this.state.selected==="signUp"} onChange={this.switch.bind(this)}/>注册</label>
                    </nav>
                    <div className="pane">
                        {this.state.selected==="signIn"?signInForm:null}
                        {this.state.selected==="signUp"?signUpForm:null}
                    </div>
                </div>
            </div>
        )
    }
}
export default userDialog