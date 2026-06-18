export default defineContentScript({
  matches: ['*://weather-insights.eneszengin542.workers.dev/*'],
  allFrames: true,
  runAt: 'document_idle',
  main() {
    const removeSearchCity = (): boolean => {
      const el = document
        .querySelector('input[placeholder="SEARCH CITY..."]')
        ?.closest('.select-none');

      if (el) {
        (el as HTMLElement).remove();
        return true;
      }
      return false;
    };

    // Try immediately — works if DOM is ready
    if (removeSearchCity()) return;

    // Fallback: wait for the element if the page is client-side rendered
    const observer = new MutationObserver(() => {
      if (removeSearchCity()) observer.disconnect();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  },
});
