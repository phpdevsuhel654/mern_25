import React, { memo } from 'react';

const SongTable = ({ songs, onPlay, onQueueAdd }) => {
  return (
    <div className="panel">
      <table className="song-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Source</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.title}</td>
              <td>{song.artist?.name || song.artist_name || 'Unknown'}</td>
              <td>{song.sourceType || song.source_type}</td>
              <td className="action-cell">
                <button onClick={() => onPlay(song.id)}>Play</button>
                <button onClick={() => onQueueAdd(song.id)}>Queue</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(SongTable);
