
var Salvation={};Salvation.Core={};Salvation.Video={};Salvation.Scene={};Salvation.Gui={};var DegToRadCoefficient=Math.PI/180;Salvation.Device=function(p_Canvas){this.Type="Salvation.Device";this.Canvas=p_Canvas;this.GlContext=null;if(p_Canvas.addEventListener)
{p_Canvas.addEventListener("webglcontextcreationerror",function(p_Event){if(p_Canvas.parentNode)
{this.ErrorStr=window.WebGLRenderingContext?"It doesn't appear your computer can support WebGL.":"This page requires a browser that supports WebGL.";if(p_Event.statusMessage)
this.ErrorStr+=" Error : "+p_Event.statusMessage;}},false);}
try
{var l_ContextNames=["webgl","experimental-webgl","webkit-3d","moz-webgl"];for(var l_I=0;l_I<l_ContextNames.length;++l_I)
{if(this.GlContext)
continue;try
{this.GlContext=p_Canvas.getContext(l_ContextNames[l_I]);}
catch(l_Exception)
{}}
this.GlContext.viewportWidth=p_Canvas.width;this.GlContext.viewportHeight=p_Canvas.height;}
catch(l_Exception)
{}
this.IsCreated=Salvation.Device_IsCreated;if(this.IsCreated)
{this.VideoDriver=new Salvation.Video.Driver(this);this.VideoDriver.BeginScene();this.VideoDriver.EndScene();}};Salvation.Device_IsCreated=function(){if(this.GlContext)
return true;return false;}
Salvation.Core.Matrix4=function(){this.Type="Salvation.Core.Matrix4";this.Values=(typeof Float32Array!=='undefined')?new Float32Array(16):new Array(16);for(l_I=0;l_I<16;++l_I)
this.Values[l_I]=0;this.Import=Salvation.Core.Matrix4_Import;this.Perspective=Salvation.Core.Matrix4_Perspective;this.Rotate=Salvation.Core.Matrix4_Rotate;this.RotateXYZ=Salvation.Core.Matrix4_RotateXYZ;this.Translate=Salvation.Core.Matrix4_Translate
this.Scale=Salvation.Core.Matrix4_Scale
this.Identity=Salvation.Core.Matrix4_Identity};Salvation.Core.Matrix4_Import=function(p_Src){for(l_I=0;l_I<16;++l_I)
this.Values[l_I]=p_Src.Values[l_I];}
Salvation.Core.Matrix4_Perspective=function(p_Fovy,p_Aspect,p_Near,p_Far){l_NF=1/(p_Near-p_Far);l_F=(1.0/Math.tan(p_Fovy/2));this.Values[0]=l_F/p_Aspect;this.Values[1]=0;this.Values[2]=0;this.Values[3]=0;this.Values[4]=0;this.Values[5]=l_F;this.Values[6]=0;this.Values[7]=0;this.Values[8]=0;this.Values[9]=0;this.Values[10]=(p_Far+p_Near)*l_NF;this.Values[11]=-1;this.Values[12]=0;this.Values[13]=0;this.Values[14]=(2*p_Far*p_Near)*l_NF;this.Values[15]=0;}
Salvation.Core.Matrix4_Rotate=function(p_Rad,p_Axis){var l_XAxis=p_Axis[0],l_YAxis=p_Axis[1],l_ZAxis=p_Axis[2];var l_Len=Math.sqrt(l_XAxis*l_XAxis+l_YAxis*l_YAxis+l_ZAxis*l_ZAxis);var l_S,l_C,l_T;if(Math.abs(l_Len)<0.000001)
return;l_Len=1/l_Len;l_XAxis*=l_Len;l_YAxis*=l_Len;l_ZAxis*=l_Len;l_S=Math.sin(p_Rad);l_C=Math.cos(p_Rad);l_T=1-l_C;var l_B00=l_XAxis*l_XAxis*l_T+l_C;var l_B01=l_YAxis*l_XAxis*l_T+l_ZAxis*l_S;var l_B02=l_ZAxis*l_XAxis*l_T-l_YAxis*l_S;var l_B10=l_XAxis*l_YAxis*l_T-l_ZAxis*l_S;var l_B11=l_YAxis*l_YAxis*l_T+l_C;var l_B12=l_ZAxis*l_YAxis*l_T+l_XAxis*l_S;var l_B20=l_XAxis*l_ZAxis*l_T+l_YAxis*l_S;var l_B21=l_YAxis*l_ZAxis*l_T-l_XAxis*l_S;var l_B22=l_ZAxis*l_ZAxis*l_T+l_C;this.Values[0]=this.Values[0]*l_B00+this.Values[4]*l_B01+this.Values[8]*l_B02;this.Values[1]=this.Values[1]*l_B00+this.Values[5]*l_B01+this.Values[9]*l_B02;this.Values[2]=this.Values[2]*l_B00+this.Values[6]*l_B01+this.Values[10]*l_B02;this.Values[3]=this.Values[3]*l_B00+this.Values[7]*l_B01+this.Values[11]*l_B02;this.Values[4]=this.Values[0]*l_B10+this.Values[4]*l_B11+this.Values[8]*l_B12;this.Values[5]=this.Values[1]*l_B10+this.Values[5]*l_B11+this.Values[9]*l_B12;this.Values[6]=this.Values[2]*l_B10+this.Values[6]*l_B11+this.Values[10]*l_B12;this.Values[7]=this.Values[3]*l_B10+this.Values[7]*l_B11+this.Values[11]*l_B12;this.Values[8]=this.Values[0]*l_B20+this.Values[4]*l_B21+this.Values[8]*l_B22;this.Values[9]=this.Values[1]*l_B20+this.Values[5]*l_B21+this.Values[9]*l_B22;this.Values[10]=this.Values[2]*l_B20+this.Values[6]*l_B21+this.Values[10]*l_B22;this.Values[11]=this.Values[3]*l_B20+this.Values[7]*l_B21+this.Values[11]*l_B22;}
Salvation.Core.Matrix4_RotateXYZ=function(p_X,p_Y,p_Z){this.Rotate(p_X,[1,0,0]);this.Rotate(p_Y,[0,1,0]);this.Rotate(p_Z,[0,0,1]);}
Salvation.Core.Matrix4_Translate=function(p_X,p_Y,p_Z){this.Values[12]=this.Values[0]*p_X+this.Values[4]*p_Y+this.Values[8]*p_Z+this.Values[12];this.Values[13]=this.Values[1]*p_X+this.Values[5]*p_Y+this.Values[9]*p_Z+this.Values[13];this.Values[14]=this.Values[2]*p_X+this.Values[6]*p_Y+this.Values[10]*p_Z+this.Values[14];this.Values[15]=this.Values[3]*p_X+this.Values[7]*p_Y+this.Values[11]*p_Z+this.Values[15];}
Salvation.Core.Matrix4_Scale=function(p_X,p_Y,p_Z){for(l_I=0;l_I<4;++l_I)
this.Values[l_I]*=p_X;for(l_I=4;l_I<8;++l_I)
this.Values[l_I]*=p_Y;for(l_I=8;l_I<12;++l_I)
this.Values[l_I]*=p_Z;}
Salvation.Core.Matrix4_Identity=function(p_X,p_Y,p_Z){for(l_I=0;l_I<16;++l_I)
this.Values[l_I]*=0;this.Values[0]=1;this.Values[5]=1;this.Values[10]=1;this.Values[15]=1;}
Salvation.Video.Color=function(p_R,p_G,p_B,p_A){this.Type="Salvation.Video.Color";if(p_A!==undefined)
{this.R=p_R;this.G=p_G;this.B=p_B;this.A=p_A;}
else
{this.R=0;this.G=0;this.B=0;this.A=0;}};Salvation.Video.Driver=function(p_Device){this.Type="Salvation.Video.Driver";this.Device=p_Device;this.ClearColor=new Salvation.Video.Color(0.0,0.0,0.0,1.0);this.ProjectionMatrix=new Salvation.Core.Matrix4();this.ModelViewMatrix=new Salvation.Core.Matrix4();this.ModelViewStack=[];p_Device.GlContext.enable(p_Device.GlContext.DEPTH_TEST);p_Device.GlContext.clearColor(this.ClearColor.R,this.ClearColor.G,this.ClearColor.B,this.ClearColor.A);this.BeginScene=Salvation.Video.Driver_BeginScene;this.EndScene=Salvation.Video.Driver_EndScene;this.PushModelView=Salvation.Video.Driver_PushModelView;this.PopModelView=Salvation.Video.Driver_PopModelView;this.UpdateClearColor=Salvation.Video.Driver_UpdateClearColor;};Salvation.Video.Driver_BeginScene=function(){this.Device.GlContext.viewport(0,0,this.Device.GlContext.viewportWidth,this.Device.GlContext.viewportHeight);this.Device.GlContext.clear(this.Device.GlContext.COLOR_BUFFER_BIT|this.Device.GlContext.DEPTH_BUFFER_BIT);this.ProjectionMatrix.Perspective(45,this.Device.GlContext.viewportWidth/this.Device.GlContext.viewportHeight,0.1,100.0);};Salvation.Video.Driver_EndScene=function(){};Salvation.Video.Driver_DrawMesh=function(p_Mesh){this.PushModelView();this.ModelViewMatrix.RotateXYZ(p_Mesh.Rotation.X*DegToRadCoefficient,p_Mesh.Rotation.Y*DegToRadCoefficient,p_Mesh.Rotation.Z*DegToRadCoefficient);this.ModelViewMatrix.Translate(p_Mesh.Position.X,p_Mesh.Position.Y,p_Mesh.Position.Z);this.ModelViewMatrix.Scale(p_Mesh.Scale.X,p_Mesh.Scale.Y,p_Mesh.Scale.Z);this.PopModelView();};Salvation.Video.Driver_PushModelView=function(){var l_Copy=new Salvation.Core.Matrix4();l_Copy.Import(this.ModelViewMatrix);this.ModelViewStack.push(l_Copy);}
Salvation.Video.Driver_PopModelView=function(){if(this.ModelViewStack.length==0)
return;this.ModelViewMatrix=this.ModelViewStack.pop();}
Salvation.Video.Driver_UpdateClearColor=function(){this.Device.GlContext.clearColor(this.ClearColor.R,this.ClearColor.G,this.ClearColor.B,this.ClearColor.A);};