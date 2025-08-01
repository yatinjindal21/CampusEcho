const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashed, role });
    await user.save();
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.adminRegisterUser = async (req, res) => {
  const { name, email, password, role, society, company } = req.body;

  if (!['alumni', 'society_head'].includes(role)) {
    return res.status(400).json({ msg: 'Invalid role assignment' });
  }

  if (role === 'society_head' && !society) {
    return res.status(400).json({ msg: 'Society name is required for society head' });
  }

  if (role === 'alumni' && !company) {
    return res.status(400).json({ msg: 'Company name is required for alumni' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashed,
      role,
      society: role === 'society_head' ? society : undefined,
      company: role === 'alumni' ? company : undefined,
    });

    await user.save();

    res.json({
      msg: `${role} created successfully`,
      user: { name, email, role, society: user.society, company: user.company }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email role company'); // optional: limit fields
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
