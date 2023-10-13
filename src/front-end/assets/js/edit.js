window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const name = urlParams.get('name');
    const description = urlParams.get('description');
    const price = urlParams.get('price');

    document.getElementById('name').value = name;
    document.getElementById('description').value = description;
    document.getElementById('price').value = price;

    document.getElementById('phoneForm').addEventListener('submit', async function(event) {
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
        } else if (!/^\d+$/.test(price)) {
            alert('The price must contain only numbers.');
            return;
        } else if (price < 100 || price > 150000) {
            alert('The price should be between 100 and 150,000 and contain only numbers.');
            return;
        }

        const response = await fetch(`http://localhost:3000/phone/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        });

        if (response.ok) {
            alert('Data updated successfully');
        } else {
            alert('An error occurred while updating data');
        }
    });
};