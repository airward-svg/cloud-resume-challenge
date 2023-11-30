const apiGatewayUrl =
  "https://4zla3hu6mj.execute-api.us-east-1.amazonaws.com/prod";
const endpoint = `${apiGatewayUrl}/updateViewCount`;

async function updateCounter() {
  try {
    let response = await fetch(endpoint);
    let data = await response.text();
    viewsBadge.innerHTML = `Views: ${data}`;
  } catch (error) {
    console.error("Error fetching views:", error);
    viewsBadge.innerHTML = "Views: Error";
  }
}

// Update the counter on page load
updateCounter();