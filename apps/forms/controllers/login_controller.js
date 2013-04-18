Forms.loginController = SC.Object.create({
  username: null,
  password: null,
  name: null,
  database: null,

  loginText: function() {
    return "Logged in as %@ (%@) to %@".fmt(this.get('name'), this.get('username'), this.get('database'));
  }.property('username', 'name', 'database').cacheable(),
})