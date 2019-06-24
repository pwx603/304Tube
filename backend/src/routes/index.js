module.exports = function (app) {
  app.use('/api/users', require('./routes.users'))
  app.use('/api/payments', require('./routes.payments'))
  app.use('/api/videos', require('./routes.videos'))
  app.use('/api/playlists', require('./routes.playlists'))
};