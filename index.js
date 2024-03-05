
// Check if there is a whitespace in the string
const checkWhiteSpace = (str) => {
  return /\s/.test(str)
} 

// Get the latitude and longitude coordinates from the Weather API
const getCoordinates = (city, state, country) => {
  
  // let state = "New York"
  // let city = "New York"
  // let country = "United States"
  // let cityName = city.split(' ').join('+') 
        
  //Replace the white space with a '+' symbol in the city name
  if(checkWhiteSpace(city)){
    let cityName = city.split(' ').join('+') 
  }

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
    }
  )
  .catch(error => alert(error)) 
}
