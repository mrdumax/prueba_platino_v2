var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');

async function getClientesList() {
    const uri = "mongodb+srv://admin_peluqueria:EveeCBH5szdHNeNq@cluster0.4eyd6.mongodb.net/test?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();

        const cursor = client.db("peluqueria_anita").collection("customer").find();
	return await cursor.toArray();

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

/* Clientes. */
router.get('/', async function(req, res, next) {
  var clienteList = await getClientesList();
  res.render('clientes', { title: 'Clientes', clienteList: clienteList });
});

module.exports = router;
