var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var invoiceSchema = new Schema({
  id_user: { type: String, required: true },
  status:  { type: String, required: true },
  invoice_id : { type: String },
  invoice: {
    params : {
      serie : { type: String, required: true },
      folio : {type: String, required: true },
      paymentMethod : { type: String, required: true },
      termsOfPayment : { type: String },
      discount : { type: String },
      discountReason : { type: String },
      exchargeRate : { type: String },
      currency : { type: String },
      typeOfVoucher : { type: String },
      methodOfPayment : { type: String, required: true },
      expeditionPlace : { type: String, required: true },
      paymentAccountNumber : { type: String, required: true },
      subTotal: { type: String },
      total: { type: String }
    },
    issuer: {
      rfc : { type: String },
      name : { type: String },
      address : {
        street : { type: String },
        municipality : { type: String },
        state : { type: String },
        country : { type: String },
        postalCode : { type: String }
      },
      issuedIn: {
        street : { type: String },
        municipality : { type: String },
        state : { type: String },
        country : { type: String },
        postalCode : { type: String }
      },
      regime: [
        {
          regime: { type: String }
        }
      ]
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
        unit : { type: String },
        description : { type: String },
        IdNumber : { type: String },
        unitValue : { type: String },
        amount : { type: String }
      }
    ],
    taxes: {
      totalRetentions : { type: String },
      totalTransfers: { type: String },
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
  },
  unix_timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
