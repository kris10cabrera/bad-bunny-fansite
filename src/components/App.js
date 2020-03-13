import React from 'react';
import data from '../yhlqmdlg.json';
import '../App.scss';
import Word from './Word';
import Intro from './Intro';
import Draggable from 'react-draggable';

class App extends React.Component {
  state = {
    data: data,
  }

  componentDidMount() {
    const selectedWords = [103, 102, 101, 99, 98, 59, 50, 38, 29, 8];
    const newData = lyricsToArray(data);
    /*
    1
    for each lyric in the data object, remove punctutation, numbers, and special symbols
    add the resulting words to an array. 
    send that array to mostFreqStr
    */
    function lyricsToArray(data) {
      let words = '';
      let wordArray = [];
      Object.keys(data.songs).map(function (key) {
        words += data.songs[key].lyrics.replace(/[.,\/\d+#!¡?¿f$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
        return;
      })

      wordArray = words.split(' ').filter(word => word.length > 2);
      return mostFreqStr(wordArray);
    }


    /*
    2 -- this is the big retutrn
    Create a new object that counts how often each word is used
    send that object to sort it
    function adapted from https://www.developintelligence.com/blog/2016/10/finding-the-most-frequent-string-in-a-javascript-array/
    */
    function mostFreqStr(arr) {
      var obj = {}, mostFreq = 0, which = [];
      arr.forEach(ea => {
        if (!obj[ea]) {
          obj[ea] = 1;
        } else {
          obj[ea]++;
        }

        if (obj[ea] > mostFreq) {
          mostFreq = obj[ea];
          which = [ea];
        } else if (obj[ea] === mostFreq) {
          which.push(ea);
        }

      });

      var sortedObj = sortObject(obj);
      songIdentifier(sortedObj);
      var slimObj = {};
      Object.keys(sortedObj).forEach(function (item, value) {
        if (selectedWords.includes(parseInt(item))) {
          slimObj[item] = sortedObj[item];
        }
      })
      return slimObj;
    }

    // 3
    function songIdentifier(obj) {
      for (let i = 0; i < Object.keys(obj).length; i++) {
        obj[i].songIds = [];
        for (let x = 0; x < Object.keys(data.songs).length; x++) {
          if (data.songs[x].lyrics.toLowerCase().includes(obj[i].key)) {
            obj[i].songIds.push(x)
          }
        }

      }
      return obj
    }

    /*
    4
    sort the object and only include it if the word has been used 9 or more times
    function adapted from https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
    */

    function sortObject(obj) {
      var arr = [];
      var prop;
      for (prop in obj) {
        if (obj.hasOwnProperty(prop) && obj[prop] >= 9) {
          arr.push({
            'key': prop,
            'value': obj[prop]
          });
        }
      }
      arr.sort(function (a, b) {
        return a.value - b.value;
      });
      return arr;
    }

    lyricsToArray(data);

    this.setState({
      data: newData
    })
  }
  handleClick = (e, data) => {
    this.setState({
      language: 'Spanish'
    })
  }

  render() {


    const { data } = this.state;
    return (
      <>
        <section className="page-wrapper">
          <section className="left">
            <img className="bad-bunny" src="hablamosmanana_source.png" alt="Bad Bunny with a cowboy hat. source: Spotify" />
          </section>
          <section className="right">
            <Intro ted={data} />
            <section className="folder-wrapper">
              {Object.keys(data).map(function (key, index) {
                return <Word key={key} index={index * 35} title={data[key].key} times={data[key].value} songs={data[key].songIds} />;
              })}
            </section>
          </section>
        </section>

        <section className="wrapper">
        <div className="footer cr">
          <div className="footer-text-wrapper">
          <div className="footer-text">
                <h2><span className="cli">made by</span> <a href="https://twitter.com/kris10cabrera" className="cr">kris10cabrera</a></h2>
                lyrics belong to Bad Bunny. Images belong to Spotify & <a href="https://www.instagram.com/stillz/">@stillz</a>.
              </div>
              <h3 className="bt">how?</h3>
              <p className="cl">
              built using React. I fed the app a JSON file with the lyrics copied & pasted from Genius. I then built a few functions to count each unique word, check for the most frequent words, identify the songs those words are featured on, and return it. here I highlighted some of my favorites. 
              </p>
          </div>
            </div>
            <img src="stillz-bb.png" alt="Bad Bunny polaroid. credit to Stillz" />
        </section>
      </>
    )
  }
}

export default App;
