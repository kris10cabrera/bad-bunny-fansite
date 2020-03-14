import React from 'react';

class Intro extends React.Component {
  state = {
    hover: false
  }

  setIsShown = (x) => {
    this.setState({
      hover: x
    })
  }



  render() {
    return (
      <div className="intro">
        <span className="cr">I taught my computer to count the words on</span>
        <h1>
          <span className="br"><a href="https://open.spotify.com/album/5lJqux7orBlA1QzyiBGti1?si=NysgKHH6TxyTDQpNqWuk8g" onMouseEnter={() => this.setIsShown(true)} onMouseLeave={() => this.setIsShown(false)}>YHLQMDLG</a></span> <span className="cli">by</span> <span className="br">Bad Bunny </span>

{this.state.hover &&           <span className="info-bubble">
            <p className>Yo Hago Lo Que Me Da La Gana = I do whatever I want🤘</p>
          </span>}

        </h1>
        <p className="cl">here are some of my findings:</p>
        <p className="cli">(move around the folders to see more)</p>

      </div>
    )
  }
}


  export default Intro;