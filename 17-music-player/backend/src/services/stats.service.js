'use strict';

const statsRepository = require('../repositories/stats.repository');

const getOverview = async () => {
  const metrics = await statsRepository.getOverview();

  return {
    ...metrics,
    totalCatalog: metrics.songs + metrics.artists + metrics.albums + metrics.genres,
    activityIndex: metrics.playlists + metrics.recentPlays7d
  };
};

module.exports = {
  getOverview
};
