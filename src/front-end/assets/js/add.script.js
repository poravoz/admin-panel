window.onload = function() {
    document.getElementById('phoneForm').onsubmit = async function(event) {        
        event.preventDefault();

        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;

        if (name.length < 3) {
            alert('The name must contain at least 3 characters.');
            return;
        } else if (!/\d/.test(name)) {
            alert('The name must contain at least one number.');
            return;
        } else if (description.length < 10) {
            alert('The description must contain at least 10 characters.');
            return;
        } else  if (!/^\d+$/.test(price)) {
            alert('The price must contain only numbers.');
            return;
        } else if(price < 100 || price > 150000) {
            alert('The price should be between 100 and 150,000 and contain only numbers.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/phone/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    price: price
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            document.getElementById('name').value = '';
            document.getElementById('description').value = '';
            document.getElementById('price').value = '';
  
            window.location.href = '../index.html';

        } catch (error) {
            console.error('Error:', error);
            alert('A product with the same name already exists');

            document.getElementById('name').value = '';
            document.getElementById('description').value = '';
            document.getElementById('price').value = '';
        }
    };
};