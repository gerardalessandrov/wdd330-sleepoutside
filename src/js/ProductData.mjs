function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
// export default: Exporta esta clase como la principal exportación del archivo.
//  Esto permite importarla fácilmente desde otro archivo.
export default class ProductData {
  // clase es una plantila para crear objetos y propiedades
  constructor(category)
  // metodo constructor de la clase
  // category es el parametro del metodo
  {
    this.category = category;
    // guarda el valor recibibido por el constructor como propiedad del objeto
    this.path = `../json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
