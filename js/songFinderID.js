    let songs = [];

    // Fetch the songs from list-of-songs.json
    fetch('./json/17-songs.json')
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
        let song = songs.find(song => song.id === songId);
        let displayedSongContainer = document.getElementById('filtered-songs-container');

        if (song) {
            let ol = document.createElement('ol');
            let li = document.createElement('li');
            let h3 = document.createElement('h3');
            h3.textContent = song.title;
            li.appendChild(h3);

            let iframe = document.createElement('iframe');
            iframe.src = `https://open.spotify.com/embed/track/${song.links.spotify.split('track/')[1]}`;
            iframe.width = '300';
            iframe.height = '380';
            iframe.frameBorder = '0';
            iframe.allowtransparency = 'true';
            iframe.allow = 'encrypted-media';
            li.appendChild(iframe);

            ol.appendChild(li);
            displayedSongContainer.appendChild(ol);
        } else {
            displayedSongContainer.textContent = 'No results found';
        }
    }

    function findSongByLyrics(lyricsWords) {
        let matchingSongs = songs.filter(song => song.lyrics.toLowerCase().includes(lyricsWords.toLowerCase()));
        let displayedSongContainer = document.getElementById('filtered-songs-container');

        if (matchingSongs.length > 0) {
            let ol = document.createElement('ol');
            matchingSongs.forEach(song => {
                let li = document.createElement('li');
                let h3 = document.createElement('h3');
                h3.textContent = song.title;
                li.appendChild(h3);

                let iframe = document.createElement('iframe');
                iframe.src = `https://open.spotify.com/embed/track/${song.links.spotify.split('track/')[1]}`;
                iframe.width = '300';
                iframe.height = '380';
                iframe.frameBorder = '0';
                iframe.allowtransparency = 'true';
                iframe.allow = 'encrypted-media';
                li.appendChild(iframe);

                ol.appendChild(li);
            });
            displayedSongContainer.appendChild(ol);
        } else {
            displayedSongContainer.textContent = 'No results found';
        }
    }