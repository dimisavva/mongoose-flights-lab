import { Flight } from "../models/flights.js";

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights,
      title: 'All Flights'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight',
  })
}

function create(req, res) {
  // console.log(req.body)
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

export {
  index,
  newFlight as new,
  create,
}