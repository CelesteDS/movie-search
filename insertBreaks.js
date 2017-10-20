/**
* Inserts line breaks between each film in the string and removes any alternate titles
* @param {string} movieTitlesString - a string of movie titles to parse
* @returns {string}
*/
const insertBreaks = (movieTitlesString) => {
  const betweenEach = /\)\s+([^(\s])/g;
  const removeAkas = /aka ".+"\s*/g;
  return movieTitlesString.replace(betweenEach, ')\n$1').replace(removeAkas, '');
};

module.exports = insertBreaks;
