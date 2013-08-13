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

