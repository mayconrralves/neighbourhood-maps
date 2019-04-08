import React, { Component } from 'react';
import axios from 'axios'
import roma from './roma.json'



class Map extends Component {
	constructor(props) {
    super(props);
    this.markers=[]
  }
	 teste = ()=> {
    	this.marker.setVisible(!this.marker.getVisible())
  		}
  	  teste2 = ()=> {
        console.log('aa')
        //this.infowindow.open(this.map, this.marker);
        //this.getWiki(this.infowindow, this.map, this.marker)
      }


	componentDidMount() {
	    const ApiKey = 'AIzaSyCm5liffecCZfRtAinGK-9m2jNkcpcLzUc&v';
	    const script = document.createElement('script');
	    script.src = `https://maps.googleapis.com/maps/api/js?v=3&key=${ApiKey}`;
	    script.async = true;
	    script.defer = true;
	    script.addEventListener('load', () => {
	      this.props.mapReady();
	    });

    document.body.appendChild(script);
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
      });
      
      // You also can add markers on the map below
      for(const local in roma){
	      	console.log(roma[local])
	      	let marker = new window.google.maps.Marker({
	          position: {lat: roma[local].lat, lng: roma[local].lng},
	          map: this.map,
	          animation: window.google.maps.Animation.DROP,
	          title: local
	        });

	      marker.addListener('click', ()=> {
	        console.log('okkkk',marker.title)
	        //this.infowindow.open(this.map, this.marker);
	        //this.getWiki(this.infowindow, this.map, this.marker)
	      });
	      this.markers.push(marker)
	  }
      

    }
  }
   render() {
    return (
      <div>
        <div id="map" style={{width: 800, height: 800}} />
        <button onClick={this.teste}>Sumir</button>
        <button onClick={this.teste2}>Open</button>
      </div>
    );
  }
}

export default Map