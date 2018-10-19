let mongoose = require("mongoose"),
  post = require("./models/post"),
  Comment = require("./models/comment");

let data = [
  {
    name: "Venom",
    image:
      "https://vignette.wikia.nocookie.net/marveldatabase/images/5/52/Venom_Vol_1_12_Textless.jpg/revision/latest/scale-to-width-down/180?cb=20121229233851",
    desc:
      'The new "costume" had several useful properties -- the ability to mimic other forms of clothing, a "dimensional aperture" which could store small objects without adding bulk to the costume, and its own source of webbing -- which Spider-Man initially attributed to its alien origins. After returning to Earth, the costume could not stand to be separated from Parker for very long, and it often engulfed the sleeping hero.'
  },
  {
    name: "Klyntar",
    image:
      "https://vignette.wikia.nocookie.net/marveldatabase/images/0/02/Klyntar_from_New_Avengers_Vol_1_35_001.jpg/revision/latest/scale-to-width-down/700?cb=20101004165845",
    desc:
      "There are many stories about us across the galaxy. Some true, some false... some concocted by renegade members of our own species. And because of this we are known by many names... we prefer to be called the Klyntar."
  },
  {
    name: "Carnage",
    image:
      "https://vignette.wikia.nocookie.net/marveldatabase/images/6/6d/Carnage_Vol_1_5_Textless.jpg/revision/latest/scale-to-width-down/180?cb=20110323175538",
    desc:
      "Venom proved to be a particularly malicious foe, and broke several laws in pursuit of revenge against Spider-Man. On one occasion, while Brock was incarcerated for his crimes as Venom -- and while he patiently waited for the escaped symbiote to free him -- he shared a cell with serial killer Cletus Kasady. The symbiote did in fact liberate Brock, but in so doing left behind its spawn. The symbiote spawn bonded with Kasady, turning him into the lethal villain Carnage (Cletus Kasady)."
  },
  {
    name: "Toxin",
    image:
      "https://vignette.wikia.nocookie.net/marveldatabase/images/f/f5/Edward_Brock_%28Earth-616%29_becomes_Toxin_in_Venom_Vol_2_17.JPG/revision/latest/scale-to-width-down/180?cb=20120502194959",
    desc:
      "Toxin is said to be the most powerful symbiote of them all - having the abilities of both Venom and Carnage combined. Again, this may be due to his gestation on Earth."
  }
];

let seedDB = () => {
  // Remove all posts
  post.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("data removed");
      // add few posts
      data.forEach(seed => {
        post.create(seed, function(err, post){
          if (err) {
            console.log("Error in creating post : ");
            console.log(err);
          }
          console.log("new data entry added");
          // add few comments
          Comment.create(
            {
              author: "INITIAL COMMENT",
              comment: "Please enter more comment below..."
            },
            function(err, comment) {
              if (err) {
                console.log("Error in creating Comment : ");
                console.log(err);
              }
              console.log("Created a new comment!");
              post.comments.push(comment);
              post.save();
            }
          );
        });
      });
    }
  });


  // console.log("seedDB runs!")
};

module.exports = seedDB;
