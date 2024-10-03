// Load the card data from the JSON file
let cardData;
fetch('card_data.json')
  .then(response => response.json())
  .then(data => {
    cardData = data;
  })
  .catch(error => {
    console.error('Error loading card data:', error);
  });

// Function to search the card data and display the results
function searchCards(data) {
    // Get the search input element
    const searchInput = document.getElementById('searchInput');
    
    // Get the filter select elements
    const typeFilter = document.getElementById('typeFilter');
    const colorFilter = document.getElementById('colorFilter');
    
    // Get the rarity checkboxes
    const rarityCheckboxes = document.querySelectorAll('input[name="rarity"]:checked');
	
	// Get the color checkboxes
	const colorCheckboxes = document.querySelectorAll('input[name="color"]:checked');
    
    // Get the card results div
    const cardResultsDiv = document.getElementById('cardResults');

    // Hide the card results initially
    cardResultsDiv.style.display = 'none';

    // Get the search query from the input field
    const searchQuery = searchInput.value.toLowerCase();

    // Get the selected filter values
    const selectedType = typeFilter.value;
    //const selectedColor = colorFilter.value;
    const selectedRarities = Array.from(rarityCheckboxes).map(cb => cb.value);
    const selectedColors = Array.from(colorCheckboxes).map(cb => cb.value);
    
    // Filter the card data based on the search query and filters
    const searchResults = cardData.filter(card =>
        (selectedType === 'all' || card.type.toLowerCase().includes(selectedType.toLowerCase())) &&
        //(selectedColor === 'all' || card.color.toLowerCase().includes(selectedColor.toLowerCase())) &&
        (selectedRarities.length === 0 || selectedRarities.includes(card.rarity.toLowerCase())) &&
        (selectedColors.length === 0 || selectedColors.includes(card.color.toLowerCase())) &&
        (card.name.toLowerCase().includes(searchQuery) ||
        card.rarity.toLowerCase().includes(searchQuery) ||
        card.color.toLowerCase().includes(searchQuery) ||
        card.type.toLowerCase().includes(searchQuery) ||
        card.effect.toLowerCase().includes(searchQuery))
    );

    // Clear the previous search results
    cardResultsDiv.innerHTML = '';

    // Display the search results
    if (searchResults.length > 0) {
        cardResultsDiv.style.display = 'flex';
        cardResultsDiv.style.flexWrap = 'wrap';
        cardResultsDiv.style.justifyContent = 'center';
        cardResultsDiv.style.alignItems = 'center';
        cardResultsDiv.style.padding = '20px';

        searchResults.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.style.margin = '10px';
            cardElement.style.textAlign = 'center';
            const imgElement = document.createElement('img');
            imgElement.src = `images/cards/${card.name}.jpg`;
            imgElement.alt = card.name;
            imgElement.style.maxWidth = '40%';
            imgElement.style.height = 'auto';
            imgElement.style.display = 'inline-block';
            imgElement.style.verticalAlign = 'middle';
            cardElement.appendChild(imgElement);
            cardResultsDiv.appendChild(cardElement);
        });
    } else {
        cardResultsDiv.style.display = 'none';
    }
}

