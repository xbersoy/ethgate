 const chai = require('chai');
 const server = require('../index');

describe('Starting Server', () => {
  // before(function (done) {
  //   this.timeout(0);
  //   server.on('up', async () => {
  //     done();
  //   });
  // });

  describe('Calling Unit Tests', () => {
    describe('Services', () => {
      require('./unit/service/transaction.test');
      require('./unit/service/wallet.test');
    });
    describe('Controllers', () => {
      require('./unit/controller/transaction.test');
      require('./unit/controller/wallet.test');
    });
  });

  describe('Calling e2e Tests', () => {
    //require('./e2e/transaction.test');
    require('./e2e/wallet.test');
  });
});