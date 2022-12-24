// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  schedule: {
    id: '42',
    beginTimestamp: '2022-01-01T00:00:00.000Z',
    createdByUser: {
      id: 'Name1',
      name: 'Name1',
    },
    confirmations: [
      {
        player: {
          id: 'Name2',
          name: 'Name2',
        },
      },
    ],
  },
});
