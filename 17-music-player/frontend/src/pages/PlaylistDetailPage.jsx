import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { usePlayer } from '../context/PlayerContext';
import { getPlaylistDetail } from '../services/playlistService';

const PlaylistDetailPage = () => {
  const { id } = useParams();
  const { play, queueAdd } = usePlayer();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await getPlaylistDetail(id);
      setPlaylist(response.playlist);
      setSongs(response.songs || []);
    };

    load().catch(() => {});
  }, [id]);

  return (
    <section>
      <h1>{playlist?.name || 'Playlist'}</h1>
      <div className="panel">
        <p>{playlist?.description || 'No description'}</p>
      </div>
      <div className="panel">
        <ul className="clean-list">
          {songs.map((song) => (
            <li key={song.songId} className="list-row">
              <span>{song.position}. {song.title}</span>
              <div className="action-cell">
                <button onClick={() => play(song.songId).catch(() => {})}>Play</button>
                <button onClick={() => queueAdd({ songId: song.songId }).catch(() => {})}>Queue</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PlaylistDetailPage;
