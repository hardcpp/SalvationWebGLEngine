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

