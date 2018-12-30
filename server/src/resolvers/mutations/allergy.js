module.exports = {
  createAllergy: async (parent, { data }, context) => {
    try {
      return await context.prisma.createAllergy({
        ...data
      })
    } catch (err) {
      throw new Error(err.message);
    }
  },
  updateAllergy: async (parent, { id, ...args }, context) => {
    try {
      // return await context.prisma.createAllergy({
      //   ...args,
      //   owner: {
      //     connect: {
      //       id
      //     }
      //   },
      // })
    } catch (err) {
      throw new Error(err.message);
    }
  },

}