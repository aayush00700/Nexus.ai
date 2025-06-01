const fetch = require('node-fetch');

(async () => {
  try {
    const response = await fetch('http://localhost:5000/api/metadata');
    const data = await response.json();  // or .json() if JSON
    console.log("Metadata content:", data);
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }
})();
