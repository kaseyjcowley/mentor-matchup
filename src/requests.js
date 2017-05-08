const axios = require('axios');
const urls = require('./urls');

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

/**
 * Request an access token from GitHub.
 * @param {String} code - code from GitHub authorization url.
 * @return {Promise}
 */
function getAccessToken(code) {
  const config = {headers: {'Accept': 'application/json'}};

  return axios.post(
    urls.GITHUB_ACCESS_TOKEN,
    {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    },
    config
  ).then(({data: {access_token}}) => access_token);
}

module.exports = {
  getAccessToken
};