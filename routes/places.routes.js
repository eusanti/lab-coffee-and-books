const Place = require("./../models/Place.model");
const router = require("express").Router();

//LIST
router.get("/", (req, res)=> {
    Place.find()
    .then(allPlaces => res.render("places/places-list", {allPlaces}))
    .catch(err => console.log(err))
});

//CREAT
router.get("/creat", (req, res) => res.render("places/places-creat"))

router.post("/creat", (req, res) => {

let location = {
		type: 'Point',
		coordinates: [req.body.longitude, req.body.latitude]
	}
  const { name, type } = req.body
  Place.create({ name, type, location })
    .then(createPlace => res.redirect("/places"))
    .catch(err => console.log(err))
})

//DELETE
router.get("/:id", (req, res) => {
    const placeId = req.params.id;
    
    Place.findById(placeId)
      .then((place) => {
        res.render("places/", { place: place });
      });
  });

  router.get("/:id/delete", (req, res) =>{
      const { id } = req.params;
      Place.findByIdAndRemove(id)
      .then(() =>{res.redirect("/places")
      })
  });

  //EDIT
  router.get("/edit/:id", (req, res) => {
    const { id } = req.params
  
    Place.findById(id)
      .then(place => res.render("places/places-edit", place))
      .catch(err => console.log(err))
  
  })
  
  router.post("/edit/:id", (req, res) => {
    const { id } = req.params
    const { name, type } = req.body
  
    Place.findByIdAndUpdate(id, { name, type }, { new: true })
      .then(place => res.redirect("/places"))
      .catch(err => console.log(err))
  })

// to see raw data in your browser, just go on: http://localhost:3000/api
router.get('/api', (req, res, next) => {
    console.log("Ola")
	Place.find()
		.then(allPlaceWorld => {
			res.status(200).json({ places: allPlaceWorld });
		})
		.catch(err => console.log(err))
});





module.exports= router;