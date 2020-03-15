import React,{useState} from "react"

export default function Scoreboard (props){
    const [team1, setTeam1] = useState("")
    const [team1s, setTeam1s] = useState("")
    const [team2, setTeam2] = useState("")
    const [team2s, setTeam2s] = useState("")

    function addCG(){
        if (team1s==""){
            props.socket.emit("addCG", props.path, 41, {f0: team1, f1: team2})
        } else {
            props.socket.emit("addCG", props.path, 41, {f0: team1, f1: team2, f2: team1s, f3: team2s})
        }
    }

    function killCG(){
        props.socket.emit("killCG", 41)
    }

    function updateCG(){
        if (team1s==""){
            props.socket.emit("updateCG", 41, {f0: team1, f1: team2})
        } else {
            props.socket.emit("updateCG", 41, {f0: team1, f1: team2, f2: team1s, f3: team2s})
        }
    }

    return(
        <div className="templateItem">
            <div className="name">{ props.name }</div>
            <div className="inputDiv">Team 1<input value={ team1 } onChange = { e => setTeam1(e.target.value)}></input></div>
            <div className="inputDiv">Team 1 Score<input value={ team1s } onChange = { e => setTeam1s(e.target.value)}></input></div>
            <div className="inputDiv">Team 2<input value={ team2 } onChange = { e => setTeam2(e.target.value)}></input></div>
            <div className="inputDiv">Team 2 Score<input value={ team2s } onChange = { e => setTeam2s(e.target.value)}></input></div>
            <div className="buttonDiv">
                <button onClick={addCG} className="liveButton">LIVE</button>
                <button onClick={updateCG} className="liveButton" style={{backgroundColor:"grey"}}>UPDATE</button>
                <button onClick={killCG} className="killButton">KILL</button>
            </div>
        </div>
    )
}