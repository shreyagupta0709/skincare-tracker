const API_URL = "https://skincare-tracker.vercel.app/api/products";

async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    const container = document.getElementById("product-list");
    container.innerHTML = "";

    if (!products.length) {
      container.innerHTML = "<p>No products yet.</p>";
      return;
    }

    products.forEach((p) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <h3>${p.name}</h3>
        <p>Brand: ${p.brand}</p>
        <p>Category: ${p.category}</p>
        <p>Expiry: ${p.expiryDate ? new Date(p.expiryDate).toLocaleDateString() : "Not set"}</p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load products:", err);
  }
}

document.getElementById("add-product-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newProduct = {
    name: document.getElementById("name").value,
    brand: document.getElementById("brand").value,
    category: document.getElementById("category").value,
    expiryDate: document.getElementById("expiryDate").value || null,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    if (res.ok) {
      document.getElementById("add-product-form").reset();
      loadProducts();
    } else {
      alert("Could not add product");
    }
  } catch (err) {
    alert("Error: " + err);
  }
});

window.onload = loadProducts;