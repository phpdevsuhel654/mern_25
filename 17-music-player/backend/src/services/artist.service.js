'use strict';

const AppError = require('../utils/AppError');
const httpStatus = require('../constants/httpStatus');
const slugify = require('../utils/slugify');
const artistRepository = require('../repositories/artist.repository');

const mapArtist = (artist) => ({
  id: artist.id,
  name: artist.name,
  slug: artist.slug,
  bio: artist.bio,
  imageUrl: artist.image_url,
  country: artist.country,
  isActive: Boolean(artist.is_active),
  createdAt: artist.created_at,
  updatedAt: artist.updated_at
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

const ensureUniqueSlug = async (name, existingId = null) => {
  const base = slugify(name) || 'artist';
  let slug = base;

  for (let i = 0; i < 20; i += 1) {
    const found = await artistRepository.findBySlug(slug);
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
    clauses.push('(name LIKE ? OR COALESCE(country, "") LIKE ?)');
    const term = `%${String(queryParams.search).trim()}%`;
    values.push(term, term);
  }

  const isActive = toBool(queryParams.isActive, null);
  if (isActive !== null) {
    clauses.push('is_active = ?');
    values.push(isActive ? 1 : 0);
  }

  return {
    whereClause: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
    values
  };
};

const listArtists = async (queryParams) => {
  const page = Math.max(Number(queryParams.page) || 1, 1);
  const limit = Math.min(Math.max(Number(queryParams.limit) || 20, 1), 100);
  const offset = (page - 1) * limit;
  const sortBy = queryParams.sortBy || 'created_at';
  const sortOrder = queryParams.sortOrder || 'DESC';

  const { whereClause, values } = buildWhere(queryParams);

  const [items, total] = await Promise.all([
    artistRepository.list({ whereClause, values, limit, offset, sortBy, sortOrder }),
    artistRepository.count({ whereClause, values })
  ]);

  return {
    items: items.map(mapArtist),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1)
    }
  };
};

const getArtistById = async (artistId) => {
  const artist = await artistRepository.findById(artistId);
  if (!artist) {
    throw new AppError('Artist not found', httpStatus.NOT_FOUND);
  }

  return mapArtist(artist);
};

const createArtist = async (payload) => {
  const artistId = await artistRepository.create({
    name: payload.name.trim(),
    slug: await ensureUniqueSlug(payload.name),
    bio: payload.bio || null,
    imageUrl: payload.imageUrl || null,
    country: payload.country || null,
    isActive: toBool(payload.isActive, true) ? 1 : 0
  });

  return getArtistById(artistId);
};

const updateArtist = async (artistId, payload) => {
  const existing = await artistRepository.findById(artistId);
  if (!existing) {
    throw new AppError('Artist not found', httpStatus.NOT_FOUND);
  }

  const fields = {};

  if (payload.name !== undefined) {
    fields.name = payload.name.trim();
    fields.slug = await ensureUniqueSlug(payload.name, artistId);
  }
  if (payload.bio !== undefined) fields.bio = payload.bio || null;
  if (payload.imageUrl !== undefined) fields.image_url = payload.imageUrl || null;
  if (payload.country !== undefined) fields.country = payload.country || null;
  if (payload.isActive !== undefined) fields.is_active = toBool(payload.isActive, true) ? 1 : 0;

  await artistRepository.update(artistId, fields);
  return getArtistById(artistId);
};

const deleteArtist = async (artistId) => {
  const existing = await artistRepository.findById(artistId);
  if (!existing) {
    throw new AppError('Artist not found', httpStatus.NOT_FOUND);
  }

  await artistRepository.setActiveStatus(artistId, 0);
};

module.exports = {
  listArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist
};
