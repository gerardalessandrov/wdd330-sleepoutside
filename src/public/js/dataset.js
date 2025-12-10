const items = document.querySelectorAll('#items li');
const details = document.createElement('div');
document.body.appendChild(details);
items.forEach(item => {
  item.addEventListener('click', () => {
    details.innerHTML = `
      <h2>Item Details</h2>
      <p>Name: ${item.dataset.name}</p>
      <p>Category: ${item.dataset.category}</p>
      <p>Color: ${item.dataset.color}</p>
    `;
  });
});