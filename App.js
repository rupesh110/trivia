import React from "react"
import Front from "./Front"
import Quiz from "./Quiz"
import data from "./Data.js"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App(){
    const [state, setState] = React.useState(data);
    
    const [result, setResult] = React.useState(false);
    
    const [score, setScore] = React.useState(0);
    
    React.useEffect(() => {
      updateProperty();
      usersAnswersProperty();
       addNewId();
       sortOption();
       addCheckers();
    }, [])
    
    function updateProperty(){
        setState(stat => stat.map(st => {
            return {...st, answers: st.incorrect_answers.concat(st.correct_answer)}}))
    }
    
    function addNewId(){
        let addId = 0;
        setState(stat => stat.map(st => {
            return {...st, id: addId += 1}}))
    }
    
    function sortOption(){
        setState(stat => stat.map(st => {
            return {...st, answers: st.answers.sort()}
        }))
    }
    
    function addCheckers(){
        setState(stat => stat.map(st =>{
            return {...st, isRight: false}
        }))
    }
    
    function usersAnswersProperty(){
        setState(stat => stat.map(st => {
            return {...st, usersAns: ""}
        }))
    }
    
    function changeColor(){
        
    }
    
    function getUserAnswers(event){
        const usersAnswer = event.target.value
        const usersQuestionId = event.target.id
        const updateState = state[usersQuestionId-1]
        setState(state.map(st => {
            return st.id == usersQuestionId ? {...st, usersAns: usersAnswer} : {...st}
        }))
        console.log("this is updated state ", state)
    }    
    
    //calculate the result 
    function getResult(){
        let count =0;
        state.map(sat => {
            sat.correct_answer == sat.usersAns ? count += 1 : count= count
        })
        
        setResult(true);
        setScore(count);
        
        console.log(count)
    }
    
   // const scored = score;
    
    const quizElement = state.map((st) => (
            <Quiz question={st.question} usersAns={st.usersAns} answers ={st.answers !== undefined ? st.answers.map(sat => <button value={sat} onClick={getUserAnswers} id={st.id} style={{backgroundColor: sat === st.usersAns ? "green": "white"}}>{sat}  </button>) : <button></button>}/>))
            
    //const display = <h5 className="display-score">You scored: {score}</h5>
            
    return(
        <div>
            {quizElement}
            {result && <Confetti />}
            <button className="answer-check" onClick={getResult}>Check answers</button>
        
        </div>
    )
}