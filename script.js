let array = [];
let searchValue = 0;
let currentIndex = 0;
let intervalId;
let startTime; // For tracking start time
let endTime; // For tracking end time

function startLinearSearch() {
  // Clear previous results
  document.getElementById("searchResult").textContent = "";
  document.getElementById("timer").textContent = ""; // Clear previous timer display
  document.getElementById("timeComplexity").textContent = "";
  document.getElementById("spaceComplexity").textContent = "";
  clearInterval(intervalId); // Clear any ongoing animation

  // Get array and search value input
  array = document.getElementById("arrayInput").value.split(",").map(Number);
  searchValue = parseInt(document.getElementById("searchValue").value);

  if (isNaN(searchValue) || array.length === 0) {
    alert("Please provide a valid array and search value");
    return;
  }

  // Build the table
  buildTable();

  // Initialize index for linear search
  currentIndex = 0;

  // Start the timer when the search begins
  startTime = Date.now();

  // Start linear search animation
  intervalId = setInterval(animateLinearSearch, 1000); // 1-second delay for each iteration

  // Show time and space complexity
  showComplexity();
}

function buildTable() {
  const table = document.getElementById("arrayTable");
  table.innerHTML = ""; // Clear previous table

  // Create a single row for the array elements
  const row = table.insertRow();

  array.forEach((value, index) => {
    const cell = row.insertCell();
    cell.textContent = value;
    cell.setAttribute("id", `cell-${index}`);
  });
}

function highlightCell(index, className) {
  const cell = document.getElementById(`cell-${index}`);
  cell.classList.add(className);
}

function clearHighlights() {
  array.forEach((_, index) => {
    const cell = document.getElementById(`cell-${index}`);
    cell.classList.remove("highlight", "found", "blink");
  });
}

function animateLinearSearch() {
  if (currentIndex < array.length) {
    clearHighlights(); // Clear previous highlights

    // Highlight the current element
    highlightCell(currentIndex, "highlight");

    if (array[currentIndex] === searchValue) {
      // If search value is found, blink the cell
      const foundCell = document.getElementById(`cell-${currentIndex}`);
      foundCell.classList.add("found", "blink");
      document.getElementById(
        "searchResult"
      ).textContent = `Value ${searchValue} found at index ${currentIndex}!`;

      // Stop the timer after the value is found
      endTime = Date.now();
      displayElapsedTime();

      clearInterval(intervalId); // Stop the search
      return;
    }

    currentIndex++;
  } else {
    document.getElementById(
      "searchResult"
    ).textContent = `Value ${searchValue} not found in the array.`;

    // Stop the timer if the value is not found
    endTime = Date.now();
    displayElapsedTime();

    clearInterval(intervalId); // Stop the search
  }
}

function displayElapsedTime() {
  const elapsedTime = (endTime - startTime) / 1000; // Convert milliseconds to seconds
  document.getElementById(
    "timer"
  ).textContent = `Elapsed Time: ${elapsedTime} seconds`;
}

function showComplexity() {
  const n = array.length;
  const timeComplexity = `Time Complexity: O(n) - In the worst case, every element has to be checked.`;
  const spaceComplexity = `Space Complexity: O(1) - No extra space is required.`;

  document.getElementById("timeComplexity").textContent = timeComplexity;
  document.getElementById("spaceComplexity").textContent = spaceComplexity;
}
