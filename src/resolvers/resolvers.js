var { User: User } = require("/home/dorman/graphql/models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const JWT_SECRET = require("../constants/constants");
const daoData = require("../data/dao");

var authnticationError = "User is not authenticated";

const resolvers = {
    Query: {

        daos: async (_, context, { id }, { user }) => {
            if (context.user) {
                return daoData.filter((dao) => dao.id == id)[0];
                
            }
            throw new Error(authnticationError);
        },

        async daoName(_, context, { name }, { user }) {
            if (user) {
                return daoData.filter((dao) => dao.name == name);
            }
            throw new Error(authnticationError);
        }
    },

    Mutation: {
        async register(_, {login, password }) {
            const user = await User.create({
                login,
                password: await bcrypt.hash(password, 10),
            });

            return jwt.sign({ id: user.id, login: user.login }, JWT_SECRET, {
                expiresIn: "3m",
            });
        },

        async login(_, { login, password }) {
            const user = await User.findOne({ where: { login } });

            if (!user) {
                throw new Error("User does not exist");
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new Error("Password is incorrect");
            }

            return jwt.sign({ id: user.id, login: user.login }, JWT_SECRET, {
                expiresIn: "3m",
            });
        },
    },
};

module.exports = resolvers;