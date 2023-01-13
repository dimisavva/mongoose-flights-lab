import { Flight } from "../models/flights.js";
import { Meal } from "../models/meals.js";

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

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        title: 'Flight Details',
        flight,
        meals,
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      flight,
      title: 'Edit Flight'
    })
  })
}

function update(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/edit')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteTicket(req, res) {
  console.log(req.params)
  // const currentFlight = Flight.findById(req.params.id)
  // // const currentTicket = Ticket.findById(req.params.ticketId)
  // const ticketDoc = currentFlight.tickets.id(req.params.ticketId)
  // console.log(ticketDoc)

  function addMealToFlight(req, res) {
    //find flight by id
    Flight.findById(req.params.id)
    //add the id of the meal to the flights.meals array
    .then(flight => {
      flight.meals.push(req.body.mealId)
      //save the updated flight
      flight.save()
      .then(() => {
        //redirect back to the flight show view
        res.redirect(`/flights/${flight._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/flights')
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  }
  
export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket,
  deleteTicket,
  addMealToFlight
}