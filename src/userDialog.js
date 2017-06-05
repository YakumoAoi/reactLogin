import React from 'react'

class userDialog extends React.Component{
    render(){
        return (
            <div className="dialog-container">
                <div className="dialog">
                    <nav>
                        <input type="radio"/>登陆
                        <input type="radio"/>注册
                    </nav>
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
                        <div className="row">
                            <label>确认密码</label>
                            <input type="password"/>
                        </div>
                        <div className="row actions">
                            <button type="submit">注册</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}