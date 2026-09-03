/* URL-safe slug used for /mission/:slug and project anchors.
   Kept deliberately dumb — names here are hand-written, not user input. */
function slugify(str = '') {
  return String(str)
    .toLowerCase()
    .replace(/['’.]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

module.exports = slugify;
