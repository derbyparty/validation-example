var derby = require('derby');
var app = module.exports = derby.createApp('auth', __filename);

global.app = app;

app.loadViews (__dirname+'/../../views');
app.loadStyles(__dirname+'/../../styles');

app.get('/', function getPage(page, model){
  model.subscribe('products', 'categories', function() {
    model.filter('products', 'all').ref('_page.products');
    model.filter('categories', 'all').ref('_page.categories');
    page.render();
  });
});

app.proto.clear = function() {
  var model = this.model;
  //model.removeRef('_page.product');
  model.set('_page.product', {});
  model.del('_page.errors');
}

app.proto.save = function() {
  var model = this.model;
  var product = model.get('_page.product');
  var productId = model.add('products', product, function(err) {
    model.set('_page.errors', {});
    if (err) {
      model.set('_page.errors', err.errors);
    } else {
      model.del('_page.product');
    }
  });
}

app.on('model', function(model) {
  model.fn('all', function() {
    return true;
  });
});