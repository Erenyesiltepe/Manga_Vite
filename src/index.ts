
  fetch(`${import.meta.env.VITE_API_URL}/api/settings/`)
    .then(response => response.json())
    .then(data => {
        const titleElement = document.getElementById('title');
        if (titleElement) {
            titleElement.textContent = data.title;
        } else {
            console.error('Title element not found');
        }
    })
    .catch(error => console.error('Error fetching title:', error));