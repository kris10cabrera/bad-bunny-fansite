import React from 'react';
import data from '../yhlqmdlg.json';
import '../App.scss';
import Word from './Word';
import Intro from './Intro';

class App extends React.Component {

  state = {
    data: data
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

  render() {
    const { data } = this.state;
    return (
      <>
        <img className="logo" src="bunny.svg" alt="Bad Bunny logo" />
        <section className="page-wrapper">
          <section className="left">
            <img className="bad-bunny" src="hablamosmanana_source.png" alt="Bad Bunny with a cowboy hat. Photo source: Spotify" />
          </section>
          <section className="right">
            <Intro ted={data} />
            {Object.keys(data).map(key =>
              <Word key={key} index={key} title={data[key].key} data={data} times={data[key].value} songs={data[key].songIds} />
            )}

          </section>
        </section>
      </>
    )
  }
}

export default App;
