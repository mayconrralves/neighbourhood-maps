import React, { Component } from 'react'
import { Debounce } from 'react-throttle'
import escapeRegExp from 'escape-string-regexp'

class Search extends Component{
	constructor(props) {
		super(props)
  	}

	state = {
	  	/*usado para filtrar locais*/
	  	query:'',
	  	/*define qual item está ativo*/
	  	active:false,
	  	/*guarda o item ativo anterior*/
	  	prevSelection:''
  	}
  	updateQuery =(query)=>{
	  	this.setState({query:query.trim()})
	  	console.log(this.state.query)
  	}
  	/*Troca a classe para o item ativo*/
  	toggleClass = (event) =>{
  	
	  	if(this.state.active)
	  	{
	  		event.target.className = 'nav-link'
	  		this.setState({active: true})
	  	}
	  	else{
	  		if(this.state.prevSelection){
	  			this.state.prevSelection.className='nav-link'
	  		}
	  		event.target.className = 'nav-link active'
	  		this.setState({active: false})
	  		this.setState({prevSelection: event.target})
	  	}
  	}
	openNav = () => {
	  	if(document.getElementById("mySidenav")){
	  		document.getElementById("mySidenav").style.width = "250px"
	  	}
  	}
  	closeNav = () => {
  		if(document.getElementById("mySidenav")){
	  		document.getElementById("mySidenav").style.width = "0"
	  	}
	}
	render(){
		const locals = Object.keys(this.props.roma)
		const {query} = this.state
		let showingLocals
		if(query){
			const match = new RegExp(escapeRegExp(query),'i')
			showingLocals = locals.filter((local)=>match.test(local))
			locals.map((local)=> this.props.removeVisibleMarker(local))
			showingLocals.map((local)=> {
				console.log(local)
				this.props.addAnimationMarker(local)
				this.props.addVisibleMarker(local)
				
			})
		}
		else{
			showingLocals = locals
			if(this.props.mapIsReady){
				showingLocals.map((local)=>{
					this.props.removeAnimationMarker(local)
					this.props.addVisibleMarker(local)
					
				})

			}
		}
		return(
				<nav className="app-search" aria-label="menu">
					<a href="#" id='open' aria-label="open menu" onClick={this.openNav}>&#9776;</a>
					<div id="mySidenav" className='sidenav'>
						 <a href="#" aria-label="close menu" className="closebtn" onClick={this.closeNav} >&times;</a>
						<form>
							<Debounce time="300" handler="onChange">
									<input aria-label="filter-results" id="search-input" type="Search" placeholder="Search" onChange={(event) => this.updateQuery(event.target.value)} />
							</Debounce>
					    </form>
						<div className="nav flex-column nav-pills" id="v-pills-tab" aria-orientation="vertical">
						{
							showingLocals.map((local,i)=>(

								<a tabindex="0" aria-label="location of rome" className='nav-link' id={'item'+i} key={'item'+i} 
										onClick={(event)=>{
															this.props.getWiki(local)
															this.toggleClass(event)
														}}
										onKeyUp= {(event)=>{
															this.props.getWiki(local)
															this.toggleClass(event)
														}}
										>{local}
								</a>
							))
						}
						</div>
					</div>
				</nav>
			)
	}
}

export default Search