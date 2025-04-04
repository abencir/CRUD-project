let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let submit = document.getElementById("add");
let title = document.getElementById("title");
let category = document.getElementById("category");
let count = document.getElementById("count");
let search = document.getElementById("search");
let ListProducts;
let mod = "creat";
let xvar;

if (localStorage.product != null) {
  ListProducts = JSON.parse(localStorage.product);
} else {
  ListProducts = [];
}
function GetTotal() {
  let result;
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "0";
    total.style.backgroundColor = "red";
  }
}
function ClearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "";
}
function ShowProducts() {
  let table = "";
  for (i = 0; i < ListProducts.length; i++) {
    table += `<tr>
        <td>${i + 1}</td>
        <td>${ListProducts[i].title}</td>
        <td>${ListProducts[i].price}</td>
        <td>${ListProducts[i].taxes}</td>
        <td>${ListProducts[i].ads}</td>
        <td>${ListProducts[i].discount}</td>
        <td>${ListProducts[i].category}</td>
        <td>${ListProducts[i].total}</td>
        <td><button onclick = "UpdateProduct(${i})">Update</button></td>
        <td><button onclick = "DeleteProduct(${i})">Delete</button></td>
    </tr>`;
  }
  document.getElementById("table").innerHTML = table;

  let delet_btn = document.getElementById("delet");
  if (ListProducts.length > 0) {
    delet_btn.innerHTML = `<button onclick = "DeletAll()">Delete All (${ListProducts.length})</button>`;
  } else {
    delet_btn.innerHTML = "";
  }
}
function DeleteProduct(i) {
  ListProducts.splice(i, 1);
  localStorage.product = JSON.stringify(ListProducts);
  ShowProducts();
}
function DeletAll() {
  localStorage.clear;
  ListProducts.splice(0);
  ShowProducts();
}
function UpdateProduct(i) {
  xvar = i;
  title.value = ListProducts[i].title;
  price.value = ListProducts[i].price;
  taxes.value = ListProducts[i].taxes;
  ads.value = ListProducts[i].ads;
  discount.value = ListProducts[i].discount;
  category.value = ListProducts[i].category;
  GetTotal();
  count.style.display = "none";
  mod = "update";
  submit.innerHTML = "Update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchmod = "title";
function getsearchmod(id) {
  search.focus();
  if (id == "btitle") {
    searchmod = "title";
    search.placeholder = "Search By Title";
  } else {
    searchmod = "category";
    search.placeholder = "Search By Category";
  }
  search.value = ''
  ShowProducts()
}

function SearchProduct(value) {
  let table = "";
  for (let x = 0; x < ListProducts.length; x++) {
      if (searchmod == "title") {
          if (ListProducts[x].title.includes(value.toLowerCase())) {
            table += `<tr>
            <td>${x + 1}</td>
            <td>${ListProducts[x].title}</td>
            <td>${ListProducts[x].price}</td>
            <td>${ListProducts[x].taxes}</td>
            <td>${ListProducts[x].ads}</td>
            <td>${ListProducts[x].discount}</td>
            <td>${ListProducts[x].category}</td>
            <td>${ListProducts[x].total}</td>
            <td><button onclick = "UpdateProduct(${x})">Update</button></td>
            <td><button onclick = "DeleteProduct(${x})">Delete</button></td>
        </tr>`;
          }
        }
      else {
        
          if (ListProducts[x].category.includes(value.toLowerCase())) {
              table += `<tr>
              <td>${x + 1}</td>
              <td>${ListProducts[x].title}</td>
              <td>${ListProducts[x].price}</td>
              <td>${ListProducts[x].taxes}</td>
              <td>${ListProducts[x].ads}</td>
              <td>${ListProducts[x].discount}</td>
              <td>${ListProducts[x].category}</td>
              <td>${ListProducts[x].total}</td>
              <td><button onclick = "UpdateProduct(${x})">Update</button></td>
              <td><button onclick = "DeleteProduct(${x})">Delete</button></td>
          </tr>`;
          }
        }
  }
  
  document.getElementById("table").innerHTML = table;
}

submit.onclick = function () {
  let new_product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    category: category.value.toLowerCase(),
    count: count.value,
    total: total.innerHTML,
  };
    if (title.value == ''){
      title.style.border = '1px red solid'
    }
    else if (price.value == ''){
      price.style.border = '1px red solid'
    }
    else if (category.value == ''){
      category.style.border = '1px red solid'
    }
    else{
      title.style.border = 'none'
      category.style.border = 'none'
      price.style.border = 'none'
      if (mod == "creat") {
        if (count.value > 1) {
          for (x = 0; x < count.value; x++) {
            ListProducts.push(new_product);
          }
        } else {
          ListProducts.push(new_product);
        }
      } else {
        ListProducts[xvar] = new_product;
        count.style.display = "block";
        submit.innerHTML = "Creat";
        mod = "creat";
      }
      ClearInputs();
    }
  localStorage.setItem("product", JSON.stringify(ListProducts));
  GetTotal();
  ShowProducts();
};
ShowProducts();

let mood = document.querySelector('.mood');


// DARK MOD FUNCTION //
const buttons =document.querySelectorAll('button');
const inputs =document.querySelectorAll('input');
function MoodChange(){
  if (document.querySelector('.mood').classList.contains('active')){
    mood.classList.remove('active');
    document.body.style.backgroundColor = '#fff'
    document.getElementById('table-dark').style.color = '#111'
    document.getElementById('head').style.color = '#111'
    buttons.forEach(button => {
      button.style.backgroundColor = '#3f37c9'
      button.style.color = '#fff'
      button.style.border = 'none'
    })
    inputs.forEach(input => {
      input.style.backgroundColor = '#ccc'
      input.style.color = 'black'
    })
  }else{
    mood.classList.add('active');
    document.body.style.backgroundColor = '#1e1e1e'
    document.getElementById('table-dark').style.color = '#fff'
    document.getElementById('head').style.color = '#fff'
    buttons.forEach(button => {
      button.style.backgroundColor = '#fff'
      button.style.color = 'black'
    })
    inputs.forEach(input => {
      input.style.backgroundColor = '#111'
      input.style.color = 'white'
    })
  }
}
