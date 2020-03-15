import React from 'react';

const Intro = ({text, language}) => (
  <div className="intro">
      <span className="cr">{language == 'English' ? text.text[0].en : text.text[0].es}</span>
      <h1>
      <span className="br">YHLQMDLG</span> <span className="cli">{language == 'English' ? text.text[1].en : text.text[1].es}</span> <span className="br">Bad Bunny </span>
    </h1>
    <p className="cl">{language == 'English' ? text.text[2].en : text.text[2].es}:</p>
    
  </div>
)

export default Intro;