/*
 * TClass.js will help reconstruct classes for your web application 
 */


 // global variable for holding classes names  and styles 
 TClass_classes = [];

 // TClass
 function TClass_Builder(elem,r_class,targets)
 {
 	// we will split r_class after trimming
 	this.r_class = r_class.trim();
 	this.r_classes = this.r_class.split(" ");

 	// we will store new classes names in these variables 
 	this.old_classes = [];
 	this.new_classes = [];
 	this.target_index = [];
 	


 	// now it's time to start getting every class style and return "" if it's not exist 
 	// let's start iterating 
 	more_classes = true;
 	count = 0;
 	while(more_classes)
 	{
 		this.old_classes = []; // empty the new_classes array so we can store new set of classes !
 		this.target_index = []; // empty the target_index array so we can store new set of indeices !
 		more_classes = false; // if there is more classes run again 

 		// start iterating so we can get the target classes ! 
 		for(i=0,n=this.r_classes.length;i<n;i++)
 		{
 			if(this.r_classes[i].split("-").length>count)
 			{
 				this.old_classes.push(this.r_classes[i].split("-")[count]);
 				this.target_index.push(i);
 				more_classes = true;
 			}
 		}

 		// check if there is no element inside old classes 

 		if(this.old_classes.length != 0)
 		{

 			// get the styles and invoke them into targets 
 			this.new_classes.push(create_new_tclass(this.old_classes,targets,this.target_index));

 			// adding one to the count !
 			count++; 
 		}

 		
 	}

 	// now let's iterate through the class and change class names 
 	nameOfClasses = "";
 	
 	// all classes 
 	for(i=0,n=this.new_classes.length;i<n;i++)
 	{
 		nameOfClasses += " "+this.new_classes[i];
 	}


 	// trimming 
 	nameOfClasses = nameOfClasses.trim();

 	// invoke to the element 
 	elementClasses = elem.getAttribute("class") == null ? "" : elem.getAttribute("class");

 	nameOfClasses += " "+elementClasses;
 	nameOfClasses = nameOfClasses.trim();

 	elem.setAttribute("class",nameOfClasses);
 }



 /*------------------ Helping TClass Functions ------------------*/

 // getting the style of a target class 

 function searchForStyle(className,newClassName)
 {
 	// search For Style for a specific class name ! 
 	doc_styles = document.getElementsByTagName('style');

 	// search for every style for the specific class 
 	target_class = "."+className;
 	target_index = []; // for getting the index of the target element ! 
 	target_style_index = []; // for getting the style target ! 
 	

 	//start searching 

 	for(i=0,n=doc_styles.length;i<n;i++)
 	{
 		x = doc_styles[i].innerHTML.search(target_class);
 		tarcker = 0;
 		while(x != -1)
 		{
 			
 			// we will push the first result 
 			target_style_index.push(i);
 			target_index.push(tarcker + x);

 			// this tracker will add the pervious value of x 
 			tarcker += x+1;
 			
 			// we will try to substring and research 
 			x = doc_styles[i].innerHTML.substring(tarcker).search(target_class);

 		}
 
 	}


 	// if the style can't be found return empty style 
 	if(target_index.length == 0)
 		return "";

 	// getting the style of the element 

 	class_style = ""; // for saving the style of element 
 	
 	for(i=0,n=target_index.length;i<n;i++)
 	{
 		str = "";
 		// we will first search for comma ,
 		x = doc_styles[target_style_index[i]].innerHTML.substring(target_index[i]).split("{")[0].search(",");
 		if(x != -1)
 		{
 			s = doc_styles[target_style_index[i]].innerHTML.substring(target_index[i],target_index[i]+x);
 			str += s.split(this.target_class)[1];
 		}
 		else
 		{
 			s = doc_styles[target_style_index[i]].innerHTML.substring(target_index[i]).split("{")[0];
 			str += s.split(this.target_class)[1];
 		}
 	
 		tmp_style = doc_styles[target_style_index[i]].innerHTML.substring(target_index[i]);
 		class_style += "."+(newClassName+" "+str).trim()+"{"+tmp_style.split("{")[1].split("}")[0].trim()+"}";
 	}

 	

 	// return the style 
 	return class_style;
 }

 // searching for class name to gain a new class name 

 function class_from_tclass(oldName,newName)
 {
 	this.oldName = oldName;
 	this.newName = newName;
 }


 // create new classes 
 function create_new_tclass(classNames,targets,index_target)
 {
 	// name of class 
 	this.nameOfClass = "";

 	//let's build the name of the old class
 	for(i=0,n=classNames.length;i<n;i++)
 	{
 		this.nameOfClass += "_"+classNames[i]+"_";
 	}

 	// let's detect if there is a class with the same forumla
 	for(i=0,n=TClass_classes.length;i<n;i++)
 	{
 		if(TClass_classes[i].oldName.search(this.nameOfClass)!=-1)
 		{
 			return TClass_classes[i].newName;
 		}
 	}


 	// get new name to return 
 	this.newName = "ResponsoTclass_"+TClass_classes.length;


 	// let's now build a new set of styles and targets 
 	for(j=0,k=classNames.length;j<k;j++)
 	{

 		style = searchForStyle(classNames[j],this.newName);
 		// target the suitable one
		targets[index_target[j]].invokeStyle(style); 		

 	}


 	// let's add the style to Tclasses 
 	TClass_classes.push(new class_from_tclass(this.nameOfClass,this.newName));

 	// return the new class name 
 	return this.newName;
 }