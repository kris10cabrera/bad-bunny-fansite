import React from 'react';

class Word extends React.Component {
  render() {
    const { title, index, data } = this.props;
    return(
      <div className="word-folder">
        {title}

      </div>
    )
  }
}

export default Word;
