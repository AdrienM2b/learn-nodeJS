const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Pas besoin de spécifier le chemin pour .env s'il est à la racine
const app = express();
const port = 3000;

const myToken = process.env.API_KEY
const urlApi = process.env.URL_API
const addToken = '?token='
const search = 'paris'

app.use(express.json());

// Route pour récupérer les articles de JSONPlaceholder
app.get('/location/cities', async (req, res) => {
    try {
        // const { search } = req.query
        // const { token } = req.query

        if (!search) {
            return res.status(400).json({ error: 'Paramètre de recherche manquant.' });
        }

        const response = await axios.get(`${urlApi}/location/cities?token=${myToken}&search=${search}`)
        const cities = response.data;
        console.log(response)
        res.json(cities);
    } catch (error) {
        console.error('Erreur lors de la requête à l\'API météo:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des informations de la ville' });
    }
});


app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});