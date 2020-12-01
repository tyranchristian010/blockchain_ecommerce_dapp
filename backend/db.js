const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://cluster0.mclg5.mongodb.net/<ecommerce_on_ethereum>',
  {useNewUrlParser: true, useUnifiedTopology: true},
);

const paymentSchema = new mongoose.Schema({
  id: String,
  itemId: String,
  paid: Boolean
});
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
  Payment
};