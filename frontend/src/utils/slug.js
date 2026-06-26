export const generatePropertyUrl = (id, title) => {
  if (!id) return '/';
  const slug = title 
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    : 'property';
  return `/property/${slug}/${id}`;
};
