/* eslint-disable linebreak-style */
// /* eslint-disable no-console */
// /* eslint-disable no-plusplus */
// /* eslint-disable object-curly-newline */
// /* eslint-disable no-unused-vars */
// /* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
  const mymap = L.map('mapid').setView([0, 0], 1);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2Ftc29uam9zZXBoMjUiLCJhIjoiY2t1b2Y0OGoxMDRvZjJva2IzYzVlemJ6dSJ9.jkhey_GJUGycclVWyny8JA'
  }).addTo(mymap);
  //   let matchArray2 = []

  function toggleSpanVisibility(evt) {
    const button = evt.target;
    const target = document
  }

  async function fetchRequest(url) {
    try {
      const request = await fetch(endpoint)
      const array = await request.json()
      return array
    } catch (err) {
      console.error(err)
      return err
    }
  }
  // array.push(...data)
  // console.log(array)

  function findMatches (wordToMatch, array) {
    return array.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi')

      if (wordToMatch.length > 0) {
        // mymap.removeLayer()
        return place.name.match(regex)
                || place.category.match(regex)
                || place.address_line_1.match(regex)
                || place.city.match(regex)
                || place.zip.match(regex)
      }
      // return null
    })
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, array)
    const matchArray2 = matchArray.slice(0, 5)
    // console.log(matchArray[0].geocoded_column_1.coordinates)
    // for (let index = 0; index < 5; index++) {
    const html = matchArray2.map((place) => {
      return `
          <div class = resultBox box>  
          <li class = first>
            
            <span class = "name is-size-6"> ${place.name}<span>
            
          </li>
          <li>
            
            <span class = "name is-size-6"> ${place.category}<span>
            
          </li>
          <li>
             
            <span class = "name is-size-6"> ${place.address_line_1}<span>
            
          </li>
          <li>
            
            <span class = "name is-size-6"> ${place.city}<span>
            
          </li>
          <li>
            
            <span class = "name is-size-6"> ${place.zip}<span>
            
          </li> 
        </div>
        <div class = "space"></div>
        `;
    }).join('');
    suggestions.innerHTML = html;
    // }
    // console.log(html)
    // if (wordToMatch.length > 0) {
    mapfunc(matchArray2)
    // }

    // matchArray2.forEach((place) => {
    //   L.marker([place.geocoded_column_1.coordinates[1],
    //     place.geocoded_column_1.coordinates[0]]).addTo(mymap)
    // })
  }

  function mapfunc(matchArray2) {
    mymap.eachLayer((layer) => {
      if (layer._latlng !== undefined) { layer.remove(); }
    //   mymap.setView([0,0],0)
    });
    matchArray2.forEach((place) => {
      const lat = place.geocoded_column_1.coordinates[1]
      const long = place.geocoded_column_1.coordinates[0]
      L.marker([lat, long]).addTo(mymap)
    })
    if (matchArray2.length > 0) {
      mymap.setView([matchArray2[0].geocoded_column_1.coordinates[1],
        matchArray2[0].geocoded_column_1.coordinates[0]], 5)
    } else {
      mymap.setView([0, 0], 1)
    }

    // mymap.setZoom(10)
  }

  const searchInput = document.querySelector('.search')
  const suggestions = document.querySelector('.suggestions')
  const boxy = document.querySelector('.boxy')

  searchInput.addEventListener('change', (event) => { displayMatches(event) })
  searchInput.addEventListener('keyup', (event) => { displayMatches(event) })
}

window.onload = windowActions