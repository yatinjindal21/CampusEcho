const News = require('../models/News');

exports.createNews = async (req, res) => {
  try {
    const { title, content, category, tags, deadline } = req.body;
    const fileUrls = req.files?.map(file => `/uploads/${file.filename}`) || [];

    const news = new News({
      title,
      content,
      category,
      tags: tags?.split(',').map(tag => tag.trim()),
      deadline: deadline || null,
      fileUrls,
      author: req.user.userId,
      status: 'approved',
      society: req.user.role === 'society_head' ? req.user.society : undefined,
      company: req.user.role === 'alumni' ? req.user.company : undefined,
    });

    await news.save();
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};



exports.getNews = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { status: 'approved' };
    if (category) filter.category = category;
    const list = await News.find(filter).populate('author', 'name role');
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.approveNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    news.status = 'approved';
    await news.save();
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'name');
    if (!news) return res.status(404).json({ msg: 'News not found' });
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
