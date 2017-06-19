import React from 'react'
import SignInForm from './signInForm'
import SignUpForm from './signUpForm'

function signInOrSignUp(props){
    return(
        <div>
            <nav onChange={props.onChangePanel.bind(null)}>
                <label><input type="radio" value="signIn" checked={props.copyState.selected==="signIn"} onChange={props.onChangePanel.bind(null)}/>登陆</label>
                <label><input type="radio" value="signUp" checked={props.copyState.selected==="signUp"} onChange={props.onChangePanel.bind(null)}/>注册</label>
            </nav>
            <div className="pane">
                {props.copyState.selected==="signIn"?
                <SignInForm copyState={props.copyState} 
                onSignIn={props.onSignIn.bind(null)}
                onChangeForm={props.onChangeForm.bind(null)}
                onSwitchPanel={props.onSwitchPanel.bind(null)}
                />:null}
                {props.copyState.selected==="signUp"?
                <SignUpForm copyState={props.copyState}
                onSignUp={props.onSignUp.bind(null)}
                onChangeForm={props.onChangeForm.bind(null)}
                onCheckPassword={props.onCheckPassword.bind(null)}
                on
                />:null}
            </div>
        </div>
    )
}
export default signInOrSignUp