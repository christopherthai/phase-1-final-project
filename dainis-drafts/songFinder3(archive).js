
    let songs = [];

    // Fetch the songs from list-of-songs.json
    fetch('./3-songs-only.json')
        .then(response => response.json())
        .then(data => {
            songs = data;

            // Handle the form submission
            document.getElementById('song-form').addEventListener('submit', function(event) {
                event.preventDefault();

                // Get the song ID from the input
                let songId = parseInt(document.getElementById('songID').value, 10);

                // Find the song with the inputted ID
                let song = songs.find(song => song.id === songId);

                // Remove any previously displayed song title
                let displayedSongContainer = document.getElementById('filtered-songs-container');
                displayedSongContainer.innerHTML = '';

                // Display the song title or a "No results found" message
                if (song) {
                    displayedSongContainer.textContent = `Song: ${song.title}`;
                } else {
                    displayedSongContainer.textContent = 'No results found';
                }
            });
        })
        .catch(error => console.error('Error fetching songs:', error));
