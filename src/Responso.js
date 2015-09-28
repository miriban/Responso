/*
 * => Responso.js Library version 1.0.0
 * => New Tags Introduced to HTML elements (d,r-class,r-id,r-get)
 * => Created By: Mohammed J. AbuIriban (fb.com/skeptic2013)(@MohammedIriban)
 * => 4th Augest, 2015
 */

 /*
  - Loading The Main Function runX() when document is loaded 
  - Firing the function every 0.01 second to handle inserting new html tags to the document
 */ 

 /*
 Customized Settings 
 */ 

 var Desktop_Min_Width = 750;
 var Tablet_Max_Width = 750;
 var Mobile_Max_Width = 450;

 /*
  End Of Customizing Settings 
  */
 
 window.onload = runX;
 window.setInterval(function(){runX();},10); // run the function continusly ! 
 
 // variables for making sure that the targets aleray setup 
 target_setup  = false;


/* 
Run Function for dealing with the process of new Tags 
*/
function runX()
{
	// Targets should be from the heighst width to the lowest  
	
	if(!target_setup)
		targets = createTargets();

	// elements that contain dimension attribute !

	elemsWithD = iterateElementsWithDimension();

	// elements that contain r-class attribute ! 

	elemsWithR = iterateElementsWithRClass();

	// elements that contain r-id attribute ! 
	elemsWithId = iterateElementsWithRId();

	// elements that contain r-get attribute ! 
	elemsWithGet = iterateElementsWithRget();

	// let's start building the responsive design with Dimension Tag
	for(i=0,k=elemsWithD.length;i<k;i++)
	{
		d = elemsWithD[i].getAttribute("d");
		dim = new Dimension(d);
		classes = elemsWithD[i].getAttribute("class") == null ? "" : elemsWithD[i].getAttribute("class");
		newClasses =dim.invokeStyle(targets[0],targets[1],targets[2])+" "+classes;
		elemsWithD[i].setAttribute("class",newClasses);	
	}

	// removing tags from elements so it will be without d tag 
	for(i=0,n=elemsWithD.length;i<n;i++)
	{
		elemsWithD[i].removeAttribute("d");
	}

	
	//let's start building r-classes 
	for(q=0,r=elemsWithR.length;q<r;q++)
	{

		TClass_Builder(elemsWithR[q],elemsWithR[q].getAttribute("r-class"),targets);		

	}

	// removing tags from elements so it will be without r-class tag 
	for(i=0,n=elemsWithR.length;i<n;i++)
	{
		elemsWithR[i].removeAttribute("r-class");
	}

	// let's start building r-ids 
	for(i=0,u=elemsWithId.length;i<u;i++)
	{
		
		setResponsoId(elemsWithId[i],elemsWithId[i].getAttribute("r-id"));

	}

	// removing tags from elements so it will be without r-id tag 
	for(i=0,n=elemsWithId.length;i<n;i++)
	{
		elemsWithId[i].removeAttribute("r-id");
	}

	// let's start building r-get
	for(w=0,v=elemsWithGet.length;w<v;w++)
	{
		getResponsoId(elemsWithGet[w],elemsWithGet[w].getAttribute("r-get"));
	}

	// removing tags from elements so it will be without r-get tag 
	for(i=0,n=elemsWithGet.length;i<n;i++)
	{
		elemsWithGet[i].removeAttribute("r-get");
	}

}


/*----------------------------------------------- Helper Functions ---------------------------------------------*/
 /*
  * Iterate through all Elements with d */
  function iterateElementsWithDimension()
  {
  	elemsWithD = [];
  	elems = document.getElementsByTagName("*");
  	for(i=0,n=elems.length;i<n;i++)
  	{
  		if(!(elems[i].getAttribute("d")==null))
  			elemsWithD.push(elems[i]);
  	}
  	return elemsWithD;
  }


 /*
  * Iterate through all Elements with r-class */
  function iterateElementsWithRClass()
  {
  	elemsWithR = [];
  	elems = document.getElementsByTagName("*");
  	for(i=0,n=elems.length;i<n;i++)
  	{
  		if(!(elems[i].getAttribute("r-class")==null))
  			elemsWithR.push(elems[i]);
  	}
  	return elemsWithR;
  }


   /*
  * Iterate through all Elements with r-id */
  function iterateElementsWithRId()
  {
  	elemsWithID = [];
  	elems = document.getElementsByTagName("*");
  	for(i=0,n=elems.length;i<n;i++)
  	{
  		if(!(elems[i].getAttribute("r-id")==null))
  			elemsWithID.push(elems[i]);
  	}
  	return elemsWithID;
  }


   /*
  * Iterate through all Elements with r-get */
  function iterateElementsWithRget()
  {
  	elemsWithGet = [];
  	elems = document.getElementsByTagName("*");
  	for(i=0,n=elems.length;i<n;i++)
  	{
  		if(!(elems[i].getAttribute("r-get")==null))
  			elemsWithGet.push(elems[i]);
  	}
  	return elemsWithGet;
  }






  /*
   * Function For Creating NEW Targets */
   function createTargets()
   {
   	// array of targets 
   	targets = [];
   	// let's start creating targets 
   	desktop = new Target("desktop",Desktop_Min_Width,"min");
   	targets.push(desktop);
	tablet = new Target("tablet",Tablet_Max_Width,"max");
	targets.push(tablet);
	mobile = new Target("mobile",Mobile_Max_Width,"max");
	targets.push(mobile);

	// avoid making target in the next run 
	target_setup = true;

	// return targets 
	return targets;
   }
