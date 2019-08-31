const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
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
        logout: {
            type: UserType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(_, args) {
                return AuthService.logout(args);
            }
        },
        login: {
            type: UserType,
            args:{
                username: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(_, args){
                return AuthService.login(args)
            }
        },
        verifyUser: {
            type: UserType,
            args: {
                token: { type: GraphQLString} 
            },
            resolve(_, args){
                return AuthService.verifyUser(args)
            }
        },
    }
});    

module.exports = mutation;

