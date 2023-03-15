const fs = require("fs");

class ProductManager {
  constructor(path, products = []) {
    this.products = products;
    this.path = path;
  }

  static id = 0;



  checkProducts = async () => {
    if (fs.existsSync(this.path)) {
      let productList = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(productList);
      ProductManager.id = this.products.length;
    } else {
      this.products = [];

    }
    return this.products;
  };


  getProducts = async () => {
    this.products = await this.checkProducts();
    return this.products;
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    this.products = await this.checkProducts();
    const checkForDuplicatedCode = this.products.filter(
      (product) => product.code === code
    );
    if (checkForDuplicatedCode.length !== 0) {
      return `This code (${code}) already exists`;
    }
    if (title && description && price && thumbnail && code && stock) {
      let product = {
        id: ProductManager.id + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      ProductManager.id++;
      this.products.push(product);
      await fs.writeFileSync(this.path, JSON.stringify(this.products));
      return this.products;
    } else {
      return console.log("Fill in all the fields to add a new product");
    }
  };

  updateProduct = async (id, updatedProduct) => {
    this.products = await this.checkProducts();
    let product = this.products.find((product) => product.id == id);
    if (product) {
      product.title = updatedProduct.title || product.title;
      product.description = updatedProduct.description || product.description;
      product.price = updatedProduct.price || product.price;
      product.thumbnail = updatedProduct.thumbnail || product.thumbnail;
      product.stock = updatedProduct.stock || product.stock;
      product.id = product.id;

      await fs.writeFileSync(this.path, JSON.stringify(this.products));
      return this.products;
    } else {
      console.log(`This ID (${id}) does not exist.`);
      return this.products;
    }
  };

  deleteProduct = async (id) => {
    this.products = await this.checkProducts();
    const checkForID = this.products.findIndex((product) => product.id === id);

    if (checkForID > -1) {
      this.products.splice(checkForID, 1);
      await fs.writeFileSync(this.path, JSON.stringify(this.products));
      return this.products;
    } else {
      return `ID (${id}) not found or invalid`;
    }
  };

  getProductById = async (id) => {
    this.products = await this.checkProducts();
    const productByID = this.products.find((product) => product.id === id);
    if (productByID) {
      return productByID;
    } else {
      return `ID (${id}) not found or invalid`;
    }
  };
}

const newSess = new ProductManager("./files/products.json");



//agregar productos
newSess.addProduct(
  "Cerveza Mestiza Panzenú",
  "Cerveza clasica hecha con los sabores tipos colombianos como el maiz y lúpulo",
  8000,
  "https://scontent.feoh4-4.fna.fbcdn.net/v/t39.30808-6/269623123_134127492385408_867247191007009107_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHebtDhuABHISV9LVsxUHzcBSN9lz4YFnoFI32XPhgWekAcbPOVa8wKBykdx-Z655DI7dy13vlxtcDnO__q5Tkc&_nc_ohc=xC0cy5qutrcAX-yCTce&_nc_ht=scontent.feoh4-4.fna&oh=00_AfAVSmGMXuBQkkzitCBX_keX9ajbpYHUJzlW1Lm9pcyWww&oe=63FFD659",
  5,
  17
);
newSess.addProduct(
  "Cerveza Mestiza",
  "Cerveza clasica hecha con los sabores tipos colombianos como el lúpulo y batata",
  7000,
  "https://ennuestrocampo.co/wp-content/uploads/2022/02/CervezadelValleSinu-Panzenu.jpg",
  6,
  13
);


console.log("Lista de productos productos agregados:");
console.log(newSess.getProducts());

// tratar de agregar producto, pero con código repetido
newSess.addProduct(
  "Cerveza Mestiza Panzenú",
  "Cerveza clasica hecha con los sabores tipos colombianos como el maiz y lúpulo",
  8000,
  "https://scontent.feoh4-4.fna.fbcdn.net/v/t39.30808-6/269623123_134127492385408_867247191007009107_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHebtDhuABHISV9LVsxUHzcBSN9lz4YFnoFI32XPhgWekAcbPOVa8wKBykdx-Z655DI7dy13vlxtcDnO__q5Tkc&_nc_ohc=xC0cy5qutrcAX-yCTce&_nc_ht=scontent.feoh4-4.fna&oh=00_AfAVSmGMXuBQkkzitCBX_keX9ajbpYHUJzlW1Lm9pcyWww&oe=63FFD659",
  5,
  17
);

//actualizar producto
let prodUpdate = {
  title: "vino mel-ho",
  description:"fruta y coroso",
  price: 30000,
  thumbnail:"https://scontent.feoh4-4.fna.fbcdn.net/v/t39.30808-6/269623123_134127492385408_867247191007009107_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHebtDhuABHISV9LVsxUHzcBSN9lz4YFnoFI32XPhgWekAcbPOVa8wKBykdx-Z655DI7dy13vlxtcDnO__q5Tkc&_nc_ohc=xC0cy5qutrcAX-yCTce&_nc_ht=scontent.feoh4-4.fna&oh=00_AfAVSmGMXuBQkkzitCBX_keX9ajbpYHUJzlW1Lm9pcyWww&oe=63FFD659",
  code: 5,
  stock: 24,
};

console.log("Lista de productos después de actualizar el título del primero:");
console.log(newSess.getProducts());///
// obtener producto por id - correcto e incorrecto
newSess.getProductById(1);///
newSess.getProductById(7);///

//eliminar producto
newSess.deleteProduct(1);

console.log("Lista de productos después de eliminar el primero:");
console.log(newSess.getProducts());