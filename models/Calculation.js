const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  customerName: String,
  itemName: String,
  inputs: {
    lcm: Number,
    bcm: Number,
    gsm: Number,
    totalSheet: Number,
    ratePerKg: Number,
    printingChargePerThousand: Number,
    plateCharge: Number,
    cuttingChargePerThousand: Number,
    conversionCost: Number,
    packingDelivery: Number,
    piecesPerSheet: Number,
    salePricePerPiece: Number,
    gstRate: Number,
  },
  outputs: {
    wtPerSheet: Number,
    totalWeight: Number,
    totalSheetAmount: Number,
    totalPieces: Number,
    totalPrintingCost: Number,
    totalCuttingCharges: Number,
    miscellaneousCharges: Number,
    totalBasicCost: Number,
    pricePerPiece: Number,
    gstOnSale: Number,
    profitPerPiece: Number,
  },
  orderQuantity: String,
  orderRate: String,
});

module.exports = mongoose.model('Calculation', calculationSchema);
