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
    const creatureTypeFilter = document.getElementById('creatureTypeFilter');
    const colorFilter = document.getElementById('colorFilter');
    const setFilter = document.getElementById('setFilter');
    const tagFilter = document.getElementById('tagFilter');
	const colorMatchingScheme = document.getElementById('colorMatching');
	
    
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
    const selectedCreatureType = creatureTypeFilter.value;
    const selectedSet = setFilter.value;
    const selectedTag = tagFilter.value;
    const selectedRarities = Array.from(rarityCheckboxes).map(cb => cb.value);
    const selectedColors = Array.from(colorCheckboxes).map(cb => cb.value);
    const selectedColorScheme = colorMatchingScheme.value;
    
    // Filter the card data based on the search query and filters
    const searchResults = cardData.filter(card =>
        (selectedType === 'all' || card.type.toLowerCase().includes(selectedType.toLowerCase())) &&
        (selectedCreatureType === 'all' || card.type.toLowerCase().includes(selectedCreatureType.toLowerCase())) &&
        (selectedSet === 'all' || card.set.toLowerCase().includes(selectedSet.toLowerCase())) &&
        (selectedTag === 'all' || card.tag.toLowerCase().includes(selectedTag.toLowerCase())) &&
        (selectedRarities.length === 0 || selectedRarities.includes(card.rarity.toLowerCase())) &&
		(if (selectedColorScheme === "partial") {
			selectedColors.length === 0 || selectedColors.some(color => card.color.toLowerCase().includes(color.toLowerCase()))
		}
		if (selectedColorScheme === "exact") {
			selectedColors.length === 0 || selectedColors.every(color => card.color.toLowerCase().includes(color.toLowerCase()))
		}) &&
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

		const resultCountParagraph = document.createElement('p');
		resultCountParagraph.textContent = `Found ${searchResults.length} card${searchResults.length !== 1 ? 's' : ''}`;
		resultCountParagraph.style.width = '100%';
		resultCountParagraph.style.textAlign = 'center';
		resultCountParagraph.style.marginBottom = '20px';
		resultCountParagraph.style.fontSize = '18px';
		cardResultsDiv.appendChild(resultCountParagraph);

		// Then, in your forEach loop:
		searchResults.forEach(card => {
			const cardContainer = document.createElement('div');
			cardContainer.style.margin = '10px 0';
			cardContainer.style.padding = '10px';
			cardContainer.style.border = '1px solid #ccc';
			cardContainer.style.borderRadius = '5px';
			cardContainer.style.boxSizing = 'border-box';			
			
			const cardElement = document.createElement('div');
			cardElement.style.display = 'flex';
			cardElement.style.alignItems = 'flex-start';
			cardElement.style.justifyContent = 'space-between'; // Spread content to edges
			cardElement.style.width = '100%'; // Ensure full width
			cardElement.style.margin = '10px 0'; // Vertical margin only
			cardElement.style.padding = '10px';
			//cardElement.style.border = '1px solid #ccc';
			//cardElement.style.borderRadius = '5px';
			cardElement.style.boxSizing = 'border-box'; // Include padding in width calculation
			
			const cardInfo = document.createElement('div');
			cardInfo.style.display = 'flex';
			cardInfo.style.flexDirection = 'column';
			cardInfo.style.flexGrow = '1'; 
			cardInfo.style.alignSelf = 'flex-start';
			
			const cardTitle = document.createElement('p');
			cardTitle.textContent = `${card.name}`;
			cardTitle.style.margin = '0';
			cardTitle.style.fontSize = '18px';
			cardTitle.style.fontWeight = 'bold';
			cardInfo.appendChild(cardTitle);
			
			const cardEffect = document.createElement('p');
			const effectText = `${card.effect}`;
			const effectLines = effectText.split(';');
			effectLines.forEach((line, index) => {
				const lineElement = document.createElement('p');
				lineElement.textContent = line.trim();
				lineElement.style.margin = '0';
				lineElement.style.fontSize = '16px';
				cardEffect.appendChild(lineElement);
			});
			cardEffect.style.margin = '5px 0 0 0';
			cardEffect.style.fontSize = '14px';
			cardInfo.appendChild(cardEffect);
			
			const hrLine = document.createElement('hr');
			const cardAmount = document.createElement('p');
			cardAmount.textContent = `Amount: ${card.amount}`;
			cardAmount.style.margin = '0';
			cardAmount.style.fontSize = '16px';
			if (card.name2.length == 0) {
				cardInfo.appendChild(hrLine);
				cardInfo.appendChild(cardAmount);
			}

			// You can add more card information here if needed
			cardElement.appendChild(cardInfo);

			const imgElement = document.createElement('img');
			imgElement.src = `images/cards/${card.name}.jpg`;
			imgElement.alt = card.name;
			imgElement.style.maxWidth = '60%';
			imgElement.style.height = 'auto';
			imgElement.style.marginLeft = '10px'; // Add some space between text and image
			imgElement.style.alignSelf = 'flex-start';
			cardElement.appendChild(imgElement);
			
			cardContainer.appendChild(cardElement);
			cardResultsDiv.appendChild(cardContainer);

			if (card.name2.length > 0) {
				//const hrLine2 = document.createElement('hr');
				//cardContainer.appendChild(hrLine2);
				
				const cardElement2 = document.createElement('div');
				cardElement2.style.display = 'flex';
				cardElement2.style.alignItems = 'flex-start';
				cardElement2.style.justifyContent = 'space-between'; // Spread content to edges
				cardElement2.style.width = '100%'; // Ensure full width
				cardElement2.style.margin = '10px 0'; // Vertical margin only
				cardElement2.style.padding = '10px';
				//cardElement2.style.border = '1px solid #ccc';
				//cardElement2.style.borderRadius = '5px';
				cardElement2.style.boxSizing = 'border-box'; // Include padding in width calculation
				
				const cardInfo2 = document.createElement('div');
				cardInfo2.style.display = 'flex';
				cardInfo2.style.flexDirection = 'column';
				cardInfo2.style.flexGrow = '1'; 
				cardInfo2.style.alignSelf = 'flex-start';

				const cardTitle2 = document.createElement('p');
				cardTitle2.textContent = `${card.name2}`;
				cardTitle2.style.margin = '0';
				cardTitle2.style.fontSize = '18px';
				cardTitle2.style.fontWeight = 'bold';
				cardInfo2.appendChild(cardTitle2);
				
				const cardEffect2 = document.createElement('p');
				const effectText2 = `${card.effect2}`;
				const effectLines2 = effectText2.split(';');
				effectLines2.forEach((line, index) => {
					const lineElement = document.createElement('p');
					lineElement.textContent = line.trim();
					lineElement.style.margin = '0';
					lineElement.style.fontSize = '16px';
					cardEffect2.appendChild(lineElement);
				});
				cardEffect2.style.margin = '5px 0 0 0';
				cardEffect2.style.fontSize = '14px';
				cardInfo2.appendChild(cardEffect2);
				cardElement2.appendChild(cardInfo2);


				cardInfo2.appendChild(hrLine);
				cardInfo2.appendChild(cardAmount);
				
				const imgElement2 = document.createElement('img');
				imgElement2.src = `images/cards/${card.name} backside.jpg`;
				imgElement2.alt = card.name;
				imgElement2.style.maxWidth = '60%';
				imgElement2.style.height = 'auto';
				imgElement2.style.marginLeft = '10px'; // Add some space between text and image
				imgElement2.style.alignSelf = 'flex-start';
				cardElement2.appendChild(imgElement2);
				
				cardContainer.appendChild(cardElement2);
				cardResultsDiv.appendChild(cardContainer);				
			}

		});
    } else {
        cardResultsDiv.style.display = 'none';
    }
}

