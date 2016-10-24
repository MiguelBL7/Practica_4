$(document).ready(function(){
	/*Lista con un array para cada mesa formado por:
		- integer: Precio total actual.
		- boolean: Con/sin café.
		- boolean:  Con/sin copa.
		- Entre 0 y n strings: Lista de los platos elegidos.
	*/
	var mesas = [[0,false,false],[0,false,false],[0,false,false],[0,false,false],[0,false,false]];
	
	//Una vez cargada la página, "esconde" las listas no necesarias.
	$("#segundosPlatos").hide();
	$("#listaPostres").hide();
	
	//Control para mostrar los platos: Se muestra el panel correspondiente a cada lista.
	$("#platos1").click(function() {
		$("#primerosPlatos").show();
		$("#segundosPlatos").hide();
		$("#listaPostres").hide();
	});
	$("#platos2").click(function() {
		$("#primerosPlatos").hide();
		$("#segundosPlatos").show();
		$("#listaPostres").hide();
	});
	$("#lPostres").click(function() {
		$("#primerosPlatos").hide();
		$("#segundosPlatos").hide();
		$("#listaPostres").show();
	});
	
	//Cierra la cuenta de una mesa, y elimina su lista de platos.
	$("#btnPagar").click(function() {
		//Recoge el número y los datos de la mesa.
		var mesaId = parseInt($("#mesas").val(),10);
		var mesaAux = mesas[mesaId];
		
		//Muestra una ventana con el precio final.
		var numMesa = mesaId + 1;
		alert("Cuenta mesa n" + numMesa + " - Precio total: " + mesaAux[0] + " euros.");
		
		//Limpia la interfaz.
		$("#listaElegidos").empty();
		$("#total").val(0);
		
		//Limpia la lista de platos de la mesa.
		mesas[mesaId]=[0,false,false];
		mesaAux = mesas[mesaId];
		$("#cafe").prop('checked', mesaAux[1]);
		$("#copa").prop('checked', mesaAux[2]);
	});
	
	//Gestiona el cambio de mesas.
	$("#mesas").change(function() {
		//Recoge la nueva mesa elegida y sus datos.
		var mesaId = $("#mesas").val();
		var mesaAux = mesas[mesaId];
		
		//Carga en la interfaz los datos de la nueva mesa.
		$("#total").val(mesaAux[0]);
		$("#cafe").prop('checked', mesaAux[1]);
		$("#copa").prop('checked', mesaAux[2]);
		
		$("#listaElegidos").empty();
		for (i = 3; i <= mesaAux.length; i++) {
			$("#listaElegidos").append($('<option>', {
				value: 1,
				text: mesaAux[i]
			}));
		}
    });
	
	//Añade primeros platos a la lista de platos elegidos.
	$("#primerosPlatos").dblclick(function() {
		//Se recoge el nombre del plato y su precio.
		var plato = $(this).find(":selected").text();
		var valorE =  parseInt($("#primerosPlatos").val(), 10);
		
		//Se añade a la caja de la lista de platos elegido.
		$("#listaElegidos").append($('<option>', {
			value: 1,
			text: plato
		}));

		//Se guarda el plato y se actualiza el precio de la mesa.
		var mesaId = $("#mesas").val();
		var mesaAux = mesas[mesaId];
		
		mesaAux.push(plato);
		mesaAux[0] = mesaAux[0] + valorE;
		
		$("#total").val(mesaAux[0]);
	});
	
	//Añade segundos platos a la lista de platos elegidos.
	$("#segundosPlatos").dblclick(function() {
		//Se recoge el nombre del plato y su precio.
		var plato = $(this).find(":selected").text();
		var valorE =  parseInt($("#segundosPlatos").val(), 10);
		
		//Se añade a la caja de la lista de platos elegido.
		$("#listaElegidos").append($('<option>', {
			value: 1,
			text: plato
		}));

		//Se guarda el plato y se actualiza el precio de la mesa.
		var mesaId = $("#mesas").val();
		var mesaAux = mesas[mesaId];
		
		mesaAux.push(plato);
		mesaAux[0] = mesaAux[0] + valorE;
		
		$("#total").val(mesaAux[0]);
	});
	
	//Añade postres a la lista de platos elegidos.
	$("#listaPostres").dblclick(function() {
		//Se recoge el nombre del postre y su precio.
		var plato = $(this).find(":selected").text();
		var valorE =  parseInt($("#listaPostres").val(), 10);
		
		//Se añade a la caja de la lista de platos elegido.
		$("#listaElegidos").append($('<option>', {
			value: 1,
			text: plato
		}));

		//Se guarda el plato y se actualiza el precio de la mesa.
		var mesaId = $("#mesas").val();
		var mesaAux = mesas[mesaId];
		
		mesaAux.push(plato);
		mesaAux[0] = mesaAux[0] + valorE;
		
		$("#total").val(mesaAux[0]);
	});

	//Añade o quita el café del pedido.
	$("#cafe").change(function(){
		//Recoge la mesa seleccionada.
		var mesaId = $("#mesas").val();
		var mesaAux = mesas[mesaId];
		
		//Añade o quita el café y se actualiza el precio total.
		if(document.getElementById('cafe').checked){
			mesaAux[1] = true;
			mesaAux[0] = mesaAux[0] + 0.80;
		} else {
			mesaAux[1] = false;
			mesaAux[0] = mesaAux[0] - 0.80;
		}
		
		$("#total").val(mesaAux[0]);
	});
	
	//Añade o quita la copa del pedido.
	$("#copa").change(function(){
		//Recoge la mesa seleccionada.
		var mesaId = $("#mesas").val();
		var mesaAux = mesas[mesaId];
		
		//Añade o quita la copa y se actualiza el precio total.
		if(document.getElementById('copa').checked){
			mesaAux[2] = true;
			mesaAux[0] = mesaAux[0] + 3;
		} else {
			mesaAux[2] = false;
			mesaAux[0] = mesaAux[0] - 3;
		}
		
		$("#total").val(mesaAux[0]);
	});
});