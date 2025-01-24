/**** STATE ****/
let contactList = []
let contactToEditId = null
let contactId = 3

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


/**Update the contact form to match the contact data given*/
function renderContactForm(contactData) {
    textarea.value = contactData.text
}

/*** When the save button is clicked, either save an edit or a create*/
async function onSaveContactClick(event) {
    event.preventDefault()
    const nextId = contactId + 1;
    
    const contactData = {
        id: nextId, 
        Name: nametextarea.value,
        PhoneNumber: pntextarea.value,
        Email: emailtextarea.value,
        Address: addresstextarea.value,
    }

    if(contactToEditId !== null) {
        // Update on backend
        contactData.id = contactToEditId
        await putContact(contactData)

        // Update on frontend
        const indexToReplace = contactList.findIndex(r => r.id === contactToEditId)
        contactList[indexToReplace] = contactData
    } else {
        // Update on backend
        const createdContact = await postContact(contactData)

        // Update on frontend
        contactList.push(createdContact)
    }

    renderContactsList()
    contactToEditId = null
    // Clear the form
    renderContactForm({text: "" })
}

/**** FETCHING ****/

async function fetchAllContacts() {
    const response = await fetch("http://localhost:3000/contact")
    return response.json()
}

async function postContact(newContactData) {
    const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContactData)
    })
    return response.json()
}

async function putContact(updatedContact) {
    await fetch("http://localhost:3000/contact/" + updatedContact.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact)
    })
}

async function deleteContact(idToDelete) {
    await fetch("http://localhost:3000/contact/" + idToDelete, {
        method: "DELETE"
    })
}

/**** START UP ****/

async function startUp() {
    contactList = await fetchAllContacts()
    renderContactList()
}

startUp()