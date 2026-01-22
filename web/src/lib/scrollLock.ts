type ScrollLockState = {
  count: number;
  scrollY: number;
  bodyStyles: {
    overflow: string;
    position: string;
    top: string;
    width: string;
    paddingRight: string;
  };
  htmlOverflow: string;
};

let scrollLockState: ScrollLockState | null = null;

const getState = (): ScrollLockState => {
  if (!scrollLockState) {
    scrollLockState = {
      count: 0,
      scrollY: 0,
      bodyStyles: {
        overflow: '',
        position: '',
        top: '',
        width: '',
        paddingRight: '',
      },
      htmlOverflow: '',
    };
  }
  return scrollLockState;
};

export const lockBodyScroll = (): (() => void) => {
  if (typeof document === 'undefined') return () => {};

  const state = getState();
  const body = document.body;
  const html = document.documentElement;

  if (state.count === 0) {
    state.scrollY = window.scrollY || window.pageYOffset || 0;
    state.bodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };
    state.htmlOverflow = html.style.overflow;

    const scrollbarWidth = window.innerWidth - html.clientWidth;
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    html.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${state.scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    body.dataset.scrollLock = 'true';
  }

  state.count += 1;

  return () => {
    unlockBodyScroll();
  };
};

export const unlockBodyScroll = (): void => {
  if (typeof document === 'undefined') return;

  const state = getState();
  if (state.count === 0) return;

  state.count -= 1;
  if (state.count > 0) return;

  const body = document.body;
  const html = document.documentElement;

  body.style.overflow = state.bodyStyles.overflow;
  body.style.position = state.bodyStyles.position;
  body.style.top = state.bodyStyles.top;
  body.style.width = state.bodyStyles.width;
  body.style.paddingRight = state.bodyStyles.paddingRight;
  html.style.overflow = state.htmlOverflow;

  delete body.dataset.scrollLock;
  window.scrollTo(0, state.scrollY);
};

export const forceUnlockBodyScroll = (): void => {
  if (typeof document === 'undefined') return;

  const body = document.body;
  const html = document.documentElement;
  const hasLock =
    body.dataset.scrollLock === 'true' ||
    body.style.position === 'fixed' ||
    body.style.overflow === 'hidden' ||
    html.style.overflow === 'hidden';

  if (!hasLock) return;

  const state = getState();
  state.count = 0;

  body.style.overflow = state.bodyStyles.overflow || '';
  body.style.position = state.bodyStyles.position || '';
  body.style.top = state.bodyStyles.top || '';
  body.style.width = state.bodyStyles.width || '';
  body.style.paddingRight = state.bodyStyles.paddingRight || '';
  html.style.overflow = state.htmlOverflow || '';

  delete body.dataset.scrollLock;
  if (state.scrollY) window.scrollTo(0, state.scrollY);
};
