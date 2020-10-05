export class PresupuestoRequest{
   constructor(){

   }

   idPresupuesto:                 number;
   //servicio seleccionado
   idProgramaCecos:             number;
   idRubroPucs:                number;
   esNomina:                   boolean;
   esPPTO:                     boolean;



   //datos Nomina
   NumeroIdentificacion:       number; 
   Nombre:                     string; 
   Cargo:                      number; 
   Asignacion:                 number; 

   // Fin datos Nomina
   // Inicio Datos Familiar
   NoCasa:                     number; 
   NoKids:                     number; 


   //Comun a todos
   NotaIngles:                 string; 
   DetalleGasto:               string; 
   //Fin comunes

   Enero:                      number; 
   Febrero:                    number; 
   Marzo:                      number; 
   Abril:                      number; 
   Mayo:                       number; 
   Junio:                      number; 
   Julio:                      number; 
   Agosto:                     number; 
   Septiembre:                 number; 
   Octubre:                    number; 
   Noviembre:                  number; 
   Diciembre:                  number; 



}
