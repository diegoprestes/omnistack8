const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    try {
      const loggedDev = await Dev.findById(user);
      const targetDev = await Dev.findById(devId);

      loggedDev.dislikes.push(targetDev._id);

      await loggedDev.save();

      return res.json({ success: true });
    } catch (error) {
      console.log('Dev dont exist');
      return res.status(400).json({ error: 'Dev dont exist' });
    }
  }
};