/**** STATE ****/
let contactList = []
let contactToEditId = null
let contactId = 2

/**** RENDERING & LISTENING ****/
const contactsContainer = document.getElementById("contacts-container")
const textarea = document.getElementById("textarea")

/** Render a list of contacts */
function renderContactsList() {
    // Clear out anything from previous renders
    contactsContainer.innerHTML = ""

    // If there's no contacts, show an empty message
    if (contactList.length === 0) {
        contactsContainer.innerHTML = "No contacts yet"
    }

    // For each contact, map it to a div, then append that div to the container
    contactList.map(renderContactsList).forEach(div => contactsContainer.appendChild(div))
}

/**Render one contact*/
function renderContact(contact) {
    const contactDiv = document.createElement("div")
    contactDiv.className = "bg-light mb-3 p-4"
    contactDiv.innerHTML = `
        <h5>${contact.name}</h5>
        <p>${contact.phonenumber}</p>
        <p>${contact.email}</p>
        <p>${contact.address}</p>
        <button id="edit-button" class="btn btn-sm btn-outline-primary">Edit</button>
        <button id="delete-button" class="btn btn-sm btn-outline-danger">Delete</button>
    `
    // Attach the event listener to the edit button that gets the form ready to edit
    contactDiv.querySelector("#edit-button").addEventListener("click", () => {
        contactToEditId = contact.id
        renderContactForm(contact)
    })
    // Attach the event listener to the delete button that deletes the review
    contactDiv.querySelector("#delete-button").addEventListener("click", async () => {
        
        // Delete on the backend first
        await deleteContact(contact.id)
        // Delete on the frontend
        const indexToDelete = contactList.indexOf(contact)
        contactList.splice(indexToDelete, 1)

        renderContactList()
    })
    return contactDiv
}