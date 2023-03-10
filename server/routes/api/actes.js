const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const router = express.Router();
// In mongoose, a schema represents the structure of a particular document, either completely or just a portion of the document.
const schemaActes = mongoose.Schema({

    nom :           String,
    description :   String,
    duree :         Number,
    prix :          Number
})

// A model defines a programming interface for interacting with the database
const Acte = mongoose.model('Acte', schemaActes);

/*##
So a schema answers "what will the data in this collection look like?" and a model provides functionality 
like "Are there any records matching this query?" or "Add a new document to the collection".
##*/

app.use(express.json());

/*##
Express propose un système de routage qui permet de définir facilement des correspondances(associations) entre les URL demandées
 par les utilisateurs et les fonctions ou les pages qui doivent être renvoyées en réponse à ces demandes
##*/
// getdata
router.get('/', async (req, res) => {

    const data = await Acte.find();
    res.send(data)
})
// insert data
router.post('/', async (req, res) => {
    // Créer une instance du Modèle
    const acte = new Acte({
        nom :   req.body.nom,
        description :req.body.description,
        duree :   req.body.duree,
        prix :   req.body.prix
    })
    data = await acte.save();
    res.send(data)
})
// update data
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const acte = await Acte.findById(id);
    acte.nom    = req.body.nom;
    acte.description  = req.body.description;
    acte.duree     = req.body.duree ;
    acte.prix     = req.body.prix;

    const data = await acte.save();
    res.send(data);
})
// delete data
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const acte = await Acte.findById(id);
    
    const data = await acte.delete();
    res.send(data); //equal return
})

module.exports = router;