const fs = require('fs');

// Function for deleting an element from a JSON file
function deleteFromFile(filePath, key, id) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file : ${err.message}`);
      return;
    }

    let items = JSON.parse(data); // Loading JSON data
    const initialLength = items.length;

    // Delete the item with the specified ID
    items = items.filter(item => item[key] !== id);

    if (items.length === initialLength) {
      console.log(`No items found with the ID : ${id}`);
      return;
    }

    // Rewrite the file with the updated data
    fs.writeFile(filePath, JSON.stringify(items, null, 2), err => {
      if (err) {
        console.error(`Error writing to file : ${err.message}`);
        return;
      }
      console.log(`Element with ID ${id} deleted from ${filePath}.`);
    });
  });
}


module.exports = deleteFromFile;
