
// Check if there is a whitespace in the string
const checkWhiteSpace = (str) => {
  return /\s/.test(str)
}

// Calcualte the latitude and longitude coordinates from the Weather API
const calculateCoordinates = (citys, states, countrys) => {
  
  // Replace the white space with a '+' symbol in the city name
  // if(checkWhiteSpace(city)){
  //   let cityName = city.split(' ').join('+') 
  // }

  
  let state = "New York"
  let city = "New York"
  let country = "United States"
  let cityName = city.split(' ').join('+') 

  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en`)
  .then(response => response.json())
  .then(geocoding_data => {

      geocoding_data.results.forEach(data => {
      
      // Get the latitude and longitude of the location is in the United States
      if ((data.name === city) && (data.admin1 === state)){

        calculateWeatherCode(data.latitude, data.longitude)

      // Get the latitude and longitude of the location outside of the United States
      } else if ((data.name === city) && (data.country === country) && (data.country_code !== "US")){

        calculateWeatherCode(data.latitude, data.longitude)

      }
      
      })
  })
}

const calculateWeatherCode = (latitude, longitude) => {
  
}
