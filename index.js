
// Get the inputs of the location from the user
const addSubmitListener = () => {

  const locationForm = document.querySelector('#location-input')

  locationForm.addEventListener('submit', (event) => {
    
    event.preventDefault()

    let locationInput = event.target.location.value
    let parseLocationInput = locationInput.split(', ') // Separate the string to have city, state, and country as separate elements in an array

    getCoordinates(parseLocationInput[0], parseLocationInput[1], parseLocationInput[2])

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
  .catch(error => alert(error)) 
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

    console.log(weather_data.current.weather_code)
    getWeatherMood(weather_data.current.weather_code)

    }
  )
  .catch(error => alert(error)) 
}

const getWeatherMood = (weather_code) => {

  let mood
  
  if ((weather_code >= 0) && (weather_code <= 3)) {

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
  
  fetch(`http://localhost:3000/songs`)
  .then(response => {
    // if response have a succcessful status code
    if(response.ok) {
      return response.json()
    }
    else {
      alert("Something went wrong")
    }
    
  })
  .then(song_data => {
    const moodList = [];
      song_data.map(data => {
        // console.log(data.mood[0]);
        if(data.mood[0] === mood){
          const songObj = {
            songTitle: data.songTitle,
            artistName: data.artist,
            image: data.image,
            url: data.url.youtube
          };
          moodList.push(songObj);
        }
      })

      console.log(moodList, "moodList");
     const songChoice = getRandom(moodList);
     //songChoice is a selected song object
     console.log(songChoice, "songChoice");
  })
  .catch(error => alert(error)) 


}


function getRandom(list){
  const randomNumber = Math.floor(Math.random() * list.length);
  return list[randomNumber];
}

{/* <button id="suggested-song" class="song-button">
        <!-- If there is an image display <img  src="" /> -->
        <div id="stock-album-cover"></div>
        <div id="song-text">
          <h4>Song-Title</h4>
          <h4>Artist Name</h4>
        </div>
        <!-- icon -->
      </button> */}


 //this function renders an object to the target div,
 //assuming target div is a string     
 function renderSong(object, targetDiv){
   const selectedDiv = getElementById(targetDiv);
   const button = document.createElement("button");
   const stockImage = document.createElement("img");
   const image = document.createElement('div');
   const text = document.createElement("div");
   const title = document.createElement("h4");
   const songArtist = document.createElement("h4");
   
   image.src = stockImage;
  button.id = "suggested-song";
  button.className = "song-button";
  stockImage.id = "stock-album-cover";
  text.id = "song-text";
  title.value = object.songTitle;
  songArtist.value = object.artist;

  selectedDiv.appendChild(button);
  button.appendChild(stockImage);
  button.appendChild(text);
  text.appendChild(title);
  text.appendChild(songArtist);

  
}







function main(){
getSong("Excited");







}








const suggestedSong = document.getElementById("suggested-song")

suggestedSong.addEventListener("click", ()=>{
  console.log("I'm clicked, baby!")
})


main();

// Moods Moods: Somber, Excited, Content, Calming , Hopeful , Nostalgic


//  Ben and Dalton 
//Body JS and U.I


// 1. Connect Button to youtube URL on click
// 2. Display City and Country on side 
// 3.Add Like icon ---> on click add to liked Songs Playlist
// 4. Randomly Recommend a song based on Mood
