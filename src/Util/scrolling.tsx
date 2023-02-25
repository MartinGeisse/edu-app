export function scrollToTop() {
    window.scrollTo(0, 0);
}

export function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

export function scrollToBottomDelayed(delay = 10) {
    setTimeout(scrollToBottom, delay);
}

