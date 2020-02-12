import React,{useState} from "react"

export default function HoldingClock (props){
    const [time, setTime] = useState("")

    function addCG(){
        if (time.split(':').length == 2){
            props.socket.emit("addCG", props.path, 42, {f0: time+":00"})
        }else{
        props.socket.emit("addCG", props.path, 42, {f0: time})
        }
    }

    function killCG(){
        props.socket.emit("killCG", 42)
    }

    function updateCG(){
        if (time.split(':').length == 2){
            props.socket.emit("updateCG",42, {f0: time+":00"})
        }else{
        props.socket.emit("updateCG", 42, {f0: time})
        }
    }

    return(
        <div className="templateItem">
            <div className="name">{ props.name }</div>
            <div className="inputDiv">Target Time<input value={ time } onChange = { e => setTime(e.target.value)} type="time" step="1"></input></div>
            <div className="buttonDiv">
                <button onClick={addCG} className="liveButton">LIVE</button>
                <button onClick={updateCG} className="liveButton" style={{backgroundColor:"grey"}}>UPDATE</button>
                <button onClick={killCG} className="killButton">KILL</button>
            </div>
        </div>
    )
}