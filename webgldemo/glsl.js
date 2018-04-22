#pragma once

#define _COPY_CODE( c )				{ StringPtr::Copy( code, c ); code += StringPtr::Length( c ); }
#define _BUILD_SCOPE( x, s )		{ if ( x ) { s } }
#define _BUILD_CODE( c, x )			{ if ( x ) { _COPY_CODE( c ) } }

//OpenGL ES default precision.
#if defined( _FANCY_OS_ANDROID ) || defined( _FANCY_OS_IOS )
#define _VS_PRECISION				_COPY_CODE( "precision highp float;\n" )
#else
#define _VS_PRECISION				_COPY_CODE( "" )
#endif

#define _VS_INPUT					_COPY_CODE( "attribute vec4 position;\n" )

#define _VS_OUTPUT					_COPY_CODE( "" )

#define _VS_MAIN					_COPY_CODE( "void main()\n" \
												"{\n" \
												"vec4 oposition = vec4(0, 0, 0, 1);\n" )

#define _VS_RETURN					_COPY_CODE( "gl_Position = oposition;\n" \
												"}\n" )

//OpenGL ES default precision.
#if defined( _FANCY_OS_ANDROID ) || defined( _FANCY_OS_IOS )
#define _PS_PRECISION				_COPY_CODE( "precision mediump float;\n" )
#else
#define _PS_PRECISION				_COPY_CODE( "" )
#endif

#define _PS_INPUT					_COPY_CODE( "" )

#if defined( _FANCY_OS_ANDROID ) || defined( _FANCY_OS_IOS )
#define _PS_MAIN					_COPY_CODE( "void main()\n" \
												"{\n" \
												"lowp vec4 fdiffuse = vec4(1, 1, 1, 1);\n" )
#else
#define _PS_MAIN					_COPY_CODE( "void main()\n" \
												"{\n" \
												"vec4 fdiffuse = vec4(1, 1, 1, 1);\n" )
#endif

#define _PS_RETURN					_COPY_CODE( "gl_FragData[0] = fdiffuse;\n" \
												"}\n" )

#define _ENVIRONMENT_MAP			_BUILD_SCOPE( cfg.envmap, \
									_BUILD_CODE( "vec3 envcoord;\n", 1 ) \
									_BUILD_CODE( "vec3 n1 = normalize(n + 0.25 * normalize(camera.xyz - opos.xyz));\n" \
												 "envcoord.x = atan(n1.y, n1.x) / 6.283;\n" \
												 "envcoord.y = 0.5 - atan(n1.z / length(n1.xy)) / 6.283;\n", !cfg.envcube && ( cfg.envmap & 0x04 ) == 0 ) \
									_BUILD_CODE( "envcoord.x = n.x * 0.5 + 0.5;\n" \
												 "envcoord.y = n.y * 0.5 + 0.5;\n", !cfg.envcube && ( cfg.envmap & 0x04 ) ) \
									_BUILD_CODE( "envcoord = reflect(normalize(opos.xyz - camera.xyz), n);\n", cfg.envcube ) \
									_BUILD_CODE( "envcoord.xy += envoffset.xy;\n", cfg.envoffset ) \
									_BUILD_CODE( "tex = textureCube(layer1, envcoord);\n", cfg.envcube ) \
									_BUILD_CODE( "tex = texture2D(layer1, envcoord.xy);\n", !cfg.envcube ) \
									_BUILD_CODE( "tex.xyz = max(pow(tex.xyz, textone1.xxx) * textone1.y + textone1.z, 0.0);\n", cfg.textone1 && !cfg.matlayer1 ) \
									_BUILD_CODE( "tex.xyz = max(pow(tex.xyz, envtones[layerindex].xxx) * envtones[layerindex].y + envtones[layerindex].z, 0.0);\n", cfg.textone1 && cfg.matlayer1 ) )

// In OpenGLES, uniform precision must be same in both vs & ps,
// uniform camera defined highp in vs, so can't be default mediump.
#if defined( _FANCY_OS_ANDROID ) || defined( _FANCY_OS_IOS )
#define _PS_CAMERA_PARAM			_BUILD_CODE( "uniform highp vec4 camera;\n", cfg.helpspe || cfg.spe || cfg.envmap || cfg.toonedge )
#else
#define _PS_CAMERA_PARAM			_BUILD_CODE( "uniform vec4 camera;\n", cfg.helpspe || cfg.spe || cfg.envmap || cfg.toonedge )
#endif

// Skinning.
// 2 layer0 ? vs texture ?
#define _VS_SKINNING_PARAM			_BUILD_SCOPE( cfg.skin, \
									_BUILD_CODE( "uniform sampler2D vtex;\n", cfg.vtf ) \
									_BUILD_CODE( "uniform vec4 bonetrans[210];\n", !cfg.vtf && GetGraphicsManager( ). GetMaxGpuSkinningCount( ) <= 70 ) \
									_BUILD_CODE( "uniform vec4 bonetrans[465];\n", !cfg.vtf && GetGraphicsManager( ). GetMaxGpuSkinningCount( ) > 70 ) )

#define _VS_SKINNING_INPUT			_BUILD_CODE( "attribute vec4 weight;\n" \
												 "attribute vec4 bone;\n", cfg.skin )

#define _VS_SKINNING1_MAIN			_BUILD_SCOPE( cfg.skin >= 1, \
									_BUILD_CODE( "float buv0 = (bone.x + 0.5) / 256;\n" \
												 "vec4 bmat0 = texture2Dlod(vtex, vec4(0.5 / 4, buv0, 0, 0)) * weight.x;\n" \
												 "vec4 bmat1 = texture2Dlod(vtex, vec4(1.5 / 4, buv0, 0, 0)) * weight.x;\n" \
												 "vec4 bmat2 = texture2Dlod(vtex, vec4(2.5 / 4, buv0, 0, 0)) * weight.x;\n", cfg.vtf ) \
									_BUILD_CODE( "int bidx0 = int(bone.x) * 3;\n" \
												 "vec4 bmat0 = bonetrans[bidx0] * weight.x;\n" \
												 "vec4 bmat1 = bonetrans[bidx0 + 1] * weight.x;\n" \
												 "vec4 bmat2 = bonetrans[bidx0 + 2] * weight.x;\n", !cfg.vtf ) )

#define _VS_SKINNING2_MAIN			_BUILD_SCOPE( cfg.skin >= 2, \
									_BUILD_CODE( "float buv1 = (bone.y + 0.5) / 256;\n" \
												 "bmat0 += texture2Dlod(vtex, vec4(0.5 / 4, buv1, 0, 0)) * weight.y;\n" \
												 "bmat1 += texture2Dlod(vtex, vec4(1.5 / 4, buv1, 0, 0)) * weight.y;\n" \
												 "bmat2 += texture2Dlod(vtex, vec4(2.5 / 4, buv1, 0, 0)) * weight.y;\n", cfg.vtf ) \
									_BUILD_CODE( "int bidx1 = int(bone.y) * 3;\n" \
												 "bmat0 += bonetrans[bidx1] * weight.y;\n" \
												 "bmat1 += bonetrans[bidx1 + 1] * weight.y;\n" \
												 "bmat2 += bonetrans[bidx1 + 2] * weight.y;\n", !cfg.vtf ) )

#define _VS_SKINNING3_MAIN			_BUILD_SCOPE( cfg.skin >= 3, \
									_BUILD_CODE( "float buv2 = (bone.z + 0.5) / 256;\n" \
												 "bmat0 += texture2Dlod(vtex, vec4(0.5 / 4, buv2, 0, 0)) * weight.z;\n" \
												 "bmat1 += texture2Dlod(vtex, vec4(1.5 / 4, buv2, 0, 0)) * weight.z;\n" \
												 "bmat2 += texture2Dlod(vtex, vec4(2.5 / 4, buv2, 0, 0)) * weight.z;\n", cfg.vtf ) \
									_BUILD_CODE( "int bidx2 = int(bone.z) * 3;\n" \
												 "bmat0 += bonetrans[bidx2] * weight.z;\n" \
												 "bmat1 += bonetrans[bidx2 + 1] * weight.z;\n" \
												 "bmat2 += bonetrans[bidx2 + 2] * weight.z;\n", !cfg.vtf ) )

#define _VS_SKINNING4_MAIN			_BUILD_SCOPE( cfg.skin >= 4, \
									_BUILD_CODE( "float buv3 = (bone.w + 0.5) / 256;\n" \
												 "bmat0 += texture2Dlod(vtex, vec4(0.5 / 4, buv3, 0, 0)) * weight.w;\n" \
												 "bmat1 += texture2Dlod(vtex, vec4(1.5 / 4, buv3, 0, 0)) * weight.w;\n" \
												 "bmat2 += texture2Dlod(vtex, vec4(2.5 / 4, buv3, 0, 0)) * weight.w;\n", cfg.vtf ) \
									_BUILD_CODE( "int bidx3 = int(bone.w) * 3;\n" \
												 "bmat0 += bonetrans[bidx3] * weight.w;\n" \
												 "bmat1 += bonetrans[bidx3 + 1] * weight.w;\n" \
												 "bmat2 += bonetrans[bidx3 + 2] * weight.w;\n", !cfg.vtf ) )

#define _VS_SKINNING_MAIN			_BUILD_CODE( "vec4 srcpos = vec4(position.xyz, 1);\n" \
												 "vec4 iposition;\n" \
												 "iposition.x = dot(srcpos, bmat0);\n" \
												 "iposition.y = dot(srcpos, bmat1);\n" \
												 "iposition.z = dot(srcpos, bmat2);\n" \
												 "iposition.w = position.z;\n", cfg.skin )

#define _VS_SKINNING_NORMAL_MAIN	_BUILD_CODE( "vec4 srcnor = vec4(normal.xyz, 0);\n" \
												 "vec3 inormal;\n" \
												 "inormal.x = dot(srcnor, bmat0);\n" \
												 "inormal.y = dot(srcnor, bmat1);\n" \
												 "inormal.z = dot(srcnor, bmat2);\n", cfg.skin && cfg.nor && cfg.light != 0 )

// Position.
#define _VS_WVP_PARAM				_BUILD_CODE( "uniform mat4 wvp;\n", cfg.wvp )

#define _VS_WORLD_PARAM				_BUILD_CODE( "uniform mat4 w;\n", cfg.w )

#define _VS_CAMERA_PARAM			_BUILD_CODE( "uniform vec4 camera;\n", cfg.camera )

#define _VS_POSITION_PARAM			_BUILD_CODE( "uniform vec4 depthbias;\n", cfg.bias )

#define _VS_POSITION_MAIN			_BUILD_CODE( "oposition = wvp * vec4(position.xyz, 1.0);\n", !cfg.skin ) \
									_BUILD_CODE( "oposition = wvp * vec4(iposition.xyz, 1.0);\n", cfg.skin ) \
									_BUILD_CODE( "oposition.z += depthbias.x * oposition.w;\n", cfg.bias )

// Vertex color.

#define _VS_VCOLOR_INPUT			_BUILD_CODE( "attribute vec4 vcol;\n", cfg.vcol )

#define _PS_VCOLOR_INPUT			_BUILD_CODE( "varying vec4 ovcol;\n", cfg.vcol )

#define _VS_VCOLOR_MAIN				_BUILD_CODE( "ovcol = vcol;\n", cfg.vcol )

#define _PS_VCOLOR_MAIN				_BUILD_CODE( "fdiffuse *= ovcol;\n", cfg.vcol )

// Texcoord.

#define _VS_TEXTURE0_PARAM			_BUILD_CODE( "uniform vec4 texctrans1;\n", cfg.texctrans == 1 ) \
									_BUILD_CODE( "uniform vec4 texctrans2;\n", cfg.texctrans == 1 ) \

#define _VS_TEXCOORD0_INPUT			_BUILD_CODE( "attribute vec2 tex0;\n", cfg.texc0 )

#if defined( _FANCY_OS_ANDROID ) || defined( _FANCY_OS_IOS )

#define _PS_TEXCOORD0_INPUT			_BUILD_SCOPE( cfg.texc0, \
									_BUILD_CODE( "varying vec2 otex0;\n", !cfg.texc2 && !cfg.texcscale ) \
									_BUILD_CODE( "varying highp vec2 otex0;\n", !cfg.texc2 && cfg.texcscale ) \
									_BUILD_CODE( "varying vec4 otex0;\n", cfg.texc2 && !cfg.texcscale ) \
									_BUILD_CODE( "varying highp vec4 otex0;\n", cfg.texc2 && cfg.texcscale ) )

#else

#define _PS_TEXCOORD0_INPUT			_BUILD_SCOPE( cfg.texc0, \
									_BUILD_CODE( "varying vec2 otex0;\n", !cfg.texc2 ) \
									_BUILD_CODE( "varying vec4 otex0;\n", cfg.texc2 ) )

#endif

#define _VS_TEXCOORD0_MAIN			_BUILD_CODE( "otex0.x = dot(texctrans1.xyz, vec3(tex0.xy, 1.0));\n", cfg.texctrans == 1 && cfg.texc0 ) \
									_BUILD_CODE( "otex0.y = dot(texctrans2.xyz, vec3(tex0.xy, 1.0));\n", cfg.texctrans == 1 && cfg.texc0 ) \
									_BUILD_CODE( "otex0.xy = tex0.xy;\n", cfg.texctrans != 1 && cfg.texc0 )

#define _VS_TEXCOORD1_INPUT			_BUILD_CODE( "attribute vec2 tex1;\n", cfg.texc1 )

#define _PS_TEXCOORD1_INPUT			_BUILD_SCOPE( cfg.texc1, \
									_BUILD_CODE( "varying vec2 otex1;\n", !cfg.texc3 ) \
									_BUILD_CODE( "varying vec4 otex1;\n", cfg.texc3 ) )

#define _VS_TEXCOORD1_MAIN			_BUILD_CODE( "otex1.xy = tex1.xy;\n", cfg.texc1 )

#define _VS_TEXCOORD2_INPUT			_BUILD_CODE( "attribute vec2 tex2;\n", cfg.texc2 )

#if defined( _FANCY_OS_ANDROID ) || defined( _FANCY_OS_IOS )

#define _PS_TEXCOORD2_INPUT			_BUILD_CODE( "varying vec4 otex0;\n", !cfg.texc0 && cfg.texc2 && !cfg.texcscale ) \
									_BUILD_CODE( "varying highp vec4 otex0;\n", !cfg.texc0 && cfg.texc2 && cfg.texcscale )

#else

#define _PS_TEXCOORD2_INPUT			_BUILD_CODE( "varying vec4 otex0;\n", !cfg.texc0 && cfg.texc2 )

#endif

									// Use tex0.zw instead of tex2.
#define _VS_TEXCOORD2_MAIN			_BUILD_SCOPE( cfg.texc2, \
									_BUILD_CODE( "otex0 = vec4(0, 0, tex2.xy);\n", !cfg.texc0 ) \
									_BUILD_CODE( "otex0.zw = tex2.xy;\n", cfg.texc0 ) )

#define _VS_TEXCOORD3_INPUT			_BUILD_CODE( "attribute vec2 tex3;\n", cfg.texc3 )

#define _PS_TEXCOORD3_INPUT			_BUILD_CODE( "varying vec4 otex1;\n", !cfg.texc1 && cfg.texc3 )

									// Use tex1.zw instead of tex3.
#define _VS_TEXCOORD3_MAIN			_BUILD_SCOPE( cfg.texc3, \
									_BUILD_CODE( "otex1 = vec4(0, 0, tex3.xy);\n", !cfg.texc1 ) \
									_BUILD_CODE( "otex1.zw = tex3.xy;\n", cfg.texc1 ) )

// Texture.

#define _PS_TEXTURE0_PARAM			_BUILD_CODE( "uniform sampler2D layer0;\n", cfg.tex0 ) \
									_BUILD_CODE( "uniform vec4 texcscale;\n", cfg.texcscale ) \
									_BUILD_CODE( "uniform sampler2D layer8;\n" \
												 "uniform vec4 texctrans1;\n" \
												 "uniform vec4 texctrans2;\n", cfg.texctrans == 2 ) \
									_BUILD_CODE( "uniform vec4 textone0;\n", cfg.textone0 ) \
									_BUILD_CODE( "uniform sampler2D layer4;\n", cfg.alphalayer )

#define _PS_LAYEREDMATERIAL_PARAM	_BUILD_CODE( "uniform sampler2D layer2;\n", cfg.matlayer1 && !cfg.tex2 ) \
									_BUILD_CODE( "uniform vec4 matambient;\n" \
												 "uniform vec4 matdiffuse;\n" \
												 "uniform vec4 matambient1;\n" \
												 "uniform vec4 matdiffuse1;\n" \
												 "uniform vec4 matspe1;\n", cfg.matlayer1 ) \
									_BUILD_CODE( "uniform vec4 matambient2;\n" \
												 "uniform vec4 matdiffuse2;\n" \
												 "uniform vec4 matspe2;\n", cfg.matlayer2 ) \
									_BUILD_CODE( "uniform vec4 matambient3;\n" \
												 "uniform vec4 matdiffuse3;\n" \
												 "uniform vec4 matspe3;\n", cfg.matlayer3 ) \
									_BUILD_CODE( "uniform vec4 matenvtone1;\n", cfg.matlayer1 && cfg.textone1 ) \
									_BUILD_CODE( "uniform vec4 matenvtone2;\n", cfg.matlayer2 && cfg.textone1 ) \
									_BUILD_CODE( "uniform vec4 matenvtone3;\n", cfg.matlayer3 && cfg.textone1 )

#define _PS_LAYEREDMATERIAL_MAIN	_BUILD_CODE( "int layerindex = int(texture2D(layer2, otex0.xy).r * 10.0 + 0.5);\n", cfg.matlayer1 ) \
									_BUILD_CODE( "layerindex = layerindex > 1 ? 0 : layerindex;\n" \
												 "vec4 ambients[2]; ambients[0] = matambient; ambients[1] = matambient1;\n" \
												 "vec4 diffuses[2]; diffuses[0] = matdiffuse; diffuses[1] = matdiffuse1;\n" \
												 "vec4 spes[2]; spes[0] = smaterial; spes[1] = matspe1;\n", cfg.matlayer1 && !cfg.matlayer2 && !cfg.matlayer3 ) \
									_BUILD_CODE( "vec4 envtones[2]; envtones[0] = textone1; envtones[1] = matenvtone1;\n", cfg.textone1 && cfg.matlayer1 && !cfg.matlayer2 && !cfg.matlayer3 ) \
									_BUILD_CODE( "layerindex = layerindex > 2 ? 0 : layerindex;\n" \
												 "vec4 ambients[3]; ambients[0] = matambient; ambients[1] = matambient1; ambients[2] = matambient2;\n" \
												 "vec4 diffuses[3]; diffuses[0] = matdiffuse; diffuses[1] = matdiffuse1; diffuses[2] = matdiffuse2;\n" \
												 "vec4 spes[3]; spes[0] = smaterial; spes[1] = matspe1; spes[2] = matspe2;\n", cfg.matlayer2 && !cfg.matlayer3 ) \
									_BUILD_CODE( "vec4 envtones[3]; envtones[0] = textone1; envtones[1] = matenvtone1; envtones[2] = matenvtone2;\n", cfg.textone1 && cfg.matlayer2 && !cfg.matlayer3 ) \
									_BUILD_CODE( "layerindex = layerindex > 3 ? 0 : layerindex;\n" \
												 "vec4 ambients[4]; ambients[0] = matambient; ambients[1] = matambient1; ambients[2] = matambient2; ambients[3] = matambient3;\n" \
												 "vec4 diffuses[4]; diffuses[0] = matdiffuse; diffuses[1] = matdiffuse1; diffuses[2] = matdiffuse2; diffuses[3] = matdiffuse3;\n" \
												 "vec4 spes[4]; spes[0] = smaterial; spes[1] = matspe1; spes[2] =  matspe2; spes[3] = matspe3;\n", cfg.matlayer3 ) \
									_BUILD_CODE( "vec4 envtones[4]; envtones[0] = textone1; envtones[1] = matenvtone1; envtones[2] = matenvtone2; envtones[3] = matenvtone3;\n", cfg.textone1 && cfg.matlayer3 ) \

#define _PS_ALPHATEST_MAIN			_BUILD_SCOPE( cfg.alphatest, \
									_BUILD_CODE( "float texalpha = texture2D(layer4, otex0.xy).w;\n", cfg.alphalayer == 1 ) \
									_BUILD_CODE( "float texalpha = texture2D(layer4, otex0.xy).r;\n", cfg.alphalayer == 2 ) \
									_BUILD_CODE( "if (texalpha < 0.88)\n", cfg.alphalayer ) \
									_BUILD_CODE( "vec4 tex = texture2D(layer0, otex0.xy);\n", !cfg.alphalayer ) \
									_BUILD_CODE( "if (tex.w < 0.88)\n", !cfg.alphalayer ) \
									_BUILD_CODE( "	discard;\n", 1 ) )

#ifdef _FANCY_OS_ANDROID

#define _PS_TEXTURE0_MAIN			_BUILD_CODE( "vec4 tex;\n", !cfg.alphatest || cfg.alphalayer ) \
									_BUILD_SCOPE( cfg.tex0 && cfg.texc0, \
									_COPY_CODE( "vec2 uv0 = otex0.xy;\n" ) \
									_BUILD_CODE( "vec2 uv = vec2(dot(texctrans1.xyz, vec3(otex0.xy, 1.0)), dot(texctrans2.xyz, vec3(otex0.xy, 1.0)));\n" \
												 "float duv = texture2D(layer8, uv).r * texctrans1.w;\n" \
												 "uv0 = otex0.xy + vec2(duv, duv);\n", cfg.texctrans == 2 ) \
									_BUILD_CODE( "tex = texture2D(layer0, uv0);\n", !cfg.alphatest || cfg.alphalayer ) \
									_BUILD_CODE( "tex.a = texture2D(layer4, uv0).r;\n", cfg.alphalayer == 2 ) \
									_BUILD_CODE( "tex.a = texture2D(layer4, otex0.xy).a;\n", cfg.alphalayer == 1 ) \
									_BUILD_CODE( "if(tex.a != 0.0)\n" \
												 "	tex.rgb *= pow(2.0, tex.w * 255.0 - 136.0 ) * 255.0;\n" \
												 "else"\
												 "	tex.rgb = vec3(0.0, 0.0, 0.0);\n" \
												 "tex.rgb = pow(tex.rgb, vec3(0.454, 0.454, 0.454));\n" \
												 "tex.w = 1.0;\n", cfg.hdrtex ) \
									_BUILD_CODE( "tex.rgb = max(pow(tex.xyz, textone0.xxx) * textone0.y + textone0.z, 0.0);\n", cfg.textone0 ) \
									_BUILD_CODE( "fdiffuse *= tex;\n", cfg.alpha ) \
									_BUILD_CODE( "fdiffuse.xyz *= tex.xyz;\n", !cfg.alpha ) )

#else

#define _PS_TEXTURE0_MAIN			_BUILD_CODE( "vec4 tex;\n", !cfg.alphatest || cfg.alphalayer ) \
									_BUILD_SCOPE( cfg.tex0 && cfg.texc0, \
									_COPY_CODE( "vec2 uv0 = otex0.xy;\n" ) \
									_BUILD_CODE( "vec2 uv = vec2(dot(texctrans1.xyz, vec3(otex0.xy, 1.0)), dot(texctrans2.xyz, vec3(otex0.xy, 1.0)));\n" \
												 "float duv = texture2D(layer8, uv).r * texctrans1.w;\n" \
												 "uv0 = otex0.xy + vec2(duv, duv);\n", cfg.texctrans == 2 ) \
									_BUILD_CODE( "tex = texture2D(layer0, uv0);\n", !cfg.texcscale && ( !cfg.alphatest || cfg.alphalayer ) ) \
									_BUILD_CODE( "tex = texture2D(layer0, uv0 * texcscale.x);\n", cfg.texcscale && ( !cfg.alphatest || cfg.alphalayer ) ) \
									_BUILD_CODE( "tex.a = texture2D(layer4, otex0.xy).a;\n", cfg.alphalayer ) \
									_BUILD_CODE( "if(tex.a != 0.0)\n" \
												 "	tex.rgb *= pow(2.0, tex.w * 255.0 - 136.0 ) * 255.0;\n" \
												 "else\n"\
												 "	tex.rgb = vec3(0.0, 0.0, 0.0);\n" \
												 "tex.rgb = pow(tex.rgb, vec3(0.454, 0.454, 0.454));\n" \
												 "tex.w = 1.0;\n", cfg.hdrtex ) \
									_BUILD_CODE( "tex.rgb = max(pow(tex.xyz, textone0.xxx) * textone0.y + textone0.z, 0.0);\n", cfg.textone0 ) \
									_BUILD_CODE( "fdiffuse *= tex;\n", cfg.alpha ) \
									_BUILD_CODE( "fdiffuse.xyz *= tex.xyz;\n", !cfg.alpha ) )

#endif

#define _PS_TEXTURE1_PARAM			_BUILD_CODE( "uniform sampler2D layer1;\n", cfg.tex1 && ( !cfg.envcube || cfg.dissolve ) ) \
									_BUILD_CODE( "uniform samplerCube layer1;\n", cfg.tex1 && cfg.envcube && !cfg.dissolve )

#define _PS_TEXTURE1_MAIN			_BUILD_SCOPE( cfg.tex1 && ( cfg.texc0 || cfg.texc1 || cfg.envmap ), \
									_BUILD_SCOPE( !cfg.dissolve && cfg.envmap, \
									_ENVIRONMENT_MAP \
									_BUILD_CODE( "tex.xyz = mix(vec3(1, 1, 1), tex.xyz, texture2D(layer6, otex0.xy).xyz);\n", ( cfg.envmap & 0x02 ) && cfg.spem ) \
									_BUILD_CODE( "tex.xyz = mix(vec3(1, 1, 1), tex.xyz, texture2D(layer6, otex0.xy).a);\n", ( cfg.envmap & 0x01 ) && cfg.spem ) ) \
									_BUILD_CODE( "tex = texture2D(layer1, otex0.xy);\n", ( cfg.dissolve || !cfg.envmap ) && !cfg.texc1 ) \
									_BUILD_CODE( "tex = texture2D(layer1, otex1.xy);\n", ( cfg.dissolve || !cfg.envmap ) && cfg.texc1 ) \
									_BUILD_CODE( "if (tex.x < dissolvefactor.x)\n" \
												 "	discard;\n" \
												 "else if (tex.x < dissolvefactor.y)\n" \
												 "	fdiffuse.xyz *= dissolvecolor2.xyz * ((tex.x-dissolvefactor.x)/dissolvecolor2.w);\n" \
												 "else if (tex.x < dissolvefactor.z)\n" \
												 "	fdiffuse.xyz = mix(dissolvecolor2.xyz, dissolvecolor1.xyz, (tex.x-dissolvefactor.y)/dissolvecolor1.w);\n", cfg.dissolve ) \
									_BUILD_CODE( "fdiffuse *= tex;\n", !cfg.dissolve ) )

#define _PS_TEXTUREBLEND1_MAIN		_BUILD_SCOPE( cfg.tex1 && ( cfg.texc0 || cfg.texc1 || cfg.envmap ), \
									_BUILD_SCOPE( !cfg.dissolve && cfg.envmap, \
									_ENVIRONMENT_MAP \
									_BUILD_CODE( "tex.xyz = mix(vec3(1, 1, 1), tex.xyz, texture2D(layer6, otex0.xy).xyz);\n", ( cfg.envmap & 0x02 ) && cfg.spem ) \
									_BUILD_CODE( "tex.xyz = mix(vec3(1, 1, 1), tex.xyz, texture2D(layer6, otex0.xy).a);\n", ( cfg.envmap & 0x01 ) && cfg.spem ) ) \
									_BUILD_CODE( "tex = texture2D(layer1, otex0.xy);\n", ( cfg.dissolve || !cfg.envmap ) && !cfg.texc1 ) \
									_BUILD_CODE( "tex = texture2D(layer1, otex1.xy);\n", ( cfg.dissolve || !cfg.envmap ) && cfg.texc1 ) \
									_BUILD_CODE( "if (tex.x < dissolvefactor.x)\n" \
												 "	discard;\n" \
												 "else if (tex.x < dissolvefactor.y)\n" \
												 "	fdiffuse.xyz = mix(fdiffuse.xyz, dissolvecolor2.xyz, tex.w);\n" \
												 "else if (tex.x < dissolvefactor.z)\n" \
												 "	fdiffuse.xyz = mix(fdiffuse.xyz, dissolvecolor1.xyz, tex.w);\n", cfg.dissolve ) \
									_BUILD_CODE( "fdiffuse.xyz = mix(fdiffuse.xyz, tex.xyz, tex.w);\n", !cfg.dissolve ) )

#define _PS_TEXTUREPAINT1_MAIN		_BUILD_SCOPE( cfg.tex1 && ( cfg.texc0 || cfg.texc1 || cfg.envmap ), \
									_BUILD_SCOPE( !cfg.dissolve && cfg.envmap, \
									_ENVIRONMENT_MAP \
									_BUILD_CODE( "tex.xyz *= texture2D(layer6, otex0.xy).xyz;\n", ( cfg.envmap & 0x02 ) && cfg.spem ) \
									_BUILD_CODE( "tex.xyz *= texture2D(layer6, otex0.xy).a;\n", ( cfg.envmap & 0x01 ) && cfg.spem ) ) \
									_BUILD_CODE( "tex = texture2D(layer1, otex0.xy);\n", ( cfg.dissolve || !cfg.envmap ) ) \
									_BUILD_CODE( "if (tex.x < dissolvefactor.x)\n" \
												 "	discard;\n" \
												 "else if (tex.x < dissolvefactor.y)\n" \
												"	fdiffuse.xyz *= dissolvecolor2.xyz * ((tex.x-dissolvefactor.x)/dissolvecolor2.w);\n" \
												 "else if (tex.x < dissolvefactor.z)\n" \
												 "	fdiffuse.xyz *= mix(dissolvecolor2.xyz, dissolvecolor1.xyz, (tex.x-dissolvefactor.y)/dissolvecolor1.w);\n", cfg.dissolve ) \
									_BUILD_CODE( "fdiffuse.xyz += tex.xyz * paint.w;\n", !cfg.dissolve ) )

#define _PS_TEXTURE2_PARAM			_BUILD_CODE( "uniform sampler2D layer2;\n", cfg.tex2 )

#define _PS_TEXTURE2_MAIN			_BUILD_SCOPE( cfg.tex2 && !cfg.matlayer1 && ( cfg.texc0 || cfg.texc2 ), \
									_BUILD_CODE( "tex = texture2D(layer2, otex0.xy);\n", !cfg.texc2 ) \
									_BUILD_CODE( "tex = texture2D(layer2, otex0.zw);\n", cfg.texc2 ) \
									_BUILD_CODE( "fdiffuse *= tex;\n", 1 ) )

#define _PS_TEXTUREBLEND2_MAIN		_BUILD_SCOPE( cfg.tex2 && !cfg.matlayer1 && ( cfg.texc0 || cfg.texc2 ), \
									_BUILD_CODE( "tex = texture2D(layer2, otex0.xy);\n", !cfg.texc2 ) \
									_BUILD_CODE( "tex = texture2D(layer2, otex0.zw);\n", cfg.texc2 ) \
									_BUILD_CODE( "fdiffuse.xyz = mix(fdiffuse.xyz, tex.xyz, tex.w);\n", 1 ) )

#define _PS_TEXTUREPAINT2_MAIN		_BUILD_SCOPE( cfg.texc2 && !cfg.matlayer1 && ( cfg.texc0 || cfg.texc2 ), \
									_BUILD_CODE( "tex = texture2D(layer2, otex0.xy);\n", !cfg.texc2 ) \
									_BUILD_CODE( "tex = texture2D(layer2, otex0.zw);\n", cfg.texc2 ) \
									_BUILD_CODE( "fdiffuse.xyz += tex.xyz * paint.w;\n", 1 ) )

#define _PS_TEXTURE3_PARAM			_BUILD_CODE( "uniform sampler2D layer3;\n", cfg.tex3 )

#define _PS_TEXTURE3_MAIN			_BUILD_SCOPE( cfg.tex3 && !cfg.emim && ( cfg.texc0 || cfg.texc3 ), \
									_BUILD_CODE( "tex = texture2D(layer3, otex0.xy);\n", !cfg.texc2 ) \
									_BUILD_CODE( "tex = texture2D(layer3, otex1.zw);\n", cfg.texc2 ) \
									_BUILD_CODE( "fdiffuse *= tex;\n", 1 ) )

#define _PS_TEXTUREBLEND3_MAIN		_BUILD_SCOPE( cfg.tex3 && !cfg.emim && ( cfg.texc0 || cfg.texc3 ), \
									_BUILD_CODE( "tex = texture2D(layer3, otex0.xy);\n", !cfg.texc2 ) \
									_BUILD_CODE( "tex = texture2D(layer3, otex1.zw);\n", cfg.texc2 ) \
									_BUILD_CODE( "fdiffuse.xyz = mix(fdiffuse.xyz, tex.xyz, tex.w);\n", 1 ) )

#define _PS_TEXTUREPAINT3_MAIN		_BUILD_SCOPE( cfg.texc2 && !cfg.emim && ( cfg.texc0 || cfg.texc2 ), \
									_BUILD_CODE( "tex = texture2D(layer3, otex0.xy);\n", !cfg.texc2 ) \
									_BUILD_CODE( "tex = texture2D(layer3, otex1.zw);\n", cfg.texc2 ) \
									_BUILD_CODE( "fdiffuse.xyz += tex.xyz * paint.w;\n", 1 ) )

// Cube texcoord.

#define _PS_CUBETEXCOORD0_INPUT		_BUILD_CODE( "varying vec3 otex0;\n", cfg.ctexc0 )

#define _VS_CUBETEXCOORD0_MAIN		_BUILD_CODE( "otex0 = position.xyz;\n", cfg.ctexc0 )

// Cube texture.

#define _PS_CUBETEXTURE0_PARAM		_BUILD_CODE( "uniform samplerCube layer0;\n", cfg.ctex0 )

#define _PS_CUBETEXTURE0_MAIN		_BUILD_CODE( "vec4 tex;\n", 1 ) \
									_BUILD_SCOPE( cfg.ctex0, \
									_BUILD_CODE( "tex = textureCube(layer0, otex0);\n", 1 ) \
									_BUILD_CODE( "fdiffuse *= tex;\n", cfg.alpha ) \
									_BUILD_CODE( "fdiffuse.xyz *= tex.xyz;\n", !cfg.alpha ) )

#define _PS_CUBETEXTURE1_PARAM		_BUILD_CODE( "uniform samplerCube layer1;\n", cfg.ctex1 )

#define _PS_CUBETEXTURE1_MAIN		_BUILD_CODE( "tex = textureCube(layer1, otex0);\n" \
												 "fdiffuse.xyz = mix(fdiffuse.xyz, tex.xyz, tex.w);\n", cfg.ctex1 )

#define _PS_CUBETEXTURE2_PARAM		_BUILD_CODE( "uniform samplerCube layer2;\n", cfg.ctex2 )

#define _PS_CUBETEXTURE2_MAIN		_BUILD_CODE( "tex = textureCube(layer2, otex0);\n" \
		 										 "fdiffuse.xyz = mix(fdiffuse.xyz, tex.xyz, tex.w);\n", cfg.ctex2 )

#define _PS_CUBETEXTURE3_PARAM		_BUILD_CODE( "uniform samplerCube layer3;\n", cfg.ctex3 )

#define _PS_CUBETEXTURE3_MAIN		_BUILD_CODE( "tex = textureCube(layer3, otex0);\n" \
												 "fdiffuse.xyz = mix(fdiffuse.xyz, tex.xyz, tex.w);\n", cfg.ctex3 )

// Texture paint.

#define _PS_PAINT_PARAM				_BUILD_CODE( "uniform vec4 paint;\n", cfg.paint || cfg.texpaint )

#define _PS_PAINT_MAIN				_BUILD_CODE( "fdiffuse.xyz *= paint.xyz;\n", cfg.paint == 1 ) \
									_BUILD_CODE( "fdiffuse.xyz *= mix(vec3(1, 1, 1), paint.xyz, tex.w);\n", cfg.paint == 2 ) \
									_BUILD_CODE( "fdiffuse.xyz *= mix(paint.xyz, vec3(1, 1, 1), tex.w);\n", cfg.paint == 3 )

// Environment Map.

#define _PS_ENVIRONMENT_PARAM		_BUILD_CODE( "uniform vec4 envoffset;\n", cfg.envoffset ) \
									_BUILD_CODE( "uniform vec4 textone1;\n", cfg.textone1 )

// Dissolve.
#define _PS_DISSOLVE_PARAM			_BUILD_CODE( "uniform vec4 dissolvefactor;\n" \
												 "uniform vec4 dissolvecolor1;\n" \
												 "uniform vec4 dissolvecolor2;\n", cfg.dissolve )

// Position.

#define _PS_POS_INPUT				_BUILD_CODE( "varying vec4 opos;\n", cfg.pos )

#define _VS_POS_MAIN				_BUILD_CODE( "opos = w * vec4(position.xyz, 1.0);\n", cfg.pos && !cfg.skin ) \
									_BUILD_CODE( "opos = w * vec4(iposition.xyz, 1.0);\n", cfg.pos && cfg.skin )

#define _VS_POS_BILLBOARD_MAIN		_BUILD_CODE( "opos = position;\n", cfg.pos )

// Light map, TODO, combine with texture blend.

#define _PS_LIGHTMAP_PARAM			_BUILD_CODE( "uniform sampler2D layer7;\n", cfg.lightmap ) \
									_BUILD_CODE( "uniform vec4 lmapparam;\n", cfg.lightmap && cfg.lmapparam )

#define _PS_LIGHTMAP_MAIN			_BUILD_SCOPE( cfg.lightmap, \
									_BUILD_CODE( "fdiffuse.xyz = 10.0 * texture2D(layer7, otex1.xy).xyz;\n", cfg.light == 0 && !cfg.lmapparam ) \
									_BUILD_CODE( "fdiffuse.xyz = 10.0 * texture2D(layer7, lmapparam.zw * otex1.xy + lmapparam.xy ).xyz;\n", cfg.light == 0 && cfg.lmapparam ) \
									_BUILD_CODE( "diflight += 10.0 * texture2D(layer7, otex1.xy).xyz;\n", cfg.light != 0 && cfg.lightmap == 1 && !cfg.lmapparam ) \
									_BUILD_CODE( "diflight += 10.0 * texture2D(layer7, lmapparam.zw * otex1.xy + lmapparam.xy).xyz;\n", cfg.light != 0 && cfg.lightmap == 1 && cfg.lmapparam) \
									_BUILD_CODE( "diflight = 10.0 * texture2D(layer7, otex1.xy).xyz;\n", cfg.light != 0 && cfg.lightmap == 2 && !cfg.lmapparam ) \
									_BUILD_CODE( "diflight = 10.0 * texture2D(layer7, lmapparam.zw * otex1.xy + lmapparam.xy).xyz;\n", cfg.light != 0 && cfg.lightmap == 2 && cfg.lmapparam ) )

// Shadow map.

#define _PS_SHADOWMAP_ARG			_BUILD_CODE( "uniform vec4 smaparg;\n", cfg.shadowmap ) \
									_BUILD_CODE( "uniform vec4 smapscale;\n" \
												 "uniform vec4 smapoffset;\n", cfg.shadowmap == 1 ) \
									_BUILD_CODE( "uniform mat4 smapscale;\n" \
												 "uniform mat4 smapoffset;\n", cfg.shadowmap > 1 ) \
									_BUILD_CODE( "uniform sampler2D layer12;\n", cfg.shadowmap )

#define _PS_SHADOWMAP_INPUT			_BUILD_CODE( "varying vec4 olightpos;\n", cfg.shadowmap )

#define _VS_SHADOWMAP_MAIN			_BUILD_CODE( "olightpos = lightwvp * position;\n", cfg.shadowmap )

// TODO, do shadow only when it in light ( light diffuse color is not zero ).

#define _PS_SHADOWMAP_MAIN			_BUILD_CODE( "vec4 smaptexc; int texindex = 0, texfound = 0, texcount = int(smaparg.w);\n" \
												 "smaptexc = olightpos * smapscale + smapoffset;\n" \
												 "if (min(smaptexc.x, smaptexc.y) > smaparg.y && max(smaptexc.x, smaptexc.y) < smaparg.z)" \
												 "	texfound = 1;\n",  cfg.shadowmap == 1 ) \
									_BUILD_CODE( "vec4 smaptexc; int texindex = 0, texfound = 0, texcount = int(smaparg.w);\n" \
												 "for (int ci = 0; ci < texcount && texfound == 0; ci ++)\n" \
												 "{\n" \
												 "	smaptexc = olightpos * smapscale[ci] + smapoffset[ci];\n" \
												 "	if (min(smaptexc.x, smaptexc.y) > smaparg.y && max(smaptexc.x, smaptexc.y) < smaparg.z)\n" \
												 "	{\n" \
												 "		texfound = 1;\n" \
												 "		texindex = ci;\n" \
												 "	}\n" \
												 "}\n", cfg.shadowmap > 1 ) \
									_BUILD_CODE( "float litprecent = 1.0;\n"\
												 "if (texfound == 1){\n" \
												 "	smaptexc.x = smaptexc.x / float(texcount) + float(texindex) / float(texcount);\n" \
												 "	float depthpos = smaptexc.z - 0.002;\n" \
												 "	vec2 mixs = fract(smaptexc.xy / smaparg.xy);\n" \
												 "	float lines[3];\n" \
												 "	lines[0] = -smaparg.y;\n" \
												 "	lines[1] = 0.0;\n" \
												 "	lines[2] = smaparg.y;\n" \
												 "	const vec4 bitshifts = vec4(1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);\n" \
												 "	for (int y = 0; y < 3; y ++)\n" \
												 "	{\n" \
												 "		float x0 = dot(texture2D(layer12, smaptexc.xy + vec2(-smaparg.x, lines[y])), bitshifts) < depthpos ? 0.0 : 1.0;\n" \
												 "		float x1 = dot(texture2D(layer12, smaptexc.xy + vec2(0.0, lines[y])), bitshifts) < depthpos ? 0.0 : 1.0;\n" \
												 "		float x2 = dot(texture2D(layer12, smaptexc.xy + vec2(smaparg.x, lines[y])), bitshifts) < depthpos ? 0.0 : 1.0;\n" \
												 "		lines[y] = mix(x0, x2, mixs.x) + x1;\n" \
												 "	}\n" \
												 "	litprecent = (mix(lines[0], lines[2], mixs.y) + lines[1]) * 0.25;\n" \
												 "}\n", cfg.shadowmap )

												 //"half lines[4];\n" \
												 //"lines[0] = -smaparg.y;\n" \
												 //"lines[1] = 0.0;\n" \
												 //"lines[2] = smaparg.y;\n" \
												 //"lines[3] = smaparg.y * 2.0;\n" \
												 //"for (int y = 0; y < 4; y ++)\n" \
												 //"{\n" \
												 //"	half x0 = texture2D(smap, smaptexc.xy + half2(-smaparg.x, lines[y])).r < depthpos ? 0.0 : 1.0;\n" \
												 //"	half x1 = texture2D(smap, smaptexc.xy + half2(0.0, lines[y])).r < depthpos ? 0.0 : 1.0;\n" \
												 //"	half x2 = texture2D(smap, smaptexc.xy + half2(smaparg.x, lines[y])).r < depthpos ? 0.0 : 1.0;\n" \
												 //"	half x3 = texture2D(smap, smaptexc.xy + half2(smaparg.x * 2.0, lines[y])).r < depthpos ? 0.0 : 1.0;\n" \
												 //"	lines[y] = mix(x0, x3, mixs.x) + x1 + x2;\n" \
												 //"}\n" \
												 //"half litprecent = (mix(lines[0], lines[3], mixs.y) + lines[1] + lines[2]) / 9.0;\n", cfg.shadowmap )

												 //"float sdepth0 = texture2D(smap, smaptexc.xy).r < depthpos ? 0 : 1;\n" \
												 //"float sdepth1 = texture2D(smap, smaptexc.xy + vec2(smaparg.x, 0)).r < depthpos ? 0 : 1;\n" \
												 //"float sdepth2 = texture2D(smap, smaptexc.xy + vec2(0, smaparg.y)).r < depthpos ? 0 : 1;\n" \
												 //"float sdepth3 = texture2D(smap, smaptexc.xy + vec2(smaparg.x, smaparg.y)).r < depthpos ? 0 : 1;\n" \
												 //"float litprecent = mix(mix(sdepth0, sdepth1, mixs.x), mix(sdepth2, sdepth3, mixs.x), mixs.y);\n", cfg.shadowmap )

// Shadow map build.

#define _PS_SHADOWBUILD_ARG			_BUILD_CODE( "uniform vec4 smaparg;\n" \
												 "uniform vec4 smapscale[4];\n" \
												 "uniform vec4 smapoffset[4];\n" \
												 "uniform mat4 lightwvp;\n" \
												 "uniform sampler2D layer7;\n", cfg.shadowmap && cfg.shadowbuild )

#define _PS_SHADOWBUILD_MAIN		_BUILD_CODE( "vec4 smaptexc; int texindex = 0, texfound = 0, texcount = (int) smaparg.w;\n" \
												 "vec3 smpp = texture2D(layer0, otex0.xy).xyz;\n" \
												 "vec4 smpp2 = lightwvp * vec4(pp, 1);\n" \
												 "for (int ci = 0; ci < texcount && texfound == 0; ci ++)\n" \
												 "{\n" \
												 "	smaptexc = smpp2 * smapscale[ci] + smapoffset[ci];\n" \
												 "	if (min(smaptexc.x, smaptexc.y) > smaparg.y && max(smaptexc.x, smaptexc.y) < smaparg.z)\n" \
												 "	{\n" \
												 "		texfound = 1;\n" \
												 "		texindex = ci;\n" \
												 "	}\n" \
												 "}\n" \
												 "smaptexc.x = smaptexc.x / (float) texcount + (float) texindex / (float) texcount;\n" \
												 "float depthpos = smaptexc.z - 0.005;\n" \
												 "vec2 mixs = frac(smaptexc.xy / smaparg.xy);\n" \
												 "float lines[4];\n" \
												 "lines[0] = -smaparg.y;\n" \
												 "lines[1] = 0.0;\n" \
												 "lines[2] = smaparg.y;\n" \
												 "lines[3] = smaparg.y * 2.0;\n" \
												 "for (int y = 0; y < 4; y ++)\n" \
												 "{\n" \
												 "	float x0 = texture2D(layer7, smaptexc.xy + vec2(-smaparg.x, lines[y])).r < depthpos ? 0.0 : 1.0;\n" \
												 "	float x1 = texture2D(layer7, smaptexc.xy + vec2(0.0, lines[y])).r < depthpos ? 0.0 : 1.0;\n" \
												 "	float x2 = texture2D(layer7, smaptexc.xy + vec2(smaparg.x, lines[y])).r < depthpos ? 0.0 : 1.0;\n" \
												 "	float x3 = texture2D(layer7, smaptexc.xy + vec2(smaparg.x * 2.0, lines[y])).r < depthpos ? 0.0 : 1.0;\n" \
												 "	lines[y] = mix(x0, x3, mixs.x) + x1 + x2;\n" \
												 "}\n" \
												 "float litprecent = (mix(lines[0], lines[3], mixs.y) + lines[1] + lines[2]) / 9.0;\n", cfg.shadowbuild && cfg.shadowmap )

// Gray & fade.

#define _PS_GRAY_PARAM				_BUILD_CODE( "uniform vec4 grayfactor;\n", cfg.gray )

#define _PS_GRAY_MAIN				_BUILD_CODE( "float tempgf = dot(vec3(0.3, 0.59, 0.11), fdiffuse.xyz);\n" \
												 "fdiffuse.xyz = mix(fdiffuse.xyz, vec3(tempgf,tempgf,tempgf), grayfactor.w);\n", cfg.gray == 1 )

#define _PS_FADE_MAIN				_BUILD_CODE( "fdiffuse.xyz = mix(fdiffuse.xyz, grayfactor.xyz, grayfactor.w);\n", cfg.gray == 2 )

// Blend.

#define _PS_BLEND_PARAM				_BUILD_CODE( "uniform vec4 blend;\n", cfg.blend )

#define _PS_BLEND_MAIN				_BUILD_CODE( "fdiffuse *= blend;\n", cfg.blend )

// Highlight.

#define _PS_HIGHLIGHT_PARAM			_BUILD_CODE( "uniform vec4 highlight;\n", cfg.highlight )

#define _PS_HIGHLIGHT_MAIN			_BUILD_CODE( "fdiffuse += highlight;\n", cfg.highlight )

// Clipz.

#define _PS_CLIPZ_PARAM				_BUILD_CODE( "uniform vec4 clipz;\n", cfg.clipz )

#define _PS_CLIPZ_MAIN				_BUILD_CODE( "if (opos.z > clipz.x) discard;\n", cfg.clipz == 1 ) \
									_BUILD_CODE( "if (opos.z < clipz.x) discard;\n", cfg.clipz == 2 )

// Fadez.

#define _PS_FADEZ_PARAM				_BUILD_CODE( "uniform vec4 fadezrange;\n" \
												 "uniform vec4 fadezcolor;\n", cfg.fadez )

#define _PS_FADEZ_MAIN				_BUILD_CODE( "fdiffuse.xyz = mix(fdiffuse.xyz, fadezcolor.xyz, clamp((opos.z - fadezrange.x) / fadezrange.y, 0.0, 1.0));\n", cfg.fadez ) \
									_BUILD_CODE( "fdiffuse.a = clamp((opos.z - fadezrange.x) / fadezrange.z, 0.0, 1.0);\n", cfg.fadez )

// Fog.

#define _VS_FOG_PARAM				_BUILD_CODE( "uniform vec4 fogparam;\n", cfg.fog != 0 )

#define _PS_FOG_PARAM				_BUILD_CODE( "uniform vec4 fogcolor;\n", cfg.fog & 0x01 ) \
									_BUILD_CODE( "uniform vec4 hfogcolor;\n", cfg.fog & 0x02 )

#define _PS_FOG_INPUT				_BUILD_CODE( "varying vec2 fogfactor;\n", cfg.fog != 0 )

#define _VS_FOG_MAIN				_BUILD_CODE( "vec4 fpos = w * vec4(position.xyz, 1.0);\n", cfg.fog != 0 && !cfg.pos && !cfg.skin ) \
									_BUILD_CODE( "vec4 fpos = w * vec4(iposition.xyz, 1.0);\n", cfg.fog != 0 && !cfg.pos && cfg.skin ) \
									_BUILD_CODE( "vec4 fpos = opos;\n", cfg.fog != 0 && cfg.pos ) \
									_BUILD_CODE( "fogfactor.x = clamp((length(camera.xyz - fpos.xyz) - fogparam.x) / fogparam.y, 0.0, 1.0);\n", cfg.fog & 0x01 ) \
									_BUILD_CODE( "fogfactor.x = 0.0;\n", cfg.fog == 2 ) \
									_BUILD_CODE( "fogfactor.y = clamp((fpos.z - fogparam.z) / fogparam.w, 0.0, 1.0);\n", cfg.fog & 0x02 ) \
									_BUILD_CODE( "fogfactor.y = 0.0;\n", cfg.fog == 1 )

#define _PS_FOG_MAIN				_BUILD_CODE( "fdiffuse.xyz = mix(fdiffuse.xyz, fogcolor.xyz, fogfactor.x);\n", cfg.fog & 0x01 ) \
									_BUILD_CODE( "fdiffuse.xyz = mix(fdiffuse.xyz, hfogcolor.xyz, fogfactor.y);\n", cfg.fog & 0x02 )


// Lighting, PixelColor = ( Ambient + Light( With Factor ) + Specular ) * Vertex * Texture.

#define _VS_LIGHT_INPUT				_BUILD_CODE( "attribute vec3 diffuse;\n", cfg.vlit ) \
									_BUILD_CODE( "attribute vec3 normal;\n", cfg.nor ) \
									_BUILD_CODE( "attribute vec3 binormal;\n", cfg.binor ) \
									_BUILD_CODE( "attribute vec3 tangent;\n", cfg.tan )

#define _VS_LIGHT1_PARAM			_BUILD_SCOPE( cfg.light == 1, \
									_BUILD_CODE( "uniform vec4 smaterial;\n", cfg.spe ) \
									_BUILD_CODE( "uniform vec4 ematerial;\n", cfg.emi ) \
									_BUILD_CODE( "uniform vec4 skyspefactor;\n", cfg.sspef && ( cfg.spe || cfg.helpspe ) ) \
									_BUILD_CODE( "uniform vec4 pointspefactor;\n", cfg.pspef && ( cfg.spe || cfg.helpspe ) ) \
									_BUILD_CODE( "uniform vec4 skyfogfactor;\n", cfg.sfogf && cfg.flit ) \
									_BUILD_CODE( "uniform vec4 pointfogfactor;\n", cfg.pfogf && cfg.flit ) )

#define _PS_LIGHT1_PARAM			_BUILD_SCOPE( cfg.light == 1, \
									_BUILD_CODE( "uniform sampler2D layer6;\n", cfg.spem ) )

#define _PS_LIGHT1_INPUT			_BUILD_SCOPE( cfg.light == 1, \
									_BUILD_CODE( "varying vec4 odiffuse;\n", 1 ) \
									_BUILD_CODE( "varying vec3 ospe;\n", cfg.spe ) \
									_BUILD_CODE( "varying vec3 opdiffuse;\n", cfg.shadowplit ) )

#define _VS_LIGHT1_MAIN				_BUILD_SCOPE( cfg.light == 1, \
									_BUILD_CODE( "odiffuse = vec4(0, 0, 0, 0);\n", 1 ) \
									_BUILD_CODE( "ospe = vec3(0, 0, 0);\n", cfg.spe ) \
									_BUILD_CODE( "opdiffuse = vec3(0, 0, 0);\n", cfg.shadowplit ) \
									_BUILD_CODE( "vec3 diflight = diffuse;\n", cfg.vlit ) \
									_BUILD_CODE( "vec3 diflight = vec3(0, 0, 0);\n", !cfg.vlit ) \
									_BUILD_CODE( "vec3 plight = vec3(0, 0, 0);\n", cfg.plit1 ) \
									_BUILD_CODE( "vec3 difspe = vec3(0, 0, 0);\n" \
												 "float shine = smaterial.w;\n", cfg.spe) \
									_BUILD_CODE( "vec4 foglight = vec4(0, 0, 0, 0);\n", cfg.flit ) \
									_BUILD_CODE( "float pp;\nvec3 n = normalize(w * vec4(normal, 0.0)).xyz;\n", cfg.nor && !cfg.skin ) \
									_BUILD_CODE( "float pp;\nvec3 n = normalize(w * vec4(inormal, 0.0)).xyz;\n", cfg.nor && cfg.skin ) \
									_BUILD_CODE( "vec3 pd;\nvec3 pdn;\nvec3 p = opos.xyz;\n", cfg.nor && cfg.pos ) \
									_BUILD_CODE( "vec3 ph;\nvec3 cp = normalize(camera.xyz - p);\n", cfg.nor && cfg.pos && cfg.spe ) )

#define _PS_LIGHT1_MAIN				_BUILD_SCOPE( cfg.light == 1, \
									_BUILD_CODE( "vec3 diflight = odiffuse.xyz;\n", 1 ) \
									_BUILD_CODE( "float dambient = odiffuse.w;\n", cfg.dambient ) \
									_BUILD_CODE( "vec3 difspe = ospe;\n", cfg.spe ) \
									_BUILD_CODE( "vec4 foglight = ovfog;\n", cfg.flit ) )

#define _PS_LIGHT2_PARAM			_BUILD_CODE( "uniform vec4 ambient;\n", cfg.ambient ) \
									_BUILD_CODE( "uniform vec4 sambient;\n", cfg.sambient ) \
									_BUILD_SCOPE( cfg.light == 2, \
									_PS_CAMERA_PARAM \
									_BUILD_CODE( "uniform vec4 smaterial;\n", cfg.spe || cfg.helpspe ) \
									_BUILD_CODE( "uniform vec4 ematerial;\n", cfg.emi ) \
									_BUILD_CODE( "uniform vec4 skyspefactor;\n", cfg.sspef && ( cfg.spe || cfg.helpspe ) ) \
									_BUILD_CODE( "uniform vec4 pointspefactor;\n", cfg.pspef && ( cfg.spe || cfg.helpspe ) ) \
									_BUILD_CODE( "uniform vec4 skyfogfactor;\n", cfg.sfogf && cfg.flit ) \
									_BUILD_CODE( "uniform vec4 pointfogfactor;\n", cfg.pfogf && cfg.flit ) \
									_BUILD_CODE( "uniform vec4 toonstep;\n", cfg.toonlight ) \
									_BUILD_CODE( "uniform vec4 tooncolor;\n", cfg.toonedge ) \
									_BUILD_CODE( "uniform sampler2D layer5;\n", cfg.norm ) \
									_BUILD_CODE( "uniform sampler2D layer6;\n", cfg.spem ) ) \
									_BUILD_CODE( "uniform sampler2D layer8;\n", !cfg.alphalayer && ( cfg.helpnor || cfg.helpspe ) )

#define _PS_NORMALMAP_PARAM			_BUILD_CODE( "uniform sampler2D layer5;\n", cfg.norm ) \
									_BUILD_CODE( "uniform sampler2D layer8;", !cfg.alphalayer && ( cfg.helpnor || cfg.helpspe ) )

#define _PS_SPECULARMAP_PARAM		_BUILD_CODE( "uniform vec4 ambient;\n", cfg.ambient ) \
									_BUILD_CODE( "uniform vec4 smaterial;\n", cfg.spe ) \
									_BUILD_CODE( "uniform sampler2D layer6;\n", cfg.spem )

#define _VS_NORMAL_INPUT			_BUILD_CODE( "attribute vec3 normal;\n", cfg.nor ) \
									_BUILD_CODE( "attribute vec3 binormal;\n", cfg.binor ) \
									_BUILD_CODE( "attribute vec3 tangent;\n", cfg.tan )

#define _PS_NORMAL_INPUT			_BUILD_CODE( "varying vec3 onormal;\n", cfg.nor ) \
									_BUILD_CODE( "varying vec3 obinormal;\n", cfg.binor ) \
									_BUILD_CODE( "varying vec3 otangent;\n", cfg.tan )

#define _VS_NORMAL_MAIN				_BUILD_SCOPE( cfg.w, \
									_BUILD_CODE( "onormal = normalize(w * vec4(normal, 0.0)).xyz;\n", cfg.nor ) \
									_BUILD_CODE( "obinormal = normalize(w * vec4(binormal, 0.0)).xyz;\n", cfg.binor ) \
									_BUILD_CODE( "otangent = normalize(w * vec4(tangent, 0.0)).xyz;\n", cfg.tan ) )

#define _PS_NORMAL_MAIN				_BUILD_CODE( "vec3 n = onormal;\n", cfg.nor ) \
									_BUILD_CODE( "vec4 bn = texture2D(layer5, otex0.xy) * 2 - 1;\n", cfg.norm ) \
									_BUILD_CODE( "vec4 bn = texture2D(layer8, otex0.xy);\n" \
												 "bn.xyz = bn.xyz * 2 - 1;\n", !cfg.alphalayer && ( cfg.helpspe || cfg.helpnor ) ) \
									_BUILD_CODE( "n = n + bn.x * otangent + bn.y * obinormal;\n", cfg.nor && cfg.binor && cfg.tan ) \
									_BUILD_CODE( "n = normalize(n);\n", cfg.nor )

#define _PS_GBUFFER_MAIN			_BUILD_SCOPE( cfg.gbuffer, \
									_BUILD_CODE( "fdiffuse *= ambient;\n", cfg.ambient ) \
									_BUILD_CODE( "gl_FragData[1].xyz = n;\n", cfg.nor ) \
									_BUILD_CODE( "gl_FragData[1].w = shine;\n", cfg.nor && cfg.spe ) \
									_BUILD_CODE( "gl_FragData[2] = opos;\n", cfg.pos ) \
									_BUILD_CODE( "gl_FragData[3] = smaterial;\n", cfg.spe && !cfg.helpspe ) \
									_BUILD_CODE( "gl_FragData[3] = bn.w;\n", cfg.helpspe ) \
									_BUILD_CODE( "gl_FragData[3] *= texture2D(layer6, otex0.xy);\n", cfg.spem ) )

#define _PS_LIGHT2_INPUT			_BUILD_SCOPE( cfg.light == 2, \
									_BUILD_CODE( "varying vec3 odiffuse;\n", cfg.vlit ) \
									_BUILD_CODE( "varying vec3 onormal;\n", cfg.nor ) \
									_BUILD_CODE( "varying vec3 obinormal;\n", cfg.nor && cfg.binor ) \
									_BUILD_CODE( "varying vec3 otangent;\n", cfg.nor && cfg.tan ) )

#define _VS_LIGHT2_MAIN				_BUILD_SCOPE( cfg.light == 2, \
									_BUILD_CODE( "odiffuse = diffuse;\n", cfg.vlit ) \
									_BUILD_CODE( "onormal = normalize(w * vec4(normal, 0.0)).xyz;\n", cfg.nor && !cfg.skin ) \
									_BUILD_CODE( "onormal = normalize(w * vec4(inormal, 0.0)).xyz;\n", cfg.nor && cfg.skin ) \
									_BUILD_CODE( "obinormal = normalize(w * vec4(binormal, 0.0)).xyz;\n", cfg.nor && cfg.binor ) \
									_BUILD_CODE( "otangent = normalize(w * vec4(tangent, 0.0)).xyz;\n", cfg.nor && cfg.tan ) )

#define _PS_LIGHT2_MAIN				_BUILD_SCOPE( cfg.light == 2, \
									_BUILD_CODE( "vec3 diflight = odiffuse;\n", cfg.vlit ) \
									_BUILD_CODE( "vec3 diflight = vec3(0, 0, 0);\n", !cfg.vlit ) \
									_BUILD_CODE( "float dambient = 0.0;\n", cfg.dambient ) \
									_BUILD_CODE( "vec3 plight = vec3(0, 0, 0);\n", cfg.plit1 ) \
									_BUILD_CODE( "vec4 foglight = vec4(0, 0, 0, 0);\n", cfg.flit ) \
									_BUILD_CODE( "vec3 difspe = vec3(0, 0, 0);\n" \
												 "float shine;\n", cfg.spe || cfg.helpspe ) \
									_BUILD_CODE( "shine = smaterial.w;\n", ( cfg.spe || cfg.helpspe ) && !cfg.matlayer1 ) \
									_BUILD_CODE( "shine = spes[layerindex].w + 0.0001;\n", ( cfg.spe || cfg.helpspe ) && cfg.matlayer1 ) \
									_BUILD_CODE( "float pp;\nvec3 n = onormal;\n", cfg.nor && !cfg.shadowbuild ) \
									_BUILD_CODE( "float pp;\nvec3 n = texture2D(layer1, otex0.xy).xyz;\n", cfg.nor && cfg.shadowbuild ) \
									_BUILD_CODE( "vec4 bn = (texture2D(layer5, otex0.xy) * 2.0 ) - 1.0;\n", cfg.nor && cfg.norm ) \
									_BUILD_CODE( "vec4 bn = texture2D(layer8, otex0.xy);\n" \
												 "bn.xyz = bn.xyz * 2.0 - 1.0;\n", !cfg.alphalayer && cfg.nor && ( cfg.helpspe || cfg.helpnor ) ) \
									_BUILD_CODE( "n = normalize(n + bn.x * otangent + bn.y * obinormal);\n", cfg.nor && cfg.binor && ( cfg.norm || cfg.helpnor ) ) \
									_BUILD_CODE( "vec3 pd;\nvec3 pdn;\nvec3 p = opos.xyz;\n", cfg.nor && cfg.pos && !cfg.shadowbuild ) \
									_BUILD_CODE( "vec3 pd;\nvec3 pdn;\nvec3 p = texture2D(layer0, otex0.xy).xyz;\n", cfg.nor && cfg.pos && cfg.shadowbuild ) \
									_BUILD_CODE( "vec3 ph;\nvec3 cp = normalize(camera.xyz - p);\n", cfg.nor && cfg.pos && ( cfg.spe || cfg.helpspe ) ) )

// Ambient.

#define _PS_AMBIENT_MAIN			_BUILD_CODE( "fdiffuse.xyz = vec3(0, 0, 0);\n", cfg.ambient && cfg.lightmap == 2 ) \
									_BUILD_CODE( "fdiffuse.xyz = ambient.xyz * texture2D(layer7, otex1.xy).a;\n", cfg.ambient && ( cfg.lightmap == 1 || cfg.lightmap == 3 && !cfg.lmapparam ) ) \
									_BUILD_CODE( "fdiffuse.xyz = ambient.xyz * texture2D(layer7, lmapparam.zw * otex1.xy + lmapparam.xy).a;\n", cfg.ambient && ( cfg.lightmap == 1 || cfg.lightmap == 3 ) && cfg.lmapparam ) \
									_BUILD_CODE( "fdiffuse.xyz *= ambient.xyz;\n", cfg.ambient && !cfg.lightmap ) \
									_BUILD_CODE( "fdiffuse.xyz *= ambients[layerindex].xyz;\n", cfg.ambient && !cfg.lightmap && cfg.matlayer1 )

// Specular ambient.

#define _PS_SAMBIENT_MAIN			_BUILD_CODE( "fdiffuse.xyz += sambient.xyz;\n", cfg.sambient )

// Sky light.

#define _XS_SKYLIGHT1_PARAM			_BUILD_CODE( "uniform vec4 skycolor1;\n" \
												 "uniform vec4 skydir1;\n", cfg.slit1 )

#define _XS_SKYLIGHT1_MAIN			_BUILD_SCOPE( cfg.slit1, \
									_COPY_CODE( "vec4 skycolor = skycolor1;\n")\
									_BUILD_CODE( "skycolor *= diffuses[layerindex];\n", cfg.matlayer1 ) \
									_BUILD_CODE( "pp = clamp(dot(n, -skydir1.xyz), 0.0, 1.0);\n", 1 ) \
									_BUILD_CODE( "pp = pow(1.0 - pp, skycolor.w);\n", cfg.slit1 & 0x02 ) \
									_BUILD_CODE( "odiffuse.w = pp * skycolor.w;\n", cfg.light == 1 && cfg.dambient ) \
									_BUILD_CODE( "dambient = pp * skycolor.w;\n", cfg.light == 2 && cfg.dambient ) \
									_BUILD_CODE( "if ( pp > 0.0 ){\n", cfg.light == 2 ) \
									_BUILD_CODE( "diflight += skycolor.xyz * pp;\n", cfg.lightmap != 2 ) \
									_BUILD_CODE( "foglight += vec4(skycolor.xyz, pp);\n", !cfg.sfogf && ( cfg.slit1 & 0x04 ) ) \
									_BUILD_CODE( "foglight += vec4(skycolor.xyz, pp * skyfogfactor.x);\n", cfg.sfogf && ( cfg.slit1 & 0x04 ) ) \
									_BUILD_CODE( "ph = normalize(cp - skydir1.xyz);\n", ( cfg.spe || cfg.helpspe ) && ( cfg.slit1 & 0x02 ) == 0 ) \
									_BUILD_CODE( "difspe += skycolor.xyz * pow(clamp(dot(n, ph), 0.0, 1.0), shine);\n", !cfg.sspef && ( cfg.helpspe || cfg.spe ) && ( ( cfg.slit1 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "difspe += skycolor.xyz * pow(clamp(dot(n, ph), 0.0, 1.0), shine) * skyspefactor.x;\n", cfg.sspef && ( cfg.helpspe || cfg.spe ) && ( ( cfg.slit1 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "}\n", cfg.light == 2 ) )

#define _XS_SKYLIGHT2_PARAM			_BUILD_CODE( "uniform vec4 skycolor2;\n" \
												 "uniform vec4 skydir2;\n", cfg.slit2 )

#define _XS_SKYLIGHT2_MAIN			_BUILD_SCOPE( cfg.slit2, \
									_COPY_CODE( "skycolor = skycolor2;\n" ) \
									_BUILD_CODE( "skycolor *= diffuses[layerindex];\n", cfg.matlayer1 ) \
									_BUILD_CODE( "pp = clamp(dot(n, -skydir2.xyz), 0.0, 1.0);\n", 1 ) \
									_BUILD_CODE( "pp = pow(1.0 - pp, skycolor.w);\n", cfg.slit2 & 0x02 ) \
									_BUILD_CODE( "odiffuse.w = max(odiffuse.w, pp * skycolor.w);\n", cfg.light == 1 && cfg.dambient ) \
									_BUILD_CODE( "dambient = max(dambient, pp * skycolor.w);\n", cfg.light == 2 && cfg.dambient ) \
									_BUILD_CODE( "if ( pp > 0.0 ){\n", cfg.light == 2 ) \
									_BUILD_CODE( "diflight += skycolor.xyz * pp;\n", cfg.lightmap != 2 ) \
									_BUILD_CODE( "foglight += vec4(skycolor.xyz, pp);\n", !cfg.sfogf && ( cfg.slit2 & 0x04 ) ) \
									_BUILD_CODE( "foglight += vec4(skycolor.xyz, pp * skyfogfactor.y);\n", cfg.sfogf && ( cfg.slit2 & 0x04 ) ) \
									_BUILD_CODE( "ph = normalize(cp - skydir2.xyz);\n", ( cfg.helpspe || cfg.spe ) && ( cfg.slit2 & 0x02 ) == 0 ) \
									_BUILD_CODE( "difspe += skycolor.xyz * pow(clamp(dot(n, ph), 0.0, 1.0), shine);\n", !cfg.sspef && ( cfg.helpspe || cfg.spe ) && ( ( cfg.slit2 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "difspe += skycolor.xyz * pow(clamp(dot(n, ph), 0.0, 1.0), shine) * skyspefactor.y;\n", cfg.sspef && ( cfg.helpspe || cfg.spe ) && ( ( cfg.slit2 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "}\n", cfg.light == 2 ) )

#define _XS_SKYLIGHT3_PARAM			_BUILD_CODE( "uniform vec4 skycolor3;\n" \
												 "uniform vec4 skydir3;\n", cfg.slit3 )

#define _XS_SKYLIGHT3_MAIN			_BUILD_SCOPE( cfg.slit3, \
									_COPY_CODE( "skycolor = skycolor3;\n" ) \
									_BUILD_CODE( "skycolor *= diffuses[layerindex];\n", cfg.matlayer1 ) \
									_BUILD_CODE( "pp = clamp(dot(n, -skydir3.xyz), 0.0, 1.0);\n", 1 ) \
									_BUILD_CODE( "pp = pow(1.0 - pp, skycolor.w);\n", cfg.slit3 & 0x02 ) \
									_BUILD_CODE( "odiffuse.w = max(odiffuse.w, pp * skycolor.w);\n", cfg.light == 1 && cfg.dambient ) \
									_BUILD_CODE( "dambient = max(dambient, pp * skycolor.w);\n", cfg.light == 2 && cfg.dambient ) \
									_BUILD_CODE( "if ( pp > 0.0 ){\n", cfg.light == 2 ) \
									_BUILD_CODE( "diflight += skycolor.xyz * pp;\n", cfg.lightmap != 2 ) \
									_BUILD_CODE( "foglight += vec4(skycolor.xyz, pp);\n", !cfg.sfogf && ( cfg.slit3 & 0x04 ) ) \
									_BUILD_CODE( "foglight += vec4(skycolor.xyz, pp * skyfogfactor.z);\n", cfg.sfogf && ( cfg.slit3 & 0x04 ) ) \
									_BUILD_CODE( "ph = normalize(cp - skydir3.xyz);\n", ( cfg.spe || cfg.helpspe ) && ( cfg.slit3 & 0x02 ) == 0 ) \
									_BUILD_CODE( "difspe += skycolor.xyz * pow(clamp(dot(n, ph), 0.0, 1.0), shine);\n", !cfg.sspef && ( cfg.spe || cfg.helpspe ) && ( ( cfg.slit3 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "difspe += skycolor.xyz * pow(clamp(dot(n, ph), 0.0, 1.0), shine) * skyspefactor.z;\n", cfg.sspef && ( cfg.spe || cfg.helpspe ) && ( ( cfg.slit3 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "}\n", cfg.light == 2 ) )

#define _XS_SKYLIGHT4_PARAM			_BUILD_CODE( "uniform vec4 skycolor4;\n" \
												 "uniform vec4 skydir4;\n", cfg.slit4 )

#define _XS_SKYLIGHT4_MAIN			_BUILD_SCOPE( cfg.slit4, \
									_COPY_CODE( "skycolor = skycolor4;\n" ) \
									_BUILD_CODE( "skycolor *= diffuses[layerindex];\n", cfg.matlayer1 ) \
									_BUILD_CODE( "pp = clamp(dot(n, -skydir4.xyz), 0.0, 1.0);\n", 1 ) \
									_BUILD_CODE( "pp = pow(1.0 - pp, skycolor.w);\n", cfg.slit4 & 0x02 ) \
									_BUILD_CODE( "odiffuse.w = max(odiffuse.w, pp * skycolor.w);\n", cfg.light == 1 && cfg.dambient ) \
									_BUILD_CODE( "dambient = max(dambient, pp * skycolor.w);\n", cfg.light == 2 && cfg.dambient ) \
									_BUILD_CODE( "if ( pp > 0.0 ){\n", cfg.light == 2 ) \
									_BUILD_CODE( "diflight += skycolor.xyz * pp;\n", cfg.lightmap != 2 ) \
									_BUILD_CODE( "foglight += vec4(skycolor.xyz, pp);\n", !cfg.sfogf && ( cfg.slit4 & 0x04 ) ) \
									_BUILD_CODE( "foglight += vec4(skycolor.xyz, pp * skyfogfactor.w);\n", cfg.sfogf && ( cfg.slit4 & 0x04 ) ) \
									_BUILD_CODE( "ph = normalize(cp - skydir4.xyz);\n", ( cfg.helpspe || cfg.spe ) && ( cfg.slit4 & 0x02 ) == 0 ) \
									_BUILD_CODE( "difspe += skycolor.xyz * pow(clamp(dot(n, ph), 0.0, 1.0), shine);\n", !cfg.sspef && ( cfg.helpspe || cfg.spe ) && ( ( cfg.slit4 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "difspe += skycolor.xyz * pow(clamp(dot(n, ph), 0.0, 1.0), shine) * skyspefactor.w;\n", cfg.sspef && ( cfg.helpspe || cfg.spe ) && ( ( cfg.slit4 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "}\n", cfg.light == 2 ) )

// Point light.

#define _PS_CLIPPLANE_PARAM			_BUILD_CODE( "uniform vec4 clipplane1;\n", cfg.clipplane > 0 ) \
									_BUILD_CODE( "uniform vec4 clipplane2;\n", cfg.clipplane > 1 ) \
									_BUILD_CODE( "uniform vec4 clipplane3;\n", cfg.clipplane > 2 ) \
									_BUILD_CODE( "uniform vec4 clipplane4;\n", cfg.clipplane > 3 )

#define _PS_CLIPPLANE_MAIN			_BUILD_CODE( "if (dot(vec4(opos.xyz, 1.0), clipplane1) > 0.0) discard;\n", cfg.clipplane > 0 ) \
									_BUILD_CODE( "if (dot(vec4(opos.xyz, 1.0), clipplane2) > 0.0) discard;\n", cfg.clipplane > 1 ) \
									_BUILD_CODE( "if (dot(vec4(opos.xyz, 1.0), clipplane3) > 0.0) discard;\n", cfg.clipplane > 2 ) \
									_BUILD_CODE( "if (dot(vec4(opos.xyz, 1.0), clipplane4) > 0.0) discard;\n", cfg.clipplane > 3 )

#define _XS_POINTLIGHT1_PARAM		_BUILD_CODE( "uniform vec4 pointcolor1;\n" \
												 "uniform vec4 pointpos1;\n", cfg.plit1 )

#define _XS_POINTLIGHT1_MAIN		_BUILD_SCOPE( cfg.plit1, \
									_COPY_CODE( "vec4 pointcolor = pointcolor1;\n" ) \
									_BUILD_CODE( "pointcolor *= diffuses[layerindex];\n", cfg.matlayer1 ) \
									_BUILD_CODE( "pd = pointpos1.xyz - p;\n" \
												 "pdn = normalize(pd);\n" \
												 "pp = clamp(dot(n, pdn), 0.0, 1.0);\n", 1 ) \
									_BUILD_CODE( "pp = 1.0 - pp;\n", cfg.plit1 & 0x02 ) \
									_BUILD_CODE( "pp *= clamp(1.0 - length(pd) / pointpos1.w, 0.0, 1.0);\n", 1 ) \
									_BUILD_CODE( "pp = min(pp, pointcolor.w);\n", ( cfg.plit1 & 0x02 ) == 0 ) \
									_BUILD_CODE( "pp = pow(pp, pointcolor.w);\n", cfg.plit1 & 0x02 ) \
									_BUILD_CODE( "if ( pp > 0.0 ){\n", cfg.light == 2 ) \
									_BUILD_CODE( "plight += pointcolor.xyz * pp;\n", cfg.lightmap != 2 ) \
									_BUILD_CODE( "foglight += vec4(pointcolor.xyz, pp);\n", !cfg.pfogf && ( cfg.plit1 & 0x04 ) ) \
									_BUILD_CODE( "foglight += vec4(pointcolor.xyz, pp * pointfogfactor.x);\n", cfg.pfogf && ( cfg.plit1 & 0x04 ) ) \
									_BUILD_CODE( "ph = normalize(cp + pdn);\n", ( cfg.helpspe || cfg.spe ) && ( cfg.plit1 & 0x02 ) == 0 ) \
									_BUILD_CODE( "difspe += pointcolor.xyz * (pow(clamp(dot(n, ph), 0.0, 1.0), shine) * pp);\n", !cfg.pspef && ( cfg.helpspe || cfg.spe ) && ( ( cfg.plit1 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "difspe += pointcolor.xyz * (pow(clamp(dot(n, ph), 0.0, 1.0), shine) * pp) * pointspefactor.x;\n", cfg.pspef && ( cfg.helpspe || cfg.spe ) && ( ( cfg.plit1 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "}\n", cfg.light == 2 ) )

#define _XS_POINTLIGHT2_PARAM		_BUILD_CODE( "uniform vec4 pointcolor2;\n" \
												 "uniform vec4 pointpos2;\n", cfg.plit2 )

#define _XS_POINTLIGHT2_MAIN		_BUILD_SCOPE( cfg.plit2, \
									_COPY_CODE( "pointcolor = pointcolor2;\n" ) \
									_BUILD_CODE( "pointcolor *= diffuses[layerindex];\n", cfg.matlayer1 ) \
									_BUILD_CODE( "pd = pointpos2.xyz - p;\n" \
												 "pdn = normalize(pd);\n" \
												 "pp = clamp(dot(n, pdn), 0.0, 1.0);\n", 1 ) \
									_BUILD_CODE( "pp = 1.0 - pp;\n", cfg.plit2 & 0x02 ) \
									_BUILD_CODE( "pp *= clamp(1.0 - length(pd) / pointpos2.w, 0.0, 1.0);\n", 1 ) \
									_BUILD_CODE( "pp = min(pp, pointcolor.w);\n", ( cfg.plit2 & 0x02 ) == 0 ) \
									_BUILD_CODE( "pp = pow(pp, pointcolor.w);\n", cfg.plit2 & 0x02 ) \
									_BUILD_CODE( "if ( pp > 0.0 ){\n", cfg.light == 2 ) \
									_BUILD_CODE( "plight += pointcolor.xyz * pp;\n", cfg.lightmap != 2 ) \
									_BUILD_CODE( "foglight += vec4(pointcolor.xyz, pp);\n", !cfg.pfogf && ( cfg.plit2 & 0x04 ) ) \
									_BUILD_CODE( "foglight += vec4(pointcolor.xyz, pp * pointfogfactor.y);\n", cfg.pfogf && ( cfg.plit2 & 0x04 ) ) \
									_BUILD_CODE( "ph = normalize(cp + pdn);\n", ( cfg.helpspe || cfg.spe ) && ( cfg.plit2 & 0x02 ) == 0 ) \
									_BUILD_CODE( "difspe += pointcolor.xyz * (pow(clamp(dot(n, ph), 0.0, 1.0), shine) * pp);\n", !cfg.pspef && ( cfg.helpspe || cfg.spe ) && ( ( cfg.plit2 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "difspe += pointcolor.xyz * (pow(clamp(dot(n, ph), 0.0, 1.0), shine) * pp) * pointspefactor.y;\n", cfg.pspef && ( cfg.helpspe || cfg.spe ) && ( ( cfg.plit2 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "}\n", cfg.light == 2 ) )

#define _XS_POINTLIGHT3_PARAM		_BUILD_CODE( "uniform vec4 pointcolor3;\n" \
												 "uniform vec4 pointpos3;\n", cfg.plit3 )

#define _XS_POINTLIGHT3_MAIN		_BUILD_SCOPE( cfg.plit3, \
									_COPY_CODE( "pointcolor = pointcolor3;\n" ) \
									_BUILD_CODE( "pointcolor *= diffuses[layerindex];\n", cfg.matlayer1 ) \
									_BUILD_CODE( "pd = pointpos3.xyz - p;\n" \
												 "pdn = normalize(pd);\n" \
												 "pp = clamp(dot(n, pdn), 0.0, 1.0);\n", 1 ) \
									_BUILD_CODE( "pp = 1.0 - pp;\n", cfg.plit3 & 0x02 ) \
									_BUILD_CODE( "pp *= clamp(1.0 - length(pd) / pointpos3.w, 0.0, 1.0);\n", 1 ) \
									_BUILD_CODE( "pp = min(pp, pointcolor.w);\n", ( cfg.plit3 & 0x02 ) == 0 ) \
									_BUILD_CODE( "pp = pow(pp, pointcolor.w);\n", cfg.plit3 & 0x02 ) \
									_BUILD_CODE( "if ( pp > 0.0 ){\n", cfg.light == 2 ) \
									_BUILD_CODE( "plight += pointcolor.xyz * pp;\n", cfg.lightmap != 2 ) \
									_BUILD_CODE( "foglight += vec4(pointcolor.xyz, pp);\n", !cfg.pfogf && ( cfg.plit3 & 0x04 ) ) \
									_BUILD_CODE( "foglight += vec4(pointcolor.xyz, pp * pointfogfactor.z);\n", cfg.pfogf && ( cfg.plit3 & 0x04 ) ) \
									_BUILD_CODE( "ph = normalize(cp + pdn);\n", ( cfg.helpspe || cfg.spe ) && ( cfg.plit3 & 0x02 ) == 0 ) \
									_BUILD_CODE( "difspe += pointcolor.xyz * (pow(clamp(dot(n, ph), 0.0, 1.0), shine) * pp);\n", !cfg.pspef && ( cfg.helpspe || cfg.spe ) && ( ( cfg.plit3 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "difspe += pointcolor.xyz * (pow(clamp(dot(n, ph), 0.0, 1.0), shine) * pp) * pointspefactor.z;\n", cfg.pspef && ( cfg.helpspe || cfg.spe ) && ( ( cfg.plit3 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "}\n", cfg.light == 2 ) )

#define _XS_POINTLIGHT4_PARAM		_BUILD_CODE( "uniform vec4 pointcolor4;\n" \
												 "uniform vec4 pointpos4;\n", cfg.plit4 )

#define _XS_POINTLIGHT4_MAIN		_BUILD_SCOPE( cfg.plit4, \
									_COPY_CODE( "pointcolor = pointcolor4;\n" ) \
									_BUILD_CODE( "pointcolor *= diffuses[layerindex];\n", cfg.matlayer1 ) \
									_BUILD_CODE( "pd = pointpos4.xyz - p;\n" \
												 "pdn = normalize(pd);\n" \
												 "pp = clamp(dot(n, pdn), 0.0, 1.0);\n", 1 ) \
									_BUILD_CODE( "pp = 1.0 - pp;\n", cfg.plit4 & 0x02 ) \
									_BUILD_CODE( "pp *= clamp(1.0 - length(pd) / pointpos4.w, 0.0, 1.0);\n", 1 ) \
									_BUILD_CODE( "pp = min(pp, pointcolor.w);\n", ( cfg.plit4 & 0x02 ) == 0 ) \
									_BUILD_CODE( "pp = pow(pp, pointcolor.w);\n", cfg.plit4 & 0x02 ) \
									_BUILD_CODE( "if ( pp > 0.0 ){\n", cfg.light == 2 ) \
									_BUILD_CODE( "plight += pointcolor.xyz * pp;\n", cfg.lightmap != 2 ) \
									_BUILD_CODE( "foglight += vec4(pointcolor.xyz, pp);\n", !cfg.pfogf && ( cfg.plit4 & 0x04 ) ) \
									_BUILD_CODE( "foglight += vec4(pointcolor.xyz, pp * pointfogfactor.w);\n", cfg.pfogf && ( cfg.plit4 & 0x04 ) ) \
									_BUILD_CODE( "ph = normalize(cp + pdn);\n", cfg.spe && ( cfg.plit4 & 0x02 ) == 0 ) \
									_BUILD_CODE( "difspe += pointcolor.xyz * (pow(clamp(dot(n, ph), 0.0, 1.0), shine) * pp);\n", !cfg.pspef && ( cfg.helpspe || cfg.spe ) && ( ( cfg.plit4 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "difspe += pointcolor.xyz * (pow(clamp(dot(n, ph), 0.0, 1.0), shine) * pp) * pointspefactor.w;\n", cfg.pspef && ( cfg.helpspe || cfg.spe ) && ( ( cfg.plit4 & 0x02 ) == 0 ) ) \
									_BUILD_CODE( "}\n", cfg.light == 2 ) )

#define _XS_SPOTLIGHT1_PARAM		_BUILD_CODE( "uniform vec4 spotcolor1;\n" \
												 "uniform vec4 spotpos1;\n" \
												 "uniform vec4 spotdir1;\n" \
												 "uniform vec4 spotatten1;\n", cfg.spotlit1 )

#define _XS_SPOTLIGHT1_MAIN			_BUILD_SCOPE( cfg.spotlit1, \
									_BUILD_CODE( "pd = spotpos1.xyz - p;\n" \
												 "pp = clamp(dot(n, -spotdir1.xyz), 0.0, 1.0);\n", 1 ) \
									_BUILD_CODE( "if (length(pd)>=spotpos1.w) pp = 0.0;\n", 1 ) \
									_BUILD_CODE( "float atten = dot(spotdir1.xyz, normalize(-pd));\n", 1 ) \
									_BUILD_CODE( "pp *= clamp((atten - spotatten1.x)/(spotatten1.y - spotatten1.x), 0.0, 1.0);\n", 1 ) \
									_BUILD_CODE( "diflight += spotcolor1.xyz * pp;\n", cfg.lightmap != 2 ) )

#define _XS_SPECULAR_MAIN			_BUILD_SCOPE( cfg.light != 0 && cfg.nor && cfg.pos && ( cfg.helpspe || cfg.spe ), \
									_BUILD_CODE( "difspe *= texture2D(layer6, otex0.xy).xyz;\n", cfg.spem && cfg.spe ) \
									_BUILD_CODE( "difspe *= smaterial.xyz;\n", cfg.light == 2 && cfg.spe && !cfg.matlayer1 ) \
									_BUILD_CODE( "difspe *= spes[layerindex].xyz;\n", cfg.light == 2 && cfg.spe && cfg.matlayer1 ) \
									_BUILD_CODE( "difspe *= bn.w;\n", cfg.light == 2 && cfg.helpspe ) \
									_BUILD_CODE( "fdiffuse.xyz += difspe;\n", 1 ) )

#define _VS_SHADOWMAP_POST_MAIN		_BUILD_SCOPE( cfg.light == 1 && cfg.shadowmap && cfg.plit1, \
									_BUILD_CODE( "odiffuse.xyz += diflight;\n", 1 ) \
									_BUILD_CODE( "diflight = vec3(0, 0, 0);\n", 1 ) )

#define _VS_LIGHT_POST_MAIN			_BUILD_SCOPE( cfg.light == 1, \
									_BUILD_CODE( "diflight += plight;\n", cfg.plit1 && !cfg.shadowplit ) \
									_BUILD_CODE( "diflight = mix(diflight, ematerial.xyz, ematerial.w);\n", cfg.emi ) \
									_BUILD_CODE( "odiffuse.xyz += diflight;\n", cfg.lightmap != 2 ) \
									_BUILD_CODE( "opdiffuse.xyz += plight;\n", cfg.plit1 && cfg.shadowplit ) \
									_BUILD_CODE( "ospe.xyz += difspe * smaterial.xyz;\n", cfg.spe ) \
									_BUILD_CODE( "ovfog = foglight;\n", cfg.flit ) )

#define _PS_SHADOWMAP_POST_MAIN		_BUILD_SCOPE( ( cfg.shadowmap || cfg.lightmap == 3 ) && cfg.light != 0, \
									_BUILD_CODE( "diflight *= litprecent;\n", cfg.shadowmap ) \
									_BUILD_CODE( "diflight *= texture2D(layer7, otex1.xy).xyz;\n", cfg.lightmap == 3 && !cfg.lmapparam ) \
									_BUILD_CODE( "diflight *= texture2D(layer7, lmapparam.zw * otex1.xy + lmapparam.xy).xyz;\n", cfg.lightmap == 3 && cfg.lmapparam ) \
									_BUILD_CODE( "diflight += opdiffuse;\n", cfg.light == 1 && cfg.shadowplit ) \
									_BUILD_CODE( "difspe *= litprecent;\n", cfg.shadowmap && cfg.spe ) \
									_BUILD_CODE( "dambient *= litprecent;\n", cfg.shadowmap && cfg.dambient ) \
									_BUILD_CODE( "dambient *= texture2D(layer7, otex1.xy).x;\n", cfg.lightmap == 3 && cfg.dambient && !cfg.lmapparam ) \
									_BUILD_CODE( "dambient *= texture2D(layer7, lmapparam.zw * otex1.xy + lmapparam.xy).x;\n", cfg.lightmap == 3 && cfg.dambient && cfg.lmapparam ) )

#define _PS_LIGHT_POST_MAIN			_BUILD_SCOPE( cfg.light != 0, \
									_BUILD_CODE( "diflight += plight;\n", cfg.plit1 && cfg.light == 2 ) \
									_BUILD_CODE( "diflight = mix(diflight, ematerial.xyz, ematerial.w);\n", cfg.light == 2 && cfg.emi && !cfg.emim ) \
									_BUILD_CODE( "diflight = mix(diflight, ematerial.xyz, ematerial.w * texture2D(layer3, otex0.xy).xyz);\n", cfg.light == 2 && cfg.emi && cfg.emim && cfg.tex3 ) \
									_BUILD_CODE( "diflight = floor(diflight * toonstep.x) / toonstep.x;\n", cfg.toonlight ) \
									_BUILD_CODE( "fdiffuse.w = texture2D(layer0, otex0.xy).w;\n", cfg.shadowbuild ) \
									_BUILD_CODE( "fdiffuse.xyz *= clamp(1.0 - dambient, 0.0, 1.0);\n", cfg.dambient ) \
									_BUILD_CODE( "fdiffuse.xyz += diflight;\n", 1 ) )

#define	_PS_TOONEDGE_POST_MAIN		_BUILD_CODE( "float pe = clamp(dot(n, normalize(camera.xyz - opos.xyz)), 0.0, 1.0);\n" \
												 "fdiffuse.xyz = mix(tooncolor.xyz, fdiffuse.xyz, step(tooncolor.w, pe));\n", cfg.toonedge )

// Fog light.

#define _PS_FOGLIGHT_INPUT			_BUILD_CODE( "varying vec4 ovfog;\n", cfg.light == 1 && cfg.flit )

#define _PS_FOGLIGHT_MAIN			_BUILD_CODE( "fdiffuse.xyz = mix(fdiffuse.xyz, foglight.xyz, clamp(foglight.w, 0.0, 1.0));\n", cfg.flit )