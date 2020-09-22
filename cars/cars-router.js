const express = require('express');
const knex = require('knex');
const db = require('../data/db-config.js');

const router = express.Router(); 

router.get('/', (req, res) => {
  db('cars')
  .then(cars => {
    res.json(cars);
  })
  .catch(err => {
    res.status(500).json({errorMessage: 'Failed to retrieve cars'})
  });
});

router.get('/:id', (req, res) => {
  const {id} = req.params;

  db('cars').where({id}).first()
  .then(cars => {
    res.json(cars);
  })
  .catch(err => {
    res.status(500).json({errorMessage: 'Failed to retrieve cars'})
  });
});

router.post('/', (req, res) => {
  const carsData = req.body;
  db('cars').insert(carsData)
  .then(ids => {
    db('cars').where({ id: ids[0] })
    .then(newCarsEntry => {
      res.status(201).json(newCarsEntry);
    });
  })
  .catch(error => {
    res.status(500).json({ errorMessage: 'Failed to store data'})
  });
});


module.exports = router;
