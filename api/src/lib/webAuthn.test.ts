import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from '@simplewebauthn/server';
// import { mock } from 'jest-mock-extended';

describe('webAuthn package', () => {
  it('can generate registration options', async () => {
    const options = await generateRegistrationOptions({
      rpName: 'Test App',
      rpID: 'localhost',
      userID: '1234',
      userName: 'test@example.com',
      attestationType: 'none',
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
      },
    });

    expect(options).toHaveProperty('challenge');
    expect(options).toHaveProperty('rp');
    expect(options.rp.name).toBe('Test App');
    expect(options.user.id).toBe('1234');
    expect(options.user.name).toBe('test@example.com');
  });

  it('handles verification of registration response', async () => {
    // Mock a registration response
    const mockResponse = {
      id: 'some-id',
      rawId: Buffer.from('some-id').toString('base64'),
      response: {
        attestationObject: Buffer.from('dummy-attestation').toString('base64'),
        clientDataJSON: Buffer.from(
          JSON.stringify({
            type: 'webauthn.create',
            challenge: 'dummy-challenge',
            origin: 'http://localhost:8910',
          }),
        ).toString('base64'),
      },
      type: 'public-key' as const,
      clientExtensionResults: {},
    };

    // This will throw an error because we're using dummy data,
    // but it verifies that the package is properly included
    await expect(
      verifyRegistrationResponse({
        response: mockResponse,
        expectedChallenge: 'dummy-challenge',
        expectedOrigin: 'http://localhost:8910',
        expectedRPID: 'localhost',
      }),
    ).rejects.toThrow();
  });
});
