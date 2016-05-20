import { isEqual } from 'lodash/lang';

export default function shouldGoBack(urlHistory, currentIndex, url, queryParams) {
  const existsHistoryAPI = (typeof history !== 'undefined') && history.back && history.state;
  const existsUrlHistory = urlHistory && urlHistory.length > 1 && urlHistory.length > currentIndex;

  if (existsHistoryAPI && existsUrlHistory) {
    const prevHist = urlHistory[currentIndex - 1];

    if (isEqual(prevHist.url, url) && isEqual(prevHist.queryParams, queryParams)) {
      return true;
    }
  }

  return false;
}
