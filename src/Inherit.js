/*
 inherit.js for getting applying settings to the target elements 
 */

 // responso id for holding ids 
 responso_id = [];

 // storing elements classes and the suitable id for every element 
 function setResponsoId(elem,idName)
 {
 	// getting the classes from the element 
 	this.classes = elem.getAttribute("class") == null ? "" : elem.getAttribute("class");

 	// getting the name 
 	this.idName = idName;

 	// pushing the new style to reponso ids 
 	responso_id.push(new IdResponsClasses(this.idName,this.classes));

 }

 // function for getting style from id and apply it to element 
 function getResponsoId(elem,id)
 {
 	classes = "";
 	// searching through responso_id array 
 	for(i=0,n=responso_id.length;i<n;i++)
 	{
 		if((responso_id[i].id.search(id)!=-1)&&(responso_id[i].id.length == id.length))
 		{
 			classes += responso_id[i].classes;
 		}
 	}
 	// getting classes from the element 
 	oldClasses = elem.getAttribute("class") == null ? "" : elem.getAttribute("class");

 	// push old classes to element 
 	classes += oldClasses;
 	classes = classes.trim();

 	// apply the classes to element 
 	elem.setAttribute("class",classes);
 }




 /*----------------------------------- Helper functions ----------------------------*/
 function IdResponsClasses(id,classes)
 {
 	this.id = id;
 	this.classes = classes;
 }