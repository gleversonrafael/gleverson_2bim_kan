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

document.getElementById("search-input").addEventListener("input", async () => {
    const SEARCH_TYPE = document.getElementById("search-filter-select").value;
    await searchBy(SEARCH_TYPE);
});

document.getElementById("openSettingsButton").addEventListener("click", () => {
    document.getElementById("settingsModalOverlay").classList.remove("hidden");
});

document.getElementById("closeSettingsButton").addEventListener("click", () => {
    document.getElementById("settingsModalOverlay").classList.add("hidden");
});


/* ==========================================================================
   2. FUNCTIONS
============================================================================= */
async function refreshTable() {
    try {
        const serverResponse = await fetch(`http://${HOST}:${PORT}/users`, { method: 'GET' });
        const usersData = await serverResponse.json();

        if (usersData.error != null) throw new Error(usersData.error);
        updateTable(usersData.data);

    } catch (error) {
        console.error("Error refreshing table:", error);
    }
}

async function searchBy(searchType) {
    let typeOfSearch = '';
    const SEARCHED = document.getElementById("search-input").value.trim();

    if (SEARCHED.length === 0) {
        await refreshTable();
        return;    
    }

    switch (searchType) {
        case 'username': 
            typeOfSearch = 'name';
            break;
        case 'role':
            typeOfSearch = 'role';
            break;
        default:
            return;
    }

    try {
        // ENVIA REQUISIÇÃO PARA A ROTA BASEADO NO MECANISMO DE PESQUISA (O USUÁRIO ESTÁ PESQUISANDO PELO USERNAME OU O ROLE)
        const response = await fetch(`http://${HOST}:${PORT}/users/${typeOfSearch}/${SEARCHED}`, { method: 'GET' });
        
        // CONVERTE PARA O OBJETO NATIVO DO JS
        const usersData = await response.json();

        // CASO NÃO HAJA ERRO DE COMUNICAÇÃO COM O SERVIDOR MAS ERRO NA OBTENÇÃO DOS DADOS, CHAMA O CATCH
        if (usersData.error != null) 
            throw new Error(usersData.error);

        updateTable(usersData.data);

    } catch (error) {
        console.error("Error performing search:", error);
    }
}

function updateTable(array) {
    const tableBody = document.querySelector(".user-table tbody");
    const counterText = document.getElementById("pagination-counter-text");
    tableBody.innerHTML = "";

    if (!array || array.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">No users found.</td></tr>`;
        counterText.textContent = "Showing 0 results";
        return;
    }

    counterText.textContent = `Showing 1 to ${array.length} of ${array.length} results`;

    array.forEach(property => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>
                <div class="user-avatar-cell">
                    <img src="../resources/being-used/this-user.png" alt="User Profile" class="avatar-img">
                    <span class="user-name-text">${property.username}</span>
                </div>
            </td>
            <td>${property.email || '—'}</td>
            <td>
                <span class="user-type">
                    <span class="role-dot"></span>
                    ${property.rolename}
                </span>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}