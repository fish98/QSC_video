import React, { Component } from 'react';
import './App.css'

import Input from './input'
// import Header from './header'
import Question from './question'
import Footer from './footer'

const danmu = new WebSocket('wss://site.zjuqsc.com/danmu')

const isMobile = (window.innerWidth <= 1000)?true:false

const widthPrefix = window.innerWidth / 2 - 250

class App extends Component {

  constructor(){
    super()
    this.state = {
        text: '潮毕快乐！！',
        mode: 'rtl',
        style: {
          fontSize: '24px',
          color: '#ffffff',
          border: '1px solid #337ab7',
          textShadow: '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000'
        }
      }
    this.sendDanmu = this.sendDanmu.bind(this)
    this.changeInput = this.changeInput.bind(this)
  } 

  buttomBox =(!isMobile) ? {
    'display':'flex',
    'position': 'relative',
    'height': '50px'
  } : {
    'display': 'flex',
    'width': '100%',
  }
 
  containerConfig = {
    position: 'absolute',
    height: '600px',
    width: '100%',
  }

  sendDanmu(){
    danmu.send(JSON.stringify({
      from: 'web',
      type: 'danmu',
      content: JSON.stringify(this.state)
    }))
  }

  buttonStyle = {
    border: '0 solid',
    fontSize: '18px',
    color: 'white',
    fontWidth: 'bold',  
    width: '100px',
    fontWeight:'bold',
    height: '40px',
  }

  changeInput (input) {
    this.setState({
      text: input
    })
  }

  render() {
    const buttonstl = isMobile?{...this.buttonStyle, background:'#639cf1'}:{...this.buttonStyle, background:'#000'}
    return (
      <div style={{width:'100%'}}>   
        <Question/>
        <div style={{...this.buttomBox, height: '40px', justifyContent:'center', marginTop: '8px'}}>
          <Input changeInput = {input => this.changeInput(input)} placeholder='请填装高能弹药 O_O'/>
          <button onClick = {this.sendDanmu} style={buttonstl} >{'发 射'}</button>
        </div>
      </div> 
    )
  }
}

export default App;
