module.exports = function (app) {
  app.use('/api/users', require('./routes.users'))
  app.use('/api/payments', require('./routes.payments'))
};