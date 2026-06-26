'use strict';

const fs = require('fs/promises');
const path = require('path');

const env = require('../config/env');

const uploadsDir = path.resolve(process.cwd(), env.mediaRoot);
const dataFile = path.join(uploadsDir, 'upload-records.json');

const ensureStore = async () => {
  await fs.mkdir(uploadsDir, { recursive: true });

  try {
    await fs.access(dataFile);
  } catch (_error) {
    await fs.writeFile(dataFile, '[]', 'utf8');
  }
};

const readStore = async () => {
  await ensureStore();
  const content = await fs.readFile(dataFile, 'utf8');

  try {
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
};

const writeStore = async (items) => {
  await ensureStore();
  await fs.writeFile(dataFile, JSON.stringify(items, null, 2), 'utf8');
};

const list = async () => {
  const items = await readStore();
  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const create = async (payload) => {
  const items = await readStore();
  const now = new Date().toISOString();
  const item = {
    id: Date.now(),
    fileName: payload.fileName,
    fileType: payload.fileType,
    sizeMb: payload.sizeMb,
    source: payload.source,
    status: payload.status,
    createdAt: now,
    updatedAt: now
  };

  items.unshift(item);
  await writeStore(items);
  return item;
};

const update = async (uploadId, payload) => {
  const items = await readStore();
  let found = null;

  const updated = items.map((item) => {
    if (String(item.id) !== String(uploadId)) {
      return item;
    }

    found = {
      ...item,
      ...payload,
      updatedAt: new Date().toISOString()
    };

    return found;
  });

  await writeStore(updated);
  return found;
};

const remove = async (uploadId) => {
  const items = await readStore();
  const filtered = items.filter((item) => String(item.id) !== String(uploadId));
  await writeStore(filtered);
  return true;
};

module.exports = {
  list,
  create,
  update,
  remove
};
