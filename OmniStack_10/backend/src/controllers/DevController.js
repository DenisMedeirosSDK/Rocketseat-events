const axios = require('axios');

const { findConnections, sendMessage } = require('../websocket')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs)
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const response = await axios.get(`http://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = (response.data);

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
        return res.json(dev);
    },

    async update(req, res) {
        const { github_username, name, bio, techs } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const response = await axios.get(`http://api.github.com/users/${github_username}`);
            const { name = login, bio } = (response.data);


            dev = await Dev.findOneAndUpdate(req.params.id, {
                name,
                bio,
                techs,
            }, { new: true })

        }

        return res.json(dev);
    },


    async destroy(req, res) {
        await Dev.findByIdAndRemove(req.params.id)

        return res.send()
    }

};