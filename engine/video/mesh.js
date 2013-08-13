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

