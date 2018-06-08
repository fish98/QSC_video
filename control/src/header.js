import React from 'react'
// import Banner from './header.jpg'

class Header extends React.Component {

    bannerConfig = {
        width: '580px',
    }

    bgConfig = {
        background: '#212121',
        color:'white'
    }

    h1Config = {
        font: '#E2D3ED',
        fontSize: '60px'
    }

    render(){
        return(
            <div className='header' style={this.bgConfig}>
            {/* <img src={Banner} alt='header banner' style={this.bannerConfig}/> */}
            <div style={{height: '30px'}}></div>
            <div style={this.h1Config}>Control Panel</div>
            <div style={{height: '20px'}}></div>
            </div>
        )
    }
}

export default Header