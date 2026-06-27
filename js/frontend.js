/* ==========================================================================
   0. SERVER DATA
============================================================================= */
const HOST = 'localhost';
const PORT = '3000';

/* ==========================================================================
   1. EVENTS
============================================================================= */
document.getElementById("updateTableButton").addEventListener("click", async () => {
    await refreshTable();
});

document.getElementById("")

/* ==========================================================================
   2. FUNCTIONS
============================================================================= */
async function refreshTable()
{
    // E
    const serverResponse = await fetch(
        `http://${HOST}:${PORT}/allUsers`, 
        {method: 'GET'}
    )

    const usersData = await serverResponse.json();

    if(usersData.error != null)
    {
        console.log(usersData.error.name),
        console.log(usersData.error.message);
        return;
    }

    // P
    updateTable(usersData.data)

    // 1. Pede pelos dados
    // 2. Recebe os dados
    // 3. Faz a tabela com os dados
    // 4. Preenche
}



function updateTable(array) {
    // 1. Locate the target table structural body element
    const tableBody = document.querySelector(".user-table tbody");
    tableBody.innerHTML = "";

    // 2. Fallback check: handle situations where no data exists gracefully
    if (!array || array.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center;">No users found.</td></tr>`;
        return;
    }

    // 3. Iterate over each structural object instance from the database
    array.forEach(property => {
        // Create an empty operational layout row instance
        const tr = document.createElement("tr");

        // 4. Inject the dynamic literal blocks matching your SQL alias outputs (userid, username, email, rolename)
        tr.innerHTML = `
            <td>${property.userid}</td>
            <td>${property.username}</td>
            <td>${property.email}</td>
            <td><span class="user-type">${property.rolename}</span></td>
        `;

        // 5. Append the constructed row directly to the UI rendering view tree
        tableBody.appendChild(tr);
    });
}