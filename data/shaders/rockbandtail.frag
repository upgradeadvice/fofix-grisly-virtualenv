uniform float height;
uniform float songpos;
uniform float speed;

uniform vec4 color;

varying vec3 pos;
varying vec2 vTexCoord;

void main()
{
   float width = 0.2;
   float linewidth = -0.001;
   float blureffect = 4.0;
   float glowExp = 200.0;
   
   float fadeposition = 0.03;
   float fadeintensity = 2.9;

   vec4 white = color + 0.6;
   
   float sinHeight = (height-0.15) * (1.0 + 0.3 * sin(songpos / 100.0));
   
   float sinz = 5.0 * sinHeight * width * abs(sin(pos.z-(songpos / 1000.0 *speed)));
   
   //curves
   float dist1 = abs(pos.x + sinz) / blureffect;
   float dist2 = abs(pos.x - sinz) / blureffect;
   float glow1 = pow(clamp(1.0 - dist1+linewidth, 0.0, 1.0), glowExp);
   float glow2 = pow(clamp(1.0 - dist2+linewidth, 0.0, 1.0), glowExp);
   
   float whitedist1 = abs(pos.x + sinz) / blureffect*3.0;
   float whitedist2 = abs(pos.x - sinz) / blureffect*3.0;
   float whiteglow1 = pow(clamp(1.0 - whitedist1+linewidth, 0.0, 1.0), glowExp);
   float whiteglow2 = pow(clamp(1.0 - whitedist2+linewidth, 0.0, 1.0), glowExp); 
   
   //end blur
   float endglow = (1.0 - vTexCoord.x - fadeposition)*fadeintensity;
   
   //glow between curves
   float backdist1 = pos.x - max(sinz,-sinz);
   float backdist2 = -pos.x - max(sinz,-sinz);
   float backglow = pow(clamp(1.0-backdist2, 0.0, 1.0), 10.0) + pow(clamp(1.0-backdist1, 0.0, 1.0), 10.0);
   
   gl_FragColor = (endglow*color)*((glow1 + glow2 - glow1 * glow2) + 0.1 * (backglow-1.0)) + (endglow*white)*(whiteglow1 + whiteglow2 - whiteglow1 * whiteglow2);
}