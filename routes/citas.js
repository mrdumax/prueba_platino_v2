var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin_peluqueria:EveeCBH5szdHNeNq@cluster0.4eyd6.mongodb.net/test?retryWrites=true&w=majority";

async function getClientesList() {
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
  var cliente = clienteList[0];
  res.render('citas', { title: 'Citas', cliente: cliente });
});

router.get('/crear', function(req, res, next) {
  res.render('citas-crear', { title: 'Citas:Crear', idCliente:'6158bd7037c80ec49b3b707b'});
});

router.post('/guardar', async function (req, res) {
    const client = new MongoClient(uri);
    try {
        await client.connect();

	const cursor = client.db("peluqueria_anita").collection("customer").find();
	var clienteList = await cursor.toArray();
	var cliente = clienteList[0];
	var citas = cliente.citas ? cliente.citas : new Array();
	citas.push(req.body);
	
        const result = await client.db("peluqueria_anita").collection("customer")
			    .updateOne(
			      {_id:cliente._id},
			      {$set:{citas:citas}},
			      {upsert:true}
			    );
	res.send('Se guardo exitosamente');

    } catch (e) {
        console.error(e);
	res.send('Error al guardar ' + e);
    } finally {
        await client.close();
    }
});

module.exports = router;
