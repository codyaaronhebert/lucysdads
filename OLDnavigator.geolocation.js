if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      updateMapIframe(latitude, longitude);
    },
    (error) => {
      console.error("Error getting location:", error);
      // Fallback to a default location if permission is denied
      updateMapIframe(DEFAULT_LAT, DEFAULT_LONG);
    },
  );
} else {
  console.error("Geolocation is not supported by this browser.");
  // Fallback to default location
  updateMapIframe(DEFAULT_LAT, DEFAULT_LONG);
}
// Add to navigator.geolocation.js
const DEFAULT_LAT = 40.7128; // Example: New York City
const DEFAULT_LONG = -74.006;
function updateMapIframe(latitude, longitude) {
  const iframe = document.getElementById("google-maps-iframe");
  const zoomLevel = 14; // Adjust zoom as needed
  const iframeSrc = `https://www.google.com/maps/embed/v1/view?key=GOOGLE_API_KEY&center=${latitude},${longitude}&zoom=${zoomLevel}`;

  iframe.src = iframeSrc;
}
