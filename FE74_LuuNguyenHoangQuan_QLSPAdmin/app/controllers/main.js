var callApi = new CallApi();
var hinhAnhFromServer = "";

function getEle(id) {
  return document.getElementById(id);
}

getListProduct();

function getListProduct() {
  callApi
    .fetchListData()
    .then(function (result) {
      renderData(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderData(data) {
  var content = "";
  var imgSrc = "";
  data.forEach(function (product, i) {
    if ((product.img).indexOf("https://") !== -1) {
      imgSrc = product.img;
    } else
      imgSrc = "./../../assets/img/" + product.img;
    content += `
        <tr>
            <td>${i + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
      <img src="${imgSrc}" width="50" />
    </td>
            <td>${product.desc}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>${product.type}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEdit(${product.id
      })">Edit</button>
                <button class="btn btn-danger" onclick="handleDelete(${product.id
      })">Delete</button>
            </td>
        </tr>
    `;
  });
  getEle("tblDanhSachSP").innerHTML = content;
}

/**
 * Edit Product
 */
function handleEdit(id) {
  //update title
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit";

  var btnUpdate = `<button class="btn btn-success" onclick="handleUpdate(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  callApi
    .getProductById(id)
    .then(function (result) {
      var product = result.data;
      /*    //dom toi cac the input show value
         getEle("name").value = product.name;
         getEle("price").value = product.gia;
         getEle("desc").value = product.desc;
   
   
   
   
         //Cập nhật hinhAnhFromServer từ product.hinhAnh
         hinhAnhFromServer = product.hinhAnh;
    */

      getEle("name").value = product.name;
      getEle("price").value = product.price;
      getEle("screen").value = product.screen;
      getEle("backCamera").value = product.backCamera;
      getEle("frontCamera").value = product.frontCamera;
      getEle("desc").value = product.desc;
      getEle("type").value = product.type;
      //Cập nhật hinhAnhFromServer từ product.hinhAnh
      hinhAnhFromServer = product.img;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Update Product
 */
function handleUpdate(id) {

  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var desc = getEle("desc").value;
  var type = getEle("type").value;
  //Cập nhật hinhAnhFromServer từ product.hinhAnh
  // hinhAnhFromServer = product.img;


  /* var name = getEle("name").value;
  var gia = getEle("price").value;
  var desc = getEle("desc").value; */
  var img = "";
  if (getEle("img").files.length > 0) {
    img = getEle("img").files[0].name;
  }

  if (!img) {
    //giữ lại hình đang có trên server
    img = hinhAnhFromServer;
  }

  var product = new Product(id, name, price, screen, backCamera, frontCamera, img, desc, type);

  callApi
    .updateProduct(product)
    .then(function (result) {
      getListProduct();
      //close modal
      document.getElementsByClassName("close")[0].click();
      //reset hinhAnhFromServer
      hinhAnhFromServer = "";
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Delete Product
 */
function handleDelete(id) {
  callApi
    .deleteProduct(id)
    .then(function () {
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemSP").addEventListener("click", function () {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add";

  var btnAdd = `<button class="btn btn-success" onclick="handleAdd()">Add</button>`;

  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});

/**
 * Add Product
 */
function handleAdd() {
  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var desc = getEle("desc").value;
  var img = "";
  if (getEle("img").files.length > 0) {
    img = getEle("img").files[0].name;
  }
  var type = getEle("type").value;
  var product = new Product("", name, price, screen,
    backCamera, frontCamera, img, desc, type);

  callApi
    .addProduct(product)
    .then(function () {
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
