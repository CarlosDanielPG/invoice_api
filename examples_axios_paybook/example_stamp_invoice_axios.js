var axios = require('axios');

var id_user = '5ae0fd620b212a00638b45f8';

var data = {
  api_key: process.env.PAYBOOK_KEY,
  id_user: id_user,
  id_provider: 'acme',
  invoice_data: {
    serie: 'A',
    folio: '1',
    fecha: '2018-04-16T19:20:53',
    formaDePago: 'Una sola exhibicion',
    subTotal : "2168.22",
		descuento : "20",
		motivoDescuento : "Promocion mensual",
		moneda :"MXN",
		total : "2270.1",
		tipoDeComprobante :"ingreso",
		metodoDePago :"02",
		lugarExpedicion :"Ciudad de México",
		numCtaPago :"5219022",
    emisor : {
      nombre : "Carlos Perez",
      rfc :"AAA010101AAA",
			domicilioFiscal :{
				calle :"Calle 25",
				municipio :"Monterrey",
				estado :"Nuevo Leon",
				pais :"Mexico",
				codigoPostal :"64450 "
			},
			expedidoEn:{
				calle : "Calle 25",
				municipio : "Monterrey",
				estado : "Nuevo Leon",
				pais :"Mexico",
				codigoPostal :"64450 "
			},
			regimenFiscal :[{"regimen":"Empleado Honorarios"}]
    },
    receptor : {
			rfc : "AOOM8309271A8",
			nombre : "Pedro Perez Hernandez",
			domicilio :{
				calle : "Calle 25",
				municipio : "Monterrey",
				estado : "Nuevo Leon",
				pais : "Mexico",
				codigoPostal : "64450 "
			}
		},
		conceptos : [
			{
				cantidad : "10.5",
				unidad : "Kg",
				descripcion : "Alambre calibre 22",
				noIdentificacion : "SK3218932190",
				valorUnitario : "10",
				importe : "105"
			},
			{
				cantidad : "5",
				unidad : "Mt",
				descripcion : "Producto Importado",
				valorUnitario : "100",
				importe : "500",
				noIdentificacion :"SKU120312954"
			},
			{
				cantidad : "1",
				unidad : "2",
				descripcion : "Pago PRedial Vivienda",
				noIdentificacion : "H22",
				valorUnitario : "1563.22",
				importe : "1563.22",
				cuentaPredial : {
					numero : "PRE03185430011"
				}
			}
		],
		impuestos : {
			totalImpuestosRetenidos : "12.33",
			totalImpuestosTrasladados : "114.21",
			retenciones :[
				{
					impuesto : "ISR",
					importe : "12.33"
				}
			],
			traslados :[
				{
					impuesto : "IVA",
					tasa : "10",
					importe : "114.21"
				}
			]
		}
  }
};

axios.post(process.env.PAYBOOK_URL + 'invoicing/mx/invoices', data, {
  headers : {
    'Content-Type' : 'application/json'
  },
})
.then(function(response){
  console.log(response.data);
})
.catch(function(error){
  console.log(error);
});
