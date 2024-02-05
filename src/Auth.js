// SPOTIFY MODULE TO HANDLE HTTP FUNCTIONALITY WITH SPOTIFY API

// Save access token from url 
let accessToken = window.location.href.match(/access_token=([^&]*)/) ? window.location.href.match(/access_token=([^&]*)/)[1] : ''
let userId; // End user's user ID saved globally, fetched in create playlist logic

// Check if user is on mobile device
const isMobile = navigator.userAgentData.mobile;
if (isMobile) {
  accessToken = document.location.href.match(/access_token=([^&]*)/) ? window.location.href.match(/access_token=([^&]*)/)[1] : ''
}

// CONNECT TO SPOTIFY AND RETURN ACCESS TOKEN
export async function Spotify() {
  
  let client_id = '9a9f13d783904ab0a929ab80963613bc'; //Spotify dev account client ID
  let redirect_uri = 'https://bluicien.github.io/jammming'; //URI to redirect to after receiving token
  
  let state = generateRandomString(16);
  
  localStorage.setItem("verifier", state);
  let scope = 'user-read-private user-read-email playlist-modify-public'; // Permissions required from user.
  
  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);

  if (accessToken) {
    return accessToken;
  } else {
    // Get access token
    window.location = url;
  }
}


// CREATE PLAYLIST
// Accepts 1 parameter and connects to spotify's api to create a new empty playlist.
export async function createPlaylist(newPlaylist) {
  // Call Spotify() to authorize and create 
  try {
    userId = await fetchProfile(); // Fetch user id and save to global variable.
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: "POST",
      body: JSON.stringify({
        name: newPlaylist,
        description: "My description",
        public: true
      }),
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    });
    if (response.ok) {
      const jsonResponse = await response.json(); // Parse json response.
      const playlistId = jsonResponse.id; // Extract playlist ID and return.
      return playlistId;
    }
  } catch(err) {
    throw new Error("Failed to connect to spotify", { cause: err });
  }
}

// POST SONGS TO PLAYLIST
// This function takes 2 parameters. A list or track URIs to submit and build playlist.
// And the ID of the playlist being created.
export async function addSongs(uris, playlistId) {
  if (uris.length !== 0) {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "POST",
      body: JSON.stringify({
        "uris": uris
      }),
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    });
    console.log(response)
  }
}

// GET SONGS.
// This function takes in a single string parameter which is injected into the URL,
// to perform a GET request to search Spotify database for matching tracks.
export async function searchSongs(q) {
  const response = await fetch(`https://api.spotify.com/v1/search?q=${q}&type=track%2Cartist&limit=20`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  });

  // Parse response and extract the song array to songsArray variable
  const songsArray = (await response.json()).tracks.items; 

  // Using Array.map function, map through array of songs, 
  // saving only track uri, song name, artist(s) and album to javascript object which is returned.
  const searchResults = songsArray.map(song => (
    {
    id: song.uri,
    songName: song.name,
    artist: song.artists[0].name,
    album: song.album.name
    }))

    return searchResults;
}



// FETCH PROFILE INFO AND RETURN USER ID
export async function fetchProfile(token) {
  let result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
  });

  result = await result.json();
  return result.id;
}


// CODE CHALLENGE
function generateRandomString
(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


