import React from "react"

export default function Quiz(props){

  
    return(
        <div className="container">
            <h1 className="questions">{props.question}</h1>
          
            <h3>{props.answers}</h3>
             <hr></hr>
        
        </div>
    )
}