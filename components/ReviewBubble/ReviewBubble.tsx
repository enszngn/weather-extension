import { useState, useEffect } from 'react';
import './ReviewBubble.css';

const REVIEW_URL =
  'https://chromewebstore.google.com/detail/weather-in-new-tab/cjcijieggfiljhgddjfnglohiegjlfnd/reviews';
const STORAGE_KEY = 'clicked-review-us';

export function ReviewBubble() {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (typeof browser !== 'undefined' && browser.storage) {
      browser.storage.local.get(STORAGE_KEY).then((res) => {
        // Show only if the user has never clicked it before
        setVisible(!res[STORAGE_KEY]);
      });
    }
  }, []);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await browser.storage.local.set({ [STORAGE_KEY]: true });
    setVisible(false);
    window.open(REVIEW_URL, '_blank');
  };

  if (!visible) return null;

  return (
    <a
      href={REVIEW_URL}
      className="review-bubble"
      aria-label="Review us on the Chrome Web Store"
      onClick={handleClick}
    >
      {/* Star icon */}
      <svg
        className="review-bubble__icon"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <span className="review-bubble__tooltip">Review Us!</span>
    </a>
  );
}
