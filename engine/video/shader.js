/*
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 2 of the License, or (at your
 * option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */
 
 DefaultFragmentProgram = "precision mediump float;"
DefaultFragmentProgram += "varying vec4 Color;";
//DefaultFragmentProgram += "varying vec2 TextureCoord;";
//DefaultFragmentProgram += "uniform float UseTexture;";
//DefaultFragmentProgram += "uniform sampler2D Sampler;";
DefaultFragmentProgram += "void main(void) {";
//DefaultFragmentProgram += "     vec4 l_TextureColor = texture2D(Sampler, TextureCoord) * UseTexture;";
//DefaultFragmentProgram += "     vec4 l_VertColor	= Color * (1.0 - UseTexture); ";
//DefaultFragmentProgram += "     gl_FragColor = l_TextureColor + l_VertColor;";
DefaultFragmentProgram += "     gl_FragColor = Color;";
DefaultFragmentProgram += "}";

 DefaultVertexProgram = "attribute vec3 VertexPosition;";
DefaultVertexProgram += "attribute vec4 VertexColor;"; 
//DefaultVertexProgram += "attribute vec2 VertexTextureCoord;"; 
DefaultVertexProgram += "uniform mat4 ProjModelViewMatrix;"; 
DefaultVertexProgram += "varying vec4 Color;"; 
//DefaultVertexProgram += "varying vec2 TextureCoord;"; 
DefaultVertexProgram += "void main(void) {"; 
DefaultVertexProgram += "       gl_Position 	= ProjModelViewMatrix * vec4(VertexPosition, 1.0);"; 
//DefaultVertexProgram += "       TextureCoord 	= VertexTextureCoord;"; 
DefaultVertexProgram += "       Color 			= VertexColor;"; 
DefaultVertexProgram += "}"; 

// Default program variable init function
DefaultProgramInitFunction = function() {
    this.a_VertexPosition       = this.GetAttributeLocation("VertexPosition");
    this.a_VertexColor          = this.GetAttributeLocation("VertexColor");
    this.u_ProjModelViewMatrix  = this.GetUniformLocation("ProjModelViewMatrix");
    
    this.SetIsArrayAttribute(this.a_VertexPosition, true);
    this.SetIsArrayAttribute(this.a_VertexColor, true);
}
// Default program variable bind function
DefaultProgramBindFunction = function(p_Mesh) {
    this.l_ComputedMatrix = new Salvation.Core.Matrix4();
    this.l_ComputedMatrix.Import(this.VideoDriver.ProjectionMatrix);
    this.l_ComputedMatrix.Multiply(this.VideoDriver.ModelViewMatrix);
    
    this.SetUniformMatrix4FV(this.u_ProjModelViewMatrix, false, this.l_ComputedMatrix);
    
    this.SetAttributeVertexPointerFloat(this.a_VertexPosition, p_Mesh.VertexBufferPtr);
    this.SetAttributeVertexPointerFloat(this.a_VertexColor, p_Mesh.ColorBufferPtr);
}


// Shader constructor
Salvation.Video.Shader = function(p_VideoDriver, p_FragStr, p_VertStr) {
    this.Type           = "Salvation.Video.Shader";
    this.VideoDriver    = p_VideoDriver;
    this.Fragment       = p_VideoDriver.Device.GlContext.createShader(p_VideoDriver.Device.GlContext.FRAGMENT_SHADER);
    this.Vertex         = p_VideoDriver.Device.GlContext.createShader(p_VideoDriver.Device.GlContext.VERTEX_SHADER);
    this.Program        = p_VideoDriver.Device.GlContext.createProgram();
    
    // Compile fragment 
    p_VideoDriver.Device.GlContext.shaderSource(this.Fragment, p_FragStr);
    p_VideoDriver.Device.GlContext.compileShader(this.Fragment);
    
    if (!p_VideoDriver.Device.GlContext.getShaderParameter(this.Fragment, p_VideoDriver.Device.GlContext.COMPILE_STATUS)) 
    {
        this.FragmentErrorStr   = p_VideoDriver.Device.GlContext.getShaderInfoLog(this.Fragment);
        this.IsFramgmentCreated = false;
    }
    else
    {
        this.IsFramgmentCreated = true;
    }

    // Compile Vertex 
    p_VideoDriver.Device.GlContext.shaderSource(this.Vertex, p_VertStr);
    p_VideoDriver.Device.GlContext.compileShader(this.Vertex);
    
    if (!p_VideoDriver.Device.GlContext.getShaderParameter(this.Vertex, p_VideoDriver.Device.GlContext.COMPILE_STATUS)) 
    {
        this.VertexErrorStr     = p_VideoDriver.Device.GlContext.getShaderInfoLog(this.Vertex);
        this.IsVertexCreated    = false;
    }
    else
    {
        this.IsVertexCreated = true;
    }
    
    // Now we make the program and link vert + frag into
    p_VideoDriver.Device.GlContext.attachShader(this.Program, this.Vertex);
    p_VideoDriver.Device.GlContext.attachShader(this.Program, this.Fragment);
    p_VideoDriver.Device.GlContext.linkProgram(this.Program);

    if (!p_VideoDriver.Device.GlContext.getProgramParameter(this.Program, p_VideoDriver.Device.GlContext.LINK_STATUS))
        this.IsProgramCreated = false;
    else
        this.IsProgramCreated = true;

    // Bind class functions
    this.IsCreated                          = Salvation.Video.Shader_IsCreated;
    this.SetIsArrayAttribute                = Salvation.Video.Shader_SetIsArrayAttribute;
    this.GetAttributeLocation               = Salvation.Video.Shader_GetAttributeLocation;
    this.GetUniformLocation                 = Salvation.Video.Shader_GetUniformLocation;
    this.SetUniformMatrix4FV                = Salvation.Video.Shader_SetUniformMatrix4FV;
    this.SetAttributeVertexPointerFloat     = Salvation.Video.Shader_SetAttributeVertexPointerFloat;
    this.Init                               = function() {};
    this.Bind                               = function(p_Mesh) {};
};

// Check if shader is correctly created
Salvation.Video.Shader_IsCreated = function() {
    return this.IsProgramCreated && this.IsVertexCreated && this.IsFramgmentCreated;
}

// Enable array accessor for an attribute
Salvation.Video.Shader_SetIsArrayAttribute = function(p_Location, p_State) {
    if (p_State)
        this.VideoDriver.Device.GlContext.enableVertexAttribArray(p_Location);
    else
        this.VideoDriver.Device.GlContext.disableVertexAttribArray(p_Location);
}

// Get attribute var location
Salvation.Video.Shader_GetAttributeLocation = function(p_Name) {
    return this.VideoDriver.Device.GlContext.getAttribLocation(this.Program, p_Name);
};
// Get uniform var location
Salvation.Video.Shader_GetUniformLocation = function(p_Name) {
    return this.VideoDriver.Device.GlContext.getUniformLocation(this.Program, p_Name);
};

// Set uniform matrix 4fv
Salvation.Video.Shader_SetUniformMatrix4FV = function(p_Location, p_Transpose, p_Matrix) {
    this.VideoDriver.Device.GlContext.uniformMatrix4fv(p_Location, p_Transpose, p_Matrix.Values);
};

// Set vertex attribute pointer
Salvation.Video.Shader_SetAttributeVertexPointerFloat = function(p_Location, p_Pointer) {
    this.VideoDriver.Device.GlContext.bindBuffer(this.VideoDriver.Device.GlContext.ARRAY_BUFFER, p_Pointer);
    this.VideoDriver.Device.GlContext.vertexAttribPointer(p_Location, p_Pointer.itemSize, this.VideoDriver.Device.GlContext.FLOAT, false, 0, 0);
};

