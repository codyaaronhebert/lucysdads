const DEFAULT_LAT = 40.7128; // Fallback: New York
const DEFAULT_LONG = -74.006;

// Function to update Google Maps with IP-based coordinates
async function updateMapWithIPLocation() {
  try {
    // Step 1: Fetch IP-based location
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    // Step 2: Validate coordinates
    if (data.latitude && data.longitude) {
      console.log("IP Location:", data.latitude, data.longitude);
      updateMapIframe(data.latitude, data.longitude);
    } else {
      throw new Error("Invalid IP geolocation data");
    }
  } catch (error) {
    console.error("IP geolocation failed:", error);
    // Step 3: Fallback to defaults
    updateMapIframe(DEFAULT_LAT, DEFAULT_LONG);
  }
}

// Helper function to update the Google Maps iframe
function updateMapIframe(latitude, longitude) {
  const iframe = document.getElementById("google-maps-iframe");
  if (!iframe) {
    console.error("Error: Google Maps iframe not found!");
    return;
  }
  // Update iframe src with new coordinates
  iframe.src = `https://www.google.com/maps/embed/v1/view?key=AIzaSyDqkXNjFwqJ-f-Mj059FdEElO4VsIhvRdI&center=${latitude},${longitude}&zoom=14`;
}

// Start the process
updateMapWithIPLocation();
