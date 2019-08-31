const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const mutations = require("./mutations");
const query = require("./types/root_queries");

module.exports = new GraphQLSchema({
  query: query,
  mutation: mutations
});
