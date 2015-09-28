/*
 * This is Dimensions settings for elements (d) tag
 */

// this is the build in Dimensions storge 
var D_Storge = [];

// Dimension class 

function Dimension(d)
{
	// variables 
	this.desktop = [];
	this.tablet = [];
	this.mobile = [];

	// let's start making the dimension more beautiful 
	this.d = d.trim();

	// let's split it up to get the dimension for the target Devices 
	ds = this.d.split(" ");

	// getting the styles according to the length of ds 
	if(ds.length == 2)
	{
		// this is just a dimension with no responsive deisgn
		this.desktop.push(ds[0]);
		this.desktop.push(ds[1]);
		this.tablet.push(ds[0]);
		this.tablet.push(ds[1]);
		this.mobile.push(ds[0]);
		this.mobile.push(ds[1]);
	}
	else if(ds.length == 4)
	{
		// tablet and desktop are the targets 
		this.desktop.push(ds[0]);
		this.desktop.push(ds[1]);
		this.tablet.push(ds[2]);
		this.tablet.push(ds[3]);
		this.mobile.push(ds[2]);
		this.mobile.push(ds[3]);
	}
	else
	{
		// this is the responsive targets 
		this.desktop.push(ds[0]);
		this.desktop.push(ds[1]);
		this.tablet.push(ds[2]);
		this.tablet.push(ds[3]);
		this.mobile.push(ds[4]);
		this.mobile.push(ds[5]);
	}


	// push Dimension for Desktop 
	this.invokeStyle = function(dTarget,tTarget,mTarget)
	{
		// check if there is no style inside the storge 

		for(p=0,n=D_Storge.length;p<n;p++)
		{
			if((D_Storge[p].d.indexOf(this.d)!= -1))
				return D_Storge[p].name;
		}


		// make new class for this new Dimensions 
		count=D_Storge.length;
		className = "ResponsDim_"+count;

	    // making the style if element
	    dstyle = "."+className+"{"+"width:"+this.desktop[0]+";height:"+this.desktop[1]+";}";
	    tstyle = "."+className+"{"+"width:"+this.tablet[0]+";height:"+this.tablet[1]+";}";
	    mstyle = "."+className+"{"+"width:"+this.mobile[0]+";height:"+this.mobile[1]+";}";

	    // invoke to targets 
	    dTarget.invokeStyle(dstyle);
	    tTarget.invokeStyle(tstyle);
	    mTarget.invokeStyle(mstyle);

	    D_Storge.push(new ResponsDimensionClass(className,this.d));
	    return className;
	}






}


// class Name Generator 

function ResponsDimensionClass(className,d)
{
	this.name = className;
	this.d = d;

}