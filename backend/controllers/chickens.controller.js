const Chicken = require('../models/Chicken');

exports.getAll = async (req, res) => {
  const chickens = await Chicken.find();
  res.json(chickens);
};

exports.create = async (req, res) => {
  const chicken = new Chicken(req.body);
  await chicken.save();
  res.status(201).json(chicken);
};

exports.vote = async (req, res) => {
  const chicken = await Chicken.findById(req.params.id);
  chicken.rating += 1;
  await chicken.save();
  res.json(chicken);
};

exports.comment = async (req, res) => {
  const chicken = await Chicken.findById(req.params.id);
  chicken.comments.push({ text: req.body.text, date: new Date() });
  await chicken.save();
  res.json(chicken);
};

exports.delete = async (req, res) => {
  await Chicken.findByIdAndDelete(req.params.id);
  res.status(204).send();
};