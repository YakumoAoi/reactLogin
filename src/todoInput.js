import React from 'react'
import './todoinput.css'

function submit(props,e){
    if(e.key === "Enter" && e.target.value!==''){
        props.onsubmit(e)
    }
}
function changetitle(props,e){
        props.onChange(e)
    }

function TodoInput(props){
    return(
        <input className='todoinput' type='text' value={props.content}
        onKeyPress={submit.bind(null,props)}
        onChange={changetitle.bind(null,props)}/>
    )
}
export default TodoInput