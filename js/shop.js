const TickerImgFirst = document.querySelector('.ticker_img_first'),
      TickerImgSecond = document.querySelector('.ticker_img_second');

TickerImgSecond.innerHTML=TickerImgFirst.innerHTML;

// Registration via Promise


const buttonSign = document.querySelector('.sign'),
      modalSign = document.querySelector('.signModelForm'),
      navigationUl = document.querySelector('.link__page')


            buttonSign.addEventListener('click', ()=>{ 
                modalSign.style.display = 'block';    
            });

const registrationForm = document.querySelector('.registrForm'),
      emailInput = document.querySelector('.email-input'),
      passwordInput = document.querySelector('.password-input');
      
    
    

const displayHello = (email) => {
        const logoutButton = document.createElement('button');
        logoutButton.classList.add('loggout_btn')
        logoutButton.textContent = 'Logout';
      
        const account = document.createElement('li');
        account.classList.add('name_hello')
         account.textContent = `${email}`;
   
    logoutButton.addEventListener('click', () => {
        account.remove(); 
        buttonSign.style.display = 'block'; 
        logoutButton.style.display = 'none';
       
    });

    account.appendChild(logoutButton);
    navigationUl.append(account);
    logoutButton.style.display = 'block';

    buttonSign.style.display = 'none';
};

const fetchUsers = async () => {
        const response = await fetch('http://localhost:3000/requests');
        const users = await response.json();
        const lastUser = users[users.length - 1]; 
        if (lastUser && lastUser.email) {
            displayHello(lastUser.email);
        }
};
    


const postData = async (url, data)=>{
    res = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: data
});

return await res.json();
}
registrationForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    const json =  JSON.stringify({ email, password });
  
    localStorage.setItem('Registre', JSON.stringify({ email, password }));

    postData('http://localhost:3000/requests', json)
    .then(data => {
        console.log(data);
        alert('Регистрация успешна');
         modalSign.style.display = 'none';
         displayHello(email)
    }).catch(() => {
        console.log('wrong')
    })
});

document.addEventListener('DOMContentLoaded', fetchUsers);







// Card
class CardModel {
    constructor(src, src2, src3,  title, check, arrow, parentSelector) {
        this.src = src;
        this.src2 = src2;
        this.src3 = src3;
        this.arrow = arrow;
        this.title = title;
        this.check = check;
        this.parent = document.querySelector(parentSelector);
        this.currentIndex = 0;
        this.element = null;
       
    }

    render() {
         this.element = document.createElement('div');
      

        this.element.className = 'mainModel';
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
                    ${this.check}

                    <button class="arrow">
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

getCatalog('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({ img, img2, img3, title, check, arrow }) => {
            new CardModel(img,img2, img3, title, check, arrow, '.main_second_model').render();
        });
              
        const slidesWrapper = document.querySelectorAll('.mainModel');

        slidesWrapper.forEach((slideWrapper) => {
            const slides = slideWrapper.querySelectorAll(".imgNone");
            let currentIndex = 0;

            slideWrapper.addEventListener("mouseenter", () => {
                slides[currentIndex].classList.remove("visible");
                currentIndex = (currentIndex + 1) % slides.length;
                slides[currentIndex].classList.add("visible");
            });

            slides.forEach((slide) => {
                slide.classList.add("hidden");
            });

            slides[0].classList.add("visible");
        });

    });

    // Form via fromData

    const  form = document.querySelector('.main_fours_form'),
            ModalForm = document.querySelector('.mainFormModel'),
            ModalFormText = document.querySelector('.mainFormModelText');

    const message ={
        loading: "Loading...",
        Success: "Thank you, we'll be in touch so",
        fail: "Oops, something went wrong"
    }
 
        form.addEventListener('submit', (e)=>{

            e.preventDefault();

            ModalForm.style.display = 'block';


            let stattusMessage = document.createElement('div');
            stattusMessage.classList.add('status');
            stattusMessage.textContent = message.loading;
            ModalFormText.append(stattusMessage);
            ModalForm.append(ModalFormText);
           
        
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);


            request.addEventListener('load', ()=>{
                if(request.status === 200){
                    console.log(request.response);
                    stattusMessage.textContent = message.Success;
                    form.reset();
                    setTimeout(()=>{
                        stattusMessage.remove()
                        ModalForm.style.display = 'none';
                    },3000);
                   
                }else{
                    stattusMessage.textContent = message.fail;
                }
            });



        });




    // Arrive to url (button)

    const buttonToUrl  = document.querySelector('.main_first_button'),
          buttonToUrl2 = document.querySelector('.main_third_button')

          const ClickToUrl =  function(button){
            button.addEventListener("click", function() {
               
                window.location.href = "catalog.html";
                console.log('click')
            });
          }

          ClickToUrl(buttonToUrl);
          ClickToUrl(buttonToUrl2);

      
          

          



          



   