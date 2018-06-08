import React from 'react'

let isMobile = false

if(window.innerWidth <= 600){
    isMobile = true
}

// const widthPrefix = window.innnerWidth / 2

class Input extends React.Component{
    constructor(props){
        super(props)   
        this.state = {
            text : '',
        }
        this.changeText = this.changeText.bind(this)
    }

    inputConfig = (!isMobile) ? {
        width: '400px',
        height: '36px',
        display: 'reletive',
        textAlign: 'center',
        fontSize:'16px',
        } : {
            width: '120px',
            height: '36px',
            textAlign: 'center',
            fontSize:'16px',
        }

    async changeText(e){
        await this.setState({
            text: e.target.value
        })
        this.props.changeInput(this.state.text)
    }

    render(){
        return(
            <div>
                <input type = "text" value = {this.state.text} onChange = {this.changeText} placeholder = {this.props.placeholder || 'Please fill in the blank'}  style={this.inputConfig}></input>
                <div className = 'type'></div>
            </div>
        )
    }
}

export default Input