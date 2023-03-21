import { createError } from 'h3';

export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig();

  if (!config.apiBaseUrl && !config.apiKey) {
    throw new Error('Missing `runtimeConfig.apiBaseUrl and/or runtimeConfig.apiKey` configuration.');
  }

  let { url } = event.req;
  url = url.substring(9, url.length);

  let movies = [];

  let req = config.apiBaseUrl + url;
  if(!url.includes('?')) {
    req = req.concat('?');
  }else {
    req = req.concat('&');
  }
  req = req.concat('api_key=' + config.apiKey + '&language=fr-FR');

  try {
    const response = await $fetch(req);

    response.results.forEach(movie => {
      movies.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path
      });
    });


  } catch (error) {
    return createError({
      statusCode: error.response.status,
      statusMessage: error.message,
      data: error.data,
    });
  }

  return movies;
});
