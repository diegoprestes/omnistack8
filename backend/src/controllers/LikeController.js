const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    try {
      const loggedDev = await Dev.findById(user);
      const targetDev = await Dev.findById(devId);

      if (loggedDev.likes.includes(targetDev._id)) {
        return res.status(400).json({error: 'Dev already liked'});
      }
  
      if (targetDev.likes.includes(loggedDev._id)) {
        console.log('Info: Deu match');

        const loggedSocket = req.connectedUsers[user];
        const targetSocket = req.connectedUsers[devId];
        if (loggedSocket) {
          req.io.to(loggedSocket).emit('match', targetDev);
        }

        if (targetSocket) {
          req.io.to(targetSocket).emit('match', loggedDev);
        }
      }
  
      loggedDev.likes.push(targetDev._id);
  
      await loggedDev.save();
  
      return res.json({ success: true });
    } catch (error) {
      console.log('Dev dont exist');
      return res.status(400).json({ error: 'Dev dont exist' });
    }
  }
};