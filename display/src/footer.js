import React from 'react'

let isShow 
let isMobile

if(window.innerWidth <= 600){
    isShow = 'none'
    isMobile = true
}

class Footer extends React.Component{

    blankStyle = {
        height : '15px',
        display: isShow
    }

    render(){
        return(
        <div id="footer" style={{height: '120px'}}>
            <div style={this.blankStyle}></div>
            <hr width="100%" color='#987cb9'/>
            <div style={this.blankStyle}></div>
			    <div style={(!isMobile) ? {display: 'flex', justifyContent: 'center'} : {}}>
                <div style = {{fontSize: '28px', }}> 2018浙江大学求是潮潮人毕业典礼</div>
				{/* <p>&copy; 2000-2018 浙江大学党委学工部 求是潮网站</p>
                <p>All rights reserved. 浙ICP备15039312号</p> */}
				<p>
                    <a href="http://ttfish.top" style={{'color': '#666'}}> </a>
                </p>
			    <a id="footer-logo" className="style-right" href='https://www.zjuqsc.com' style={{
                    position: 'absolute',
                    right: '10%',
                    display: isShow
                }}>
                  <img src="https://box.zjuqsc.com/assets/img/qsc-footer.png" alt="footer" />
                </a> 
            </div>
            <div style={this.blankStyle}></div>
	    </div>

        )
    }
}

export default Footer