// Récupération des données(produits) présent dans le localStorage

let localStorageProducts = JSON.parse(localStorage.getItem('product'));
console.table(localStorageProducts)

// Fonction permettant d'afficher les produits qui sont présent dans le panier (si le panier n'est pas vide)

if (localStorageProducts === null || localStorageProducts == 0) {
  console.log("Panier vide !")
  let panierVide = document.createElement("p");
  document.querySelector("#cart__items").appendChild(panierVide );
  panierVide.textContent = "Votre panier est vide ! Retourner sur la page d'accueil afin de sélectionner des produits.";
}

else{

  for (let product in localStorageProducts) {

    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute(
      "data-id",
      localStorageProducts[product].id
    );

    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = localStorageProducts[product].image;
    productImg.alt = localStorageProducts[product].alt;

    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className =
      "cart__item__content__titlePrice";

    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.textContent = localStorageProducts[product].name;

    let productColor = document.createElement("p");
    productItemContentTitlePrice.appendChild(productColor);
    productColor.textContent = localStorageProducts[product].color;

    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.textContent = localStorageProducts[product].price + " €";

    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(
      productItemContentSettingsQuantity
    );
    productItemContentSettingsQuantity.className =
      "cart__item__content__settings__quantity";

    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.textContent = "Quantité  : ";

    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = localStorageProducts[product].quantity;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("name", "itemQuantity");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");

    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className =
      "cart__item__content__settings__delete";

    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.textContent = "Supprimer";
  }
}


  // Fonction pour la supression d'un article du panier

function deleteArticle() {
  const deleteItem = document.querySelectorAll('.deleteItem');

  for (let d = 0; d < deleteItem.length; d++) { 
    deleteItem[d].addEventListener('click', (event) => {
    event.preventDefault();
    localStorageProducts.splice(d, 1);
    localStorage.setItem('product', JSON.stringify(localStorageProducts));
    alert('Votre article a été supprimé');
    location.reload();
    });
  }
}
deleteArticle();


  // Fonction pour le changement de la quantité d'un produit présent dans le panier

function changeQuantity() {
  let itemQuantity = document.querySelectorAll('.itemQuantity');
  for (let q = 0; q < itemQuantity.length; q++) {
    itemQuantity[q].addEventListener('change', (event) => {
    event.preventDefault();
    let itemNewQuantity = itemQuantity[q].value;
    const upStorage = {
      id: localStorageProducts[q].id,
      image: localStorageProducts[q].image,
      alt: localStorageProducts[q].alt,
      name: localStorageProducts[q].name,
      color: localStorageProducts[q].color,
      price: localStorageProducts[q].price,   
      quantity: itemNewQuantity,
    };
    localStorageProducts[q] = upStorage;
    localStorage.setItem('product', JSON.stringify(localStorageProducts));
    alert('Votre panier est à jour.');
    location.reload();
    })
  }
}
changeQuantity();


  // Fonction pour le calcul du prix total du panier

function priceCalcul() {
  total = 0;
  const priceCalcul = [];
  for (let p = 0; p < localStorageProducts.length; p++) {
    const cartAmount = localStorageProducts[p].price * localStorageProducts[p].quantity;
    priceCalcul.push(cartAmount);
    const reduce = (previousValue, currentValue) => previousValue + currentValue;
    total = priceCalcul.reduce(reduce);
  }
  const totalPrice = document.getElementById('totalPrice');
  totalPrice.textContent = total;
}

priceCalcul();


  // Fonction pour le calcul du nombre total d'articles

function totalArticle() {
  let totalItems = 0;
  for (let t in localStorageProducts) {
    const Quantity = parseInt(localStorageProducts[t].quantity, 10);
    totalItems += Quantity;
  }
  const totalQuantity = document.getElementById('totalQuantity');
  totalQuantity.textContent = totalItems;
}
totalArticle();


// Contenant nécessaire pour le formulaire

class Form {
  constructor() {
    this.firstName = document.getElementById('firstName').value;
    this.lastName = document.getElementById('lastName').value;
    this.address = document.getElementById('address').value;
    this.city = document.getElementById('city').value;
    this.email = document.getElementById('email').value;
  }
}

// Fonction permettant de tester la validité de chaque partie du formulaire

function validation() {
  const contact = new Form();

    // Fonction pour le prénom

  function ValidFirstName() {
    const firstNameRegex = contact.firstName;
    const firstNameErrorMsg =
      document.getElementById('firstNameErrorMsg');
    if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(firstNameRegex)) {
      firstNameErrorMsg.innerText = '';
      return true;
    } else {
      firstNameErrorMsg.innerText =
        'Doit contenir que des lettres, avec un minmum de 3 caractères';
      firstNameErrorMsg.style.color = 'red';
    }
  }

    // Fonction pour le nom

  function ValidLastName() {
    const lastNameRegex = contact.lastName;
    const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(lastNameRegex)) {
      lastNameErrorMsg.innerText = '';
      return true;
    } else {
      lastNameErrorMsg.innerText =
        'Doit contenir que des lettres, avec un minmum de 3 caractères';
      lastNameErrorMsg.style.color = 'red';
    }
  }

    // Fonction pour l'adresse

  function ValidAddress() {
    const addressRegex = contact.address;
    const addressErrorMsg = document.getElementById('addressErrorMsg');
    if (/^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/.test(addressRegex)) {
      addressErrorMsg.innerText = '';
      return true;
    } else {
      addressErrorMsg.innerText = `Contient des caractères non valide`;
      addressErrorMsg.style.color = 'red';
    }
  }

    // Fonction pour la ville

  function ValidCity() {
    const cityRegex = contact.city;
    const cityErrorMsg = document.getElementById('cityErrorMsg');
    if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(cityRegex)) {
      cityErrorMsg.innerText = '';
      return true;
    } else {
      cityErrorMsg.innerText =
        'Doit contenir que des lettres, avec un minmum de 3 caractères';
      cityErrorMsg.style.color = 'red';
    }
  }

    // Fonction pour l'email

  function ValidEmail() {
    const emailRegex = contact.email;
    const emailErrorMsg = document.getElementById('emailErrorMsg');
    if (/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(emailRegex)) {
      emailErrorMsg.innerText = '';
      return true;
    } else {
      emailErrorMsg.innerText =
        'Email non valide';
      emailErrorMsg.style.color = 'red';
    }
  }

  // Vérification des champs du formulaire

  if (
    ValidFirstName() &&
    ValidLastName() &&
    ValidAddress() &&
    ValidCity() &&
    ValidEmail()
  ) {
    return true;
  } else {
    alert('Vérifier les données du formulaire');
    return false;
  }
}


// Fonction pour passer la commande, qui récupere ainsi les données du formulaire et des articles du panier

function postOrder() {
  const order = document.getElementById('order');
  order.addEventListener('click', (event) => {
    event.preventDefault();
    if (validation()) {
      const products = [];
      for (let index = 0; index < localStorageProducts.length; index++) {
        products.push(localStorageProducts[index].id);
      }
      console.log(products);

      const contactAndProducts = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products,
      };
      console.log(contactAndProducts);

      let letFetch = 
      fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactAndProducts),
        
      })
        .then((response) => response.json())
        .then((id) => {
          console.log(products);
          window.location.href = `confirmation.html?id=${id.orderId}`;
        })
        .catch((error) => {
          alert(
            'Le serveur de répond pas, veuillez patienter.'
          );
          console.log(error);
          
        });
        console.log(letFetch); 
    }
    
  });
}
postOrder();


