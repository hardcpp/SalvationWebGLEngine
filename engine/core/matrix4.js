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
    this.Translate      = Salvation.Core.Matrix4_Translate;
    this.Scale          = Salvation.Core.Matrix4_Scale;
    this.Identity       = Salvation.Core.Matrix4_Identity;
    this.Multiply       = Salvation.Core.Matrix4_Multiply;
};

// Import values from an other matrix4
Salvation.Core.Matrix4_Import = function(p_Src) {
    for (l_I = 0 ; l_I < 16 ; ++l_I)
        this.Values[l_I] = p_Src.Values[l_I];
};

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
};

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
    var l_Values = (typeof Float32Array !== 'undefined') ? new Float32Array(16) : new Array(16);
    
    l_Values[0]      = this.Values[0] * l_B00 + this.Values[4] * l_B01 + this.Values[8]  * l_B02;
    l_Values[1]      = this.Values[1] * l_B00 + this.Values[5] * l_B01 + this.Values[9]  * l_B02;
    l_Values[2]      = this.Values[2] * l_B00 + this.Values[6] * l_B01 + this.Values[10] * l_B02;
    l_Values[3]      = this.Values[3] * l_B00 + this.Values[7] * l_B01 + this.Values[11] * l_B02;
    l_Values[4]      = this.Values[0] * l_B10 + this.Values[4] * l_B11 + this.Values[8]  * l_B12;
    l_Values[5]      = this.Values[1] * l_B10 + this.Values[5] * l_B11 + this.Values[9]  * l_B12;
    l_Values[6]      = this.Values[2] * l_B10 + this.Values[6] * l_B11 + this.Values[10] * l_B12;
    l_Values[7]      = this.Values[3] * l_B10 + this.Values[7] * l_B11 + this.Values[11] * l_B12;
    l_Values[8]      = this.Values[0] * l_B20 + this.Values[4] * l_B21 + this.Values[8]  * l_B22;
    l_Values[9]      = this.Values[1] * l_B20 + this.Values[5] * l_B21 + this.Values[9]  * l_B22;
    l_Values[10]     = this.Values[2] * l_B20 + this.Values[6] * l_B21 + this.Values[10] * l_B22;
    l_Values[11]     = this.Values[3] * l_B20 + this.Values[7] * l_B21 + this.Values[11] * l_B22;
    l_Values[12]     = this.Values[12];
    l_Values[13]     = this.Values[13];
    l_Values[14]     = this.Values[14];
    l_Values[15]     = this.Values[15];
    
    this.Values = l_Values;
};
// Rotate on all axis (in radian)
Salvation.Core.Matrix4_RotateXYZ = function(p_X, p_Y, p_Z) {
    this.Rotate(p_X, [1, 0, 0]);
    this.Rotate(p_Y, [0, 1, 0]);
    this.Rotate(p_Z, [0, 0, 1]);
};

// Translate matrix4
Salvation.Core.Matrix4_Translate = function(p_X, p_Y, p_Z) {
    this.Values[12] = this.Values[0] * p_X + this.Values[4] * p_Y + this.Values[8]  * p_Z + this.Values[12];
    this.Values[13] = this.Values[1] * p_X + this.Values[5] * p_Y + this.Values[9]  * p_Z + this.Values[13];
    this.Values[14] = this.Values[2] * p_X + this.Values[6] * p_Y + this.Values[10] * p_Z + this.Values[14];
    this.Values[15] = this.Values[3] * p_X + this.Values[7] * p_Y + this.Values[11] * p_Z + this.Values[15];
};

// Scale matrix4
Salvation.Core.Matrix4_Scale = function(p_X, p_Y, p_Z) {
    for (l_I = 0 ; l_I < 4 ; ++l_I)
        this.Values[l_I] *= p_X;
    for (l_I = 4 ; l_I < 8 ; ++l_I)
        this.Values[l_I] *= p_Y;
    for (l_I = 8 ; l_I < 12 ; ++l_I)
        this.Values[l_I] *= p_Z;    
};

// Set to identity
Salvation.Core.Matrix4_Identity = function() {
    for (l_I = 0 ; l_I < 16 ; ++l_I)
        this.Values[l_I] = 0;
    
    this.Values[0]      = 1;
    this.Values[5]      = 1;
    this.Values[10]     = 1;
    this.Values[15]     = 1;
};

// Multiply with other matrix4
Salvation.Core.Matrix4_Multiply = function(p_Other) {
    var l_Values = (typeof Float32Array !== 'undefined') ? new Float32Array(16) : new Array(16);

    l_Values[0]  = p_Other.Values[0]*this.Values[0]  + p_Other.Values[1]*this.Values[4]  + p_Other.Values[2]*this.Values[8]      + p_Other.Values[3]*this.Values[12];
    l_Values[1]  = p_Other.Values[0]*this.Values[1]  + p_Other.Values[1]*this.Values[5]  + p_Other.Values[2]*this.Values[9]      + p_Other.Values[3]*this.Values[13];
    l_Values[2]  = p_Other.Values[0]*this.Values[2]  + p_Other.Values[1]*this.Values[6]  + p_Other.Values[2]*this.Values[10]     + p_Other.Values[3]*this.Values[14];
    l_Values[3]  = p_Other.Values[0]*this.Values[3]  + p_Other.Values[1]*this.Values[7]  + p_Other.Values[2]*this.Values[11]     + p_Other.Values[3]*this.Values[15];
    
    l_Values[4]  = p_Other.Values[4]*this.Values[0]  + p_Other.Values[5]*this.Values[4]  + p_Other.Values[6]*this.Values[8]      + p_Other.Values[7]*this.Values[12];
    l_Values[5]  = p_Other.Values[4]*this.Values[1]  + p_Other.Values[5]*this.Values[5]  + p_Other.Values[6]*this.Values[9]      + p_Other.Values[7]*this.Values[13];
    l_Values[6]  = p_Other.Values[4]*this.Values[2]  + p_Other.Values[5]*this.Values[6]  + p_Other.Values[6]*this.Values[10]     + p_Other.Values[7]*this.Values[14];
    l_Values[7]  = p_Other.Values[4]*this.Values[3]  + p_Other.Values[5]*this.Values[7]  + p_Other.Values[6]*this.Values[11]     + p_Other.Values[7]*this.Values[15];
    
    l_Values[8]  = p_Other.Values[8]*this.Values[0]  + p_Other.Values[9]*this.Values[4]  + p_Other.Values[10]*this.Values[8]     + p_Other.Values[11]*this.Values[12];
    l_Values[9]  = p_Other.Values[8]*this.Values[1]  + p_Other.Values[9]*this.Values[5]  + p_Other.Values[10]*this.Values[9]     + p_Other.Values[11]*this.Values[13];
    l_Values[10] = p_Other.Values[8]*this.Values[2]  + p_Other.Values[9]*this.Values[6]  + p_Other.Values[10]*this.Values[10]    + p_Other.Values[11]*this.Values[14];
    l_Values[11] = p_Other.Values[8]*this.Values[3]  + p_Other.Values[9]*this.Values[7]  + p_Other.Values[10]*this.Values[11]    + p_Other.Values[11]*this.Values[15];
    
    l_Values[12] = p_Other.Values[12]*this.Values[0] + p_Other.Values[13]*this.Values[4] + p_Other.Values[14]*this.Values[8]     + p_Other.Values[15]*this.Values[12];
    l_Values[13] = p_Other.Values[12]*this.Values[1] + p_Other.Values[13]*this.Values[5] + p_Other.Values[14]*this.Values[9]     + p_Other.Values[15]*this.Values[13];
    l_Values[14] = p_Other.Values[12]*this.Values[2] + p_Other.Values[13]*this.Values[6] + p_Other.Values[14]*this.Values[10]    + p_Other.Values[15]*this.Values[14];
    l_Values[15] = p_Other.Values[12]*this.Values[3] + p_Other.Values[13]*this.Values[7] + p_Other.Values[14]*this.Values[11]    + p_Other.Values[15]*this.Values[15];
    
    this.Values = l_Values;
};

