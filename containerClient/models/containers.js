const mongoose = require ('mongoose');


const ContainerSchema = new mongoose.Schema({
    companyName: {type: String},
    containerNumber: {type: Number},
    status: {type: String},
    id: {type: String}
});


module.exports = mongoose.model('container',ContainerSchema);
