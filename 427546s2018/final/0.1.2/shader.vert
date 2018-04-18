precision highp float;
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec4 aVertexColor;

uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uLightPosition;

varying highp vec4 vColor;
varying highp vec3 vLighting;

void main(void)
{
	gl_Position = 
			uProjectionMatrix *
			uModelViewMatrix *
			vec4(aVertexPosition,1.0);
	vColor = aVertexColor;
	vLighting = vec3(0.5,0.5,0.5)+
		max(dot(vec3(0.1,1.0,0.1),aVertexNormal),0.0);
}
