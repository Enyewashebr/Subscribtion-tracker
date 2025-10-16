import mongoose from "mongoose";
import { type } from "os";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength:2,
        maxLength:50
    },
    price:{
        type: Number,
        required: [true, "Subscription price is required"],
        min:[0, "Price must be positive"]
    },
    currency:{
        type: String,
        required: [true, "Currency is required"],
        enum: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'],
        default: 'USD'
    },
    frequency:{
        type: String,
        required: [true, "Subscription frequency is required"], 
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly'
    },
    category:{
        type: String,
        required: [true, "Subscription category is required"], 
        enum: ['entertainment', 'education', 'productivity', 'health', 'other', 'sports'],
        required: true
    },
    paymentMethod:{
        type: String,
        required: [true, "Payment method is required"], 
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'other'],
        trim: true,
    },
    status:{
        type: String,
        required: [true, "Subscription status is required"],
        enum: ['active', 'inactive', 'canceled', 'paused'],
        default: 'active'
    },
    startDate:{
        type: Date,
        required: [true, "Start date is required"],
        validate:{
            validator: (value) => value <= new Date(),
            message: "Start date cannot be in the future"
        }
    },
    renewalDate:{
        type: Date,
        required: [true, "Renewal date is required"],  
        validate:{
            validator: function(value) {
                return value > this.startDate;
                this.message = "Renewal date must be after start date"
            }
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"],
        index: true
    }
}, {timestamps: true});

// autocalculate renewalDate before saving
subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate){
      const renewalPeriods = {
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365  
    }
    this.renewalDate = new Date(this.startDate.getTime() + (renewalPeriods[this.frequency] * 24 * 60 * 60 * 1000));
    }

    // auto-update the status if renewal date is passed
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }
    next();
});
