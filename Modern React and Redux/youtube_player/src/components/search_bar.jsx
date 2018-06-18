import React, { Component } from "react";

class SearchBar extends Component{

    constructor(props){
        super(props)

        this.state = {term: ''}
    }

    render(){
        return(
            <div className="search-bar">
                <input 
                value={this.state.term}
                onChange={(event) => this.onInputChange(event.target.value)} />

            </div>
        );
    }

    onInputChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
    //DETTE ER DEN LANGE MÅDE AT GØRE DET PÅ 
    // render(){
    //     return(
    //         <input onChange={this.onInputChange}/>
    //     )
    // }

    // //Custom event function (event er der fordi de fleste events (som onChange) kaldes med et event object.)
    // onInputChange(event){
    //   console.log(event.target.value)
    // }
}
export default SearchBar;