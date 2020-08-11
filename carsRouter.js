const router = require("express").Router();
const knex = require("knex");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/car-dealer.db3",
  },
  useNullAsDefault: true,
});

router.get("/", (req, res) => {
  db("cars")
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve cars" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .first()
    .then((car) => {
      if (car) {
        res.status(200).json(car);
      } else {
        res
          .status(404)
          .json({ message: "The car with that ID could not be found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve cars" });
    });
});

router.post('/', (req, res) => {
    const carData = req.body
    db('cars').insert(carData)
    .then(ids => {
        db('cars').where({id: ids[0]})
        .then(newCarEntry => {
            res.status(201).json(newCarEntry)
        })
    })
    .catch((err) => {
        res.status(500).json({ message: "Failed to create new car" });
      });
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body

    db("cars")
    .where({id: id})
    .update(changes)
    .then(count => {
        if(count) {
            res.status(200).json({message: "Updated successfully"})
        } else {
            res.status(404).json({message: "A car with that ID could not be found"})
        }
    })
    .catch((err) => {
        res.status(500).json({ message: "Failed to update car info" });
      });
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    db('cars')
    .where({id: id})
    .del()
    .then(count => {
        if(count) {
            res.status(200).json({message: "removed successfully"})
        } else {
            res.status(404).json({ message: "not found" });
          }
        })
        .catch((err) => {
          console.log(error);
          res.status(500).json({ error: err.message });
        });
    })


module.exports = router;
