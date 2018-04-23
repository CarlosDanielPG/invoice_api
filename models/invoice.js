var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var invoiceSchema = new Schema({
  id_user: { type: String, required: true },
  params : {
    serie : { type: String, required: true },
    folio : {type: String, required: true },
    methodOfPayment : { type: String, required: true },
    termsOfPayment : { type: String },
    discount : { type: String },
    discountReason : { type: String },
    exchargeRate : { type: String },
    currency : { type: String },
    typeOfVoucher : { type: String },
    expeditionPlace : { type: String, required: true },
    paymentAccountNumber : { type: String, required: true }
  },
  reciever: {
    rfc : { type: String, required: true },
    name : { type: String, required: true },
    address : {
      street : { type: String, required: true },
      municipality : { type: String, required: true },
      state : { type: String, required: true },
      country : { type: String, required: true },
      postalCode : { type: String, required: true }
    }
  },
  concepts: [
    {
      quantity : { type: String },
      unit : { type: String, enum:
        ['kg', 'mt', 'hr', 'yr'] },
      description : { type: String },
      IdNumber : { type: String },
      unitValue : { type: String },
      amount : { type: String }
    }
  ],
  taxes: {
    retentions : [
      {
        taxName : { type: String },
        amount : { type: String }
      }
    ],
    transfers : [
      {
        taxName : { type: String },
        rate : { type: String },
        amount : { type: String }
      }
    ]
  }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
