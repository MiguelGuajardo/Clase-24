const socket = io();
function mostrarProductos(products) {
    const productosParaMostrar = products.map(({ title, price, thumbnail }) => {
      return `
      <tr>
      <td>${title}</td>
      <td>${price}</td>
      <td><img src="${thumbnail}" style="width: 30px; height: 30px"/></td>
      </tr>
          `;
    });
  
    const list = document.getElementById("list");
    list.innerHTML = productosParaMostrar.join("\n");
    console.table(productosParaMostrar);
  }
  socket.on("productosActualizados", (products) => {
    mostrarProductos(products);
  });
  const botónCargar = document.getElementById("botónCargar");

botónCargar.addEventListener("click", (e) => {
  const inputTitle = document.getElementById("inputTitle");
  const inputPrice = document.getElementById("inputPrice");
  const inputThumbnail = document.getElementById("inputThumbnail");

  if (inputTitle.value && inputPrice.value && inputThumbnail.value) {
    const product = {
      title: inputTitle.value,
      price: inputPrice.value,
      thumbnail: inputThumbnail.value,
    };
    console.log(product)
    socket.emit("nuevoProducto", product);
  }
  /* inputTitle.value = "";
  inputPrice.value = "";
  inputThumbnail.value = ""; */
});