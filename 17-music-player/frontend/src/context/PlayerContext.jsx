import React, { createContext, useContext, useMemo, useState } from 'react';

import {
  addQueueItem,
  clearQueue,
  getPlaybackState,
  nextTrack,
  pausePlayback,
  playSong,
  previousTrack,
  resumePlayback,
  setPlaybackMode,
  setVolume
} from '../services/streamingService';

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [state, setState] = useState({
    session: null,
    queue: []
  });
  const [loading, setLoading] = useState(false);

  const refreshState = async () => {
    setLoading(true);
    try {
      const data = await getPlaybackState();
      setState(data);
    } finally {
      setLoading(false);
    }
  };

  const play = async (songId) => {
    await playSong(songId);
    await refreshState();
  };

  const pause = async () => {
    await pausePlayback();
    await refreshState();
  };

  const resume = async () => {
    await resumePlayback();
    await refreshState();
  };

  const next = async () => {
    await nextTrack();
    await refreshState();
  };

  const previous = async () => {
    await previousTrack();
    await refreshState();
  };

  const updateVolume = async (value) => {
    await setVolume(value);
    await refreshState();
  };

  const updateMode = async (payload) => {
    await setPlaybackMode(payload);
    await refreshState();
  };

  const queueAdd = async (payload) => {
    await addQueueItem(payload);
    await refreshState();
  };

  const queueClear = async () => {
    await clearQueue();
    await refreshState();
  };

  const value = useMemo(
    () => ({
      state,
      loading,
      refreshState,
      play,
      pause,
      resume,
      next,
      previous,
      updateVolume,
      updateMode,
      queueAdd,
      queueClear
    }),
    [state, loading]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
};
