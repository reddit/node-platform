import merge from './modules/merge';

export const extractQuery = str => {
  const [temp, rest] = str.split('?');
  if (!(rest && rest.length)) return {};

  // discard the hash
  const [query] = rest.split('#');

  return query.split('&').reduce((prev, cur) => {
    const [key, value] = cur.split('=');

    return {
      ...prev,
      [key]: value,
    };
  }, {});
};

export const createQuery = dict => {
  const qs = Object.keys(dict)
              .filter(k => typeof dict[k] !== 'undefined')
              .map(k => `${k}=${dict[k]}`)
              .join('&');

  return `?${qs}`;
};

export const createHash = str => {
  return `#${str}`;
};

export const urlFromPage = (page, mergePage) => {
  const { queryParams, hashParams, url } = mergePage ? merge(page, mergePage) : page;
  const queryString = Object.keys(queryParams).length ? `${createQuery(queryParams)}` : '';
  const hashString = Object.keys(hashParams).length ? `${createHash(hashParams)}` : '';
  return `${url}${queryString}${hashString}`;
};
