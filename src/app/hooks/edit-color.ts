/**
 * Lighten or darken a color by a specified amount.
 * @param col - The color to lighten or darken.
 * @param amt - The amount to lighten or darken the color.
 * @returns {string} - The lightened or darkened color.
 */
export function LightenDarkenColor(col: string, amt: number): string {
  let usePound = false;
  if ( col[0] == "#" ) {
    col = col.slice(1);
    usePound = true;
  }

  let num = parseInt(col,16);

  let r = (num >> 16) + amt;

  if ( r > 255 ) r = 255;
  else if  (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) + amt;

  if ( b > 255 ) b = 255;
  else if  (b < 0) b = 0;

  let g = (num & 0x0000FF) + amt;

  if ( g > 255 ) g = 255;
  else if  ( g < 0 ) g = 0;

  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}
