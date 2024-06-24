export class ProductService {
  constructor() {}

  async listProducts(page = 1) {
    const url =
      "https://real-time-amazon-data.p.rapidapi.com/search?query=a&page=1&country=US&sort_by=RELEVANCE&category_id=aps&product_condition=ALL";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "0020ea2eabmsh4350adf7e8db930p1d0f00jsnd61882eda487",
        "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
      },
    };

    try {
      // Faz uma solicitação HTTP para o 'url' especificado com as 'options' fornecidas
      const response = await fetch(url, options);

      // Imprime o objeto da classe Response no console
      console.log(response);

      // Lê o corpo da resposta e transforma em um objeto JavaScript
      // Esta chamada retorna uma Promise que resolve para o corpo da resposta como JSON
      const result = await response.json();

      // Imprime o objeto resultante (JSON) no console
      console.log(result);

      // Retorna a lista de produtos contida em result.data.products
      return result.data.products;
    } catch (error) {
      // Captura e imprime qualquer erro que ocorra durante a execução da solicitação ou a conversão do JSON
      console.error(error);
    }
  }
}
