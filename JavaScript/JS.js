window.addEventListener("load", inicio);
var sumatotal=0;
var info = new datos();

function inicio(){
	document.getElementById("boton").addEventListener("click", agregar);
	document.getElementById("total").addEventListener("click", total);
	document.getElementById("tipoCat").addEventListener("click", calculocantidad);
}

function agregar(){
	let tablaPantalla = document.getElementById("tabla");
	if (comprobar()==true){
		let fila=tablaPantalla.insertRow();
		let tipo=fila.insertCell(0);
		let descripcion=fila.insertCell(1);
		let monto=fila.insertCell(2);
		let categoria=fila.insertCell(3);
		if (document.getElementById("ingreso").checked){
			tipo.innerHTML="Ingreso";
			monedaSuma();
		} else {
			tipo.innerHTML="Egreso";
			monedaResta();
		}
		descripcion.innerHTML=document.getElementById("descripcion").value;
		monto.innerHTML=moneda();
		if (document.getElementById("categoria1").value!="" && document.getElementById("categoria2").selectedIndex==""){
			categoria.innerHTML=document.getElementById("categoria1").value;
		} else{
			categoria.innerHTML=document.getElementById("categoria2").value;
		}
		info.agregar(new todo(document.getElementById("descripcion").value, document.getElementById("monto").value, document.getElementById("categoria1").value));
		agregarCantidad(document.getElementById("tipoCategoria"));
		agregarCantidad(document.getElementById("categoria2"));
		limpirar();
	}
}

function comprobar(){
	let respuesta=true;
	if (document.getElementById("monto").value==""){
		respuesta=false;
		alert("Ingrese un monto");
	}
	if (document.getElementById("categoria1").value!="" && document.getElementById("categoria2").selectedIndex!=""){
		respuesta=false;
		alert("Las dos campos en categoria estan completos");
	}
	return respuesta
}

function calculocantidad(){
	let seleccionado = document.getElementById("tipoCategoria").value;
	let respuesta=document.getElementById("respuesta");
	respuesta.innerHTML="La cantidad de veces que esta categoria está es "+info.cantDatos(seleccionado);
	
}


function agregarCantidad (combo){
	if (!info.comparar(combo.value)){
		let datos = info.agregarCategoria();
			let nodoC = document.createElement("option");
			let nodoTextoC = document.createTextNode(datos[datos.length-1]);
			nodoC.appendChild(nodoTextoC);
			combo.appendChild(nodoC);
	}
}

function limpirar(){
	document.getElementById("descripcion").value="";
	document.getElementById("monto").value="";
	document.getElementById("categoria1").value="";
}

function total (){
	let tablaPantalla = document.getElementById("tabla");
	let fila=tablaPantalla.insertRow();
	let total=fila.insertCell(0);
	let suma=fila.insertCell(1);
	total.innerHTML="Total";
	suma.innerHTML="$ "+sumatotal;
	if (document.getElementById("$2").checked){
		suma.innerHTML="$ "+sumatotal;
	} else {
		// Ir actualizando el valor del dolar
		if ((sumatotal/43)-parseInt(sumatotal/43)>0.5){
			suma.innerHTML="U$S "+(parseInt(sumatotal/43)+1)+ " (aprox.)";
		} else{
			if ((sumatotal/43)-parseInt(sumatotal/43)==0){
				suma.innerHTML="U$S "+parseInt(sumatotal/43);
			} else {
				suma.innerHTML="U$S "+parseInt(sumatotal/43)+ " (aprox.)";
			}
		}
	}
}

function moneda(){
	let respuesta;
	if (document.getElementById("USD").checked){
		respuesta="U$S "+document.getElementById("monto").value;
	} else {
		respuesta="$ "+document.getElementById("monto").value;
	}
	return respuesta;
}

function monedaSuma (){
	// Ir actualizando el valor del dolar
	let respuesta;
	if (document.getElementById("USD").checked){
		respuesta = sumatotal=sumatotal+(parseInt(document.getElementById("monto").value)*43);
	} else {
		respuesta = sumatotal=sumatotal+parseInt(document.getElementById("monto").value);
	}
	return respuesta;
}

function monedaResta(){
	// Ir actualizando el valor del dolar
	let respuesta;
	if (document.getElementById("USD").checked){
		respuesta = sumatotal=sumatotal-(parseInt(document.getElementById("monto").value)*43);
	} else {
		respuesta = sumatotal=sumatotal-parseInt(document.getElementById("monto").value);
	}
	return respuesta;
}