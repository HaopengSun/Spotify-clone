/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from 'react'
import UserAuth from './UserAuth'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearch from './TrackSearch'
import Player from './Player'

const spotifyApi = new SpotifyWebApi({
  clientId: "00784c5c814a4b30b3bb6e1eab7ece0b"
})

export default function Dashboard({code}){
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [playing, setPlaying] = useState([])

  function choseTrack(track){
    setPlaying(track)
    setSearch('')
  }

  const accessToken = UserAuth(code)
  console.log(searchResult)

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResult([])
    if (!accessToken) return
    let cancel = false

    spotifyApi.searchTracks(search)
      .then(data => {
        if (cancel) return
        // console.log(data.body.tracks.items)
        setSearchResult(data.body.tracks.items.map(item => {
          // find the smallest-sized image
          const smallestImage = item.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image
            return smallest
          }, item.album.images[0])

          return {
            artist: item.artists[0].name,
            title: item.name,
            url: item.url,
            albumUrl: smallestImage.url
          }
        }))
      })
      return () => { cancel = true }
  }, [search, accessToken])

  return(
    <>
      <Container className="d-flex flex-column py-2">
        <Form.Control type="search" placeholder="Search songs or artists" value={search} onChange={e => setSearch(e.target.value)} />
      </Container>
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto"}}>{
        searchResult.map(track => {
          const result = { artist: track.artist, title: track.title, url: track.url, albumUrl: track.albumUrl }
          return (<TrackSearch result={result} key={result.url} choseTrack={choseTrack}/>)
        })
      }</div>
      <Player accessToken={accessToken} trackUri={playing?.url}/>
    </>
  )
}