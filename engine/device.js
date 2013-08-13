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
 
// Device constructor
Salvation.Device = function(p_Canvas) {
	this.Type 		= "Salvation.Device";
	this.Canvas 	= p_Canvas;
	this.GlContext 	= null;
	
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
  
		this.GlContext.viewportWidth 	= p_Canvas.width;
		this.GlContext.viewportHeight 	= p_Canvas.height;
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
	}
};

// Check device state
Salvation.Device_IsCreated = function() {
	if (this.GlContext)
		return true;
		
	return false;
}

