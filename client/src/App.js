import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client'
import { useBeforeunload } from 'react-beforeunload';
import './App.css';
import logo from "./img/icon.png"


import L3RDL from "./templates/L3RDL"
import AOverlay from "./templates/AOverlay"
import L3RD2 from "./templates/2L3RD"
import Sting from "./templates/Sting"
import URYRed3 from "./templates/URYRed3"
import MediaPlayer from "./templates/MediaPlayer"
import HoldingClock from "./templates/HoldingClock"


const TEMPLATE_MAP = {
  L3RD2,
  L3RDL,
  Sting,
  AOverlay,
  URYRed3,
  HoldingClock
};

function App() {
  const [tlsData, setTlsData] = useState(null);
  const [clsData, setClsData] = useState(null);
  const socket = useRef(null)
  useEffect(() => {
    socket.current = io.connect("ws://localhost:80");
    socket.current.on("connect", () => {
      socket.current.on("tlsUpdate", data => {
        console.log(data);
        setTlsData(data);
      })

      socket.current.on("clsUpdate", data => {
        console.log(data);
        setClsData(data);
      })
    });
  }, []);

  useBeforeunload(event => event.preventDefault());

  return (
    <div className="App" style={{height:"100%"}}>
      <div className="topBar" style={{height:"8vh", backgroundColor:"grey", borderRadius:"0", display:"flex", flexDirection:"row"}}>
        <h1 style={{fontSize:"5vh", margin:"0", paddingLeft:"1vw", color:"white"}}>
          Luigi's Mansion 2
        </h1>
        <img src={logo} style={{height:"inherit", width:"auto"}}></img>
        </div>
      <div className="Lower" style={{display: "flex", flexDirection: "row", height:"100%", flexWrap:"wrap"}}>

      {clsData === null ? (
            <div>
              <b>getting all the datas...nom nom</b>
            </div>
      ) : (<div style={{flex:"1 0 0"}}>
          <div className="VTs">
          <MediaPlayer data={clsData} socket={socket.current}/>
          </div>
        </div>
      )}
      <div className="Qlist" style={{flex:"2 0 0"}} >
          <table style={{width: "90%", margin:"5%",borderCollapse:"separate", borderSpacing:"0px"}}>
            <tbody>
              <tr>
                <th>Type</th>
                <th>Data</th>
                <th>Position</th>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="Graphics" style={{flex:"3 0 0", justifyContent: "center"}}>
          {tlsData === null ? (
            <div>
              <b>getting all the datas...nom nom</b>
            </div>
          ) : (<div>        
            {
              tlsData.map(template => {
                if (!(template.type in TEMPLATE_MAP)) {
                  console.warn(`Tried to render ${template.type} but we don't know it!`);
                  return null;
                }
                const TemplateClass = TEMPLATE_MAP[template.type];
                return <TemplateClass key={template.path} name={template.name} path={template.path} socket={socket.current} />
              })
            }
          </div>)}
        </div>
      </div>
    </div>
  );
}

export default App;
