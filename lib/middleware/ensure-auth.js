const UserService = require('../services/user-service');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.session;

    const payload = UserService.verifyToken(token);
    req.user = {
      userId: payload.userId,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
    };

    next();
  } catch (error) {
    next(error);
  }
};
