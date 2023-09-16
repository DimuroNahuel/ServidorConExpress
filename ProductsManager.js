import fs from "fs";


class ProductsManager {
    constructor(path){
        this.path=path
    }
  async getProducts(queryObj) {
    const {limit} = queryObj
    try {
      if (fs.existsSync(this.path)) {
        const productsFile = await fs.promises.readFile(this.path, "utf-8");
        const productsArray = JSON.parse(productsFile)
        return limit ? productsArray.slice(0,limit) : productsArray
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const productsFile = await this.getProducts({});
      const product = productsFile.find((p) => p.id === id);
      return product;
    } catch (error) {
      return error;
    }
  }
}
export const productsManager = new ProductsManager('products.json');