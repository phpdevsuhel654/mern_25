export const validateArtistForm = (form) => {
  const errors = {};

  // Name validation
  if (!form.name || form.name.trim().length === 0) {
    errors.name = 'Artist name is required';
  } else if (form.name.trim().length < 2) {
    errors.name = 'Artist name must be at least 2 characters';
  } else if (form.name.trim().length > 150) {
    errors.name = 'Artist name must not exceed 150 characters';
  }

  // Slug validation
  if (!form.slug || form.slug.trim().length === 0) {
    errors.slug = 'Slug is required';
  } else if (form.slug.trim().length > 150) {
    errors.slug = 'Slug must not exceed 150 characters';
  }

  // Bio validation
  if (form.bio && form.bio.length > 4000) {
    errors.bio = 'Biography must not exceed 4000 characters';
  }

  // Image URL validation (from server upload)
  if (form.imageUrl && form.imageUrl.trim().length > 0) {
    if (form.imageUrl.length > 500) {
      errors.imageUrl = 'Image URL must not exceed 500 characters';
    }
  }

  // Country validation
  if (form.country && form.country.trim().length > 80) {
    errors.country = 'Country must not exceed 80 characters';
  }

  return errors;
};
