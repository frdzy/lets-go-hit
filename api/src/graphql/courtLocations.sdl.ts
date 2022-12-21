export const schema = gql`
  type CourtLocation {
    id: String!
    name: String!
    address: String
    notes: String
    addedBy: User
    addedById: String
    reservations: [Reservation]!
  }

  type Query {
    courtLocations: [CourtLocation!]! @requireAuth
    courtLocation(id: String!): CourtLocation @requireAuth
  }

  input CreateCourtLocationInput {
    name: String!
    address: String
    notes: String
  }

  input UpdateCourtLocationInput {
    name: String
    address: String
    notes: String
  }

  type Mutation {
    createCourtLocation(input: CreateCourtLocationInput!): CourtLocation!
      @requireAuth
    updateCourtLocation(
      id: String!
      input: UpdateCourtLocationInput!
    ): CourtLocation! @requireAuth
    deleteCourtLocation(id: String!): CourtLocation! @requireAuth
  }
`;
