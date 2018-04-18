//WebGl code influenced by mozila developer network webGl tutorial.
//Wed Mar 28 16:36:13 EDT 2018:
//https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/
function loadShader(gl, type, source)
{
	const shader = gl.createShader(type);
	
	// send source-code to object
	gl.shaderSource(shader,source);

	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
	{
		console.log("Failed to compile a shader:\n"+
		gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}
function initShaderProgram(gl,vs,fs)
{
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER,vs);
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER,fs);

	const shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram,vertexShader);
	gl.attachShader(shaderProgram,fragmentShader);
	gl.linkProgram(shaderProgram);
	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
	{
		console.log("Shader program build failed:\n"+
			gl.getProgramInfoLog(shaderProgram));
		return null;
	}
	return shaderProgram;
}
