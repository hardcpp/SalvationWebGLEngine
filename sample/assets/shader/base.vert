attribute vec3 VertexPosition;
attribute vec4 VertexColor;
attribute vec2 VertexTextureCoord;

uniform mat4 ModelViewMatrix;
uniform mat4 ProjectionMatrix;

varying vec4 Color;
varying vec2 TextureCoord;

void main(void) 
{
	gl_Position 	= ProjectionMatrix * ModelViewMatrix * vec4(VertexPosition, 1.0);
	TextureCoord 	= VertexTextureCoord;
    Color 			= VertexColor;
}
