#!/usr/bin/env node

const http = require('http');
const util = require('util');
const cheerio = require('cheerio');
const insertBreaks = require('./insertBreaks');

const imdbUrlTemplate = 'http://www.imdb.com/find?ref_=nv_sr_fn&q=%s&s=all';

const searchTerm = process.argv.slice(2).join(' ').toLowerCase().trim()
  // consider using a url encoder: https://www.npmjs.com/package/urlencode
  .replace(/[^\w\s\d]/g, '') // Remove any special characters
  .replace(/\s+/g, '+'); // convert spaces to '+' as imdb's search does

const searchUrl = util.format(imdbUrlTemplate, searchTerm);

http.request(searchUrl, (response) => {
  let body = '';

  // another chunk of data has been recieved, so append it to `str`
  response.on('data', (chunk) => {
    body += chunk;
  });


  // the whole response has been recieved, so we just print it out here
  response.on('end', () => {
    const $ = cheerio.load(body);
    let outputText = '';
    $('.findList').each((i, elem) => {
      if ($('h3', $(elem).parent()).text() === 'Titles') {
        outputText += $('.result_text', elem).text();
        return false;
      }
      return true;
    });
    $('.result_text').children('small').each((ind, elem) => {
      outputText = outputText.replace($(elem).text(), '');
    });
    console.log(insertBreaks(outputText).trim());
  });
}).end();
