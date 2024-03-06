let songs = [];

// Fetch the songs from list-of-songs.json
fetch('list-of-songs.json')
    .then(response => response.json())
    .then(data => songs = data);

// Handle the form submission
document.getElementById('song-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    let weatherWords = document.getElementById('weatherWords').value;
    let vibeWords = document.getElementById('vibeWords').value;
    let lyricsWords = document.getElementById('lyricsWords').value;

    // Filter the songs based on the input values
    let filteredSongs = songs.filter(song => 
        song.weatherWords.includes(weatherWords) &&
        song.vibeWords.includes(vibeWords) &&
        song.lyricsWords.includes(lyricsWords)
    );

    // Log the filtered songs to the console
    console.log(filteredSongs);
});