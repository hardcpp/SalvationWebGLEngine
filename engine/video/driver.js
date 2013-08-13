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
    this.ModelViewMatrix.RotateXYZ(p_Rotation.X * DegToRadCoefficient, p_Rotation.Y * DegToRadCoefficient, p_Rotation.Z * DegToRadCoefficient);
    this.ModelViewMatrix.Translate(p_Position.X, p_Position.Y, p_Position.Z);
    this.ModelViewMatrix.Scale(p_Scale.X, p_Scale.Y, p_Scale.Z);

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

