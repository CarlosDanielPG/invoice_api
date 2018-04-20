var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var invoiceSchema = new Schema({
  id_user: { type: String },
  params : {
    serie : { type: String },
    folio : {type: String },
    methodOfPayment : { type: String },
    termsOfPayment : { type: String },
    discount : { type: Number},
    discountReason : { type: String },
    exchargeRate : { type: Number },
    currency : { type: String },
    typeOfVoucher : { type: String },
    expeditionPlace : { type: String },
    paymentAccountNumber : { type: Number }
  },
  reciever: {
    rfc : { type: String },
    nombre : { type: String },
    address : {
      street : { type: String },
      municipality : { type: String },
      state : { type: String },
      country : { type: String },
      postalCode : { type: Number }
    }
  },
  concepts: [
    {
      quantity : { type: Number },
      unit : { type: String, enum:
        ['kg', 'mt', 'hr']},
      description : { type: String },
      IdNumber : { type: Number },
      unitValue : { type: Number },
      amount : { type: Number }
    }
  ],
  taxes: {
    retentions : [
      {
        taxName : { type: String },
        amount : { type: Number }
      }
    ],
    transfers : [
      {
        taxName : { type: String },
        rate : { type: Number },
        amount : { type: Number }
      }
    ]
  }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
