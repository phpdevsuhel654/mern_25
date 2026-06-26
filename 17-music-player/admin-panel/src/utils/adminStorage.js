const createId = () => `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export const readCollection = (key, seedItems = []) => {
  const storageKey = `music_admin_${key}`;
  const raw = localStorage.getItem(storageKey);

  if (!raw) {
    if (seedItems.length) {
      localStorage.setItem(storageKey, JSON.stringify(seedItems));
    }
    return seedItems;
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seedItems;
  } catch (_error) {
    return seedItems;
  }
};

export const writeCollection = (key, items) => {
  const storageKey = `music_admin_${key}`;
  localStorage.setItem(storageKey, JSON.stringify(items));
};

export const createEntity = (key, payload) => {
  const items = readCollection(key, []);
  const now = new Date().toISOString();
  const item = {
    id: createId(),
    ...payload,
    createdAt: now,
    updatedAt: now
  };

  const nextItems = [item, ...items];
  writeCollection(key, nextItems);
  return item;
};

export const updateEntity = (key, id, payload) => {
  const items = readCollection(key, []);
  const nextItems = items.map((item) => {
    if (String(item.id) !== String(id)) {
      return item;
    }

    return {
      ...item,
      ...payload,
      updatedAt: new Date().toISOString()
    };
  });

  writeCollection(key, nextItems);
  return nextItems.find((item) => String(item.id) === String(id)) || null;
};

export const removeEntity = (key, id) => {
  const items = readCollection(key, []);
  const nextItems = items.filter((item) => String(item.id) !== String(id));
  writeCollection(key, nextItems);
  return true;
};
