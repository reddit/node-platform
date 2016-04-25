export const extractQuery = str => {
  const [temp, rest] = str.split('?');
  if (!(rest && rest.length)) return {};
  const [query, hash] = rest.split('#');

  return query.split('&').reduce((prev, cur) => {
    const [key, value] = cur.split('=');

    return {
      ...prev,
      [key]: value,
    };
  }, {});
};

export const createQuery = dict => {
  return '?' + Object.keys(dict).map(k => `${k}=${dict[k]}`).join('&');
}
