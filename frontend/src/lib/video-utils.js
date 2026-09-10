// Utility to format and convert video URLs into embeddable players
export function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  // Check if it's a YouTube URL
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0&modestbranding=1`;
  }

  // If it's already an embed URL, return as is
  if (url.includes("youtube.com/embed") || url.includes("player.vimeo.com")) {
    return url;
  }

  // Return direct URL or null
  return url;
}

export function formatVideoPrice(isPaid, price) {
  if (!isPaid) return "Free";
  if (!price || price === "Free") return "₹299";
  return price.startsWith("₹") ? price : `₹${price}`;
}
