import { isEqual } from 'lodash/lang';

export default function shouldGoBack(urlHistory, url, queryParams) {
  const existsHistoryAPI = (typeof history !== 'undefined') && history.back && history.state;
  const existsUrlHistory = urlHistory && urlHistory.length > 1;

  if (existsHistoryAPI && existsUrlHistory) {
    const prevHist = urlHistory[urlHistory.length - 2];

    if (isEqual(prevHist.url, url) && isEqual(prevHist.queryParams, queryParams)) {
      return true;
    }
  }

  return false;
}
