import React, { Component } from 'react';
import '../style/style.css';
import _ from "lodash";
import YTSearch from 'youtube-api-search';
import SearchBar from './search_bar';
import VideoList from './video_list';
import VideoDetail from './video_detail';


const API_KEY = 'AIzaSyD_PYWRMhFn24kftrY6Tq_5XLdh-Kdtlh4';


//DOWNWARDS DATAFLOW (The most parant component should alwasy be responsable for datafetching)
class App extends Component {
  
//For at bruge state skal man bruge constructoren (fra Component som app arver fra).
  constructor(props){
    //super referer til Components super metode
    super(props)
    //her initialiserers state. Det er det eneste tidspunkt hvor du må bruge this.state = ... 
    //Skal man ændre state, skal man bruge this.setState(...)
    this.state = {
      videos: [],
      selectedVideo: null
    }
    //Dette laver vi et initial search med Youtube api.
    this.videoSearch('');
  }
  //Funktion der står for data fetching
  videoSearch(term) {
    YTSearch({key: API_KEY, term: term }, (videos) => {
      // this.setState({videos}); //<- same as { videos: videos} 
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      }); 
    });
  }

  //render metode der står for rendering af app component.
  render() {
    //her benytter vi lodash bibliotektet, til at begrænse søgningen til hvert 300 milisekund.
    //brugte vi ikke debounce, ville vi kalde youtube hver gang man ændrede i searchbaren. 
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)

    // console.log(this.state.videos);
    return (
      <div className="App">
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

//for at man kan bruge en komponent et andet sted i sin react app, skal man exportere den. 
export default App;
