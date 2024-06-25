# WeatherTune

<!-- Headings -->

## Description

WeatherTune is a web application that recommends songs based on the weather and your location.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Git](https://git-scm.com/).
- You have a [GitHub](https://github.com/) account.
- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/get-npm).
- You have installed the Live Server VSCode extension: [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

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

## Running the Application

1. Ensure you are in the root directory of the project.

2. Start the JSON server to watch `songDb.json`:

   ```bash
   json-server --watch songDb.json
   ```

3. Right-click on the `index.html` file (or the main HTML file of your project) in the file explorer.
4. Select `Open with Live Server` from the context menu.
5. The application should now be running, and a new browser tab will open displaying the application. The Live Server will automatically reload the page whenever you make changes to the files.

## Wireframe

![Wireframe](/planning/Wireframe.png)

## User Stories

As an user, I want a song that will match my mood for the day. I’ll hit the website, enter my location and get the weather forecast for today. I am giving a song of the day to listen to based on the weather of my location. I can favorite the song which will add it on the “Favorite” Playlist.

## Example of db.json

![Trello Board](/planning/db-son.png)

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

![Trello Board](/planning/Trello.png)
