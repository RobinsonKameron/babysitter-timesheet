module.exports = {
        typeDefs: /* GraphQL */ `enum AccountType {
  TRIAL
  MONTHLY_PAID
}

type AggregateChild {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type AggregateSitDates {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Child {
  id: ID!
  firstName: String!
  lastName: String!
  rateAmount: Int
  rateType: RateType
  gender: Gender
  dates(where: SitDatesWhereInput, orderBy: SitDatesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SitDates!]
}

type ChildConnection {
  pageInfo: PageInfo!
  edges: [ChildEdge]!
  aggregate: AggregateChild!
}

input ChildCreateInput {
  firstName: String!
  lastName: String!
  rateAmount: Int
  rateType: RateType
  gender: Gender
  dates: SitDatesCreateManyInput
}

input ChildCreateManyInput {
  create: [ChildCreateInput!]
  connect: [ChildWhereUniqueInput!]
}

type ChildEdge {
  node: Child!
  cursor: String!
}

enum ChildOrderByInput {
  id_ASC
  id_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  rateAmount_ASC
  rateAmount_DESC
  rateType_ASC
  rateType_DESC
  gender_ASC
  gender_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ChildPreviousValues {
  id: ID!
  firstName: String!
  lastName: String!
  rateAmount: Int
  rateType: RateType
  gender: Gender
}

type ChildSubscriptionPayload {
  mutation: MutationType!
  node: Child
  updatedFields: [String!]
  previousValues: ChildPreviousValues
}

input ChildSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ChildWhereInput
  AND: [ChildSubscriptionWhereInput!]
  OR: [ChildSubscriptionWhereInput!]
  NOT: [ChildSubscriptionWhereInput!]
}

input ChildUpdateDataInput {
  firstName: String
  lastName: String
  rateAmount: Int
  rateType: RateType
  gender: Gender
  dates: SitDatesUpdateManyInput
}

input ChildUpdateInput {
  firstName: String
  lastName: String
  rateAmount: Int
  rateType: RateType
  gender: Gender
  dates: SitDatesUpdateManyInput
}

input ChildUpdateManyInput {
  create: [ChildCreateInput!]
  update: [ChildUpdateWithWhereUniqueNestedInput!]
  upsert: [ChildUpsertWithWhereUniqueNestedInput!]
  delete: [ChildWhereUniqueInput!]
  connect: [ChildWhereUniqueInput!]
  disconnect: [ChildWhereUniqueInput!]
}

input ChildUpdateWithWhereUniqueNestedInput {
  where: ChildWhereUniqueInput!
  data: ChildUpdateDataInput!
}

input ChildUpsertWithWhereUniqueNestedInput {
  where: ChildWhereUniqueInput!
  update: ChildUpdateDataInput!
  create: ChildCreateInput!
}

input ChildWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  rateAmount: Int
  rateAmount_not: Int
  rateAmount_in: [Int!]
  rateAmount_not_in: [Int!]
  rateAmount_lt: Int
  rateAmount_lte: Int
  rateAmount_gt: Int
  rateAmount_gte: Int
  rateType: RateType
  rateType_not: RateType
  rateType_in: [RateType!]
  rateType_not_in: [RateType!]
  gender: Gender
  gender_not: Gender
  gender_in: [Gender!]
  gender_not_in: [Gender!]
  dates_every: SitDatesWhereInput
  dates_some: SitDatesWhereInput
  dates_none: SitDatesWhereInput
  AND: [ChildWhereInput!]
  OR: [ChildWhereInput!]
  NOT: [ChildWhereInput!]
}

input ChildWhereUniqueInput {
  id: ID
}

scalar DateTime

enum Gender {
  BOY
  GIRL
  OTHER
}

scalar Long

type Mutation {
  createChild(data: ChildCreateInput!): Child!
  updateChild(data: ChildUpdateInput!, where: ChildWhereUniqueInput!): Child
  updateManyChildren(data: ChildUpdateInput!, where: ChildWhereInput): BatchPayload!
  upsertChild(where: ChildWhereUniqueInput!, create: ChildCreateInput!, update: ChildUpdateInput!): Child!
  deleteChild(where: ChildWhereUniqueInput!): Child
  deleteManyChildren(where: ChildWhereInput): BatchPayload!
  createPost(data: PostCreateInput!): Post!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateManyPosts(data: PostUpdateInput!, where: PostWhereInput): BatchPayload!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  deletePost(where: PostWhereUniqueInput!): Post
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  createSitDates(data: SitDatesCreateInput!): SitDates!
  updateSitDates(data: SitDatesUpdateInput!, where: SitDatesWhereUniqueInput!): SitDates
  updateManySitDateses(data: SitDatesUpdateInput!, where: SitDatesWhereInput): BatchPayload!
  upsertSitDates(where: SitDatesWhereUniqueInput!, create: SitDatesCreateInput!, update: SitDatesUpdateInput!): SitDates!
  deleteSitDates(where: SitDatesWhereUniqueInput!): SitDates
  deleteManySitDateses(where: SitDatesWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Post {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  title: String!
  content: String
  sitter: User!
}

type PostConnection {
  pageInfo: PageInfo!
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  published: Boolean
  title: String!
  content: String
  sitter: UserCreateOneWithoutPostsInput!
}

input PostCreateManyWithoutSitterInput {
  create: [PostCreateWithoutSitterInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateWithoutSitterInput {
  published: Boolean
  title: String!
  content: String
}

type PostEdge {
  node: Post!
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  published_ASC
  published_DESC
  title_ASC
  title_DESC
  content_ASC
  content_DESC
}

type PostPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  title: String!
  content: String
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PostWhereInput
  AND: [PostSubscriptionWhereInput!]
  OR: [PostSubscriptionWhereInput!]
  NOT: [PostSubscriptionWhereInput!]
}

input PostUpdateInput {
  published: Boolean
  title: String
  content: String
  sitter: UserUpdateOneRequiredWithoutPostsInput
}

input PostUpdateManyWithoutSitterInput {
  create: [PostCreateWithoutSitterInput!]
  delete: [PostWhereUniqueInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutSitterInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutSitterInput!]
}

input PostUpdateWithoutSitterDataInput {
  published: Boolean
  title: String
  content: String
}

input PostUpdateWithWhereUniqueWithoutSitterInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutSitterDataInput!
}

input PostUpsertWithWhereUniqueWithoutSitterInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutSitterDataInput!
  create: PostCreateWithoutSitterInput!
}

input PostWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  published: Boolean
  published_not: Boolean
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  sitter: UserWhereInput
  AND: [PostWhereInput!]
  OR: [PostWhereInput!]
  NOT: [PostWhereInput!]
}

input PostWhereUniqueInput {
  id: ID
}

type Query {
  child(where: ChildWhereUniqueInput!): Child
  children(where: ChildWhereInput, orderBy: ChildOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Child]!
  childrenConnection(where: ChildWhereInput, orderBy: ChildOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ChildConnection!
  post(where: PostWhereUniqueInput!): Post
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  sitDates(where: SitDatesWhereUniqueInput!): SitDates
  sitDateses(where: SitDatesWhereInput, orderBy: SitDatesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SitDates]!
  sitDatesesConnection(where: SitDatesWhereInput, orderBy: SitDatesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SitDatesConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

enum RateType {
  HOURLY
  FLAT
}

type SitDates {
  id: ID!
  month: String
  day: String
  year: String
  hours: Int
  paid: Int
  dateObjectId: ID
  isFixedRate: Boolean
}

type SitDatesConnection {
  pageInfo: PageInfo!
  edges: [SitDatesEdge]!
  aggregate: AggregateSitDates!
}

input SitDatesCreateInput {
  month: String
  day: String
  year: String
  hours: Int
  paid: Int
  dateObjectId: ID
  isFixedRate: Boolean
}

input SitDatesCreateManyInput {
  create: [SitDatesCreateInput!]
  connect: [SitDatesWhereUniqueInput!]
}

type SitDatesEdge {
  node: SitDates!
  cursor: String!
}

enum SitDatesOrderByInput {
  id_ASC
  id_DESC
  month_ASC
  month_DESC
  day_ASC
  day_DESC
  year_ASC
  year_DESC
  hours_ASC
  hours_DESC
  paid_ASC
  paid_DESC
  dateObjectId_ASC
  dateObjectId_DESC
  isFixedRate_ASC
  isFixedRate_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SitDatesPreviousValues {
  id: ID!
  month: String
  day: String
  year: String
  hours: Int
  paid: Int
  dateObjectId: ID
  isFixedRate: Boolean
}

type SitDatesSubscriptionPayload {
  mutation: MutationType!
  node: SitDates
  updatedFields: [String!]
  previousValues: SitDatesPreviousValues
}

input SitDatesSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SitDatesWhereInput
  AND: [SitDatesSubscriptionWhereInput!]
  OR: [SitDatesSubscriptionWhereInput!]
  NOT: [SitDatesSubscriptionWhereInput!]
}

input SitDatesUpdateDataInput {
  month: String
  day: String
  year: String
  hours: Int
  paid: Int
  dateObjectId: ID
  isFixedRate: Boolean
}

input SitDatesUpdateInput {
  month: String
  day: String
  year: String
  hours: Int
  paid: Int
  dateObjectId: ID
  isFixedRate: Boolean
}

input SitDatesUpdateManyInput {
  create: [SitDatesCreateInput!]
  update: [SitDatesUpdateWithWhereUniqueNestedInput!]
  upsert: [SitDatesUpsertWithWhereUniqueNestedInput!]
  delete: [SitDatesWhereUniqueInput!]
  connect: [SitDatesWhereUniqueInput!]
  disconnect: [SitDatesWhereUniqueInput!]
}

input SitDatesUpdateWithWhereUniqueNestedInput {
  where: SitDatesWhereUniqueInput!
  data: SitDatesUpdateDataInput!
}

input SitDatesUpsertWithWhereUniqueNestedInput {
  where: SitDatesWhereUniqueInput!
  update: SitDatesUpdateDataInput!
  create: SitDatesCreateInput!
}

input SitDatesWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  month: String
  month_not: String
  month_in: [String!]
  month_not_in: [String!]
  month_lt: String
  month_lte: String
  month_gt: String
  month_gte: String
  month_contains: String
  month_not_contains: String
  month_starts_with: String
  month_not_starts_with: String
  month_ends_with: String
  month_not_ends_with: String
  day: String
  day_not: String
  day_in: [String!]
  day_not_in: [String!]
  day_lt: String
  day_lte: String
  day_gt: String
  day_gte: String
  day_contains: String
  day_not_contains: String
  day_starts_with: String
  day_not_starts_with: String
  day_ends_with: String
  day_not_ends_with: String
  year: String
  year_not: String
  year_in: [String!]
  year_not_in: [String!]
  year_lt: String
  year_lte: String
  year_gt: String
  year_gte: String
  year_contains: String
  year_not_contains: String
  year_starts_with: String
  year_not_starts_with: String
  year_ends_with: String
  year_not_ends_with: String
  hours: Int
  hours_not: Int
  hours_in: [Int!]
  hours_not_in: [Int!]
  hours_lt: Int
  hours_lte: Int
  hours_gt: Int
  hours_gte: Int
  paid: Int
  paid_not: Int
  paid_in: [Int!]
  paid_not_in: [Int!]
  paid_lt: Int
  paid_lte: Int
  paid_gt: Int
  paid_gte: Int
  dateObjectId: ID
  dateObjectId_not: ID
  dateObjectId_in: [ID!]
  dateObjectId_not_in: [ID!]
  dateObjectId_lt: ID
  dateObjectId_lte: ID
  dateObjectId_gt: ID
  dateObjectId_gte: ID
  dateObjectId_contains: ID
  dateObjectId_not_contains: ID
  dateObjectId_starts_with: ID
  dateObjectId_not_starts_with: ID
  dateObjectId_ends_with: ID
  dateObjectId_not_ends_with: ID
  isFixedRate: Boolean
  isFixedRate_not: Boolean
  AND: [SitDatesWhereInput!]
  OR: [SitDatesWhereInput!]
  NOT: [SitDatesWhereInput!]
}

input SitDatesWhereUniqueInput {
  id: ID
}

type Subscription {
  child(where: ChildSubscriptionWhereInput): ChildSubscriptionPayload
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  sitDates(where: SitDatesSubscriptionWhereInput): SitDatesSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  password: String!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  createdAt: DateTime!
  updatedAt: DateTime!
  type: AccountType!
  ccLast4: String
  stripeId: String
  firstName: String
  lastName: String
  children(where: ChildWhereInput, orderBy: ChildOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Child!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  posts: PostCreateManyWithoutSitterInput
  type: AccountType
  ccLast4: String
  stripeId: String
  firstName: String
  lastName: String
  children: ChildCreateManyInput
}

input UserCreateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutPostsInput {
  email: String!
  password: String!
  type: AccountType
  ccLast4: String
  stripeId: String
  firstName: String
  lastName: String
  children: ChildCreateManyInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  type_ASC
  type_DESC
  ccLast4_ASC
  ccLast4_DESC
  stripeId_ASC
  stripeId_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  type: AccountType!
  ccLast4: String
  stripeId: String
  firstName: String
  lastName: String
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  password: String
  posts: PostUpdateManyWithoutSitterInput
  type: AccountType
  ccLast4: String
  stripeId: String
  firstName: String
  lastName: String
  children: ChildUpdateManyInput
}

input UserUpdateOneRequiredWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  update: UserUpdateWithoutPostsDataInput
  upsert: UserUpsertWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutPostsDataInput {
  email: String
  password: String
  type: AccountType
  ccLast4: String
  stripeId: String
  firstName: String
  lastName: String
  children: ChildUpdateManyInput
}

input UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput!
  create: UserCreateWithoutPostsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  type: AccountType
  type_not: AccountType
  type_in: [AccountType!]
  type_not_in: [AccountType!]
  ccLast4: String
  ccLast4_not: String
  ccLast4_in: [String!]
  ccLast4_not_in: [String!]
  ccLast4_lt: String
  ccLast4_lte: String
  ccLast4_gt: String
  ccLast4_gte: String
  ccLast4_contains: String
  ccLast4_not_contains: String
  ccLast4_starts_with: String
  ccLast4_not_starts_with: String
  ccLast4_ends_with: String
  ccLast4_not_ends_with: String
  stripeId: String
  stripeId_not: String
  stripeId_in: [String!]
  stripeId_not_in: [String!]
  stripeId_lt: String
  stripeId_lte: String
  stripeId_gt: String
  stripeId_gte: String
  stripeId_contains: String
  stripeId_not_contains: String
  stripeId_starts_with: String
  stripeId_not_starts_with: String
  stripeId_ends_with: String
  stripeId_not_ends_with: String
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  children_every: ChildWhereInput
  children_some: ChildWhereInput
  children_none: ChildWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    