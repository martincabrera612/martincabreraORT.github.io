/* Martin Cabrera 185091
Santiago Vairo 244023 */
 
 window.addEventListener('load',inicio);

let sistema = new Sistema;

function inicio(){
    document.getElementById("botonregistrarcliente").addEventListener("click", registrarCliente);
    document.getElementById("botonRegEmp").addEventListener("click",registrarEmpleado);
    //document.getElementById("botonRegEmp").addEventListener("click", AgregarEmpleadosSalario);
    document.getElementById("botonRegEmp").addEventListener("click", crearTabla);
    document.getElementById("botonRegistrarProyecto").addEventListener("click",registrarProyecto);
    document.getElementById("botonRegistrarProyecto").addEventListener("click", crearTabla);
    document.getElementById("botonAsignar").addEventListener("click",asignarEmpleado);
    document.getElementById("botonAsignar").addEventListener("click", crearTabla);
    document.getElementById("proyectoEliminar").addEventListener("change", mostrarEmpleadosAsignadosProyecto);
    document.getElementById("botonEliminar").addEventListener("click",eliminarEmpleado);
    document.getElementById("botonEliminar").addEventListener("click", crearTabla);
    document.getElementById("radioMin").addEventListener("click", mostrarMinimo);
    document.getElementById("radioMax").addEventListener("click", mostrarMinimo);
    //QR document.getElementById("")
    
}




function asignarEmpleado() {
    let indice = document.getElementById("asignarProyecto").selectedIndex;
    let empleado = document.getElementById("asignarEmpleados").value;
    if (!checkLider(indice, empleado)) {
        if (noRepetidoNombreAsignacion(empleado, sistema.listaProyectos[indice].listaEmpleadosAsignados, "empleado")) {
            sistema.listaProyectos[indice].listaEmpleadosAsignados.push(empleado);
            ordenarListaAsignacion(sistema.listaProyectos[indice].listaEmpleadosAsignados);
            innerReset("empleadosEliminar");
            for (let i of sistema.listaProyectos[indice].listaEmpleadosAsignados) {
                selectOptionAsignados("empleadosEliminar", i);
            }
        }
    } else {
        alert("El empleado seleccionado es el lider del proyecto. Por favor elija otro empleado.");
    }
}

function eliminarEmpleado() {
    //arreglar cuando tengo mas de 1 proyecto 
    let i = document.getElementById("proyectoEliminar").selectedIndex;
    let objetivo = document.getElementById("empleadosEliminar").value;
    let indice = (sistema.listaProyectos[i].listaEmpleadosAsignados).indexOf(objetivo);
    (sistema.listaProyectos[i].listaEmpleadosAsignados).splice(indice, 1);
    mostrarEmpleadosAsignadosProyecto();
}

function mostrarEmpleadosAsignadosProyecto (){
    let i = document.getElementById("proyectoEliminar").selectedIndex;
    innerReset("empleadosEliminar");
    for (let elem of sistema.listaProyectos[i].listaEmpleadosAsignados) {
        selectOptionAsignados("empleadosEliminar", elem);
    }
}

//registrar cliente

function registrarCliente () {
    let nombre = document.getElementById("CyEnombre").value;
    let correo = document.getElementById("CyEcorreo").value;
    let telefono = parseInt(document.getElementById("CyEtelefono").value);
    let web = document.getElementById("CyEweb").value;
    //let lista = document.getElementById("ListaClientesReg");
    // Si cumple con los datos, lo agrego a la lista de Clientes

    if (condicionRegistrar("formRegistroClientes",nombre,sistema.listaClientes,"cliente")) {
        
            sistema.agregarCliente(new Cliente(nombre,telefono,correo,web));
            limpiarForm("formRegistroClientes"); 
            ordenarLista(sistema.listaClientes);
            innerReset("ListaClientesReg"); 
            innerReset("clienteProyecto");
            for (let element of sistema.listaClientes) {
                agregarClienteLista(element.nombre,element.web ); 
                selectOption ("clienteProyecto",element)
            }
          
    }
}
//registrar empleado
function registrarEmpleado () {
    let nombre = document.getElementById("nombreRegEmp").value;
    let telefono = parseInt(document.getElementById("telefonoRegEmp").value);
    let salario = parseInt(document.getElementById("salarioRegEmp").value);
    let condSalario = true;
    if (salario <= 0) {
        condSalario = false;
        alert("Ingrese un salario mayor a 0")
    }
    if (condicionRegistrar("formRegistroEmpleado",nombre,sistema.listaEmpleados,"empleado") && condSalario) {
            limpiarForm("formRegistroEmpleado");
            sistema.agregarEmpleado(new Empleado(nombre,telefono,salario));
            sistema.agregarEmpleadoDisponible(new Empleado(nombre,telefono,salario));
            innerReset("liderProyecto");
            innerReset("asignarEmpleados");
            innerReset("empleadosEliminar");
            ordenarLista(sistema.listaEmpleados);
            
            for (let elem of sistema.listaEmpleados) {
                selectOption("liderProyecto", elem);
                selectOption("asignarEmpleados",elem);
            }
    } 
}
 

//registrar proyecto
function registrarProyecto(){
    let nombre = document.getElementById("nombreProyecto").value;
    let descripcion = document.getElementById("descripcionProyecto").value;
    let areaTematica = document.getElementById("area_tematica").value;
    let cliente = document.getElementById("clienteProyecto").value;
    let lider = document.getElementById("liderProyecto").value;
    
    if (condicionRegistrar("formRegistroProyecto",nombre,sistema.listaProyectos,"proyecto"))  {
        sistema.agregarProyecto(new Proyecto(nombre,descripcion,areaTematica,cliente,lider));
        limpiarForm("formRegistroProyecto");
        innerReset("asignarProyecto");
        innerReset("proyectoEliminar");
        ordenarLista(sistema.listaProyectos);
        for (let elem of sistema.listaProyectos){
            selectOption("asignarProyecto",elem);
            selectOption("proyectoEliminar",elem);
        }  
    }
    innerReset("empleadosEliminar");
    
}

function borrarLider (nombrelider,) {
    
        let indice = sistema.listaEmpleadosDisponible.indexOf(nombrelider);
        sistema.listaEmpleadosDisponible.splice(indice,1);
}

function cantProyectoPorEmpleado(nombre_empleado) {
    let cont= 0;
    for (let i=0;i<sistema.listaProyectos.length;i++){
        if (checkLider(i, nombre_empleado)) {
            cont++;
        }
    }
    for (let elem of sistema.listaProyectos) {
        for(let empladoAsig of elem.listaEmpleadosAsignados){
            if (nombre_empleado == empladoAsig) {
                cont ++;
            }
        }
    }
    return cont;
}

function checkLider (indice,empleado) {
    return (empleado == sistema.listaProyectos[indice].lider) 
}

//agregar cliente a la lista
function agregarClienteLista(nombre,web) {
    let lista = document.getElementById("ListaClientesReg");
    let nodo = document.createElement("li");
    let p = document.createElement("p");
    let a = document.createElement("a");
    let link = document.createTextNode(web);
        p.textContent = nombre+ " - ";
        a.id = "listaClientes";
        a.title = web;
        a.href = "http://" + web;
        a.target="_blank";
    a.appendChild(link);
    p.appendChild(a); 
    nodo.appendChild(p);
    lista.appendChild(nodo);
}


//Condicion para registrar clientes, empleados, proyectos, etc
function condicionRegistrar(idForm, nombre,clase_lista,sujeto_string ) {
    return (document.getElementById(idForm).reportValidity() && noRepetidoNombre(nombre, clase_lista, sujeto_string));
}



function noRepetidoNombreAsignacion (nombre,clase_lista,sujeto_string) {
    let repetido = true;
    for (let elem of clase_lista) {
        if (nombre == (elem)) {
             repetido = false;
             alert ("Ya se encuentra un " + sujeto_string + " asignado con ese nombre")
        }
    }
    return repetido;
}


//Que no se encuentre ya registrado un cliente, empleado, proyecto, etc
function noRepetidoNombre (nombre,clase_lista,sujeto_string) {
    let repetido = true;
    for (let elem of clase_lista) {
        if (nombre.toUpperCase() == (elem.nombre).toUpperCase()) {
             repetido = false;
             alert ("Ya se encuentra un " + sujeto_string + " registrado con ese nombre")
        }
    }
    return repetido;
}


//Inner reset
function innerReset (idElemento) {
    document.getElementById(idElemento).innerHTML = "";
}


function ordenarListaAsignacion(lista) {
   
    lista.sort(
        function(a,b) {
            if (a.toLowerCase() < b.toLowerCase()) {
               return -1;
            }
            if (a.toLowerCase() > b.toLowerCase()){
                return 1;
            }  
            return 0;
            
        }
      );
    
}

//ordenar lista alfabeticamente
function ordenarLista(lista) {
   
    lista.sort(
        function(a,b) {
            if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
               return -1;
            }
            if (a.nombre.toLowerCase() > b.nombre.toLowerCase()){
                return 1;
            }  
            return 0;
            
        }
      );
    
}

function ordenarListaSalario(lista) {

    lista.sort(
        function (a, b) {
            if (a.salario < b.salario) {
                return 1;
            }
            if (a.salario > b.salario) {
                return -1;
            }
            return 0;

        }
    );

}

function selectOptionAsignados(idSelect, lista) {
    let select = document.getElementById(idSelect);
    let nodo = document.createElement("option");
    let p = document.createElement("p");
    nodo.value = lista;
    p.textContent = lista;
    nodo.appendChild(p);
    select.appendChild(nodo);
}


//rellenar los select
function selectOption (idSelect,lista) {
    let select = document.getElementById(idSelect);
    let nodo = document.createElement("option");
    let p = document.createElement("p");
    nodo.value = lista.nombre;
    p.textContent=lista.nombre;
    nodo.appendChild(p);
    select.appendChild(nodo);
}



//funcion para la tabla
function crearTabla() {
    let tabla = document.getElementById("bodyTabla");
    innerReset("bodyTabla");
    ordenarListaSalario(sistema.listaEmpleados);
    for (elem of sistema.listaEmpleados) {
        let cadaFila = document.createElement("tr");
        let primerColumna = document.createElement("td");
        let segundaColumna = document.createElement("td");
        let terceraColumna = document.createElement("td");
        let imagen = document.createElement("td");
        primerColumna.innerHTML = elem.nombre;
        segundaColumna.innerHTML = elem.salario;
        terceraColumna.innerHTML = (cantProyectoPorEmpleado(elem.nombre));
        cadaFila.appendChild(primerColumna);
        cadaFila.appendChild(segundaColumna);
        cadaFila.appendChild(terceraColumna);
        cadaFila.appendChild(imagen);
        tabla.appendChild(cadaFila);

    }
}


//Vaciar campos de formulario
function limpiarForm(id) {
    document.getElementById(id).reset(); 
}

//cantidad maxima de empleados por proyecto
function mostrarMaximo() {
    let cantidadEmpleados = document.getElementById("cantidadEmpleados")
    let datos = sistema.listaProyectos;


    for (let elem of datos) {
        let cantidad = (elem.listaEmpleadosAsignados).length;
        let aux = 0;
        let ol = document.getElementById("listaMaxMin");
        let li = document.createElement("li");
        let p = document.createElement("p");
        if (cantidad > aux) {
            p.innerHTML = "";
            li.innerHTML = "";
            ol.innerHTML = "";
            aux = cantidad;
            p.textContent = (elem + "-" + "lider" + elem.lider);
            li.appendChild(p);
            ol.appendChild(li);
        }
        if (cantidad == aux) {
            p.textContent = (elem + "-" + "lider" + elem.lider);
            li.appendChild(p);
            ol.appendChild(li);
        }
    }
    cantidadEmpleados.innerHTML = "cantidad de personas:" + cantidad;
}


//cantidad minima de empleados por proyecto
function mostrarMinimo() {
    let cantidadEmpleados = document.getElementById("cantidadEmpleados");
    let datos = sistema.listaProyectos;
    let min=Number.MAX_VALUE;
    let ol = document.getElementById("listaMaxMin");;
    for (let elem of datos) {
        let li = document.createElement("li");
        let p = document.createElement("p");
        var cantidad = (elem.listaEmpleadosAsignados).length;
        let aux = Number.MAX_VALUE;
        if (cantidad < aux) {
            p.innerHTML = "";
            li.innerHTML = "";
            ol.innerHTML = "";
            aux = cantidad;
            p.innerHTML = elem + "- lider " + elem.lider;
            li.appendChild(p);
            ol.appendChild(li);
        }
        if (cantidad == min) {
            p.innerHTML = elem + "- lider" + elem.lider;
            li.appendChild(p);
            ol.appendChild(li);
        }
    }
    cantidadEmpleados.innerHTML = ("Cantidad de empleados: " + (cantidad));
}
