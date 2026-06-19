export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  browser.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === 'install') {
      const installTime = Math.floor(Date.now() / 1000);
      
      // Generate a random 8-12 digit ID
      const length = Math.floor(Math.random() * 5) + 8; // 8 to 12 digits
      let installId = '';
      for (let i = 0; i < length; i++) {
        if (i === 0) {
          installId += Math.floor(Math.random() * 9 + 1).toString(); // non-zero first digit
        } else {
          installId += Math.floor(Math.random() * 10).toString();
        }
      }

      await browser.storage.local.set({
        'install-time': installTime,
        'install-id': installId,
      });
      
      console.log('Storage initialized on install:', { installTime, installId });
    }
  });
});

