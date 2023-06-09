export class orderService {
    
    static addProductToCart(product, quantity) {

        let shoppingCart = sessionStorage.getItem("shoppingCart");

        if(!shoppingCart) {
            shoppingCart = [];
        } else {
            shoppingCart = JSON.parse(shoppingCart);
        }

        if(shoppingCart.length === 0){
            shoppingCart.push({id: product.value.id, name: product.value.name, price: product.value.price, quantity: parseInt(quantity)});
        } else {

            let foundProduct = shoppingCart.find(p => p.id === product.value.id)

            if(foundProduct !== undefined){

                foundProduct.quantity += parseInt(quantity);

                let index = shoppingCart.findIndex(p => p.name === foundProduct.name)

                shoppingCart.splice(index, 1, foundProduct)
            } else {
                shoppingCart.push({id: product.value.id, name: product.value.name, price: product.value.price, quantity: parseInt(quantity)});
            }
        }

        sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }

    static getShoppingCartContent() {
        
        let shoppingCart = sessionStorage.getItem("shoppingCart");

        shoppingCart = JSON.parse(shoppingCart);

        return shoppingCart;
    }

    static alterQuantity(value, productId) {

        let shoppingCart = sessionStorage.getItem("shoppingCart");

        shoppingCart = JSON.parse(shoppingCart);

        let productQuantityToAlter = shoppingCart.find(p => p.id === productId);

        productQuantityToAlter.quantity += parseInt(value);

        let indexOfProduct = shoppingCart.findIndex(p => p.name === productQuantityToAlter.name);

        if(productQuantityToAlter.quantity < 1) {
            shoppingCart.splice(indexOfProduct, 1)
        } else {
           shoppingCart.splice(indexOfProduct, 1, productQuantityToAlter);
        }

        sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }

    static async placeOrder(totalCost, customerId) {
        
        let timeOfOrder = this.getTodaysDate();

        let shoppingCart = this.getShoppingCartContent();
            
        let newOrder = {
            customerId: customerId,
            products: shoppingCart,
            cost: totalCost.toFixed(2),
            date: timeOfOrder
        };
        
        await fetch('http://localhost:7000/orders', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newOrder)
            
        }).catch(error => console.log(error.message))

        sessionStorage.clear();
    }

    static getTodaysDate() {
        
        const dateFetcher = new Date(); 

        let year = dateFetcher.getFullYear();
        let month = dateFetcher.getMonth();
        let day = dateFetcher.getDay();

        let hours = dateFetcher.getHours();
        let minutes = dateFetcher.getMinutes();
        let seconds = dateFetcher.getSeconds();

        let dateString = `${day}/${month}, ${year} (${hours}:${minutes}:${seconds})`

        return dateString;
    }

    static getDeliveryTime() {
        return Math.floor(Math.random() * 30 + 15);
    }
}