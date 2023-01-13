import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/
  },
  price: {
    type: Number,
    min: 1
  }
}, {
  timestamps: true
})

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['Delta', 'Southwest', 'United', 'Spirit']
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'SLC', 'JFK'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    required: true  },
    
  departs: {
    type: Date,
    default: function() {
      let currentDate = new Date()
      return currentDate.setFullYear(currentDate.getFullYear()+1)
    },
  },
  tickets: [ticketSchema],
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
  }, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}
