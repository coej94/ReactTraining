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
  
  constructor(props){
    super(props)
    
    this.state = {
      videos: [],
      selectedVideo: null
    }
    
    this.videoSearch('blue monday');
  }
  
  videoSearch(term) {
    YTSearch({key: API_KEY, term: term }, (videos) => {
      // this.setState({videos}); //<- same as { videos: videos}
      // this.setState({videos: videos}); 
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      }); 
    });
  }

  render() {

    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)

    console.log(this.state.videos);
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

export default App;
