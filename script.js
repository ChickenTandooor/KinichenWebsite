// Fetch JSON data
async function fetchCharacterData() {
    try {
        const response = await fetch('characterData.json');
        if (!response.ok) throw new Error('Failed to load character data.');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Render media (event pictures, normal pictures, and GIFs)
function renderMedia(containerId, mediaArray, mediaType) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous content
    if (mediaArray.length === 0) {
        container.innerHTML = `<p>No ${mediaType} available.</p>`;
        return;
    }
    mediaArray.forEach((url) => {
        const mediaElement = document.createElement("img");
        mediaElement.src = url;
        mediaElement.alt = `${mediaType}`;
        mediaElement.className = "media";
        container.appendChild(mediaElement);
    });
}

// Handle search
async function handleSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const characterData = await fetchCharacterData();

    const character = characterData.find(
        (char) =>
            char.id.toString() === searchInput || char.name.toLowerCase() === searchInput
    );

    if (!character) {
        alert('Character not found!');
        document.getElementById('characterGallery').style.display = "none"; // Hide character gallery
        return;
    }

    // Show character gallery section after a valid search
    document.getElementById('characterGallery').style.display = "block";

    // Render each media type
    renderMedia('eventPictures', character.events, 'Event Pictures');
    renderMedia('normalPictures', character.normalPictures, 'Normal Pictures');
    renderMedia('gifEvents', character.gifEvents, 'GIF Events');
}

// Attach event listener
document.getElementById('searchButton').addEventListener('click', handleSearch);
