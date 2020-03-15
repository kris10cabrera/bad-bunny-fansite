import React from 'react';
import Draggable from 'react-draggable';

class Word extends React.Component {

  render() {
    const { title, index, songs, times, screenWidth } = this.props;
    const songTitles = ["Si Veo a Tu Mamá", "La Difícil", "Pero Ya No", "La Santa", "Yo Perreo Sola", "Bichiyal", "Soliá", "La Zona", "Qué Malo", "Vete", "Ignorantes", "A Tu Merced", "Una Vez", "Safaera", "25/8", "Está Cabrón Ser Yo", "Puesto Pa’ Guerrial", "P FKN R", "Hablamos Mañana", "<3",]
    // drop-shadow(rgb(0, 26, 255) 2px 4px 6px)
    var styles = {
      left: `${index}px`,
      top: `${index}px`,
    };

    var mobileStyles = {
      top: `${index}px`,
    };

    return (
      <Draggable
      onDrag={this.handleDrag}
      >
        <div className="word-folder" style={screenWidth > 1300 ? styles : mobileStyles}>
          <h2 className="cr">{title}</h2>
          <div className="text-wrapper">
            <div className="title">
              <p>is said </p><h3 className="bt">{times} times</h3>
            </div>
            <p className="appear" >appears on:</p>
            <ul>
              {songs && Object.keys(songs).map(key =>
                <li key={key} className="cr">
                  {songTitles[songs[key]]}
                </li>
              )}
            </ul>
          </div>
        </div>
      </Draggable>

    )
  }
}

export default Word;
