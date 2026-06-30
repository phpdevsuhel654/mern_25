export const validateAlbumForm = (form) => {
  const errors = {};

  // Title validation
  if (!form.title || form.title.trim().length === 0) {
    errors.title = 'Album title is required';
  } else if (form.title.trim().length < 1) {
    errors.title = 'Album title must be at least 1 character';
  } else if (form.title.trim().length > 200) {
    errors.title = 'Album title must not exceed 200 characters';
  }

  // Slug validation
  if (!form.slug || form.slug.trim().length === 0) {
    errors.slug = 'Slug is required';
  } else if (form.slug.trim().length > 200) {
    errors.slug = 'Slug must not exceed 200 characters';
  }

  // Artist ID validation
  if (!form.artistId || form.artistId <= 0) {
    errors.artistId = 'Artist is required';
  }

  // Release date validation
  if (form.releaseDate && form.releaseDate.trim().length > 0) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.releaseDate)) {
      errors.releaseDate = 'Release date must be in YYYY-MM-DD format';
    }
  }

  // Label name validation
  if (form.labelName && form.labelName.trim().length > 150) {
    errors.labelName = 'Label name must not exceed 150 characters';
  }

  // Total tracks validation
  if (form.totalTracks && (isNaN(form.totalTracks) || form.totalTracks < 0)) {
    errors.totalTracks = 'Total tracks must be a positive number';
  }

  // Cover image URL validation
  if (form.coverImageUrl && form.coverImageUrl.trim().length > 0) {
    if (form.coverImageUrl.length > 500) {
      errors.coverImageUrl = 'Cover image URL must not exceed 500 characters';
    }
  }

  return errors;
};
