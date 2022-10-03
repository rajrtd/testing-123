const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema(
    //This is one object
{
    user: {
        // referring to the schema we created. Says we're referring to an objectID from a schema
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    }, 
    text: {
        type: String,
        required: true
    },  
    completed: {
        type: Boolean,
        default: false
    }
},
// This is another object
// This being separate from the rest of the schema, because it is an option
{
    timestamps: true
}
)

noteSchema.plugin(AutoIncrement, {
    // Creates a ticket field inside of note schema and this gets the ticket number
    inc_field: 'ticket',
    // We won't see this inside of note collection, 
    // a separate collection called counter will be made, and this is where the id will be at
    id: 'ticketNums',
    // Starts counting at 500
    start_seq: 500
})

module.exports = mongoose.model('Note', noteSchema)