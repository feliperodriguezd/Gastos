// Felipe Rodriguez y Valentina Techera

window.addEventListener("load", inicio);
let series = new Series();
let opiniones = new Opiniones();
let sistema = new Sistema();

function inicio (){
	document.getElementById("idAgregarSeries").addEventListener("click", agregar);
	document.getElementById("idSerie").addEventListener("change", lista);
	document.getElementById("idResetSeries").addEventListener("click", resetearSeries);
	document.getElementById("idResetOpiniones").addEventListener("click", resetearOpiniones);
	document.getElementById("idAgregarOpiniones").addEventListener("click", agregarOpinion);
	document.getElementById("idImdb").addEventListener("click", imdb);
	document.getElementById("idSeries").addEventListener("click", verSeries);
	document.getElementById("idOpiniones").addEventListener("click", verOpiniones);
	document.getElementById("idEstadisticas").addEventListener("click", verEstadisticas);
	document.getElementById("idPrevio").addEventListener("click", previo);
	document.getElementById("idSiguiente").addEventListener("click", siguiente);
	document.getElementById("idOrden").addEventListener("click", agregarTabla);
	document.getElementById("idOrden1").addEventListener("click", agregarTabla);
	mostrar("Series1");
	ocultar("Opiniones1");
	ocultar("Estadisticas1");
	agregarTabla();
}

function lista (){
	let serie = document.getElementById("idSerie").value;
	agregarALista(serie);
}

function previo (){
	let nombre = document.getElementById("idNombre");
	let descripcion = document.getElementById("idDescripcion");
	let temporadas = document.getElementById("idTemporadas");
	let capitulos = document.getElementById("idCapitulos");
	nombre.value=series.previo(nombre.value);
	descripcion.value=series.descripcion(nombre.value);
	temporadas.value=series.temporadas(nombre.value);
	capitulos.value=series.capitulos(nombre.value);
}

function siguiente(){
	let nombre = document.getElementById("idNombre");
	let descripcion = document.getElementById("idDescripcion");
	let temporadas = document.getElementById("idTemporadas");
	let capitulos = document.getElementById("idCapitulos");
	nombre.value=series.siguiente(nombre.value);
	descripcion.value=series.descripcion(nombre.value);
	temporadas.value=series.temporadas(nombre.value);
	capitulos.value=series.capitulos(nombre.value);
}

function resetearSeries(){
	document.getElementById("idFormSeries").reset();
}

function resetearOpiniones(){
	document.getElementById("FormOpiniones").reset();
}

function verSeries(){
	mostrar("Series1");
	ocultar("Opiniones1");
	ocultar("Estadisticas1");
}

function verOpiniones(){
	ocultar("Series1");
	mostrar("Opiniones1");
	ocultar("Estadisticas1");
}

function verEstadisticas(){
	ocultar("Series1");
	ocultar("Opiniones1");
	mostrar("Estadisticas1");
}


function agregar(){
	if (document.getElementById("idFormSeries").reportValidity()){
		let nombre = document.getElementById("idNombre").value;
		let descripcion = document.getElementById("idDescripcion").value;
		let temporadas = document.getElementById("idTemporadas").value;
		let capitulos = document.getElementById("idCapitulos").value;
		let cantOpiniones=0;
		let sumaPuntaje=0;
		let promedio=0;
		if (series.repetida(nombre)==false){
			series.agregar(new caracteristicas(nombre, descripcion, temporadas, capitulos));
			sistema.agregar(new caracteristicas1(nombre,descripcion, temporadas, capitulos, cantOpiniones, sumaPuntaje, promedio))
			agregarSelect();
			sinOpinion();
		} else {
			series.modificarDescripcion(nombre, descripcion);
			series.modificarTempradas(nombre, temporadas);
			series.modificarCapitulos(nombre, capitulos);
			sistema.modificarDescripcion(nombre, descripcion);
			sistema.modificarTempradas(nombre, temporadas);
			sistema.modificarCapitulos(nombre, capitulos);
			sinOpinion();
			top3();
		}
	}
	agregarTabla();
}

function agregarTabla(){
	let tabla=document.getElementById("idTabla");
	let ordenNombre=document.getElementById("idOrden");
	tabla.innerHTML="";
	let caption= tabla.createCaption();
	caption.innerHTML="Información detallada"
	let cabezal = tabla.createTHead();
	let filaTit= cabezal.insertRow();
	let celTit1 = filaTit.insertCell(0);
	celTit1.innerHTML ="Serie";
	let celTit2 = filaTit.insertCell(1);
	celTit2.innerHTML = "Cantidad de opiniones";
	let celTit3 = filaTit.insertCell(2);
	celTit3.innerHTML = "Promedio General";
	if (ordenNombre.checked){
		let datos=sistema.darOrdenLetra();
		for (let elem of datos){
			let fila = tabla.insertRow();
			let celda1 = fila.insertCell(0);
			celda1.innerHTML= elem.nombre;
			let celda2 = fila.insertCell(1);
			celda2.innerHTML= elem.cantOpiniones;
			let celda3 = fila.insertCell(2);
			celda3.innerHTML= parseInt(elem.promedio);
		}
	} else {
		let datos1=sistema.darOrdenNumeros();
		for (let elem of datos1){
			let fila = tabla.insertRow();
			let celda1 = fila.insertCell(0);
			celda1.innerHTML= elem.nombre;
			let celda2 = fila.insertCell(1);
			celda2.innerHTML= elem.cantOpiniones;
			let celda3 = fila.insertCell(2);
			celda3.innerHTML= parseInt(elem.promedio);
		}
	}
}

function imdb (){
	let serie=document.getElementById("idNombre").value;
	if (serie==""){
		document.getElementById("idImdb").href="https://www.imdb.com/";
	} else {
		document.getElementById("idImdb").href="https://www.imdb.com/find?q="+ serie + "&ref_=nv_sr_sm";
	}
}

function agregarSelect(){
	let combo = document.getElementById("idSerie");
	combo.innerHTML = "";
	let datos = series.darTodos();
	for (let elemento of datos){
		let nodoC = document.createElement("option");
		let nodoTextoC = document.createTextNode(elemento);
		nodoC.appendChild(nodoTextoC);
		combo.appendChild(nodoC);
	}
}

function ocultar(clase){
	var x = document.getElementsByClassName(clase);
	var i;
	for (i = 0; i < x.length; i++) {
			x[i].style.display = "none";
	}
}

function mostrar(clase){
	var x = document.getElementsByClassName(clase);
	var i;
	for (i = 0; i < x.length; i++) {
			x[i].style.display = "block";
	}
}

function agregarOpinion() {
    if (document.getElementById("FormOpiniones").reportValidity()){
			let nombre= document.getElementById("idSerie").value;
			let comentario = document.getElementById("idComentario").value;
			let temporada = document.getElementById("idNumTemporada").value;
			let capitulo = document.getElementById("idNumCapitulo").value;
			let puntaje = parseInt(document.getElementById("idPuntaje").value/10);
			if (opiniones.repetida(nombre, temporada, capitulo)==false){
				if (series.existe(nombre, temporada, capitulo)==true){
					opiniones.agregar(new Opinion(nombre, comentario, temporada, capitulo, puntaje));
					agregarALista(nombre);
					sistema.cantidadOpiniones(nombre);
					sistema.puntajePromedio(nombre, puntaje);
					agregarTabla();
					top3();
					sinOpinion();
				} else{
					alert("Numero de temporada o capuitulo incorrectos");
				}
			} else {
				duplicada(nombre, temporada, capitulo, comentario, puntaje);
				sistema.puntajePromedio(nombre, puntaje);
				agregarALista(nombre);
				agregarTabla();
			}
		}
	}

function duplicada(nombre, temporada, capitulo, comentario, puntaje){
	eliminar(nombre, temporada, capitulo);
	opiniones.modificarComentario(nombre, temporada, capitulo, comentario);
	opiniones.modificarPuntaje(nombre, temporada, capitulo, puntaje);
}

function eliminar(nombre, temporada, capitulo){
	let puntaje = opiniones.buscarPuntaje(nombre, temporada, capitulo);
	sistema.eleiminarPuntaje(nombre, puntaje);
}

function agregarALista(nombre) {
    let lista = document.getElementById("idLista");
    lista.innerHTML = "";
    let datos = opiniones.darTodos();
    for (let elem of datos) {
		if (elem.nombre==nombre){	
			let nodo = document.createElement("li");
			let nodoTexto = document.createTextNode(elem);
			nodo.appendChild(nodoTexto);
			lista.appendChild(nodo);
		}
    }
}

function top3 (){
	let lista = document.getElementById("idTop3");
	lista.innerHTML ="";
	let top1=0;
	let top2=0;
	let top3=0;
	let top1Serie="";
	let top2Serie="";
	let top3Serie="";
	let top1Nombre="";
	let top2Nombre="";
	let datos=sistema.darConOpiniones();
	
	for (let elem of datos){
		if (top1<elem.cantOpiniones){
			top1=elem.cantOpiniones
			top1Serie=elem
			top1Nombre=elem.nombre;
		}
	}
	for (let elem of datos){
		if (top2<elem.cantOpiniones && elem.nombre!=top1Nombre){
			top2=elem.cantOpiniones
			top2Serie=elem
			top2Nombre=elem.nombre
		}
	}
	for (let elem of datos){
		if (top3<elem.cantOpiniones && elem.nombre!=top1Nombre && elem.nombre!=top2Nombre){
			top3=elem.cantOpiniones
			top3Serie=elem
		}
	}
	
	if (datos.length==1){
		solo1(lista, top1Serie);
	} else {
		if (datos.length==2){
			solo1(lista, top1Serie);
			solo2(lista, top2Serie);
		} else {
			solo1(lista, top1Serie);
			solo2(lista, top2Serie);
			solo3(lista, top3Serie);
		}
	}
}

function solo1(lista, top1Serie){
	let nodo = document.createElement("li");
	let nodoTexto = document.createTextNode(top1Serie);
	nodo.appendChild(nodoTexto);
	lista.appendChild(nodo);
}

function solo2(lista, top2Serie){
	let nodo = document.createElement("li");
	let nodoTexto = document.createTextNode(top2Serie);
	nodo.appendChild(nodoTexto);
	lista.appendChild(nodo);
}

function solo3(lista, top3Serie){
	let nodo = document.createElement("li");
	let nodoTexto = document.createTextNode(top3Serie);
	nodo.appendChild(nodoTexto);
	lista.appendChild(nodo);
}

function sinOpinion (){
	let lista = document.getElementById("idSinOpinion");
	lista.innerHTML ="";
	let datos=sistema.darTodos();
	for (let elem of datos){
		if (elem.cantOpiniones==0){
			let nodo = document.createElement("li");
			let nodoTexto = document.createTextNode(elem);
			nodo.appendChild(nodoTexto);
			lista.appendChild(nodo);
		}
	}
}