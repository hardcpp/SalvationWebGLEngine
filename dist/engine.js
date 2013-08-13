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
 
// Init class namespaces
var Salvation = {};

Salvation.Core      = {};
Salvation.Video     = {};
Salvation.Scene     = {};
Salvation.Gui       = {};

var DegToRadCoefficient = Math.PI / 180;/*
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
 
// Device constructor
Salvation.Device = function(p_Canvas) {
    this.Type       = "Salvation.Device";
    this.Canvas     = p_Canvas;
    this.GlContext  = null;
    
    if (p_Canvas.addEventListener) 
    {
        p_Canvas.addEventListener("webglcontextcreationerror", function(p_Event) {
            if (p_Canvas.parentNode) 
            {
                this.ErrorStr = window.WebGLRenderingContext ? "It doesn't appear your computer can support WebGL." : "This page requires a browser that supports WebGL.";
                
                if (p_Event.statusMessage) 
                    this.ErrorStr +=  " Error : " + p_Event.statusMessage;
            }
        }, false);
    }
    
    try 
    {
        // Cross browser context name detection
        var l_ContextNames = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

        for (var l_I = 0 ; l_I < l_ContextNames.length; ++l_I) 
        {
            if (this.GlContext)
                continue;
                
            try 
            {
                this.GlContext = p_Canvas.getContext(l_ContextNames[l_I]);
            } 
            catch (l_Exception) 
            {
            
            }
        }
  
        this.GlContext.viewportWidth    = p_Canvas.width;
        this.GlContext.viewportHeight   = p_Canvas.height;
    }
    catch (l_Exception)
    {
    
    }
    
    // Bind class functions
    this.IsCreated = Salvation.Device_IsCreated;
    
    if (this.IsCreated)
    {
        // Create video driver instance clear screen buffer
        this.VideoDriver = new Salvation.Video.Driver(this);
        this.VideoDriver.BeginScene();
        this.VideoDriver.EndScene();
        
        // Create scene manager
        this.SceneManager = new Salvation.Scene.Manager(this);
    }
};

// Check device state
Salvation.Device_IsCreated = function() {
    if (this.GlContext)
        return true;
        
    return false;
}

/*
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 2 of the License, or (at your
 * option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHthis.Values
 * ANY WARRANTY; withthis.Values even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */
// Credits GLMatrix @http://glmatrix.net/
 
// Matrix 4 constructor
Salvation.Core.Matrix4 = function() {
    this.Type   = "Salvation.Core.Matrix4";
    this.Values = (typeof Float32Array !== 'undefined') ? new Float32Array(16) : new Array(16);
    
    for (l_I = 0 ; l_I < 16 ; ++l_I)
        this.Values[l_I] = 0;
        
    // Bind class functions
    this.Import         = Salvation.Core.Matrix4_Import;
    this.Perspective    = Salvation.Core.Matrix4_Perspective;
    this.Rotate         = Salvation.Core.Matrix4_Rotate;
    this.RotateXYZ      = Salvation.Core.Matrix4_RotateXYZ;
    this.Translate      = Salvation.Core.Matrix4_Translate
    this.Scale          = Salvation.Core.Matrix4_Scale 
    this.Identity       = Salvation.Core.Matrix4_Identity
};

// Import values from an other matrix4
Salvation.Core.Matrix4_Import = function(p_Src) {
    for (l_I = 0 ; l_I < 16 ; ++l_I)
        this.Values[l_I] = p_Src.Values[l_I];
}

// Set perspective matrix4
Salvation.Core.Matrix4_Perspective = function(p_Fovy, p_Aspect, p_Near, p_Far) {
    l_NF    = 1 / (p_Near - p_Far);
    l_F     = (1.0 / Math.tan(p_Fovy / 2));
    
    this.Values[0] = l_F / p_Aspect;
    this.Values[1] = 0;
    this.Values[2] = 0;
    this.Values[3] = 0;
    this.Values[4] = 0;
    this.Values[5] = l_F;
    this.Values[6] = 0;
    this.Values[7] = 0;
    this.Values[8] = 0;
    this.Values[9] = 0;
    this.Values[10] = (p_Far + p_Near) * l_NF;
    this.Values[11] = -1;
    this.Values[12] = 0;
    this.Values[13] = 0;
    this.Values[14] = (2 * p_Far * p_Near) * l_NF;
    this.Values[15] = 0;
}

// Rotate on axis
Salvation.Core.Matrix4_Rotate = function(p_Rad, p_Axis) {
    var l_XAxis = p_Axis[0], l_YAxis = p_Axis[1], l_ZAxis = p_Axis[2];
    var l_Len = Math.sqrt(l_XAxis * l_XAxis + l_YAxis * l_YAxis + l_ZAxis * l_ZAxis);
    var  l_S, l_C, l_T;

    if (Math.abs(l_Len) < 0.000001)
        return;
    
    l_Len = 1 / l_Len;
    l_XAxis *= l_Len;
    l_YAxis *= l_Len;
    l_ZAxis *= l_Len;

    l_S = Math.sin(p_Rad);
    l_C = Math.cos(p_Rad);
    l_T = 1 - l_C;

    // Construct the elements of the rotation matrix
    var l_B00 = l_XAxis * l_XAxis * l_T + l_C; 
    var l_B01 = l_YAxis * l_XAxis * l_T + l_ZAxis * l_S; 
    var l_B02 = l_ZAxis * l_XAxis * l_T - l_YAxis * l_S;
    var l_B10 = l_XAxis * l_YAxis * l_T - l_ZAxis * l_S; 
    var l_B11 = l_YAxis * l_YAxis * l_T + l_C; 
    var l_B12 = l_ZAxis * l_YAxis * l_T + l_XAxis * l_S;
    var l_B20 = l_XAxis * l_ZAxis * l_T + l_YAxis * l_S; 
    var l_B21 = l_YAxis * l_ZAxis * l_T - l_XAxis * l_S; 
    var l_B22 = l_ZAxis * l_ZAxis * l_T + l_C;

    // Perform rotation-specific matrix multiplication
    this.Values[0]      = this.Values[0] * l_B00 + this.Values[4] * l_B01 + this.Values[8]  * l_B02;
    this.Values[1]      = this.Values[1] * l_B00 + this.Values[5] * l_B01 + this.Values[9]  * l_B02;
    this.Values[2]      = this.Values[2] * l_B00 + this.Values[6] * l_B01 + this.Values[10] * l_B02;
    this.Values[3]      = this.Values[3] * l_B00 + this.Values[7] * l_B01 + this.Values[11] * l_B02;
    this.Values[4]      = this.Values[0] * l_B10 + this.Values[4] * l_B11 + this.Values[8]  * l_B12;
    this.Values[5]      = this.Values[1] * l_B10 + this.Values[5] * l_B11 + this.Values[9]  * l_B12;
    this.Values[6]      = this.Values[2] * l_B10 + this.Values[6] * l_B11 + this.Values[10] * l_B12;
    this.Values[7]      = this.Values[3] * l_B10 + this.Values[7] * l_B11 + this.Values[11] * l_B12;
    this.Values[8]      = this.Values[0] * l_B20 + this.Values[4] * l_B21 + this.Values[8]  * l_B22;
    this.Values[9]      = this.Values[1] * l_B20 + this.Values[5] * l_B21 + this.Values[9]  * l_B22;
    this.Values[10]     = this.Values[2] * l_B20 + this.Values[6] * l_B21 + this.Values[10] * l_B22;
    this.Values[11]     = this.Values[3] * l_B20 + this.Values[7] * l_B21 + this.Values[11] * l_B22;
}
// Rotate on all axis (in radian)
Salvation.Core.Matrix4_RotateXYZ = function(p_X, p_Y, p_Z) {
    this.Rotate(p_X, [1, 0, 0]);
    this.Rotate(p_Y, [0, 1, 0]);
    this.Rotate(p_Z, [0, 0, 1]);
}

// Translate matrix4
Salvation.Core.Matrix4_Translate = function(p_X, p_Y, p_Z) {
    this.Values[12] = this.Values[0] * p_X + this.Values[4] * p_Y + this.Values[8]  * p_Z + this.Values[12];
    this.Values[13] = this.Values[1] * p_X + this.Values[5] * p_Y + this.Values[9]  * p_Z + this.Values[13];
    this.Values[14] = this.Values[2] * p_X + this.Values[6] * p_Y + this.Values[10] * p_Z + this.Values[14];
    this.Values[15] = this.Values[3] * p_X + this.Values[7] * p_Y + this.Values[11] * p_Z + this.Values[15];
}

// Scale matrix4
Salvation.Core.Matrix4_Scale = function(p_X, p_Y, p_Z) {
    for (l_I = 0 ; l_I < 4 ; ++l_I)
        this.Values[l_I] *= p_X;
    for (l_I = 4 ; l_I < 8 ; ++l_I)
        this.Values[l_I] *= p_Y;
    for (l_I = 8 ; l_I < 12 ; ++l_I)
        this.Values[l_I] *= p_Z;    
}

// Set to identity
Salvation.Core.Matrix4_Identity = function(p_X, p_Y, p_Z) {
    for (l_I = 0 ; l_I < 16 ; ++l_I)
        this.Values[l_I] *= 0;
    
    this.Values[0]      = 1;
    this.Values[5]      = 1;
    this.Values[10]     = 1;
    this.Values[15]     = 1;
}

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
 
// Vector3 constructor
Salvation.Core.Vector3 = function(p_X, p_Y, p_Z) {
    this.Type = "Salvation.Core.Vector3";

    if (p_Z !== undefined)
    {
        this.X = p_X;
        this.Y = p_Y;
        this.Z = p_Z;
    }
    else
    {
        this.X = 0;
        this.Y = 0;
        this.Z = 0;
    }
};

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
 
// Color constructor
Salvation.Video.Color = function(p_R, p_G, p_B, p_A) {
    this.Type = "Salvation.Video.Color";

    if (p_A !== undefined)
    {
        this.R = p_R;
        this.G = p_G;
        this.B = p_B;
        this.A = p_A;
    }
    else
    {
        this.R = 0;
        this.G = 0;
        this.B = 0;
        this.A = 0;
    }
};

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

// Video driver constructor
Salvation.Video.Driver = function(p_Device) {
    this.Type       = "Salvation.Video.Driver";
    this.Device     = p_Device;
    this.ClearColor = new Salvation.Video.Color(0.0, 0.0, 0.0, 1.0);
    
    this.ProjectionMatrix   = new Salvation.Core.Matrix4();
    this.ModelViewMatrix    = new Salvation.Core.Matrix4();
    this.ModelViewStack     = [];

    p_Device.GlContext.enable(p_Device.GlContext.DEPTH_TEST);
    p_Device.GlContext.clearColor(this.ClearColor.R, this.ClearColor.G, this.ClearColor.B, this.ClearColor.A);
    
    // Create default shader
    this.DefaultShader = new Salvation.Video.Shader(this, DefaultFragmentProgram, DefaultVertexProgram);
    this.DefaultShader.Init = DefaultProgramInitFunction;
    this.DefaultShader.Bind = DefaultProgramBindFunction;
    this.DefaultShader.Init();

    // Bind class functions
    this.BeginScene         = Salvation.Video.Driver_BeginScene;
    this.EndScene           = Salvation.Video.Driver_EndScene;
    this.DrawMesh           = Salvation.Video.Driver_DrawMesh;
    this.PushModelView      = Salvation.Video.Driver_PushModelView;
    this.PopModelView       = Salvation.Video.Driver_PopModelView;
    this.UpdateClearColor   = Salvation.Video.Driver_UpdateClearColor;
    this.GetDefaultShader   = Salvation.Video.Driver_GetDefaultShader;
    this.CreateMesh         = Salvation.Video.Driver_CreateMesh;
    this.CreateMaterial     = Salvation.Video.Driver_CreateMaterial;
};

// Prepare frame rendering
Salvation.Video.Driver_BeginScene = function() {
    this.Device.GlContext.viewport(0, 0, this.Device.GlContext.viewportWidth, this.Device.GlContext.viewportHeight);
    this.Device.GlContext.clear(this.Device.GlContext.COLOR_BUFFER_BIT | this.Device.GlContext.DEPTH_BUFFER_BIT);
    
    this.ProjectionMatrix.Perspective(45, this.Device.GlContext.viewportWidth / this.Device.GlContext.viewportHeight, 0.1, 100.0);
    this.ModelViewMatrix.Identity();
};
// End frame rendering
Salvation.Video.Driver_EndScene = function() {

};

// Draw a mesh
Salvation.Video.Driver_DrawMesh = function(p_Mesh, p_Material, p_Position, p_Scale, p_Rotation) {
    this.PushModelView();

    // Do local transformation
    this.ModelViewMatrix.Scale(p_Scale.X, p_Scale.Y, p_Scale.Z);
    this.ModelViewMatrix.RotateXYZ(p_Rotation.X * DegToRadCoefficient, p_Rotation.Y * DegToRadCoefficient, p_Rotation.Z * DegToRadCoefficient);
    this.ModelViewMatrix.Translate(p_Position.X, p_Position.Y, p_Position.Z);

    // Bind shader
    this.Device.GlContext.useProgram(p_Material.Shader.Program);
    
    // Bind values to the shader
    p_Material.Shader.Bind(p_Mesh);
    
    // Bind indices array
    this.Device.GlContext.bindBuffer(this.Device.GlContext.ELEMENT_ARRAY_BUFFER, p_Mesh.IndiceBufferPtr);
    
    // Draw the mesh
    this.Device.GlContext.drawElements(this.Device.GlContext.TRIANGLES, p_Mesh.IndiceBufferPtr.numItems, this.Device.GlContext.UNSIGNED_SHORT, 0);
    
    this.PopModelView();
};

// Push model view matrix
Salvation.Video.Driver_PushModelView = function() {
    var l_Copy = new Salvation.Core.Matrix4();
    
    l_Copy.Import(this.ModelViewMatrix);
    
    this.ModelViewStack.push(l_Copy);
}
// Pop model view matrix
Salvation.Video.Driver_PopModelView = function() {
    if (this.ModelViewStack.length == 0)
        return;
        
    this.ModelViewMatrix = this.ModelViewStack.pop();
}

// Update clear color of gl context
Salvation.Video.Driver_UpdateClearColor = function() {
    this.Device.GlContext.clearColor(this.ClearColor.R, this.ClearColor.G, this.ClearColor.B, this.ClearColor.A);
};

// Return default shader program
Salvation.Video.Driver_GetDefaultShader = function() {
    return this.DefaultShader;
}

// Create an empty mesh
Salvation.Video.Driver_CreateMesh = function(p_Name) {
    return new Salvation.Video.Mesh(this, p_Name);
}
// Create a material
Salvation.Video.Driver_CreateMaterial = function() {
    return new Salvation.Video.Material(this);
}

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
 
// Material constructor
Salvation.Video.Material = function(p_VideoDriver) {
    this.Type           = "Salvation.Video.Material";
    this.Texture        = 0;
    this.Shader         = p_VideoDriver.GetDefaultShader();
};

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
 
// Mesh constructor
Salvation.Video.Mesh = function(p_VideoDriver, p_Name) {
    this.Type           = "Salvation.Video.Mesh";
    this.VideoDriver    = p_VideoDriver;
    this.Name           = p_Name;
    
    this.VertexBuffer   = (typeof Float32Array !== 'undefined') ? new Float32Array() : new Array();
    this.ColorBuffer    = (typeof Float32Array !== 'undefined') ? new Float32Array() : new Array();
    this.UVBuffer       = (typeof Float32Array !== 'undefined') ? new Float32Array() : new Array();
    this.IndiceBuffer   = (typeof Uint16Array !== 'undefined') ? new Uint16Array() : new Array();
    
    this.VertexBufferPtr   = p_VideoDriver.Device.GlContext.createBuffer();
    this.ColorBufferPtr    = p_VideoDriver.Device.GlContext.createBuffer();
    this.UVBufferPtr       = p_VideoDriver.Device.GlContext.createBuffer();
    this.IndiceBufferPtr   = p_VideoDriver.Device.GlContext.createBuffer();
    
    this.VertexBufferPtr.itemSize   = 3;
    this.ColorBufferPtr.itemSize    = 4;
    this.UVBufferPtr.itemSize       = 2;
    this.IndiceBufferPtr.itemSize   = 1;
    
    // Bind class functions
    this.Release        = Salvation.Video.Mesh_Release;
    this.UpdateBuffers  = Salvation.Video.Mesh_UpdateBuffers;
};

// Release buffer
Salvation.Video.Mesh_Release = function() {
    this.VideoDriver.Device.GlContext.deleteBuffer(this.VertexBufferPtr);
    this.VideoDriver.Device.GlContext.deleteBuffer(this.ColorBufferPtr);
    this.VideoDriver.Device.GlContext.deleteBuffer(this.UVBufferPtr);
    this.VideoDriver.Device.GlContext.deleteBuffer(this.IndiceBufferPtr);
};

// Commit geometry into WebGL buffers
Salvation.Video.Mesh_UpdateBuffers = function() {
    this.VideoDriver.Device.GlContext.bindBuffer(this.VideoDriver.Device.GlContext.ARRAY_BUFFER, this.VertexBufferPtr);
    this.VideoDriver.Device.GlContext.bufferData(this.VideoDriver.Device.GlContext.ARRAY_BUFFER, new Float32Array(this.VertexBuffer), this.VideoDriver.Device.GlContext.STATIC_DRAW);
    this.VertexBufferPtr.numItems = this.VertexBuffer.length / 3;

    this.VideoDriver.Device.GlContext.bindBuffer(this.VideoDriver.Device.GlContext.ARRAY_BUFFER, this.ColorBufferPtr);
    this.VideoDriver.Device.GlContext.bufferData(this.VideoDriver.Device.GlContext.ARRAY_BUFFER, new Float32Array(this.ColorBuffer), this.VideoDriver.Device.GlContext.STATIC_DRAW);
    this.ColorBufferPtr.numItems = this.ColorBuffer.length / 4;

    this.VideoDriver.Device.GlContext.bindBuffer(this.VideoDriver.Device.GlContext.ARRAY_BUFFER, this.UVBufferPtr);
    this.VideoDriver.Device.GlContext.bufferData(this.VideoDriver.Device.GlContext.ARRAY_BUFFER, new Float32Array(this.UVBuffer), this.VideoDriver.Device.GlContext.STATIC_DRAW);
    this.UVBufferPtr.numItems = this.UVBuffer.length / 2;

    this.VideoDriver.Device.GlContext.bindBuffer(this.VideoDriver.Device.GlContext.ELEMENT_ARRAY_BUFFER, this.IndiceBufferPtr);
    this.VideoDriver.Device.GlContext.bufferData(this.VideoDriver.Device.GlContext.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.IndiceBuffer), this.VideoDriver.Device.GlContext.STATIC_DRAW);
    this.IndiceBufferPtr.numItems = this.IndiceBuffer.length;
};

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
DefaultVertexProgram += "uniform mat4 ModelViewMatrix;"; 
DefaultVertexProgram += "uniform mat4 ProjectionMatrix;"; 
DefaultVertexProgram += "varying vec4 Color;"; 
//DefaultVertexProgram += "varying vec2 TextureCoord;"; 
DefaultVertexProgram += "void main(void) {"; 
DefaultVertexProgram += "       gl_Position 	= ProjectionMatrix * ModelViewMatrix * vec4(VertexPosition, 1.0);"; 
//DefaultVertexProgram += "       TextureCoord 	= VertexTextureCoord;"; 
DefaultVertexProgram += "       Color 			= VertexColor;"; 
DefaultVertexProgram += "}"; 

// Default program variable init function
DefaultProgramInitFunction = function() {
    this.a_VertexPosition       = this.GetAttributeLocation("VertexPosition");
    this.a_VertexColor          = this.GetAttributeLocation("VertexColor");
    this.u_ModelViewMatrix      = this.GetUniformLocation("ModelViewMatrix");
    this.u_ProjectionMatrix     = this.GetUniformLocation("ProjectionMatrix");
    
    this.SetIsArrayAttribute(this.a_VertexPosition, true);
    this.SetIsArrayAttribute(this.a_VertexColor, true);
}
// Default program variable bind function
DefaultProgramBindFunction = function(p_Mesh) {
    this.SetUniformMatrix4FV(this.u_ModelViewMatrix, false, this.VideoDriver.ModelViewMatrix);
    this.SetUniformMatrix4FV(this.u_ProjectionMatrix, false, this.VideoDriver.ProjectionMatrix);
    
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
 
// CubeNode constructor
Salvation.Scene.CubeNode = function(p_SceneManager, p_Name, p_Size) {
    this.Node = new Salvation.Scene.Node(p_SceneManager, p_Name);
    this.Type = "Salvation.Scene.CubeNode";

    this.Node.Mesh.VertexBuffer = [
        // Front face
        -p_Size, -p_Size,  p_Size,
        p_Size, -p_Size,  p_Size,
        p_Size,  p_Size,  p_Size,
        -p_Size,  p_Size,  p_Size,

        // Back face
        -p_Size, -p_Size, -p_Size,
        -p_Size,  p_Size, -p_Size,
        p_Size,  p_Size, -p_Size,
        p_Size, -p_Size, -p_Size,

        // Top face
        -p_Size,  p_Size, -p_Size,
        -p_Size,  p_Size,  p_Size,
        p_Size,  p_Size,  p_Size,
        p_Size,  p_Size, -p_Size,

        // Bottom face
        -p_Size, -p_Size, -p_Size,
        p_Size, -p_Size, -p_Size,
        p_Size, -p_Size,  p_Size,
        -p_Size, -p_Size,  p_Size,

        // Right face
        p_Size, -p_Size, -p_Size,
        p_Size,  p_Size, -p_Size,
        p_Size,  p_Size,  p_Size,
        p_Size, -p_Size,  p_Size,

        // Left face
        -p_Size, -p_Size, -p_Size,
        -p_Size, -p_Size,  p_Size,
        -p_Size,  p_Size,  p_Size,
        -p_Size,  p_Size, -p_Size,
    ];
    this.Node.Mesh.IndiceBuffer = [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
    ];
    this.Node.Mesh.UVBuffer = [
        // Front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        // Back face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,

        // Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        // Right face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ];
    
    var l_Colors = new Array();
    for (l_I = 0 ; l_I < 4* 4 *6 ;)
    {
        l_Colors.push(0.5);
        l_Colors.push(0.5);
        l_Colors.push(0.5);
        l_Colors.push(1);
        
        l_I += 4;
    }
    
    this.Node.Mesh.ColorBuffer = new Float32Array(l_Colors);
    this.Node.Mesh.UpdateBuffers();
};

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
 
// Manager constructor
Salvation.Scene.Manager = function(p_Device) {
    this.Type           = "Salvation.Scene.Manager";
    this.Device         = p_Device;
    this.Nodes          = [] ;
    
    // Bind class functions
    this.DrawAll            = Salvation.Scene.Manager_DrawAll;
    this.AddCubeSceneNode   = Salvation.Scene.Manager_AddCubeSceneNode;
};

Salvation.Scene.Manager_DrawAll = function() {
    for (l_I = 0 ; l_I < this.Nodes.length ; ++l_I)
        if (this.Nodes[l_I].Draw)
            this.Nodes[l_I].Draw();
        else
            this.Nodes[l_I].Node.Draw();
};

// Create a cube scene node
Salvation.Scene.Manager_AddCubeSceneNode = function(p_Name, p_Size) {
    l_Object = new Salvation.Scene.CubeNode(this, p_Name, p_Size);
    this.Nodes.push(l_Object);
    
    return l_Object;
};

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
 
// Node constructor
Salvation.Scene.Node = function(p_SceneManager, p_Name) {
    this.Type           = "Salvation.Scene.Node";
    this.Name           = p_Name;
    this.SceneManager   = p_SceneManager;
    this.Position       = new Salvation.Core.Vector3();
    this.Rotation       = new Salvation.Core.Vector3();
    this.Scale          = new Salvation.Core.Vector3(1, 1, 1);
    
    this.Mesh       = p_SceneManager.Device.VideoDriver.CreateMesh(p_Name + "_Mesh");
    this.Material   = p_SceneManager.Device.VideoDriver.CreateMaterial();
    
    // Bind class functions
    this.Draw = Salvation.Scene.Manager_Draw;
};

// Draw scene node
Salvation.Scene.Manager_Draw = function() {
    this.SceneManager.Device.VideoDriver.DrawMesh(this.Mesh, this.Material, this.Position, this.Scale, this.Rotation);
};

