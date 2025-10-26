async function loadProducts() {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    const products = await response.json();
    const container = document.getElementById("product-list");
    container.innerHTML = "";
    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `<h3>${p.name}</h3><p>${p.brand}</p><p>${p.category}</p>`;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

loadProducts();