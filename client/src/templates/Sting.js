import React,{useState} from "react"

export default function L3RD2 (props){

    const [time, setTime] = useState("")

    function stingCG(){
        props.socket.emit("addCG", props.path, 50, {})
    }

    function stingKill(){
        props.socket.emit("killCG", props.path, 50)
    }

    function atemStingCG(){
        props.socket.emit("atemStingCG", time, props.path, 50, {})
    }

    function atemStingKill(){
        props.socket.emit("atemKillCG", time, props.path, 50)
    }    
    
    return(
        <div className="templateItem">
            <div className="name">{ props.name }</div>
            <div className="inputDiv" style={{fontSize:"12pt"}}>Cut time (sec)<input value={ time } onChange = { e => setTime(e.target.value)}></input></div>
            <div className="buttonDiv">
                <button onClick={atemStingCG} className="liveButton" style={{fontSize:"12pt"}}>ATEM STING</button>
                <button onClick={atemStingKill} className="killButton" style={{fontSize:"12pt"}}>ATEM STING & KILL</button>
            </div>
            <div className="buttonDiv">
                <button onClick={stingCG} className="liveButton">STING</button>
                <button onClick={stingKill} className="killButton">STING & KILL</button>
            </div>
        </div>
    )
}