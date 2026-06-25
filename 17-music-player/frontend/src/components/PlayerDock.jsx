import React from 'react';

import { usePlayer } from '../context/PlayerContext';

const PlayerDock = () => {
  const { state, pause, resume, next, previous, updateVolume, updateMode } = usePlayer();

  const session = state.session;

  return (
    <section className="player-dock">
      <div>
        <strong>{session?.currentSongTitle || 'No song selected'}</strong>
        <p>Status: {session?.status || 'stopped'}</p>
      </div>

      <div className="dock-actions">
        <button onClick={previous}>Prev</button>
        {session?.status === 'playing' ? <button onClick={pause}>Pause</button> : <button onClick={resume}>Resume</button>}
        <button onClick={next}>Next</button>
      </div>

      <div className="dock-actions">
        <label>
          Volume
          <input
            type="range"
            min="0"
            max="100"
            value={session?.volumePercent ?? 80}
            onChange={(e) => updateVolume(Number(e.target.value))}
          />
        </label>
        <button onClick={() => updateMode({ shuffleEnabled: !(session?.shuffleEnabled || false) })}>
          Shuffle: {session?.shuffleEnabled ? 'On' : 'Off'}
        </button>
      </div>
    </section>
  );
};

export default PlayerDock;
