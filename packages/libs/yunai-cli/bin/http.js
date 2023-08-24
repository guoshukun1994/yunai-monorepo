const axios = require('axios');

axios.interceptors.response.use((res) => {
    return res.data;
})

async function getRepolist() {
    return axios.get('https://api.github.com/orgs/yunai-cli/repos')
}

module.exports = {
    getRepolist
};