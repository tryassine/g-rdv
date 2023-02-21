const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const router = express.Router();
// In mongoose, a schema represents the structure of a particular document, either completely or just a portion of the document.
const schemaUsers = mongoose.Schema({

    nomUtilisateur :     String,
    MDP :   String,

})

// A model defines a programming interface for interacting with the database
const User = mongoose.model('User', schemaUsers);

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
router.post('/', async (req, res, next) => {

           const data =  await User.find({nomUtilisateur:req.body.lgn, MDP: req.body.psw});

            if( data.length ){
                res.send("SUCCESS")
            }
            else{
                res.send("Le nom d'utilisateur ou le mot de passe est invalide !")
            }
    
})

// update data
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id);
    user.nom    = req.body.nom;
    user.description  = req.body.description;
    user.duree     = req.body.duree ;
    user.prix     = req.body.prix;

    const data = await user.save();
    res.send(data);
})
// delete data
// router.delete('/:id', async (req, res) => {
//     const id = req.params.id;

//     const user = await user.findById(id);
    
//     const data = await user.delete();
//     res.send(data); //equal return
// })

module.exports = router;