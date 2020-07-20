const Clarifai = require('clarifai');

const app = new Clarifai.App({ apiKey: '9c8c41a93f634e379afa0826b681183c' });

const handleApiCall = (req, res) => {
    app.models
        .predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    return db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('unable to update entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}