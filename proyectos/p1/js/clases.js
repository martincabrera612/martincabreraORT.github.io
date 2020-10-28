/* Martin Cabrera 185091
Santiago Vairo 244023 */

class Cliente{
    constructor(nombre, telefono, correo, web){
    this.nombre=nombre;
    this.telefono=telefono;
    this.correo=correo;
    this.web=web;
    }
    toString(){
        return this.nombre+" "+this.telefono+" "+this.correo+" "+this.web;
    }
}


class Empleado{
    constructor(nombre,telefono,salario){
    this.nombre=nombre;
    this.telefono=telefono;
    this.salario=salario;

    }
    toString(){
        return this.nombre+" "+this.telefono+" "+this.salario;
    }
}


class Proyecto{
    constructor(nombre,descripcion,areaTematica,cliente,lider){
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.areaTematica=areaTematica;
        this.cliente = cliente;
        this.lider=lider;
        this.listaEmpleadosAsignados=[];
        
    }
    toString(){
        return this.nombre+" "+this.descripcion+" "+this.areaTematica+" "+this.lider;
    }
}





class Sistema{
    constructor(){
        this.listaClientes =[];
        this.listaEmpleados=[];
        this.listaProyectos=[];
        this.listaEmpleadosDisponible=[];
    }
    agregarCliente(cliente){
        this.listaClientes.push(cliente);
    }

         
    agregarEmpleado(empleado) {
        this.listaEmpleados.push(empleado);
    }

    agregarEmpleadoDisponible (empleado) {
        this.listaEmpleadosDisponible.push(empleado)
    }

    agregarProyecto(proyecto){
        this.listaProyectos.push(proyecto);
    }


    eliminarEmpleado(empleado){
        this.listaEmpleados.splice(this.listaEmpleados.indexOf(empleado),1);
    }

    agregarProyecto(proyecto){
        this.listaProyectos.push(proyecto);
    }

}