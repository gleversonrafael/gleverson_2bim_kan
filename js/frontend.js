/* ==========================================================================
   0. SERVER DATA
============================================================================= */
const HOST = 'localhost';
const PORT = '3000';

/* ==========================================================================
   1. EVENTS
============================================================================= */
// REFRESH BUTTON 
document.getElementById("updateTableButton").addEventListener("click", async () => {
    await refreshTable();
});

// SEARCH BY
document.getElementById("search-input").addEventListener("input", async () => {
    const SEARCH_TYPE = document.getElementById("search-filter-select").value;
    await searchBy(SEARCH_TYPE);
})


// MODAL
document.getElementById("openSettingsButton").addEventListener("click", () => {
    document.getElementById("settingsModalOverlay").classList.remove("hidden");
});

document.getElementById("closeSettingsButton").addEventListener("click", () => {
    document.getElementById("settingsModalOverlay").classList.add("hidden");
});

/* ==========================================================================
   2. FUNCTIONS
============================================================================= */
async function refreshTable()
{
    try
    {
        // E
        const serverResponse = await fetch(
        `http://${HOST}:${PORT}/users`, 
        {method: 'GET'});
        
        const usersData = await serverResponse.json();

        if(usersData.error != null) 
            throw new Error(usersData.error);

        // S
        updateTable(usersData.data);

    }
    catch (error)
    {
        console.log(error.name),
        console.log(error.message);
    }
  
}

async function searchBy(searchType)
{
    // E
    let typeOfSearch = '';
    const SEARCHED = document.getElementById("search-input").value;

    if(SEARCHED.length == 0) 
    {
        await refreshTable()
        return;    
    }

    switch(searchType)
    {
        case 'username': 
            typeOfSearch = 'name';
            break;

        case 'role':
            typeOfSearch = 'role';
            break;

        default:
            return;
    }

    // P
    try
    {
        // EXAMPLE: http://localhost:3000/name:name
        const response = await fetch(
            `http://${HOST}:${PORT}/users/${typeOfSearch}/${SEARCHED}`, 
            {
                method: 'GET'
            }
        )

        // S
        const usersData = await response.json();

        if(usersData.error != null)
            throw new Error(usersData.error);
        
        updateTable(usersData.data);

    }
    catch(error) 
    {
        console.log(error.name),
        console.log(error.message);
    }
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