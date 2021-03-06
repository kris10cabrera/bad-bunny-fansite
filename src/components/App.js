import React from 'react';
import data from '../yhlqmdlg.json';
import text from '../text.json'
import '../App.scss';
import Word from './Word';
import Intro from './Intro';

class App extends React.Component {
  state = {
    data: data,
    language: 'English',
    text: {...text}
  }
  changeLanguage = (language) => {
    this.setState({
      language: language
    })
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
    2 -- this is the big return
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
    const screenWidth = window.screen.width;
    const { data, language, text } = this.state;
    return (
      <>
        <nav id="language">
          <ul>
            <li><abbr className={language === 'English' && 'dotted'} onClick={() => this.changeLanguage('English')} lang="en" title="English">English</abbr></li>
            <li><abbr className={language === 'Español' && 'dotted'} onClick={() => this.changeLanguage('Español')} lang="es" title="Español">Español</abbr></li>
          </ul>
        </nav>
        <section className="page-wrapper">
          <section className="left">
            <img className="bad-bunny" src="hablamosmanana_source.png" alt="Bad Bunny with a cowboy hat. source: Spotify" />
            <div className="footer-text footer-text-left">
                <h2><span className="cli">{language === 'English' ? 'made by' : 'hecho por' }</span> <a href="https://kristencabrera.com" className="cr">kris10cabrera</a></h2>
                <p>{language === 'English' ? text.text[4].en : text.text[4].es} Spotify & <a href="https://www.instagram.com/stillz/">@stillz</a>.</p>
              </div>
          </section>
          <section className="right">
            <Intro text={text} language={language} />
            <section className="folder-wrapper">
              {Object.keys(data).map(function (key, index) {
                return <Word key={key} index={screenWidth > 1300 ? index * 35 : index * 11} language={language} title={data[key].key} times={data[key].value} songs={data[key].songIds} screenWidth={screenWidth}/>;
              })}
            </section>
          </section>
        </section>

        <section className="wrapper">
        <div className="footer cr">
          <div className="footer-text-wrapper">
          <div className="footer-text footer-text-right">
                <h2><span className="cli">{language === 'English' ? 'made by' : 'hecho por' }</span> <a href="https://kristencabrera.com" className="cr">kris10cabrera</a></h2>
                <p>{language === 'English' ? text.text[4].en : text.text[4].es} Spotify & <a href="https://www.instagram.com/stillz/">@stillz</a>.</p>
              </div>
            <h3 className="br">{language === 'English' ? 'how?' : '¿cómo?'}</h3>
              <p className="cr">
              {language === 'English' ? text.text[5].en : text.text[5].es }
              </p>
          </div>
            </div>
            <img src="stillz-bb.png" alt="Bad Bunny polaroid. credit to Stillz" />
            <p className="vg closer">{language === 'English' ? 'listen to' : 'eschucha a'} YHLQMDLG on <a href="https://open.spotify.com/album/5lJqux7orBlA1QzyiBGti1">Spotify</a>, <a href="https://music.apple.com/us/album/yhlqmdlg/1500776322?ls=1">Apple Music</a>, <a href="https://www.youtube.com/playlist?list=PLRW7iEDD9RDS2irjCFJo7dkcswBaJZXGG">YouTube</a>, <a href="https://tidal.com/browse/album/132672298">Tidal</a> 🖤</p>
        </section>

        <section className="mobile-credits">
        <img className="bad-bunny" src="hablamosmanana_source.png" alt="Bad Bunny with a cowboy hat. source: Spotify" />
            <div className="footer-text footer-text-left">
                <h2><span className="cli">{language === 'English' ? 'made by' : 'hecho por' }</span> <a href="https://twitter.com/kris10cabrera" className="cr">kris10cabrera</a></h2>
                <p className="cr">{language === 'English' ? text.text[4].en : text.text[4].es} Spotify & <a href="https://www.instagram.com/stillz/">@stillz</a>.</p>
              </div>
        </section>
        
      </>
    )
  }
}

export default App;
