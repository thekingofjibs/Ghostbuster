import React,{useState} from "react"

export default function L3RDL (props){
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")

    function addCG(){
        props.socket.emit("addCG", props.path, 40, {f0: title, f1: subtitle})
    }

    function killCG(){
        props.socket.emit("killCG", 40)
    }

    return(
        <div className="templateItem">
            <div className="name">{ props.name }</div>
            <div className="inputDiv">Title<input value={ title } onChange = { e => setTitle(e.target.value)}></input></div>
            <div className="inputDiv">Subtitle<input value={ subtitle } onChange = { e => setSubtitle(e.target.value)}></input></div>
            <div className="buttonDiv">
                <button onClick={addCG} className="liveButton">LIVE</button>
                <button onClick={killCG} className="killButton">KILL</button>
            </div>
        </div>
    )
}