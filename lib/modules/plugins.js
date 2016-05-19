import actions from './actions';

export const dispatchInitialShell = async (ctx, dispatch) => {
  // If user is a bot, or if user has a "nojs" querystring or cookie, do full
  // server-side rendering. Otherwise, use logic to bypass API requests.
  const isBot = (ctx.headers['user-agent'] || '').indexOf('bot') > -1;
  const hasNoJsCookie = !!ctx.cookies.get('nojs');
  const hasNoJsQuerystring = !!ctx.query.nojs;

  // Use should get a shell if not a bot and has not asked for the no-js version
  // via querystring or cookie.
  const useShell = !(isBot || hasNoJsCookie || hasNoJsQuerystring);

  // If the user is a bot or has the querystring, but doesn't have a cookie, set
  // a cookie for next time for 30 days.
  if (!useShell && !hasNoJsCookie) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);

    ctx.cookies.set('shell', 'false', {
      expires,
    });
  }

  dispatch(actions.setShell(useShell));
};
