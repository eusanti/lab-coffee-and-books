//5. Instrucciones: Creado el initMap para pintar el mapa
function initMap() {

    const lxPlace = {
      lat: 38.725228007889605,
      lng: -9.062648438073321
    };
  
  
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: lxPlace
    });

    getPlaces(map)
    .then(places => {
        const markers = placesCoffee(map, places)
    })
    .catch(err => console.log(err))
  }

// 6. Instrucciones: Creado y llamado a getRestaurants para recuperar
//    esa info de la BD
function getPlaces() {
    return axios.get("/places/api")
      .then(response => response.data.places)
  }

  function placesCoffee(map, places){
      const markers =[]
  }
  
