import mongoose from 'mongoose';


const itemSchema = mongoose.Schema({
    person_name: String,
    person_position: String,
    person_level: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var RecordItem = mongoose.model('recorditem', itemSchema);

export default RecordItem