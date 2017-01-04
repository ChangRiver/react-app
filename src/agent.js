import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = res => res.body;

let token = null;
const tokenplugin = req => {
  if(token) {
    req.set('authorization', `Token ${token}`);
  }
};

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}/${url}`).use(tokenplugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}/${url}`, body).use(tokenplugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}/${url}`, body).use(tokenplugin).then(responseBody),
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenplugin).then(responseBody)
 };

const Articles = {
  all: page =>
    requests.get(`/articles?limit=10`),
  get: slug =>
    requests.get(`/articles/${slug}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encodeURIComponent(author)}&limit=5`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encodeURIComponent(author)}&limit=5`),
  feed: () =>
    requests.get('/articles/feed?limit=10'),
  byTag: (tag, page) => 
    requests.get(`/articles?tag=${encodeURIComponent(tag)}&limit=10`)
};

const Tags = {
  getAll: () => requests.get('/tags')
};

const Profile = {
  follow: username => 
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

const Comments = {
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`),
  create: (slug, comment) => 
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  setToken: _token => { token = _token; }
};


