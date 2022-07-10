const trapFocus = (el) => {
    const focusableEls = Array.from(
        el.querySelectorAll('button:not([disabled])')
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    el.addEventListener('keydown', (ev) => {
        const isTabPressed = ev.key === 'Tab' || ev.code === '9';
        if (!isTabPressed) {
            return;
        }
        if (ev.shiftKey) {
            if (document.activeElement === firstFocusableEl) {
                /* shift + tab */
                lastFocusableEl.focus();
                ev.preventDefault();
            }
        } else if (document.activeElement === lastFocusableEl) {
            /* tab */
            firstFocusableEl.focus();
            ev.preventDefault();
        }
    });
};

export default trapFocus;
