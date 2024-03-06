    let songs = [];

    // Fetch the songs from list-of-songs.json
    fetch('./17-songs.json')
        .then(response => response.json())
        .then(data => {
            songs = data;

            // Handle the form submission
            document.getElementById('song-form').addEventListener('submit', function(event) {
                event.preventDefault();

                // Get the input values
                let songId = parseInt(document.getElementById('songID').value, 10);
                let lyricsWords = document.getElementById('lyricsWords').value;

                // Clear the container
                let displayedSongContainer = document.getElementById('filtered-songs-container');
                displayedSongContainer.textContent = '';

                // Call the appropriate function based on which fields are filled
                if (songId) {
                    findSongById(songId);
                }
                if (lyricsWords) {
                    findSongByLyrics(lyricsWords);
                }
            });
        })
        .catch(error => console.error('Error fetching songs:', error));

    function findSongById(songId) {
        // Find the song with the inputted ID
        let song = songs.find(song => song.id === songId);

        // Get the container to display the song title
        let displayedSongContainer = document.getElementById('filtered-songs-container');

        // Display the song title or a "No results found" message
        if (song) {
            displayedSongContainer.textContent = `Song: ${song.title}`;
        } else {
            displayedSongContainer.textContent = 'No results found';
        }
    }

    function findSongByLyrics(lyricsWords) {
        // Filter the songs to only include those where the lyrics contain the lyrics words
        let matchingSongs = songs.filter(song => song.lyrics.toLowerCase().includes(lyricsWords.toLowerCase()));

        // Get the container to display the song titles
        let displayedSongContainer = document.getElementById('filtered-songs-container');

        // Display the song titles or a "No results found" message
        if (matchingSongs.length > 0) {
            matchingSongs.forEach(song => {
                let songElement = document.createElement('p');
                songElement.textContent = `Song: ${song.title}`;
                displayedSongContainer.appendChild(songElement);
            });
        } else {
            displayedSongContainer.textContent = 'No results found';
        }
    }