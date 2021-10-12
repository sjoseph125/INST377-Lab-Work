/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
// /* eslint-disable no-console */
// /* eslint-disable no-plusplus */
// /* eslint-disable object-curly-newline */
// /* eslint-disable no-unused-vars */
// /* eslint-disable linebreak-style */

async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'

  // const array = []
  const request = await fetch(endpoint)
  const array = await request.json()
  // array.push(...data)
  // console.log(array)

  function findMatches (wordToMatch, array) {
    return array.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi')
      console.log(wordToMatch.length)
      if (wordToMatch.length > 0) {
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
    // console.log(matchArray)
    const html = matchArray.map((place) => {
      return `
        
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
        </li> <br>
      
      `;
    }).join('');
    // console.log(html)
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('.search')
  const suggestions = document.querySelector('.suggestions')
  const boxy = document.querySelector('.boxy')

  searchInput.addEventListener('change', (event) => { displayMatches(event) })
  searchInput.addEventListener('keyup', (event) => { displayMatches(event) })
}

window.onload = windowActions