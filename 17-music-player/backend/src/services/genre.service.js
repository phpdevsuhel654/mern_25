'use strict';

const AppError = require('../utils/AppError');
const httpStatus = require('../constants/httpStatus');
const slugify = require('../utils/slugify');
const genreRepository = require('../repositories/genre.repository');

const mapGenre = (genre) => ({
  id: genre.id,
  name: genre.name,
  slug: genre.slug,
  description: genre.description,
  isActive: Boolean(genre.is_active),
  createdAt: genre.created_at,
  updatedAt: genre.updated_at
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
  const base = slugify(name) || 'genre';
  let slug = base;

  for (let i = 0; i < 20; i += 1) {
    const found = await genreRepository.findBySlug(slug);
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
    clauses.push('(name LIKE ? OR COALESCE(description, "") LIKE ?)');
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

const listGenres = async (queryParams) => {
  const page = Math.max(Number(queryParams.page) || 1, 1);
  const limit = Math.min(Math.max(Number(queryParams.limit) || 20, 1), 100);
  const offset = (page - 1) * limit;

  const { whereClause, values } = buildWhere(queryParams);

  const [items, total] = await Promise.all([
    genreRepository.list({ whereClause, values, limit, offset }),
    genreRepository.count({ whereClause, values })
  ]);

  return {
    items: items.map(mapGenre),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1)
    }
  };
};

const getGenreById = async (genreId) => {
  const genre = await genreRepository.findById(genreId);
  if (!genre) {
    throw new AppError('Genre not found', httpStatus.NOT_FOUND);
  }

  return mapGenre(genre);
};

const createGenre = async (payload) => {
  const genreId = await genreRepository.create({
    name: payload.name.trim(),
    slug: await ensureUniqueSlug(payload.name),
    description: payload.description || null,
    isActive: toBool(payload.isActive, true) ? 1 : 0
  });

  return getGenreById(genreId);
};

const updateGenre = async (genreId, payload) => {
  const existing = await genreRepository.findById(genreId);
  if (!existing) {
    throw new AppError('Genre not found', httpStatus.NOT_FOUND);
  }

  const fields = {};
  if (payload.name !== undefined) {
    fields.name = payload.name.trim();
    fields.slug = await ensureUniqueSlug(payload.name, genreId);
  }
  if (payload.description !== undefined) fields.description = payload.description || null;
  if (payload.isActive !== undefined) fields.is_active = toBool(payload.isActive, true) ? 1 : 0;

  await genreRepository.update(genreId, fields);
  return getGenreById(genreId);
};

const deleteGenre = async (genreId) => {
  const existing = await genreRepository.findById(genreId);
  if (!existing) {
    throw new AppError('Genre not found', httpStatus.NOT_FOUND);
  }

  await genreRepository.setActiveStatus(genreId, 0);
};

module.exports = {
  listGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre
};
