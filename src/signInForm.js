import React from 'react'

function signIn(props){
    return (
        <form className="login" onSubmit={props.onSignIn.bind(null)}>
            <div className="row">
                <label>用户名</label>
                <input type="text"  value={props.copyState.formDate.username} onChange={props.onChangeForm.bind(null,"username")}/>
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password" value={props.copyState.formDate.password} onChange={props.onChangeForm.bind(null,"password")}/>
            </div>
            <div className="row actions">
                <button type="submit">登陆</button>
                <a href="#" onClick={props.onSwitchPanel.bind(null,'forgetPassword')}>忘记密码了吗？</a>
            </div>
        </form>
    )
}
export default signIn