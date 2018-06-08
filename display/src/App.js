import React, { Component } from 'react'
import Danmuku from 'danmuku'

import Footer from './footer'
// import Header from './header'
import Vote from './vote'
import './App.css'

let danmuku = new Danmuku()
const url = 'http://192.168.199.105:5000/'//"http://172.20.10.3:5000/"

const video = new WebSocket('ws://localhost:4000')
const danmu = new WebSocket('ws://10.100.71.126:4020')

danmu.onmessage = ev => {
  
  const data = JSON.parse(ev.data)
  if (data.type === "danmu") {
    danmuku.emit(JSON.parse(data.content))
  }
}

class App extends Component {
  constructor(){
    super()
     this.state = {
      option: '',
      video: `${url}1demo.mp4`  // configure this bdfore online the project !!!
    }

    video.onmessage = ev => {
      const num = JSON.parse(ev.data)
      this.setState({
        video: `${url}${num.video}demo.mp4`
      })
      danmuku.clear()
      danmuku.init({
        container: document.getElementById('yuri'),
        video: document.getElementById('fishVideo'),
        comment: []
      })
    }
  }

  videoConfig = {
    paddingTop: '2%',
    height: window.innerHeight,
    width: '100%',
    background: '#2E2E2E',
  }

  buttonStyle = {
    background:'black',
    border: '0 solid',
    fontSize: '18px',
    color: 'white',
    fontWidth: 'bold',  
    width: '100px',
    fontWeight:'bold'
  }

  buttomBox = {
    'display':'flex',
    'position': 'relative',
    'left': '40%',
  }

  containerConfig = {
    position: 'absolute',
    height: window.innerHeight,
   // width: '100%',
  }

  fullScreen(){
    let full = document.getElementById("yuri")
    full.webkitRequestFullScreen()
  }

  fullButton = {
    position: 'absolute',
    height: '35px',
    width:'100px',
    background: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    border: '0 solid black',
    opacity: '0.4',
    top: window.innerHeight - 35
  }

  videoSetting = {
    height: '90%',
    letf: '5px'
  }

  componentDidMount(){
    danmuku.init({
      container: document.getElementById('yuri'),
      video: document.getElementById('fishVideo'),
      comment: []
    })
  }  
 
  render() {
    return (
      <div className="App">
        {/* <Header /> */}
        <div id='fish' style={this.containerConfig}>
        </div>
        <div id='yuri'>
          <div style={this.videoConfig} id='video'>
            <video src={this.state.video} id='fishVideo' style={this.videoSetting} controls></video>
          </div>
          </div>
        <button style={this.fullButton} onClick={this.fullScreen}>Full Screen</button>
        <div style={{height: '50px'}}></div>
          <Vote />
          <Footer/>
      </div>
    )
  }
}

export default App;
