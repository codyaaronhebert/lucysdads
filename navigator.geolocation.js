const DEFAULT_LAT = 40.7128; // Fallback: New York
const DEFAULT_LONG = -74.006;

// 1. Function to update Google Maps iframe
function updateMapIframe(latitude, longitude) {
  const iframe = document.getElementById("google-maps-iframe");
  if (!iframe) {
    console.error("Error: Google Maps iframe not found!");
    return;
  }
  iframe.src = `https://www.google.com/maps/embed/v1/place?key=GOOGLE_API_KEY&q=${latitude},${longitude}&zoom=20`;
}

// 2. Fetch IP-based location (fallback)
async function getIPLocation() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    console.log("IP Location:", data.latitude, data.longitude);
    updateMapIframe(data.latitude, data.longitude);
  } catch (error) {
    console.error("IP geolocation failed:", error);
    updateMapIframe(DEFAULT_LAT, DEFAULT_LONG); // Ultimate fallback
  }
}

// 3. Try browser geolocation first, fall back to IP
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("Browser location:", position.coords);
      updateMapIframe(position.coords.latitude, position.coords.longitude);
    },
    async (error) => {
      console.error("Geolocation error:", error.message);
      await getIPLocation(); // Fallback to IP
    },
    { timeout: 5000 }, // Optional: Timeout after 5 seconds
  );
} else {
  console.error("Geolocation not supported.");
  getIPLocation(); // Fallback to IP
}
