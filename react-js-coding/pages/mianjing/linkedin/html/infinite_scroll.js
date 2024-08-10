const content = document.getElementById("content");
let itemCount = 0;
let loading = false; // Flag to check if currently loading

// Function to simulate loading data
const loadData = () => {
  console.log("load data!");
  if (loading) {
    return;
  }
  loading = true;
  setTimeout(() => {
    // Simulate network delay
    for (let i = 0; i < 10; i++) {
      const item = document.createElement("div");
      item.classList.add("item");
      item.textContent = `Item ${itemCount}`;
      itemCount++;
      content.appendChild(item);
    }
    loading = false; // Reset loading flag after data is appended
  }, 1000); // Delay to simulate fetch time
};

// Initial load
loadData();

// Intersection Observer to trigger loadData
const observer = new IntersectionObserver((entries) => {
  // Check if the observed element is in view
  if (entries[0].isIntersecting) {
    loadData();
  }
});

// Start observing
const sentinel = document.getElementById("observer");
observer.observe(sentinel);
