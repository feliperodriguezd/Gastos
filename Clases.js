// Felipe Rodriguez y Valentina Techera

class Series {
	constructor(){
		this.lista=[];
	}
	agregar(elem){
		this.lista.push(elem);
		this.lista.sort(function (a,b){
							return a.ordenLetras(b)
						})
	}
	darTodos(){
		return this.lista;
	}
	cantidadOpiniones(serie){
		let lista=this.lista;
		for (let elem of lista){
			if (elem.nombre==serie){
				elem.cantOpiniones++;
			}
		}
	}
	repetida(nombre){
		let repetido=false;
		for (let elem of this.lista){
			if (elem.nombre.toUpperCase() == nombre.toUpperCase()){
				repetido=true;
			}
		}
		return repetido;
	}
	modificarDescripcion(nombre, descripcion){
		for (let elem of this.lista){
			if (elem.nombre.toUpperCase() == nombre.toUpperCase()){
				elem.descripcion=descripcion
			}
		}
	}
	modificarTempradas(nombre, temporadas){
		for (let elem of this.lista){
			if (elem.nombre.toUpperCase() == nombre.toUpperCase()){
				elem.temporadas=temporadas
			}
		}
	}
	modificarCapitulos(nombre, capitulos){
		for (let elem of this.lista){
			if (elem.nombre.toUpperCase()== nombre.toUpperCase()){
				elem.capitulos=capitulos
			}
		}
	}
	previo(nombre){
		let lugar = 0;
		for (let i = 0; i < this.lista.length; i++){
			if (this.lista[i].nombre == nombre){
				lugar = i-1
			}
			if (lugar<0){
				lugar = this.lista.length-1
			}
		}
		return this.lista[lugar].nombre;
	}
	siguiente(nombre){
		let lugar = 0;
		for (let i = 0; i < this.lista.length; i++){
			if (this.lista[i].nombre == nombre){
				lugar = i+1
			}
			if (lugar>this.lista.length-1){
				lugar = 0
			}
		}
		return this.lista[lugar].nombre;
	}
	descripcion(nombre){
		let respuesta="";
		for (let elem of this.lista){
			if (elem.nombre == nombre){
				respuesta = elem.descripcion
			}
		}
		return respuesta;
	}
	temporadas(nombre){
		let respuesta="";
		for (let elem of this.lista){
			if (elem.nombre == nombre){
				respuesta = elem.temporadas
			}
		}
		return respuesta;
	}
	capitulos(nombre){
		let respuesta="";
		for (let elem of this.lista){
			if (elem.nombre == nombre){
				respuesta = elem.capitulos
			}
		}
		return respuesta;
	}
	existe(nombre, temporada, capitulo){
		let respuesta=true;
		for (let elem of this.lista){
			if (elem.nombre==nombre){
				if (temporada>elem.temporadas || capitulo>elem.capitulos){
					respuesta=false;
				}
			}
		}
		return respuesta;
	}
}

class caracteristicas {
	constructor(nombre, descripcion, temporadas, capitulos){
		this.nombre = nombre;
        this.descripcion = descripcion;
        this.temporadas = temporadas;
        this.capitulos = capitulos;
	}
	toString(){
		return this.nombre;
	}
	ordenLetras(b){
		return this.nombre.localeCompare(b.nombre)
	}
}

class Opinion {
    constructor(nombre, comentario, temporada, capitulo, puntaje) {
        this.nombre = nombre;
		this.comentario = comentario;
        this.temporada = temporada;
        this.capitulo = capitulo;
        this.puntaje = puntaje;
    }

    toString() {
        return "Temp: " + this.temporada + " " + "Cap: " + this.capitulo + " " + "Puntaje: " + this.puntaje + " " + this.comentario;
    }
}

class Opiniones {
	constructor(){
		this.lista=[];
	}
	 agregar(elem) {
        this.lista.push(elem);
    }

    darTodos() {
        return this.lista;
    }
	buscarPuntaje(nombre, temporada, capitulo){
		let respuesta=0;
		for (let elem of this.lista){
			if (elem.nombre==nombre){
				if (elem.temporada==temporada){
					if (elem.capitulo==capitulo){
						respuesta=elem.puntaje
					}
				}
			}
		}
		return respuesta;
	}
	repetida(nombre, temporada, capitulo){
		let repetido=false;
		for (let elem of this.lista){
			if (elem.nombre == nombre && elem.temporada== temporada && elem.capitulo==capitulo){
				repetido=true;
			}
		}
		return repetido;
	}
	modificarComentario(nombre, temporada, capitulo, comentario){
		for (let elem of this.lista){
			if (elem.nombre == nombre && elem.temporada==temporada && elem.capitulo==capitulo){
				elem.comentario=comentario
			}
		}
	}
	modificarPuntaje(nombre, temporada, capitulo, puntaje){
		for (let elem of this.lista){
			if (elem.nombre == nombre && elem.temporada==temporada && elem.capitulo==capitulo){
				elem.puntaje=puntaje
			}
		}
	}
}

class Sistema {
	constructor(){
		this.lista=[];
	}
	agregar(elem){
		this.lista.push(elem);
		this.lista.sort(function (a,b){
							return a.ordenLetras(b)
						})
	}
	
	darTodos(){
		return this.lista;
	}
	
	darConOpiniones(){
		let respuesta=[];
		for (let elem of this.lista){
			if (elem.cantOpiniones>0){
				respuesta.push(elem)
			}
		}
		return respuesta;
	}
	
	darOrdenLetra(){
		let respuesta = this.lista.sort(function (a,b){
							return a.ordenLetras(b)
						})
		return respuesta;
	}
	eleiminarPuntaje(nombre, puntaje){
		for (let elem of this.lista){
			if (elem.nombre==nombre){
				elem.sumaPuntaje=elem.sumaPuntaje-puntaje;
			}
		}
	}
	puntajePromedio(nombre, puntaje){
		for (let elem of this.lista){
			if (elem.nombre==nombre){
				elem.sumaPuntaje=elem.sumaPuntaje+puntaje;
				elem.promedio=elem.sumaPuntaje/elem.cantOpiniones;
			}
		}
	}
	cantidadOpiniones(serie){
		let lista=this.lista;
		for (let elem of lista){
			if (elem.nombre==serie){
				elem.cantOpiniones++;
			}
		}
	}
	darOrdenNumeros(){
		let respuesta = this.lista.sort(function (a,b){
							return a.ordenNumero(b)
						})
		return respuesta;
	}
	modificarDescripcion(nombre, descripcion){
		for (let elem of this.lista){
			if (elem.nombre.toUpperCase() == nombre.toUpperCase()){
				elem.descripcion=descripcion
			}
		}
	}
	modificarTempradas(nombre, temporadas){
		for (let elem of this.lista){
			if (elem.nombre.toUpperCase() == nombre.toUpperCase()){
				elem.temporadas=temporadas
			}
		}
	}
	modificarCapitulos(nombre, capitulos){
		for (let elem of this.lista){
			if (elem.nombre.toUpperCase()== nombre.toUpperCase()){
				elem.capitulos=capitulos
			}
		}
	}
}

class caracteristicas1{
	constructor(nombre, descripcion, temporadas, capitulos, cantOpiniones, sumaPuntaje, promedio){
		this.nombre=nombre;
		this.descripcion=descripcion;
		this.temporadas=temporadas;
		this.capitulos=capitulos;
		this.cantOpiniones=cantOpiniones;
		this.sumaPuntaje=sumaPuntaje;
		this.promedio=promedio;
	}
	
	ordenNumero(b){
		return b.cantOpiniones-this.cantOpiniones;
	}
	
	ordenLetras(b){
		return this.nombre.localeCompare(b.nombre);
	}
	
    toString() {
        return this.nombre + "-" + this.descripcion	+ " (Temporadas:" + this.temporadas + ", Capitulos: " + this.capitulos + ")";
    }
}