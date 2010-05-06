uniform sampler2D Outline;
uniform vec4 Material;
uniform bool isTextured;


varying vec3  vNormal;
varying vec3  vLight1;
varying vec3  vLight2;
varying vec3  vLight3;
varying vec3  vView;

void main(void)
{
   vec3 norm = normalize (vNormal);
   vec2 texCoord = vec2(1.0 - dot (norm, normalize(vView)), 0.5);
   vec3 outline = texture2D(Outline, texCoord).xyz;
   float lighting = dot (normalize (vLight1), norm) * 0.5 + 0.5;
   lighting += dot (normalize (vLight2), norm) * 0.5 + 0.5;
   lighting += dot (normalize (vLight3), norm) * 0.5 + 0.5;
   lighting = max(0.0, lighting);  
   vec3 color = vec3(outline) * vec3(lighting) * Material.rgb;
   float alpha = 1.0;
   if (isTextured)
   {
     float alpha = 0.5;
   }
   gl_FragColor = vec4(color,alpha); 
}   