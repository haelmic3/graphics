// 
// Copyright (c) 2018 Michael Julian Moran
// License information by request:
// mailto:Michael_Moran1@student.uml.edu
// 
//Using:
//https://github.com/toji/gl-matrix
//Wed Mar 28 19:36:02 EDT 2018
//for mat4
//using in `function drawScene'
//https://raw.githubusercontent.com/toji/gl-matrix/master/dist/gl-matrix.js
//<script src="./gl-matrix.js"></script>

//WebGl code influenced by mozila developer network webGl tutorial.
//Wed Mar 28 16:36:13 EDT 2018:
//https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/
//Adding_2D_content_to_a_WebGL_context

/*
_______________________________________________________________________________

*/
"use strict";
function promiseFile(file){
	return new Promise((resolve, reject)=>{
		const xhr = new XMLHttpRequest();
		xhr.open("GET", file);
		xhr.overrideMimeType("text/plain");
		xhr.onload = () => resolve(xhr.responseText);
		xhr.onerror = () => resolve(xhr.statusText);
		xhr.send();
	});
}

// #Jump_Shaders
window.VSpromise = promiseFile("shader.vert");
window.FSpromise = promiseFile("shader.frag");

// #Jump_Object_Data
function initBuffers(gl)
{
// data for the cube
	const cubeBuffer = gl.createBuffer();

	// set `positionBuffer' as the buffer to apply operations to
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);

	// create the array for a cube
	const cube = [
		// Position		Color			Normal
		// X     Y     Z	  R    G    B    O
/*Front face*/	-1.0, -1.0,  1.0,	1.0, 1.0, 1.0, 1.0,	 0.0, 0.0, 1.0,
		 1.0, -1.0,  1.0,	1.0, 1.0, 1.0, 1.0,	 0.0, 0.0, 1.0,
		 1.0,  1.0,  1.0,	1.0, 1.0, 1.0, 1.0,	 0.0, 0.0, 1.0,
		-1.0,  1.0,  1.0,	1.0, 1.0, 1.0, 1.0,	 0.0, 0.0, 1.0,
/*Back face*/	-1.0, -1.0, -1.0,	1.0, 1.0, 1.0, 1.0,	 0.0, 0.0,-1.0,
		-1.0,  1.0, -1.0,	1.0, 1.0, 1.0, 1.0,	 0.0, 0.0,-1.0,
		 1.0,  1.0, -1.0,	1.0, 1.0, 1.0, 1.0,	 0.0, 0.0,-1.0,
		 1.0, -1.0, -1.0,	1.0, 1.0, 1.0, 1.0,	 0.0, 0.0,-1.0,
/*Top face*/	-1.0,  1.0, -1.0,	1.0, 1.0, 1.0, 1.0,	 0.0, 1.0, 0.0,
		-1.0,  1.0,  1.0,	1.0, 1.0, 1.0, 1.0,	 0.0, 1.0, 0.0,
		 1.0,  1.0,  1.0,	1.0, 1.0, 1.0, 1.0,	 0.0, 1.0, 0.0,
		 1.0,  1.0, -1.0,	1.0, 1.0, 1.0, 1.0,	 0.0, 1.0, 0.0,
/*Bottom face*/	-1.0, -1.0, -1.0,	1.0, 1.0, 1.0, 1.0,	 0.0,-1.0, 0.0,
		 1.0, -1.0, -1.0,	1.0, 1.0, 1.0, 1.0,	 0.0,-1.0, 0.0,
		 1.0, -1.0,  1.0,	1.0, 1.0, 1.0, 1.0,	 0.0,-1.0, 0.0,
		-1.0, -1.0,  1.0,	1.0, 1.0, 1.0, 1.0,	 0.0,-1.0, 0.0,
/*Right face*/	 1.0, -1.0, -1.0,	1.0, 1.0, 1.0, 1.0,	 1.0, 0.0, 0.0,
		 1.0,  1.0, -1.0,	1.0, 1.0, 1.0, 1.0,	 1.0, 0.0, 0.0,
		 1.0,  1.0,  1.0,	1.0, 1.0, 1.0, 1.0,	 1.0, 0.0, 0.0,
		 1.0, -1.0,  1.0,	1.0, 1.0, 1.0, 1.0,	 1.0, 0.0, 0.0,
/*Left face*/	-1.0, -1.0, -1.0,	1.0, 1.0, 1.0, 1.0,	-1.0, 0.0, 0.0,
		-1.0, -1.0,  1.0,	1.0, 1.0, 1.0, 1.0,	-1.0, 0.0, 0.0,
		-1.0,  1.0,  1.0,	1.0, 1.0, 1.0, 1.0,	-1.0, 0.0, 0.0,
		-1.0,  1.0, -1.0,	1.0, 1.0, 1.0, 1.0,	-1.0, 0.0, 0.0,
	];

	gl.bufferData(	gl.ARRAY_BUFFER,
			new Float32Array(cube),
			gl.STATIC_DRAW);
// end of position data


// index data
	const indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

	const indices = [
	 0, 1, 2,	 0, 2, 3,	// front
	 4, 5, 6,	 4, 6, 7,	// back
	 8, 9,10,	 8,10,11,	// top
	12,13,14,	12,14,15,	// bottom
	16,17,18,	16,18,19,	// right
	20,21,22,	20,22,23,	// left
	]; 

	// Now send the element array to GL

	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
	    new Uint16Array(indices), gl.STATIC_DRAW);

// end of index data


	
	return	{	cube: cubeBuffer
		,	indices: indexBuffer
		};

}
// #Jump_Render
var rotation = 0.0,then = 0,numframes=0,frames=[60];
function render(now)
{
	// floor milliseconds
	now*=1000.0;
	now|=0;
	var deltaTime = (now - then);// ms/sec
	frames[numframes++%60]=1000000/deltaTime;
	var avframes = 0;
	for(let i in frames)avframes+=frames[i];
	avframes/=60;
	avframes|=0;
	view.footer.innerText = "Time:\n"+now+"mus\nFrame:\n"+
		deltaTime+"mus\nCalculation:\n"+(deltaTime/1000000.0)+"sec\n"+
		(avframes)+"fps\n";
	then = now;
	rotation+= deltaTime/1000000.0;
	drawScene(view.gl, view.programInfo, view.objectBuffer);
	view.footer.innerText+=rotation+"\n";
	view.frame = requestAnimationFrame(render);
}
function drawScene(gl, programInfo, buffers)
{
	// restarts the scene
	gl.clearColor(0.0,0.0,0.0,1.0);	// clear to opaque black
	gl.clearDepth(1.0)		// everything
	gl.enable(gl.DEPTH_TEST);	// enable depth testing
	gl.depthFunc(gl.LEQUAL);	// let foreground obscure
	//end of move

	// clear color and depth.
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

	// Set up perspective matrix.
	// Simulate a perspective camera;
	// with a 45 degree field of view
	const fov = view.settings.fov * Math.PI / 180; // radians
	// aspect ratio
	const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	const zNear = 0.1;
	const zFar = 100.0;
	const projectionMatrix = mat4.create();
	mat4.perspective(	projectionMatrix	// destination
			,	fov
			,	aspect
			,	zNear
			,	zFar
			);
	// load identity matrix into the model view
	const mvMatrix = mat4.create();
	// translate the model view to where we want to draw our model
	mat4.translate	(	mvMatrix	// destination
			,	mvMatrix	// input
			,	[-0.0,0.0,-6.0]	// translation
			);

	const normalMatrix = mat4.create();
	mat4.invert(normalMatrix, mvMatrix);
	mat4.transpose(normalMatrix, normalMatrix);
	if(view.frame <4)
	{
		console.log(normalMatrix);
	}

	mat4.rotate	(	mvMatrix
			,	mvMatrix
		//	,	rotation/1296
			,	view.settings.rotation.Z
			,	[0,0,1]
			);
	mat4.rotate	(	mvMatrix
			,	mvMatrix
		//	,	rotation/36
			,	view.settings.rotation.Y
			,	[0,1,0]
			);
	mat4.rotate	(	mvMatrix
			,	mvMatrix
		//	,	rotation
			,	view.settings.rotation.X
			,	[1,0,0]
			);

// #Jump_Draw_Position
	gl.bindBuffer(gl.ARRAY_BUFFER,buffers.cube);
	gl.vertexAttribPointer
	(	programInfo.attribLocations.vertexPosition
	,	3		// we have 3 values per point XYZ
	,	gl.FLOAT	// data type used was f32
	,	false		// normalise
	,	40		// stride (bytes per segment) 0 = use above
	,	0		// offset (starting byte)
	);
	gl.enableVertexAttribArray
	(	programInfo.attribLocations.vertexPosition	);


// #Jump_Draw_Color
	gl.bindBuffer(gl.ARRAY_BUFFER,buffers.cube);
	gl.vertexAttribPointer
	(	programInfo.attribLocations.vertexColor
	,	4		// we have 4 values per point RGBO
	,	gl.FLOAT	// data type used was f32
	,	false		// normalise
	,	40		// stride (bytes per segment) 0 = use above
	,	12		// offset (starting byte)
	);
	gl.enableVertexAttribArray
	(	programInfo.attribLocations.vertexColor 	);
// #Jump_Draw_Normal
	gl.bindBuffer(gl.ARRAY_BUFFER,buffers.cube);
	gl.vertexAttribPointer
	(	programInfo.attribLocations.vertexNormal
	,	3
	,	gl.FLOAT
	,	false
	,	40
	,	28
	)
	gl.enableVertexAttribArray
	(	programInfo.attribLocations.vertexNormal 	);
// #Jump_Draw_Indices
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices	);



	// use specified program to draw
	gl.useProgram(programInfo.program);

	// set shader uniforms
	gl.uniformMatrix4fv
	(	programInfo.uniformLocations.projectionMatrix
	,	false
	,	projectionMatrix
	);
	gl.uniformMatrix4fv
	(	programInfo.uniformLocations.modelViewMatrix
	,	false
	,	mvMatrix
	);
	gl.uniformMatrix4fv
	(	programInfo.uniformLocations.normalMatrix
	,	false
	,	normalMatrix
	);
	gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_SHORT,0);
//	gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
//	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
//1.0,0.0,0.0,1.0,
//0.0,1.0,0.0,1.0,
//0.0,0.0,1.0,1.0,
//1.0,1.0,1.0,1.0,
//1.0,0.0,0.0,1.0,
//0.0,1.0,0.0,1.0,
//0.0,0.0,1.0,1.0,
//1.0,1.0,1.0,1.0,
//1.0,0.0,0.0,1.0,
//0.0,1.0,0.0,1.0,
//0.0,0.0,1.0,1.0,
//1.0,1.0,1.0,1.0,
//1.0,0.0,0.0,1.0,
//0.0,1.0,0.0,1.0,
//0.0,0.0,1.0,1.0,
//1.0,1.0,1.0,1.0,
//1.0,0.0,0.0,1.0,
//0.0,1.0,0.0,1.0,
//0.0,0.0,1.0,1.0,
//1.0,1.0,1.0,1.0,
//1.0,0.0,0.0,1.0,
//0.0,1.0,0.0,1.0,
//0.0,0.0,1.0,1.0,
//1.0,1.0,1.0,1.0,
//1.0,0.0,0.0,1.0,
//0.0,1.0,0.0,1.0,
//0.0,0.0,1.0,1.0,
//1.0,1.0,1.0,1.0,
//1.0,0.0,0.0,1.0,
//0.0,1.0,0.0,1.0,
//0.0,0.0,1.0,1.0,
//1.0,1.0,1.0,1.0
//]),gl.STATIC_DRAW);
//	gl.vertexAttribPointer
//	(	programInfo.attribLocations.vertexColor
//	,	4		// we have 4 values to use
//	,	gl.FLOAT	// data type used was f32
//	,	false		// normalise
//	,	0		// stride (bytes per segment) to skip
//	,	0		// offset (starting byte)
//	);
//	gl.enableVertexAttribArray
//	(	programInfo.attribLocations.vertexColor 	);
//	gl.drawElements(gl.LINES,36,gl.UNSIGNED_SHORT,0);
}




// #Jump_Setup
function setRotation()
{
	view.settings.rotation.X = view.controls.rotation.X.value/180.0*Math.PI;
	view.settings.rotation.Y = view.controls.rotation.Y.value/180.0*Math.PI;
	view.settings.rotation.Z = view.controls.rotation.Z.value/180.0*Math.PI;
}
function resetRotation(){
	view.controls.rotation.X.value=180;
	view.controls.rotation.Y.value=180;
	view.controls.rotation.Z.value=180;
	setRotation();
}
function setColor()
{
	view.settings.color = view.controls.color.value;
}
function setFOV()
{
	view.settings.fov = view.controls.fov.value;
}
window.setup = function()
{
	// setup view
	window.view =
	{	header	:	document.body.children[0]
	,	context	:	document.body.children[1]
	,	footer	:	document.body.children[2]
	,	canvas	:	undefined
	,	gl	:	undefined
	,	programInfo:	undefined
	,	objectBuffer:	undefined
	,	frame	:	undefined
	,	controls:	undefined
	,	settings:	{rotation:{},color:undefined,fov:45}
	};
	// setup view.controls
	view.header.innerHTML=""+
	"<a href=\"help\">Help</a>"+
	"<label><input value=\"Front&amp;Center\" type=\"button\""+
		" onclick=\"resetRotation();\"/></label>\n"+
	"<label>X<input max=\"360\" type=\"range\"/></label>\n"+
	"<label>Y<input max=\"360\" type=\"range\"/></label>\n"+
	"<label>Z<input max=\"360\" type=\"range\"/></label>\n"+
	"<label><input type=\"color\"/></label>\n"+
	"<label>FOV<input type=\"number\" step=\"any\" value=\"45\"/></label>\n";
	view.controls = 
	{	rotation:
		{	X:	view.header.children[2].children[0]
		,	Y:	view.header.children[3].children[0]
		,	Z:	view.header.children[4].children[0]
		}
	,	color	:	view.header.children[5].children[0]
	,	fov	:	view.header.children[6].children[0]
	};
	setRotation();
	setColor();
	for (var i in view.controls.rotation)
		view.controls.rotation[i].oninput = setRotation;
	view.controls.color.oninput = setColor;
	view.controls.fov.oninput = setFOV;
	// setup view.canvas
	view.context.innerHTML=""+
	"<canvas width=\""+innerWidth+"\" height=\""+innerHeight+"\">\n"+
	"The HTML5 canvas element must be enabled to function.\n"+
	"</canvas>";
	// setup view.status
	view.footer.innerText="Waiting on webGL.";
	setTimeout(function(){view.footer.innerHTML="";},500);
	

	// setup canvas
	window.onresize = function()
	{
		view.canvas.width=innerWidth;
		view.canvas.height=innerWidth/2;
	}
	
	view.canvas = view.context.children[0];
	view.gl = view.canvas.getContext("webgl");
	if(!view.gl)
	{	setTimeout(function()
		{view.footer.insertAdjacentHTML
			('beforeend',"WebGL failed.");
		},500);
		return;
	}
	view.gl.clearColor(0.5,0.5,0.5,1.0);
	view.gl.clear(view.gl.COLOR_BUFFER_BIT);
// #Jump_Program_Info

VSpromise.then(function(vs){
FSpromise.then(function(fs){
const iprog = initShaderProgram(view.gl,vs,fs);
const aposi = view.gl.getAttribLocation(iprog,"aVertexPosition");
const acolo = view.gl.getAttribLocation(iprog,"aVertexColor");
const anorm = view.gl.getAttribLocation(iprog,"aVertexNormal");
const upjmx = view.gl.getUniformLocation(iprog,"uProjectionMatrix");
const umvmx = view.gl.getUniformLocation(iprog,"uModelViewMatrix");
const unrmx = view.gl.getUniformLocation(iprog,"uNormalViewMatrix");
const ulipo = view.gl.getAttribLocation(iprog,"aLightPosition");
	const pInfo = 
	{	program:			iprog
	,	attribLocations:
		{	vertexPosition:		aposi
		,	vertexColor:		acolo
		,	vertexNormal:		anorm
		}
	,	uniformLocations:
		{	projectionMatrix:	upjmx
		,	modelViewMatrix:	umvmx
		,	normalMatrix:		unrmx
//		,	lightPosition:		ulipo
		}
	};

	view.programInfo = pInfo;

	view.objectBuffer = initBuffers(view.gl);
	view.frame = requestAnimationFrame(render);
});});
};setup();
