let faker = require('faker');

let genUser = [];

let generateRandom = (obj,num) => {

    for(i=0;i<num;i++){

        let ent = [];
        let randomName = faker.commerce.productName();
        let randomPrice = faker.commerce.price();
        ent[i] = {
            name: randomName,
            price: "$"+randomPrice
        }

        obj.push(ent[i])
    }

}

generateRandom(genUser,10)

console.log("This is all user that has been generated:")
console.log(genUser)