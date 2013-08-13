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
 
// Color constructor
Salvation.Video.Color = function(p_R, p_G, p_B, p_A) {
    this.Type = "Salvation.Video.Color";

    if (p_A !== undefined)
    {
        this.R = p_R;
        this.G = p_G;
        this.B = p_B;
        this.A = p_A;
    }
    else
    {
        this.R = 0;
        this.G = 0;
        this.B = 0;
        this.A = 0;
    }
};

