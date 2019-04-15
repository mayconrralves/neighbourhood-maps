import React, { Component } from 'react'
//import roma from './roma.json'

class Search extends Component{
	constructor(props) {
    super(props)
  }

  state = {
  	query:''
  }

	render(){
		const locals = Object.keys(this.props.roma)
		return(
				<div className="app-search col-2">
					<label>Search: </label><input id="search-input" />
					<ol className="list-locals">
					{
						locals.map((local,i)=>(

							<li id={i} onClick={(event)=>this.props.getWiki(local)}>{local}</li>
						))
					}
					</ol>
						
						

				</div>
			)
	}
}

export default Search