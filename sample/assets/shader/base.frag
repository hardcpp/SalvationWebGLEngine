varying vec4 Color;
varying vec2 TextureCoord;

uniform float UseTexture;
uniform sampler2D Sampler;

void main(void) 
{
    vec4 l_TextureColor = texture2D(Sampler, TextureCoord) * UseTexture;
    vec4 l_VertColor	= Color * (1.0 - UseTexture); 
	
    gl_FragColor = l_TextureColor + l_VertColor;
}
