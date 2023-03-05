var apiUrl="https://640411a580d9c5c7bac02be3.mockapi.io/api/v1/Products"
function CallApi() {
  this.fetchListData = function () {
    return axios({
      // url: "https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products",
      url: apiUrl,
      method: "GET",
    });
  };

  this.deleteProduct = function (id) {
    return axios({
      // url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products/${id}`,
      url: apiUrl+`/${id}`,
      method: "DELETE",
    });
  };

  this.addProduct = function (product) {
    return axios({
      // url: "https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products",
      url: apiUrl,
      method: "POST",
      data: product,
    });
  };

  this.getProductById = function (id) {
    return axios({
      // url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products/${id}`,
      url: apiUrl+`/${id}`,
      method: "GET",
    });
  };

  this.updateProduct = function (product) {
    return axios({
      // url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products/${product.id}`,
      url: apiUrl+`/${product.id}`,
      method: "PUT",
      data: product,
    });
  };
}
