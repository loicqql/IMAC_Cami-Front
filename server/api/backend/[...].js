import { createError } from 'h3';

export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig();

  if (!config.backendBaseUrl) {
    throw new Error('Missing `runtimeConfig.backendBaseUrl` configuration.');
  }

  let { url } = event.req;
  url = url.substring(12, url.length);

  let response;

  try {
    response = await $fetch(config.backendBaseUrl + url);
  } catch (error) {
    return createError({
      statusCode: error.response.status,
      statusMessage: error.message,
      data: error.data,
    });
  }

  return response.movies;

});
