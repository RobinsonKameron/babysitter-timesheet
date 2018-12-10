const { getUserId } = require('../utils')

const Query = {
  me: (parent, args, context) => {
    const userId = getUserId(context)
    console.log('userId', userId);
    return context.prisma.user({ id: userId })
  },
  dates: (parent, args, context) => {
    return ['Yes', 'No', 'Maybe so']
  }
}

module.exports = {
  Query,
}
