export const schema = gql`
  type CourtLocation {
    id: ID!
    name: String!
    address: String
    notes: String
    addedBy: User
    addedById: ID
    reservations: [Reservation]!
  }

  type Query {
    courtLocations: [CourtLocation!]! @requireAuth
    courtLocation(id: ID!): CourtLocation @requireAuth
  }

  input CreateCourtLocationInput {
    name: String!
    address: String
    notes: String
    addedById: ID
  }

  input UpdateCourtLocationInput {
    name: String
    address: String
    notes: String
    addedById: ID
  }

  type Mutation {
    createCourtLocation(input: CreateCourtLocationInput!): CourtLocation!
      @requireAuth
    updateCourtLocation(
      id: ID!
      input: UpdateCourtLocationInput!
    ): CourtLocation! @requireAuth
    deleteCourtLocation(id: ID!): CourtLocation! @requireAuth
  }
`;
