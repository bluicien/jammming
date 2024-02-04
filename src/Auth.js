let accessToken = window.location.href.match(/access_token=([^&]*)/) ? window.location.href.match(/access_token=([^&]*)/)[1] : ''
let userId;
let playlistId;

const uris = [
  "2nLtzopw4rPReszdYBJU6h",
  "0COqiPhxzoWICwFCS4eZcp",
  "40rvBMQizxkIqnjPdEWY1v",
  "40LQiUUUKXVGyNs09lHVjW",
  "5GorCbAP4aL0EJ16frG2hd"
]

// CONNECT TO SPOIFY AND RETURN ACCESS TOKEN
export async function Spotify() {
  
  let client_id = '9a9f13d783904ab0a929ab80963613bc';
  let redirect_uri = 'http://localhost:3000/';
  
  let state = generateRandomString(16);
  
  localStorage.setItem("verifier", state);
  let scope = 'user-read-private user-read-email playlist-modify-public';
  
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
// Accepts 1 parameter and connects to spotify's playlist api to create a new empty playlist.
export async function createPlaylist(newPlaylist) {
  // Call Spotify() to authorize and create 
  await Spotify();
  try {
    userId = await fetchProfile();
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
      const jsonResponse = await response.json();
      playlistId = jsonResponse.id;
    }

    addSongs();
    
  } catch(err) {
    throw new Error("Failed to connect to spotify", { cause: err });
  }
}


// POST SONGS TO PLAYLIST
export async function addSongs() {
  const songs = uris.map(songURI => `spotify:track:${songURI}`)
  console.log(songs)
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: "POST",
    body: JSON.stringify({
      "uris": songs
    }),
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  });

  console.log(response)
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


