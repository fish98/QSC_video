import React from 'react'
import './question.css'
/// blue #639cf1
/// red #ffc0c0
const mobile = new WebSocket('ws://localhost:4030')
const choose = new WebSocket('wss://site.zjuqsc.com/choose')

const isMobile = (window.innerWidth <= 1000)?true:false 
const wheight = window.innerHeight
const wwidth = window.innerWidth

class Question extends React.Component {
    constructor(props) {
        super(props)
        const Inistate = {
            question: 'Question!',
            optionA: 'I want A',
            optionB: 'I want B',
        }
        
        let choice = localStorage.getItem('choose')
        
        this.state = {
            ...Inistate,
            choice: choice || '',
        }
        mobile.onmessage = (ev) => {
            const data = JSON.parse(ev.data)
            this.setState(data)
            localStorage.setItem('choose', '')
        }
            
        this.chooseA = this.chooseA.bind(this)
        this.chooseB = this.chooseB.bind(this)
    }

    buttonConfig = {
        height: '100px',
        width: '300px',
        background:'black',
        color: 'white',
        fontSize: '24px',
        borderRadius: '4%',
        border: '1px solid black'
    }  


    chooseA(){
        const ch = this.state.choice
        if(ch == 'B'){
            choose.send('BA')
            localStorage.setItem('choose', 'A')
        }
        if(ch == ''){
            choose.send('A')
            localStorage.setItem('choose', 'A')
        }
        if(isMobile){
            if(ch == 'B' || ch == ''){
                this.setState({choice:'A',})
            }   
        }
    }

    chooseB(){
        const ch = this.state.choice
        if(ch == 'A'){
            choose.send('AB')
            localStorage.setItem('choose', 'B')
        }
        if(ch == ''){
            choose.send('B')
            localStorage.setItem('choose', 'B')
        }
        if(isMobile){
            if(ch == 'A' || ch == ''){
                this.setState({choice:'B',})
            }
        }
    }

    

    SetCompo(){
        if(isMobile){
            const optA = this.state.optionA
            const optB = this.state.optionB
            let indexA = 0.0
            let indexB = 0.0
            if(this.state.choice == ''){
                indexA = 0.5
                indexB = 0.5
            }else{
                indexA = (this.state.choice=='A')?0.7:0.3
                indexB = (this.state.choice=='B')?0.7:0.3
            }
            const stlA = {backgroundColor: '#639cf1', height: '100%', width: `${wwidth * indexA}px`}
            const stlB = {backgroundColor: '#ffc0c0', height: '100%', width: `${wwidth * indexB}px`}
            
            console.log(indexA, indexB)
            return (
            <div className='questionaire'>
                <div style={{height: '41px', border:'2px solid', borderColor: '#ccc', borderRadius:'10px', fontSize: '1.5em', fontFamily: '微软雅黑', paddingTop: '5px', color: '#666'}} className='Mquestion'>{this.state.question}</div>
                <div style={{display:'flex' ,justifyContent:'space-between', height:`${wheight - 100}px`}} className='options'>
                    <div style={{...stlA, justifyContent: 'center', display: 'flex'}} className='op1' onClick={this.chooseA}>
                        <div style={{writingMode:'vertical-lr',textOrientation: 'upright', width: 'auto', fontSize: '3em', color: '#fff'}}>
                            {optA}
                        </div>    
                    </div>
                    <div style={{...stlB, justifyContent: 'center', display: 'flex'}} className='op2' onClick={this.chooseB}>
                        <div style={{writingMode:'vertical-lr',textOrientation: 'upright',  width: 'auto', fontSize: '3em', color: '#fff'}}>
                            {optB}
                        </div>
                    </div>
                </div>
            </div>
            )
        }else{
            return (<div className='questionaire'>
            <div style={{height: '50px'}}></div>
                <div className='question'>{this.state.question}</div>
                <div style={{height: '50px'}}></div>
                <div className='option'>
                    <div className='optionA' >
                        <div style={{height: '20px'}}></div>
                        <button style={this.buttonConfig} onClick={this.chooseA}>
                           {this.state.optionA}
                        </button>
                    </div>
                    <div style={{height: '50px'}}></div>
                    <div className='optionB'>
                        <div style={{height: '20px'}}></div>
                        <button style={this.buttonConfig} onClick={this.chooseB}>
                            {this.state.optionB}
                        </button>
                        <div style={{height: '50px'}}></div>
                    </div>
                </div>
            </div>)
        }
    }

    render(){
        return this.SetCompo()
    }
}

export default Question