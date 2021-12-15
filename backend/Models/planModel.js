const mongoose = require("mongoose");

let planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"],
        maxLength: [40, "Length overflow"]
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        validate: {
            validator: function () {
                return this.discount < this.price
            },
            message: 'discount is more than price'
        }
    },
    image: {
        type: [String]
    },
    reviews: {
        type: [mongoose.Schema.ObjectId],
        ref: "reviewModel"
    },
    rating: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    }
});

let planModel = mongoose.model("planModel", planSchema);
module.exports = planModel;