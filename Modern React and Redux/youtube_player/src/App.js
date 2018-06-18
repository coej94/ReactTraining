import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyD_PYWRMhFn24kftrY6Tq_5XLdh-Kdtlh4';


//DOWNWARDS DATAFLOW (The most parant component should alwasy be responsable for datafetching)
class App extends Component {
  
  constructor(props){
    super(props)
    
    this.state = {
      videos: []
    }
    YTSearch({key: API_KEY, term: 'surfboards' }, (videos) => {
      this.setState({videos}); //<- same as { videos: videos}
      // this.setState({videos: videos}); 
    });

  }
  
  render() {
    console.log(this.state.videos);
    return (
      <div className="App">
        <SearchBar />
      </div>
    );
  }
}

export default App;
