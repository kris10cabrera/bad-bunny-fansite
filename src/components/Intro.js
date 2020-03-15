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
    const {text, language} = this.props;
    return (
      <div className="intro">
        <span className="cr">{language === 'English' ? text.text[0].en : text.text[0].es}</span>
        <h1 onMouseEnter={() => this.setIsShown(true)} onMouseLeave={() => this.setIsShown(false)}>
          <span className="br">YHLQMDLG</span><span className="cli">{language === 'English' ? text.text[1].en : text.text[1].es}</span><span className="br">Bad Bunny </span>

{this.state.hover &&           <span className="info-bubble">
            <p className="vg">YHLQMDLG = Yo Hago Lo Que Me Da La Gana = I do whatever I want <span role="img">🤘</span></p>
          </span>}

        </h1>
        <p className="cl">{language === 'English' ? text.text[2].en : text.text[2].es}:</p>
        <p className="cli">({language === 'English' ? text.text[3].en : text.text[3].es})</p>

      </div>
    )
  }
}


  export default Intro;
