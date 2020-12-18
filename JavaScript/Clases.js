class todo{
	constructor(descripcion, monto, categoria, moneda, tipo){
		this.descripcion=descripcion;
		this.monto=monto;
		this.categoria=categoria;
		this.moneda=moneda;
		this.tipo=tipo;
	}
	toString(){
        return this.categoria;
	}
}

class datos {
	constructor (){
		this.lista=[];
	}
	agregar(elem){
		this.lista.push(elem);
	}
	agregarCategoria(){
		return this.lista;	
	}
	listaPorTipo(tipo){
		let respuesta=[];
		for (let elem of this.lista){
			if (elem.tipo==tipo){
				respuesta.push(elem);
			}
		}
		return respuesta;
	}
	cantDatos(seleccionado){
		let cant=0
		for (let i=0; i<this.lista.length; i++){
			if (this.lista[i].categoria==seleccionado){
				cant=cant+1;
			}
		}
		return cant
	}
	comparar(categoria){
		let esta= false;
		for (let i = 0; i < this.lista.length-1 &&!esta; i++){
			if (this.lista[i].categoria == categoria){
				esta =true;
			}
		}
		return esta;
	}
}

