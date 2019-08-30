const mongoose = require("mongoose");
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
} = graphql;

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        _id: { type: GraphQLID },
        date: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        token: { type: GraphQLString },
        loggedIn: { type: GraphQLBoolean }
        
    })
});

module.exports = UserType;