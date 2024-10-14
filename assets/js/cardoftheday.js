// Load the card data from the JSON file
//let cardData;
fetch('card_data.json')
  .then(response => response.json())
  .then(data => {
    cardData = data;
    // Call the function after data is loaded
    getObjectOfTheDay(cardData);
  })
  .catch(error => {
    console.error('Error loading card data:', error);
  });

function getObjectOfTheDay(cardData) {
    const today = new Date();
    
    // Calculate the day of the year (0-364)
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Use modulo to wrap around if there are more days than items
    const index = dayOfYear % cardData.length;
    const cardName = cardData[index].name;
    //return items[index];
	
	
	
	const cardOfTheDayContainerDiv = document.getElementById('cardOfTheDayContainer');
	const imgElement = document.createElement('img');
	imgElement.src = `images/cards/${cardName}.jpg`;
	imgElement.alt = cardName;
	imgElement.style.maxWidth = '60%';
	imgElement.style.height = 'auto';
	//imgElement.style.marginLeft = '10px'; // Add some space between text and image
	//imgElement.style.alignSelf = 'flex-start';
	cardOfTheDayContainerDiv.appendChild(imgElement);
}