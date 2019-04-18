import React, { Component } from 'react';
import axios from 'axios'
import Search from './Search'
import roma from './roma.json'


class Map extends Component {
	constructor(props) {
    super(props)
    this.markers = {}
  }
    /*Conecta e recebe os dados da api da wikipedia*/
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
            this.markers[local].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
            this.infowindow.open(this.map, this.markers[local])
            })
          .catch(error=>{
            alert('A api da wikipedia nao pode ser carregada')
          })
        
  }

  removeVisibleMarker = (local)=>{
    if(this.markers[local]){
       this.markers[local].setVisible(false)
    }
  }
  removeAnimationMarker = (local)=>{
      if(this.markers[local]){
         this.markers[local].setAnimation(-1)

      }
  }
   addAnimationMarker = (local)=>{
      if(this.markers[local]){
         this.markers[local].setAnimation(window.google.maps.Animation.BOUNCE)

      }
  }
  addVisibleMarker = (local)=>{
    if(this.markers[local]){
       this.markers[local].setVisible(true)
       
    }
   
  }
  /*Inicializa o Google Maps,adicionado uma tag script assincrona*/
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

  /*Adiciona e mostra os marcadores quando é iniciada a aplicação*/
  showMarkers = (locals)=>{
     locals.map((local)=>{
          let marker = new window.google.maps.Marker({
            position: {lat: roma[local].lat, lng: roma[local].lng},
            map: this.map,
            animation: window.google.maps.Animation.DROP,
            title: local
          })

        marker.addListener('click', ()=> {
          console.log(marker.title)
          this.getWiki(local)

          this.markers[local].setAnimation(-1)
           
        })
        this.markers[local] = marker
    })

  }

  /*Cria o mapa e o adiciona a aplicação*/
  componentDidUpdate() {
    if (this.props.mapIsReady) {
      // Display the map
      let spanishSteps = roma['Spanish Steps']
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: spanishSteps.lat, lng: spanishSteps.lng},
          zoom: 13
      })
            
     this.showMarkers( Object.keys(roma))
      

    }
    else{
      alert('ERRO ao carregar')
    }
  }
   render() {

    return (
      <main className="App container">
          <h1>ROMA, a Cidade Eterna</h1>
          <section className="row" role="application" aria-label="Map of Rome">
              <Search roma={roma} 
                      mapIsReady={this.props.mapIsReady}  
                      removeVisibleMarker={this.removeVisibleMarker}
                      removeAnimationMarker={this.removeAnimationMarker} 
                      addVisibleMarker={this.addVisibleMarker}
                      addAnimationMarker={this.addAnimationMarker}
                      showMarkers={this.showMarkers} 
                      getWiki={this.getWiki}
              />
            <div className="app-map col-md-12">
              <div id="map"/>
            </div>
         </section>
      </main>
    )
  }
}

export default Map