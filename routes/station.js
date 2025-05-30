const router = require('express').Router();
const ChargingStation = require('../models/chargingStation');
const auth = require('../middleware/auth');

// GET all stations (Public)
router.get('/', async (req, res) => {
  try {
    const stations = await ChargingStation.find();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stations' });
  }
});

// POST - Add a new station (Protected)
router.post('/', auth, async (req, res) => {
  try {
    const station = new ChargingStation(req.body);
    await station.save();
    res.status(201).json(station);
  } catch (err) {
    res.status(500).json({ message: 'Error adding station' });
  }
});

// PUT - Update a station (Protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await ChargingStation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating station' });
  }
});

// DELETE - Delete a station (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await ChargingStation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Station deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting station' });
  }
});

module.exports = router;
