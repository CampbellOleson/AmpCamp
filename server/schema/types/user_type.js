const mongoose = require("mongoose");
const graphql = require("graphql");
const User = mongoose.model('users');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    date: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    bannerPhoto: { type: GraphQLString },
    artist: { type: GraphQLBoolean },
    albums: {type: new GraphQLList(require('./album_type')),
        resolve(parentValue) {
            return User.findById(parentValue._id)
                .populate('albums')
                .then(user => user.albums)
                .catch(err => err);
        }
    }
  })
});

module.exports = UserType;
