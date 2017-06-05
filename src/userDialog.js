import React from 'react'
import './userDialog.css'

class userDialog extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selected:'signIn'
        }
    }
    switch(e){
        this.setState({
            selected:e.target.value
        })
    }
    render(){
        return (
            <div className="dialog-container">
                <div className="dialog">
                    <nav onChange={this.switch.bind(this)}>
                        <label><input type="radio" value="signIn" checked={this.state.selected==="signIn"} onChange={this.switch.bind(this)}/>登陆</label>
                        <label><input type="radio" value="signUp" checked={this.state.selected==="signUp"} onChange={this.switch.bind(this)}/>注册</label>
                    </nav>
                    <div className="pane">
                        <form className="login">
                            <div className="row">
                                <label>用户名</label>
                                <input type="text"/>
                            </div>
                            <div className="row">
                                <label>密码</label>
                                <input type="password"/>
                            </div>
                            <div className="row actions">
                                <button type="submit">登陆</button>
                            </div>
                        </form>
                        <form className="register">
                            <div className="row">
                                <label>用户名</label>
                                <input type="text"/>
                            </div>
                            <div className="row">
                                <label>密码</label>
                                <input type="password"/>
                            </div>
                            <div className="row confirm">
                                <label>确认密码</label>
                                <input type="password"/>
                            </div>
                            <div className="row actions">
                                <button type="submit">注册</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default userDialog