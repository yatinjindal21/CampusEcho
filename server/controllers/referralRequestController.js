const ReferralRequest = require('../models/Referral');

exports.sendReferral = async (req, res) => {
    try {
        const { position, company, alumniId } = req.body;
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const existing = await ReferralRequest.findOne({
            student: req.user.userId,
            alumni: alumniId,
            status: 'pending',
        });

        if (existing) {
            return res.status(400).json({ msg: 'You have already requested a referral from this alumni. Wait for response.' });
        }

        const request = new ReferralRequest({
            student: req.user.userId,
            alumni: alumniId,
            position,
            company,
            resumeUrl: fileUrl,
        });

        await request.save();
        res.json({ msg: 'Referral request sent!', request });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};


exports.getMyRequests = async (req, res) => {
    try {
      const list = await ReferralRequest.find({
        alumni: req.user.userId,
        status: 'pending'  // ✅ only fetch pending requests
      }).populate('student', 'name email');
  
      res.json(list);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  };
  

exports.respondToReferral = async (req, res) => {
    try {
        const { status, feedback } = req.body;
        const request = await ReferralRequest.findById(req.params.id);

        if (!request || request.alumni.toString() !== req.user.userId) {
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        request.status = status;
        request.feedback = feedback;
        await request.save();

        res.json({ msg: 'Response submitted', request });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.getSentReferrals = async (req, res) => {
    try {
        const list = await ReferralRequest.find({ student: req.user.userId })
            .populate('alumni', 'name email company');
        res.json(list);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};
