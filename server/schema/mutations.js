const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;
const mongoose = require('mongoose');
require('../models/index');
const UserType = require('./types/user_type');
const User = mongoose.model('users');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        register: {
            type: UserType,
            args: {
                username: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(_, args) {
                return AuthService.register(args);
            }
        },
        // logout: {

        // },
        // login: {

        // },
        // verifyUser: {

        // },
    }
});

module.exports = mutation;