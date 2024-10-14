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

const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
};


function getObjectOfTheDay(cardData) {
	const today = new Date();
	const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD
	const hash = simpleHash(dateString);
	const index = hash % cardData.length;
	const cardName = cardData[index].name;
	
	
	
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