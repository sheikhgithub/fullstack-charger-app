const ChargingStation = require('../models/chargingstation');

// Get all chargers with optional filters (status, powerOutput, connectorType)
exports.getAllStations = async (req, res) => {
  try {
    const { status, powerOutput, connectorType } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (powerOutput) filter.powerOutput = { $gte: Number(powerOutput) }; // powerOutput >= given value
    if (connectorType) filter.connectorType = connectorType;

    const stations = await ChargingStation.find(filter);
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStationById = async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json(station);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createStation = async (req, res) => {
  try {
    const newStation = new ChargingStation(req.body);
    const savedStation = await newStation.save();
    res.status(201).json(savedStation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateStation = async (req, res) => {
  try {
    const updatedStation = await ChargingStation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStation) return res.status(404).json({ message: 'Station not found' });
    res.json(updatedStation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteStation = async (req, res) => {
  try {
    const deletedStation = await ChargingStation.findByIdAndDelete(req.params.id);
    if (!deletedStation) return res.status(404).json({ message: 'Station not found' });
    res.json({ message: 'Station deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
