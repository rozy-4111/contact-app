const addBtn = document.querySelector(".add");
const cancelBtn = document.querySelector("#cancel");
const form = document.querySelector(".container");
const add = document.querySelector("#submit");

const firstName = document.querySelector("#formGroupExampleInput");
const lastName = document.querySelector("#formGroupExampleInput2");
const phone = document.querySelector("#inputnumber");
const email = document.querySelector("#inputEmail3");

const cardContainer = document.querySelector("#cardContainer");

// Safe parsing function
function getContacts() {
    try {
        const stored = JSON.parse(localStorage.getItem("contacts"));
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
}

// Load contacts on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedContacts = getContacts();
    savedContacts.forEach(createContactCard);
});

// Show form
addBtn.addEventListener("click", () => {
    form.style.display = 'block';
});

// Hide form
cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    form.style.display = 'none';
    clearForm();
});

// Add contact
add.addEventListener("click", (e) => {
    e.preventDefault();

    if (
        firstName.value.trim() === "" ||
        lastName.value.trim() === "" ||
        phone.value.trim() === "" ||
        email.value.trim() === ""
    ) {
        alert("Please fill all the details");
        return;
    }

    const contact = {
        id: Date.now(),
        firstName: firstName.value,
        lastName: lastName.value,
        phone: phone.value,
        email: email.value
    };

    const contacts = getContacts();
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    createContactCard(contact);
    form.style.display = 'none';
    clearForm();
});

// Clear form fields
function clearForm() {
    firstName.value = "";
    lastName.value = "";
    phone.value = "";
    email.value = "";
}

// Create card
function createContactCard(contact) {
    const card = document.createElement("div");
    card.classList.add("card", "d-flex", "flex-row", "mb-3");
    card.style.width = "25rem";
    card.dataset.id = contact.id;

    const img = document.createElement("img");
    img.src = "https://img.freepik.com/free-vector/cute-panda-with-bamboo_138676-3053.jpg?w=2000";
    img.alt = "Contact Image";
    img.classList.add("card-img-left");
    img.style.width = "100px";
    img.style.height = "200px";
    img.style.objectFit = "cover";
   
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const namePara = document.createElement("p");
    namePara.textContent = `👤 Name: ${contact.firstName} ${contact.lastName}`;

    const phonePara = document.createElement("p");
    phonePara.textContent = `📞 Phone: ${contact.phone}`;

    const emailPara = document.createElement("p");
    emailPara.textContent = `📧 Email: ${contact.email}`;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("btn", "btn-warning", "me-2", "mt-2");
    editBtn.addEventListener("click", () => {
        firstName.value = contact.firstName;
        lastName.value = contact.lastName;
        phone.value = contact.phone;
        email.value = contact.email;

        // Remove card and contact from storage
        card.remove();
        const contacts = getContacts().filter(c => c.id !== contact.id);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        form.style.display = "block";
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "mt-2");
    deleteBtn.addEventListener("click", () => {
        card.remove();
        const contacts = getContacts().filter(c => c.id !== contact.id);
        localStorage.setItem("contacts", JSON.stringify(contacts));
    });

    // Append elements
    cardBody.appendChild(namePara);
    cardBody.appendChild(phonePara);
    cardBody.appendChild(emailPara);
    cardBody.appendChild(editBtn);
    cardBody.appendChild(deleteBtn);

    card.appendChild(img);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
}
