
module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("src/assets/css");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/assets/img"); 
    eleventyConfig.addPassthroughCopy("src/assets/fonts"); 
    eleventyConfig.addPassthroughCopy("src/blog/img");
    eleventyConfig.addPassthroughCopy("src/realizacje/img");

    eleventyConfig.addWatchTarget("src/assets/sass");

    // Collections blog
    eleventyConfig.addCollection('posts', function(collectionApi) {
      return collectionApi.getFilteredByGlob('src/blog/**/*.md').reverse();
    });

    // Collections portfolio
    eleventyConfig.addCollection('works', function(collectionApi) {
      return collectionApi.getFilteredByGlob('src/realizacje/**/*.md').reverse();
    });

    // Date
    eleventyConfig.addFilter('dateDisplay', require('./src/filters/date-display.js'));
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // Return your Object options:
    return {
      dir: {
        input: "src",
        output: "public",
        includes: "includes"
      }
    }
  };