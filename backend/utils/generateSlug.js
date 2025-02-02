const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};

module.exports = generateSlug;
