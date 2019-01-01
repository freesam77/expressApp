let mongoose = require("mongoose"),
  Post = require("./models/post"),
  faker = require('faker');

let data=[];

let generateData = (num) => {
  for(i=0; i< num; i++){
    let ent = [];
    ent[i] = {
      name: faker.commerce.productName(),
      image: faker.internet.avatar(),
      // image: faker.image.image(),
      desc: faker.lorem.paragraph(),
      author:{
        id: 159023409543,
        username: faker.internet.userName()
      }
    }
    data.push(ent[i])
  }

}

generateData(10);


let seedDB = () => {
  // Remove all posts
  Post.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("data removed");
      // add few posts
      data.forEach(seed => {
          Post.create(seed, function(err, post){
            if (err) {
              console.log(err);
            }
            console.log("created post: " + post.name);
          });
        });
    }
  });
};

module.exports = seedDB;
