/**
 * Middleware try / catch handler
 * @param {object} controller a controller to execute iside a try/catch block
 * @returns {object} a controller as middleware function
 */

module.exports = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    next(err);
  }
};
