import React, { Component } from 'react';
import axios from 'axios'
import Search from './Search'
import roma from './roma.json'


class Map extends Component {
	constructor(props) {
    super(props)
    this.markers = {}
  }
	 

  	getWiki = (local) => {
      const endPoint = "https://en.wikipedia.org/w/api.php?"
      const parameters = {
          action: "opensearch",
          origin: "*",
          search: local,
          limit: 1,
          namespace: 0,
          format: 'json',
          prop:"extracts"
      }
        const url2 = new URLSearchParams(parameters)
        let information=''
        console.log(url2)
        axios.get(endPoint+url2)
          .then(response => {
            if(response.data[2][0]){
              information = response.data[2][0]
            }
            else{
              information = 'No Information'
            }
              if(this.infowindow){
              this.infowindow.close()
            }
              this.infowindow = new window.google.maps.InfoWindow({
                       content: information
                     })
            this.infowindow.open(this.map, this.markers[local])
          })
          .catch(error=>{
            alert('A api da wikipedia nao pode ser carregada')
          })
  }

  toogleVisibleMarker = (marker)=> {
      this.marker.setVisible(!this.marker.getVisible())
      }


	componentDidMount() {
	    const ApiKey = 'AIzaSyCm5liffecCZfRtAinGK-9m2jNkcpcLzUc&v'
	    const script = document.createElement('script')
	    script.src = `https://maps.googleapis.com/maps/api/js?v=3&key=${ApiKey}`
	    script.async = true
	    script.defer = true
      script.onerror = ()=>{alert("ERRO, Não foi possível carregar a API do Google Maps")}
	    script.addEventListener('load', () => {
	      this.props.mapReady()
	    })


   
    document.body.appendChild(script)

  }

  componentDidUpdate() {
    if (this.props.mapIsReady) {
      // Display the map
      console.log("abriu")
      let spanishSteps = roma['Spanish Steps']
      console.log(spanishSteps.lng)
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: spanishSteps.lat, lng: spanishSteps.lng},
          zoom: 13
      })
            
      for(const local in roma){
	      	console.log(roma[local])
	      	let marker = new window.google.maps.Marker({
	          position: {lat: roma[local].lat, lng: roma[local].lng},
	          map: this.map,
	          animation: window.google.maps.Animation.DROP,
	          title: local
	        })

	      marker.addListener('click', ()=> {
	        console.log(marker.title)
	        this.getWiki(local)

          this.markers[local].setAnimation(window.google.maps.Animation.BOUNCE)
          this.markers[local].setAnimation(null)
           
	      })
	      this.markers[local] = marker
	  }
      

    }
    else{
      alert('ERRO ao carregar')
    }
  }
   render() {

    return (
      <div className="App container">
        <div className="row">
        <Search roma={roma} mapIsReady={this.props.mapIsReady} getWiki={this.getWiki}/>
      <div className="app-map col-10">
        <div id="map" style={{width: 800, height: 800}} />
      </div>
      </div>
      </div>
    )
  }
}

export default Map