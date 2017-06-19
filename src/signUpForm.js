import React from 'react'

function signUp(props){
    return(            
        <form className="register" onSubmit={props.onSignUp.bind(null)}>
            <div className="row">
                <label>用户名</label>
                <input type="text"  value={props.copyState.formDate.username} onChange={props.onChangeForm.bind(null,"username")}/>
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password" value={props.copyState.formDate.password} onChange={props.onChangeForm.bind(null,"password")}/>
            </div>
            <div className="row confirm">
                <label>确认密码</label>
                <input type="password" value={props.copyState.checkPassword} onChange={props.onCheckPassword.bind(null)}/>
            </div>
            <div className="row">
                <label>邮箱</label>
                <input type="email" value={props.copyState.formDate.email} onChange={props.onChangeForm.bind(null,"email")}/>
            </div>
            <div className="row actions">
                <button type="submit">注册</button>
            </div>
        </form>
    )
}
export default signUp