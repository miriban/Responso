/*
	Comment added for test 
*/
/*
	Target.js is a javasctipt file for making Responsive media File 
	by determining the type of device this style is designed for! 
*/

/*
	Target Class Accepts 3 parameters which are the following:
	1. name => stands for the name of the device.
	2. width => stands for the max or min width of media element 
	3. type => stands for determining the type of width (max or min)
*/
 function Target(name,width,type)
 {
 	/*
		Object Variables includes the following:
		1. name => which take the name of the device.
		2. width => which stands for the width value. 
		3. type => which stands for the type of width.
 	*/
 	this.name = name; // the name of the target !
 	this.width = width; // this is the width value !
 	this.type = type; // this is the type of width (max or min) !

 	// Build in Style for The Target ! 

 	// create a style for the following target 
 	/* --- The same as Constructor --- */
 	this.style = document.createElement("style");
 	this.style.setAttribute("type","text/CSS");
 	this.style.setAttribute("media","screen and ("+type+"-width: "+width+"px)");
 	this.style.id = name+width+type;
 	document.getElementsByTagName('head')[0].appendChild(this.style);


 	/*
 		invoke css to the style tag!
 	*/
 	this.invokeStyle = function(EStyle)
 	{
 		// invoke the style
 		this.style.innerHTML += EStyle;
 		
 	}

 	/*
 		Update the style tag variables!
 	*/
 	this.update = function(name,width,type)
 	{
 		style = document.getElementById(this.name+this.width+this.type);
 		style.setAttribute("media","screen and ("+type+"-width: "+width+"px)");
 		this.style.id = name+width+type;
 		this.name = name;
 		this.width = width;
 		this.type = type;
 	}

 	/*
 		Setter and Getter
 	*/

 	// get the name 
 	this.getName = function()
 	{
 		return this.name;
 	}

 	// get the width 
 	this.getWidth = function()
 	{
 		return this.width;
 	}

 	// get the type 
 	this.getType = function()
 	{
 		return this.type;
 	}

 	// set the name 
 	this.setName = function(name)
 	{
 		this.name = name;
 	}

 	// set the width
 	this.setWidth = function(width)
 	{
 		this.update(this.name,width,this.type);
 	}

 	// set the type 
 	this.setType = function(type)
 	{
 		this.update(this.name,this.width,type);
 	}
 }
