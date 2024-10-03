// Load the card data from the JSON file
fetch('card_data.json')
  .then(response => response.json())
  .then(data => {
    cardData = data;
    createCustomDropdown(cardData);
  })
  .catch(error => {
    console.error('Error loading card data:', error);
  });
  
	
function checkImageExists(url) {
  return new Promise((resolve) => {
	const img = new Image();
	img.onload = () => resolve(true);
	img.onerror = () => resolve(false);
	img.src = url;
  });
}  

function createCustomDropdown(cardData) {
  // Create the dropdown container
  const dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add('custom-dropdown');
  dropdownContainer.style.position = 'relative';
  dropdownContainer.style.width = '75%';

  // Create the dropdown button
  const dropdownButton = document.createElement('button');
  dropdownButton.classList.add('custom-dropdown-button');
  dropdownButton.style.width = '100%';
  dropdownButton.style.padding = '0px';
  dropdownButton.style.backgroundColor = 'rgba(27, 31, 34, 0.175)'; // Set the background color of the dropdown button to black
  dropdownButton.style.color = 'white'; // Set the text color of the dropdown button to white
  dropdownButton.style.border = 'none';
  dropdownButton.style.cursor = 'pointer';
  dropdownButton.textContent = 'Select a card';

  // Create the dropdown content
  const dropdownContent = document.createElement('div');
  dropdownContent.classList.add('custom-dropdown-content');
  dropdownContent.style.display = 'none';
  dropdownContent.style.position = 'absolute';
  dropdownContent.style.backgroundColor = 'rgba(27, 31, 34, 0.175)';
  dropdownContent.style.color = 'white';
  dropdownContent.style.minWidth = '100%';
  dropdownContent.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
  dropdownContent.style.zIndex = '1';
  dropdownContent.style.maxHeight = '200px'; // Set a maximum height for the dropdown content
  dropdownContent.style.overflowY = 'auto'; // Enable vertical scrolling

  // Create the image container
  const imageContainer = document.createElement('div');
  imageContainer.id = 'hovered-image';
  imageContainer.style.position = 'absolute';
  imageContainer.style.display = 'none';
  imageContainer.style.maxWidth = '200px';
  imageContainer.style.maxHeight = '300px';
  imageContainer.style.zIndex = '9999';
  document.body.appendChild(imageContainer);

  // Populate the dropdown content
  cardData.forEach(item => {
    const option = document.createElement('div');
    option.classList.add('custom-dropdown-option');
    option.style.padding = '1px';
    option.style.cursor = 'pointer';
    option.style.backgroundColor = 'rgba(27, 31, 34, 0.95)';
    option.style.color = 'white';
    option.textContent = item.name;
    option.addEventListener('click', () => {
      dropdownButton.textContent = item.name;
      dropdownButton.style.backgroundColor = 'rgba(27, 31, 34, 0.175)'; // Set the background color of the selected option to black
      dropdownButton.style.color = 'white'; // Set the text color of the selected option to white
      dropdownContent.style.display = 'none';
      // Add any additional functionality here, such as updating the image display
    });
    option.addEventListener('mouseover', (event) => {
		const imagePath = `images/cards/${item.name}.jpg`;

		// Create a flex container for the images
		const flexContainer = document.createElement('div');
		flexContainer.style.display = 'flex';
		flexContainer.style.alignItems = 'center'; // Align items vertically
		flexContainer.style.gap = '10px'; // Add some space between images

		// Add the first image
		const firstImg = document.createElement('img');
		firstImg.src = imagePath;
		firstImg.alt = item.name;
		firstImg.style.maxWidth = '100%';
		firstImg.style.maxHeight = '100%';
		flexContainer.appendChild(firstImg);

		// Set up the image container
		imageContainer.innerHTML = '';
		imageContainer.appendChild(flexContainer);
		imageContainer.style.display = 'block';
		imageContainer.style.position = 'absolute';
		imageContainer.style.top = event.clientY - imageContainer.offsetHeight + 'px';
		imageContainer.style.left = event.clientX + 'px';

		// Check if backside image exists and add it to the right if it does
		checkImageExists(`images/cards/${item.name} backside.jpg`)
		  .then(exists => {
			if (exists) {
			  const backsideImg = document.createElement('img');
			  backsideImg.src = `images/cards/${item.name} backside.jpg`;
			  backsideImg.alt = `${item.name} Backside`;
			  backsideImg.style.maxWidth = '100%';
			  backsideImg.style.maxHeight = '100%';
			  flexContainer.appendChild(backsideImg);
			}
		  });
    });
    option.addEventListener('mouseout', () => {
      imageContainer.style.display = 'none';
    });
    dropdownContent.appendChild(option);
  });

  // Add event listeners to the dropdown button and container
  dropdownButton.addEventListener('click', () => {
    dropdownContent.style.display = dropdownContent.style.display === 'none' ? 'block' : 'none';
  });

  dropdownContainer.appendChild(dropdownButton);
  dropdownContainer.appendChild(dropdownContent);

  // Replace the original select element with the custom dropdown
  const originalSelect = document.getElementById('cardSelectDeckbuilder');
  originalSelect.parentNode.replaceChild(dropdownContainer, originalSelect);
}



function addToDeck() {
  const dropdownButton = document.querySelector('.custom-dropdown-button');
  const cardName = dropdownButton.textContent;
  const selectedAmount = document.getElementById("cardSelectAmount").value;
  const cardAmount = parseInt(selectedAmount);

  // Get the card results div
  const deckContainer = document.getElementById('deckContainerDiv');

  // Check if the card already exists in the deck
  const existingCard = deckContainer.querySelector(`[data-card-name="${cardName}"]`);
  if (existingCard) {
    // Increase the amount of the existing card
    const existingCardNumber = existingCard.querySelector('.card-number');
    existingCardNumber.textContent = parseInt(existingCardNumber.textContent) + cardAmount;
  } else {
    // Create a new card element
    const cardElement = document.createElement('div');
    cardElement.style.display = 'flex';
    cardElement.style.alignItems = 'flex-start';
    cardElement.style.justifyContent = 'space-between'; 
    cardElement.style.width = '100%'; 
    cardElement.style.margin = '10px 0'; 
    cardElement.style.padding = '10px';
    cardElement.style.border = '1px solid #ccc';
    cardElement.style.borderRadius = '5px';
    cardElement.style.boxSizing = 'border-box'; 
    cardElement.dataset.cardName = cardName;

    const cardInfo = document.createElement('div');
    cardInfo.style.display = 'flex';
    cardInfo.style.flexDirection = 'column';
    cardInfo.style.flexGrow = '1'; 
    cardInfo.style.alignSelf = 'flex-start';

    const cardTitle = document.createElement('p');
    cardTitle.textContent = cardName;
    cardTitle.style.margin = '0';
    cardTitle.style.fontSize = '18px';
    cardTitle.style.fontWeight = 'bold';
    cardInfo.appendChild(cardTitle);

    const cardNumber = document.createElement('p');
    cardNumber.classList.add('card-number');
    cardNumber.textContent = cardAmount;
    cardNumber.style.margin = '0';
    cardNumber.style.fontSize = '18px';
    cardNumber.style.fontWeight = 'bold';
    cardInfo.appendChild(cardNumber);

    // Create the "Clear" button
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.style.marginTop = '10px';
	clearButton.style.width = '100%';
    clearButton.addEventListener('click', () => {
      deckContainer.removeChild(cardElement);
    });
    cardInfo.appendChild(clearButton);

    cardElement.appendChild(cardInfo);
    
    const imgElement = document.createElement('img');
    imgElement.src = `images/cards/${cardName}.jpg`;
    imgElement.alt = cardName;
    imgElement.style.maxWidth = '40%';
    imgElement.style.height = 'auto';
    imgElement.style.marginLeft = '10px'; 
    imgElement.style.alignSelf = 'flex-start';
    cardElement.appendChild(imgElement);

	checkImageExists(`images/cards/${cardName} backside.jpg`)
	  .then(exists => {
		if (exists) {
			const imgElement2 = document.createElement('img');
			imgElement2.src = `images/cards/${cardName} backside.jpg`;
			imgElement2.alt = cardName;
			imgElement2.style.maxWidth = '40%';
			imgElement2.style.height = 'auto';
			imgElement2.style.marginLeft = '10px'; 
			imgElement2.style.alignSelf = 'flex-start';
			cardElement.appendChild(imgElement2);
		}
	  });

    deckContainer.appendChild(cardElement);
  }
  updateTotalCards();
}



function clearDeck() {
	const deckContainer = document.getElementById('deckContainerDiv');
	deckContainer.innerHTML = '';
	updateTotalCards();
}



function exportDeckAsJSON() {
  const deckContainer = document.getElementById('deckContainerDiv');
  const cards = Array.from(deckContainer.querySelectorAll('[data-card-name]')).map(card => ({
    name: card.dataset.cardName,
    amount: parseInt(card.querySelector('.card-number').textContent)
  }));

  const deckData = {
    cards: cards
  };

  const jsonData = JSON.stringify(deckData, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'deck.json';
  link.click();

  URL.revokeObjectURL(url);
}


function importDeckFromJSON() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'application/json';
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const deckData = JSON.parse(reader.result);
          displayDeck(deckData.cards);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  });
  fileInput.click();
}

function displayDeck(cards) {
  const deckContainer = document.getElementById('deckContainerDiv');
  deckContainer.innerHTML = '';

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.style.display = 'flex';
    cardElement.style.alignItems = 'flex-start';
    cardElement.style.justifyContent = 'space-between'; 
    cardElement.style.width = '100%'; 
    cardElement.style.margin = '10px 0'; 
    cardElement.style.padding = '10px';
    cardElement.style.border = '1px solid #ccc';
    cardElement.style.borderRadius = '5px';
    cardElement.style.boxSizing = 'border-box'; 
    cardElement.dataset.cardName = card.name;

    const cardInfo = document.createElement('div');
    cardInfo.style.display = 'flex';
    cardInfo.style.flexDirection = 'column';
    cardInfo.style.flexGrow = '1'; 
    cardInfo.style.alignSelf = 'flex-start';

    const cardTitle = document.createElement('p');
    cardTitle.textContent = card.name;
    cardTitle.style.margin = '0';
    cardTitle.style.fontSize = '18px';
    cardTitle.style.fontWeight = 'bold';
    cardInfo.appendChild(cardTitle);

    const cardNumber = document.createElement('p');
    cardNumber.classList.add('card-number');
    cardNumber.textContent = card.amount;
    cardNumber.style.margin = '0';
    cardNumber.style.fontSize = '18px';
    cardNumber.style.fontWeight = 'bold';
    cardInfo.appendChild(cardNumber);

    // Create the "Clear" button
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.style.marginTop = '10px';
	clearButton.style.width = '50%';
    clearButton.addEventListener('click', () => {
      deckContainer.removeChild(cardElement);
    });
    cardInfo.appendChild(clearButton);

    cardElement.appendChild(cardInfo);
    
    const imgElement = document.createElement('img');
    imgElement.src = `images/cards/${card.name}.jpg`;
    imgElement.alt = card.name;
    imgElement.style.maxWidth = '40%';
    imgElement.style.height = 'auto';
    imgElement.style.marginLeft = '10px'; 
    imgElement.style.alignSelf = 'flex-start';
    cardElement.appendChild(imgElement);
    
    deckContainer.appendChild(cardElement);
  });
  updateTotalCards();
}


function updateTotalCards() {
	const deckContainer = document.getElementById('deckContainerDiv');
	const cardNumbers = deckContainer.querySelectorAll('.card-number');

	let totalCards = 0;
	cardNumbers.forEach(cardNumber => {
		totalCards += parseInt(cardNumber.textContent);
	});

	const totalCardsElement = document.getElementById('totalCardsDiv');
	totalCardsElement.textContent = `Total Cards: ${totalCards}`;
}