import React from 'react';

class Word extends React.Component {
  render() {
    const { title, index, data, songs, times } = this.props;
    return(
      <div className="word-folder">
        <h2 className="cr">{title}</h2>

      </div>
    )
  }
}

export default Word;
