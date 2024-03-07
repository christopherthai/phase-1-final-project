
let city
let state

// Nav Bar Screen Pops Up halway through page
const navBar = document.querySelector("nav")
const inputDiv = document.querySelector("#input-div")
navBar.style.display = "none"

window.addEventListener("scroll", () =>{
  
  if (window.scrollY > 500){
    navBar.style.display = "block"
  }else if(window.scrollY < 500){
    navBar.style.display ="none"
  }
   
})

//Miami, Florida, United States
//Page Scroll from header to body
function pageScroll() {
  setTimeout(() => {
  document.getElementById("top-body-container").scrollIntoView({
     behavior: "smooth", block: "end", inline: "nearest" });

  },7000
  )
}
  
  


// Get the inputs of the location from the user
const addSubmitListener = () => {

  const locationForm = document.querySelector('#location-input')
  const weatherDisplay = document.querySelector(".weather-display")
  const city_state = document.querySelector("#city-state h5")
  const display_location = document.querySelector(".display-location")

  locationForm.addEventListener('submit', (event) => {
    
    event.preventDefault()
    weatherDisplay.innerHTML = ""

    let locationInput = event.target.location.value
    let parseLocationInput = locationInput.split(', ') // Separate the string to have city, state, and country as separate elements in an array

    city = parseLocationInput[0] // Save the city value to the city global variable
    state = parseLocationInput[1] // Save the state value to the state global variable

    city_state.textContent = `${city}, ${state}`// Add the city and state to the city-state element on the html file
    display_location.textContent = `${city}, ${state}`// Add the city and state to the display location element on the html file

    getCoordinates(parseLocationInput[0], parseLocationInput[1], parseLocationInput[2])

    event.target.reset();

    // Header Transition
    inputDiv.style.display = "none"

    pageScroll()

  })

}

// Get the input to change the location in the navigation bar 
const addChangeLocationSubmitListener = () => {

  const changeLocationForm = document.querySelector('#change-location')
  const weatherDisplay = document.querySelector(".weather-display")
  const city_state = document.querySelector("#city-state")
  const display_location = document.querySelector(".display-location")

  changeLocationForm.addEventListener('submit', (event) => {
    
    event.preventDefault()
    weatherDisplay.innerHTML = ""

    let locationInput = event.target.search.value
    let parseLocationInput = locationInput.split(', ') // Separate the string to have city, state, and country as separate elements in an array

    city = parseLocationInput[0] // Save the city value to the city global variable
    state = parseLocationInput[1] // Save the state value to the state global variable

    city_state.textContent = `${city}, ${state}`// Add the city and state to the city-state element on the html file
    display_location.textContent = `${city}, ${state}`// Add the city and state to the display location element on the html file

    getCoordinates(parseLocationInput[0], parseLocationInput[1], parseLocationInput[2])

    event.target.reset();

  })

}


// Get the latitude and longitude coordinates from the Weather API
const getCoordinates = (city, state, country) => {
  
    let cityName = city.split(' ').join('+') 

  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en`)
  .then(response => {
    
    // if response have a succcessful status code
    if(response.ok) {
      return response.json() // gets returned to the next .then
    } else {
      alert("Something went wrong")
    }
    
  })
  .then(geocoding_data => {

      geocoding_data.results.forEach(data => {
      
      // Get the latitude and longitude of the location is in the United States
      if ((data.name === city) && (data.admin1 === state)){

        getWeatherCode(data.latitude, data.longitude)

      // Get the latitude and longitude of the location outside of the United States
      } else if ((data.name === city) && (data.country === country) && (data.country_code !== "US")){

        getWeatherCode(data.latitude, data.longitude)

      }
      
      })
  })
  .catch(error => alert("Make sure to have a comma and space after city and state")) 
}


// Get weather code base on the latitude and longitude from the weather api
const getWeatherCode = (latitude, longitude) => {
  
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code&temperature_unit=fahrenheit&forecast_days=1`)
  .then(response => {
    
    // if response have a succcessful status code
    if(response.ok) {
      return response.json() // gets returned to the next .then
    } else {
      alert("Something went wrong")
    }
    
  })
  .then(weather_data => {

    displayWeatherCondition(weather_data.current.weather_code)
    getWeatherMood(weather_data.current.weather_code)

    }
  )
  .catch(error => alert(error)) 
}

// Display the weather condition base on the weather code on the webpage
const displayWeatherCondition = (weather_code) => {

  const weatherDisplay = document.querySelector(".weather-display")
  const weatherMessage = document.querySelector('#start-screen-text')
  
  let weatherImage = document.createElement("img")
  let weatherImageTwo = document.createElement("img")
  let weatherImageThree = document.createElement("img")
  
  let weatherCondition
  

  if(weather_code === 0) {

    weatherImage.src = "./weather-icons-master/production/fill/all/clear-day.svg"
    weatherCondition = "Sunny"

  } else if((weather_code >= 1) && (weather_code <= 3)) {

    weatherImage.src = "./weather-icons-master/production/fill/all/partly-cloudy-day.svg"
    weatherCondition = "Partly Cloudy"

  } else if(weather_code === 4) {

    weatherImage.src = "./weather-icons-master/production/fill/all/smoke.svg"
    weatherCondition = "Smoke"
    
  } else if(weather_code === 5) {

    weatherImage.src = "./weather-icons-master/production/fill/all/haze.svg"
    weatherCondition = "Haze"
    
  } else if((weather_code >= 6) && (weather_code <= 9)) {

    weatherImage.src = "./weather-icons-master/production/fill/all/dust-wind.svg"
    weatherCondition = "Dust Wind"
    
  } else if((weather_code >= 10) && (weather_code <= 11)) {

    weatherImage.src = "./weather-icons-master/production/fill/all/mist.svg"
    weatherCondition = "Mist"
    
  } else if((weather_code >= 12) && (weather_code <= 13)) {

    weatherImage.src = "./weather-icons-master/production/fill/all/partly-cloudy-day.svg"
    weatherCondition = "Partly Cloudy"
    
  } else if((weather_code >= 14) && (weather_code <= 16)) {

    weatherImage.src = "./weather-icons-master/production/fill/all/partly-cloudy-rain.svg"
    weatherCondition = "Partly Cloudy Rain"

  } else if(weather_code === 17) {

    weatherImage.src = "./weather-icons-master/production/fill/all/thunderstorms.svg"
    weatherCondition = "Thunderstorms"

  } else if((weather_code >= 18) && (weather_code <= 19)) {

    weatherImage.src = "./weather-icons-master/production/fill/all/overcast.svg"
    weatherCondition = "Overcast"

  } else if(((weather_code >= 20) && (weather_code <= 29)) || (((weather_code >= 60) && (weather_code <= 69))) || ((weather_code >= 78) && (weather_code <= 94))) {

    weatherImage.src = "./weather-icons-master/production/fill/all/rain.svg"
    weatherCondition = "Rain"

  } else if((weather_code >= 30) && (weather_code <= 39)) {

    weatherImage.src = "./weather-icons-master/production/fill/all/dust-wind.svg"
    weatherCondition = "Dust Wind"

  } else if((weather_code >= 40) && (weather_code <= 49)) {

    weatherImage.src = "./weather-icons-master/production/fill/all/fog.svg"
    weatherCondition = "Fog"

  } else if((weather_code >= 50) && (weather_code <= 59)) {

    weatherImage.src = "./weather-icons-master/production/fill/all/drizzle.svg"
    weatherCondition = "Dizzle"

  } else if((weather_code >= 70) && (weather_code <= 77)) {

    weatherImage.src = "./weather-icons-master/production/fill/all/snow.svg"
    weatherCondition = "Snow"

  } else if((weather_code >= 95) && (weather_code <= 99)) {

    weatherImage.src = "./weather-icons-master/production/fill/all/thunderstorms.svg"
    weatherCondition = "Thunderstorms"

  } 

  weatherImageTwo.src = weatherImage.src
  weatherImageThree.src = weatherImage.src

  weatherImage.className = "weather-image"
  weatherImageTwo.className = "weather-image-two"
  weatherImageThree.className = "weather-image-three"

  weatherMessage.textContent = `It look like it is ${weatherCondition} in ${city}!`

  weatherDisplay.append(weatherImage)
  weatherDisplay.append(weatherImageTwo)
  weatherDisplay.append(weatherImageThree)

}
// Moods Moods: Somber, Excited, Content, Calming , Hopeful , Nostalgic
// Get the mood base on the weather code
const getWeatherMood = (weather_code) => {

  let mood
  
  if((weather_code >= 0) && (weather_code <= 3)) {

    mood = "Excited"

  } else if(((weather_code >= 4) && (weather_code <= 10)) || (((weather_code >= 17) && (weather_code <= 19))) || ((weather_code >= 41) && (weather_code <= 49))) {

    mood = "Calming"

  } else if(((weather_code >= 11) && (weather_code <= 16)) || (((weather_code >= 70) && (weather_code <= 77)))) {

    mood = "Content"
 
  } else if(((weather_code >= 20) && (weather_code <= 29)) || (((weather_code >= 60) && (weather_code <= 69))) || ((weather_code >= 78) && (weather_code <= 94))) {

    mood = "Nostalgic"
 
  } else if(((weather_code >= 30) && (weather_code <= 39)) || (((weather_code >= 95) && (weather_code <= 99)))) {

    mood = "Somber"

  } else if(((weather_code >= 50) && (weather_code <= 59))) {

    mood = "Hopeful"
  
  }

  getSong(mood)

}

const getSong = (mood) => {
  
  fetch("http://localhost:3000/songs")
  .then(response => {
    if(response.ok) {
      return response.json()
    }
    else {
      alert("Something went wrong")
    }
    
  })
  .then(song_data => {
    // moodList is a list of objects --> Title,Name,Image,Url
    const moodList = [];
    song_data.map(data => {
      // console.log(data.mood[0]);
      if(data.mood[0] === mood){

        const songObj = {
          songTitle: data.songTitle,
          artist: data.artist,
          image: data.image,
          url: data.url.youtube,
          favorite:data.favorite,
          id:data.id
      }
        moodList.push(songObj);
      }
    })

     const songChoice = getRandom(moodList);
     //songChoice is a selected song object
     console.log(songChoice, "songChoice");
     centerDisplay(songChoice);
  })
  .catch(error => alert(`error with get song fetch --> ${error}`)) 
}

function getRandom(list){
  const randomNumber = Math.floor(Math.random() * list.length);
  return list[randomNumber];
}
function playMusic(e,data){
  e.preventDefault()
  window.open( `${data.url} , 'blank'`)
}

//this function renders an object to the target div #ID,
//assuming target div is a string  
function renderSong(object, targetDiv){

  const selectedDiv = document.getElementById(targetDiv)
  const button = document.createElement("button")

  const playButton = document.createElement('div')
  const text = document.createElement("div")
  const title = document.createElement("h4")
  const songArtist = document.createElement("h4")
  const favoriteButton = document.createElement("img")


  
  button.id = "suggested-song";
  button.className = "song-button";
  
  playButton.id = "stock-album-cover";
  text.id = "song-text";
  title.textContent = object.songTitle;
  songArtist.textContent = object.artist;
  favoriteButton.src = ""
  favoriteButton.id = "favorite-button"

  songArtist.value = object.artist;

  selectedDiv.appendChild(button);
  button.appendChild(playButton);
  button.appendChild(text);
  text.appendChild(title);
  text.appendChild(songArtist);
  button.appendChild(favoriteButton)

  console.log(object,"<----this is the renderSong Obj")
  // Shows correct like image depending on state
  object.favorite === true ? favoriteButton.src ="./favoriteFilled.png" : favoriteButton.src = "./favoriteEmpty.png"
  // On click send to youtube
  selectedDiv.addEventListener("click", (e) => playMusic(e,object))
  favoriteButton.addEventListener("click",(e) => postFavorite(e,object) )

}

//post favorite or Not to songsDb
function postFavorite(e,object){
    e.preventDefault()
    fetch(`http://localhost:3000/songs/${object.id}`,{
        method:"PATCH",
        header:{
          "content-Type":"application/json"
        },
          body:JSON.stringify({"favorite":!object.favorite})
    })
    .then(response => {
      if(response.ok) {
      }
      else {
        alert("Something went wrong with favorite button")
      }
      
    })
  
}
  
const renderLikedSongsPlaylist = () => {
  
  const selectedDiv = document.querySelector("#playlist-container")
  
  fetch("http://localhost:3000/songs")
  .then(response => {
    
    // if response have a succcessful status code
    if(response.ok) {
      console.log(response, 'response')
      return response.json() // gets returned to the next .then
    } else {
      alert("Something went wrong")
    }
    
  })
  .then(song_data => {
    console.log(song_data)
    song_data.forEach(song => {
      if(song.favorite === true) {
        renderSong(song, "playlist-container") 
      }

    })


  })
}

// Shows The center Suggested Song
function centerDisplay(songObj){
 renderSong(songObj,"top-body-container")
}

function main(){
  
  addSubmitListener()
  addChangeLocationSubmitListener()
  renderLikedSongsPlaylist()
  

}

main();
