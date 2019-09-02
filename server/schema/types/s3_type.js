const graphql = require('graphql');
const {
  GraphQLString,
  GraphQLObjectType
} = graphql;

const s3PayloadType = new GraphQLObjectType({
    name: "s3Payload",
    fields: () => ({
        signedRequest: { type: GraphQLString },
        url: { type: GraphQLString }
    })
})

module.exports = s3PayloadType;
// // how the fuck do we do this schema part for the our back end?
// ?