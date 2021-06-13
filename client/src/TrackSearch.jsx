import React from 'react'

export default function TrackSearch({ result, choseTrack }){
  function handlePlay(){
    choseTrack(result)
  }
  return <div className="d-flex m-2 align-items-center" style={{ cursor: 'pointer' }} onClick={handlePlay}>
    <img src={result.albumUrl} alt="albumUrl" style={{ height:"64px", width:"64px"}}/>
    <div className="ml-3">
      <div>{result.title}</div>
      <div className="text-muted">{result.artist}</div>
    </div>
  
    <p>{result.url}</p>
  </div>
}