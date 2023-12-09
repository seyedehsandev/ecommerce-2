let products =[
    {id:1 , brand: "apple", category:"phone" , title:"Apple Iphone 11" , price:600 ,img:"images/iphone11.webp"},
    {id:2 , brand: "apple", category:"phone" , title:"Apple Iphone 13" , price:750 ,img:"images/iphone13.webp"},
    {id:3 , brand: "apple", category:"phone" , title:"Apple Iphone 13 Pro" , price:900 ,img:"images/iphone13pro.webp"},
    {id:4 , brand: "apple", category:"phone" , title:"Apple Iphone 13 ProMax" , price:1200 ,img:"images/iphone13promax.webp"},
    {id:5 , brand: "nokia", category:"phone" , title:"Nokia C31" , price:350 ,img:"images/nokiac31.webp"},
    {id:6 , brand: "nokia", category:"phone" , title:"Nokia 105" , price:50 ,img:"images/nokia105.webp"},
    {id:7 , brand: "nokia", category:"phone" , title:"Nokia G10" , price:200 ,img:"images/nokiag10.webp"},
    {id:7 , brand: "xiaomi", category:"phone" , title:"Xiaomi Note 12S" , price:300 ,img:"images/note12s.webp"},
    {id:8 , brand: "xiaomi", category:"phone" , title:"Xiaomi Note 12 Pro" , price:370 ,img:"images/note12pro.webp"},
    {id:9 , brand: "xiaomi", category:"phone" , title:"Xiaomi Poco F5" , price:380 ,img:"images/pocof5.webp"},
    {id:10 , brand: "xiaomi", category:"phone" , title:"Xiaomi Poco X5" , price:360 ,img:"images/pocox5.webp"},
    {id:11 , brand: "nothing", category:"phone" , title:"Nothing Phone 1" , price:300 ,img:"images/nothing1.webp"},
    {id:12 , brand: "nothing", category:"phone" , title:"Nothing Phone 2" , price:400 ,img:"images/nothing2.webp"},
    {id:13 , brand: "samsung", category:"phone" , title:"Samsung Galaxy A14" , price:220 ,img:"images/samsunga14.webp"},
    {id:14 , brand: "samsung", category:"phone" , title:"Samsung Galaxy A34" , price:270 ,img:"images/samsunga34.webp"},
    {id:15 , brand: "samsung", category:"phone" , title:"Samsung Galaxy S23 Ultra" , price:1200 ,img:"images/samsungs23.webp"},
    {id:16 , brand: "samsung", category:"phone" , title:"Samsung Galaxy S23 FE" , price:750 ,img:"images/samsungs23fe.webp"},
    {id:17 , brand: "asus", category:"laptop" , title:"Asus ROG" , price:650 ,img:"images/asusrog.webp"},
    {id:18 , brand: "asus", category:"laptop" , title:"Asus TUF 15" , price:600 ,img:"images/asustuf15.webp"},
    {id:19 , brand: "asus", category:"laptop" , title:"Asus Zenbook Pro" , price:950 ,img:"images/asuszenbookpro.webp"},

   
]





let productContainer = document.querySelector(".products")
let buyBtn = document.querySelector("button")
let cartEl = document.querySelector(".fixed")
let menuEl =document.querySelector(".menu")
let totalPriceEl = document.querySelector(".totalPrice")
let closeBtn = document.querySelector(".closeCart")
let resetSearchBtn= document.querySelector(".searchReset")
let cartProCon = document.querySelector(".inCartProductCon")
let noEl = document.querySelector(".no")
let cartCountEl = document.querySelector(".cartCount")
let timeEl = document.querySelector(".time")

// category 

const deviceSelect = document.getElementById('deviceSelect');
const brandSelect = document.getElementById('brands');
const priceSelect = document.getElementById('prices');
const sortSelect = document.getElementById('sort');

// ******
const result = document.getElementById('result');
let searchInput = document.querySelector(".searchInput")
let clearCart = document.querySelector(".clearCart")




// *****
let cart =[]
let mainCategory = "all"
let mainBrand = "all"
let mainPrice = "all"
let mainsort = "all"
let isCartShown = false





let makeProduct = (category, brand, price ,sort,mainProduct) => {

    productContainer.innerHTML=""
    let filteredProducts = mainProduct
    if(category !== "all"){

    filteredProducts= filteredProducts.filter(item=> item.category === category)

    }

    if(brand !== "all"){


    filteredProducts= filteredProducts.filter(item=> item.brand === brand)
    
    }
    // price selectopn
    if (price !== "all"){


        if (price === "p300"){
            filteredProducts= filteredProducts.filter(item=> item.price < 300)


        }else if (price === "p600"){

            filteredProducts= filteredProducts.filter(item=> item.price > 300 && item.price < 600 )


        }else if (price === "p1000"){

            filteredProducts= filteredProducts.filter(item=> item.price > 600 )

        }


    }
    if (sort !== "all"){

        if (sort === "lth"){

            filteredProducts= filteredProducts.sort((a, b) => a.price - b.price)


        }else if (sort === "htl"){

            filteredProducts= filteredProducts.sort((a, b) => b.price - a.price)



        }

    }
    


    filteredProducts.forEach( (product)=>{

        let productEl = document.createElement("div")
        productEl.setAttribute("class" , "product")

        let imgEl = document.createElement("img")
        imgEl.setAttribute("src" , product.img)

        let bottomEl = document.createElement("div")
        bottomEl.setAttribute("class" , "bottomProduct")


        let titleEl = document.createElement("p")
        titleEl.setAttribute("class" , "title")
        titleEl.innerText=product.title


        let priceEl = document.createElement("p")
        priceEl.setAttribute("class" , "productPrice")
        priceEl.innerText=product.price + "$"

        let buyBtn = document.createElement("button")
        buyBtn.addEventListener("click", () => {
            buyFun(product.id); 
        });
        buyBtn.innerText="Add to Cart"
        

        bottomEl.append(titleEl,priceEl,buyBtn)
        productEl.append(imgEl,bottomEl)

        productContainer.append(productEl)

 
    
    })
    if (!filteredProducts.length){

        noEl.style.display= "flex"

    }else {

        noEl.style.display= "none"




    }



}
makeProduct(mainCategory , mainBrand , mainPrice, mainsort, products)






let buyFun = (productId)=>{

    let mainItem = products.find((x)=> x.id === productId )

    let isInCart = cart.some(product => product.id == mainItem.id)


    console.log("isInCart : ", isInCart)
    if (isInCart){
        
        let sameProductIndex = cart.findIndex(item => item.id === mainItem.id)

        cart[sameProductIndex].count = cart[sameProductIndex].count+1



    }else{

         mainItem ={
            id:mainItem.id,
            title:mainItem.title,
            price:mainItem.price,
            img:mainItem.img,
            count:1
        }

        cart.push(mainItem)
    }
    console.log(cart , "cart")
    totalPrice(cart)


}
// ***** 
// brands 
brandSelect.addEventListener('change', function () {

    const selectedBrand = brandSelect.value;
    mainBrand = selectedBrand
    makeProduct(mainCategory , mainBrand , mainPrice, mainsort, products)

});
// *****
// category 
deviceSelect.addEventListener('change', function () {

    const selectedCategory = deviceSelect.value;
    mainCategory = selectedCategory
    makeProduct(mainCategory , mainBrand , mainPrice, mainsort, products)

});
// price select  
priceSelect.addEventListener('change', function () {

    const selectedPrices = priceSelect.value;
    mainPrice = selectedPrices
    console.log(mainPrice)
    makeProduct(mainCategory , mainBrand , mainPrice, mainsort, products)

});
// sorting 
sortSelect.addEventListener('change', function () {

    const selectedSort = sortSelect.value;
    mainsort = selectedSort
    console.log(mainsort)
    makeProduct(mainCategory , mainBrand , mainPrice, mainsort, products)

})







// ******
// total price 
let totalPrice = (cart)=>{



    const sum = cart.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.price * currentItem.count);
      }, 0);
      totalPriceEl.innerText = `Total Price:${sum}$`
     
      console.log(`مجموع حساب: ${sum}$`)

      cart.map((product)=>{

        console.log(product.title , 'تعداد' + product.count , "قیمت واحد : " + product.price)
        
      })
      cartProCon.innerHTML=""
   if(cart.length){

    cart.forEach((product)=>{




        let productEl = document.createElement("div")
        productEl.setAttribute("class" , "cartProduct")

        let imgEl = document.createElement("img")
        imgEl.setAttribute("src" , product.img)

        let rightEl = document.createElement("div")
        rightEl.setAttribute("class" , "cartRight")

        let titleEl = document.createElement("div")
        titleEl.setAttribute("class" , "cartTitle")
        titleEl.innerText = product.title

        let newEl = document.createElement("div")
        let countEl = document.createElement("h4")
        countEl.innerText="Count: "+ product.count
        let priceEl = document.createElement("h5")
        priceEl.innerText="Price: "+ product.price + "$"

        let btnEl = document.createElement("div")
        btnEl.setAttribute("class" , "cartBtn")

        let removebtn = document.createElement("button")
        removebtn.innerHTML =`<span class="material-symbols-outlined">delete</span>`
        removebtn.addEventListener("click" ,()=>{
            removeFromCart(product.id)
        } )
        let countbtn = document.createElement("button")
        countbtn.innerHTML = `<span class="material-symbols-outlined">keyboard_double_arrow_down</span>`
        countbtn.addEventListener("click" ,()=>{
            countDown(product.id)
        } )
        let countUpbtn = document.createElement("button")
        countUpbtn.innerHTML = `<span class="material-symbols-outlined">keyboard_double_arrow_up</span>`
        countUpbtn.addEventListener("click" ,()=>{
            buyFun(product.id)
        } )


        newEl.append(countEl , priceEl)
        btnEl.append(removebtn, countbtn , countUpbtn)
        rightEl.append(titleEl , newEl , btnEl)
        productEl.append(imgEl , rightEl)


        cartProCon.append(productEl)
        console.log(cartProCon)

    })
   }

   cartCountEl.innerText= cart.length



}
const removeFromCart = (id)=> {

    cart = cart.filter(product => product.id !== id )
    totalPrice(cart)



}

const countDown = (id) =>{

    let sameProductIndex = cart.findIndex(item => item.id === id)

    if (cart[sameProductIndex].count !== 1){

        cart[sameProductIndex].count = cart[sameProductIndex].count-1

    }else {

        removeFromCart(id)

    }
    totalPrice(cart)




}





// remove all products from cart 
clearCart.addEventListener("click" , ()=>{

    console.log("cart cleared!")
    cart=[]

    totalPrice(cart)


})
// ***** 

// menu Funcs
menuEl.addEventListener("click" , ()=>{

    console.log('menu Clicked')
    timeEl.style.display="none"
    isCartShown = !isCartShown

    if(isCartShown){

        cartEl.style.display="flex"


    }else{

        cartEl.style.display="none"

    }

    console.log(isCartShown)
})

// **** 
closeBtn.addEventListener("click" ,()=>{


    if(isCartShown){

        isCartShown = false
        cartEl.style.display="none"
        timeEl.style.display="flex"


    }
    

} )
// search 

searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && searchInput.value.trim()) {
        console.log(searchInput.value)
        let mainSearch = searchInput.value.toLowerCase().trim();
        searchInput.value = "";

        let searchedProducts = products.filter((product) => {
            return product.title.toLowerCase().includes(mainSearch);
        });
        makeProduct(mainCategory , mainBrand , mainPrice, mainsort, searchedProducts)
        console.log("category: " + mainCategory, "searchedProducts :" + searchedProducts);
    }
});
resetSearchBtn.addEventListener("click" , ()=>{

    makeProduct("all" , "all" , "all", "all", products)
    sortSelect.value = "all"
    brandSelect.value="all"
    deviceSelect.value="all"
    priceSelect.value="all"




})

window.addEventListener("scroll" , event =>{
    console.log(event)
})

let timing = ()=>{
    let time = new Date
    let hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()
    let min = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
    let pm = hour > 12 ? "PM" : "AM" 
    let timeToShow = hour + ":"+ min + " " + pm
    console.log(timeToShow)
    timeEl.innerText=timeToShow
}
timing()
setInterval( timing,60000)





