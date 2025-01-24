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

    // If there's no reviews, show an empty message
    if (contactList.length === 0) {
        contactsContainer.innerHTML = "No contacts yet"
    }

    // For each review, map it to a div, then append that div to the container
    contactList.map(renderContactsList).forEach(div => contactsContainer.appendChild(div))
}