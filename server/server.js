const express = require('express');
const app = express();
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

app.use(cors());

// bodParser.json
app.use(express.json());

app.post('/login', function(req, res){
  const credentials = {
    clientId: '00784c5c814a4b30b3bb6e1eab7ece0b',
    clientSecret: 'da275a19d3a94101929091837b0f25e4',
    redirectUri: 'http://localhost:3000',
  }
  const spotifyApi = new SpotifyWebApi(credentials)

  // get the code from url
  const code = req.body.code;
  spotifyApi.authorizationCodeGrant(code).then(
    function(data) {
      res.json({
        expires_in: data.body['expires_in'],
        access_token: data.body['access_token'],
        refresh_token:data.body['refresh_token']
      })

      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);
  
      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
    }).catch((err) => {
      console.log('Something went wrong!', err);
      res.sendStatus(400);
    })
})

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const credentials = {
    clientId: '00784c5c814a4b30b3bb6e1eab7ece0b',
    clientSecret: 'da275a19d3a94101929091837b0f25e4',
    redirectUri: 'http://localhost:3000',
    refreshToken
  }
  const spotifyApi = new SpotifyWebApi(credentials)

  spotifyApi.refreshAccessToken().then(data => {
      console.log('The access token has been refreshed!');
      res.json({
        expires_in: data.body['expires_in'],
        access_token: data.body['access_token'],
      })
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    }).catch(() => {
      res.sendStatus(400)
    })
})

app.listen(3001)