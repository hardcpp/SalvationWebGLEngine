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

