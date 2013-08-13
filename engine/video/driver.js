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
	this.Type		= "Salvation.Video.Driver";
	this.Device 	= p_Device;
	this.ClearColor = new Salvation.Video.Color(0.0, 0.0, 0.0, 1.0);
	
	this.ProjectionMatrix 	= new Salvation.Core.Matrix4();
	this.ModelViewMatrix 	= new Salvation.Core.Matrix4();
	this.ModelViewStack		= [];

	p_Device.GlContext.enable(p_Device.GlContext.DEPTH_TEST);
	p_Device.GlContext.clearColor(this.ClearColor.R, this.ClearColor.G, this.ClearColor.B, this.ClearColor.A);
	
	// Bind class functions
	this.BeginScene 		= Salvation.Video.Driver_BeginScene;
	this.EndScene 			= Salvation.Video.Driver_EndScene;
	this.PushModelView		= Salvation.Video.Driver_PushModelView;
	this.PopModelView		= Salvation.Video.Driver_PopModelView;
	this.UpdateClearColor	= Salvation.Video.Driver_UpdateClearColor;
};

// Prepare frame rendering
Salvation.Video.Driver_BeginScene = function() {
	this.Device.GlContext.viewport(0, 0, this.Device.GlContext.viewportWidth, this.Device.GlContext.viewportHeight);
	this.Device.GlContext.clear(this.Device.GlContext.COLOR_BUFFER_BIT | this.Device.GlContext.DEPTH_BUFFER_BIT);
	
	this.ProjectionMatrix.Perspective(45, this.Device.GlContext.viewportWidth / this.Device.GlContext.viewportHeight, 0.1, 100.0);
};
// End frame rendering
Salvation.Video.Driver_EndScene = function() {

};

// Draw a mesh
Salvation.Video.Driver_DrawMesh = function(p_Mesh) {
	this.PushModelView();

	this.ModelViewMatrix.Rotate(p_Mesh.Rotation.X * Math.PI / 180, [1, 0, 0]);
	this.ModelViewMatrix.Rotate(p_Mesh.Rotation.Y * Math.PI / 180, [0, 1, 0]);
	this.ModelViewMatrix.Rotate(p_Mesh.Rotation.Z * Math.PI / 180, [0, 0, 1]);
	this.ModelViewMatrix.Translate(p_Mesh.Position.X, p_Mesh.Position.Y, p_Mesh.Position.Z);
	this.ModelViewMatrix.Scale(p_Mesh.Scale.X, p_Mesh.Scale.Y, p_Mesh.Scale.Z);
	
	// todo
	
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

