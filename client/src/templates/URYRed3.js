import React,{useState} from "react"

export default function URYRed3 (props){
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [title2, setTitle2] = useState("")
    const [subtitle2, setSubtitle2] = useState("")
    const [title3, setTitle3] = useState("")
    const [subtitle3, setSubtitle3] = useState("")

    function addCG(){
        props.socket.emit("addCG", props.path, 40, {f0: title, f1: subtitle, f2: title2, f3: subtitle2, f4: title3, f5: subtitle3})
    }

    function killCG(){
        props.socket.emit("killCG", 40)
    }

    return(
        <div className="templateItem">
            <div className="name">{ props.name }</div>
            <div className="inputDiv">Title 1<input value={ title } onChange = { e => setTitle(e.target.value)}></input></div>
            <div className="inputDiv">Subtitle 1<input value={ subtitle } onChange = { e => setSubtitle(e.target.value)}></input></div>
            <div className="inputDiv">Title 2<input value={ title2 } onChange = { e => setTitle2(e.target.value)}></input></div>
            <div className="inputDiv">Subtitle 2<input value={ subtitle2 } onChange = { e => setSubtitle2(e.target.value)}></input></div>
            <div className="inputDiv">Title 3<input value={ title3 } onChange = { e => setTitle3(e.target.value)}></input></div>
            <div className="inputDiv">Subtitle 3<input value={ subtitle3 } onChange = { e => setSubtitle3(e.target.value)}></input></div>
            <div className="buttonDiv">
                <button onClick={addCG} className="liveButton">LIVE</button>
                <button onClick={killCG} className="killButton">KILL</button>
            </div>
        </div>
    )
}