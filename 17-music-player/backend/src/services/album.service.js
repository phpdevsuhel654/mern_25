'use strict';

const AppError = require('../utils/AppError');
const httpStatus = require('../constants/httpStatus');
const slugify = require('../utils/slugify');
const albumRepository = require('../repositories/album.repository');

const mapAlbum = (album) => ({
  id: album.id,
  artistId: album.artist_id,
  artistName: album.artist_name,
  title: album.title,
  slug: album.slug,
  coverImageUrl: album.cover_image_url,
  releaseDate: album.release_date,
  labelName: album.label_name,
  totalTracks: album.total_tracks,
  isActive: Boolean(album.is_active),
  createdAt: album.created_at,
  updatedAt: album.updated_at
});

const toBool = (value, fallback = null) => {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  const normalized = String(value).trim().toLowerCase();
  if (normalized === 'true' || normalized === '1') {
    return true;
  }
  if (normalized === 'false' || normalized === '0') {
    return false;
  }

  return fallback;
};

const ensureUniqueSlug = async (title, existingId = null) => {
  const base = slugify(title) || 'album';
  let slug = base;

  for (let i = 0; i < 20; i += 1) {
    const found = await albumRepository.findBySlug(slug);
    if (!found || Number(found.id) === Number(existingId)) {
      return slug;
    }
    slug = `${base}-${i + 1}`;
  }

  return `${base}-${Date.now()}`;
};

const buildWhere = (queryParams) => {
  const clauses = [];
  const values = [];

  if (queryParams.search) {
    clauses.push('(al.title LIKE ? OR ar.name LIKE ?)');
    const term = `%${String(queryParams.search).trim()}%`;
    values.push(term, term);
  }

  if (queryParams.artistId) {
    clauses.push('al.artist_id = ?');
    values.push(Number(queryParams.artistId));
  }

  const isActive = toBool(queryParams.isActive, null);
  if (isActive !== null) {
    clauses.push('al.is_active = ?');
    values.push(isActive ? 1 : 0);
  }

  return {
    whereClause: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
    values
  };
};

const ensureArtist = async (artistId) => {
  const exists = await albumRepository.existsArtist(artistId);
  if (!exists) {
    throw new AppError('Artist not found', httpStatus.BAD_REQUEST);
  }
};

const listAlbums = async (queryParams) => {
  const page = Math.max(Number(queryParams.page) || 1, 1);
  const limit = Math.min(Math.max(Number(queryParams.limit) || 20, 1), 100);
  const offset = (page - 1) * limit;

  const { whereClause, values } = buildWhere(queryParams);

  const [items, total] = await Promise.all([
    albumRepository.list({ whereClause, values, limit, offset }),
    albumRepository.count({ whereClause, values })
  ]);

  return {
    items: items.map(mapAlbum),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1)
    }
  };
};

const getAlbumById = async (albumId) => {
  const album = await albumRepository.findById(albumId);
  if (!album) {
    throw new AppError('Album not found', httpStatus.NOT_FOUND);
  }

  return mapAlbum(album);
};

const createAlbum = async (payload) => {
  await ensureArtist(Number(payload.artistId));

  const albumId = await albumRepository.create({
    artistId: Number(payload.artistId),
    title: payload.title.trim(),
    slug: await ensureUniqueSlug(payload.title),
    coverImageUrl: payload.coverImageUrl || null,
    releaseDate: payload.releaseDate || null,
    labelName: payload.labelName || null,
    totalTracks: payload.totalTracks ? Number(payload.totalTracks) : 0,
    isActive: toBool(payload.isActive, true) ? 1 : 0
  });

  return getAlbumById(albumId);
};

const updateAlbum = async (albumId, payload) => {
  const existing = await albumRepository.findById(albumId);
  if (!existing) {
    throw new AppError('Album not found', httpStatus.NOT_FOUND);
  }

  if (payload.artistId !== undefined) {
    await ensureArtist(Number(payload.artistId));
  }

  const fields = {};

  if (payload.artistId !== undefined) fields.artist_id = Number(payload.artistId);
  if (payload.title !== undefined) {
    fields.title = payload.title.trim();
    fields.slug = await ensureUniqueSlug(payload.title, albumId);
  }
  if (payload.coverImageUrl !== undefined) fields.cover_image_url = payload.coverImageUrl || null;
  if (payload.releaseDate !== undefined) fields.release_date = payload.releaseDate || null;
  if (payload.labelName !== undefined) fields.label_name = payload.labelName || null;
  if (payload.totalTracks !== undefined) fields.total_tracks = Number(payload.totalTracks) || 0;
  if (payload.isActive !== undefined) fields.is_active = toBool(payload.isActive, true) ? 1 : 0;

  await albumRepository.update(albumId, fields);
  return getAlbumById(albumId);
};

const deleteAlbum = async (albumId) => {
  const existing = await albumRepository.findById(albumId);
  if (!existing) {
    throw new AppError('Album not found', httpStatus.NOT_FOUND);
  }

  await albumRepository.setActiveStatus(albumId, 0);
};

module.exports = {
  listAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum
};
