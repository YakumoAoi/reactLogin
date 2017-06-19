import React from 'react'

function forgetPassword(props){
    return(
        <div className="forgetPassword">
            <h3>
                重置密码
            </h3>
            <form onSubmit={this.props.onResetPassword.bind(this)}>
                <div className="row">
                    <label>邮箱</label>
                    <input type="email" value={this.props.formDate.email} onChange={this.props.onChangeForm.bind(this,"email")}/>
                </div>
                <div className="row actions">
                    <button type="submit">发送邮件</button>
                    <a href="#" onClick={this.props.onSwitchPanel.bind(this,'signInOrSignUp')}>返回登陆</a>
                </div>
            </form>
        </div>
    )
}
export default forgetPassword