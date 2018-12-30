const { getUserId } = require("../utils");

const Sitte = {
  dates: async ({ id }, _, ctx) => await ctx.prisma.sitte({ id }).dates(),
  owner: async ({ id }, _, ctx) => await ctx.prisma.sitte({ id }).owner(),
  allergies: async ({ id }, _, ctx) => await ctx.prisma.sitte({ id }).allergies(),
};

module.exports = {
  Sitte
};
