import { range, forEach, contains } from 'ramda';
import { assertThrowsInvalidOpcode } from './helpers';

const SignHashContract = artifacts.require('./SignHash.sol');

contract('SignHash', accounts => {
  const HASH = '43df940fc163216801a40c010caccb0764c0bc8c46f30913e89865fb741d37e6';

  let instance: SignHash;

  beforeEach(async () => {
    instance = (await SignHashContract.new()) as SignHash;
  });

  describe('#sign', () => {
    it('should add sender to the list of signers', async () => {
      await instance.sign(HASH, { from: accounts[0] });

      const signers = await instance.getSigners(HASH);
      assert.equal(signers.length, 1);
      assert.equal(signers[0], accounts[0]);
    });

    it('should add multiple senders to the list of signers', async () => {
      const count = 5;
      const seq = range(0, count);
      await Promise.all(seq.map(i => instance.sign(HASH, { from: accounts[i] })));

      const signers = await instance.getSigners(HASH);
      assert.equal(signers.length, count);

      forEach(i => assert.isTrue(contains(accounts[i], signers)), seq);
    });

    it('should reject empty hash', async () => {
      await assertThrowsInvalidOpcode(async () => {
        await instance.sign('', { from: accounts[0] });
      });
    });
  });
});