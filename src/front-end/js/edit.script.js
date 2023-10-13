window.onload = function() {
    document.getElementById('phoneForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;

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

        } catch (error) {
            console.error('Error:', error);
        }
    });
};