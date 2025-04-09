// routes/calculationRoutes.js
const express = require('express');
const router = express.Router();
const Calculation = require('../models/Calculation');

router.post('/save', async (req, res) => {
  const { customerName, itemName, inputs, outputs, orderQuantity, orderRate } =
    req.body;
  try {
    const existing = await Calculation.findOne({ customerName, itemName });
    if (existing) {
      existing.orderQuantity = orderQuantity;
      existing.orderRate = orderRate;
      existing.inputs = inputs;
      existing.outputs = outputs;
      await existing.save();
    } else {
      await Calculation.create({
        customerName,
        itemName,
        inputs,
        outputs,
        orderQuantity,
        orderRate,
      });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error saving calculation', details: err });
  }
});

router.get('/get/:customerName/:itemName', async (req, res) => {
  const { customerName, itemName } = req.params;
  try {
    const calc = await Calculation.findOne({ customerName, itemName });
    if (calc) {
      res.json(calc);
    } else {
      res.json({});
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching data', details: err });
  }
});

// Get all saved calculations
router.get('/get-all', async (req, res) => {
  try {
    const data = await Calculation.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const result = await Calculation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully', result });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    await Calculation.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Bulk delete successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error during bulk delete', error });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const updated = await Calculation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
