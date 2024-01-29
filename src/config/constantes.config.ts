export const spotifyConfiguration = {
  clientId: "1b83967469fa4d259bf117c9ad894942",
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'http://localhost:4200/login',
  scopes: [
    "user-read-currently-playing", // Read the user's currently playing music.
    "user-read-recently-played", // Read the user's recently played tracks.
    "user-read-playback-state", // Read the user's playback state.
    "user-top-read", // Read the user's top artists and tracks.
    "user-modify-playback-state", // Modify the user's playback state (e.g., PlaylistResponse.ts, pause, skip).
    "user-library-read", // Read the user's library of saved tracks.
    "playlist-read-private", // Read the user's private playlists.
    "playlist-read-collaborative", // Read collaborative playlists the user has access to.
    "streaming",
    "user-read-email",
  ],
  spotifyApiBaseUrl: 'https://api.spotify.com/v1',
};
