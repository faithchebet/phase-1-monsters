document.addEventListener('DOMContentLoaded', async () => {
    const monsterContainer = document.getElementById('monster-container');
    const createMonsterForm = document.getElementById('create-monster');
    const loadMoreButton = document.getElementById('load-more');
  
    let currentPage = 1;
  
    
    const fetchMonsters = async (page = 1, limit = 50) => {
      const response = await fetch(`http://localhost:3000/monsters/?_page=${page}&_limit=${limit}`);
      const monsters = await response.json();
      return monsters;
    };
  
    
    const renderMonsters = (monsters) => {
      monsterContainer.innerHTML = '';
      monsters.forEach((monster) => {
        const monsterCard = document.createElement('div');
        monsterCard.innerHTML = `
          <h2>${monster.name}</h2>
          <p>Age: ${monster.age}</p>
          <p>Description: ${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterCard);
      });
    };
  
    
    const createMonster = async (name, age, description) => {
      const response = await fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, age, description }),
      });
      const newMonster = await response.json();
      return newMonster;
    };
  
    
    createMonsterForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const description = document.getElementById('description').value;
  
      if (name && age && description) {
        await createMonster(name, age, description);
        
        const monsters = await fetchMonsters(currentPage);
        renderMonsters(monsters);
        
        createMonsterForm.reset();
      } else {
        alert('Please fill in all fields');
      }
    });
  
    
    loadMoreButton.addEventListener('click', async () => {
      currentPage++;
      const monsters = await fetchMonsters(currentPage);
      renderMonsters(monsters);
    });
  
    
    const initialMonsters = await fetchMonsters();
    renderMonsters(initialMonsters);
  });
  