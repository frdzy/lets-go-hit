import { AuthenticationError } from '@redwoodjs/graphql-server';

export function getRequiredCurrentUser() {
  const { currentUser } = context;
  if (!currentUser) {
    throw new AuthenticationError('Must be logged in');
  }
  return currentUser;
}
