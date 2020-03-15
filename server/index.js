var argv = require('yargs').argv;
const { Atem } = require('atem-connection')
const myAtem = new Atem()


// INIT VARIABLES FOR CASPAR AND FOLDER TREE
const {CasparCG} = require("casparcg-connection");
var caspar = new CasparCG({autoConnect: false});
var tree = []

// INIT VARIABLES FOR WS & HTML
const express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http);

// START OF SENSIBLE CODE

app.use("/", express.static("../client/build"))
  
http.listen(80, function(){
	console.log('HTML server active');
});

function connectCaspar(address){
  caspar.connect({host: address})
  tls()
  cls()
}

function tls(){
  caspar.tls("Ghostbuster/"+argv.f).then(tlssuccess)
}

function cls(){
  caspar.cls().then((data)=>{
    io.emit('clsUpdate', data.response.data)
  })
}

function tlssuccess(command){
  console.log("Caspar Connected")
  console.log("tls received");
  var folderbasic = command.response.data;
  tree=[]
  for (i = 0; i < folderbasic.length; i++){treeify_path(folderbasic[i].name, tree)}
  io.emit('tlsUpdate', tree)
}

function treeify_path (path, treename) {
    var patharray = path.split('/')
    minitree(patharray, treename, patharray.length-2, path)    
}

function minitree(path, treepart , n, fullpath) {
  if (path[n+1]=="INDEX"){             
    if (path[n].split('_').length == 1){
      treepart.push({name: path[n], type: path[n], path: fullpath})
    }else if (path[n].split('_').length == 3){
      treepart.push({name: [path[n].split('_')[1], path[n].split('_')[2]], type: path[n].split('_')[0], path: fullpath})
    }else if (path[n].split('_').length == 4){
      treepart.push({name: [path[n].split('_')[1], path[n].split('_')[2], path[n].split('_')[3]], type: path[n].split('_')[0], path: fullpath})
    } 
    else{
      treepart.push({name: path[n].split('_')[1], type: path[n].split('_')[0], path: fullpath})
    }
  }
}


//////////////////        WEBSCOKET CONNECTION        //////////////////


io.on('connection', function(socket){
  //connectCaspar("192.168.0.243")
  //connectCaspar("localhost")
  connectCaspar(argv.c)


  socket.on('addCG',function (path, channel, arg) {
    caspar.cgAdd(1, channel, 1, path, 1 , arg)
    console.log(path,channel,arg);
  });

  socket.on('reqTlsUpdate', function(socket){
    tls()
  })

  socket.on('reqClsUpdate', function(socket){
    cls()
  })

  socket.on("updateCG",function (channel, arg) {
    caspar.cgUpdate(1, channel, 1, arg)
  });
  
  socket.on("stingKill",function (time, path, channel) {
    caspar.cgAdd(1, channel, 1, path, 1)
    setTimeout(function(){
      stingKiller()
    }, time*1000)
  });

  function stingKiller(){
    caspar.cgClear(1, 40)
    caspar.cgClear(1, 42)
    caspar.cgClear(1, 45)
  }

  socket.on("atemStingCG", (time, path, channel, arg) => {
    caspar.cgAdd(1, channel, 1, path, 1 , arg)
    setTimeout(function(){
      myAtem.cut()
    }, time*1000)
  })

  socket.on("atemKillCG", (time, path, channel, arg) => {
    caspar.cgAdd(1, channel, 1, path, 1, arg)
    setTimeout(function(){
      myAtem.cut()
      stingKiller()
    }, time*1000)
  })

  socket.on("getThumb", (e) => {
    caspar.thumbnailRetrieve(e).then((data)=>{
      io.emit('recThumb', data.response.data)
      console.log("Thumbnail generated")
    })
  })
  
  socket.on("killCG",function (channel) {
    caspar.cgStop(1, channel,1)
  });

  socket.on("playVideo",function (path, channel, loop) {
    caspar.play(1, channel, path, loop)
    console.log("playing ", 1, channel, path, loop)
  });

  socket.on("stopVideo",function (channel) {
    caspar.stop(1, channel)
    console.log("stopping ", 1, channel)
  });
})




///// ATEM CONNECTION

if (argv.a != null){
  myAtem.connect(argv.a)
  myAtem.setTransitionStyle(transitionProperties = { style: 0, selection: 1, nextStyle: 0, nextSelection: 1 })
}