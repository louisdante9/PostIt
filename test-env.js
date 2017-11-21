import sinon from 'sinon';
process.env.NODE_ENV = 'test';


global.$ = () => ({
  tabs: () => null,
  attr: () => null,
  sideNav: () => null,
  modal: () => null,
  parallax: () => null,
  show: () => null,
  hide: () => null,
  tooltip: () => null
});
global.event = {
  target: {
    name: 'input',
    value: 'input'
  }
};
let jsdom = require('jsdom').jsdom;

let exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
global.navigator = {
  userAgent: 'node.js'
};

global.Materialize = {
  toast: sinon.spy()
};
global.io = ()=>({
    emit: () => null,
    on: () => null,
});