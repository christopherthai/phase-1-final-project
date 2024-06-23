# WeatherTune

<!-- Headings -->

## Description

WeatherTune is a web application that recommends songs based on the weather and your location.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Git](https://git-scm.com/).
- You have a [GitHub](https://github.com/) account.
- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/get-npm).

## Getting Started

To get a local copy up and running, follow these steps.

### Front-end Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:your-username/phase-1-final-project.git
   ```

2. Navigate to the front-end directory:

   ```bash
   cd phase-1-final-project
   ```

3. Install npm packages:

   ```bash
   npm install
   ```

## Wireframe

![Wireframe](//planning/Wireframe.png)

## User Stories

As an user, I want a song that will match my mood for the day. I’ll hit the website, enter my location and get the weather forecast for today. I am giving a song of the day to listen to based on the weather of my location. I can favorite the song which will add it on the “Favorite” Playlist.

## Example of db.json

![Trello Board](//planning/db-son.png)

## API

Weather API:

https://open-meteo.com/

## 3 Unique Event Listeners

1. submit - Add a 'submit' event listener when submitting the location
2. click - Add a 'click' event listener when you click the like button on the song
3. mouseover - Add a 'mouseover' event listener when hovering over the song button that will highlight it

## Array Iteration

We will use the forEach method to iterate through the data that we fetch from the json server to find the song base on the weather.

## Three Strech Goals

1. Be able to change the mood
2. Show the 7 days forecast
3. Add your own songs to the song database

## Trello Board

![Trello Board](//planning/Trello.png)
