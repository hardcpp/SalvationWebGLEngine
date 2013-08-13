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

