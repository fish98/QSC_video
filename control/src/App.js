import React, { Component } from 'react';
import './App.css'

import Input from './input'
import Header from './header'

let isMobile = false

const video = new WebSocket('ws://localhost:4000')
const mobile = new WebSocket('wss://site.zjuqsc.com/mobile')

if(window.innerWidth <= 600){
  isMobile = true
}

const widthPrefix = window.innerWidth / 2

class App extends Component {

  constructor(){
    super()
    this.state = {
      video: '1.1',
      question:'',
      optionA: '',
      optionB: '', 
    }
    this.changeQuestion = this.changeQuestion.bind(this)
    this.changeVideo = this.changeVideo.bind(this)
    this.changeInput = this.changeInput.bind(this)

  } 

  changeQuestion(){
    mobile.send(JSON.stringify(
      {
        'question': this.state.question,
        'optionA': this.state.optionA,
        'optionB': this.state.optionB,
      }
    ))
  }

  changeVideo(){
    video.send(JSON.stringify({
      'video': this.state.video
    }))
  }

  buttonStyle = (!isMobile) ? {
    background:'black',
    border: '0 solid',
    fontSize: '36px',
    color: 'white',
    fontWidth: 'bold',  
    height: '100px',
    width:'200px',
    fontWeight:'bold'
  } : {
    background:'black',
    border: '0 solid',
    fontSize: '28px',
    color: 'white',
    fontWidth: 'bold',  
    height: '80px',
    width:'120px',
    fontWeight:'bold'
  }

  leftPanel = {
    width: widthPrefix
  }

  rightPanel = {
    width: widthPrefix
  }

  changeInput (name, input) {
    this.setState({
      [name]: input
    })
  }

  render() {
    return (
      <div style={{textAlign:'center'}}>
        <Header />
        <div style={{display: 'flex'}}>
          <div style={this.leftPanel}>
            <div style={{height: '50px'}}></div>
              <Input changeInput = {input => this.changeInput('question', input)} placeholder='Question'/>
              <div style={{height: '50px'}}></div>
              <Input changeInput = {input => this.changeInput('optionA', input)} placeholder='OptionA'/>
              <div style={{height: '50px'}}></div>
              <Input changeInput = {input => this.changeInput('optionB', input)} placeholder='OptionB'/>
              <div style={{height: '100px'}}></div>
            <button onClick = {this.changeQuestion} style={this.buttonStyle}>更改问题</button>
          </div>
          <div style={this.rightPanel}>
            <div style={{height: '150px'}}></div>
            <Input changeInput = {input => this.changeInput('video', input)} placeholder='Video Number'/>
            <div style={{height: '100px'}}></div>
            <button onClick = {this.changeVideo} style={this.buttonStyle}>更改视频</button>
          </div>
        </div>
      </div> 
    )
  }
}

export default App;
