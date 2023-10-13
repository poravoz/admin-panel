window.onload = async function() {
    const response = await fetch('http://localhost:3000/phone/');
    const data = await response.json();

    const tableContainer = document.getElementById('table-container');
    const table = document.createElement('table');
    table.classList.add('phone-table');

    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Created At</th>
        <th>Actions</th>
    `;
    table.appendChild(headerRow);

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
            <td>${formatDate(item.date_added)}</td>
            <td>
                <button class="change" data-id="${item.id}">Change</button>
                <button class="delete" data-id="${item.id}">Delete</button>
            </td>
        `;
        table.appendChild(row);
    });

    tableContainer.appendChild(table);

    const changeButtons = document.querySelectorAll('.change');
    const deleteButtons = document.querySelectorAll('.delete');

    deleteButtons.forEach(button => {
        button.onclick = handleDeleteButtonClick;
    });

    changeButtons.forEach(button => {
        button.onclick = function() {
            window.location.href = `/src/front-end/editAndAdd/edit.html`;
        };
    });
};

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function handleDeleteButtonClick(event) {
    const id = event.target.dataset.id;

    event.target.parentElement.parentElement.remove();
    fetch(`http://localhost:3000/phone/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Phone deleted successfully');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deleting the phone');
        });
    }