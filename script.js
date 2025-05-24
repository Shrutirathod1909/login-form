const tableBody = document.querySelector('#dataTable tbody');

  // This array will store all user records
  const users = [];
  let editIndex = null; // Used to track which user is being edited

  // Show the form when "showLogin" is clicked
  showLogin.addEventListener('click', function(event) {
    event.preventDefault(); // Stop link/button from refreshing the page
    loginForm.style.display = 'block'; // Show the form
    loginForm.scrollIntoView({ behavior: 'smooth' }); // Scroll to form
  });

  // When the form is submitted
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const city = document.getElementById('city').value;

    // Add new user or update existing user
    if (editIndex !== null) {
      users[editIndex] = { name, email, contact, city };
      editIndex = null;
    } else {
      users.push({ name, email, contact, city });
    }

    form.reset(); // Clear form fields
    loginForm.style.display = 'none'; // Hide form
    showUsers(); // Refresh table
  });

  // Display users in the table
  function showUsers() {
    tableBody.innerHTML = ''; // Clear old rows

    users.forEach(function(user, index) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.contact}</td>
        <td>${user.city}</td>
        <td>
          <button onclick="editUser(${index})">Edit</button>
          <button onclick="deleteUser(${index})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Show or hide table based on user count
    dataDisplay.style.display = users.length > 0 ? 'block' : 'none';
  }

  // Edit user data
  function editUser(index) {
    const user = users[index];
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('contact').value = user.contact;
    document.getElementById('city').value = user.city;
    editIndex = index;

    loginForm.style.display = 'block';
    loginForm.scrollIntoView({ behavior: 'smooth' });
  }

  // Delete a user
  function deleteUser(index) {
    if (confirm("Are you sure you want to delete this user?")) {
      users.splice(index, 1); // Remove user from array
      showUsers(); // Refresh table
    }
  }

  // Make functions accessible globally
  window.editUser = editUser;
  window.deleteUser = deleteUser;