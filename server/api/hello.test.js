const {expect} = require('chai');

const plugins = require('PLEASE CALCULATE AUTH PLUGIN PATH FOR SELF FOR NOW');

const auth_plugin = plugins.auth();
const ENDPOINT = '/hello';

describe(ENDPOINT, () => {
  before(async () => {
    await auth_plugin.before();
  });
  after(async () => {
    await auth_plugin.after();
  });

});
