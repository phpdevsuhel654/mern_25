import {
  createEntity,
  readCollection,
  removeEntity,
  updateEntity,
  writeCollection
} from '../utils/adminStorage';

export const createEntityService = ({ key, seedItems = [] }) => {
  const ensureSeed = () => {
    const currentItems = readCollection(key, []);
    if (!currentItems.length && seedItems.length) {
      writeCollection(key, seedItems);
      return seedItems;
    }
    return currentItems;
  };

  return {
    list: async () => {
      return ensureSeed();
    },
    create: async (payload) => {
      return createEntity(key, payload);
    },
    update: async (id, payload) => {
      return updateEntity(key, id, payload);
    },
    remove: async (id) => {
      return removeEntity(key, id);
    }
  };
};
