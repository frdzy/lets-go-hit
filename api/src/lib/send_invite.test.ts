import { generateCodeAndHash } from 'src/lib/send_invite';

describe('send_invite', () => {
  it('generates a code and hash', async function () {
    const { code, hash } = await generateCodeAndHash();
    expect(code.match(/[\w-_]{21}/)).toBeTruthy();
    expect(hash.match(/[a-z0-9]{64}/)).toBeTruthy();
  });
});
