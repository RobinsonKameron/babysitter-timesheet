const User = {
  posts: (parent, args, context) => {
    return context.prisma.user({ id: parent.id }).posts()
  },
  children: (parent, args, context) => {
    return context.prisma.user({ id: parent.id }).children()
  },
}

module.exports = {
  User,
}
