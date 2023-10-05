
document.addEventListener("DOMContentLoaded", function() {
 
    

    const   manThings = document.querySelector('.man'),
            womanThings = document.querySelector('.woman'),
            header = document.querySelector('.header'),
            choise = document.querySelector('.main_choise'),
            choiseMan = document.querySelector('.main_choise_man'),
            choiseWoman = document.querySelector('.main_choise_woman'),
            manCatalog = document.querySelector('.man_stuff'),
            womanCatalog = document.querySelector('.woman_stuff'),
            footer = document.querySelector('.footer'),
            choiseManWoman = document.querySelector('.choice_sex');
           

            
          
            history.pushState({ page: 'choise' }, null, '#choise');
          
let cardcounter = 0;
      //Make Card Stuff 
      
    
  class CardModel {
      constructor(src, src2, src3,  title, check, arrow, id, parentSelector) {
          this.src = src;
          this.src2 = src2;
          this.src3 = src3;
          this.arrow = arrow;
          this.title = title;
          this.check = check;
          this.parent = document.querySelector(parentSelector);
          this.currentIndex = 0;
          this.element = null;
          this.id = id;
          this.count = cardcounter++;
         
      }
  
      render() {

          this.element = document.createElement('div');
          this.element.className = `mainModel ${this.id}`;
          this.element.id= `${this.count}`

          this.element.innerHTML = `

                  <div class="modelImages">
  
                      <img class = "imgNone" src="${this.src}">
                      <img class = "imgNone" src="${this.src2}">
                      <img class = "imgNone" src="${this.src3}">
                      
                  </div>        
                 
                  <div class="mainModelText_1">
                      ${this.title}
                  </div>
  
                  <div class="mainModelText_2">
                      <span>${this.check}</span>
  
                      <button class="arrow"  id='${this.count}'>
                          ${this.arrow}
                      </button>  
  
                  </div>
  
          `;
  
          this.parent.appendChild(this.element);
         
      };
    
  };
  
  const getCatalog = async (url) => {
         
          const res = await fetch(url);
  
          if (!res.ok) {
              throw new Error(`Could not fetch ${url}, status ${res.status}`);
          }
  
          return await res.json();
  };

  const stuff = function(){

              const slidesWrapper = document.querySelectorAll('.mainModel');
          
              slidesWrapper.forEach((slideWrapper) => {
                  const slides = slideWrapper.querySelectorAll(".imgNone");
                  let currentIndex = 0;

                  slideWrapper.addEventListener("mouseenter", () => {
                      slides[currentIndex].classList.remove("active");
                      currentIndex = (currentIndex + 1) % slides.length;
                      slides[currentIndex].classList.add("active");
                  });

                  slides.forEach((slide) => {
                      slide.classList.add("hidden");
                  });

                  slides[0].classList.add("active");
              });
  }

      // Search doods

const things = document.querySelectorAll('.mainModel');
const searchInputMan = document.getElementById('searchInputMan');
const searchInputWoman = document.getElementById('searchInputWoman');


const searchGoods = function(inputElement, productSelector) {

  inputElement.addEventListener('input', function () {
      const searchQuery = this.value.toLowerCase();
      const products = document.querySelectorAll(productSelector);
      products.forEach(function (product) {
          const productName = product.querySelector('.mainModelText_1').textContent.toLowerCase();
          if (productName.includes(searchQuery)) {
              product.style.display = 'block';
          } else {
              product.style.display = 'none';
          }
      });
  });
};

// Filter goods

const categories = {
    choise_man_tshirt: 'T-Shirt',
    choise_man_jacket: 'Jacket',
    choise_man_pans: 'Pants',
    goods: 'mainModel',
    choise_woman_tshirt: 'T-Shirt',
    choise_woman_jacket: 'Jacket',
    choise_woman_pans: 'Pants'
};

function filterProductsByCategory(category) {
    const things = document.querySelectorAll('.mainModel');

    things.forEach((goodsTS) => {
        if (goodsTS.classList.contains(category)) {
            goodsTS.style.display = 'block';
        } else {
            goodsTS.style.display = 'none';
        }

    });

}

Object.keys(categories).forEach(key => {
    const element = document.querySelector(`.${key}`);
    if (element) {
        element.addEventListener('click', () => {
            console.log(`Filtering by: ${categories[key]}`);
            filterProductsByCategory(categories[key]);
        });
    } else {
        console.warn(`Element .${key} not found!`);
    }
});

const AllGood = document.querySelector('.goodss');
    AllGood.addEventListener('click', ()=>{
        function filterProducts() {
            const things = document.querySelectorAll('.mainModel');
            things.forEach((goodsTS) => {
                if (goodsTS.classList.contains('mainModel')) {
                    goodsTS.style.display = 'block';
                } else {
                    goodsTS.style.display = 'none';
                }
        
            });
        }
        filterProducts()
        
    })

  //   bascket

const mainDiv = document.querySelector('body .main');
const body = document.querySelector('body')
let newBasket = document.createElement('div');
newBasket.classList.add('product')

newBasket.innerHTML = `
                    <div class = 'bascekt_zero'>The basket is empty</div>
                    
                    <a href="catalog.html" class="button_backToStuff">Go to shopping</a>

                    `


// newBasket.style.display = 'none'

function addBlockBascket(category) {
  
  mainDiv.parentNode.insertBefore(newBasket, mainDiv.nextSibling);
  const previousBlock = document.querySelector(category);
  previousBlock.style.display = 'none';
  recalculateTotalPrice() 

}

function recalculateTotalPrice() {
    let totalPrice = 0;  
    const basketItems = newBasket.querySelectorAll('.Basket_Items');
    basketItems.forEach(item => {
        const pricePerItem = parseFloat(item.querySelector('.Basket_price_stuff').textContent.trim());  
        const itemCount = parseInt(item.querySelector('.counter').textContent.trim(), 10);             
        totalPrice += pricePerItem * itemCount;
    });

    const totalElement = newBasket.querySelector('.count_order');
    if (totalElement) {
        totalElement.textContent = totalPrice.toFixed(2) + '$';
    }
}

const basket = document.getElementById('basketstuff');

basket.addEventListener('click', () => {
 
    console.log('click')
  choiseMan.style.display = 'none';
  footer.style.display = 'none';
  newBasket.style.display = 'flex';
  addBlockBascket('.man_stuff');
  history.pushState({ page: 'basket' }, null, '#basket');
  ShowStuff()

});

const basket2 = document.getElementById('basketstufff');

basket2.addEventListener('click', () => {

    console.log('click2')
    choiseWoman.style.display = 'none';
  footer.style.display = 'none';
  newBasket.style.display = 'flex';
  addBlockBascket('.woman_stuff');
  history.pushState({ page: 'basket' }, null, '#basket');
  ShowStuff()

});

async function fetchLastUser() {
    try {
        const response = await fetch('http://localhost:3000/requests');
        const users = await response.json();
        const lastUser = users[users.length - 1];
        return lastUser ? lastUser.email : null;
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}

let stuffInBasket;
let counterEl;

async function AddBasketGoods() {

    const userEmail = await fetchLastUser();
    
    const buttonBasket = document.querySelectorAll('.arrow');

    buttonBasket.forEach((button) => {

      
    button.addEventListener('click', (e) => {
 
          const clickedCard = e.target.closest('.mainModel');
          const productId = "product-" + clickedCard.id;

          const productinfo = {
              id: clickedCard.id,
              imgSrc: clickedCard.querySelector('.imgNone').getAttribute('src'),
              title: clickedCard.querySelector('.mainModelText_1').innerText,
              price: clickedCard.querySelector('.mainModelText_2 span').textContent,
              count: 1
          };

         
          stuffInBasket = newBasket.querySelector(`#${productId}`);

        if (stuffInBasket && stuffInBasket.querySelector('.counter')) {

              counterEl = parseInt(stuffInBasket.querySelector('.counter').textContent, 10);
              counterEl++;
              stuffInBasket.querySelector('.counter').innerText = counterEl;
              recalculateTotalPrice();

        } else {
           
              const cartItemHTML = `
              <div class="Basket_Items" id="${productId}">
                  <div class="Basket_img">
                      <img class="imgNone" src=${productinfo.imgSrc}>
                  </div>        

                  <div class = "Basket_block">
                      <div class="Basket_name_stuff">
                          ${productinfo.title}
                      </div>
                      <div class="Basket_price_stuff">
                          ${productinfo.price}
                      </div>
                      <div class = "Basket_count_stuff">
                          <button class="Basket_buton_plus" >+</button>
                          <div class="counter">1</div>
                          <button class="Basket_buton_minus">-</button>
                      </div>
                  
                  </div>
                  
              </div>
              `;

              newBasket.insertAdjacentHTML('beforeend', cartItemHTML);

            function replaceButtonsAndAddEvent(buttonClass, action) {

                const buttons = newBasket.querySelectorAll(buttonClass);
            
               
                buttons.forEach((button) => {
                    const clone = button.cloneNode(true);
                    button.parentNode.replaceChild(clone, button);
                });
            
              
                const updatedButtons = newBasket.querySelectorAll(buttonClass);
            
                
                updatedButtons.forEach((button) => {
                    button.addEventListener('click', (event) => {
                        const container = event.target.closest('.Basket_Items');
                        if (container) {
                            let counterEl = +container.querySelector('.counter').textContent;
                            counterEl = action === 'increment' ? ++counterEl : --counterEl;
                            container.querySelector('.counter').innerText = counterEl;
                            recalculateTotalPrice();
                         
                        }if( container.querySelector('.counter').innerText == "0"){
                            container.remove();
                            
                            if (!newBasket.querySelector('.Basket_Items')) {
                                newBasket.querySelector('.goods_purchase').remove()
                            } else {
                             
                            }
                        }
                    });
                });
            }
            
        
            replaceButtonsAndAddEvent('.Basket_buton_plus', 'increment');
            replaceButtonsAndAddEvent('.Basket_buton_minus', 'decrement');
            
            
        }
         
        
         
            if(newBasket.querySelector('.Basket_Items') && !newBasket.querySelector('#uniqueProductDesignId')){

                const emailDisplay = userEmail ? `<div class="user-email">Email: ${userEmail}</div>` : '';
            
                const productDesign  = `

                    <div id="uniqueProductDesignId" class = "goods_purchase">
                
                        <div class = "order">
                            <div class = "text_order">
                                Amount of your order                        
                            </div>

                            <div class= "order_counter" >
                                <div class = "count_order_text">
                                    Total: 
                                </div>

                                <div class ="count_order" >
                                
                                </div>
                            </div>
                            
                            ${emailDisplay}

                            <div class = "order_phone">
                                <div class = "order_phone_text">Your phone number: </div>  
                                <input required  name="phone" type="phone" class="order_phone_input" >
                            </div>
                                
                
                            <div class = "button_order_make">
                                <button class = "button_order">
                                    Buy product
                                </button>
                            </div>
                        </div>
                        
                    </div>
                `
                newBasket.insertAdjacentHTML('afterbegin', productDesign);  
             
            }  

        const postData = async (url, data) => {
            try {
                let response = await $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(data)
                });
                return response;
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        };

    
        
        $(document).ready(function() {
            function displayEmptyBasketMessage() {
                $(newBasket).html(`
                    <div class = 'bascekt_zero'>The basket is empty</div>
                    
                    <a href="catalog.html" class="button_backToStuff">Go to shopping</a>
                `);
            }
        
          
            if ($(newBasket).find('.Basket_Items').length === 0) {
                displayEmptyBasketMessage();
            }else if($(newBasket).find('.Basket_Items').length !== 0){
                $(newBasket).find('div:contains("The basket is empty"), .button_backToStuff').remove();
            }
            
           
            

            $(newBasket).find('.button_order').off('click').on('click', async function(e) {
                e.preventDefault();
            
                const inputPhone = $('.order_phone_input').val();
            
                let orderItems = [];
                $('.Basket_Items').each(function() {
                    const title = $(this).find('.Basket_name_stuff').text().trim();
                    const count = parseInt($(this).find('.counter').text(), 10);
                    const total = parseFloat($('.count_order').text());
            
                    orderItems.push({ title, count, total });
                });
            
                const combinedTitle = orderItems.map(item => item.title).join(', ');
                const combinedCount = orderItems.map(item => `${item.count}:${item.title}`).join(', ');
        
                const jsonData = {
                    inputPhone,
                    orderItems: {
                        title: combinedTitle,
                        count: combinedCount,
                        total:parseFloat($('.count_order').text())
                        
                    }
                };
            
                try {
                    const data = await postData('http://localhost:3000/order', jsonData);
                    console.log(data);
                    
                    alert('The order is ready');
                    displayEmptyBasketMessage();

                } catch (error) {
                    console.log('Error:', error);
                }
            });
        });
        
    });

     
  });

}


// Choise stuff

manThings.addEventListener('click', () => {

    showManCatalog();

    history.pushState({ page: 'man' }, null, '#man');

    document.querySelector('.man_stuff').innerHTML = '';
  
    getCatalog('http://localhost:3000/man_card')
      .then(data => {
          data.forEach(({ img, img2, img3, title, check, arrow, id }) => {
              new CardModel(img,img2, img3, title, check, arrow, id, '.man_stuff').render();
          });

          AddBasketGoods ();       
          stuff();
          searchGoods(searchInputMan, '.man_stuff .mainModel');

         
        });

})



womanThings.addEventListener('click', () => {
    
    showWomanCatalog()
    history.pushState({ page: 'ttt' }, null, '#ttt');


    document.querySelector('.woman_stuff').innerHTML = '';

  getCatalog('http://localhost:3000/wooman_card')
    .then(data => {
      data.forEach(({ img, img2, img3, title, check, arrow, id }) => {
          new CardModel(img,img2, img3, title, check, arrow, id, '.woman_stuff').render();
      });
      AddBasketGoods ();
      stuff();
      searchGoods(searchInputWoman, '.woman_stuff .mainModel');

    });


})




function showManCatalog(){
    header.style.display = 'none'
    choiseWoman.style.display = 'none'
    footer.style.display = 'block'
    choiseMan.style.display = 'flex';
    womanCatalog.style.display = 'none'
    manCatalog.style.display = 'flex'
    newBasket.style.display = 'none';
    choise.style.display = 'flex'
}

function showWomanCatalog(){
    console.log("Фрагмент 'woman' найден в URL");
    header.style.display = 'none'
    choiseMan.style.display = 'none'
    footer.style.display = 'block'
    manCatalog.style.display = 'none'
    womanCatalog.style.display = 'flex'
    newBasket.style.display = 'none';
    choiseWoman.style.display = 'flex'
    choise.style.display = 'flex'
    
 
}



function ShowStuff (){

    console.log('popstate');
    var currentURL = window.location.href;


if (currentURL.indexOf("choise") !== -1) {
   
    console.log(" URL ");
    choiseMan.style.display = 'none';
    choiseMan.classList.remove('active');
    // choiseMan.classList.add('hidden')
    choiseManWoman.classList.add('active')
    choise.classList.remove('active');
    // choise.classList.add('hidden');
    choise.style.display = 'none'
    header.style.display = 'block'
    newBasket.style.display = 'none';
     choiseWoman.style.display = 'none'
   
  
} else if(currentURL.indexOf("man") !== -1) {
 
    showManCatalog()
  
}else if(currentURL.indexOf("basket") !== -1){
    choiseMan.style.display = 'none';
    footer.style.display = 'none';
    newBasket.style.display = 'flex';
    manCatalog.style.display = 'none';
    choise.style.display = 'none'


}else if(currentURL.indexOf("ttt") !== -1) {
    showWomanCatalog()
}
}

window.addEventListener('popstate', ShowStuff);
ShowStuff()

});






