import React from 'react'

const choose = new WebSocket('ws://localhost:4010')
const mobile = new WebSocket('ws://localhost:4030')
const wid = window.innerWidth * 0.9
class Vote extends React.Component{
    constructor(){
        super()
        this.state = {
            question: 'Question',
            optionA: 'OptionA',
            optionB: 'OptionB',
            numA: 1,
            numB: 1,
        }
        choose.onmessage = msg => {
            const data = msg.data
            if(data === 'A'){
                this.setState({
                    numA: this.state.numA + 1
                })
            } else if(data === 'B'){
                this.setState({
                    numB: this.state.numB + 1
                })
            } else if(data === 'AB'){
                this.setState({
                    numA: this.state.numA - 1,
                    numB: this.state.numB + 1
                })
            } else if(data === 'BA'){
                this.setState({
                    numA: this.state.numA + 1,
                    numB: this.state.numB - 1
                })
            }
        }

        mobile.onmessage = msg => {
            const data = JSON.parse(msg.data)
            this.setState({
                question: data.question,
                optionA: data.optionA, 
                optionB: data.optionB,
                numA: 0,
                numB: 0,
            })
        }
    }


    showBarConfig = {
        width: '100%',
        aligh: 'center',
        display: 'flex',
        justifyItem: 'center'
    }

    voteConfig = {
        height: window.innerHeight - 150,
    }

    optionConfig = {
        fontSize: '50px',
        width: window.innerWidth / 2
    }

    questionConfig = {
        fontSize: '60px'
    }

    numberConfig = {
        fontSize: '50px'
    }

    render(){
        const awid = wid * this.state.numA / (this.state.numA + this.state.numB)
        const bwid = wid - awid
        return(
            <div style={this.voteConfig}>
                <div>
                    <div style={this.questionConfig}>
                       {this.state.question} 
                    </div>
                    <div style={{height: '100px'}}></div>
                    <div style={{display: 'flex'}}>
                        <div>
                            <div style={this.optionConfig}>{this.state.optionA}</div>
                            <div style={{height: '30px'}}></div>
                            <div style={this.numberConfig}>{this.state.numA / (this.state.numA + this.state.numB) * 100}%</div>
                        </div>
                        <div>
                            <div style={this.optionConfig}>{this.state.optionB}</div>
                            <div style={{height: '30px'}}></div>
                            <div style={this.numberConfig}>{this.state.numB / (this.state.numA + this.state.numB) * 100}%</div>
                        </div>
                    </div>

                    <div style={{height: '100px'}}></div>
                    <div style={{display: 'flex', height: '80px', justifyContent: 'center'}}>
                        <div style={{width: `${awid}px`, backgroundColor: '#FDB3B3'}}></div>
                        <div style={{width: `${bwid}px`, backgroundColor: '#7995F1'}}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Vote