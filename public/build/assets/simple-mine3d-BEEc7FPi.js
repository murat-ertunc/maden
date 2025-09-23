/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $s="158",un={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Tn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Jl=0,wo=1,Ql=2,ul=1,fl=2,dn=3,On=0,Rt=1,Wt=2,Rn=0,bi=1,Eo=2,To=3,Ao=4,ec=5,jn=100,tc=101,nc=102,Co=103,Po=104,ic=200,sc=201,rc=202,oc=203,$r=204,Zr=205,ac=206,lc=207,cc=208,hc=209,dc=210,uc=211,fc=212,pc=213,mc=214,gc=0,vc=1,yc=2,Bs=3,_c=4,xc=5,Mc=6,Sc=7,Zs=0,bc=1,wc=2,Ln=0,Ec=1,Tc=2,Ac=3,lo=4,Cc=5,pl=300,Ti=301,Ai=302,Kr=303,Jr=304,Ks=306,Qr=1e3,Zt=1001,eo=1002,Pt=1003,Do=1004,lr=1005,Ht=1006,Pc=1007,Ki=1008,In=1009,Dc=1010,Rc=1011,co=1012,ml=1013,Cn=1014,Pn=1015,Ji=1016,gl=1017,vl=1018,$n=1020,Lc=1021,Kt=1023,Ic=1024,Uc=1025,Zn=1026,Ci=1027,Oc=1028,yl=1029,Nc=1030,_l=1031,xl=1033,cr=33776,hr=33777,dr=33778,ur=33779,Ro=35840,Lo=35841,Io=35842,Uo=35843,Fc=36196,Oo=37492,No=37496,Fo=37808,zo=37809,Bo=37810,ko=37811,Go=37812,Ho=37813,Vo=37814,Wo=37815,Xo=37816,jo=37817,Yo=37818,qo=37819,$o=37820,Zo=37821,fr=36492,Ko=36494,Jo=36495,zc=36283,Qo=36284,ea=36285,ta=36286,Ml=3e3,Kn=3001,Bc=3200,kc=3201,Js=0,Gc=1,Xt="",ft="srgb",gn="srgb-linear",ho="display-p3",Qs="display-p3-linear",ks="linear",Qe="srgb",Gs="rec709",Hs="p3",ti=7680,na=519,Hc=512,Vc=513,Wc=514,Xc=515,jc=516,Yc=517,qc=518,$c=519,to=35044,ia="300 es",no=1035,pn=2e3,Vs=2001;class ei{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Mt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let sa=1234567;const wi=Math.PI/180,Qi=180/Math.PI;function mn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Mt[r&255]+Mt[r>>8&255]+Mt[r>>16&255]+Mt[r>>24&255]+"-"+Mt[e&255]+Mt[e>>8&255]+"-"+Mt[e>>16&15|64]+Mt[e>>24&255]+"-"+Mt[t&63|128]+Mt[t>>8&255]+"-"+Mt[t>>16&255]+Mt[t>>24&255]+Mt[n&255]+Mt[n>>8&255]+Mt[n>>16&255]+Mt[n>>24&255]).toLowerCase()}function pt(r,e,t){return Math.max(e,Math.min(t,r))}function uo(r,e){return(r%e+e)%e}function Zc(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Kc(r,e,t){return r!==e?(t-r)/(e-r):0}function Yi(r,e,t){return(1-t)*r+t*e}function Jc(r,e,t,n){return Yi(r,e,1-Math.exp(-t*n))}function Qc(r,e=1){return e-Math.abs(uo(r,e*2)-e)}function eh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function th(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function nh(r,e){return r+Math.floor(Math.random()*(e-r+1))}function ih(r,e){return r+Math.random()*(e-r)}function sh(r){return r*(.5-Math.random())}function rh(r){r!==void 0&&(sa=r);let e=sa+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function oh(r){return r*wi}function ah(r){return r*Qi}function io(r){return(r&r-1)===0&&r!==0}function lh(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Ws(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function ch(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),h=s((e+n)/2),c=o((e+n)/2),d=s((e-n)/2),u=o((e-n)/2),p=s((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":r.set(a*c,l*d,l*u,a*h);break;case"YZY":r.set(l*u,a*c,l*d,a*h);break;case"ZXZ":r.set(l*d,l*u,a*c,a*h);break;case"XZX":r.set(a*c,l*g,l*p,a*h);break;case"YXY":r.set(l*p,a*c,l*g,a*h);break;case"ZYZ":r.set(l*g,l*p,a*c,a*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function sn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function je(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const tn={DEG2RAD:wi,RAD2DEG:Qi,generateUUID:mn,clamp:pt,euclideanModulo:uo,mapLinear:Zc,inverseLerp:Kc,lerp:Yi,damp:Jc,pingpong:Qc,smoothstep:eh,smootherstep:th,randInt:nh,randFloat:ih,randFloatSpread:sh,seededRandom:rh,degToRad:oh,radToDeg:ah,isPowerOfTwo:io,ceilPowerOfTwo:lh,floorPowerOfTwo:Ws,setQuaternionFromProperEuler:ch,normalize:je,denormalize:sn};class ae{constructor(e=0,t=0){ae.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Be{constructor(e,t,n,i,s,o,a,l,h){Be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,h)}set(e,t,n,i,s,o,a,l,h){const c=this.elements;return c[0]=e,c[1]=i,c[2]=a,c[3]=t,c[4]=s,c[5]=l,c[6]=n,c[7]=o,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],h=n[1],c=n[4],d=n[7],u=n[2],p=n[5],g=n[8],y=i[0],m=i[3],f=i[6],M=i[1],v=i[4],_=i[7],E=i[2],T=i[5],x=i[8];return s[0]=o*y+a*M+l*E,s[3]=o*m+a*v+l*T,s[6]=o*f+a*_+l*x,s[1]=h*y+c*M+d*E,s[4]=h*m+c*v+d*T,s[7]=h*f+c*_+d*x,s[2]=u*y+p*M+g*E,s[5]=u*m+p*v+g*T,s[8]=u*f+p*_+g*x,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],h=e[7],c=e[8];return t*o*c-t*a*h-n*s*c+n*a*l+i*s*h-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],h=e[7],c=e[8],d=c*o-a*h,u=a*l-c*s,p=h*s-o*l,g=t*d+n*u+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=d*y,e[1]=(i*h-c*n)*y,e[2]=(a*n-i*o)*y,e[3]=u*y,e[4]=(c*t-i*l)*y,e[5]=(i*s-a*t)*y,e[6]=p*y,e[7]=(n*l-h*t)*y,e[8]=(o*t-n*s)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),h=Math.sin(s);return this.set(n*l,n*h,-n*(l*o+h*a)+o+e,-i*h,i*l,-i*(-h*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(pr.makeScale(e,t)),this}rotate(e){return this.premultiply(pr.makeRotation(-e)),this}translate(e,t){return this.premultiply(pr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const pr=new Be;function Sl(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Xs(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function hh(){const r=Xs("canvas");return r.style.display="block",r}const ra={};function qi(r){r in ra||(ra[r]=!0,console.warn(r))}const oa=new Be().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),aa=new Be().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),is={[gn]:{transfer:ks,primaries:Gs,toReference:r=>r,fromReference:r=>r},[ft]:{transfer:Qe,primaries:Gs,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Qs]:{transfer:ks,primaries:Hs,toReference:r=>r.applyMatrix3(aa),fromReference:r=>r.applyMatrix3(oa)},[ho]:{transfer:Qe,primaries:Hs,toReference:r=>r.convertSRGBToLinear().applyMatrix3(aa),fromReference:r=>r.applyMatrix3(oa).convertLinearToSRGB()}},dh=new Set([gn,Qs]),qe={enabled:!0,_workingColorSpace:gn,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(r){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!r},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!dh.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=is[e].toReference,i=is[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return is[r].primaries},getTransfer:function(r){return r===Xt?ks:is[r].transfer}};function Ei(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function mr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let ni;class bl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ni===void 0&&(ni=Xs("canvas")),ni.width=e.width,ni.height=e.height;const n=ni.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ni}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Xs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Ei(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ei(t[n]/255)*255):t[n]=Ei(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let uh=0;class wl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:uh++}),this.uuid=mn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(gr(i[o].image)):s.push(gr(i[o]))}else s=gr(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function gr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?bl.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let fh=0;class Lt extends ei{constructor(e=Lt.DEFAULT_IMAGE,t=Lt.DEFAULT_MAPPING,n=Zt,i=Zt,s=Ht,o=Ki,a=Kt,l=In,h=Lt.DEFAULT_ANISOTROPY,c=Xt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fh++}),this.uuid=mn(),this.name="",this.source=new wl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=h,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof c=="string"?this.colorSpace=c:(qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=c===Kn?ft:Xt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qr:e.x=e.x-Math.floor(e.x);break;case Zt:e.x=e.x<0?0:1;break;case eo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qr:e.y=e.y-Math.floor(e.y);break;case Zt:e.y=e.y<0?0:1;break;case eo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ft?Kn:Ml}set encoding(e){qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Kn?ft:Xt}}Lt.DEFAULT_IMAGE=null;Lt.DEFAULT_MAPPING=pl;Lt.DEFAULT_ANISOTROPY=1;class st{constructor(e=0,t=0,n=0,i=1){st.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,h=l[0],c=l[4],d=l[8],u=l[1],p=l[5],g=l[9],y=l[2],m=l[6],f=l[10];if(Math.abs(c-u)<.01&&Math.abs(d-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(c+u)<.1&&Math.abs(d+y)<.1&&Math.abs(g+m)<.1&&Math.abs(h+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(h+1)/2,_=(p+1)/2,E=(f+1)/2,T=(c+u)/4,x=(d+y)/4,D=(g+m)/4;return v>_&&v>E?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=T/n,s=x/n):_>E?_<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(_),n=T/i,s=D/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=x/s,i=D/s),this.set(n,i,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(d-y)*(d-y)+(u-c)*(u-c));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-y)/M,this.z=(u-c)/M,this.w=Math.acos((h+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ph extends ei{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(qi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Kn?ft:Xt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ht,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Lt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new wl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jn extends ph{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class El extends Lt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=Zt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class mh extends Lt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=Zt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ke{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],h=n[i+1],c=n[i+2],d=n[i+3];const u=s[o+0],p=s[o+1],g=s[o+2],y=s[o+3];if(a===0){e[t+0]=l,e[t+1]=h,e[t+2]=c,e[t+3]=d;return}if(a===1){e[t+0]=u,e[t+1]=p,e[t+2]=g,e[t+3]=y;return}if(d!==y||l!==u||h!==p||c!==g){let m=1-a;const f=l*u+h*p+c*g+d*y,M=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){const E=Math.sqrt(v),T=Math.atan2(E,f*M);m=Math.sin(m*T)/E,a=Math.sin(a*T)/E}const _=a*M;if(l=l*m+u*_,h=h*m+p*_,c=c*m+g*_,d=d*m+y*_,m===1-a){const E=1/Math.sqrt(l*l+h*h+c*c+d*d);l*=E,h*=E,c*=E,d*=E}}e[t]=l,e[t+1]=h,e[t+2]=c,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],h=n[i+2],c=n[i+3],d=s[o],u=s[o+1],p=s[o+2],g=s[o+3];return e[t]=a*g+c*d+l*p-h*u,e[t+1]=l*g+c*u+h*d-a*p,e[t+2]=h*g+c*p+a*u-l*d,e[t+3]=c*g-a*d-l*u-h*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,h=a(n/2),c=a(i/2),d=a(s/2),u=l(n/2),p=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=u*c*d+h*p*g,this._y=h*p*d-u*c*g,this._z=h*c*g+u*p*d,this._w=h*c*d-u*p*g;break;case"YXZ":this._x=u*c*d+h*p*g,this._y=h*p*d-u*c*g,this._z=h*c*g-u*p*d,this._w=h*c*d+u*p*g;break;case"ZXY":this._x=u*c*d-h*p*g,this._y=h*p*d+u*c*g,this._z=h*c*g+u*p*d,this._w=h*c*d-u*p*g;break;case"ZYX":this._x=u*c*d-h*p*g,this._y=h*p*d+u*c*g,this._z=h*c*g-u*p*d,this._w=h*c*d+u*p*g;break;case"YZX":this._x=u*c*d+h*p*g,this._y=h*p*d+u*c*g,this._z=h*c*g-u*p*d,this._w=h*c*d-u*p*g;break;case"XZY":this._x=u*c*d-h*p*g,this._y=h*p*d-u*c*g,this._z=h*c*g+u*p*d,this._w=h*c*d+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],h=t[2],c=t[6],d=t[10],u=n+a+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(c-l)*p,this._y=(s-h)*p,this._z=(o-i)*p}else if(n>a&&n>d){const p=2*Math.sqrt(1+n-a-d);this._w=(c-l)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(s+h)/p}else if(a>d){const p=2*Math.sqrt(1+a-n-d);this._w=(s-h)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(l+c)/p}else{const p=2*Math.sqrt(1+d-n-a);this._w=(o-i)/p,this._x=(s+h)/p,this._y=(l+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,h=t._z,c=t._w;return this._x=n*c+o*a+i*h-s*l,this._y=i*c+o*l+s*a-n*h,this._z=s*c+o*h+n*l-i*a,this._w=o*c-n*a-i*l-s*h,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const h=Math.sqrt(l),c=Math.atan2(h,a),d=Math.sin((1-t)*c)/h,u=Math.sin(t*c)/h;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(e=0,t=0,n=0){b.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(la.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(la.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,h=2*(o*i-a*n),c=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*h+o*d-a*c,this.y=n+l*c+a*h-s*d,this.z=i+l*d+s*c-o*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return vr.copy(this).projectOnVector(e),this.sub(vr)}reflect(e){return this.sub(vr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const vr=new b,la=new Ke;class vn{constructor(e=new b(1/0,1/0,1/0),t=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Yt):Yt.fromBufferAttribute(s,o),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ss.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ss.copy(n.boundingBox)),ss.applyMatrix4(e.matrixWorld),this.union(ss)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ui),rs.subVectors(this.max,Ui),ii.subVectors(e.a,Ui),si.subVectors(e.b,Ui),ri.subVectors(e.c,Ui),xn.subVectors(si,ii),Mn.subVectors(ri,si),Bn.subVectors(ii,ri);let t=[0,-xn.z,xn.y,0,-Mn.z,Mn.y,0,-Bn.z,Bn.y,xn.z,0,-xn.x,Mn.z,0,-Mn.x,Bn.z,0,-Bn.x,-xn.y,xn.x,0,-Mn.y,Mn.x,0,-Bn.y,Bn.x,0];return!yr(t,ii,si,ri,rs)||(t=[1,0,0,0,1,0,0,0,1],!yr(t,ii,si,ri,rs))?!1:(os.crossVectors(xn,Mn),t=[os.x,os.y,os.z],yr(t,ii,si,ri,rs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(on[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),on[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),on[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),on[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),on[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),on[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),on[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),on[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(on),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const on=[new b,new b,new b,new b,new b,new b,new b,new b],Yt=new b,ss=new vn,ii=new b,si=new b,ri=new b,xn=new b,Mn=new b,Bn=new b,Ui=new b,rs=new b,os=new b,kn=new b;function yr(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){kn.fromArray(r,s);const a=i.x*Math.abs(kn.x)+i.y*Math.abs(kn.y)+i.z*Math.abs(kn.z),l=e.dot(kn),h=t.dot(kn),c=n.dot(kn);if(Math.max(-Math.max(l,h,c),Math.min(l,h,c))>a)return!1}return!0}const gh=new vn,Oi=new b,_r=new b;class es{constructor(e=new b,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):gh.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Oi.subVectors(e,this.center);const t=Oi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Oi,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_r.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Oi.copy(e.center).add(_r)),this.expandByPoint(Oi.copy(e.center).sub(_r))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const an=new b,xr=new b,as=new b,Sn=new b,Mr=new b,ls=new b,Sr=new b;class er{constructor(e=new b,t=new b(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,an)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=an.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(an.copy(this.origin).addScaledVector(this.direction,t),an.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){xr.copy(e).add(t).multiplyScalar(.5),as.copy(t).sub(e).normalize(),Sn.copy(this.origin).sub(xr);const s=e.distanceTo(t)*.5,o=-this.direction.dot(as),a=Sn.dot(this.direction),l=-Sn.dot(as),h=Sn.lengthSq(),c=Math.abs(1-o*o);let d,u,p,g;if(c>0)if(d=o*l-a,u=o*a-l,g=s*c,d>=0)if(u>=-g)if(u<=g){const y=1/c;d*=y,u*=y,p=d*(d+o*u+2*a)+u*(o*d+u+2*l)+h}else u=s,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+h;else u=-s,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+h;else u<=-g?(d=Math.max(0,-(-o*s+a)),u=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+h):u<=g?(d=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+h):(d=Math.max(0,-(o*s+a)),u=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+h);else u=o>0?-s:s,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(xr).addScaledVector(as,u),p}intersectSphere(e,t){an.subVectors(e.center,this.origin);const n=an.dot(this.direction),i=an.dot(an)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const h=1/this.direction.x,c=1/this.direction.y,d=1/this.direction.z,u=this.origin;return h>=0?(n=(e.min.x-u.x)*h,i=(e.max.x-u.x)*h):(n=(e.max.x-u.x)*h,i=(e.min.x-u.x)*h),c>=0?(s=(e.min.y-u.y)*c,o=(e.max.y-u.y)*c):(s=(e.max.y-u.y)*c,o=(e.min.y-u.y)*c),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,an)!==null}intersectTriangle(e,t,n,i,s){Mr.subVectors(t,e),ls.subVectors(n,e),Sr.crossVectors(Mr,ls);let o=this.direction.dot(Sr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Sn.subVectors(this.origin,e);const l=a*this.direction.dot(ls.crossVectors(Sn,ls));if(l<0)return null;const h=a*this.direction.dot(Mr.cross(Sn));if(h<0||l+h>o)return null;const c=-a*Sn.dot(Sr);return c<0?null:this.at(c/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tt{constructor(e,t,n,i,s,o,a,l,h,c,d,u,p,g,y,m){tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,h,c,d,u,p,g,y,m)}set(e,t,n,i,s,o,a,l,h,c,d,u,p,g,y,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=i,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=h,f[6]=c,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=y,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/oi.setFromMatrixColumn(e,0).length(),s=1/oi.setFromMatrixColumn(e,1).length(),o=1/oi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),h=Math.sin(i),c=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=o*c,p=o*d,g=a*c,y=a*d;t[0]=l*c,t[4]=-l*d,t[8]=h,t[1]=p+g*h,t[5]=u-y*h,t[9]=-a*l,t[2]=y-u*h,t[6]=g+p*h,t[10]=o*l}else if(e.order==="YXZ"){const u=l*c,p=l*d,g=h*c,y=h*d;t[0]=u+y*a,t[4]=g*a-p,t[8]=o*h,t[1]=o*d,t[5]=o*c,t[9]=-a,t[2]=p*a-g,t[6]=y+u*a,t[10]=o*l}else if(e.order==="ZXY"){const u=l*c,p=l*d,g=h*c,y=h*d;t[0]=u-y*a,t[4]=-o*d,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*c,t[9]=y-u*a,t[2]=-o*h,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const u=o*c,p=o*d,g=a*c,y=a*d;t[0]=l*c,t[4]=g*h-p,t[8]=u*h+y,t[1]=l*d,t[5]=y*h+u,t[9]=p*h-g,t[2]=-h,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const u=o*l,p=o*h,g=a*l,y=a*h;t[0]=l*c,t[4]=y-u*d,t[8]=g*d+p,t[1]=d,t[5]=o*c,t[9]=-a*c,t[2]=-h*c,t[6]=p*d+g,t[10]=u-y*d}else if(e.order==="XZY"){const u=o*l,p=o*h,g=a*l,y=a*h;t[0]=l*c,t[4]=-d,t[8]=h*c,t[1]=u*d+y,t[5]=o*c,t[9]=p*d-g,t[2]=g*d-p,t[6]=a*c,t[10]=y*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vh,e,yh)}lookAt(e,t,n){const i=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),bn.crossVectors(n,Ot),bn.lengthSq()===0&&(Math.abs(n.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),bn.crossVectors(n,Ot)),bn.normalize(),cs.crossVectors(Ot,bn),i[0]=bn.x,i[4]=cs.x,i[8]=Ot.x,i[1]=bn.y,i[5]=cs.y,i[9]=Ot.y,i[2]=bn.z,i[6]=cs.z,i[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],h=n[12],c=n[1],d=n[5],u=n[9],p=n[13],g=n[2],y=n[6],m=n[10],f=n[14],M=n[3],v=n[7],_=n[11],E=n[15],T=i[0],x=i[4],D=i[8],S=i[12],A=i[1],F=i[5],G=i[9],Z=i[13],R=i[2],O=i[6],X=i[10],H=i[14],J=i[3],Y=i[7],$=i[11],U=i[15];return s[0]=o*T+a*A+l*R+h*J,s[4]=o*x+a*F+l*O+h*Y,s[8]=o*D+a*G+l*X+h*$,s[12]=o*S+a*Z+l*H+h*U,s[1]=c*T+d*A+u*R+p*J,s[5]=c*x+d*F+u*O+p*Y,s[9]=c*D+d*G+u*X+p*$,s[13]=c*S+d*Z+u*H+p*U,s[2]=g*T+y*A+m*R+f*J,s[6]=g*x+y*F+m*O+f*Y,s[10]=g*D+y*G+m*X+f*$,s[14]=g*S+y*Z+m*H+f*U,s[3]=M*T+v*A+_*R+E*J,s[7]=M*x+v*F+_*O+E*Y,s[11]=M*D+v*G+_*X+E*$,s[15]=M*S+v*Z+_*H+E*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],h=e[13],c=e[2],d=e[6],u=e[10],p=e[14],g=e[3],y=e[7],m=e[11],f=e[15];return g*(+s*l*d-i*h*d-s*a*u+n*h*u+i*a*p-n*l*p)+y*(+t*l*p-t*h*u+s*o*u-i*o*p+i*h*c-s*l*c)+m*(+t*h*d-t*a*p-s*o*d+n*o*p+s*a*c-n*h*c)+f*(-i*a*c-t*l*d+t*a*u+i*o*d-n*o*u+n*l*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],h=e[7],c=e[8],d=e[9],u=e[10],p=e[11],g=e[12],y=e[13],m=e[14],f=e[15],M=d*m*h-y*u*h+y*l*p-a*m*p-d*l*f+a*u*f,v=g*u*h-c*m*h-g*l*p+o*m*p+c*l*f-o*u*f,_=c*y*h-g*d*h+g*a*p-o*y*p-c*a*f+o*d*f,E=g*d*l-c*y*l-g*a*u+o*y*u+c*a*m-o*d*m,T=t*M+n*v+i*_+s*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const x=1/T;return e[0]=M*x,e[1]=(y*u*s-d*m*s-y*i*p+n*m*p+d*i*f-n*u*f)*x,e[2]=(a*m*s-y*l*s+y*i*h-n*m*h-a*i*f+n*l*f)*x,e[3]=(d*l*s-a*u*s-d*i*h+n*u*h+a*i*p-n*l*p)*x,e[4]=v*x,e[5]=(c*m*s-g*u*s+g*i*p-t*m*p-c*i*f+t*u*f)*x,e[6]=(g*l*s-o*m*s-g*i*h+t*m*h+o*i*f-t*l*f)*x,e[7]=(o*u*s-c*l*s+c*i*h-t*u*h-o*i*p+t*l*p)*x,e[8]=_*x,e[9]=(g*d*s-c*y*s-g*n*p+t*y*p+c*n*f-t*d*f)*x,e[10]=(o*y*s-g*a*s+g*n*h-t*y*h-o*n*f+t*a*f)*x,e[11]=(c*a*s-o*d*s-c*n*h+t*d*h+o*n*p-t*a*p)*x,e[12]=E*x,e[13]=(c*y*i-g*d*i+g*n*u-t*y*u-c*n*m+t*d*m)*x,e[14]=(g*a*i-o*y*i-g*n*l+t*y*l+o*n*m-t*a*m)*x,e[15]=(o*d*i-c*a*i+c*n*l-t*d*l-o*n*u+t*a*u)*x,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,h=s*o,c=s*a;return this.set(h*o+n,h*a-i*l,h*l+i*a,0,h*a+i*l,c*a+n,c*l-i*o,0,h*l-i*a,c*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,h=s+s,c=o+o,d=a+a,u=s*h,p=s*c,g=s*d,y=o*c,m=o*d,f=a*d,M=l*h,v=l*c,_=l*d,E=n.x,T=n.y,x=n.z;return i[0]=(1-(y+f))*E,i[1]=(p+_)*E,i[2]=(g-v)*E,i[3]=0,i[4]=(p-_)*T,i[5]=(1-(u+f))*T,i[6]=(m+M)*T,i[7]=0,i[8]=(g+v)*x,i[9]=(m-M)*x,i[10]=(1-(u+y))*x,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=oi.set(i[0],i[1],i[2]).length();const o=oi.set(i[4],i[5],i[6]).length(),a=oi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],qt.copy(this);const h=1/s,c=1/o,d=1/a;return qt.elements[0]*=h,qt.elements[1]*=h,qt.elements[2]*=h,qt.elements[4]*=c,qt.elements[5]*=c,qt.elements[6]*=c,qt.elements[8]*=d,qt.elements[9]*=d,qt.elements[10]*=d,t.setFromRotationMatrix(qt),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=pn){const l=this.elements,h=2*s/(t-e),c=2*s/(n-i),d=(t+e)/(t-e),u=(n+i)/(n-i);let p,g;if(a===pn)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Vs)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=c,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=pn){const l=this.elements,h=1/(t-e),c=1/(n-i),d=1/(o-s),u=(t+e)*h,p=(n+i)*c;let g,y;if(a===pn)g=(o+s)*d,y=-2*d;else if(a===Vs)g=s*d,y=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const oi=new b,qt=new tt,vh=new b(0,0,0),yh=new b(1,1,1),bn=new b,cs=new b,Ot=new b,ca=new tt,ha=new Ke;class Ri{constructor(e=0,t=0,n=0,i=Ri.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],h=i[5],c=i[9],d=i[2],u=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,h),this._z=0);break;case"YXZ":this._x=Math.asin(-pt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(pt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-pt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(pt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,h),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-c,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ca.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ca,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ha.setFromEuler(this),this.setFromQuaternion(ha,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ri.DEFAULT_ORDER="XYZ";class fo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let _h=0;const da=new b,ai=new Ke,ln=new tt,hs=new b,Ni=new b,xh=new b,Mh=new Ke,ua=new b(1,0,0),fa=new b(0,1,0),pa=new b(0,0,1),Sh={type:"added"},bh={type:"removed"};class at extends ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_h++}),this.uuid=mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=at.DEFAULT_UP.clone();const e=new b,t=new Ri,n=new Ke,i=new b(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new tt},normalMatrix:{value:new Be}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=at.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new fo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ai.setFromAxisAngle(e,t),this.quaternion.multiply(ai),this}rotateOnWorldAxis(e,t){return ai.setFromAxisAngle(e,t),this.quaternion.premultiply(ai),this}rotateX(e){return this.rotateOnAxis(ua,e)}rotateY(e){return this.rotateOnAxis(fa,e)}rotateZ(e){return this.rotateOnAxis(pa,e)}translateOnAxis(e,t){return da.copy(e).applyQuaternion(this.quaternion),this.position.add(da.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ua,e)}translateY(e){return this.translateOnAxis(fa,e)}translateZ(e){return this.translateOnAxis(pa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ln.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?hs.copy(e):hs.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ni.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ln.lookAt(Ni,hs,this.up):ln.lookAt(hs,Ni,this.up),this.quaternion.setFromRotationMatrix(ln),i&&(ln.extractRotation(i.matrixWorld),ai.setFromRotationMatrix(ln),this.quaternion.premultiply(ai.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Sh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(ln),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectsByProperty(e,t);o.length>0&&(n=n.concat(o))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ni,e,xh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ni,Mh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let h=0,c=l.length;h<c;h++){const d=l[h];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,h=this.material.length;l<h;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),h=o(e.textures),c=o(e.images),d=o(e.shapes),u=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),c.length>0&&(n.images=c),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const h in a){const c=a[h];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}at.DEFAULT_UP=new b(0,1,0);at.DEFAULT_MATRIX_AUTO_UPDATE=!0;at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $t=new b,cn=new b,br=new b,hn=new b,li=new b,ci=new b,ma=new b,wr=new b,Er=new b,Tr=new b;let ds=!1;class zt{constructor(e=new b,t=new b,n=new b){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),$t.subVectors(e,t),i.cross($t);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){$t.subVectors(i,t),cn.subVectors(n,t),br.subVectors(e,t);const o=$t.dot($t),a=$t.dot(cn),l=$t.dot(br),h=cn.dot(cn),c=cn.dot(br),d=o*h-a*a;if(d===0)return s.set(-2,-1,-1);const u=1/d,p=(h*l-a*c)*u,g=(o*c-a*l)*u;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,hn),hn.x>=0&&hn.y>=0&&hn.x+hn.y<=1}static getUV(e,t,n,i,s,o,a,l){return ds===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ds=!0),this.getInterpolation(e,t,n,i,s,o,a,l)}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,hn),l.setScalar(0),l.addScaledVector(s,hn.x),l.addScaledVector(o,hn.y),l.addScaledVector(a,hn.z),l}static isFrontFacing(e,t,n,i){return $t.subVectors(n,t),cn.subVectors(e,t),$t.cross(cn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $t.subVectors(this.c,this.b),cn.subVectors(this.a,this.b),$t.cross(cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return zt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return zt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return ds===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ds=!0),zt.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return zt.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return zt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return zt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;li.subVectors(i,n),ci.subVectors(s,n),wr.subVectors(e,n);const l=li.dot(wr),h=ci.dot(wr);if(l<=0&&h<=0)return t.copy(n);Er.subVectors(e,i);const c=li.dot(Er),d=ci.dot(Er);if(c>=0&&d<=c)return t.copy(i);const u=l*d-c*h;if(u<=0&&l>=0&&c<=0)return o=l/(l-c),t.copy(n).addScaledVector(li,o);Tr.subVectors(e,s);const p=li.dot(Tr),g=ci.dot(Tr);if(g>=0&&p<=g)return t.copy(s);const y=p*h-l*g;if(y<=0&&h>=0&&g<=0)return a=h/(h-g),t.copy(n).addScaledVector(ci,a);const m=c*g-p*d;if(m<=0&&d-c>=0&&p-g>=0)return ma.subVectors(s,i),a=(d-c)/(d-c+(p-g)),t.copy(i).addScaledVector(ma,a);const f=1/(m+y+u);return o=y*f,a=u*f,t.copy(n).addScaledVector(li,o).addScaledVector(ci,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Tl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wn={h:0,s:0,l:0},us={h:0,s:0,l:0};function Ar(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class ge{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=qe.workingColorSpace){if(e=uo(e,1),t=pt(t,0,1),n=pt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Ar(o,s,e+1/3),this.g=Ar(o,s,e),this.b=Ar(o,s,e-1/3)}return qe.toWorkingColorSpace(this,i),this}setStyle(e,t=ft){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ft){const n=Tl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}copyLinearToSRGB(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ft){return qe.fromWorkingColorSpace(St.copy(this),e),Math.round(pt(St.r*255,0,255))*65536+Math.round(pt(St.g*255,0,255))*256+Math.round(pt(St.b*255,0,255))}getHexString(e=ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.fromWorkingColorSpace(St.copy(this),t);const n=St.r,i=St.g,s=St.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,h;const c=(a+o)/2;if(a===o)l=0,h=0;else{const d=o-a;switch(h=c<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=h,e.l=c,e}getRGB(e,t=qe.workingColorSpace){return qe.fromWorkingColorSpace(St.copy(this),t),e.r=St.r,e.g=St.g,e.b=St.b,e}getStyle(e=ft){qe.fromWorkingColorSpace(St.copy(this),e);const t=St.r,n=St.g,i=St.b;return e!==ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(wn),this.setHSL(wn.h+e,wn.s+t,wn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(wn),e.getHSL(us);const n=Yi(wn.h,us.h,t),i=Yi(wn.s,us.s,t),s=Yi(wn.l,us.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const St=new ge;ge.NAMES=Tl;let wh=0;class yn extends ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wh++}),this.uuid=mn(),this.name="",this.type="Material",this.blending=bi,this.side=On,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$r,this.blendDst=Zr,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ge(0,0,0),this.blendAlpha=0,this.depthFunc=Bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=na,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ti,this.stencilZFail=ti,this.stencilZPass=ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bi&&(n.blending=this.blending),this.side!==On&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$r&&(n.blendSrc=this.blendSrc),this.blendDst!==Zr&&(n.blendDst=this.blendDst),this.blendEquation!==jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==na&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Dt extends yn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Zs,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new b,fs=new ae;class jt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=to,this.updateRange={offset:0,count:-1},this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fs.fromBufferAttribute(this,t),fs.applyMatrix3(e),this.setXY(t,fs.x,fs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=je(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=sn(t,this.array)),t}setX(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=sn(t,this.array)),t}setY(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=sn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=sn(t,this.array)),t}setW(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=je(t,this.array),n=je(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=je(t,this.array),n=je(n,this.array),i=je(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=je(t,this.array),n=je(n,this.array),i=je(i,this.array),s=je(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==to&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class Al extends jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Cl extends jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Xe extends jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Eh=0;const Gt=new tt,Cr=new at,hi=new b,Nt=new vn,Fi=new vn,_t=new b;class rt extends ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Eh++}),this.uuid=mn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Sl(e)?Cl:Al)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Be().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gt.makeRotationFromQuaternion(e),this.applyMatrix4(Gt),this}rotateX(e){return Gt.makeRotationX(e),this.applyMatrix4(Gt),this}rotateY(e){return Gt.makeRotationY(e),this.applyMatrix4(Gt),this}rotateZ(e){return Gt.makeRotationZ(e),this.applyMatrix4(Gt),this}translate(e,t,n){return Gt.makeTranslation(e,t,n),this.applyMatrix4(Gt),this}scale(e,t,n){return Gt.makeScale(e,t,n),this.applyMatrix4(Gt),this}lookAt(e){return Cr.lookAt(e),Cr.updateMatrix(),this.applyMatrix4(Cr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hi).negate(),this.translate(hi.x,hi.y,hi.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Xe(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Nt.setFromBufferAttribute(s),this.morphTargetsRelative?(_t.addVectors(this.boundingBox.min,Nt.min),this.boundingBox.expandByPoint(_t),_t.addVectors(this.boundingBox.max,Nt.max),this.boundingBox.expandByPoint(_t)):(this.boundingBox.expandByPoint(Nt.min),this.boundingBox.expandByPoint(Nt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new es);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new b,1/0);return}if(e){const n=this.boundingSphere.center;if(Nt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Fi.setFromBufferAttribute(a),this.morphTargetsRelative?(_t.addVectors(Nt.min,Fi.min),Nt.expandByPoint(_t),_t.addVectors(Nt.max,Fi.max),Nt.expandByPoint(_t)):(Nt.expandByPoint(Fi.min),Nt.expandByPoint(Fi.max))}Nt.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)_t.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(_t));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let h=0,c=a.count;h<c;h++)_t.fromBufferAttribute(a,h),l&&(hi.fromBufferAttribute(e,h),_t.add(hi)),i=Math.max(i,n.distanceToSquared(_t))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,h=[],c=[];for(let A=0;A<a;A++)h[A]=new b,c[A]=new b;const d=new b,u=new b,p=new b,g=new ae,y=new ae,m=new ae,f=new b,M=new b;function v(A,F,G){d.fromArray(i,A*3),u.fromArray(i,F*3),p.fromArray(i,G*3),g.fromArray(o,A*2),y.fromArray(o,F*2),m.fromArray(o,G*2),u.sub(d),p.sub(d),y.sub(g),m.sub(g);const Z=1/(y.x*m.y-m.x*y.y);isFinite(Z)&&(f.copy(u).multiplyScalar(m.y).addScaledVector(p,-y.y).multiplyScalar(Z),M.copy(p).multiplyScalar(y.x).addScaledVector(u,-m.x).multiplyScalar(Z),h[A].add(f),h[F].add(f),h[G].add(f),c[A].add(M),c[F].add(M),c[G].add(M))}let _=this.groups;_.length===0&&(_=[{start:0,count:n.length}]);for(let A=0,F=_.length;A<F;++A){const G=_[A],Z=G.start,R=G.count;for(let O=Z,X=Z+R;O<X;O+=3)v(n[O+0],n[O+1],n[O+2])}const E=new b,T=new b,x=new b,D=new b;function S(A){x.fromArray(s,A*3),D.copy(x);const F=h[A];E.copy(F),E.sub(x.multiplyScalar(x.dot(F))).normalize(),T.crossVectors(D,F);const Z=T.dot(c[A])<0?-1:1;l[A*4]=E.x,l[A*4+1]=E.y,l[A*4+2]=E.z,l[A*4+3]=Z}for(let A=0,F=_.length;A<F;++A){const G=_[A],Z=G.start,R=G.count;for(let O=Z,X=Z+R;O<X;O+=3)S(n[O+0]),S(n[O+1]),S(n[O+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const i=new b,s=new b,o=new b,a=new b,l=new b,h=new b,c=new b,d=new b;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),y=e.getX(u+1),m=e.getX(u+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,y),o.fromBufferAttribute(t,m),c.subVectors(o,s),d.subVectors(i,s),c.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),h.fromBufferAttribute(n,m),a.add(c),l.add(c),h.add(c),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let u=0,p=t.count;u<p;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),c.subVectors(o,s),d.subVectors(i,s),c.cross(d),n.setXYZ(u+0,c.x,c.y,c.z),n.setXYZ(u+1,c.x,c.y,c.z),n.setXYZ(u+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)_t.fromBufferAttribute(e,t),_t.normalize(),e.setXYZ(t,_t.x,_t.y,_t.z)}toNonIndexed(){function e(a,l){const h=a.array,c=a.itemSize,d=a.normalized,u=new h.constructor(l.length*c);let p=0,g=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?p=l[y]*a.data.stride+a.offset:p=l[y]*c;for(let f=0;f<c;f++)u[g++]=h[p++]}return new jt(u,c,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new rt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],h=e(l,n);t.setAttribute(a,h)}const s=this.morphAttributes;for(const a in s){const l=[],h=s[a];for(let c=0,d=h.length;c<d;c++){const u=h[c],p=e(u,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const h=o[a];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(e[h]=l[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const h=n[l];e.data.attributes[l]=h.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],c=[];for(let d=0,u=h.length;d<u;d++){const p=h[d];c.push(p.toJSON(e.data))}c.length>0&&(i[l]=c,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const h in i){const c=i[h];this.setAttribute(h,c.clone(t))}const s=e.morphAttributes;for(const h in s){const c=[],d=s[h];for(let u=0,p=d.length;u<p;u++)c.push(d[u].clone(t));this.morphAttributes[h]=c}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let h=0,c=o.length;h<c;h++){const d=o[h];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ga=new tt,Gn=new er,ps=new es,va=new b,di=new b,ui=new b,fi=new b,Pr=new b,ms=new b,gs=new ae,vs=new ae,ys=new ae,ya=new b,_a=new b,xa=new b,_s=new b,xs=new b;class te extends at{constructor(e=new rt,t=new Dt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){ms.set(0,0,0);for(let l=0,h=s.length;l<h;l++){const c=a[l],d=s[l];c!==0&&(Pr.fromBufferAttribute(d,e),o?ms.addScaledVector(Pr,c):ms.addScaledVector(Pr.sub(t),c))}t.add(ms)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ps.copy(n.boundingSphere),ps.applyMatrix4(s),Gn.copy(e.ray).recast(e.near),!(ps.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(ps,va)===null||Gn.origin.distanceToSquared(va)>(e.far-e.near)**2))&&(ga.copy(s).invert(),Gn.copy(e.ray).applyMatrix4(ga),!(n.boundingBox!==null&&Gn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Gn)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,h=s.attributes.uv,c=s.attributes.uv1,d=s.attributes.normal,u=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=u.length;g<y;g++){const m=u[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let _=M,E=v;_<E;_+=3){const T=a.getX(_),x=a.getX(_+1),D=a.getX(_+2);i=Ms(this,f,e,n,h,c,d,T,x,D),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let m=g,f=y;m<f;m+=3){const M=a.getX(m),v=a.getX(m+1),_=a.getX(m+2);i=Ms(this,o,e,n,h,c,d,M,v,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,y=u.length;g<y;g++){const m=u[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let _=M,E=v;_<E;_+=3){const T=_,x=_+1,D=_+2;i=Ms(this,f,e,n,h,c,d,T,x,D),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=g,f=y;m<f;m+=3){const M=m,v=m+1,_=m+2;i=Ms(this,o,e,n,h,c,d,M,v,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Th(r,e,t,n,i,s,o,a){let l;if(e.side===Rt?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===On,a),l===null)return null;xs.copy(a),xs.applyMatrix4(r.matrixWorld);const h=t.ray.origin.distanceTo(xs);return h<t.near||h>t.far?null:{distance:h,point:xs.clone(),object:r}}function Ms(r,e,t,n,i,s,o,a,l,h){r.getVertexPosition(a,di),r.getVertexPosition(l,ui),r.getVertexPosition(h,fi);const c=Th(r,e,t,n,di,ui,fi,_s);if(c){i&&(gs.fromBufferAttribute(i,a),vs.fromBufferAttribute(i,l),ys.fromBufferAttribute(i,h),c.uv=zt.getInterpolation(_s,di,ui,fi,gs,vs,ys,new ae)),s&&(gs.fromBufferAttribute(s,a),vs.fromBufferAttribute(s,l),ys.fromBufferAttribute(s,h),c.uv1=zt.getInterpolation(_s,di,ui,fi,gs,vs,ys,new ae),c.uv2=c.uv1),o&&(ya.fromBufferAttribute(o,a),_a.fromBufferAttribute(o,l),xa.fromBufferAttribute(o,h),c.normal=zt.getInterpolation(_s,di,ui,fi,ya,_a,xa,new b),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));const d={a,b:l,c:h,normal:new b,materialIndex:0};zt.getNormal(di,ui,fi,d.normal),c.face=d}return c}class et extends rt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],h=[],c=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Xe(h,3)),this.setAttribute("normal",new Xe(c,3)),this.setAttribute("uv",new Xe(d,2));function g(y,m,f,M,v,_,E,T,x,D,S){const A=_/x,F=E/D,G=_/2,Z=E/2,R=T/2,O=x+1,X=D+1;let H=0,J=0;const Y=new b;for(let $=0;$<X;$++){const U=$*F-Z;for(let V=0;V<O;V++){const he=V*A-G;Y[y]=he*M,Y[m]=U*v,Y[f]=R,h.push(Y.x,Y.y,Y.z),Y[y]=0,Y[m]=0,Y[f]=T>0?1:-1,c.push(Y.x,Y.y,Y.z),d.push(V/x),d.push(1-$/D),H+=1}}for(let $=0;$<D;$++)for(let U=0;U<x;U++){const V=u+U+O*$,he=u+U+O*($+1),ue=u+(U+1)+O*($+1),me=u+(U+1)+O*$;l.push(V,he,me),l.push(he,ue,me),J+=6}a.addGroup(p,J,S),p+=J,u+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new et(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Pi(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Ct(r){const e={};for(let t=0;t<r.length;t++){const n=Pi(r[t]);for(const i in n)e[i]=n[i]}return e}function Ah(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Pl(r){return r.getRenderTarget()===null?r.outputColorSpace:qe.workingColorSpace}const Dl={clone:Pi,merge:Ct};var Ch=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ph=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Nn extends yn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ch,this.fragmentShader=Ph,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Pi(e.uniforms),this.uniformsGroups=Ah(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Rl extends at{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=pn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Bt extends Rl{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Qi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(wi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qi*2*Math.atan(Math.tan(wi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(wi*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,h=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/h,i*=o.width/l,n*=o.height/h}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const pi=-90,mi=1;class Dh extends at{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Bt(pi,mi,e,t);i.layers=this.layers,this.add(i);const s=new Bt(pi,mi,e,t);s.layers=this.layers,this.add(s);const o=new Bt(pi,mi,e,t);o.layers=this.layers,this.add(o);const a=new Bt(pi,mi,e,t);a.layers=this.layers,this.add(a);const l=new Bt(pi,mi,e,t);l.layers=this.layers,this.add(l);const h=new Bt(pi,mi,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const h of t)this.remove(h);if(e===pn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Vs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,h,c]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,h),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),e.render(t,c),e.setRenderTarget(d,u,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Ll extends Lt{constructor(e,t,n,i,s,o,a,l,h,c){e=e!==void 0?e:[],t=t!==void 0?t:Ti,super(e,t,n,i,s,o,a,l,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Rh extends Jn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(qi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Kn?ft:Xt),this.texture=new Ll(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ht}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new et(5,5,5),s=new Nn({name:"CubemapFromEquirect",uniforms:Pi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Rt,blending:Rn});s.uniforms.tEquirect.value=t;const o=new te(i,s),a=t.minFilter;return t.minFilter===Ki&&(t.minFilter=Ht),new Dh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const Dr=new b,Lh=new b,Ih=new Be;class Vt{constructor(e=new b(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Dr.subVectors(n,t).cross(Lh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Dr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ih.getNormalMatrix(e),i=this.coplanarPoint(Dr).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hn=new es,Ss=new b;class po{constructor(e=new Vt,t=new Vt,n=new Vt,i=new Vt,s=new Vt,o=new Vt){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=pn){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],h=i[4],c=i[5],d=i[6],u=i[7],p=i[8],g=i[9],y=i[10],m=i[11],f=i[12],M=i[13],v=i[14],_=i[15];if(n[0].setComponents(l-s,u-h,m-p,_-f).normalize(),n[1].setComponents(l+s,u+h,m+p,_+f).normalize(),n[2].setComponents(l+o,u+c,m+g,_+M).normalize(),n[3].setComponents(l-o,u-c,m-g,_-M).normalize(),n[4].setComponents(l-a,u-d,m-y,_-v).normalize(),t===pn)n[5].setComponents(l+a,u+d,m+y,_+v).normalize();else if(t===Vs)n[5].setComponents(a,d,y,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(e){return Hn.center.set(0,0,0),Hn.radius=.7071067811865476,Hn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ss.x=i.normal.x>0?e.max.x:e.min.x,Ss.y=i.normal.y>0?e.max.y:e.min.y,Ss.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ss)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Il(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Uh(r,e){const t=e.isWebGL2,n=new WeakMap;function i(h,c){const d=h.array,u=h.usage,p=r.createBuffer();r.bindBuffer(c,p),r.bufferData(c,d,u),h.onUploadCallback();let g;if(d instanceof Float32Array)g=r.FLOAT;else if(d instanceof Uint16Array)if(h.isFloat16BufferAttribute)if(t)g=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)g=r.SHORT;else if(d instanceof Uint32Array)g=r.UNSIGNED_INT;else if(d instanceof Int32Array)g=r.INT;else if(d instanceof Int8Array)g=r.BYTE;else if(d instanceof Uint8Array)g=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)g=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:p,type:g,bytesPerElement:d.BYTES_PER_ELEMENT,version:h.version}}function s(h,c,d){const u=c.array,p=c.updateRange;r.bindBuffer(d,h),p.count===-1?r.bufferSubData(d,0,u):(t?r.bufferSubData(d,p.offset*u.BYTES_PER_ELEMENT,u,p.offset,p.count):r.bufferSubData(d,p.offset*u.BYTES_PER_ELEMENT,u.subarray(p.offset,p.offset+p.count)),p.count=-1),c.onUploadCallback()}function o(h){return h.isInterleavedBufferAttribute&&(h=h.data),n.get(h)}function a(h){h.isInterleavedBufferAttribute&&(h=h.data);const c=n.get(h);c&&(r.deleteBuffer(c.buffer),n.delete(h))}function l(h,c){if(h.isGLBufferAttribute){const u=n.get(h);(!u||u.version<h.version)&&n.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}h.isInterleavedBufferAttribute&&(h=h.data);const d=n.get(h);d===void 0?n.set(h,i(h,c)):d.version<h.version&&(s(d.buffer,h,c),d.version=h.version)}return{get:o,remove:a,update:l}}class Di extends rt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),h=a+1,c=l+1,d=e/a,u=t/l,p=[],g=[],y=[],m=[];for(let f=0;f<c;f++){const M=f*u-o;for(let v=0;v<h;v++){const _=v*d-s;g.push(_,-M,0),y.push(0,0,1),m.push(v/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<a;M++){const v=M+h*f,_=M+h*(f+1),E=M+1+h*(f+1),T=M+1+h*f;p.push(v,_,T),p.push(_,E,T)}this.setIndex(p),this.setAttribute("position",new Xe(g,3)),this.setAttribute("normal",new Xe(y,3)),this.setAttribute("uv",new Xe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Di(e.width,e.height,e.widthSegments,e.heightSegments)}}var Oh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,kh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,jh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Yh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,qh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,$h=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Kh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Qh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ed=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,td=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,nd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,id=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,sd=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,rd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,od=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ad=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ld=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cd="gl_FragColor = linearToOutputTexel( gl_FragColor );",hd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,dd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ud=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,fd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,pd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,md=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_d=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Md=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Sd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ed=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Td=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ad=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Cd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`,Ld=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Id=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ud=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Od=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Nd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Fd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Bd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,kd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Vd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,qd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,$d=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Zd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Kd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Jd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,tu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,nu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,iu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,su=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ru=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ou=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,au=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,lu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,du=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,uu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pu=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,mu=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,gu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,yu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_u=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,xu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mu=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Su=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Eu=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Tu=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Au=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Cu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Du=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ru=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Lu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Iu=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ou=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zu=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Bu=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,ku=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Gu=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Hu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wu=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xu=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ju=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Yu=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qu=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$u=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zu=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ku=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ju=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Qu=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ef=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,of=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,af=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cf=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,df=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,uf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fe={alphahash_fragment:Oh,alphahash_pars_fragment:Nh,alphamap_fragment:Fh,alphamap_pars_fragment:zh,alphatest_fragment:Bh,alphatest_pars_fragment:kh,aomap_fragment:Gh,aomap_pars_fragment:Hh,begin_vertex:Vh,beginnormal_vertex:Wh,bsdfs:Xh,iridescence_fragment:jh,bumpmap_pars_fragment:Yh,clipping_planes_fragment:qh,clipping_planes_pars_fragment:$h,clipping_planes_pars_vertex:Zh,clipping_planes_vertex:Kh,color_fragment:Jh,color_pars_fragment:Qh,color_pars_vertex:ed,color_vertex:td,common:nd,cube_uv_reflection_fragment:id,defaultnormal_vertex:sd,displacementmap_pars_vertex:rd,displacementmap_vertex:od,emissivemap_fragment:ad,emissivemap_pars_fragment:ld,colorspace_fragment:cd,colorspace_pars_fragment:hd,envmap_fragment:dd,envmap_common_pars_fragment:ud,envmap_pars_fragment:fd,envmap_pars_vertex:pd,envmap_physical_pars_fragment:Td,envmap_vertex:md,fog_vertex:gd,fog_pars_vertex:vd,fog_fragment:yd,fog_pars_fragment:_d,gradientmap_pars_fragment:xd,lightmap_fragment:Md,lightmap_pars_fragment:Sd,lights_lambert_fragment:bd,lights_lambert_pars_fragment:wd,lights_pars_begin:Ed,lights_toon_fragment:Ad,lights_toon_pars_fragment:Cd,lights_phong_fragment:Pd,lights_phong_pars_fragment:Dd,lights_physical_fragment:Rd,lights_physical_pars_fragment:Ld,lights_fragment_begin:Id,lights_fragment_maps:Ud,lights_fragment_end:Od,logdepthbuf_fragment:Nd,logdepthbuf_pars_fragment:Fd,logdepthbuf_pars_vertex:zd,logdepthbuf_vertex:Bd,map_fragment:kd,map_pars_fragment:Gd,map_particle_fragment:Hd,map_particle_pars_fragment:Vd,metalnessmap_fragment:Wd,metalnessmap_pars_fragment:Xd,morphcolor_vertex:jd,morphnormal_vertex:Yd,morphtarget_pars_vertex:qd,morphtarget_vertex:$d,normal_fragment_begin:Zd,normal_fragment_maps:Kd,normal_pars_fragment:Jd,normal_pars_vertex:Qd,normal_vertex:eu,normalmap_pars_fragment:tu,clearcoat_normal_fragment_begin:nu,clearcoat_normal_fragment_maps:iu,clearcoat_pars_fragment:su,iridescence_pars_fragment:ru,opaque_fragment:ou,packing:au,premultiplied_alpha_fragment:lu,project_vertex:cu,dithering_fragment:hu,dithering_pars_fragment:du,roughnessmap_fragment:uu,roughnessmap_pars_fragment:fu,shadowmap_pars_fragment:pu,shadowmap_pars_vertex:mu,shadowmap_vertex:gu,shadowmask_pars_fragment:vu,skinbase_vertex:yu,skinning_pars_vertex:_u,skinning_vertex:xu,skinnormal_vertex:Mu,specularmap_fragment:Su,specularmap_pars_fragment:bu,tonemapping_fragment:wu,tonemapping_pars_fragment:Eu,transmission_fragment:Tu,transmission_pars_fragment:Au,uv_pars_fragment:Cu,uv_pars_vertex:Pu,uv_vertex:Du,worldpos_vertex:Ru,background_vert:Lu,background_frag:Iu,backgroundCube_vert:Uu,backgroundCube_frag:Ou,cube_vert:Nu,cube_frag:Fu,depth_vert:zu,depth_frag:Bu,distanceRGBA_vert:ku,distanceRGBA_frag:Gu,equirect_vert:Hu,equirect_frag:Vu,linedashed_vert:Wu,linedashed_frag:Xu,meshbasic_vert:ju,meshbasic_frag:Yu,meshlambert_vert:qu,meshlambert_frag:$u,meshmatcap_vert:Zu,meshmatcap_frag:Ku,meshnormal_vert:Ju,meshnormal_frag:Qu,meshphong_vert:ef,meshphong_frag:tf,meshphysical_vert:nf,meshphysical_frag:sf,meshtoon_vert:rf,meshtoon_frag:of,points_vert:af,points_frag:lf,shadow_vert:cf,shadow_frag:hf,sprite_vert:df,sprite_frag:uf},ce={common:{diffuse:{value:new ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new ge(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},nn={basic:{uniforms:Ct([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Ct([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new ge(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Ct([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new ge(0)},specular:{value:new ge(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Ct([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Ct([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new ge(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Ct([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Ct([ce.points,ce.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Ct([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Ct([ce.common,ce.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Ct([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Ct([ce.sprite,ce.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:Ct([ce.common,ce.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:Ct([ce.lights,ce.fog,{color:{value:new ge(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};nn.physical={uniforms:Ct([nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new ge(0)},specularColor:{value:new ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const bs={r:0,b:0,g:0};function ff(r,e,t,n,i,s,o){const a=new ge(0);let l=s===!0?0:1,h,c,d=null,u=0,p=null;function g(m,f){let M=!1,v=f.isScene===!0?f.background:null;v&&v.isTexture&&(v=(f.backgroundBlurriness>0?t:e).get(v)),v===null?y(a,l):v&&v.isColor&&(y(v,1),M=!0);const _=r.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,o):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||M)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Ks)?(c===void 0&&(c=new te(new et(1,1,1),new Nn({name:"BackgroundCubeMaterial",uniforms:Pi(nn.backgroundCube.uniforms),vertexShader:nn.backgroundCube.vertexShader,fragmentShader:nn.backgroundCube.fragmentShader,side:Rt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,T,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=qe.getTransfer(v.colorSpace)!==Qe,(d!==v||u!==v.version||p!==r.toneMapping)&&(c.material.needsUpdate=!0,d=v,u=v.version,p=r.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(h===void 0&&(h=new te(new Di(2,2),new Nn({name:"BackgroundMaterial",uniforms:Pi(nn.background.uniforms),vertexShader:nn.background.vertexShader,fragmentShader:nn.background.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(h)),h.material.uniforms.t2D.value=v,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=qe.getTransfer(v.colorSpace)!==Qe,v.matrixAutoUpdate===!0&&v.updateMatrix(),h.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||u!==v.version||p!==r.toneMapping)&&(h.material.needsUpdate=!0,d=v,u=v.version,p=r.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null))}function y(m,f){m.getRGB(bs,Pl(r)),n.buffers.color.setClear(bs.r,bs.g,bs.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),l=f,y(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,y(a,l)},render:g}}function pf(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=m(null);let h=l,c=!1;function d(R,O,X,H,J){let Y=!1;if(o){const $=y(H,X,O);h!==$&&(h=$,p(h.object)),Y=f(R,H,X,J),Y&&M(R,H,X,J)}else{const $=O.wireframe===!0;(h.geometry!==H.id||h.program!==X.id||h.wireframe!==$)&&(h.geometry=H.id,h.program=X.id,h.wireframe=$,Y=!0)}J!==null&&t.update(J,r.ELEMENT_ARRAY_BUFFER),(Y||c)&&(c=!1,D(R,O,X,H),J!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function u(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function p(R){return n.isWebGL2?r.bindVertexArray(R):s.bindVertexArrayOES(R)}function g(R){return n.isWebGL2?r.deleteVertexArray(R):s.deleteVertexArrayOES(R)}function y(R,O,X){const H=X.wireframe===!0;let J=a[R.id];J===void 0&&(J={},a[R.id]=J);let Y=J[O.id];Y===void 0&&(Y={},J[O.id]=Y);let $=Y[H];return $===void 0&&($=m(u()),Y[H]=$),$}function m(R){const O=[],X=[],H=[];for(let J=0;J<i;J++)O[J]=0,X[J]=0,H[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:X,attributeDivisors:H,object:R,attributes:{},index:null}}function f(R,O,X,H){const J=h.attributes,Y=O.attributes;let $=0;const U=X.getAttributes();for(const V in U)if(U[V].location>=0){const ue=J[V];let me=Y[V];if(me===void 0&&(V==="instanceMatrix"&&R.instanceMatrix&&(me=R.instanceMatrix),V==="instanceColor"&&R.instanceColor&&(me=R.instanceColor)),ue===void 0||ue.attribute!==me||me&&ue.data!==me.data)return!0;$++}return h.attributesNum!==$||h.index!==H}function M(R,O,X,H){const J={},Y=O.attributes;let $=0;const U=X.getAttributes();for(const V in U)if(U[V].location>=0){let ue=Y[V];ue===void 0&&(V==="instanceMatrix"&&R.instanceMatrix&&(ue=R.instanceMatrix),V==="instanceColor"&&R.instanceColor&&(ue=R.instanceColor));const me={};me.attribute=ue,ue&&ue.data&&(me.data=ue.data),J[V]=me,$++}h.attributes=J,h.attributesNum=$,h.index=H}function v(){const R=h.newAttributes;for(let O=0,X=R.length;O<X;O++)R[O]=0}function _(R){E(R,0)}function E(R,O){const X=h.newAttributes,H=h.enabledAttributes,J=h.attributeDivisors;X[R]=1,H[R]===0&&(r.enableVertexAttribArray(R),H[R]=1),J[R]!==O&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](R,O),J[R]=O)}function T(){const R=h.newAttributes,O=h.enabledAttributes;for(let X=0,H=O.length;X<H;X++)O[X]!==R[X]&&(r.disableVertexAttribArray(X),O[X]=0)}function x(R,O,X,H,J,Y,$){$===!0?r.vertexAttribIPointer(R,O,X,J,Y):r.vertexAttribPointer(R,O,X,H,J,Y)}function D(R,O,X,H){if(n.isWebGL2===!1&&(R.isInstancedMesh||H.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const J=H.attributes,Y=X.getAttributes(),$=O.defaultAttributeValues;for(const U in Y){const V=Y[U];if(V.location>=0){let he=J[U];if(he===void 0&&(U==="instanceMatrix"&&R.instanceMatrix&&(he=R.instanceMatrix),U==="instanceColor"&&R.instanceColor&&(he=R.instanceColor)),he!==void 0){const ue=he.normalized,me=he.itemSize,Te=t.get(he);if(Te===void 0)continue;const ke=Te.buffer,Ae=Te.type,Re=Te.bytesPerElement,Je=n.isWebGL2===!0&&(Ae===r.INT||Ae===r.UNSIGNED_INT||he.gpuType===ml);if(he.isInterleavedBufferAttribute){const Ne=he.data,z=Ne.stride,xt=he.offset;if(Ne.isInstancedInterleavedBuffer){for(let Se=0;Se<V.locationSize;Se++)E(V.location+Se,Ne.meshPerAttribute);R.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=Ne.meshPerAttribute*Ne.count)}else for(let Se=0;Se<V.locationSize;Se++)_(V.location+Se);r.bindBuffer(r.ARRAY_BUFFER,ke);for(let Se=0;Se<V.locationSize;Se++)x(V.location+Se,me/V.locationSize,Ae,ue,z*Re,(xt+me/V.locationSize*Se)*Re,Je)}else{if(he.isInstancedBufferAttribute){for(let Ne=0;Ne<V.locationSize;Ne++)E(V.location+Ne,he.meshPerAttribute);R.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Ne=0;Ne<V.locationSize;Ne++)_(V.location+Ne);r.bindBuffer(r.ARRAY_BUFFER,ke);for(let Ne=0;Ne<V.locationSize;Ne++)x(V.location+Ne,me/V.locationSize,Ae,ue,me*Re,me/V.locationSize*Ne*Re,Je)}}else if($!==void 0){const ue=$[U];if(ue!==void 0)switch(ue.length){case 2:r.vertexAttrib2fv(V.location,ue);break;case 3:r.vertexAttrib3fv(V.location,ue);break;case 4:r.vertexAttrib4fv(V.location,ue);break;default:r.vertexAttrib1fv(V.location,ue)}}}}T()}function S(){G();for(const R in a){const O=a[R];for(const X in O){const H=O[X];for(const J in H)g(H[J].object),delete H[J];delete O[X]}delete a[R]}}function A(R){if(a[R.id]===void 0)return;const O=a[R.id];for(const X in O){const H=O[X];for(const J in H)g(H[J].object),delete H[J];delete O[X]}delete a[R.id]}function F(R){for(const O in a){const X=a[O];if(X[R.id]===void 0)continue;const H=X[R.id];for(const J in H)g(H[J].object),delete H[J];delete X[R.id]}}function G(){Z(),c=!0,h!==l&&(h=l,p(h.object))}function Z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:G,resetDefaultState:Z,dispose:S,releaseStatesOfGeometry:A,releaseStatesOfProgram:F,initAttributes:v,enableAttribute:_,disableUnusedAttributes:T}}function mf(r,e,t,n){const i=n.isWebGL2;let s;function o(h){s=h}function a(h,c){r.drawArrays(s,h,c),t.update(c,s,1)}function l(h,c,d){if(d===0)return;let u,p;if(i)u=r,p="drawArraysInstanced";else if(u=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",u===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}u[p](s,h,c,d),t.update(c,s,d)}this.setMode=o,this.render=a,this.renderInstances=l}function gf(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const x=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(x){if(x==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const h=o||e.has("WEBGL_draw_buffers"),c=t.logarithmicDepthBuffer===!0,d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),y=r.getParameter(r.MAX_VERTEX_ATTRIBS),m=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),f=r.getParameter(r.MAX_VARYING_VECTORS),M=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),v=u>0,_=o||e.has("OES_texture_float"),E=v&&_,T=o?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:h,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:c,maxTextures:d,maxVertexTextures:u,maxTextureSize:p,maxCubemapSize:g,maxAttributes:y,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:M,vertexTextures:v,floatFragmentTextures:_,floatVertexTextures:E,maxSamples:T}}function vf(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Vt,a=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||n!==0||i;return i=u,n=d.length,p},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=c(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,f=r.get(d);if(!i||g===null||g.length===0||s&&!m)s?c(null):h();else{const M=s?0:n,v=M*4;let _=f.clippingState||null;l.value=_,_=c(g,u,v,p);for(let E=0;E!==v;++E)_[E]=t[E];f.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function h(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function c(d,u,p,g){const y=d!==null?d.length:0;let m=null;if(y!==0){if(m=l.value,g!==!0||m===null){const f=p+y*4,M=u.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let v=0,_=p;v!==y;++v,_+=4)o.copy(d[v]).applyMatrix4(M,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function yf(r){let e=new WeakMap;function t(o,a){return a===Kr?o.mapping=Ti:a===Jr&&(o.mapping=Ai),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){const a=o.mapping;if(a===Kr||a===Jr)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const h=new Rh(l.height/2);return h.fromEquirectangularTexture(r,o),e.set(o,h),o.addEventListener("dispose",i),t(h.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Ul extends Rl{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=h*this.view.offsetX,o=s+h*this.view.width,a-=c*this.view.offsetY,l=a-c*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Mi=4,Ma=[.125,.215,.35,.446,.526,.582],Yn=20,Rr=new Ul,Sa=new ge;let Lr=null,Ir=0,Ur=0;const Wn=(1+Math.sqrt(5))/2,gi=1/Wn,ba=[new b(1,1,1),new b(-1,1,1),new b(1,1,-1),new b(-1,1,-1),new b(0,Wn,gi),new b(0,Wn,-gi),new b(gi,0,Wn),new b(-gi,0,Wn),new b(Wn,gi,0),new b(-Wn,gi,0)];class wa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Lr=this._renderer.getRenderTarget(),Ir=this._renderer.getActiveCubeFace(),Ur=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Aa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ta(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Lr,Ir,Ur),e.scissorTest=!1,ws(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ti||e.mapping===Ai?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lr=this._renderer.getRenderTarget(),Ir=this._renderer.getActiveCubeFace(),Ur=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ht,minFilter:Ht,generateMipmaps:!1,type:Ji,format:Kt,colorSpace:gn,depthBuffer:!1},i=Ea(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ea(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_f(s)),this._blurMaterial=xf(s,e,t)}return i}_compileMaterial(e){const t=new te(this._lodPlanes[0],e);this._renderer.compile(t,Rr)}_sceneToCubeUV(e,t,n,i){const a=new Bt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],c=this._renderer,d=c.autoClear,u=c.toneMapping;c.getClearColor(Sa),c.toneMapping=Ln,c.autoClear=!1;const p=new Dt({name:"PMREM.Background",side:Rt,depthWrite:!1,depthTest:!1}),g=new te(new et,p);let y=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,y=!0):(p.color.copy(Sa),y=!0);for(let f=0;f<6;f++){const M=f%3;M===0?(a.up.set(0,l[f],0),a.lookAt(h[f],0,0)):M===1?(a.up.set(0,0,l[f]),a.lookAt(0,h[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,h[f]));const v=this._cubeSize;ws(i,M*v,f>2?v:0,v,v),c.setRenderTarget(i),y&&c.render(g,a),c.render(e,a)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=u,c.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ti||e.mapping===Ai;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Aa()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ta());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new te(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;ws(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Rr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=ba[(i-1)%ba.length];this._blur(e,i-1,i,s,o)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,h=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,d=new te(this._lodPlanes[i],h),u=h.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Yn-1),y=s/g,m=isFinite(s)?1+Math.floor(c*y):Yn;m>Yn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yn}`);const f=[];let M=0;for(let x=0;x<Yn;++x){const D=x/y,S=Math.exp(-D*D/2);f.push(S),x===0?M+=S:x<m&&(M+=2*S)}for(let x=0;x<f.length;x++)f[x]=f[x]/M;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:v}=this;u.dTheta.value=g,u.mipInt.value=v-n;const _=this._sizeLods[i],E=3*_*(i>v-Mi?i-v+Mi:0),T=4*(this._cubeSize-_);ws(t,E,T,3*_,2*_),l.setRenderTarget(t),l.render(d,Rr)}}function _f(r){const e=[],t=[],n=[];let i=r;const s=r-Mi+1+Ma.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Mi?l=Ma[o-r+Mi-1]:o===0&&(l=0),n.push(l);const h=1/(a-2),c=-h,d=1+h,u=[c,c,d,c,d,d,c,c,d,d,c,d],p=6,g=6,y=3,m=2,f=1,M=new Float32Array(y*g*p),v=new Float32Array(m*g*p),_=new Float32Array(f*g*p);for(let T=0;T<p;T++){const x=T%3*2/3-1,D=T>2?0:-1,S=[x,D,0,x+2/3,D,0,x+2/3,D+1,0,x,D,0,x+2/3,D+1,0,x,D+1,0];M.set(S,y*g*T),v.set(u,m*g*T);const A=[T,T,T,T,T,T];_.set(A,f*g*T)}const E=new rt;E.setAttribute("position",new jt(M,y)),E.setAttribute("uv",new jt(v,m)),E.setAttribute("faceIndex",new jt(_,f)),e.push(E),i>Mi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ea(r,e,t){const n=new Jn(r,e,t);return n.texture.mapping=Ks,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ws(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function xf(r,e,t){const n=new Float32Array(Yn),i=new b(0,1,0);return new Nn({name:"SphericalGaussianBlur",defines:{n:Yn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Ta(){return new Nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Aa(){return new Nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function mo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Mf(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,h=l===Kr||l===Jr,c=l===Ti||l===Ai;if(h||c)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return t===null&&(t=new wa(r)),d=h?t.fromEquirectangular(a,d):t.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{const d=a.image;if(h&&d&&d.height>0||c&&d&&i(d)){t===null&&(t=new wa(r));const u=h?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,u),a.addEventListener("dispose",s),u.texture}else return null}}}return a}function i(a){let l=0;const h=6;for(let c=0;c<h;c++)a[c]!==void 0&&l++;return l===h}function s(a){const l=a.target;l.removeEventListener("dispose",s);const h=e.get(l);h!==void 0&&(e.delete(l),h.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Sf(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function bf(r,e,t,n){const i={},s=new WeakMap;function o(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const y=u.morphAttributes[g];for(let m=0,f=y.length;m<f;m++)e.remove(y[m])}u.removeEventListener("dispose",o),delete i[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)e.update(u[g],r.ARRAY_BUFFER);const p=d.morphAttributes;for(const g in p){const y=p[g];for(let m=0,f=y.length;m<f;m++)e.update(y[m],r.ARRAY_BUFFER)}}function h(d){const u=[],p=d.index,g=d.attributes.position;let y=0;if(p!==null){const M=p.array;y=p.version;for(let v=0,_=M.length;v<_;v+=3){const E=M[v+0],T=M[v+1],x=M[v+2];u.push(E,T,T,x,x,E)}}else if(g!==void 0){const M=g.array;y=g.version;for(let v=0,_=M.length/3-1;v<_;v+=3){const E=v+0,T=v+1,x=v+2;u.push(E,T,T,x,x,E)}}else return;const m=new(Sl(u)?Cl:Al)(u,1);m.version=y;const f=s.get(d);f&&e.remove(f),s.set(d,m)}function c(d){const u=s.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&h(d)}else h(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:c}}function wf(r,e,t,n){const i=n.isWebGL2;let s;function o(u){s=u}let a,l;function h(u){a=u.type,l=u.bytesPerElement}function c(u,p){r.drawElements(s,p,a,u*l),t.update(p,s,1)}function d(u,p,g){if(g===0)return;let y,m;if(i)y=r,m="drawElementsInstanced";else if(y=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",y===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}y[m](s,p,a,u*l,g),t.update(p,s,g)}this.setMode=o,this.setIndex=h,this.render=c,this.renderInstances=d}function Ef(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Tf(r,e){return r[0]-e[0]}function Af(r,e){return Math.abs(e[1])-Math.abs(r[1])}function Cf(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,o=new st,a=[];for(let h=0;h<8;h++)a[h]=[h,0];function l(h,c,d){const u=h.morphTargetInfluences;if(e.isWebGL2===!0){const g=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,y=g!==void 0?g.length:0;let m=s.get(c);if(m===void 0||m.count!==y){let O=function(){Z.dispose(),s.delete(c),c.removeEventListener("dispose",O)};var p=O;m!==void 0&&m.texture.dispose();const v=c.morphAttributes.position!==void 0,_=c.morphAttributes.normal!==void 0,E=c.morphAttributes.color!==void 0,T=c.morphAttributes.position||[],x=c.morphAttributes.normal||[],D=c.morphAttributes.color||[];let S=0;v===!0&&(S=1),_===!0&&(S=2),E===!0&&(S=3);let A=c.attributes.position.count*S,F=1;A>e.maxTextureSize&&(F=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const G=new Float32Array(A*F*4*y),Z=new El(G,A,F,y);Z.type=Pn,Z.needsUpdate=!0;const R=S*4;for(let X=0;X<y;X++){const H=T[X],J=x[X],Y=D[X],$=A*F*4*X;for(let U=0;U<H.count;U++){const V=U*R;v===!0&&(o.fromBufferAttribute(H,U),G[$+V+0]=o.x,G[$+V+1]=o.y,G[$+V+2]=o.z,G[$+V+3]=0),_===!0&&(o.fromBufferAttribute(J,U),G[$+V+4]=o.x,G[$+V+5]=o.y,G[$+V+6]=o.z,G[$+V+7]=0),E===!0&&(o.fromBufferAttribute(Y,U),G[$+V+8]=o.x,G[$+V+9]=o.y,G[$+V+10]=o.z,G[$+V+11]=Y.itemSize===4?o.w:1)}}m={count:y,texture:Z,size:new ae(A,F)},s.set(c,m),c.addEventListener("dispose",O)}let f=0;for(let v=0;v<u.length;v++)f+=u[v];const M=c.morphTargetsRelative?1:1-f;d.getUniforms().setValue(r,"morphTargetBaseInfluence",M),d.getUniforms().setValue(r,"morphTargetInfluences",u),d.getUniforms().setValue(r,"morphTargetsTexture",m.texture,t),d.getUniforms().setValue(r,"morphTargetsTextureSize",m.size)}else{const g=u===void 0?0:u.length;let y=n[c.id];if(y===void 0||y.length!==g){y=[];for(let _=0;_<g;_++)y[_]=[_,0];n[c.id]=y}for(let _=0;_<g;_++){const E=y[_];E[0]=_,E[1]=u[_]}y.sort(Af);for(let _=0;_<8;_++)_<g&&y[_][1]?(a[_][0]=y[_][0],a[_][1]=y[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(Tf);const m=c.morphAttributes.position,f=c.morphAttributes.normal;let M=0;for(let _=0;_<8;_++){const E=a[_],T=E[0],x=E[1];T!==Number.MAX_SAFE_INTEGER&&x?(m&&c.getAttribute("morphTarget"+_)!==m[T]&&c.setAttribute("morphTarget"+_,m[T]),f&&c.getAttribute("morphNormal"+_)!==f[T]&&c.setAttribute("morphNormal"+_,f[T]),i[_]=x,M+=x):(m&&c.hasAttribute("morphTarget"+_)===!0&&c.deleteAttribute("morphTarget"+_),f&&c.hasAttribute("morphNormal"+_)===!0&&c.deleteAttribute("morphNormal"+_),i[_]=0)}const v=c.morphTargetsRelative?1:1-M;d.getUniforms().setValue(r,"morphTargetBaseInfluence",v),d.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function Pf(r,e,t,n){let i=new WeakMap;function s(l){const h=n.render.frame,c=l.geometry,d=e.get(l,c);if(i.get(d)!==h&&(e.update(d),i.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==h&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,h))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==h&&(u.update(),i.set(u,h))}return d}function o(){i=new WeakMap}function a(l){const h=l.target;h.removeEventListener("dispose",a),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:s,dispose:o}}const Ol=new Lt,Nl=new El,Fl=new mh,zl=new Ll,Ca=[],Pa=[],Da=new Float32Array(16),Ra=new Float32Array(9),La=new Float32Array(4);function Li(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Ca[i];if(s===void 0&&(s=new Float32Array(i),Ca[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function mt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function gt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function tr(r,e){let t=Pa[e];t===void 0&&(t=new Int32Array(e),Pa[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Df(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Rf(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;r.uniform2fv(this.addr,e),gt(t,e)}}function Lf(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;r.uniform3fv(this.addr,e),gt(t,e)}}function If(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;r.uniform4fv(this.addr,e),gt(t,e)}}function Uf(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;La.set(n),r.uniformMatrix2fv(this.addr,!1,La),gt(t,n)}}function Of(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Ra.set(n),r.uniformMatrix3fv(this.addr,!1,Ra),gt(t,n)}}function Nf(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Da.set(n),r.uniformMatrix4fv(this.addr,!1,Da),gt(t,n)}}function Ff(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function zf(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;r.uniform2iv(this.addr,e),gt(t,e)}}function Bf(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;r.uniform3iv(this.addr,e),gt(t,e)}}function kf(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;r.uniform4iv(this.addr,e),gt(t,e)}}function Gf(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Hf(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;r.uniform2uiv(this.addr,e),gt(t,e)}}function Vf(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;r.uniform3uiv(this.addr,e),gt(t,e)}}function Wf(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;r.uniform4uiv(this.addr,e),gt(t,e)}}function Xf(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2D(e||Ol,i)}function jf(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Fl,i)}function Yf(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||zl,i)}function qf(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Nl,i)}function $f(r){switch(r){case 5126:return Df;case 35664:return Rf;case 35665:return Lf;case 35666:return If;case 35674:return Uf;case 35675:return Of;case 35676:return Nf;case 5124:case 35670:return Ff;case 35667:case 35671:return zf;case 35668:case 35672:return Bf;case 35669:case 35673:return kf;case 5125:return Gf;case 36294:return Hf;case 36295:return Vf;case 36296:return Wf;case 35678:case 36198:case 36298:case 36306:case 35682:return Xf;case 35679:case 36299:case 36307:return jf;case 35680:case 36300:case 36308:case 36293:return Yf;case 36289:case 36303:case 36311:case 36292:return qf}}function Zf(r,e){r.uniform1fv(this.addr,e)}function Kf(r,e){const t=Li(e,this.size,2);r.uniform2fv(this.addr,t)}function Jf(r,e){const t=Li(e,this.size,3);r.uniform3fv(this.addr,t)}function Qf(r,e){const t=Li(e,this.size,4);r.uniform4fv(this.addr,t)}function ep(r,e){const t=Li(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function tp(r,e){const t=Li(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function np(r,e){const t=Li(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function ip(r,e){r.uniform1iv(this.addr,e)}function sp(r,e){r.uniform2iv(this.addr,e)}function rp(r,e){r.uniform3iv(this.addr,e)}function op(r,e){r.uniform4iv(this.addr,e)}function ap(r,e){r.uniform1uiv(this.addr,e)}function lp(r,e){r.uniform2uiv(this.addr,e)}function cp(r,e){r.uniform3uiv(this.addr,e)}function hp(r,e){r.uniform4uiv(this.addr,e)}function dp(r,e,t){const n=this.cache,i=e.length,s=tr(t,i);mt(n,s)||(r.uniform1iv(this.addr,s),gt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Ol,s[o])}function up(r,e,t){const n=this.cache,i=e.length,s=tr(t,i);mt(n,s)||(r.uniform1iv(this.addr,s),gt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Fl,s[o])}function fp(r,e,t){const n=this.cache,i=e.length,s=tr(t,i);mt(n,s)||(r.uniform1iv(this.addr,s),gt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||zl,s[o])}function pp(r,e,t){const n=this.cache,i=e.length,s=tr(t,i);mt(n,s)||(r.uniform1iv(this.addr,s),gt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Nl,s[o])}function mp(r){switch(r){case 5126:return Zf;case 35664:return Kf;case 35665:return Jf;case 35666:return Qf;case 35674:return ep;case 35675:return tp;case 35676:return np;case 5124:case 35670:return ip;case 35667:case 35671:return sp;case 35668:case 35672:return rp;case 35669:case 35673:return op;case 5125:return ap;case 36294:return lp;case 36295:return cp;case 36296:return hp;case 35678:case 36198:case 36298:case 36306:case 35682:return dp;case 35679:case 36299:case 36307:return up;case 35680:case 36300:case 36308:case 36293:return fp;case 36289:case 36303:case 36311:case 36292:return pp}}class gp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=$f(t.type)}}class vp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=mp(t.type)}}class yp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Or=/(\w+)(\])?(\[|\.)?/g;function Ia(r,e){r.seq.push(e),r.map[e.id]=e}function _p(r,e,t){const n=r.name,i=n.length;for(Or.lastIndex=0;;){const s=Or.exec(n),o=Or.lastIndex;let a=s[1];const l=s[2]==="]",h=s[3];if(l&&(a=a|0),h===void 0||h==="["&&o+2===i){Ia(t,h===void 0?new gp(a,r,e):new vp(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new yp(a),Ia(t,d)),t=d}}}class Fs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);_p(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Ua(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const xp=37297;let Mp=0;function Sp(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function bp(r){const e=qe.getPrimaries(qe.workingColorSpace),t=qe.getPrimaries(r);let n;switch(e===t?n="":e===Hs&&t===Gs?n="LinearDisplayP3ToLinearSRGB":e===Gs&&t===Hs&&(n="LinearSRGBToLinearDisplayP3"),r){case gn:case Qs:return[n,"LinearTransferOETF"];case ft:case ho:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Oa(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Sp(r.getShaderSource(e),o)}else return i}function wp(r,e){const t=bp(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Ep(r,e){let t;switch(e){case Ec:t="Linear";break;case Tc:t="Reinhard";break;case Ac:t="OptimizedCineon";break;case lo:t="ACESFilmic";break;case Cc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Tp(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Wi).join(`
`)}function Ap(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Cp(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Wi(r){return r!==""}function Na(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fa(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Pp=/^[ \t]*#include +<([\w\d./]+)>/gm;function so(r){return r.replace(Pp,Rp)}const Dp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Rp(r,e){let t=Fe[e];if(t===void 0){const n=Dp.get(e);if(n!==void 0)t=Fe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return so(t)}const Lp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function za(r){return r.replace(Lp,Ip)}function Ip(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Ba(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Up(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===ul?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===fl?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===dn&&(e="SHADOWMAP_TYPE_VSM"),e}function Op(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Ti:case Ai:e="ENVMAP_TYPE_CUBE";break;case Ks:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Np(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Ai:e="ENVMAP_MODE_REFRACTION";break}return e}function Fp(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Zs:e="ENVMAP_BLENDING_MULTIPLY";break;case bc:e="ENVMAP_BLENDING_MIX";break;case wc:e="ENVMAP_BLENDING_ADD";break}return e}function zp(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Bp(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Up(t),h=Op(t),c=Np(t),d=Fp(t),u=zp(t),p=t.isWebGL2?"":Tp(t),g=Ap(s),y=i.createProgram();let m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Wi).join(`
`),m.length>0&&(m+=`
`),f=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Wi).join(`
`),f.length>0&&(f+=`
`)):(m=[Ba(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wi).join(`
`),f=[p,Ba(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ln?"#define TONE_MAPPING":"",t.toneMapping!==Ln?Fe.tonemapping_pars_fragment:"",t.toneMapping!==Ln?Ep("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,wp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Wi).join(`
`)),o=so(o),o=Na(o,t),o=Fa(o,t),a=so(a),a=Na(a,t),a=Fa(a,t),o=za(o),a=za(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===ia?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ia?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const v=M+m+o,_=M+f+a,E=Ua(i,i.VERTEX_SHADER,v),T=Ua(i,i.FRAGMENT_SHADER,_);i.attachShader(y,E),i.attachShader(y,T),t.index0AttributeName!==void 0?i.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function x(F){if(r.debug.checkShaderErrors){const G=i.getProgramInfoLog(y).trim(),Z=i.getShaderInfoLog(E).trim(),R=i.getShaderInfoLog(T).trim();let O=!0,X=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(O=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,y,E,T);else{const H=Oa(i,E,"vertex"),J=Oa(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Program Info Log: `+G+`
`+H+`
`+J)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(Z===""||R==="")&&(X=!1);X&&(F.diagnostics={runnable:O,programLog:G,vertexShader:{log:Z,prefix:m},fragmentShader:{log:R,prefix:f}})}i.deleteShader(E),i.deleteShader(T),D=new Fs(i,y),S=Cp(i,y)}let D;this.getUniforms=function(){return D===void 0&&x(this),D};let S;this.getAttributes=function(){return S===void 0&&x(this),S};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=i.getProgramParameter(y,xp)),A},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Mp++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=E,this.fragmentShader=T,this}let kp=0;class Gp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Hp(e),t.set(e,n)),n}}class Hp{constructor(e){this.id=kp++,this.code=e,this.usedTimes=0}}function Vp(r,e,t,n,i,s,o){const a=new fo,l=new Gp,h=[],c=i.isWebGL2,d=i.logarithmicDepthBuffer,u=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(S){return S===0?"uv":`uv${S}`}function m(S,A,F,G,Z){const R=G.fog,O=Z.geometry,X=S.isMeshStandardMaterial?G.environment:null,H=(S.isMeshStandardMaterial?t:e).get(S.envMap||X),J=H&&H.mapping===Ks?H.image.height:null,Y=g[S.type];S.precision!==null&&(p=i.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const $=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,U=$!==void 0?$.length:0;let V=0;O.morphAttributes.position!==void 0&&(V=1),O.morphAttributes.normal!==void 0&&(V=2),O.morphAttributes.color!==void 0&&(V=3);let he,ue,me,Te;if(Y){const ht=nn[Y];he=ht.vertexShader,ue=ht.fragmentShader}else he=S.vertexShader,ue=S.fragmentShader,l.update(S),me=l.getVertexShaderID(S),Te=l.getFragmentShaderID(S);const ke=r.getRenderTarget(),Ae=Z.isInstancedMesh===!0,Re=!!S.map,Je=!!S.matcap,Ne=!!H,z=!!S.aoMap,xt=!!S.lightMap,Se=!!S.bumpMap,Ce=!!S.normalMap,Pe=!!S.displacementMap,nt=!!S.emissiveMap,Ue=!!S.metalnessMap,Le=!!S.roughnessMap,We=S.anisotropy>0,ct=S.clearcoat>0,vt=S.iridescence>0,P=S.sheen>0,w=S.transmission>0,B=We&&!!S.anisotropyMap,ne=ct&&!!S.clearcoatMap,Q=ct&&!!S.clearcoatNormalMap,ie=ct&&!!S.clearcoatRoughnessMap,ye=vt&&!!S.iridescenceMap,oe=vt&&!!S.iridescenceThicknessMap,de=P&&!!S.sheenColorMap,L=P&&!!S.sheenRoughnessMap,re=!!S.specularMap,K=!!S.specularColorMap,we=!!S.specularIntensityMap,_e=w&&!!S.transmissionMap,be=w&&!!S.thicknessMap,ve=!!S.gradientMap,pe=!!S.alphaMap,Ge=S.alphaTest>0,I=!!S.alphaHash,le=!!S.extensions,ee=!!O.attributes.uv1,q=!!O.attributes.uv2,se=!!O.attributes.uv3;let Me=Ln;return S.toneMapped&&(ke===null||ke.isXRRenderTarget===!0)&&(Me=r.toneMapping),{isWebGL2:c,shaderID:Y,shaderType:S.type,shaderName:S.name,vertexShader:he,fragmentShader:ue,defines:S.defines,customVertexShaderID:me,customFragmentShaderID:Te,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,instancing:Ae,instancingColor:Ae&&Z.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:ke===null?r.outputColorSpace:ke.isXRRenderTarget===!0?ke.texture.colorSpace:gn,map:Re,matcap:Je,envMap:Ne,envMapMode:Ne&&H.mapping,envMapCubeUVHeight:J,aoMap:z,lightMap:xt,bumpMap:Se,normalMap:Ce,displacementMap:u&&Pe,emissiveMap:nt,normalMapObjectSpace:Ce&&S.normalMapType===Gc,normalMapTangentSpace:Ce&&S.normalMapType===Js,metalnessMap:Ue,roughnessMap:Le,anisotropy:We,anisotropyMap:B,clearcoat:ct,clearcoatMap:ne,clearcoatNormalMap:Q,clearcoatRoughnessMap:ie,iridescence:vt,iridescenceMap:ye,iridescenceThicknessMap:oe,sheen:P,sheenColorMap:de,sheenRoughnessMap:L,specularMap:re,specularColorMap:K,specularIntensityMap:we,transmission:w,transmissionMap:_e,thicknessMap:be,gradientMap:ve,opaque:S.transparent===!1&&S.blending===bi,alphaMap:pe,alphaTest:Ge,alphaHash:I,combine:S.combine,mapUv:Re&&y(S.map.channel),aoMapUv:z&&y(S.aoMap.channel),lightMapUv:xt&&y(S.lightMap.channel),bumpMapUv:Se&&y(S.bumpMap.channel),normalMapUv:Ce&&y(S.normalMap.channel),displacementMapUv:Pe&&y(S.displacementMap.channel),emissiveMapUv:nt&&y(S.emissiveMap.channel),metalnessMapUv:Ue&&y(S.metalnessMap.channel),roughnessMapUv:Le&&y(S.roughnessMap.channel),anisotropyMapUv:B&&y(S.anisotropyMap.channel),clearcoatMapUv:ne&&y(S.clearcoatMap.channel),clearcoatNormalMapUv:Q&&y(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&y(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&y(S.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&y(S.iridescenceThicknessMap.channel),sheenColorMapUv:de&&y(S.sheenColorMap.channel),sheenRoughnessMapUv:L&&y(S.sheenRoughnessMap.channel),specularMapUv:re&&y(S.specularMap.channel),specularColorMapUv:K&&y(S.specularColorMap.channel),specularIntensityMapUv:we&&y(S.specularIntensityMap.channel),transmissionMapUv:_e&&y(S.transmissionMap.channel),thicknessMapUv:be&&y(S.thicknessMap.channel),alphaMapUv:pe&&y(S.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Ce||We),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:ee,vertexUv2s:q,vertexUv3s:se,pointsUvs:Z.isPoints===!0&&!!O.attributes.uv&&(Re||pe),fog:!!R,useFog:S.fog===!0,fogExp2:R&&R.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:Z.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:U,morphTextureStride:V,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:Me,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Re&&S.map.isVideoTexture===!0&&qe.getTransfer(S.map.colorSpace)===Qe,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Wt,flipSided:S.side===Rt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:le&&S.extensions.derivatives===!0,extensionFragDepth:le&&S.extensions.fragDepth===!0,extensionDrawBuffers:le&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:le&&S.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:c||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:c||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:c||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function f(S){const A=[];if(S.shaderID?A.push(S.shaderID):(A.push(S.customVertexShaderID),A.push(S.customFragmentShaderID)),S.defines!==void 0)for(const F in S.defines)A.push(F),A.push(S.defines[F]);return S.isRawShaderMaterial===!1&&(M(A,S),v(A,S),A.push(r.outputColorSpace)),A.push(S.customProgramCacheKey),A.join()}function M(S,A){S.push(A.precision),S.push(A.outputColorSpace),S.push(A.envMapMode),S.push(A.envMapCubeUVHeight),S.push(A.mapUv),S.push(A.alphaMapUv),S.push(A.lightMapUv),S.push(A.aoMapUv),S.push(A.bumpMapUv),S.push(A.normalMapUv),S.push(A.displacementMapUv),S.push(A.emissiveMapUv),S.push(A.metalnessMapUv),S.push(A.roughnessMapUv),S.push(A.anisotropyMapUv),S.push(A.clearcoatMapUv),S.push(A.clearcoatNormalMapUv),S.push(A.clearcoatRoughnessMapUv),S.push(A.iridescenceMapUv),S.push(A.iridescenceThicknessMapUv),S.push(A.sheenColorMapUv),S.push(A.sheenRoughnessMapUv),S.push(A.specularMapUv),S.push(A.specularColorMapUv),S.push(A.specularIntensityMapUv),S.push(A.transmissionMapUv),S.push(A.thicknessMapUv),S.push(A.combine),S.push(A.fogExp2),S.push(A.sizeAttenuation),S.push(A.morphTargetsCount),S.push(A.morphAttributeCount),S.push(A.numDirLights),S.push(A.numPointLights),S.push(A.numSpotLights),S.push(A.numSpotLightMaps),S.push(A.numHemiLights),S.push(A.numRectAreaLights),S.push(A.numDirLightShadows),S.push(A.numPointLightShadows),S.push(A.numSpotLightShadows),S.push(A.numSpotLightShadowsWithMaps),S.push(A.numLightProbes),S.push(A.shadowMapType),S.push(A.toneMapping),S.push(A.numClippingPlanes),S.push(A.numClipIntersection),S.push(A.depthPacking)}function v(S,A){a.disableAll(),A.isWebGL2&&a.enable(0),A.supportsVertexTextures&&a.enable(1),A.instancing&&a.enable(2),A.instancingColor&&a.enable(3),A.matcap&&a.enable(4),A.envMap&&a.enable(5),A.normalMapObjectSpace&&a.enable(6),A.normalMapTangentSpace&&a.enable(7),A.clearcoat&&a.enable(8),A.iridescence&&a.enable(9),A.alphaTest&&a.enable(10),A.vertexColors&&a.enable(11),A.vertexAlphas&&a.enable(12),A.vertexUv1s&&a.enable(13),A.vertexUv2s&&a.enable(14),A.vertexUv3s&&a.enable(15),A.vertexTangents&&a.enable(16),A.anisotropy&&a.enable(17),A.alphaHash&&a.enable(18),S.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.skinning&&a.enable(4),A.morphTargets&&a.enable(5),A.morphNormals&&a.enable(6),A.morphColors&&a.enable(7),A.premultipliedAlpha&&a.enable(8),A.shadowMapEnabled&&a.enable(9),A.useLegacyLights&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),S.push(a.mask)}function _(S){const A=g[S.type];let F;if(A){const G=nn[A];F=Dl.clone(G.uniforms)}else F=S.uniforms;return F}function E(S,A){let F;for(let G=0,Z=h.length;G<Z;G++){const R=h[G];if(R.cacheKey===A){F=R,++F.usedTimes;break}}return F===void 0&&(F=new Bp(r,A,S,s),h.push(F)),F}function T(S){if(--S.usedTimes===0){const A=h.indexOf(S);h[A]=h[h.length-1],h.pop(),S.destroy()}}function x(S){l.remove(S)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:_,acquireProgram:E,releaseProgram:T,releaseShaderCache:x,programs:h,dispose:D}}function Wp(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Xp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function ka(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Ga(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,u,p,g,y,m){let f=r[e];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:g,renderOrder:d.renderOrder,z:y,group:m},r[e]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=y,f.group=m),e++,f}function a(d,u,p,g,y,m){const f=o(d,u,p,g,y,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):t.push(f)}function l(d,u,p,g,y,m){const f=o(d,u,p,g,y,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):t.unshift(f)}function h(d,u){t.length>1&&t.sort(d||Xp),n.length>1&&n.sort(u||ka),i.length>1&&i.sort(u||ka)}function c(){for(let d=e,u=r.length;d<u;d++){const p=r[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:c,sort:h}}function jp(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Ga,r.set(n,[o])):i>=s.length?(o=new Ga,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function Yp(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new b,color:new ge};break;case"SpotLight":t={position:new b,direction:new b,color:new ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new b,color:new ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new b,skyColor:new ge,groundColor:new ge};break;case"RectAreaLight":t={color:new ge,position:new b,halfWidth:new b,halfHeight:new b};break}return r[e.id]=t,t}}}function qp(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let $p=0;function Zp(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Kp(r,e){const t=new Yp,n=qp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new b);const s=new b,o=new tt,a=new tt;function l(c,d){let u=0,p=0,g=0;for(let G=0;G<9;G++)i.probe[G].set(0,0,0);let y=0,m=0,f=0,M=0,v=0,_=0,E=0,T=0,x=0,D=0,S=0;c.sort(Zp);const A=d===!0?Math.PI:1;for(let G=0,Z=c.length;G<Z;G++){const R=c[G],O=R.color,X=R.intensity,H=R.distance,J=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=O.r*X*A,p+=O.g*X*A,g+=O.b*X*A;else if(R.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(R.sh.coefficients[Y],X);S++}else if(R.isDirectionalLight){const Y=t.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity*A),R.castShadow){const $=R.shadow,U=n.get(R);U.shadowBias=$.bias,U.shadowNormalBias=$.normalBias,U.shadowRadius=$.radius,U.shadowMapSize=$.mapSize,i.directionalShadow[y]=U,i.directionalShadowMap[y]=J,i.directionalShadowMatrix[y]=R.shadow.matrix,_++}i.directional[y]=Y,y++}else if(R.isSpotLight){const Y=t.get(R);Y.position.setFromMatrixPosition(R.matrixWorld),Y.color.copy(O).multiplyScalar(X*A),Y.distance=H,Y.coneCos=Math.cos(R.angle),Y.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),Y.decay=R.decay,i.spot[f]=Y;const $=R.shadow;if(R.map&&(i.spotLightMap[x]=R.map,x++,$.updateMatrices(R),R.castShadow&&D++),i.spotLightMatrix[f]=$.matrix,R.castShadow){const U=n.get(R);U.shadowBias=$.bias,U.shadowNormalBias=$.normalBias,U.shadowRadius=$.radius,U.shadowMapSize=$.mapSize,i.spotShadow[f]=U,i.spotShadowMap[f]=J,T++}f++}else if(R.isRectAreaLight){const Y=t.get(R);Y.color.copy(O).multiplyScalar(X),Y.halfWidth.set(R.width*.5,0,0),Y.halfHeight.set(0,R.height*.5,0),i.rectArea[M]=Y,M++}else if(R.isPointLight){const Y=t.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity*A),Y.distance=R.distance,Y.decay=R.decay,R.castShadow){const $=R.shadow,U=n.get(R);U.shadowBias=$.bias,U.shadowNormalBias=$.normalBias,U.shadowRadius=$.radius,U.shadowMapSize=$.mapSize,U.shadowCameraNear=$.camera.near,U.shadowCameraFar=$.camera.far,i.pointShadow[m]=U,i.pointShadowMap[m]=J,i.pointShadowMatrix[m]=R.shadow.matrix,E++}i.point[m]=Y,m++}else if(R.isHemisphereLight){const Y=t.get(R);Y.skyColor.copy(R.color).multiplyScalar(X*A),Y.groundColor.copy(R.groundColor).multiplyScalar(X*A),i.hemi[v]=Y,v++}}M>0&&(e.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=u,i.ambient[1]=p,i.ambient[2]=g;const F=i.hash;(F.directionalLength!==y||F.pointLength!==m||F.spotLength!==f||F.rectAreaLength!==M||F.hemiLength!==v||F.numDirectionalShadows!==_||F.numPointShadows!==E||F.numSpotShadows!==T||F.numSpotMaps!==x||F.numLightProbes!==S)&&(i.directional.length=y,i.spot.length=f,i.rectArea.length=M,i.point.length=m,i.hemi.length=v,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=T+x-D,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=D,i.numLightProbes=S,F.directionalLength=y,F.pointLength=m,F.spotLength=f,F.rectAreaLength=M,F.hemiLength=v,F.numDirectionalShadows=_,F.numPointShadows=E,F.numSpotShadows=T,F.numSpotMaps=x,F.numLightProbes=S,i.version=$p++)}function h(c,d){let u=0,p=0,g=0,y=0,m=0;const f=d.matrixWorldInverse;for(let M=0,v=c.length;M<v;M++){const _=c[M];if(_.isDirectionalLight){const E=i.directional[u];E.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(f),u++}else if(_.isSpotLight){const E=i.spot[g];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(f),E.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(f),g++}else if(_.isRectAreaLight){const E=i.rectArea[y];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(f),a.identity(),o.copy(_.matrixWorld),o.premultiply(f),a.extractRotation(o),E.halfWidth.set(_.width*.5,0,0),E.halfHeight.set(0,_.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),y++}else if(_.isPointLight){const E=i.point[p];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(f),p++}else if(_.isHemisphereLight){const E=i.hemi[m];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(f),m++}}}return{setup:l,setupView:h,state:i}}function Ha(r,e){const t=new Kp(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function o(d){n.push(d)}function a(d){i.push(d)}function l(d){t.setup(n,d)}function h(d){t.setupView(n,d)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a}}function Jp(r,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new Ha(r,e),t.set(s,[l])):o>=a.length?(l=new Ha(r,e),a.push(l)):l=a[o],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class Qp extends yn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class em extends yn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const tm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function im(r,e,t){let n=new po;const i=new ae,s=new ae,o=new st,a=new Qp({depthPacking:kc}),l=new em,h={},c=t.maxTextureSize,d={[On]:Rt,[Rt]:On,[Wt]:Wt},u=new Nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:tm,fragmentShader:nm}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new rt;g.setAttribute("position",new jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new te(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ul;let f=this.type;this.render=function(E,T,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const D=r.getRenderTarget(),S=r.getActiveCubeFace(),A=r.getActiveMipmapLevel(),F=r.state;F.setBlending(Rn),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const G=f!==dn&&this.type===dn,Z=f===dn&&this.type!==dn;for(let R=0,O=E.length;R<O;R++){const X=E[R],H=X.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const J=H.getFrameExtents();if(i.multiply(J),s.copy(H.mapSize),(i.x>c||i.y>c)&&(i.x>c&&(s.x=Math.floor(c/J.x),i.x=s.x*J.x,H.mapSize.x=s.x),i.y>c&&(s.y=Math.floor(c/J.y),i.y=s.y*J.y,H.mapSize.y=s.y)),H.map===null||G===!0||Z===!0){const $=this.type!==dn?{minFilter:Pt,magFilter:Pt}:{};H.map!==null&&H.map.dispose(),H.map=new Jn(i.x,i.y,$),H.map.texture.name=X.name+".shadowMap",H.camera.updateProjectionMatrix()}r.setRenderTarget(H.map),r.clear();const Y=H.getViewportCount();for(let $=0;$<Y;$++){const U=H.getViewport($);o.set(s.x*U.x,s.y*U.y,s.x*U.z,s.y*U.w),F.viewport(o),H.updateMatrices(X,$),n=H.getFrustum(),_(T,x,H.camera,X,this.type)}H.isPointLightShadow!==!0&&this.type===dn&&M(H,x),H.needsUpdate=!1}f=this.type,m.needsUpdate=!1,r.setRenderTarget(D,S,A)};function M(E,T){const x=e.update(y);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Jn(i.x,i.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(T,null,x,u,y,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(T,null,x,p,y,null)}function v(E,T,x,D){let S=null;const A=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(A!==void 0)S=A;else if(S=x.isPointLight===!0?l:a,r.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const F=S.uuid,G=T.uuid;let Z=h[F];Z===void 0&&(Z={},h[F]=Z);let R=Z[G];R===void 0&&(R=S.clone(),Z[G]=R),S=R}if(S.visible=T.visible,S.wireframe=T.wireframe,D===dn?S.side=T.shadowSide!==null?T.shadowSide:T.side:S.side=T.shadowSide!==null?T.shadowSide:d[T.side],S.alphaMap=T.alphaMap,S.alphaTest=T.alphaTest,S.map=T.map,S.clipShadows=T.clipShadows,S.clippingPlanes=T.clippingPlanes,S.clipIntersection=T.clipIntersection,S.displacementMap=T.displacementMap,S.displacementScale=T.displacementScale,S.displacementBias=T.displacementBias,S.wireframeLinewidth=T.wireframeLinewidth,S.linewidth=T.linewidth,x.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const F=r.properties.get(S);F.light=x}return S}function _(E,T,x,D,S){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&S===dn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);const G=e.update(E),Z=E.material;if(Array.isArray(Z)){const R=G.groups;for(let O=0,X=R.length;O<X;O++){const H=R[O],J=Z[H.materialIndex];if(J&&J.visible){const Y=v(E,J,D,S);r.renderBufferDirect(x,null,G,Y,E,H)}}}else if(Z.visible){const R=v(E,Z,D,S);r.renderBufferDirect(x,null,G,R,E,null)}}const F=E.children;for(let G=0,Z=F.length;G<Z;G++)_(F[G],T,x,D,S)}}function sm(r,e,t){const n=t.isWebGL2;function i(){let I=!1;const le=new st;let ee=null;const q=new st(0,0,0,0);return{setMask:function(se){ee!==se&&!I&&(r.colorMask(se,se,se,se),ee=se)},setLocked:function(se){I=se},setClear:function(se,Me,He,ht,kt){kt===!0&&(se*=ht,Me*=ht,He*=ht),le.set(se,Me,He,ht),q.equals(le)===!1&&(r.clearColor(se,Me,He,ht),q.copy(le))},reset:function(){I=!1,ee=null,q.set(-1,0,0,0)}}}function s(){let I=!1,le=null,ee=null,q=null;return{setTest:function(se){se?Re(r.DEPTH_TEST):Je(r.DEPTH_TEST)},setMask:function(se){le!==se&&!I&&(r.depthMask(se),le=se)},setFunc:function(se){if(ee!==se){switch(se){case gc:r.depthFunc(r.NEVER);break;case vc:r.depthFunc(r.ALWAYS);break;case yc:r.depthFunc(r.LESS);break;case Bs:r.depthFunc(r.LEQUAL);break;case _c:r.depthFunc(r.EQUAL);break;case xc:r.depthFunc(r.GEQUAL);break;case Mc:r.depthFunc(r.GREATER);break;case Sc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ee=se}},setLocked:function(se){I=se},setClear:function(se){q!==se&&(r.clearDepth(se),q=se)},reset:function(){I=!1,le=null,ee=null,q=null}}}function o(){let I=!1,le=null,ee=null,q=null,se=null,Me=null,He=null,ht=null,kt=null;return{setTest:function(Ze){I||(Ze?Re(r.STENCIL_TEST):Je(r.STENCIL_TEST))},setMask:function(Ze){le!==Ze&&!I&&(r.stencilMask(Ze),le=Ze)},setFunc:function(Ze,Et,Qt){(ee!==Ze||q!==Et||se!==Qt)&&(r.stencilFunc(Ze,Et,Qt),ee=Ze,q=Et,se=Qt)},setOp:function(Ze,Et,Qt){(Me!==Ze||He!==Et||ht!==Qt)&&(r.stencilOp(Ze,Et,Qt),Me=Ze,He=Et,ht=Qt)},setLocked:function(Ze){I=Ze},setClear:function(Ze){kt!==Ze&&(r.clearStencil(Ze),kt=Ze)},reset:function(){I=!1,le=null,ee=null,q=null,se=null,Me=null,He=null,ht=null,kt=null}}}const a=new i,l=new s,h=new o,c=new WeakMap,d=new WeakMap;let u={},p={},g=new WeakMap,y=[],m=null,f=!1,M=null,v=null,_=null,E=null,T=null,x=null,D=null,S=new ge(0,0,0),A=0,F=!1,G=null,Z=null,R=null,O=null,X=null;const H=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,Y=0;const $=r.getParameter(r.VERSION);$.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec($)[1]),J=Y>=1):$.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),J=Y>=2);let U=null,V={};const he=r.getParameter(r.SCISSOR_BOX),ue=r.getParameter(r.VIEWPORT),me=new st().fromArray(he),Te=new st().fromArray(ue);function ke(I,le,ee,q){const se=new Uint8Array(4),Me=r.createTexture();r.bindTexture(I,Me),r.texParameteri(I,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(I,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let He=0;He<ee;He++)n&&(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)?r.texImage3D(le,0,r.RGBA,1,1,q,0,r.RGBA,r.UNSIGNED_BYTE,se):r.texImage2D(le+He,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,se);return Me}const Ae={};Ae[r.TEXTURE_2D]=ke(r.TEXTURE_2D,r.TEXTURE_2D,1),Ae[r.TEXTURE_CUBE_MAP]=ke(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ae[r.TEXTURE_2D_ARRAY]=ke(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ae[r.TEXTURE_3D]=ke(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),h.setClear(0),Re(r.DEPTH_TEST),l.setFunc(Bs),Ue(!1),Le(wo),Re(r.CULL_FACE),Pe(Rn);function Re(I){u[I]!==!0&&(r.enable(I),u[I]=!0)}function Je(I){u[I]!==!1&&(r.disable(I),u[I]=!1)}function Ne(I,le){return p[I]!==le?(r.bindFramebuffer(I,le),p[I]=le,n&&(I===r.DRAW_FRAMEBUFFER&&(p[r.FRAMEBUFFER]=le),I===r.FRAMEBUFFER&&(p[r.DRAW_FRAMEBUFFER]=le)),!0):!1}function z(I,le){let ee=y,q=!1;if(I)if(ee=g.get(le),ee===void 0&&(ee=[],g.set(le,ee)),I.isWebGLMultipleRenderTargets){const se=I.texture;if(ee.length!==se.length||ee[0]!==r.COLOR_ATTACHMENT0){for(let Me=0,He=se.length;Me<He;Me++)ee[Me]=r.COLOR_ATTACHMENT0+Me;ee.length=se.length,q=!0}}else ee[0]!==r.COLOR_ATTACHMENT0&&(ee[0]=r.COLOR_ATTACHMENT0,q=!0);else ee[0]!==r.BACK&&(ee[0]=r.BACK,q=!0);q&&(t.isWebGL2?r.drawBuffers(ee):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ee))}function xt(I){return m!==I?(r.useProgram(I),m=I,!0):!1}const Se={[jn]:r.FUNC_ADD,[tc]:r.FUNC_SUBTRACT,[nc]:r.FUNC_REVERSE_SUBTRACT};if(n)Se[Co]=r.MIN,Se[Po]=r.MAX;else{const I=e.get("EXT_blend_minmax");I!==null&&(Se[Co]=I.MIN_EXT,Se[Po]=I.MAX_EXT)}const Ce={[ic]:r.ZERO,[sc]:r.ONE,[rc]:r.SRC_COLOR,[$r]:r.SRC_ALPHA,[dc]:r.SRC_ALPHA_SATURATE,[cc]:r.DST_COLOR,[ac]:r.DST_ALPHA,[oc]:r.ONE_MINUS_SRC_COLOR,[Zr]:r.ONE_MINUS_SRC_ALPHA,[hc]:r.ONE_MINUS_DST_COLOR,[lc]:r.ONE_MINUS_DST_ALPHA,[uc]:r.CONSTANT_COLOR,[fc]:r.ONE_MINUS_CONSTANT_COLOR,[pc]:r.CONSTANT_ALPHA,[mc]:r.ONE_MINUS_CONSTANT_ALPHA};function Pe(I,le,ee,q,se,Me,He,ht,kt,Ze){if(I===Rn){f===!0&&(Je(r.BLEND),f=!1);return}if(f===!1&&(Re(r.BLEND),f=!0),I!==ec){if(I!==M||Ze!==F){if((v!==jn||T!==jn)&&(r.blendEquation(r.FUNC_ADD),v=jn,T=jn),Ze)switch(I){case bi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Eo:r.blendFunc(r.ONE,r.ONE);break;case To:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ao:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case bi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Eo:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case To:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ao:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}_=null,E=null,x=null,D=null,S.set(0,0,0),A=0,M=I,F=Ze}return}se=se||le,Me=Me||ee,He=He||q,(le!==v||se!==T)&&(r.blendEquationSeparate(Se[le],Se[se]),v=le,T=se),(ee!==_||q!==E||Me!==x||He!==D)&&(r.blendFuncSeparate(Ce[ee],Ce[q],Ce[Me],Ce[He]),_=ee,E=q,x=Me,D=He),(ht.equals(S)===!1||kt!==A)&&(r.blendColor(ht.r,ht.g,ht.b,kt),S.copy(ht),A=kt),M=I,F=!1}function nt(I,le){I.side===Wt?Je(r.CULL_FACE):Re(r.CULL_FACE);let ee=I.side===Rt;le&&(ee=!ee),Ue(ee),I.blending===bi&&I.transparent===!1?Pe(Rn):Pe(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),l.setFunc(I.depthFunc),l.setTest(I.depthTest),l.setMask(I.depthWrite),a.setMask(I.colorWrite);const q=I.stencilWrite;h.setTest(q),q&&(h.setMask(I.stencilWriteMask),h.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),h.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ct(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Re(r.SAMPLE_ALPHA_TO_COVERAGE):Je(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(I){G!==I&&(I?r.frontFace(r.CW):r.frontFace(r.CCW),G=I)}function Le(I){I!==Jl?(Re(r.CULL_FACE),I!==Z&&(I===wo?r.cullFace(r.BACK):I===Ql?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Je(r.CULL_FACE),Z=I}function We(I){I!==R&&(J&&r.lineWidth(I),R=I)}function ct(I,le,ee){I?(Re(r.POLYGON_OFFSET_FILL),(O!==le||X!==ee)&&(r.polygonOffset(le,ee),O=le,X=ee)):Je(r.POLYGON_OFFSET_FILL)}function vt(I){I?Re(r.SCISSOR_TEST):Je(r.SCISSOR_TEST)}function P(I){I===void 0&&(I=r.TEXTURE0+H-1),U!==I&&(r.activeTexture(I),U=I)}function w(I,le,ee){ee===void 0&&(U===null?ee=r.TEXTURE0+H-1:ee=U);let q=V[ee];q===void 0&&(q={type:void 0,texture:void 0},V[ee]=q),(q.type!==I||q.texture!==le)&&(U!==ee&&(r.activeTexture(ee),U=ee),r.bindTexture(I,le||Ae[I]),q.type=I,q.texture=le)}function B(){const I=V[U];I!==void 0&&I.type!==void 0&&(r.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function ne(){try{r.compressedTexImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{r.compressedTexImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ie(){try{r.texSubImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ye(){try{r.texSubImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function oe(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function de(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function L(){try{r.texStorage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function re(){try{r.texStorage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{r.texImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function we(){try{r.texImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _e(I){me.equals(I)===!1&&(r.scissor(I.x,I.y,I.z,I.w),me.copy(I))}function be(I){Te.equals(I)===!1&&(r.viewport(I.x,I.y,I.z,I.w),Te.copy(I))}function ve(I,le){let ee=d.get(le);ee===void 0&&(ee=new WeakMap,d.set(le,ee));let q=ee.get(I);q===void 0&&(q=r.getUniformBlockIndex(le,I.name),ee.set(I,q))}function pe(I,le){const q=d.get(le).get(I);c.get(le)!==q&&(r.uniformBlockBinding(le,q,I.__bindingPointIndex),c.set(le,q))}function Ge(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},U=null,V={},p={},g=new WeakMap,y=[],m=null,f=!1,M=null,v=null,_=null,E=null,T=null,x=null,D=null,S=new ge(0,0,0),A=0,F=!1,G=null,Z=null,R=null,O=null,X=null,me.set(0,0,r.canvas.width,r.canvas.height),Te.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),h.reset()}return{buffers:{color:a,depth:l,stencil:h},enable:Re,disable:Je,bindFramebuffer:Ne,drawBuffers:z,useProgram:xt,setBlending:Pe,setMaterial:nt,setFlipSided:Ue,setCullFace:Le,setLineWidth:We,setPolygonOffset:ct,setScissorTest:vt,activeTexture:P,bindTexture:w,unbindTexture:B,compressedTexImage2D:ne,compressedTexImage3D:Q,texImage2D:K,texImage3D:we,updateUBOMapping:ve,uniformBlockBinding:pe,texStorage2D:L,texStorage3D:re,texSubImage2D:ie,texSubImage3D:ye,compressedTexSubImage2D:oe,compressedTexSubImage3D:de,scissor:_e,viewport:be,reset:Ge}}function rm(r,e,t,n,i,s,o){const a=i.isWebGL2,l=i.maxTextures,h=i.maxCubemapSize,c=i.maxTextureSize,d=i.maxSamples,u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let y;const m=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(P,w){return f?new OffscreenCanvas(P,w):Xs("canvas")}function v(P,w,B,ne){let Q=1;if((P.width>ne||P.height>ne)&&(Q=ne/Math.max(P.width,P.height)),Q<1||w===!0)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap){const ie=w?Ws:Math.floor,ye=ie(Q*P.width),oe=ie(Q*P.height);y===void 0&&(y=M(ye,oe));const de=B?M(ye,oe):y;return de.width=ye,de.height=oe,de.getContext("2d").drawImage(P,0,0,ye,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+ye+"x"+oe+")."),de}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function _(P){return io(P.width)&&io(P.height)}function E(P){return a?!1:P.wrapS!==Zt||P.wrapT!==Zt||P.minFilter!==Pt&&P.minFilter!==Ht}function T(P,w){return P.generateMipmaps&&w&&P.minFilter!==Pt&&P.minFilter!==Ht}function x(P){r.generateMipmap(P)}function D(P,w,B,ne,Q=!1){if(a===!1)return w;if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ie=w;if(w===r.RED&&(B===r.FLOAT&&(ie=r.R32F),B===r.HALF_FLOAT&&(ie=r.R16F),B===r.UNSIGNED_BYTE&&(ie=r.R8)),w===r.RED_INTEGER&&(B===r.UNSIGNED_BYTE&&(ie=r.R8UI),B===r.UNSIGNED_SHORT&&(ie=r.R16UI),B===r.UNSIGNED_INT&&(ie=r.R32UI),B===r.BYTE&&(ie=r.R8I),B===r.SHORT&&(ie=r.R16I),B===r.INT&&(ie=r.R32I)),w===r.RG&&(B===r.FLOAT&&(ie=r.RG32F),B===r.HALF_FLOAT&&(ie=r.RG16F),B===r.UNSIGNED_BYTE&&(ie=r.RG8)),w===r.RGBA){const ye=Q?ks:qe.getTransfer(ne);B===r.FLOAT&&(ie=r.RGBA32F),B===r.HALF_FLOAT&&(ie=r.RGBA16F),B===r.UNSIGNED_BYTE&&(ie=ye===Qe?r.SRGB8_ALPHA8:r.RGBA8),B===r.UNSIGNED_SHORT_4_4_4_4&&(ie=r.RGBA4),B===r.UNSIGNED_SHORT_5_5_5_1&&(ie=r.RGB5_A1)}return(ie===r.R16F||ie===r.R32F||ie===r.RG16F||ie===r.RG32F||ie===r.RGBA16F||ie===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function S(P,w,B){return T(P,B)===!0||P.isFramebufferTexture&&P.minFilter!==Pt&&P.minFilter!==Ht?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function A(P){return P===Pt||P===Do||P===lr?r.NEAREST:r.LINEAR}function F(P){const w=P.target;w.removeEventListener("dispose",F),Z(w),w.isVideoTexture&&g.delete(w)}function G(P){const w=P.target;w.removeEventListener("dispose",G),O(w)}function Z(P){const w=n.get(P);if(w.__webglInit===void 0)return;const B=P.source,ne=m.get(B);if(ne){const Q=ne[w.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&R(P),Object.keys(ne).length===0&&m.delete(B)}n.remove(P)}function R(P){const w=n.get(P);r.deleteTexture(w.__webglTexture);const B=P.source,ne=m.get(B);delete ne[w.__cacheKey],o.memory.textures--}function O(P){const w=P.texture,B=n.get(P),ne=n.get(w);if(ne.__webglTexture!==void 0&&(r.deleteTexture(ne.__webglTexture),o.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(B.__webglFramebuffer[Q]))for(let ie=0;ie<B.__webglFramebuffer[Q].length;ie++)r.deleteFramebuffer(B.__webglFramebuffer[Q][ie]);else r.deleteFramebuffer(B.__webglFramebuffer[Q]);B.__webglDepthbuffer&&r.deleteRenderbuffer(B.__webglDepthbuffer[Q])}else{if(Array.isArray(B.__webglFramebuffer))for(let Q=0;Q<B.__webglFramebuffer.length;Q++)r.deleteFramebuffer(B.__webglFramebuffer[Q]);else r.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&r.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&r.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let Q=0;Q<B.__webglColorRenderbuffer.length;Q++)B.__webglColorRenderbuffer[Q]&&r.deleteRenderbuffer(B.__webglColorRenderbuffer[Q]);B.__webglDepthRenderbuffer&&r.deleteRenderbuffer(B.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let Q=0,ie=w.length;Q<ie;Q++){const ye=n.get(w[Q]);ye.__webglTexture&&(r.deleteTexture(ye.__webglTexture),o.memory.textures--),n.remove(w[Q])}n.remove(w),n.remove(P)}let X=0;function H(){X=0}function J(){const P=X;return P>=l&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+l),X+=1,P}function Y(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function $(P,w){const B=n.get(P);if(P.isVideoTexture&&ct(P),P.isRenderTargetTexture===!1&&P.version>0&&B.__version!==P.version){const ne=P.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Re(B,P,w);return}}t.bindTexture(r.TEXTURE_2D,B.__webglTexture,r.TEXTURE0+w)}function U(P,w){const B=n.get(P);if(P.version>0&&B.__version!==P.version){Re(B,P,w);return}t.bindTexture(r.TEXTURE_2D_ARRAY,B.__webglTexture,r.TEXTURE0+w)}function V(P,w){const B=n.get(P);if(P.version>0&&B.__version!==P.version){Re(B,P,w);return}t.bindTexture(r.TEXTURE_3D,B.__webglTexture,r.TEXTURE0+w)}function he(P,w){const B=n.get(P);if(P.version>0&&B.__version!==P.version){Je(B,P,w);return}t.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+w)}const ue={[Qr]:r.REPEAT,[Zt]:r.CLAMP_TO_EDGE,[eo]:r.MIRRORED_REPEAT},me={[Pt]:r.NEAREST,[Do]:r.NEAREST_MIPMAP_NEAREST,[lr]:r.NEAREST_MIPMAP_LINEAR,[Ht]:r.LINEAR,[Pc]:r.LINEAR_MIPMAP_NEAREST,[Ki]:r.LINEAR_MIPMAP_LINEAR},Te={[Hc]:r.NEVER,[$c]:r.ALWAYS,[Vc]:r.LESS,[Xc]:r.LEQUAL,[Wc]:r.EQUAL,[qc]:r.GEQUAL,[jc]:r.GREATER,[Yc]:r.NOTEQUAL};function ke(P,w,B){if(B?(r.texParameteri(P,r.TEXTURE_WRAP_S,ue[w.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,ue[w.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,ue[w.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,me[w.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,me[w.minFilter])):(r.texParameteri(P,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(P,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(w.wrapS!==Zt||w.wrapT!==Zt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(P,r.TEXTURE_MAG_FILTER,A(w.magFilter)),r.texParameteri(P,r.TEXTURE_MIN_FILTER,A(w.minFilter)),w.minFilter!==Pt&&w.minFilter!==Ht&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),w.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,Te[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ne=e.get("EXT_texture_filter_anisotropic");if(w.magFilter===Pt||w.minFilter!==lr&&w.minFilter!==Ki||w.type===Pn&&e.has("OES_texture_float_linear")===!1||a===!1&&w.type===Ji&&e.has("OES_texture_half_float_linear")===!1)return;(w.anisotropy>1||n.get(w).__currentAnisotropy)&&(r.texParameterf(P,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy)}}function Ae(P,w){let B=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",F));const ne=w.source;let Q=m.get(ne);Q===void 0&&(Q={},m.set(ne,Q));const ie=Y(w);if(ie!==P.__cacheKey){Q[ie]===void 0&&(Q[ie]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,B=!0),Q[ie].usedTimes++;const ye=Q[P.__cacheKey];ye!==void 0&&(Q[P.__cacheKey].usedTimes--,ye.usedTimes===0&&R(w)),P.__cacheKey=ie,P.__webglTexture=Q[ie].texture}return B}function Re(P,w,B){let ne=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ne=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ne=r.TEXTURE_3D);const Q=Ae(P,w),ie=w.source;t.bindTexture(ne,P.__webglTexture,r.TEXTURE0+B);const ye=n.get(ie);if(ie.version!==ye.__version||Q===!0){t.activeTexture(r.TEXTURE0+B);const oe=qe.getPrimaries(qe.workingColorSpace),de=w.colorSpace===Xt?null:qe.getPrimaries(w.colorSpace),L=w.colorSpace===Xt||oe===de?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,L);const re=E(w)&&_(w.image)===!1;let K=v(w.image,re,!1,c);K=vt(w,K);const we=_(K)||a,_e=s.convert(w.format,w.colorSpace);let be=s.convert(w.type),ve=D(w.internalFormat,_e,be,w.colorSpace,w.isVideoTexture);ke(ne,w,we);let pe;const Ge=w.mipmaps,I=a&&w.isVideoTexture!==!0,le=ye.__version===void 0||Q===!0,ee=S(w,K,we);if(w.isDepthTexture)ve=r.DEPTH_COMPONENT,a?w.type===Pn?ve=r.DEPTH_COMPONENT32F:w.type===Cn?ve=r.DEPTH_COMPONENT24:w.type===$n?ve=r.DEPTH24_STENCIL8:ve=r.DEPTH_COMPONENT16:w.type===Pn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),w.format===Zn&&ve===r.DEPTH_COMPONENT&&w.type!==co&&w.type!==Cn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),w.type=Cn,be=s.convert(w.type)),w.format===Ci&&ve===r.DEPTH_COMPONENT&&(ve=r.DEPTH_STENCIL,w.type!==$n&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),w.type=$n,be=s.convert(w.type))),le&&(I?t.texStorage2D(r.TEXTURE_2D,1,ve,K.width,K.height):t.texImage2D(r.TEXTURE_2D,0,ve,K.width,K.height,0,_e,be,null));else if(w.isDataTexture)if(Ge.length>0&&we){I&&le&&t.texStorage2D(r.TEXTURE_2D,ee,ve,Ge[0].width,Ge[0].height);for(let q=0,se=Ge.length;q<se;q++)pe=Ge[q],I?t.texSubImage2D(r.TEXTURE_2D,q,0,0,pe.width,pe.height,_e,be,pe.data):t.texImage2D(r.TEXTURE_2D,q,ve,pe.width,pe.height,0,_e,be,pe.data);w.generateMipmaps=!1}else I?(le&&t.texStorage2D(r.TEXTURE_2D,ee,ve,K.width,K.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,K.width,K.height,_e,be,K.data)):t.texImage2D(r.TEXTURE_2D,0,ve,K.width,K.height,0,_e,be,K.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){I&&le&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ee,ve,Ge[0].width,Ge[0].height,K.depth);for(let q=0,se=Ge.length;q<se;q++)pe=Ge[q],w.format!==Kt?_e!==null?I?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,0,pe.width,pe.height,K.depth,_e,pe.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,q,ve,pe.width,pe.height,K.depth,0,pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?t.texSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,0,pe.width,pe.height,K.depth,_e,be,pe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,q,ve,pe.width,pe.height,K.depth,0,_e,be,pe.data)}else{I&&le&&t.texStorage2D(r.TEXTURE_2D,ee,ve,Ge[0].width,Ge[0].height);for(let q=0,se=Ge.length;q<se;q++)pe=Ge[q],w.format!==Kt?_e!==null?I?t.compressedTexSubImage2D(r.TEXTURE_2D,q,0,0,pe.width,pe.height,_e,pe.data):t.compressedTexImage2D(r.TEXTURE_2D,q,ve,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?t.texSubImage2D(r.TEXTURE_2D,q,0,0,pe.width,pe.height,_e,be,pe.data):t.texImage2D(r.TEXTURE_2D,q,ve,pe.width,pe.height,0,_e,be,pe.data)}else if(w.isDataArrayTexture)I?(le&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ee,ve,K.width,K.height,K.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,_e,be,K.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,ve,K.width,K.height,K.depth,0,_e,be,K.data);else if(w.isData3DTexture)I?(le&&t.texStorage3D(r.TEXTURE_3D,ee,ve,K.width,K.height,K.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,_e,be,K.data)):t.texImage3D(r.TEXTURE_3D,0,ve,K.width,K.height,K.depth,0,_e,be,K.data);else if(w.isFramebufferTexture){if(le)if(I)t.texStorage2D(r.TEXTURE_2D,ee,ve,K.width,K.height);else{let q=K.width,se=K.height;for(let Me=0;Me<ee;Me++)t.texImage2D(r.TEXTURE_2D,Me,ve,q,se,0,_e,be,null),q>>=1,se>>=1}}else if(Ge.length>0&&we){I&&le&&t.texStorage2D(r.TEXTURE_2D,ee,ve,Ge[0].width,Ge[0].height);for(let q=0,se=Ge.length;q<se;q++)pe=Ge[q],I?t.texSubImage2D(r.TEXTURE_2D,q,0,0,_e,be,pe):t.texImage2D(r.TEXTURE_2D,q,ve,_e,be,pe);w.generateMipmaps=!1}else I?(le&&t.texStorage2D(r.TEXTURE_2D,ee,ve,K.width,K.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,_e,be,K)):t.texImage2D(r.TEXTURE_2D,0,ve,_e,be,K);T(w,we)&&x(ne),ye.__version=ie.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Je(P,w,B){if(w.image.length!==6)return;const ne=Ae(P,w),Q=w.source;t.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+B);const ie=n.get(Q);if(Q.version!==ie.__version||ne===!0){t.activeTexture(r.TEXTURE0+B);const ye=qe.getPrimaries(qe.workingColorSpace),oe=w.colorSpace===Xt?null:qe.getPrimaries(w.colorSpace),de=w.colorSpace===Xt||ye===oe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const L=w.isCompressedTexture||w.image[0].isCompressedTexture,re=w.image[0]&&w.image[0].isDataTexture,K=[];for(let q=0;q<6;q++)!L&&!re?K[q]=v(w.image[q],!1,!0,h):K[q]=re?w.image[q].image:w.image[q],K[q]=vt(w,K[q]);const we=K[0],_e=_(we)||a,be=s.convert(w.format,w.colorSpace),ve=s.convert(w.type),pe=D(w.internalFormat,be,ve,w.colorSpace),Ge=a&&w.isVideoTexture!==!0,I=ie.__version===void 0||ne===!0;let le=S(w,we,_e);ke(r.TEXTURE_CUBE_MAP,w,_e);let ee;if(L){Ge&&I&&t.texStorage2D(r.TEXTURE_CUBE_MAP,le,pe,we.width,we.height);for(let q=0;q<6;q++){ee=K[q].mipmaps;for(let se=0;se<ee.length;se++){const Me=ee[se];w.format!==Kt?be!==null?Ge?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,se,0,0,Me.width,Me.height,be,Me.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,se,pe,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,se,0,0,Me.width,Me.height,be,ve,Me.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,se,pe,Me.width,Me.height,0,be,ve,Me.data)}}}else{ee=w.mipmaps,Ge&&I&&(ee.length>0&&le++,t.texStorage2D(r.TEXTURE_CUBE_MAP,le,pe,K[0].width,K[0].height));for(let q=0;q<6;q++)if(re){Ge?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,K[q].width,K[q].height,be,ve,K[q].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,pe,K[q].width,K[q].height,0,be,ve,K[q].data);for(let se=0;se<ee.length;se++){const He=ee[se].image[q].image;Ge?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,se+1,0,0,He.width,He.height,be,ve,He.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,se+1,pe,He.width,He.height,0,be,ve,He.data)}}else{Ge?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,be,ve,K[q]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,pe,be,ve,K[q]);for(let se=0;se<ee.length;se++){const Me=ee[se];Ge?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,se+1,0,0,be,ve,Me.image[q]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,se+1,pe,be,ve,Me.image[q])}}}T(w,_e)&&x(r.TEXTURE_CUBE_MAP),ie.__version=Q.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Ne(P,w,B,ne,Q,ie){const ye=s.convert(B.format,B.colorSpace),oe=s.convert(B.type),de=D(B.internalFormat,ye,oe,B.colorSpace);if(!n.get(w).__hasExternalTextures){const re=Math.max(1,w.width>>ie),K=Math.max(1,w.height>>ie);Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?t.texImage3D(Q,ie,de,re,K,w.depth,0,ye,oe,null):t.texImage2D(Q,ie,de,re,K,0,ye,oe,null)}t.bindFramebuffer(r.FRAMEBUFFER,P),We(w)?u.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ne,Q,n.get(B).__webglTexture,0,Le(w)):(Q===r.TEXTURE_2D||Q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ne,Q,n.get(B).__webglTexture,ie),t.bindFramebuffer(r.FRAMEBUFFER,null)}function z(P,w,B){if(r.bindRenderbuffer(r.RENDERBUFFER,P),w.depthBuffer&&!w.stencilBuffer){let ne=a===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(B||We(w)){const Q=w.depthTexture;Q&&Q.isDepthTexture&&(Q.type===Pn?ne=r.DEPTH_COMPONENT32F:Q.type===Cn&&(ne=r.DEPTH_COMPONENT24));const ie=Le(w);We(w)?u.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ie,ne,w.width,w.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,ie,ne,w.width,w.height)}else r.renderbufferStorage(r.RENDERBUFFER,ne,w.width,w.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,P)}else if(w.depthBuffer&&w.stencilBuffer){const ne=Le(w);B&&We(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ne,r.DEPTH24_STENCIL8,w.width,w.height):We(w)?u.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ne,r.DEPTH24_STENCIL8,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,P)}else{const ne=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let Q=0;Q<ne.length;Q++){const ie=ne[Q],ye=s.convert(ie.format,ie.colorSpace),oe=s.convert(ie.type),de=D(ie.internalFormat,ye,oe,ie.colorSpace),L=Le(w);B&&We(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,L,de,w.width,w.height):We(w)?u.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,L,de,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,de,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function xt(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),$(w.depthTexture,0);const ne=n.get(w.depthTexture).__webglTexture,Q=Le(w);if(w.depthTexture.format===Zn)We(w)?u.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ne,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ne,0);else if(w.depthTexture.format===Ci)We(w)?u.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ne,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Se(P){const w=n.get(P),B=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");xt(w.__webglFramebuffer,P)}else if(B){w.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[ne]),w.__webglDepthbuffer[ne]=r.createRenderbuffer(),z(w.__webglDepthbuffer[ne],P,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=r.createRenderbuffer(),z(w.__webglDepthbuffer,P,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ce(P,w,B){const ne=n.get(P);w!==void 0&&Ne(ne.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),B!==void 0&&Se(P)}function Pe(P){const w=P.texture,B=n.get(P),ne=n.get(w);P.addEventListener("dispose",G),P.isWebGLMultipleRenderTargets!==!0&&(ne.__webglTexture===void 0&&(ne.__webglTexture=r.createTexture()),ne.__version=w.version,o.memory.textures++);const Q=P.isWebGLCubeRenderTarget===!0,ie=P.isWebGLMultipleRenderTargets===!0,ye=_(P)||a;if(Q){B.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(a&&w.mipmaps&&w.mipmaps.length>0){B.__webglFramebuffer[oe]=[];for(let de=0;de<w.mipmaps.length;de++)B.__webglFramebuffer[oe][de]=r.createFramebuffer()}else B.__webglFramebuffer[oe]=r.createFramebuffer()}else{if(a&&w.mipmaps&&w.mipmaps.length>0){B.__webglFramebuffer=[];for(let oe=0;oe<w.mipmaps.length;oe++)B.__webglFramebuffer[oe]=r.createFramebuffer()}else B.__webglFramebuffer=r.createFramebuffer();if(ie)if(i.drawBuffers){const oe=P.texture;for(let de=0,L=oe.length;de<L;de++){const re=n.get(oe[de]);re.__webglTexture===void 0&&(re.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&P.samples>0&&We(P)===!1){const oe=ie?w:[w];B.__webglMultisampledFramebuffer=r.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let de=0;de<oe.length;de++){const L=oe[de];B.__webglColorRenderbuffer[de]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,B.__webglColorRenderbuffer[de]);const re=s.convert(L.format,L.colorSpace),K=s.convert(L.type),we=D(L.internalFormat,re,K,L.colorSpace,P.isXRRenderTarget===!0),_e=Le(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,_e,we,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,B.__webglColorRenderbuffer[de])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(B.__webglDepthRenderbuffer=r.createRenderbuffer(),z(B.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Q){t.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture),ke(r.TEXTURE_CUBE_MAP,w,ye);for(let oe=0;oe<6;oe++)if(a&&w.mipmaps&&w.mipmaps.length>0)for(let de=0;de<w.mipmaps.length;de++)Ne(B.__webglFramebuffer[oe][de],P,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,de);else Ne(B.__webglFramebuffer[oe],P,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);T(w,ye)&&x(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ie){const oe=P.texture;for(let de=0,L=oe.length;de<L;de++){const re=oe[de],K=n.get(re);t.bindTexture(r.TEXTURE_2D,K.__webglTexture),ke(r.TEXTURE_2D,re,ye),Ne(B.__webglFramebuffer,P,re,r.COLOR_ATTACHMENT0+de,r.TEXTURE_2D,0),T(re,ye)&&x(r.TEXTURE_2D)}t.unbindTexture()}else{let oe=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(a?oe=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(oe,ne.__webglTexture),ke(oe,w,ye),a&&w.mipmaps&&w.mipmaps.length>0)for(let de=0;de<w.mipmaps.length;de++)Ne(B.__webglFramebuffer[de],P,w,r.COLOR_ATTACHMENT0,oe,de);else Ne(B.__webglFramebuffer,P,w,r.COLOR_ATTACHMENT0,oe,0);T(w,ye)&&x(oe),t.unbindTexture()}P.depthBuffer&&Se(P)}function nt(P){const w=_(P)||a,B=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let ne=0,Q=B.length;ne<Q;ne++){const ie=B[ne];if(T(ie,w)){const ye=P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,oe=n.get(ie).__webglTexture;t.bindTexture(ye,oe),x(ye),t.unbindTexture()}}}function Ue(P){if(a&&P.samples>0&&We(P)===!1){const w=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],B=P.width,ne=P.height;let Q=r.COLOR_BUFFER_BIT;const ie=[],ye=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,oe=n.get(P),de=P.isWebGLMultipleRenderTargets===!0;if(de)for(let L=0;L<w.length;L++)t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+L,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+L,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let L=0;L<w.length;L++){ie.push(r.COLOR_ATTACHMENT0+L),P.depthBuffer&&ie.push(ye);const re=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(re===!1&&(P.depthBuffer&&(Q|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&(Q|=r.STENCIL_BUFFER_BIT)),de&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,oe.__webglColorRenderbuffer[L]),re===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[ye]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[ye])),de){const K=n.get(w[L]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,K,0)}r.blitFramebuffer(0,0,B,ne,0,0,B,ne,Q,r.NEAREST),p&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ie)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),de)for(let L=0;L<w.length;L++){t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+L,r.RENDERBUFFER,oe.__webglColorRenderbuffer[L]);const re=n.get(w[L]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+L,r.TEXTURE_2D,re,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function Le(P){return Math.min(d,P.samples)}function We(P){const w=n.get(P);return a&&P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function ct(P){const w=o.render.frame;g.get(P)!==w&&(g.set(P,w),P.update())}function vt(P,w){const B=P.colorSpace,ne=P.format,Q=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===no||B!==gn&&B!==Xt&&(qe.getTransfer(B)===Qe?a===!1?e.has("EXT_sRGB")===!0&&ne===Kt?(P.format=no,P.minFilter=Ht,P.generateMipmaps=!1):w=bl.sRGBToLinear(w):(ne!==Kt||Q!==In)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),w}this.allocateTextureUnit=J,this.resetTextureUnits=H,this.setTexture2D=$,this.setTexture2DArray=U,this.setTexture3D=V,this.setTextureCube=he,this.rebindTextures=Ce,this.setupRenderTarget=Pe,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=We}function om(r,e,t){const n=t.isWebGL2;function i(s,o=Xt){let a;const l=qe.getTransfer(o);if(s===In)return r.UNSIGNED_BYTE;if(s===gl)return r.UNSIGNED_SHORT_4_4_4_4;if(s===vl)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Dc)return r.BYTE;if(s===Rc)return r.SHORT;if(s===co)return r.UNSIGNED_SHORT;if(s===ml)return r.INT;if(s===Cn)return r.UNSIGNED_INT;if(s===Pn)return r.FLOAT;if(s===Ji)return n?r.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Lc)return r.ALPHA;if(s===Kt)return r.RGBA;if(s===Ic)return r.LUMINANCE;if(s===Uc)return r.LUMINANCE_ALPHA;if(s===Zn)return r.DEPTH_COMPONENT;if(s===Ci)return r.DEPTH_STENCIL;if(s===no)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Oc)return r.RED;if(s===yl)return r.RED_INTEGER;if(s===Nc)return r.RG;if(s===_l)return r.RG_INTEGER;if(s===xl)return r.RGBA_INTEGER;if(s===cr||s===hr||s===dr||s===ur)if(l===Qe)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===cr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===hr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===dr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===ur)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===cr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===hr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===dr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===ur)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ro||s===Lo||s===Io||s===Uo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Ro)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Lo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Io)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Uo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Fc)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Oo||s===No)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Oo)return l===Qe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===No)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Fo||s===zo||s===Bo||s===ko||s===Go||s===Ho||s===Vo||s===Wo||s===Xo||s===jo||s===Yo||s===qo||s===$o||s===Zo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Fo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===zo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Bo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===ko)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Go)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Ho)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Vo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Wo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Xo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===jo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Yo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===qo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===$o)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Zo)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===fr||s===Ko||s===Jo)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===fr)return l===Qe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Ko)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Jo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===zc||s===Qo||s===ea||s===ta)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===fr)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Qo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===ea)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===ta)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===$n?n?r.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class am extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Dn extends at{constructor(){super(),this.isGroup=!0,this.type="Group"}}const lm={type:"move"};class Nr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){o=!0;for(const y of e.hand.values()){const m=t.getJointPose(y,n),f=this._getHandJoint(h,y);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const c=h.joints["index-finger-tip"],d=h.joints["thumb-tip"],u=c.position.distanceTo(d.position),p=.02,g=.005;h.inputState.pinching&&u>p+g?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&u<=p-g&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(lm)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Dn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class cm extends Lt{constructor(e,t,n,i,s,o,a,l,h,c){if(c=c!==void 0?c:Zn,c!==Zn&&c!==Ci)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&c===Zn&&(n=Cn),n===void 0&&c===Ci&&(n=$n),super(null,i,s,o,a,l,c,n,h),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Pt,this.minFilter=l!==void 0?l:Pt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class hm extends ei{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,h=null,c=null,d=null,u=null,p=null,g=null;const y=t.getContextAttributes();let m=null,f=null;const M=[],v=[],_=new Bt;_.layers.enable(1),_.viewport=new st;const E=new Bt;E.layers.enable(2),E.viewport=new st;const T=[_,E],x=new am;x.layers.enable(1),x.layers.enable(2);let D=null,S=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let V=M[U];return V===void 0&&(V=new Nr,M[U]=V),V.getTargetRaySpace()},this.getControllerGrip=function(U){let V=M[U];return V===void 0&&(V=new Nr,M[U]=V),V.getGripSpace()},this.getHand=function(U){let V=M[U];return V===void 0&&(V=new Nr,M[U]=V),V.getHandSpace()};function A(U){const V=v.indexOf(U.inputSource);if(V===-1)return;const he=M[V];he!==void 0&&(he.update(U.inputSource,U.frame,h||o),he.dispatchEvent({type:U.type,data:U.inputSource}))}function F(){i.removeEventListener("select",A),i.removeEventListener("selectstart",A),i.removeEventListener("selectend",A),i.removeEventListener("squeeze",A),i.removeEventListener("squeezestart",A),i.removeEventListener("squeezeend",A),i.removeEventListener("end",F),i.removeEventListener("inputsourceschange",G);for(let U=0;U<M.length;U++){const V=v[U];V!==null&&(v[U]=null,M[U].disconnect(V))}D=null,S=null,e.setRenderTarget(m),p=null,u=null,d=null,i=null,f=null,$.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){s=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){a=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(U){h=U},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(U){if(i=U,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",A),i.addEventListener("selectstart",A),i.addEventListener("selectend",A),i.addEventListener("squeeze",A),i.addEventListener("squeezestart",A),i.addEventListener("squeezeend",A),i.addEventListener("end",F),i.addEventListener("inputsourceschange",G),y.xrCompatible!==!0&&await t.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const V={antialias:i.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,t,V),i.updateRenderState({baseLayer:p}),f=new Jn(p.framebufferWidth,p.framebufferHeight,{format:Kt,type:In,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let V=null,he=null,ue=null;y.depth&&(ue=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,V=y.stencil?Ci:Zn,he=y.stencil?$n:Cn);const me={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:s};d=new XRWebGLBinding(i,t),u=d.createProjectionLayer(me),i.updateRenderState({layers:[u]}),f=new Jn(u.textureWidth,u.textureHeight,{format:Kt,type:In,depthTexture:new cm(u.textureWidth,u.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,V),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0});const Te=e.properties.get(f);Te.__ignoreDepthValues=u.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),h=null,o=await i.requestReferenceSpace(a),$.setContext(i),$.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function G(U){for(let V=0;V<U.removed.length;V++){const he=U.removed[V],ue=v.indexOf(he);ue>=0&&(v[ue]=null,M[ue].disconnect(he))}for(let V=0;V<U.added.length;V++){const he=U.added[V];let ue=v.indexOf(he);if(ue===-1){for(let Te=0;Te<M.length;Te++)if(Te>=v.length){v.push(he),ue=Te;break}else if(v[Te]===null){v[Te]=he,ue=Te;break}if(ue===-1)break}const me=M[ue];me&&me.connect(he)}}const Z=new b,R=new b;function O(U,V,he){Z.setFromMatrixPosition(V.matrixWorld),R.setFromMatrixPosition(he.matrixWorld);const ue=Z.distanceTo(R),me=V.projectionMatrix.elements,Te=he.projectionMatrix.elements,ke=me[14]/(me[10]-1),Ae=me[14]/(me[10]+1),Re=(me[9]+1)/me[5],Je=(me[9]-1)/me[5],Ne=(me[8]-1)/me[0],z=(Te[8]+1)/Te[0],xt=ke*Ne,Se=ke*z,Ce=ue/(-Ne+z),Pe=Ce*-Ne;V.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(Pe),U.translateZ(Ce),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert();const nt=ke+Ce,Ue=Ae+Ce,Le=xt-Pe,We=Se+(ue-Pe),ct=Re*Ae/Ue*nt,vt=Je*Ae/Ue*nt;U.projectionMatrix.makePerspective(Le,We,ct,vt,nt,Ue),U.projectionMatrixInverse.copy(U.projectionMatrix).invert()}function X(U,V){V===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(V.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(i===null)return;x.near=E.near=_.near=U.near,x.far=E.far=_.far=U.far,(D!==x.near||S!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),D=x.near,S=x.far);const V=U.parent,he=x.cameras;X(x,V);for(let ue=0;ue<he.length;ue++)X(he[ue],V);he.length===2?O(x,_,E):x.projectionMatrix.copy(_.projectionMatrix),H(U,x,V)};function H(U,V,he){he===null?U.matrix.copy(V.matrixWorld):(U.matrix.copy(he.matrixWorld),U.matrix.invert(),U.matrix.multiply(V.matrixWorld)),U.matrix.decompose(U.position,U.quaternion,U.scale),U.updateMatrixWorld(!0),U.projectionMatrix.copy(V.projectionMatrix),U.projectionMatrixInverse.copy(V.projectionMatrixInverse),U.isPerspectiveCamera&&(U.fov=Qi*2*Math.atan(1/U.projectionMatrix.elements[5]),U.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(U){l=U,u!==null&&(u.fixedFoveation=U),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=U)};let J=null;function Y(U,V){if(c=V.getViewerPose(h||o),g=V,c!==null){const he=c.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let ue=!1;he.length!==x.cameras.length&&(x.cameras.length=0,ue=!0);for(let me=0;me<he.length;me++){const Te=he[me];let ke=null;if(p!==null)ke=p.getViewport(Te);else{const Re=d.getViewSubImage(u,Te);ke=Re.viewport,me===0&&(e.setRenderTargetTextures(f,Re.colorTexture,u.ignoreDepthValues?void 0:Re.depthStencilTexture),e.setRenderTarget(f))}let Ae=T[me];Ae===void 0&&(Ae=new Bt,Ae.layers.enable(me),Ae.viewport=new st,T[me]=Ae),Ae.matrix.fromArray(Te.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(Te.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(ke.x,ke.y,ke.width,ke.height),me===0&&(x.matrix.copy(Ae.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ue===!0&&x.cameras.push(Ae)}}for(let he=0;he<M.length;he++){const ue=v[he],me=M[he];ue!==null&&me!==void 0&&me.update(ue,V,h||o)}J&&J(U,V),V.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:V}),g=null}const $=new Il;$.setAnimationLoop(Y),this.setAnimationLoop=function(U){J=U},this.dispose=function(){}}}function dm(r,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Pl(r)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,M,v,_){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),c(m,f)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,_)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),y(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,M,v):f.isSpriteMaterial?h(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Rt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Rt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=e.get(f).envMap;if(M&&(m.envMap.value=M,m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const v=r._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*v,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,v){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=v*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Rt&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function y(m,f){const M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function um(r,e,t,n){let i={},s={},o=[];const a=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,v){const _=v.program;n.uniformBlockBinding(M,_)}function h(M,v){let _=i[M.id];_===void 0&&(g(M),_=c(M),i[M.id]=_,M.addEventListener("dispose",m));const E=v.program;n.updateUBOMapping(M,E);const T=e.render.frame;s[M.id]!==T&&(u(M),s[M.id]=T)}function c(M){const v=d();M.__bindingPointIndex=v;const _=r.createBuffer(),E=M.__size,T=M.usage;return r.bindBuffer(r.UNIFORM_BUFFER,_),r.bufferData(r.UNIFORM_BUFFER,E,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,_),_}function d(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const v=i[M.id],_=M.uniforms,E=M.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let T=0,x=_.length;T<x;T++){const D=_[T];if(p(D,T,E)===!0){const S=D.__offset,A=Array.isArray(D.value)?D.value:[D.value];let F=0;for(let G=0;G<A.length;G++){const Z=A[G],R=y(Z);typeof Z=="number"?(D.__data[0]=Z,r.bufferSubData(r.UNIFORM_BUFFER,S+F,D.__data)):Z.isMatrix3?(D.__data[0]=Z.elements[0],D.__data[1]=Z.elements[1],D.__data[2]=Z.elements[2],D.__data[3]=Z.elements[0],D.__data[4]=Z.elements[3],D.__data[5]=Z.elements[4],D.__data[6]=Z.elements[5],D.__data[7]=Z.elements[0],D.__data[8]=Z.elements[6],D.__data[9]=Z.elements[7],D.__data[10]=Z.elements[8],D.__data[11]=Z.elements[0]):(Z.toArray(D.__data,F),F+=R.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,S,D.__data)}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(M,v,_){const E=M.value;if(_[v]===void 0){if(typeof E=="number")_[v]=E;else{const T=Array.isArray(E)?E:[E],x=[];for(let D=0;D<T.length;D++)x.push(T[D].clone());_[v]=x}return!0}else if(typeof E=="number"){if(_[v]!==E)return _[v]=E,!0}else{const T=Array.isArray(_[v])?_[v]:[_[v]],x=Array.isArray(E)?E:[E];for(let D=0;D<T.length;D++){const S=T[D];if(S.equals(x[D])===!1)return S.copy(x[D]),!0}}return!1}function g(M){const v=M.uniforms;let _=0;const E=16;let T=0;for(let x=0,D=v.length;x<D;x++){const S=v[x],A={boundary:0,storage:0},F=Array.isArray(S.value)?S.value:[S.value];for(let G=0,Z=F.length;G<Z;G++){const R=F[G],O=y(R);A.boundary+=O.boundary,A.storage+=O.storage}if(S.__data=new Float32Array(A.storage/Float32Array.BYTES_PER_ELEMENT),S.__offset=_,x>0){T=_%E;const G=E-T;T!==0&&G-A.boundary<0&&(_+=E-T,S.__offset=_)}_+=A.storage}return T=_%E,T>0&&(_+=E-T),M.__size=_,M.__cache={},this}function y(M){const v={boundary:0,storage:0};return typeof M=="number"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function m(M){const v=M.target;v.removeEventListener("dispose",m);const _=o.indexOf(v.__bindingPointIndex);o.splice(_,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function f(){for(const M in i)r.deleteBuffer(i[M]);o=[],i={},s={}}return{bind:l,update:h,dispose:f}}class js{constructor(e={}){const{canvas:t=hh(),context:n=null,depth:i=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=o;const p=new Uint32Array(4),g=new Int32Array(4);let y=null,m=null;const f=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ft,this._useLegacyLights=!1,this.toneMapping=Ln,this.toneMappingExposure=1;const v=this;let _=!1,E=0,T=0,x=null,D=-1,S=null;const A=new st,F=new st;let G=null;const Z=new ge(0);let R=0,O=t.width,X=t.height,H=1,J=null,Y=null;const $=new st(0,0,O,X),U=new st(0,0,O,X);let V=!1;const he=new po;let ue=!1,me=!1,Te=null;const ke=new tt,Ae=new ae,Re=new b,Je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ne(){return x===null?H:1}let z=n;function xt(C,N){for(let k=0;k<C.length;k++){const W=C[k],j=t.getContext(W,N);if(j!==null)return j}return null}try{const C={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:c,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${$s}`),t.addEventListener("webglcontextlost",Ge,!1),t.addEventListener("webglcontextrestored",I,!1),t.addEventListener("webglcontextcreationerror",le,!1),z===null){const N=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&N.shift(),z=xt(N,C),z===null)throw xt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&z instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),z.getShaderPrecisionFormat===void 0&&(z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Se,Ce,Pe,nt,Ue,Le,We,ct,vt,P,w,B,ne,Q,ie,ye,oe,de,L,re,K,we,_e,be;function ve(){Se=new Sf(z),Ce=new gf(z,Se,e),Se.init(Ce),we=new om(z,Se,Ce),Pe=new sm(z,Se,Ce),nt=new Ef(z),Ue=new Wp,Le=new rm(z,Se,Pe,Ue,Ce,we,nt),We=new yf(v),ct=new Mf(v),vt=new Uh(z,Ce),_e=new pf(z,Se,vt,Ce),P=new bf(z,vt,nt,_e),w=new Pf(z,P,vt,nt),L=new Cf(z,Ce,Le),ye=new vf(Ue),B=new Vp(v,We,ct,Se,Ce,_e,ye),ne=new dm(v,Ue),Q=new jp,ie=new Jp(Se,Ce),de=new ff(v,We,ct,Pe,w,u,l),oe=new im(v,w,Ce),be=new um(z,nt,Ce,Pe),re=new mf(z,Se,nt,Ce),K=new wf(z,Se,nt,Ce),nt.programs=B.programs,v.capabilities=Ce,v.extensions=Se,v.properties=Ue,v.renderLists=Q,v.shadowMap=oe,v.state=Pe,v.info=nt}ve();const pe=new hm(v,z);this.xr=pe,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const C=Se.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Se.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(C){C!==void 0&&(H=C,this.setSize(O,X,!1))},this.getSize=function(C){return C.set(O,X)},this.setSize=function(C,N,k=!0){if(pe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=C,X=N,t.width=Math.floor(C*H),t.height=Math.floor(N*H),k===!0&&(t.style.width=C+"px",t.style.height=N+"px"),this.setViewport(0,0,C,N)},this.getDrawingBufferSize=function(C){return C.set(O*H,X*H).floor()},this.setDrawingBufferSize=function(C,N,k){O=C,X=N,H=k,t.width=Math.floor(C*k),t.height=Math.floor(N*k),this.setViewport(0,0,C,N)},this.getCurrentViewport=function(C){return C.copy(A)},this.getViewport=function(C){return C.copy($)},this.setViewport=function(C,N,k,W){C.isVector4?$.set(C.x,C.y,C.z,C.w):$.set(C,N,k,W),Pe.viewport(A.copy($).multiplyScalar(H).floor())},this.getScissor=function(C){return C.copy(U)},this.setScissor=function(C,N,k,W){C.isVector4?U.set(C.x,C.y,C.z,C.w):U.set(C,N,k,W),Pe.scissor(F.copy(U).multiplyScalar(H).floor())},this.getScissorTest=function(){return V},this.setScissorTest=function(C){Pe.setScissorTest(V=C)},this.setOpaqueSort=function(C){J=C},this.setTransparentSort=function(C){Y=C},this.getClearColor=function(C){return C.copy(de.getClearColor())},this.setClearColor=function(){de.setClearColor.apply(de,arguments)},this.getClearAlpha=function(){return de.getClearAlpha()},this.setClearAlpha=function(){de.setClearAlpha.apply(de,arguments)},this.clear=function(C=!0,N=!0,k=!0){let W=0;if(C){let j=!1;if(x!==null){const fe=x.texture.format;j=fe===xl||fe===_l||fe===yl}if(j){const fe=x.texture.type,xe=fe===In||fe===Cn||fe===co||fe===$n||fe===gl||fe===vl,Ee=de.getClearColor(),De=de.getClearAlpha(),ze=Ee.r,Ie=Ee.g,Oe=Ee.b;xe?(p[0]=ze,p[1]=Ie,p[2]=Oe,p[3]=De,z.clearBufferuiv(z.COLOR,0,p)):(g[0]=ze,g[1]=Ie,g[2]=Oe,g[3]=De,z.clearBufferiv(z.COLOR,0,g))}else W|=z.COLOR_BUFFER_BIT}N&&(W|=z.DEPTH_BUFFER_BIT),k&&(W|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ge,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",le,!1),Q.dispose(),ie.dispose(),Ue.dispose(),We.dispose(),ct.dispose(),w.dispose(),_e.dispose(),be.dispose(),B.dispose(),pe.dispose(),pe.removeEventListener("sessionstart",kt),pe.removeEventListener("sessionend",Ze),Te&&(Te.dispose(),Te=null),Et.stop()};function Ge(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),_=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),_=!1;const C=nt.autoReset,N=oe.enabled,k=oe.autoUpdate,W=oe.needsUpdate,j=oe.type;ve(),nt.autoReset=C,oe.enabled=N,oe.autoUpdate=k,oe.needsUpdate=W,oe.type=j}function le(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ee(C){const N=C.target;N.removeEventListener("dispose",ee),q(N)}function q(C){se(C),Ue.remove(C)}function se(C){const N=Ue.get(C).programs;N!==void 0&&(N.forEach(function(k){B.releaseProgram(k)}),C.isShaderMaterial&&B.releaseShaderCache(C))}this.renderBufferDirect=function(C,N,k,W,j,fe){N===null&&(N=Je);const xe=j.isMesh&&j.matrixWorld.determinant()<0,Ee=ql(C,N,k,W,j);Pe.setMaterial(W,xe);let De=k.index,ze=1;if(W.wireframe===!0){if(De=P.getWireframeAttribute(k),De===void 0)return;ze=2}const Ie=k.drawRange,Oe=k.attributes.position;let lt=Ie.start*ze,It=(Ie.start+Ie.count)*ze;fe!==null&&(lt=Math.max(lt,fe.start*ze),It=Math.min(It,(fe.start+fe.count)*ze)),De!==null?(lt=Math.max(lt,0),It=Math.min(It,De.count)):Oe!=null&&(lt=Math.max(lt,0),It=Math.min(It,Oe.count));const yt=It-lt;if(yt<0||yt===1/0)return;_e.setup(j,W,Ee,k,De);let rn,ot=re;if(De!==null&&(rn=vt.get(De),ot=K,ot.setIndex(rn)),j.isMesh)W.wireframe===!0?(Pe.setLineWidth(W.wireframeLinewidth*Ne()),ot.setMode(z.LINES)):ot.setMode(z.TRIANGLES);else if(j.isLine){let Ve=W.linewidth;Ve===void 0&&(Ve=1),Pe.setLineWidth(Ve*Ne()),j.isLineSegments?ot.setMode(z.LINES):j.isLineLoop?ot.setMode(z.LINE_LOOP):ot.setMode(z.LINE_STRIP)}else j.isPoints?ot.setMode(z.POINTS):j.isSprite&&ot.setMode(z.TRIANGLES);if(j.isInstancedMesh)ot.renderInstances(lt,yt,j.count);else if(k.isInstancedBufferGeometry){const Ve=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,sr=Math.min(k.instanceCount,Ve);ot.renderInstances(lt,yt,sr)}else ot.render(lt,yt)};function Me(C,N,k){C.transparent===!0&&C.side===Wt&&C.forceSinglePass===!1?(C.side=Rt,C.needsUpdate=!0,ns(C,N,k),C.side=On,C.needsUpdate=!0,ns(C,N,k),C.side=Wt):ns(C,N,k)}this.compile=function(C,N,k=null){k===null&&(k=C),m=ie.get(k),m.init(),M.push(m),k.traverseVisible(function(j){j.isLight&&j.layers.test(N.layers)&&(m.pushLight(j),j.castShadow&&m.pushShadow(j))}),C!==k&&C.traverseVisible(function(j){j.isLight&&j.layers.test(N.layers)&&(m.pushLight(j),j.castShadow&&m.pushShadow(j))}),m.setupLights(v._useLegacyLights);const W=new Set;return C.traverse(function(j){const fe=j.material;if(fe)if(Array.isArray(fe))for(let xe=0;xe<fe.length;xe++){const Ee=fe[xe];Me(Ee,k,j),W.add(Ee)}else Me(fe,k,j),W.add(fe)}),M.pop(),m=null,W},this.compileAsync=function(C,N,k=null){const W=this.compile(C,N,k);return new Promise(j=>{function fe(){if(W.forEach(function(xe){Ue.get(xe).currentProgram.isReady()&&W.delete(xe)}),W.size===0){j(C);return}setTimeout(fe,10)}Se.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let He=null;function ht(C){He&&He(C)}function kt(){Et.stop()}function Ze(){Et.start()}const Et=new Il;Et.setAnimationLoop(ht),typeof self<"u"&&Et.setContext(self),this.setAnimationLoop=function(C){He=C,pe.setAnimationLoop(C),C===null?Et.stop():Et.start()},pe.addEventListener("sessionstart",kt),pe.addEventListener("sessionend",Ze),this.render=function(C,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(_===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),pe.enabled===!0&&pe.isPresenting===!0&&(pe.cameraAutoUpdate===!0&&pe.updateCamera(N),N=pe.getCamera()),C.isScene===!0&&C.onBeforeRender(v,C,N,x),m=ie.get(C,M.length),m.init(),M.push(m),ke.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),he.setFromProjectionMatrix(ke),me=this.localClippingEnabled,ue=ye.init(this.clippingPlanes,me),y=Q.get(C,f.length),y.init(),f.push(y),Qt(C,N,0,v.sortObjects),y.finish(),v.sortObjects===!0&&y.sort(J,Y),this.info.render.frame++,ue===!0&&ye.beginShadows();const k=m.state.shadowsArray;if(oe.render(k,C,N),ue===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset(),de.render(y,C),m.setupLights(v._useLegacyLights),N.isArrayCamera){const W=N.cameras;for(let j=0,fe=W.length;j<fe;j++){const xe=W[j];yo(y,C,xe,xe.viewport)}}else yo(y,C,N);x!==null&&(Le.updateMultisampleRenderTarget(x),Le.updateRenderTargetMipmap(x)),C.isScene===!0&&C.onAfterRender(v,C,N),_e.resetDefaultState(),D=-1,S=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,f.pop(),f.length>0?y=f[f.length-1]:y=null};function Qt(C,N,k,W){if(C.visible===!1)return;if(C.layers.test(N.layers)){if(C.isGroup)k=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(N);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||he.intersectsSprite(C)){W&&Re.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ke);const xe=w.update(C),Ee=C.material;Ee.visible&&y.push(C,xe,Ee,k,Re.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||he.intersectsObject(C))){const xe=w.update(C),Ee=C.material;if(W&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Re.copy(C.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),Re.copy(xe.boundingSphere.center)),Re.applyMatrix4(C.matrixWorld).applyMatrix4(ke)),Array.isArray(Ee)){const De=xe.groups;for(let ze=0,Ie=De.length;ze<Ie;ze++){const Oe=De[ze],lt=Ee[Oe.materialIndex];lt&&lt.visible&&y.push(C,xe,lt,k,Re.z,Oe)}}else Ee.visible&&y.push(C,xe,Ee,k,Re.z,null)}}const fe=C.children;for(let xe=0,Ee=fe.length;xe<Ee;xe++)Qt(fe[xe],N,k,W)}function yo(C,N,k,W){const j=C.opaque,fe=C.transmissive,xe=C.transparent;m.setupLightsView(k),ue===!0&&ye.setGlobalState(v.clippingPlanes,k),fe.length>0&&Yl(j,fe,N,k),W&&Pe.viewport(A.copy(W)),j.length>0&&ts(j,N,k),fe.length>0&&ts(fe,N,k),xe.length>0&&ts(xe,N,k),Pe.buffers.depth.setTest(!0),Pe.buffers.depth.setMask(!0),Pe.buffers.color.setMask(!0),Pe.setPolygonOffset(!1)}function Yl(C,N,k,W){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;const fe=Ce.isWebGL2;Te===null&&(Te=new Jn(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")?Ji:In,minFilter:Ki,samples:fe?4:0})),v.getDrawingBufferSize(Ae),fe?Te.setSize(Ae.x,Ae.y):Te.setSize(Ws(Ae.x),Ws(Ae.y));const xe=v.getRenderTarget();v.setRenderTarget(Te),v.getClearColor(Z),R=v.getClearAlpha(),R<1&&v.setClearColor(16777215,.5),v.clear();const Ee=v.toneMapping;v.toneMapping=Ln,ts(C,k,W),Le.updateMultisampleRenderTarget(Te),Le.updateRenderTargetMipmap(Te);let De=!1;for(let ze=0,Ie=N.length;ze<Ie;ze++){const Oe=N[ze],lt=Oe.object,It=Oe.geometry,yt=Oe.material,rn=Oe.group;if(yt.side===Wt&&lt.layers.test(W.layers)){const ot=yt.side;yt.side=Rt,yt.needsUpdate=!0,_o(lt,k,W,It,yt,rn),yt.side=ot,yt.needsUpdate=!0,De=!0}}De===!0&&(Le.updateMultisampleRenderTarget(Te),Le.updateRenderTargetMipmap(Te)),v.setRenderTarget(xe),v.setClearColor(Z,R),v.toneMapping=Ee}function ts(C,N,k){const W=N.isScene===!0?N.overrideMaterial:null;for(let j=0,fe=C.length;j<fe;j++){const xe=C[j],Ee=xe.object,De=xe.geometry,ze=W===null?xe.material:W,Ie=xe.group;Ee.layers.test(k.layers)&&_o(Ee,N,k,De,ze,Ie)}}function _o(C,N,k,W,j,fe){C.onBeforeRender(v,N,k,W,j,fe),C.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),j.onBeforeRender(v,N,k,W,C,fe),j.transparent===!0&&j.side===Wt&&j.forceSinglePass===!1?(j.side=Rt,j.needsUpdate=!0,v.renderBufferDirect(k,N,W,j,C,fe),j.side=On,j.needsUpdate=!0,v.renderBufferDirect(k,N,W,j,C,fe),j.side=Wt):v.renderBufferDirect(k,N,W,j,C,fe),C.onAfterRender(v,N,k,W,j,fe)}function ns(C,N,k){N.isScene!==!0&&(N=Je);const W=Ue.get(C),j=m.state.lights,fe=m.state.shadowsArray,xe=j.state.version,Ee=B.getParameters(C,j.state,fe,N,k),De=B.getProgramCacheKey(Ee);let ze=W.programs;W.environment=C.isMeshStandardMaterial?N.environment:null,W.fog=N.fog,W.envMap=(C.isMeshStandardMaterial?ct:We).get(C.envMap||W.environment),ze===void 0&&(C.addEventListener("dispose",ee),ze=new Map,W.programs=ze);let Ie=ze.get(De);if(Ie!==void 0){if(W.currentProgram===Ie&&W.lightsStateVersion===xe)return Mo(C,Ee),Ie}else Ee.uniforms=B.getUniforms(C),C.onBuild(k,Ee,v),C.onBeforeCompile(Ee,v),Ie=B.acquireProgram(Ee,De),ze.set(De,Ie),W.uniforms=Ee.uniforms;const Oe=W.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Oe.clippingPlanes=ye.uniform),Mo(C,Ee),W.needsLights=Zl(C),W.lightsStateVersion=xe,W.needsLights&&(Oe.ambientLightColor.value=j.state.ambient,Oe.lightProbe.value=j.state.probe,Oe.directionalLights.value=j.state.directional,Oe.directionalLightShadows.value=j.state.directionalShadow,Oe.spotLights.value=j.state.spot,Oe.spotLightShadows.value=j.state.spotShadow,Oe.rectAreaLights.value=j.state.rectArea,Oe.ltc_1.value=j.state.rectAreaLTC1,Oe.ltc_2.value=j.state.rectAreaLTC2,Oe.pointLights.value=j.state.point,Oe.pointLightShadows.value=j.state.pointShadow,Oe.hemisphereLights.value=j.state.hemi,Oe.directionalShadowMap.value=j.state.directionalShadowMap,Oe.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Oe.spotShadowMap.value=j.state.spotShadowMap,Oe.spotLightMatrix.value=j.state.spotLightMatrix,Oe.spotLightMap.value=j.state.spotLightMap,Oe.pointShadowMap.value=j.state.pointShadowMap,Oe.pointShadowMatrix.value=j.state.pointShadowMatrix),W.currentProgram=Ie,W.uniformsList=null,Ie}function xo(C){if(C.uniformsList===null){const N=C.currentProgram.getUniforms();C.uniformsList=Fs.seqWithValue(N.seq,C.uniforms)}return C.uniformsList}function Mo(C,N){const k=Ue.get(C);k.outputColorSpace=N.outputColorSpace,k.instancing=N.instancing,k.instancingColor=N.instancingColor,k.skinning=N.skinning,k.morphTargets=N.morphTargets,k.morphNormals=N.morphNormals,k.morphColors=N.morphColors,k.morphTargetsCount=N.morphTargetsCount,k.numClippingPlanes=N.numClippingPlanes,k.numIntersection=N.numClipIntersection,k.vertexAlphas=N.vertexAlphas,k.vertexTangents=N.vertexTangents,k.toneMapping=N.toneMapping}function ql(C,N,k,W,j){N.isScene!==!0&&(N=Je),Le.resetTextureUnits();const fe=N.fog,xe=W.isMeshStandardMaterial?N.environment:null,Ee=x===null?v.outputColorSpace:x.isXRRenderTarget===!0?x.texture.colorSpace:gn,De=(W.isMeshStandardMaterial?ct:We).get(W.envMap||xe),ze=W.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ie=!!k.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Oe=!!k.morphAttributes.position,lt=!!k.morphAttributes.normal,It=!!k.morphAttributes.color;let yt=Ln;W.toneMapped&&(x===null||x.isXRRenderTarget===!0)&&(yt=v.toneMapping);const rn=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ot=rn!==void 0?rn.length:0,Ve=Ue.get(W),sr=m.state.lights;if(ue===!0&&(me===!0||C!==S)){const Ut=C===S&&W.id===D;ye.setState(W,C,Ut)}let dt=!1;W.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==sr.state.version||Ve.outputColorSpace!==Ee||j.isInstancedMesh&&Ve.instancing===!1||!j.isInstancedMesh&&Ve.instancing===!0||j.isSkinnedMesh&&Ve.skinning===!1||!j.isSkinnedMesh&&Ve.skinning===!0||j.isInstancedMesh&&Ve.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Ve.instancingColor===!1&&j.instanceColor!==null||Ve.envMap!==De||W.fog===!0&&Ve.fog!==fe||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==ye.numPlanes||Ve.numIntersection!==ye.numIntersection)||Ve.vertexAlphas!==ze||Ve.vertexTangents!==Ie||Ve.morphTargets!==Oe||Ve.morphNormals!==lt||Ve.morphColors!==It||Ve.toneMapping!==yt||Ce.isWebGL2===!0&&Ve.morphTargetsCount!==ot)&&(dt=!0):(dt=!0,Ve.__version=W.version);let Fn=Ve.currentProgram;dt===!0&&(Fn=ns(W,N,j));let So=!1,Ii=!1,rr=!1;const Tt=Fn.getUniforms(),zn=Ve.uniforms;if(Pe.useProgram(Fn.program)&&(So=!0,Ii=!0,rr=!0),W.id!==D&&(D=W.id,Ii=!0),So||S!==C){Tt.setValue(z,"projectionMatrix",C.projectionMatrix),Tt.setValue(z,"viewMatrix",C.matrixWorldInverse);const Ut=Tt.map.cameraPosition;Ut!==void 0&&Ut.setValue(z,Re.setFromMatrixPosition(C.matrixWorld)),Ce.logarithmicDepthBuffer&&Tt.setValue(z,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Tt.setValue(z,"isOrthographic",C.isOrthographicCamera===!0),S!==C&&(S=C,Ii=!0,rr=!0)}if(j.isSkinnedMesh){Tt.setOptional(z,j,"bindMatrix"),Tt.setOptional(z,j,"bindMatrixInverse");const Ut=j.skeleton;Ut&&(Ce.floatVertexTextures?(Ut.boneTexture===null&&Ut.computeBoneTexture(),Tt.setValue(z,"boneTexture",Ut.boneTexture,Le),Tt.setValue(z,"boneTextureSize",Ut.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const or=k.morphAttributes;if((or.position!==void 0||or.normal!==void 0||or.color!==void 0&&Ce.isWebGL2===!0)&&L.update(j,k,Fn),(Ii||Ve.receiveShadow!==j.receiveShadow)&&(Ve.receiveShadow=j.receiveShadow,Tt.setValue(z,"receiveShadow",j.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(zn.envMap.value=De,zn.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),Ii&&(Tt.setValue(z,"toneMappingExposure",v.toneMappingExposure),Ve.needsLights&&$l(zn,rr),fe&&W.fog===!0&&ne.refreshFogUniforms(zn,fe),ne.refreshMaterialUniforms(zn,W,H,X,Te),Fs.upload(z,xo(Ve),zn,Le)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Fs.upload(z,xo(Ve),zn,Le),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Tt.setValue(z,"center",j.center),Tt.setValue(z,"modelViewMatrix",j.modelViewMatrix),Tt.setValue(z,"normalMatrix",j.normalMatrix),Tt.setValue(z,"modelMatrix",j.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Ut=W.uniformsGroups;for(let ar=0,Kl=Ut.length;ar<Kl;ar++)if(Ce.isWebGL2){const bo=Ut[ar];be.update(bo,Fn),be.bind(bo,Fn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Fn}function $l(C,N){C.ambientLightColor.needsUpdate=N,C.lightProbe.needsUpdate=N,C.directionalLights.needsUpdate=N,C.directionalLightShadows.needsUpdate=N,C.pointLights.needsUpdate=N,C.pointLightShadows.needsUpdate=N,C.spotLights.needsUpdate=N,C.spotLightShadows.needsUpdate=N,C.rectAreaLights.needsUpdate=N,C.hemisphereLights.needsUpdate=N}function Zl(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return x},this.setRenderTargetTextures=function(C,N,k){Ue.get(C.texture).__webglTexture=N,Ue.get(C.depthTexture).__webglTexture=k;const W=Ue.get(C);W.__hasExternalTextures=!0,W.__hasExternalTextures&&(W.__autoAllocateDepthBuffer=k===void 0,W.__autoAllocateDepthBuffer||Se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,N){const k=Ue.get(C);k.__webglFramebuffer=N,k.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(C,N=0,k=0){x=C,E=N,T=k;let W=!0,j=null,fe=!1,xe=!1;if(C){const De=Ue.get(C);De.__useDefaultFramebuffer!==void 0?(Pe.bindFramebuffer(z.FRAMEBUFFER,null),W=!1):De.__webglFramebuffer===void 0?Le.setupRenderTarget(C):De.__hasExternalTextures&&Le.rebindTextures(C,Ue.get(C.texture).__webglTexture,Ue.get(C.depthTexture).__webglTexture);const ze=C.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(xe=!0);const Ie=Ue.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ie[N])?j=Ie[N][k]:j=Ie[N],fe=!0):Ce.isWebGL2&&C.samples>0&&Le.useMultisampledRTT(C)===!1?j=Ue.get(C).__webglMultisampledFramebuffer:Array.isArray(Ie)?j=Ie[k]:j=Ie,A.copy(C.viewport),F.copy(C.scissor),G=C.scissorTest}else A.copy($).multiplyScalar(H).floor(),F.copy(U).multiplyScalar(H).floor(),G=V;if(Pe.bindFramebuffer(z.FRAMEBUFFER,j)&&Ce.drawBuffers&&W&&Pe.drawBuffers(C,j),Pe.viewport(A),Pe.scissor(F),Pe.setScissorTest(G),fe){const De=Ue.get(C.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+N,De.__webglTexture,k)}else if(xe){const De=Ue.get(C.texture),ze=N||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,De.__webglTexture,k||0,ze)}D=-1},this.readRenderTargetPixels=function(C,N,k,W,j,fe,xe){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=Ue.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&xe!==void 0&&(Ee=Ee[xe]),Ee){Pe.bindFramebuffer(z.FRAMEBUFFER,Ee);try{const De=C.texture,ze=De.format,Ie=De.type;if(ze!==Kt&&we.convert(ze)!==z.getParameter(z.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Oe=Ie===Ji&&(Se.has("EXT_color_buffer_half_float")||Ce.isWebGL2&&Se.has("EXT_color_buffer_float"));if(Ie!==In&&we.convert(Ie)!==z.getParameter(z.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ie===Pn&&(Ce.isWebGL2||Se.has("OES_texture_float")||Se.has("WEBGL_color_buffer_float")))&&!Oe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=C.width-W&&k>=0&&k<=C.height-j&&z.readPixels(N,k,W,j,we.convert(ze),we.convert(Ie),fe)}finally{const De=x!==null?Ue.get(x).__webglFramebuffer:null;Pe.bindFramebuffer(z.FRAMEBUFFER,De)}}},this.copyFramebufferToTexture=function(C,N,k=0){const W=Math.pow(2,-k),j=Math.floor(N.image.width*W),fe=Math.floor(N.image.height*W);Le.setTexture2D(N,0),z.copyTexSubImage2D(z.TEXTURE_2D,k,0,0,C.x,C.y,j,fe),Pe.unbindTexture()},this.copyTextureToTexture=function(C,N,k,W=0){const j=N.image.width,fe=N.image.height,xe=we.convert(k.format),Ee=we.convert(k.type);Le.setTexture2D(k,0),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,k.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,k.unpackAlignment),N.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,W,C.x,C.y,j,fe,xe,Ee,N.image.data):N.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,W,C.x,C.y,N.mipmaps[0].width,N.mipmaps[0].height,xe,N.mipmaps[0].data):z.texSubImage2D(z.TEXTURE_2D,W,C.x,C.y,xe,Ee,N.image),W===0&&k.generateMipmaps&&z.generateMipmap(z.TEXTURE_2D),Pe.unbindTexture()},this.copyTextureToTexture3D=function(C,N,k,W,j=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const fe=C.max.x-C.min.x+1,xe=C.max.y-C.min.y+1,Ee=C.max.z-C.min.z+1,De=we.convert(W.format),ze=we.convert(W.type);let Ie;if(W.isData3DTexture)Le.setTexture3D(W,0),Ie=z.TEXTURE_3D;else if(W.isDataArrayTexture)Le.setTexture2DArray(W,0),Ie=z.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,W.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,W.unpackAlignment);const Oe=z.getParameter(z.UNPACK_ROW_LENGTH),lt=z.getParameter(z.UNPACK_IMAGE_HEIGHT),It=z.getParameter(z.UNPACK_SKIP_PIXELS),yt=z.getParameter(z.UNPACK_SKIP_ROWS),rn=z.getParameter(z.UNPACK_SKIP_IMAGES),ot=k.isCompressedTexture?k.mipmaps[0]:k.image;z.pixelStorei(z.UNPACK_ROW_LENGTH,ot.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ot.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,C.min.x),z.pixelStorei(z.UNPACK_SKIP_ROWS,C.min.y),z.pixelStorei(z.UNPACK_SKIP_IMAGES,C.min.z),k.isDataTexture||k.isData3DTexture?z.texSubImage3D(Ie,j,N.x,N.y,N.z,fe,xe,Ee,De,ze,ot.data):k.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),z.compressedTexSubImage3D(Ie,j,N.x,N.y,N.z,fe,xe,Ee,De,ot.data)):z.texSubImage3D(Ie,j,N.x,N.y,N.z,fe,xe,Ee,De,ze,ot),z.pixelStorei(z.UNPACK_ROW_LENGTH,Oe),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,lt),z.pixelStorei(z.UNPACK_SKIP_PIXELS,It),z.pixelStorei(z.UNPACK_SKIP_ROWS,yt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,rn),j===0&&W.generateMipmaps&&z.generateMipmap(Ie),Pe.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?Le.setTextureCube(C,0):C.isData3DTexture?Le.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Le.setTexture2DArray(C,0):Le.setTexture2D(C,0),Pe.unbindTexture()},this.resetState=function(){E=0,T=0,x=null,Pe.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ho?"display-p3":"srgb",t.unpackColorSpace=qe.workingColorSpace===Qs?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ft?Kn:Ml}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Kn?ft:gn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class fm extends js{}fm.prototype.isWebGL1Renderer=!0;class pm extends at{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class mm{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=to,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=mn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const At=new b;class Ys{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}setX(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=sn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=sn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=sn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=sn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=je(t,this.array),n=je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=je(t,this.array),n=je(n,this.array),i=je(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=je(t,this.array),n=je(n,this.array),i=je(i,this.array),s=je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new jt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ys(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Bl extends yn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ge(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let vi;const zi=new b,yi=new b,_i=new b,xi=new ae,Bi=new ae,kl=new tt,Es=new b,ki=new b,Ts=new b,Va=new ae,Fr=new ae,Wa=new ae;class gm extends at{constructor(e=new Bl){if(super(),this.isSprite=!0,this.type="Sprite",vi===void 0){vi=new rt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new mm(t,5);vi.setIndex([0,1,2,0,2,3]),vi.setAttribute("position",new Ys(n,3,0,!1)),vi.setAttribute("uv",new Ys(n,2,3,!1))}this.geometry=vi,this.material=e,this.center=new ae(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),yi.setFromMatrixScale(this.matrixWorld),kl.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),_i.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&yi.multiplyScalar(-_i.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;As(Es.set(-.5,-.5,0),_i,o,yi,i,s),As(ki.set(.5,-.5,0),_i,o,yi,i,s),As(Ts.set(.5,.5,0),_i,o,yi,i,s),Va.set(0,0),Fr.set(1,0),Wa.set(1,1);let a=e.ray.intersectTriangle(Es,ki,Ts,!1,zi);if(a===null&&(As(ki.set(-.5,.5,0),_i,o,yi,i,s),Fr.set(0,1),a=e.ray.intersectTriangle(Es,Ts,ki,!1,zi),a===null))return;const l=e.ray.origin.distanceTo(zi);l<e.near||l>e.far||t.push({distance:l,point:zi.clone(),uv:zt.getInterpolation(zi,Es,ki,Ts,Va,Fr,Wa,new ae),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function As(r,e,t,n,i,s){xi.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Bi.x=s*xi.x-i*xi.y,Bi.y=i*xi.x+s*xi.y):Bi.copy(xi),r.copy(e),r.x+=Bi.x,r.y+=Bi.y,r.applyMatrix4(kl)}class Jt extends yn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Xa=new b,ja=new b,Ya=new tt,zr=new er,Cs=new es;class Ft extends at{constructor(e=new rt,t=new Jt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Xa.fromBufferAttribute(t,i-1),ja.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Xa.distanceTo(ja);e.setAttribute("lineDistance",new Xe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Cs.copy(n.boundingSphere),Cs.applyMatrix4(i),Cs.radius+=s,e.ray.intersectsSphere(Cs)===!1)return;Ya.copy(i).invert(),zr.copy(e.ray).applyMatrix4(Ya);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,h=new b,c=new b,d=new b,u=new b,p=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const f=Math.max(0,o.start),M=Math.min(g.count,o.start+o.count);for(let v=f,_=M-1;v<_;v+=p){const E=g.getX(v),T=g.getX(v+1);if(h.fromBufferAttribute(m,E),c.fromBufferAttribute(m,T),zr.distanceSqToSegment(h,c,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const D=e.ray.origin.distanceTo(u);D<e.near||D>e.far||t.push({distance:D,point:d.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,o.start),M=Math.min(m.count,o.start+o.count);for(let v=f,_=M-1;v<_;v+=p){if(h.fromBufferAttribute(m,v),c.fromBufferAttribute(m,v+1),zr.distanceSqToSegment(h,c,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const T=e.ray.origin.distanceTo(u);T<e.near||T>e.far||t.push({distance:T,point:d.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const qa=new b,$a=new b;class nr extends Ft{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)qa.fromBufferAttribute(t,i),$a.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+qa.distanceTo($a);e.setAttribute("lineDistance",new Xe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class vm extends Lt{constructor(e,t,n,i,s,o,a,l,h){super(e,t,n,i,s,o,a,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _n{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,l=s-1,h;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),h=n[i]-o,h<0)a=i+1;else if(h>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const c=n[i],u=n[i+1]-c,p=(o-c)/u;return(i+p)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=t||(o.isVector2?new ae:new b);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new b,i=[],s=[],o=[],a=new b,l=new tt;for(let p=0;p<=e;p++){const g=p/e;i[p]=this.getTangentAt(g,new b)}s[0]=new b,o[0]=new b;let h=Number.MAX_VALUE;const c=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);c<=h&&(h=c,n.set(1,0,0)),d<=h&&(h=d,n.set(0,1,0)),u<=h&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(i[p-1],i[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(pt(i[p-1].dot(i[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(i[p],s[p])}if(t===!0){let p=Math.acos(pt(s[0].dot(s[e]),-1,1));p/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],p*g)),o[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Gl extends _n{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t){const n=t||new ae,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),h=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const c=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,p=h-this.aY;l=u*c-p*d+this.aX,h=u*d+p*c+this.aY}return n.set(l,h)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class ym extends Gl{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function go(){let r=0,e=0,t=0,n=0;function i(s,o,a,l){r=s,e=a,t=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,h){i(o,a,h*(a-s),h*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,h,c,d){let u=(o-s)/h-(a-s)/(h+c)+(a-o)/c,p=(a-o)/c-(l-o)/(c+d)+(l-a)/d;u*=c,p*=c,i(o,a,u,p)},calc:function(s){const o=s*s,a=o*s;return r+e*s+t*o+n*a}}}const Ps=new b,Br=new go,kr=new go,Gr=new go;class An extends _n{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new b){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let h,c;this.closed||a>0?h=i[(a-1)%s]:(Ps.subVectors(i[0],i[1]).add(i[0]),h=Ps);const d=i[a%s],u=i[(a+1)%s];if(this.closed||a+2<s?c=i[(a+2)%s]:(Ps.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=Ps),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(h.distanceToSquared(d),p),y=Math.pow(d.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(c),p);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),Br.initNonuniformCatmullRom(h.x,d.x,u.x,c.x,g,y,m),kr.initNonuniformCatmullRom(h.y,d.y,u.y,c.y,g,y,m),Gr.initNonuniformCatmullRom(h.z,d.z,u.z,c.z,g,y,m)}else this.curveType==="catmullrom"&&(Br.initCatmullRom(h.x,d.x,u.x,c.x,this.tension),kr.initCatmullRom(h.y,d.y,u.y,c.y,this.tension),Gr.initCatmullRom(h.z,d.z,u.z,c.z,this.tension));return n.set(Br.calc(l),kr.calc(l),Gr.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new b().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Za(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,a=r*r,l=r*a;return(2*t-2*n+s+o)*l+(-3*t+3*n-2*s-o)*a+s*r+t}function _m(r,e){const t=1-r;return t*t*e}function xm(r,e){return 2*(1-r)*r*e}function Mm(r,e){return r*r*e}function $i(r,e,t,n){return _m(r,e)+xm(r,t)+Mm(r,n)}function Sm(r,e){const t=1-r;return t*t*t*e}function bm(r,e){const t=1-r;return 3*t*t*r*e}function wm(r,e){return 3*(1-r)*r*r*e}function Em(r,e){return r*r*r*e}function Zi(r,e,t,n,i){return Sm(r,e)+bm(r,t)+wm(r,n)+Em(r,i)}class Tm extends _n{constructor(e=new ae,t=new ae,n=new ae,i=new ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ae){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Zi(e,i.x,s.x,o.x,a.x),Zi(e,i.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Am extends _n{constructor(e=new b,t=new b,n=new b,i=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new b){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Zi(e,i.x,s.x,o.x,a.x),Zi(e,i.y,s.y,o.y,a.y),Zi(e,i.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Cm extends _n{constructor(e=new ae,t=new ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ae){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Pm extends _n{constructor(e=new b,t=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new b){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new b){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Dm extends _n{constructor(e=new ae,t=new ae,n=new ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ae){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set($i(e,i.x,s.x,o.x),$i(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hl extends _n{constructor(e=new b,t=new b,n=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new b){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set($i(e,i.x,s.x,o.x),$i(e,i.y,s.y,o.y),$i(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Rm extends _n{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ae){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],h=i[o],c=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(Za(a,l.x,h.x,c.x,d.x),Za(a,l.y,h.y,c.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ae().fromArray(i))}return this}}var Lm=Object.freeze({__proto__:null,ArcCurve:ym,CatmullRomCurve3:An,CubicBezierCurve:Tm,CubicBezierCurve3:Am,EllipseCurve:Gl,LineCurve:Cm,LineCurve3:Pm,QuadraticBezierCurve:Dm,QuadraticBezierCurve3:Hl,SplineCurve:Rm});class Ye extends rt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const h=this;i=Math.floor(i),s=Math.floor(s);const c=[],d=[],u=[],p=[];let g=0;const y=[],m=n/2;let f=0;M(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(c),this.setAttribute("position",new Xe(d,3)),this.setAttribute("normal",new Xe(u,3)),this.setAttribute("uv",new Xe(p,2));function M(){const _=new b,E=new b;let T=0;const x=(t-e)/n;for(let D=0;D<=s;D++){const S=[],A=D/s,F=A*(t-e)+e;for(let G=0;G<=i;G++){const Z=G/i,R=Z*l+a,O=Math.sin(R),X=Math.cos(R);E.x=F*O,E.y=-A*n+m,E.z=F*X,d.push(E.x,E.y,E.z),_.set(O,x,X).normalize(),u.push(_.x,_.y,_.z),p.push(Z,1-A),S.push(g++)}y.push(S)}for(let D=0;D<i;D++)for(let S=0;S<s;S++){const A=y[S][D],F=y[S+1][D],G=y[S+1][D+1],Z=y[S][D+1];c.push(A,F,Z),c.push(F,G,Z),T+=6}h.addGroup(f,T,0),f+=T}function v(_){const E=g,T=new ae,x=new b;let D=0;const S=_===!0?e:t,A=_===!0?1:-1;for(let G=1;G<=i;G++)d.push(0,m*A,0),u.push(0,A,0),p.push(.5,.5),g++;const F=g;for(let G=0;G<=i;G++){const R=G/i*l+a,O=Math.cos(R),X=Math.sin(R);x.x=S*X,x.y=m*A,x.z=S*O,d.push(x.x,x.y,x.z),u.push(0,A,0),T.x=O*.5+.5,T.y=X*.5*A+.5,p.push(T.x,T.y),g++}for(let G=0;G<i;G++){const Z=E+G,R=F+G;_===!0?c.push(R,R+1,Z):c.push(R+1,R,Z),D+=3}h.addGroup(f,D,_===!0?1:2),f+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ye(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class vo extends rt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];a(i),h(n),c(),this.setAttribute("position",new Xe(s,3)),this.setAttribute("normal",new Xe(s.slice(),3)),this.setAttribute("uv",new Xe(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const v=new b,_=new b,E=new b;for(let T=0;T<t.length;T+=3)p(t[T+0],v),p(t[T+1],_),p(t[T+2],E),l(v,_,E,M)}function l(M,v,_,E){const T=E+1,x=[];for(let D=0;D<=T;D++){x[D]=[];const S=M.clone().lerp(_,D/T),A=v.clone().lerp(_,D/T),F=T-D;for(let G=0;G<=F;G++)G===0&&D===T?x[D][G]=S:x[D][G]=S.clone().lerp(A,G/F)}for(let D=0;D<T;D++)for(let S=0;S<2*(T-D)-1;S++){const A=Math.floor(S/2);S%2===0?(u(x[D][A+1]),u(x[D+1][A]),u(x[D][A])):(u(x[D][A+1]),u(x[D+1][A+1]),u(x[D+1][A]))}}function h(M){const v=new b;for(let _=0;_<s.length;_+=3)v.x=s[_+0],v.y=s[_+1],v.z=s[_+2],v.normalize().multiplyScalar(M),s[_+0]=v.x,s[_+1]=v.y,s[_+2]=v.z}function c(){const M=new b;for(let v=0;v<s.length;v+=3){M.x=s[v+0],M.y=s[v+1],M.z=s[v+2];const _=m(M)/2/Math.PI+.5,E=f(M)/Math.PI+.5;o.push(_,1-E)}g(),d()}function d(){for(let M=0;M<o.length;M+=6){const v=o[M+0],_=o[M+2],E=o[M+4],T=Math.max(v,_,E),x=Math.min(v,_,E);T>.9&&x<.1&&(v<.2&&(o[M+0]+=1),_<.2&&(o[M+2]+=1),E<.2&&(o[M+4]+=1))}}function u(M){s.push(M.x,M.y,M.z)}function p(M,v){const _=M*3;v.x=e[_+0],v.y=e[_+1],v.z=e[_+2]}function g(){const M=new b,v=new b,_=new b,E=new b,T=new ae,x=new ae,D=new ae;for(let S=0,A=0;S<s.length;S+=9,A+=6){M.set(s[S+0],s[S+1],s[S+2]),v.set(s[S+3],s[S+4],s[S+5]),_.set(s[S+6],s[S+7],s[S+8]),T.set(o[A+0],o[A+1]),x.set(o[A+2],o[A+3]),D.set(o[A+4],o[A+5]),E.copy(M).add(v).add(_).divideScalar(3);const F=m(E);y(T,A+0,M,F),y(x,A+2,v,F),y(D,A+4,_,F)}}function y(M,v,_,E){E<0&&M.x===1&&(o[v]=M.x-1),_.x===0&&_.z===0&&(o[v]=E/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function f(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vo(e.vertices,e.indices,e.radius,e.details)}}const Ds=new b,Rs=new b,Hr=new b,Ls=new zt;class Vl extends rt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(wi*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,h=[0,0,0],c=["a","b","c"],d=new Array(3),u={},p=[];for(let g=0;g<l;g+=3){o?(h[0]=o.getX(g),h[1]=o.getX(g+1),h[2]=o.getX(g+2)):(h[0]=g,h[1]=g+1,h[2]=g+2);const{a:y,b:m,c:f}=Ls;if(y.fromBufferAttribute(a,h[0]),m.fromBufferAttribute(a,h[1]),f.fromBufferAttribute(a,h[2]),Ls.getNormal(Hr),d[0]=`${Math.round(y.x*i)},${Math.round(y.y*i)},${Math.round(y.z*i)}`,d[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,d[2]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let M=0;M<3;M++){const v=(M+1)%3,_=d[M],E=d[v],T=Ls[c[M]],x=Ls[c[v]],D=`${_}_${E}`,S=`${E}_${_}`;S in u&&u[S]?(Hr.dot(u[S].normal)<=s&&(p.push(T.x,T.y,T.z),p.push(x.x,x.y,x.z)),u[S]=null):D in u||(u[D]={index0:h[M],index1:h[v],normal:Hr.clone()})}}for(const g in u)if(u[g]){const{index0:y,index1:m}=u[g];Ds.fromBufferAttribute(a,y),Rs.fromBufferAttribute(a,m),p.push(Ds.x,Ds.y,Ds.z),p.push(Rs.x,Rs.y,Rs.z)}this.setAttribute("position",new Xe(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Si extends vo{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Si(e.radius,e.detail)}}class Qn extends rt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let h=0;const c=[],d=new b,u=new b,p=[],g=[],y=[],m=[];for(let f=0;f<=n;f++){const M=[],v=f/n;let _=0;f===0&&o===0?_=.5/t:f===n&&l===Math.PI&&(_=-.5/t);for(let E=0;E<=t;E++){const T=E/t;d.x=-e*Math.cos(i+T*s)*Math.sin(o+v*a),d.y=e*Math.cos(o+v*a),d.z=e*Math.sin(i+T*s)*Math.sin(o+v*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),m.push(T+_,1-v),M.push(h++)}c.push(M)}for(let f=0;f<n;f++)for(let M=0;M<t;M++){const v=c[f][M+1],_=c[f][M],E=c[f+1][M],T=c[f+1][M+1];(f!==0||o>0)&&p.push(v,_,T),(f!==n-1||l<Math.PI)&&p.push(_,E,T)}this.setIndex(p),this.setAttribute("position",new Xe(g,3)),this.setAttribute("normal",new Xe(y,3)),this.setAttribute("uv",new Xe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class qn extends rt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],h=[],c=new b,d=new b,u=new b;for(let p=0;p<=n;p++)for(let g=0;g<=i;g++){const y=g/i*s,m=p/n*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(y),d.y=(e+t*Math.cos(m))*Math.sin(y),d.z=t*Math.sin(m),a.push(d.x,d.y,d.z),c.x=e*Math.cos(y),c.y=e*Math.sin(y),u.subVectors(d,c).normalize(),l.push(u.x,u.y,u.z),h.push(g/i),h.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=i;g++){const y=(i+1)*p+g-1,m=(i+1)*(p-1)+g-1,f=(i+1)*(p-1)+g,M=(i+1)*p+g;o.push(y,m,M),o.push(m,f,M)}this.setIndex(o),this.setAttribute("position",new Xe(a,3)),this.setAttribute("normal",new Xe(l,3)),this.setAttribute("uv",new Xe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class fn extends rt{constructor(e=new Hl(new b(-1,-1,0),new b(-1,1,0),new b(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new b,l=new b,h=new ae;let c=new b;const d=[],u=[],p=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new Xe(d,3)),this.setAttribute("normal",new Xe(u,3)),this.setAttribute("uv",new Xe(p,2));function y(){for(let v=0;v<t;v++)m(v);m(s===!1?t:0),M(),f()}function m(v){c=e.getPointAt(v/t,c);const _=o.normals[v],E=o.binormals[v];for(let T=0;T<=i;T++){const x=T/i*Math.PI*2,D=Math.sin(x),S=-Math.cos(x);l.x=S*_.x+D*E.x,l.y=S*_.y+D*E.y,l.z=S*_.z+D*E.z,l.normalize(),u.push(l.x,l.y,l.z),a.x=c.x+n*l.x,a.y=c.y+n*l.y,a.z=c.z+n*l.z,d.push(a.x,a.y,a.z)}}function f(){for(let v=1;v<=t;v++)for(let _=1;_<=i;_++){const E=(i+1)*(v-1)+(_-1),T=(i+1)*v+(_-1),x=(i+1)*v+_,D=(i+1)*(v-1)+_;g.push(E,T,D),g.push(T,x,D)}}function M(){for(let v=0;v<=t;v++)for(let _=0;_<=i;_++)h.x=v/t,h.y=_/i,p.push(h.x,h.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new fn(new Lm[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ro extends yn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Js,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Vr extends ro{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return pt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class wt extends yn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ge(16777215),this.specular=new ge(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Js,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Zs,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class qs extends yn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Js,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Zs,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ir extends at{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Im extends ir{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ge(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Wr=new tt,Ka=new b,Ja=new b;class Wl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new po,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ka.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ka),Ja.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ja),t.updateMatrixWorld(),Wr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Wr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Qa=new tt,Gi=new b,Xr=new b;class Um extends Wl{constructor(){super(new Bt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ae(4,2),this._viewportCount=6,this._viewports=[new st(2,1,1,1),new st(0,1,1,1),new st(3,1,1,1),new st(1,1,1,1),new st(3,0,1,1),new st(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Gi.setFromMatrixPosition(e.matrixWorld),n.position.copy(Gi),Xr.copy(n.position),Xr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Xr),n.updateMatrixWorld(),i.makeTranslation(-Gi.x,-Gi.y,-Gi.z),Qa.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qa)}}class oo extends ir{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Um}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Om extends Wl{constructor(){super(new Ul(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Xl extends ir{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.target=new at,this.shadow=new Om}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class jl extends ir{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Un{constructor(e,t,n=0,i=1/0){this.ray=new er(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new fo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return ao(e,this,n,t),n.sort(el),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)ao(e[i],this,n,t);return n.sort(el),n}}function el(r,e){return r.distance-e.distance}function ao(r,e,t,n){if(r.layers.test(e.layers)&&r.raycast(e,t),n===!0){const i=r.children;for(let s=0,o=i.length;s<o;s++)ao(i[s],e,t,!0)}}class tl{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(pt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Nm extends nr{constructor(e=10,t=10,n=4473924,i=8947848){n=new ge(n),i=new ge(i);const s=t/2,o=e/t,a=e/2,l=[],h=[];for(let u=0,p=0,g=-a;u<=t;u++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);const y=u===s?n:i;y.toArray(h,p),p+=3,y.toArray(h,p),p+=3,y.toArray(h,p),p+=3,y.toArray(h,p),p+=3}const c=new rt;c.setAttribute("position",new Xe(l,3)),c.setAttribute("color",new Xe(h,3));const d=new Jt({vertexColors:!0,toneMapped:!1});super(c,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Fm extends nr{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new rt;s.setIndex(new jt(n,1)),s.setAttribute("position",new Xe(i,3)),super(s,new Jt({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$s}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$s);const nl={type:"change"},jr={type:"start"},il={type:"end"},Is=new er,sl=new Vt,zm=Math.cos(70*tn.DEG2RAD);class Bm extends ei{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new b,this.cursor=new b,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:un.ROTATE,MIDDLE:un.DOLLY,RIGHT:un.PAN},this.touches={ONE:Tn.ROTATE,TWO:Tn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(L){L.addEventListener("keydown",w),this._domElementKeyEvents=L},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",w),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(nl),n.update(),s=i.NONE},this.update=function(){const L=new b,re=new Ke().setFromUnitVectors(e.up,new b(0,1,0)),K=re.clone().invert(),we=new b,_e=new Ke,be=new b,ve=2*Math.PI;return function(Ge=null){const I=n.object.position;L.copy(I).sub(n.target),L.applyQuaternion(re),a.setFromVector3(L),n.autoRotate&&s===i.NONE&&F(S(Ge)),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let le=n.minAzimuthAngle,ee=n.maxAzimuthAngle;isFinite(le)&&isFinite(ee)&&(le<-Math.PI?le+=ve:le>Math.PI&&(le-=ve),ee<-Math.PI?ee+=ve:ee>Math.PI&&(ee-=ve),le<=ee?a.theta=Math.max(le,Math.min(ee,a.theta)):a.theta=a.theta>(le+ee)/2?Math.max(le,a.theta):Math.min(ee,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(c,n.dampingFactor):n.target.add(c),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&T||n.object.isOrthographicCamera?a.radius=Y(a.radius):a.radius=Y(a.radius*h),L.setFromSpherical(a),L.applyQuaternion(K),I.copy(n.target).add(L),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,c.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),c.set(0,0,0));let q=!1;if(n.zoomToCursor&&T){let se=null;if(n.object.isPerspectiveCamera){const Me=L.length();se=Y(Me*h);const He=Me-se;n.object.position.addScaledVector(_,He),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Me=new b(E.x,E.y,0);Me.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/h)),n.object.updateProjectionMatrix(),q=!0;const He=new b(E.x,E.y,0);He.unproject(n.object),n.object.position.sub(He).add(Me),n.object.updateMatrixWorld(),se=L.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;se!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(se).add(n.object.position):(Is.origin.copy(n.object.position),Is.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Is.direction))<zm?e.lookAt(n.target):(sl.setFromNormalAndCoplanarPoint(n.object.up,n.target),Is.intersectPlane(sl,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/h)),n.object.updateProjectionMatrix(),q=!0);return h=1,T=!1,q||we.distanceToSquared(n.object.position)>o||8*(1-_e.dot(n.object.quaternion))>o||be.distanceToSquared(n.target)>0?(n.dispatchEvent(nl),we.copy(n.object.position),_e.copy(n.object.quaternion),be.copy(n.target),q=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Q),n.domElement.removeEventListener("pointerdown",Ue),n.domElement.removeEventListener("pointercancel",We),n.domElement.removeEventListener("wheel",P),n.domElement.removeEventListener("pointermove",Le),n.domElement.removeEventListener("pointerup",We),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",w),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=i.NONE;const o=1e-6,a=new tl,l=new tl;let h=1;const c=new b,d=new ae,u=new ae,p=new ae,g=new ae,y=new ae,m=new ae,f=new ae,M=new ae,v=new ae,_=new b,E=new ae;let T=!1;const x=[],D={};function S(L){return L!==null?2*Math.PI/60*n.autoRotateSpeed*L:2*Math.PI/60/60*n.autoRotateSpeed}function A(){return Math.pow(.95,n.zoomSpeed)}function F(L){l.theta-=L}function G(L){l.phi-=L}const Z=function(){const L=new b;return function(K,we){L.setFromMatrixColumn(we,0),L.multiplyScalar(-K),c.add(L)}}(),R=function(){const L=new b;return function(K,we){n.screenSpacePanning===!0?L.setFromMatrixColumn(we,1):(L.setFromMatrixColumn(we,0),L.crossVectors(n.object.up,L)),L.multiplyScalar(K),c.add(L)}}(),O=function(){const L=new b;return function(K,we){const _e=n.domElement;if(n.object.isPerspectiveCamera){const be=n.object.position;L.copy(be).sub(n.target);let ve=L.length();ve*=Math.tan(n.object.fov/2*Math.PI/180),Z(2*K*ve/_e.clientHeight,n.object.matrix),R(2*we*ve/_e.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(Z(K*(n.object.right-n.object.left)/n.object.zoom/_e.clientWidth,n.object.matrix),R(we*(n.object.top-n.object.bottom)/n.object.zoom/_e.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function X(L){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?h/=L:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function H(L){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?h*=L:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function J(L){if(!n.zoomToCursor)return;T=!0;const re=n.domElement.getBoundingClientRect(),K=L.clientX-re.left,we=L.clientY-re.top,_e=re.width,be=re.height;E.x=K/_e*2-1,E.y=-(we/be)*2+1,_.set(E.x,E.y,1).unproject(n.object).sub(n.object.position).normalize()}function Y(L){return Math.max(n.minDistance,Math.min(n.maxDistance,L))}function $(L){d.set(L.clientX,L.clientY)}function U(L){J(L),f.set(L.clientX,L.clientY)}function V(L){g.set(L.clientX,L.clientY)}function he(L){u.set(L.clientX,L.clientY),p.subVectors(u,d).multiplyScalar(n.rotateSpeed);const re=n.domElement;F(2*Math.PI*p.x/re.clientHeight),G(2*Math.PI*p.y/re.clientHeight),d.copy(u),n.update()}function ue(L){M.set(L.clientX,L.clientY),v.subVectors(M,f),v.y>0?X(A()):v.y<0&&H(A()),f.copy(M),n.update()}function me(L){y.set(L.clientX,L.clientY),m.subVectors(y,g).multiplyScalar(n.panSpeed),O(m.x,m.y),g.copy(y),n.update()}function Te(L){J(L),L.deltaY<0?H(A()):L.deltaY>0&&X(A()),n.update()}function ke(L){let re=!1;switch(L.code){case n.keys.UP:L.ctrlKey||L.metaKey||L.shiftKey?G(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):O(0,n.keyPanSpeed),re=!0;break;case n.keys.BOTTOM:L.ctrlKey||L.metaKey||L.shiftKey?G(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):O(0,-n.keyPanSpeed),re=!0;break;case n.keys.LEFT:L.ctrlKey||L.metaKey||L.shiftKey?F(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):O(n.keyPanSpeed,0),re=!0;break;case n.keys.RIGHT:L.ctrlKey||L.metaKey||L.shiftKey?F(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):O(-n.keyPanSpeed,0),re=!0;break}re&&(L.preventDefault(),n.update())}function Ae(){if(x.length===1)d.set(x[0].pageX,x[0].pageY);else{const L=.5*(x[0].pageX+x[1].pageX),re=.5*(x[0].pageY+x[1].pageY);d.set(L,re)}}function Re(){if(x.length===1)g.set(x[0].pageX,x[0].pageY);else{const L=.5*(x[0].pageX+x[1].pageX),re=.5*(x[0].pageY+x[1].pageY);g.set(L,re)}}function Je(){const L=x[0].pageX-x[1].pageX,re=x[0].pageY-x[1].pageY,K=Math.sqrt(L*L+re*re);f.set(0,K)}function Ne(){n.enableZoom&&Je(),n.enablePan&&Re()}function z(){n.enableZoom&&Je(),n.enableRotate&&Ae()}function xt(L){if(x.length==1)u.set(L.pageX,L.pageY);else{const K=de(L),we=.5*(L.pageX+K.x),_e=.5*(L.pageY+K.y);u.set(we,_e)}p.subVectors(u,d).multiplyScalar(n.rotateSpeed);const re=n.domElement;F(2*Math.PI*p.x/re.clientHeight),G(2*Math.PI*p.y/re.clientHeight),d.copy(u)}function Se(L){if(x.length===1)y.set(L.pageX,L.pageY);else{const re=de(L),K=.5*(L.pageX+re.x),we=.5*(L.pageY+re.y);y.set(K,we)}m.subVectors(y,g).multiplyScalar(n.panSpeed),O(m.x,m.y),g.copy(y)}function Ce(L){const re=de(L),K=L.pageX-re.x,we=L.pageY-re.y,_e=Math.sqrt(K*K+we*we);M.set(0,_e),v.set(0,Math.pow(M.y/f.y,n.zoomSpeed)),X(v.y),f.copy(M)}function Pe(L){n.enableZoom&&Ce(L),n.enablePan&&Se(L)}function nt(L){n.enableZoom&&Ce(L),n.enableRotate&&xt(L)}function Ue(L){n.enabled!==!1&&(x.length===0&&(n.domElement.setPointerCapture(L.pointerId),n.domElement.addEventListener("pointermove",Le),n.domElement.addEventListener("pointerup",We)),ie(L),L.pointerType==="touch"?B(L):ct(L))}function Le(L){n.enabled!==!1&&(L.pointerType==="touch"?ne(L):vt(L))}function We(L){ye(L),x.length===0&&(n.domElement.releasePointerCapture(L.pointerId),n.domElement.removeEventListener("pointermove",Le),n.domElement.removeEventListener("pointerup",We)),n.dispatchEvent(il),s=i.NONE}function ct(L){let re;switch(L.button){case 0:re=n.mouseButtons.LEFT;break;case 1:re=n.mouseButtons.MIDDLE;break;case 2:re=n.mouseButtons.RIGHT;break;default:re=-1}switch(re){case un.DOLLY:if(n.enableZoom===!1)return;U(L),s=i.DOLLY;break;case un.ROTATE:if(L.ctrlKey||L.metaKey||L.shiftKey){if(n.enablePan===!1)return;V(L),s=i.PAN}else{if(n.enableRotate===!1)return;$(L),s=i.ROTATE}break;case un.PAN:if(L.ctrlKey||L.metaKey||L.shiftKey){if(n.enableRotate===!1)return;$(L),s=i.ROTATE}else{if(n.enablePan===!1)return;V(L),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(jr)}function vt(L){switch(s){case i.ROTATE:if(n.enableRotate===!1)return;he(L);break;case i.DOLLY:if(n.enableZoom===!1)return;ue(L);break;case i.PAN:if(n.enablePan===!1)return;me(L);break}}function P(L){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(L.preventDefault(),n.dispatchEvent(jr),Te(L),n.dispatchEvent(il))}function w(L){n.enabled===!1||n.enablePan===!1||ke(L)}function B(L){switch(oe(L),x.length){case 1:switch(n.touches.ONE){case Tn.ROTATE:if(n.enableRotate===!1)return;Ae(),s=i.TOUCH_ROTATE;break;case Tn.PAN:if(n.enablePan===!1)return;Re(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case Tn.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Ne(),s=i.TOUCH_DOLLY_PAN;break;case Tn.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;z(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(jr)}function ne(L){switch(oe(L),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;xt(L),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;Se(L),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Pe(L),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;nt(L),n.update();break;default:s=i.NONE}}function Q(L){n.enabled!==!1&&L.preventDefault()}function ie(L){x.push(L)}function ye(L){delete D[L.pointerId];for(let re=0;re<x.length;re++)if(x[re].pointerId==L.pointerId){x.splice(re,1);return}}function oe(L){let re=D[L.pointerId];re===void 0&&(re=new ae,D[L.pointerId]=re),re.set(L.pageX,L.pageY)}function de(L){const re=L.pointerId===x[0].pointerId?x[1]:x[0];return D[re.pointerId]}n.domElement.addEventListener("contextmenu",Q),n.domElement.addEventListener("pointerdown",Ue),n.domElement.addEventListener("pointercancel",We),n.domElement.addEventListener("wheel",P,{passive:!1}),this.update()}}const Vn=new Un,bt=new b,En=new b,it=new Ke,rl={X:new b(1,0,0),Y:new b(0,1,0),Z:new b(0,0,1)},Yr={type:"change"},ol={type:"mouseDown"},al={type:"mouseUp",mode:null},ll={type:"objectChange"};class km extends at{constructor(e,t){super(),t===void 0&&(console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'),t=document),this.isTransformControls=!0,this.visible=!1,this.domElement=t,this.domElement.style.touchAction="none";const n=new jm;this._gizmo=n,this.add(n);const i=new Ym;this._plane=i,this.add(i);const s=this;function o(M,v){let _=v;Object.defineProperty(s,M,{get:function(){return _!==void 0?_:v},set:function(E){_!==E&&(_=E,i[M]=E,n[M]=E,s.dispatchEvent({type:M+"-changed",value:E}),s.dispatchEvent(Yr))}}),s[M]=v,i[M]=v,n[M]=v}o("camera",e),o("object",void 0),o("enabled",!0),o("axis",null),o("mode","translate"),o("translationSnap",null),o("rotationSnap",null),o("scaleSnap",null),o("space","world"),o("size",1),o("dragging",!1),o("showX",!0),o("showY",!0),o("showZ",!0);const a=new b,l=new b,h=new Ke,c=new Ke,d=new b,u=new Ke,p=new b,g=new b,y=new b,m=0,f=new b;o("worldPosition",a),o("worldPositionStart",l),o("worldQuaternion",h),o("worldQuaternionStart",c),o("cameraPosition",d),o("cameraQuaternion",u),o("pointStart",p),o("pointEnd",g),o("rotationAxis",y),o("rotationAngle",m),o("eye",f),this._offset=new b,this._startNorm=new b,this._endNorm=new b,this._cameraScale=new b,this._parentPosition=new b,this._parentQuaternion=new Ke,this._parentQuaternionInv=new Ke,this._parentScale=new b,this._worldScaleStart=new b,this._worldQuaternionInv=new Ke,this._worldScale=new b,this._positionStart=new b,this._quaternionStart=new Ke,this._scaleStart=new b,this._getPointer=Gm.bind(this),this._onPointerDown=Vm.bind(this),this._onPointerHover=Hm.bind(this),this._onPointerMove=Wm.bind(this),this._onPointerUp=Xm.bind(this),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp)}updateMatrixWorld(){this.object!==void 0&&(this.object.updateMatrixWorld(),this.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):this.object.parent.matrixWorld.decompose(this._parentPosition,this._parentQuaternion,this._parentScale),this.object.matrixWorld.decompose(this.worldPosition,this.worldQuaternion,this._worldScale),this._parentQuaternionInv.copy(this._parentQuaternion).invert(),this._worldQuaternionInv.copy(this.worldQuaternion).invert()),this.camera.updateMatrixWorld(),this.camera.matrixWorld.decompose(this.cameraPosition,this.cameraQuaternion,this._cameraScale),this.camera.isOrthographicCamera?this.camera.getWorldDirection(this.eye).negate():this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(),super.updateMatrixWorld(this)}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;Vn.setFromCamera(e,this.camera);const t=qr(this._gizmo.picker[this.mode],Vn);t?this.axis=t.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e.button!==0)&&this.axis!==null){Vn.setFromCamera(e,this.camera);const t=qr(this._plane,Vn,!0);t&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(t.point).sub(this.worldPositionStart)),this.dragging=!0,ol.mode=this.mode,this.dispatchEvent(ol)}}pointerMove(e){const t=this.axis,n=this.mode,i=this.object;let s=this.space;if(n==="scale"?s="local":(t==="E"||t==="XYZE"||t==="XYZ")&&(s="world"),i===void 0||t===null||this.dragging===!1||e.button!==-1)return;Vn.setFromCamera(e,this.camera);const o=qr(this._plane,Vn,!0);if(o){if(this.pointEnd.copy(o.point).sub(this.worldPositionStart),n==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),s==="local"&&t!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),t.indexOf("X")===-1&&(this._offset.x=0),t.indexOf("Y")===-1&&(this._offset.y=0),t.indexOf("Z")===-1&&(this._offset.z=0),s==="local"&&t!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),i.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(s==="local"&&(i.position.applyQuaternion(it.copy(this._quaternionStart).invert()),t.search("X")!==-1&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.position.applyQuaternion(this._quaternionStart)),s==="world"&&(i.parent&&i.position.add(bt.setFromMatrixPosition(i.parent.matrixWorld)),t.search("X")!==-1&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.parent&&i.position.sub(bt.setFromMatrixPosition(i.parent.matrixWorld))));else if(n==="scale"){if(t.search("XYZ")!==-1){let a=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(a*=-1),En.set(a,a,a)}else bt.copy(this.pointStart),En.copy(this.pointEnd),bt.applyQuaternion(this._worldQuaternionInv),En.applyQuaternion(this._worldQuaternionInv),En.divide(bt),t.search("X")===-1&&(En.x=1),t.search("Y")===-1&&(En.y=1),t.search("Z")===-1&&(En.z=1);i.scale.copy(this._scaleStart).multiply(En),this.scaleSnap&&(t.search("X")!==-1&&(i.scale.x=Math.round(i.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Y")!==-1&&(i.scale.y=Math.round(i.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Z")!==-1&&(i.scale.z=Math.round(i.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(n==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const a=20/this.worldPosition.distanceTo(bt.setFromMatrixPosition(this.camera.matrixWorld));let l=!1;t==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(bt.copy(this.rotationAxis).cross(this.eye))*a):(t==="X"||t==="Y"||t==="Z")&&(this.rotationAxis.copy(rl[t]),bt.copy(rl[t]),s==="local"&&bt.applyQuaternion(this.worldQuaternion),bt.cross(this.eye),bt.length()===0?l=!0:this.rotationAngle=this._offset.dot(bt.normalize())*a),(t==="E"||l)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),s==="local"&&t!=="E"&&t!=="XYZE"?(i.quaternion.copy(this._quaternionStart),i.quaternion.multiply(it.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),i.quaternion.copy(it.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),i.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(Yr),this.dispatchEvent(ll)}}pointerUp(e){e.button===0&&(this.dragging&&this.axis!==null&&(al.mode=this.mode,this.dispatchEvent(al)),this.dragging=!1,this.axis=null)}dispose(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}attach(e){return this.object=e,this.visible=!0,this}detach(){return this.object=void 0,this.visible=!1,this.axis=null,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(Yr),this.dispatchEvent(ll),this.pointStart.copy(this.pointEnd))}getRaycaster(){return Vn}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}}function Gm(r){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:r.button};{const e=this.domElement.getBoundingClientRect();return{x:(r.clientX-e.left)/e.width*2-1,y:-(r.clientY-e.top)/e.height*2+1,button:r.button}}}function Hm(r){if(this.enabled)switch(r.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(r));break}}function Vm(r){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(r)),this.pointerDown(this._getPointer(r)))}function Wm(r){this.enabled&&this.pointerMove(this._getPointer(r))}function Xm(r){this.enabled&&(this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(r)))}function qr(r,e,t){const n=e.intersectObject(r,!0);for(let i=0;i<n.length;i++)if(n[i].object.visible||t)return n[i];return!1}const Us=new Ri,$e=new b(0,1,0),cl=new b(0,0,0),hl=new tt,Os=new Ke,zs=new Ke,en=new b,dl=new tt,Xi=new b(1,0,0),Xn=new b(0,1,0),ji=new b(0,0,1),Ns=new b,Hi=new b,Vi=new b;class jm extends at{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const e=new Dt({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),t=new Jt({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=e.clone();n.opacity=.15;const i=t.clone();i.opacity=.5;const s=e.clone();s.color.setHex(16711680);const o=e.clone();o.color.setHex(65280);const a=e.clone();a.color.setHex(255);const l=e.clone();l.color.setHex(16711680),l.opacity=.5;const h=e.clone();h.color.setHex(65280),h.opacity=.5;const c=e.clone();c.color.setHex(255),c.opacity=.5;const d=e.clone();d.opacity=.25;const u=e.clone();u.color.setHex(16776960),u.opacity=.25,e.clone().color.setHex(16776960);const g=e.clone();g.color.setHex(7895160);const y=new Ye(0,.04,.1,12);y.translate(0,.05,0);const m=new et(.08,.08,.08);m.translate(0,.04,0);const f=new rt;f.setAttribute("position",new Xe([0,0,0,1,0,0],3));const M=new Ye(.0075,.0075,.5,3);M.translate(0,.25,0);function v(O,X){const H=new qn(O,.0075,3,64,X*Math.PI*2);return H.rotateY(Math.PI/2),H.rotateX(Math.PI/2),H}function _(){const O=new rt;return O.setAttribute("position",new Xe([0,0,0,1,1,1],3)),O}const E={X:[[new te(y,s),[.5,0,0],[0,0,-Math.PI/2]],[new te(y,s),[-.5,0,0],[0,0,Math.PI/2]],[new te(M,s),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new te(y,o),[0,.5,0]],[new te(y,o),[0,-.5,0],[Math.PI,0,0]],[new te(M,o)]],Z:[[new te(y,a),[0,0,.5],[Math.PI/2,0,0]],[new te(y,a),[0,0,-.5],[-Math.PI/2,0,0]],[new te(M,a),null,[Math.PI/2,0,0]]],XYZ:[[new te(new Si(.1,0),d.clone()),[0,0,0]]],XY:[[new te(new et(.15,.15,.01),c.clone()),[.15,.15,0]]],YZ:[[new te(new et(.15,.15,.01),l.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new te(new et(.15,.15,.01),h.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},T={X:[[new te(new Ye(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new te(new Ye(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new te(new Ye(.2,0,.6,4),n),[0,.3,0]],[new te(new Ye(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new te(new Ye(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new te(new Ye(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new te(new Si(.2,0),n)]],XY:[[new te(new et(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new te(new et(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new te(new et(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]]},x={START:[[new te(new Si(.01,2),i),null,null,null,"helper"]],END:[[new te(new Si(.01,2),i),null,null,null,"helper"]],DELTA:[[new Ft(_(),i),null,null,null,"helper"]],X:[[new Ft(f,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new Ft(f,i.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new Ft(f,i.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},D={XYZE:[[new te(v(.5,1),g),null,[0,Math.PI/2,0]]],X:[[new te(v(.5,.5),s)]],Y:[[new te(v(.5,.5),o),null,[0,0,-Math.PI/2]]],Z:[[new te(v(.5,.5),a),null,[0,Math.PI/2,0]]],E:[[new te(v(.75,1),u),null,[0,Math.PI/2,0]]]},S={AXIS:[[new Ft(f,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},A={XYZE:[[new te(new Qn(.25,10,8),n)]],X:[[new te(new qn(.5,.1,4,24),n),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new te(new qn(.5,.1,4,24),n),[0,0,0],[Math.PI/2,0,0]]],Z:[[new te(new qn(.5,.1,4,24),n),[0,0,0],[0,0,-Math.PI/2]]],E:[[new te(new qn(.75,.1,2,24),n)]]},F={X:[[new te(m,s),[.5,0,0],[0,0,-Math.PI/2]],[new te(M,s),[0,0,0],[0,0,-Math.PI/2]],[new te(m,s),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new te(m,o),[0,.5,0]],[new te(M,o)],[new te(m,o),[0,-.5,0],[0,0,Math.PI]]],Z:[[new te(m,a),[0,0,.5],[Math.PI/2,0,0]],[new te(M,a),[0,0,0],[Math.PI/2,0,0]],[new te(m,a),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new te(new et(.15,.15,.01),c),[.15,.15,0]]],YZ:[[new te(new et(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new te(new et(.15,.15,.01),h),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new te(new et(.1,.1,.1),d.clone())]]},G={X:[[new te(new Ye(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new te(new Ye(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new te(new Ye(.2,0,.6,4),n),[0,.3,0]],[new te(new Ye(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new te(new Ye(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new te(new Ye(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new te(new et(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new te(new et(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new te(new et(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new te(new et(.2,.2,.2),n),[0,0,0]]]},Z={X:[[new Ft(f,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new Ft(f,i.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new Ft(f,i.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function R(O){const X=new at;for(const H in O)for(let J=O[H].length;J--;){const Y=O[H][J][0].clone(),$=O[H][J][1],U=O[H][J][2],V=O[H][J][3],he=O[H][J][4];Y.name=H,Y.tag=he,$&&Y.position.set($[0],$[1],$[2]),U&&Y.rotation.set(U[0],U[1],U[2]),V&&Y.scale.set(V[0],V[1],V[2]),Y.updateMatrix();const ue=Y.geometry.clone();ue.applyMatrix4(Y.matrix),Y.geometry=ue,Y.renderOrder=1/0,Y.position.set(0,0,0),Y.rotation.set(0,0,0),Y.scale.set(1,1,1),X.add(Y)}return X}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=R(E)),this.add(this.gizmo.rotate=R(D)),this.add(this.gizmo.scale=R(F)),this.add(this.picker.translate=R(T)),this.add(this.picker.rotate=R(A)),this.add(this.picker.scale=R(G)),this.add(this.helper.translate=R(x)),this.add(this.helper.rotate=R(S)),this.add(this.helper.scale=R(Z)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){const n=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:zs;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let i=[];i=i.concat(this.picker[this.mode].children),i=i.concat(this.gizmo[this.mode].children),i=i.concat(this.helper[this.mode].children);for(let s=0;s<i.length;s++){const o=i[s];o.visible=!0,o.rotation.set(0,0,0),o.position.copy(this.worldPosition);let a;if(this.camera.isOrthographicCamera?a=(this.camera.top-this.camera.bottom)/this.camera.zoom:a=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),o.scale.set(1,1,1).multiplyScalar(a*this.size/4),o.tag==="helper"){o.visible=!1,o.name==="AXIS"?(o.visible=!!this.axis,this.axis==="X"&&(it.setFromEuler(Us.set(0,0,0)),o.quaternion.copy(n).multiply(it),Math.abs($e.copy(Xi).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Y"&&(it.setFromEuler(Us.set(0,0,Math.PI/2)),o.quaternion.copy(n).multiply(it),Math.abs($e.copy(Xn).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Z"&&(it.setFromEuler(Us.set(0,Math.PI/2,0)),o.quaternion.copy(n).multiply(it),Math.abs($e.copy(ji).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="XYZE"&&(it.setFromEuler(Us.set(0,Math.PI/2,0)),$e.copy(this.rotationAxis),o.quaternion.setFromRotationMatrix(hl.lookAt(cl,$e,Xn)),o.quaternion.multiply(it),o.visible=this.dragging),this.axis==="E"&&(o.visible=!1)):o.name==="START"?(o.position.copy(this.worldPositionStart),o.visible=this.dragging):o.name==="END"?(o.position.copy(this.worldPosition),o.visible=this.dragging):o.name==="DELTA"?(o.position.copy(this.worldPositionStart),o.quaternion.copy(this.worldQuaternionStart),bt.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),bt.applyQuaternion(this.worldQuaternionStart.clone().invert()),o.scale.copy(bt),o.visible=this.dragging):(o.quaternion.copy(n),this.dragging?o.position.copy(this.worldPositionStart):o.position.copy(this.worldPosition),this.axis&&(o.visible=this.axis.search(o.name)!==-1));continue}o.quaternion.copy(n),this.mode==="translate"||this.mode==="scale"?(o.name==="X"&&Math.abs($e.copy(Xi).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Y"&&Math.abs($e.copy(Xn).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Z"&&Math.abs($e.copy(ji).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XY"&&Math.abs($e.copy(ji).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="YZ"&&Math.abs($e.copy(Xi).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XZ"&&Math.abs($e.copy(Xn).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1)):this.mode==="rotate"&&(Os.copy(n),$e.copy(this.eye).applyQuaternion(it.copy(n).invert()),o.name.search("E")!==-1&&o.quaternion.setFromRotationMatrix(hl.lookAt(this.eye,cl,Xn)),o.name==="X"&&(it.setFromAxisAngle(Xi,Math.atan2(-$e.y,$e.z)),it.multiplyQuaternions(Os,it),o.quaternion.copy(it)),o.name==="Y"&&(it.setFromAxisAngle(Xn,Math.atan2($e.x,$e.z)),it.multiplyQuaternions(Os,it),o.quaternion.copy(it)),o.name==="Z"&&(it.setFromAxisAngle(ji,Math.atan2($e.y,$e.x)),it.multiplyQuaternions(Os,it),o.quaternion.copy(it))),o.visible=o.visible&&(o.name.indexOf("X")===-1||this.showX),o.visible=o.visible&&(o.name.indexOf("Y")===-1||this.showY),o.visible=o.visible&&(o.name.indexOf("Z")===-1||this.showZ),o.visible=o.visible&&(o.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),o.material._color=o.material._color||o.material.color.clone(),o.material._opacity=o.material._opacity||o.material.opacity,o.material.color.copy(o.material._color),o.material.opacity=o.material._opacity,this.enabled&&this.axis&&(o.name===this.axis||this.axis.split("").some(function(l){return o.name===l}))&&(o.material.color.setHex(16776960),o.material.opacity=1)}super.updateMatrixWorld(e)}}class Ym extends te{constructor(){super(new Di(1e5,1e5,2,2),new Dt({visible:!1,wireframe:!0,side:Wt,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(e){let t=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(t="local"),Ns.copy(Xi).applyQuaternion(t==="local"?this.worldQuaternion:zs),Hi.copy(Xn).applyQuaternion(t==="local"?this.worldQuaternion:zs),Vi.copy(ji).applyQuaternion(t==="local"?this.worldQuaternion:zs),$e.copy(Hi),this.mode){case"translate":case"scale":switch(this.axis){case"X":$e.copy(this.eye).cross(Ns),en.copy(Ns).cross($e);break;case"Y":$e.copy(this.eye).cross(Hi),en.copy(Hi).cross($e);break;case"Z":$e.copy(this.eye).cross(Vi),en.copy(Vi).cross($e);break;case"XY":en.copy(Vi);break;case"YZ":en.copy(Ns);break;case"XZ":$e.copy(Vi),en.copy(Hi);break;case"XYZ":case"E":en.set(0,0,0);break}break;case"rotate":default:en.set(0,0,0)}en.length()===0?this.quaternion.copy(this.cameraQuaternion):(dl.lookAt(bt.set(0,0,0),en,$e),this.quaternion.setFromRotationMatrix(dl)),super.updateMatrixWorld(e)}}class qm{constructor(e,t={}){this.container=e,this.options={antialias:!0,alpha:!0,powerPreference:"high-performance",stencil:!0,depth:!0,logarithmicDepthBuffer:!0,...t},this.renderer=null,this.isWebGL2Supported=!1,this.capabilities={},this.extensions=new Map,this.init()}init(){const e=document.createElement("canvas"),t=e.getContext("webgl2",this.options);t?(this.isWebGL2Supported=!0,console.log("✅ WebGL2 supported and initialized"),this.renderer=new js({canvas:e,context:t,...this.options}),this.setupWebGL2Features()):(console.warn("⚠️ WebGL2 not supported, falling back to WebGL1"),this.isWebGL2Supported=!1,this.renderer=new js(this.options)),this.setupRenderer(),this.container.appendChild(this.renderer.domElement)}setupWebGL2Features(){if(!this.isWebGL2Supported)return;const e=this.renderer.getContext();this.capabilities={maxTextureSize:e.getParameter(e.MAX_TEXTURE_SIZE),maxCubeMapTextureSize:e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),maxArrayTextureLayers:e.getParameter(e.MAX_ARRAY_TEXTURE_LAYERS),max3DTextureSize:e.getParameter(e.MAX_3D_TEXTURE_SIZE),maxVertexUniformBlocks:e.getParameter(e.MAX_VERTEX_UNIFORM_BLOCKS),maxFragmentUniformBlocks:e.getParameter(e.MAX_FRAGMENT_UNIFORM_BLOCKS),maxUniformBlockSize:e.getParameter(e.MAX_UNIFORM_BLOCK_SIZE),maxVertexOutputComponents:e.getParameter(e.MAX_VERTEX_OUTPUT_COMPONENTS),maxFragmentInputComponents:e.getParameter(e.MAX_FRAGMENT_INPUT_COMPONENTS)},e.getSupportedExtensions().forEach(n=>{if(n.includes("EXT_")||n.includes("WEBGL_")||n.includes("OES_"))try{const i=e.getExtension(n);i&&this.extensions.set(n,i)}catch{console.warn(`Failed to load extension: ${n}`)}}),console.log("📊 WebGL2 Capabilities:",this.capabilities),console.log("🔧 Available Extensions:",Array.from(this.extensions.keys())),this.setupAdvancedFeatures()}setupAdvancedFeatures(){const e=this.renderer;this.isWebGL2Supported&&(e.shadowMap.enabled=!0,e.shadowMap.type=fl,e.shadowMap.autoUpdate=!0),e.outputColorSpace=ft,e.toneMapping=lo,e.toneMappingExposure=1.2,e.sortObjects=!0,e.setClearColor(8900331,1)}setupRenderer(){this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.info.autoReset=!1,this.setupDebugInfo()}setupDebugInfo(){this.performanceMonitor={frameCount:0,lastTime:performance.now(),fps:0,drawCalls:0,triangles:0,points:0,lines:0},this.options.debug&&this.createDebugPanel()}createDebugPanel(){const e=document.createElement("div");e.id="webgl2-debug-panel",e.style.cssText=`
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0,0,0,0.8);
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            padding: 10px;
            border-radius: 5px;
            z-index: 10000;
            min-width: 200px;
        `,e.innerHTML=`
            <div><strong>🚀 WebGL${this.isWebGL2Supported?"2":"1"} Renderer</strong></div>
            <div id="fps-counter">FPS: --</div>
            <div id="draw-calls">Draw Calls: --</div>
            <div id="triangles">Triangles: --</div>
            <div id="memory-usage">Memory: --</div>
            <div id="webgl-version">Version: ${this.isWebGL2Supported?"WebGL2":"WebGL1"}</div>
        `,document.body.appendChild(e),this.debugPanel=e}updateDebugInfo(){if(!this.debugPanel)return;const e=this.performanceMonitor,t=this.renderer.info;e.frameCount++;const n=performance.now();if(n-e.lastTime>=1e3){e.fps=Math.round(e.frameCount*1e3/(n-e.lastTime)),e.frameCount=0,e.lastTime=n,document.getElementById("fps-counter").textContent=`FPS: ${e.fps}`,document.getElementById("draw-calls").textContent=`Draw Calls: ${t.render.calls}`,document.getElementById("triangles").textContent=`Triangles: ${t.render.triangles}`;const i=(t.memory.geometries+t.memory.textures)*.001;document.getElementById("memory-usage").textContent=`Memory: ${i.toFixed(1)}MB`}}createAdvancedMaterial(e,t={}){const n={transparent:t.transparent||!1,opacity:t.opacity||1,color:t.color||16777215,...t};let i;switch(e){case"tunnel":i=new Vr({...n,metalness:.1,roughness:.8,clearcoat:.1,clearcoatRoughness:.2,reflectivity:.1,sheen:.1,sheenColor:4473924});break;case"rock":i=new ro({...n,metalness:.05,roughness:.95,normalScale:new ae(.5,.5)});break;case"metal":i=new Vr({...n,metalness:.9,roughness:.1,clearcoat:1,clearcoatRoughness:.1,reflectivity:.9});break;case"conveyor":i=new Vr({...n,metalness:.3,roughness:.4,clearcoat:.8,clearcoatRoughness:.2,sheen:.2,sheenColor:16755200});break;default:i=new ro(n)}return this.isWebGL2Supported&&(i.defines=i.defines||{},i.defines.USE_WEBGL2=""),i}createAdvancedLighting(e){const t={ambient:null,directional:null,shadows:[]};t.ambient=new jl(4210752,.4),e.add(t.ambient),t.directional=new Xl(16777215,.8),t.directional.position.set(50,50,25),t.directional.castShadow=!0,this.isWebGL2Supported?(t.directional.shadow.mapSize.width=4096,t.directional.shadow.mapSize.height=4096,t.directional.shadow.camera.near=.1,t.directional.shadow.camera.far=200,t.directional.shadow.camera.left=-50,t.directional.shadow.camera.right=50,t.directional.shadow.camera.top=50,t.directional.shadow.camera.bottom=-50,t.directional.shadow.bias=-1e-4,t.directional.shadow.normalBias=.02):(t.directional.shadow.mapSize.width=2048,t.directional.shadow.mapSize.height=2048),e.add(t.directional);const n=new oo(16753920,.5,30);n.position.set(-10,-5,10),n.castShadow=this.isWebGL2Supported,e.add(n);const i=new oo(16753920,.5,30);return i.position.set(15,-5,-10),i.castShadow=this.isWebGL2Supported,e.add(i),t.shadows.push(n,i),t}render(e,t){this.renderer.render(e,t),this.options.debug&&this.updateDebugInfo(),this.renderer.info.reset()}resize(e,t){this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))}dispose(){this.debugPanel&&document.body.removeChild(this.debugPanel),this.renderer.dispose(),this.extensions.clear()}supportsInstancedRendering(){return this.isWebGL2Supported}supportsVolumeRendering(){return this.isWebGL2Supported&&this.extensions.has("EXT_texture_3D")}getMaxTextureUnits(){return this.capabilities.maxTextureSize||16}}class $m{constructor(e,t={}){this.scene=e,this.options={enableSpatialPartitioning:!0,gridSize:10,maxObjectsPerCell:20,enableContinuousDetection:!0,debugVisualization:t.debug||!1,toleranceDistance:.1,...t},this.spatialGrid=new Map,this.dynamicObjects=new Set,this.staticObjects=new Set,this.collisionPairs=new Set,this.callbacks=new Map,this.raycaster=new Un,this.tempBox3=new vn,this.tempSphere=new es,this.tempVector=new b,this.debugMeshes=[],this.init()}init(){console.log("🔍 Collision Detection System initialized"),this.options.debugVisualization&&this.setupDebugVisualization()}registerObject(e,t="static",n={}){return e.userData||(e.userData={}),e.userData.collisionData={type:t,enabled:!0,bounds:null,lastPosition:e.position.clone(),velocity:new b,metadata:n,id:e.uuid||tn.generateUUID()},this.updateObjectBounds(e),t==="dynamic"?this.dynamicObjects.add(e):this.staticObjects.add(e),this.options.enableSpatialPartitioning&&this.addToSpatialGrid(e),console.log(`📦 Registered ${t} object for collision:`,e.userData.collisionData.id),e.userData.collisionData.id}unregisterObject(e){var n;if(!((n=e.userData)!=null&&n.collisionData))return;const t=e.userData.collisionData.id;this.dynamicObjects.delete(e),this.staticObjects.delete(e),this.removeFromSpatialGrid(e),this.callbacks.delete(t),delete e.userData.collisionData,console.log("🗑️ Unregistered collision object:",t)}updateObjectBounds(e){var n;if(!((n=e.userData)!=null&&n.collisionData))return;const t=e.userData.collisionData;if(e.geometry){e.geometry.boundingBox||e.geometry.computeBoundingBox();const i=e.geometry.boundingBox.clone();i.applyMatrix4(e.matrixWorld),t.bounds=i}else{const i=new vn().setFromObject(e);t.bounds=i}if(this.options.enableSpatialPartitioning){const i=e.position.clone();i.distanceTo(t.lastPosition)>.1&&(this.removeFromSpatialGrid(e),this.addToSpatialGrid(e),t.lastPosition.copy(i))}}getGridKey(e){const t=this.options.gridSize,n=Math.floor(e.x/t),i=Math.floor(e.y/t),s=Math.floor(e.z/t);return`${n},${i},${s}`}addToSpatialGrid(e){var l,h;if(!((h=(l=e.userData)==null?void 0:l.collisionData)!=null&&h.bounds))return;const t=e.userData.collisionData.bounds,n=t.min,i=t.max,s=this.options.gridSize,o={x:Math.floor(n.x/s),y:Math.floor(n.y/s),z:Math.floor(n.z/s)},a={x:Math.floor(i.x/s),y:Math.floor(i.y/s),z:Math.floor(i.z/s)};for(let c=o.x;c<=a.x;c++)for(let d=o.y;d<=a.y;d++)for(let u=o.z;u<=a.z;u++){const p=`${c},${d},${u}`;this.spatialGrid.has(p)||this.spatialGrid.set(p,new Set),this.spatialGrid.get(p).add(e)}}removeFromSpatialGrid(e){for(const[t,n]of this.spatialGrid)n.delete(e),n.size===0&&this.spatialGrid.delete(t)}getNearbyObjects(e,t=5){if(!this.options.enableSpatialPartitioning)return new Set([...this.staticObjects,...this.dynamicObjects]);const n=e.position,i=this.options.gridSize,s=Math.ceil(t/i),o=new Set,a={x:Math.floor(n.x/i),y:Math.floor(n.y/i),z:Math.floor(n.z/i)};for(let l=a.x-s;l<=a.x+s;l++)for(let h=a.y-s;h<=a.y+s;h++)for(let c=a.z-s;c<=a.z+s;c++){const d=`${l},${h},${c}`,u=this.spatialGrid.get(d);u&&u.forEach(p=>{p!==e&&o.add(p)})}return o}update(){this.dynamicObjects.forEach(e=>{this.updateObjectBounds(e)}),this.collisionPairs.clear(),this.dynamicObjects.forEach(e=>{var n,i;if(!((i=(n=e.userData)==null?void 0:n.collisionData)!=null&&i.enabled))return;this.getNearbyObjects(e,10).forEach(s=>{var a,l;if(!((l=(a=s.userData)==null?void 0:a.collisionData)!=null&&l.enabled)||e===s)return;const o=this.checkCollision(e,s);if(o){const h=this.getCollisionPairId(e,s);this.collisionPairs.add(h),this.handleCollision(e,s,o)}})}),this.options.debugVisualization&&this.updateDebugVisualization()}checkCollision(e,t){const n=e.userData.collisionData,i=t.userData.collisionData;if(!n||!i||!n.bounds||!i.bounds||!n.bounds.intersectsBox(i.bounds))return null;const s=this.detailedCollisionCheck(e,t);return s?{object1:e,object2:t,point:s.point,normal:s.normal,penetration:s.penetration,distance:s.distance}:null}detailedCollisionCheck(e,t){const n=e.userData.collisionData.metadata.type||"box",i=t.userData.collisionData.metadata.type||"box";return n==="tunnel"||i==="tunnel"?this.checkTunnelCollision(e,t):n==="path"||i==="path"?this.checkPathCollision(e,t):this.checkBoxCollision(e,t)}checkTunnelCollision(e,t){const n=e.userData.collisionData,i=t.userData.collisionData;if(!n.bounds||!i.bounds)return null;const s=n.bounds,o=i.bounds,a=s.clone().intersect(o);if(a.isEmpty())return null;const l=a.getSize(new b),h=Math.min(l.x,l.y,l.z),c=s.getCenter(new b),d=o.getCenter(new b),u=d.clone().sub(c).normalize();return{point:a.getCenter(new b),normal:u,penetration:h,distance:c.distanceTo(d)}}checkPathCollision(e,t){var s;const n=e.userData.pathData,i=t.userData.collisionData.bounds;if(!n||!n.points||!i)return null;for(let o=0;o<n.points.length-1;o++){const a=new b().copy(n.points[o]),l=new b().copy(n.points[o+1]);e.localToWorld(a),e.localToWorld(l),this.raycaster.set(a,l.clone().sub(a).normalize()),this.raycaster.far=a.distanceTo(l);const h=this.raycaster.intersectObject(t,!0);if(h.length>0){const c=h[0];return{point:c.point,normal:((s=c.face)==null?void 0:s.normal)||new b(0,1,0),penetration:.1,distance:c.distance}}}return null}checkBoxCollision(e,t){const n=e.userData.collisionData.bounds,i=t.userData.collisionData.bounds,s=n.clone().intersect(i);if(s.isEmpty())return null;const o=s.getSize(new b),a=Math.min(o.x,o.y,o.z),l=n.getCenter(new b),h=i.getCenter(new b),c=h.clone().sub(l).normalize();return{point:s.getCenter(new b),normal:c,penetration:a,distance:l.distanceTo(h)}}handleCollision(e,t,n){const i=e.userData.collisionData.id,s=t.userData.collisionData.id,o=this.callbacks.get(i),a=this.callbacks.get(s);o&&o(e,t,n),a&&a(t,e,n),this.defaultCollisionResponse(e,t,n)}defaultCollisionResponse(e,t,n){if(e.userData.collisionData.type==="dynamic"){const i=n.normal.clone().multiplyScalar(-n.penetration);e.position.add(i)}}getCollisionPairId(e,t){const n=e.userData.collisionData.id,i=t.userData.collisionData.id;return n<i?`${n}-${i}`:`${i}-${n}`}registerCollisionCallback(e,t){this.callbacks.set(e,t)}validateTunnelPlacement(e,t){const n={isValid:!0,conflicts:[],warnings:[],suggestions:[]};return t.forEach(i=>{const s=this.checkCollision(e,i);s&&(n.isValid=!1,n.conflicts.push({object:i,collision:s,severity:this.calculateConflictSeverity(s)}))}),n}calculateConflictSeverity(e){const t=e.penetration;return t>2?"critical":t>1?"major":t>.5?"minor":"warning"}detectPathIntersections(e,t){var o,a;const n=((o=e.userData.pathData)==null?void 0:o.points)||[],i=((a=t.userData.pathData)==null?void 0:a.points)||[],s=[];for(let l=0;l<n.length-1;l++)for(let h=0;h<i.length-1;h++){const c=this.lineSegmentIntersection(n[l],n[l+1],i[h],i[h+1]);c&&s.push({point:c,segment1:{start:n[l],end:n[l+1]},segment2:{start:i[h],end:i[h+1]}})}return s}lineSegmentIntersection(e,t,n,i){const s=t.clone().sub(e),o=i.clone().sub(n),a=n.clone().sub(e),l=new b().crossVectors(s,o);if(l.length()<.001)return null;const h=new b().crossVectors(a,o).dot(l)/l.lengthSq(),c=new b().crossVectors(a,s).dot(l)/l.lengthSq();return h>=0&&h<=1&&c>=0&&c<=1?e.clone().add(s.multiplyScalar(h)):null}setupDebugVisualization(){console.log("🎨 Collision debug visualization enabled")}updateDebugVisualization(){this.debugMeshes.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),e.material.dispose()}),this.debugMeshes=[],[...this.staticObjects,...this.dynamicObjects].forEach(e=>{var t,n;if((n=(t=e.userData)==null?void 0:t.collisionData)!=null&&n.bounds){const i=e.userData.collisionData.bounds,s=new Fm(i,65280);this.scene.add(s),this.debugMeshes.push(s)}}),this.collisionPairs.forEach(e=>{})}dispose(){this.spatialGrid.clear(),this.dynamicObjects.clear(),this.staticObjects.clear(),this.collisionPairs.clear(),this.callbacks.clear(),this.debugMeshes.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),e.material.dispose()}),this.debugMeshes=[]}}class Zm{constructor(e){var t;this.renderer=e,this.isWebGL2=((t=e.capabilities)==null?void 0:t.isWebGL2)||!1,this.shaders=new Map,this.uniformBuffers=new Map,console.log(`🎨 Shader Manager initialized with WebGL${this.isWebGL2?"2":"1"}`),this.initializeShaders()}initializeShaders(){this.createTunnelShader(),this.createRockShader(),this.createMetalShader(),this.createConveyorShader(),this.createDepthBasedFogShader(),this.isWebGL2&&(this.createInstancedShader(),this.createVolumetricShader())}createTunnelShader(){const e=`
            ${this.isWebGL2?"#version 300 es":""}
            ${this.isWebGL2?"in":"attribute"} vec3 position;
            ${this.isWebGL2?"in":"attribute"} vec3 normal;
            ${this.isWebGL2?"in":"attribute"} vec2 uv;
            
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform mat3 normalMatrix;
            uniform float time;
            uniform vec3 cameraPosition;
            
            ${this.isWebGL2?"out":"varying"} vec3 vNormal;
            ${this.isWebGL2?"out":"varying"} vec2 vUv;
            ${this.isWebGL2?"out":"varying"} vec3 vWorldPosition;
            ${this.isWebGL2?"out":"varying"} vec3 vViewPosition;
            ${this.isWebGL2?"out":"varying"} float vDepth;
            
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                
                vec4 worldPosition = modelViewMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                vViewPosition = -worldPosition.xyz;
                
                gl_Position = projectionMatrix * worldPosition;
                vDepth = gl_Position.z / gl_Position.w;
                
                // Subtle tunnel wall movement for realism
                vec3 pos = position;
                pos += normal * sin(time * 0.5 + position.x * 0.1) * 0.01;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,t=`
            ${this.isWebGL2?"#version 300 es":""}
            precision highp float;
            
            uniform vec3 diffuse;
            uniform float opacity;
            uniform float roughness;
            uniform float metalness;
            uniform float time;
            uniform vec3 cameraPosition;
            uniform sampler2D normalMap;
            uniform sampler2D roughnessMap;
            
            ${this.isWebGL2?"in":"varying"} vec3 vNormal;
            ${this.isWebGL2?"in":"varying"} vec2 vUv;
            ${this.isWebGL2?"in":"varying"} vec3 vWorldPosition;
            ${this.isWebGL2?"in":"varying"} vec3 vViewPosition;
            ${this.isWebGL2?"in":"varying"} float vDepth;
            
            ${this.isWebGL2?"out vec4 fragColor;":""}
            
            // Advanced lighting calculations
            vec3 calculateTunnelLighting(vec3 normal, vec3 viewDir, vec3 lightDir) {
                float NdotL = max(dot(normal, lightDir), 0.0);
                vec3 reflectDir = reflect(-lightDir, normal);
                float specular = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
                
                // Tunnel-specific ambient occlusion
                float ao = 1.0 - smoothstep(0.0, 2.0, length(vWorldPosition.xz));
                ao = mix(0.3, 1.0, ao);
                
                return diffuse * NdotL * ao + vec3(specular * 0.3);
            }
            
            // Moisture and humidity effects
            vec3 addHumidityEffect(vec3 color, vec3 normal, vec3 viewDir) {
                float humidity = sin(time * 0.3 + vWorldPosition.x * 0.5) * 0.5 + 0.5;
                humidity *= smoothstep(0.5, 1.0, abs(dot(normal, viewDir)));
                
                vec3 moistureColor = vec3(0.1, 0.2, 0.3);
                return mix(color, moistureColor, humidity * 0.2);
            }
            
            void main() {
                vec3 normal = normalize(vNormal);
                vec3 viewDir = normalize(cameraPosition - vWorldPosition);
                vec3 lightDir = normalize(vec3(1.0, 1.0, 0.5));
                
                // Sample normal map for surface detail
                vec3 normalMap = texture${this.isWebGL2?"":"2D"}(normalMap, vUv * 4.0).rgb * 2.0 - 1.0;
                normal = normalize(normal + normalMap * 0.3);
                
                // Calculate base lighting
                vec3 color = calculateTunnelLighting(normal, viewDir, lightDir);
                
                // Add humidity effects
                color = addHumidityEffect(color, normal, viewDir);
                
                // Depth-based fog
                float fogFactor = 1.0 - exp(-abs(vDepth) * 0.1);
                vec3 fogColor = vec3(0.1, 0.1, 0.15);
                color = mix(color, fogColor, fogFactor * 0.6);
                
                // Output
                ${this.isWebGL2?"fragColor":"gl_FragColor"} = vec4(color, opacity);
            }
        `;this.shaders.set("tunnel",{vertexShader:e,fragmentShader:t,uniforms:{diffuse:{value:new ge(8421504)},opacity:{value:1},roughness:{value:.8},metalness:{value:.1},time:{value:0},cameraPosition:{value:new b},normalMap:{value:null},roughnessMap:{value:null}}})}createRockShader(){const e=`
            ${this.isWebGL2?"#version 300 es":""}
            ${this.isWebGL2?"in":"attribute"} vec3 position;
            ${this.isWebGL2?"in":"attribute"} vec3 normal;
            ${this.isWebGL2?"in":"attribute"} vec2 uv;
            
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform mat3 normalMatrix;
            uniform float time;
            
            ${this.isWebGL2?"out":"varying"} vec3 vNormal;
            ${this.isWebGL2?"out":"varying"} vec2 vUv;
            ${this.isWebGL2?"out":"varying"} vec3 vWorldPosition;
            ${this.isWebGL2?"out":"varying"} float vElevation;
            
            // Procedural noise function
            vec3 random3(vec3 c) {
                float j = 4096.0 * sin(dot(c, vec3(17.0, 59.4, 15.0)));
                vec3 r;
                r.z = fract(512.0 * j);
                j *= .125;
                r.x = fract(512.0 * j);
                j *= .125;
                r.y = fract(512.0 * j);
                return r - 0.5;
            }
            
            float simplex3d(vec3 p) {
                const float F3 = 0.3333333;
                const float G3 = 0.1666667;
                
                vec3 s = floor(p + dot(p, vec3(F3)));
                vec3 x = p - s + dot(s, vec3(G3));
                
                vec3 e = step(vec3(0.0), x - x.yzx);
                vec3 i1 = e * (1.0 - e.zxy);
                vec3 i2 = 1.0 - e.zxy * (1.0 - e);
                
                vec3 x1 = x - i1 + G3;
                vec3 x2 = x - i2 + 2.0 * G3;
                vec3 x3 = x - 1.0 + 3.0 * G3;
                
                vec4 w, d;
                
                w.x = dot(x, x);
                w.y = dot(x1, x1);
                w.z = dot(x2, x2);
                w.w = dot(x3, x3);
                
                w = max(0.6 - w, 0.0);
                
                d.x = dot(random3(s), x);
                d.y = dot(random3(s + i1), x1);
                d.z = dot(random3(s + i2), x2);
                d.w = dot(random3(s + 1.0), x3);
                
                w *= w;
                w *= w;
                d *= w;
                
                return dot(d, vec4(52.0));
            }
            
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                
                // Add procedural rock displacement
                vec3 pos = position;
                float noise = simplex3d(position * 0.5 + time * 0.1);
                pos += normal * noise * 0.1;
                
                vec4 worldPosition = modelViewMatrix * vec4(pos, 1.0);
                vWorldPosition = worldPosition.xyz;
                vElevation = position.y;
                
                gl_Position = projectionMatrix * worldPosition;
            }
        `,t=`
            ${this.isWebGL2?"#version 300 es":""}
            precision highp float;
            
            uniform vec3 baseColor;
            uniform vec3 accentColor;
            uniform float roughness;
            uniform float time;
            
            ${this.isWebGL2?"in":"varying"} vec3 vNormal;
            ${this.isWebGL2?"in":"varying"} vec2 vUv;
            ${this.isWebGL2?"in":"varying"} vec3 vWorldPosition;
            ${this.isWebGL2?"in":"varying"} float vElevation;
            
            ${this.isWebGL2?"out vec4 fragColor;":""}
            
            vec3 calculateRockColor(vec3 normal, vec2 uv) {
                // Stratified rock layers
                float layers = sin(vElevation * 0.5) * 0.5 + 0.5;
                vec3 layerColor = mix(baseColor, accentColor, layers);
                
                // Weathering effects
                float weathering = pow(abs(dot(normal, vec3(0, 1, 0))), 2.0);
                vec3 weatheredColor = layerColor * 0.7;
                
                return mix(layerColor, weatheredColor, weathering * 0.4);
            }
            
            void main() {
                vec3 normal = normalize(vNormal);
                vec3 color = calculateRockColor(normal, vUv);
                
                // Add subtle brightness variation
                float brightness = 0.8 + 0.2 * sin(vWorldPosition.x * 0.1 + time * 0.5);
                color *= brightness;
                
                ${this.isWebGL2?"fragColor":"gl_FragColor"} = vec4(color, 1.0);
            }
        `;this.shaders.set("rock",{vertexShader:e,fragmentShader:t,uniforms:{baseColor:{value:new ge(9127187)},accentColor:{value:new ge(6636321)},roughness:{value:.9},time:{value:0}}})}createMetalShader(){const e=`
            ${this.isWebGL2?"#version 300 es":""}
            ${this.isWebGL2?"in":"attribute"} vec3 position;
            ${this.isWebGL2?"in":"attribute"} vec3 normal;
            ${this.isWebGL2?"in":"attribute"} vec2 uv;
            
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform mat3 normalMatrix;
            
            ${this.isWebGL2?"out":"varying"} vec3 vNormal;
            ${this.isWebGL2?"out":"varying"} vec2 vUv;
            ${this.isWebGL2?"out":"varying"} vec3 vReflect;
            ${this.isWebGL2?"out":"varying"} vec3 vViewPosition;
            
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                
                vec4 worldPosition = modelViewMatrix * vec4(position, 1.0);
                vViewPosition = -worldPosition.xyz;
                
                // Calculate reflection vector for environment mapping
                vec3 worldNormal = normalize(mat3(modelViewMatrix) * normal);
                vReflect = reflect(normalize(worldPosition.xyz), worldNormal);
                
                gl_Position = projectionMatrix * worldPosition;
            }
        `,t=`
            ${this.isWebGL2?"#version 300 es":""}
            precision highp float;
            
            uniform vec3 metalColor;
            uniform float metalness;
            uniform float roughness;
            uniform samplerCube envMap;
            uniform float envMapIntensity;
            
            ${this.isWebGL2?"in":"varying"} vec3 vNormal;
            ${this.isWebGL2?"in":"varying"} vec2 vUv;
            ${this.isWebGL2?"in":"varying"} vec3 vReflect;
            ${this.isWebGL2?"in":"varying"} vec3 vViewPosition;
            
            ${this.isWebGL2?"out vec4 fragColor;":""}
            
            void main() {
                vec3 normal = normalize(vNormal);
                vec3 viewDir = normalize(vViewPosition);
                
                // Base metal color
                vec3 baseColor = metalColor;
                
                // Environment reflection
                vec3 reflectVec = reflect(-viewDir, normal);
                vec3 envColor = textureCube(envMap, reflectVec).rgb;
                
                // Fresnel effect
                float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.0);
                
                // Combine base color with environment
                vec3 finalColor = mix(baseColor, envColor * envMapIntensity, metalness * fresnel);
                
                // Add subtle surface imperfections
                float imperfection = sin(vUv.x * 100.0) * sin(vUv.y * 100.0) * 0.05 + 0.95;
                finalColor *= imperfection;
                
                ${this.isWebGL2?"fragColor":"gl_FragColor"} = vec4(finalColor, 1.0);
            }
        `;this.shaders.set("metal",{vertexShader:e,fragmentShader:t,uniforms:{metalColor:{value:new ge(8947848)},metalness:{value:.9},roughness:{value:.1},envMap:{value:null},envMapIntensity:{value:1}}})}createConveyorShader(){const e=`
            ${this.isWebGL2?"#version 300 es":""}
            ${this.isWebGL2?"in":"attribute"} vec3 position;
            ${this.isWebGL2?"in":"attribute"} vec3 normal;
            ${this.isWebGL2?"in":"attribute"} vec2 uv;
            
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform mat3 normalMatrix;
            uniform float time;
            uniform float beltSpeed;
            
            ${this.isWebGL2?"out":"varying"} vec3 vNormal;
            ${this.isWebGL2?"out":"varying"} vec2 vUv;
            ${this.isWebGL2?"out":"varying"} vec2 vMovingUv;
            
            void main() {
                vNormal = normalize(normalMatrix * normal);
                vUv = uv;
                
                // Animated UV for moving belt effect
                vMovingUv = uv + vec2(time * beltSpeed, 0.0);
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,t=`
            ${this.isWebGL2?"#version 300 es":""}
            precision highp float;
            
            uniform vec3 beltColor;
            uniform float metalness;
            uniform float roughness;
            uniform sampler2D beltTexture;
            
            ${this.isWebGL2?"in":"varying"} vec3 vNormal;
            ${this.isWebGL2?"in":"varying"} vec2 vUv;
            ${this.isWebGL2?"in":"varying"} vec2 vMovingUv;
            
            ${this.isWebGL2?"out vec4 fragColor;":""}
            
            void main() {
                vec3 normal = normalize(vNormal);
                
                // Sample moving belt texture
                vec3 beltPattern = texture${this.isWebGL2?"":"2D"}(beltTexture, vMovingUv).rgb;
                
                // Combine with base color
                vec3 color = beltColor * beltPattern;
                
                // Add belt segmentation lines
                float segments = sin(vMovingUv.x * 20.0) * 0.1 + 0.9;
                color *= segments;
                
                // Simple lighting
                float lighting = max(dot(normal, vec3(0.0, 1.0, 0.5)), 0.3);
                color *= lighting;
                
                ${this.isWebGL2?"fragColor":"gl_FragColor"} = vec4(color, 1.0);
            }
        `;this.shaders.set("conveyor",{vertexShader:e,fragmentShader:t,uniforms:{beltColor:{value:new ge(3355443)},metalness:{value:.3},roughness:{value:.7},time:{value:0},beltSpeed:{value:.5},beltTexture:{value:null}}})}createDepthBasedFogShader(){if(!this.isWebGL2)return;this.shaders.set("depthFog",{vertexShader:`
            #version 300 es
            in vec3 position;
            
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            
            out float vDepth;
            
            void main() {
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                vDepth = -mvPosition.z;
                gl_Position = projectionMatrix * mvPosition;
            }
        `,fragmentShader:`
            #version 300 es
            precision highp float;
            
            uniform vec3 fogColor;
            uniform float fogNear;
            uniform float fogFar;
            uniform float fogDensity;
            
            in float vDepth;
            out vec4 fragColor;
            
            void main() {
                float fogFactor = 1.0 - exp(-fogDensity * vDepth);
                fogFactor = clamp(fogFactor, 0.0, 1.0);
                
                fragColor = vec4(fogColor, fogFactor);
            }
        `,uniforms:{fogColor:{value:new ge(6316128)},fogNear:{value:10},fogFar:{value:100},fogDensity:{value:.02}}})}createInstancedShader(){if(!this.isWebGL2)return;this.shaders.set("instanced",{vertexShader:`
            #version 300 es
            in vec3 position;
            in vec3 normal;
            in vec2 uv;
            in mat4 instanceMatrix;
            in vec3 instanceColor;
            
            uniform mat4 projectionMatrix;
            uniform mat4 viewMatrix;
            uniform mat3 normalMatrix;
            
            out vec3 vNormal;
            out vec2 vUv;
            out vec3 vInstanceColor;
            
            void main() {
                vUv = uv;
                vInstanceColor = instanceColor;
                vNormal = normalize(normalMatrix * normal);
                
                vec4 worldPosition = instanceMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * viewMatrix * worldPosition;
            }
        `,fragmentShader:`
            #version 300 es
            precision highp float;
            
            in vec3 vNormal;
            in vec2 vUv;
            in vec3 vInstanceColor;
            
            out vec4 fragColor;
            
            void main() {
                vec3 normal = normalize(vNormal);
                float lighting = max(dot(normal, vec3(0.0, 1.0, 0.5)), 0.3);
                
                vec3 color = vInstanceColor * lighting;
                fragColor = vec4(color, 1.0);
            }
        `,uniforms:{}})}createVolumetricShader(){if(!this.isWebGL2)return;this.shaders.set("volumetric",{vertexShader:`
            #version 300 es
            in vec3 position;
            
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            
            out vec3 vPosition;
            
            void main() {
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,fragmentShader:`
            #version 300 es
            precision highp float;
            
            uniform sampler3D volumeTexture;
            uniform vec3 cameraPosition;
            uniform float stepSize;
            uniform int maxSteps;
            uniform float opacity;
            
            in vec3 vPosition;
            out vec4 fragColor;
            
            void main() {
                vec3 rayDirection = normalize(vPosition - cameraPosition);
                vec3 rayStart = vPosition;
                
                vec4 color = vec4(0.0);
                
                for (int i = 0; i < maxSteps; i++) {
                    vec3 samplePos = rayStart + rayDirection * float(i) * stepSize;
                    
                    // Sample 3D texture
                    vec4 sample = texture(volumeTexture, samplePos * 0.5 + 0.5);
                    
                    // Alpha blending
                    color.rgb += sample.rgb * sample.a * (1.0 - color.a);
                    color.a += sample.a * (1.0 - color.a);
                    
                    if (color.a > 0.95) break;
                }
                
                fragColor = vec4(color.rgb, color.a * opacity);
            }
        `,uniforms:{volumeTexture:{value:null},cameraPosition:{value:new b},stepSize:{value:.1},maxSteps:{value:64},opacity:{value:1}}})}createMaterial(e,t={}){const n=this.shaders.get(e);if(!n)return console.warn(`Shader '${e}' not found`),new Dt;const i=Dl.merge([n.uniforms,t]);return new Nn({vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,uniforms:i,transparent:!0,side:Wt})}updateShaderUniforms(e,t){this.shaders.forEach((n,i)=>{n.uniforms.time&&(n.uniforms.time.value=e),n.uniforms.cameraPosition&&n.uniforms.cameraPosition.value.copy(t.position)})}getAvailableShaders(){return Array.from(this.shaders.keys())}dispose(){this.shaders.clear(),this.uniformBuffers.clear()}}class Km{constructor(e={}){this.options={enableGPUTiming:!0,enableMemoryMonitoring:!0,enableFrameAnalysis:!0,sampleSize:60,alertThresholds:{fps:30,memoryMB:500,drawCalls:1e3},...e},this.metrics={fps:0,frameTime:0,drawCalls:0,triangles:0,memoryMB:0,gpuTime:0},this.samples={frameTimes:[],drawCalls:[],memoryUsage:[]},this.callbacks=new Set,this.isMonitoring=!1,this.gpuTimer=null,this.gpuQueries=[],this.init()}init(){this.options.enableGPUTiming&&this.initGPUTiming(),console.log("📊 Performance Monitor initialized")}initGPUTiming(){console.log("⏱️ GPU timing monitoring initialized")}startMonitoring(e){this.renderer=e,this.isMonitoring=!0,this.lastTime=performance.now(),this.frameCount=0,console.log("📊 Performance monitoring started")}stopMonitoring(){this.isMonitoring=!1,console.log("📊 Performance monitoring stopped")}update(){if(!this.isMonitoring)return;const e=performance.now(),t=e-this.lastTime;this.frameCount++,this.updateFrameMetrics(t),this.renderer&&this.updateRenderMetrics(),this.options.enableMemoryMonitoring&&this.updateMemoryMetrics(),this.checkThresholds(),this.lastTime=e}updateFrameMetrics(e){if(this.samples.frameTimes.push(e),this.samples.frameTimes.length>this.options.sampleSize&&this.samples.frameTimes.shift(),this.samples.frameTimes.length>0){const t=this.samples.frameTimes.reduce((n,i)=>n+i)/this.samples.frameTimes.length;this.metrics.fps=Math.round(1e3/t),this.metrics.frameTime=t}}updateRenderMetrics(){const e=this.renderer.info;this.metrics.drawCalls=e.render.calls,this.metrics.triangles=e.render.triangles,this.samples.drawCalls.push(e.render.calls),this.samples.drawCalls.length>this.options.sampleSize&&this.samples.drawCalls.shift()}updateMemoryMetrics(){if(this.renderer){const e=this.renderer.info,t=(e.memory.geometries+e.memory.textures)*.001;this.metrics.memoryMB=t,this.samples.memoryUsage.push(t),this.samples.memoryUsage.length>this.options.sampleSize&&this.samples.memoryUsage.shift()}performance.memory&&(this.metrics.jsHeapMB=performance.memory.usedJSHeapSize/(1024*1024))}checkThresholds(){const e=[];this.metrics.fps<this.options.alertThresholds.fps&&e.push({type:"fps",message:`Low FPS detected: ${this.metrics.fps}`,severity:"warning"}),this.metrics.memoryMB>this.options.alertThresholds.memoryMB&&e.push({type:"memory",message:`High memory usage: ${this.metrics.memoryMB.toFixed(1)}MB`,severity:"warning"}),this.metrics.drawCalls>this.options.alertThresholds.drawCalls&&e.push({type:"drawCalls",message:`High draw calls: ${this.metrics.drawCalls}`,severity:"info"}),e.length>0&&this.triggerCallbacks("alert",e)}getMetrics(){return{...this.metrics}}getDetailedReport(){return{metrics:this.getMetrics(),samples:{frameTimes:[...this.samples.frameTimes],drawCalls:[...this.samples.drawCalls],memoryUsage:[...this.samples.memoryUsage]},analysis:this.analyzePerformance()}}analyzePerformance(){const e={overallScore:"good",bottlenecks:[],recommendations:[]};this.samples.frameTimes.length>10&&this.calculateVariance(this.samples.frameTimes)>5&&(e.bottlenecks.push("Frame time instability"),e.recommendations.push("Consider reducing scene complexity or enabling LOD")),this.samples.drawCalls.reduce((i,s)=>i+s,0)/this.samples.drawCalls.length>100&&(e.bottlenecks.push("High draw call count"),e.recommendations.push("Consider object instancing or batching")),this.samples.memoryUsage.length>30&&this.calculateTrend(this.samples.memoryUsage)>.1&&(e.bottlenecks.push("Memory usage increasing"),e.recommendations.push("Check for memory leaks in geometry/texture disposal"));let n=100;return this.metrics.fps<30&&(n-=30),this.metrics.memoryMB>200&&(n-=20),this.metrics.drawCalls>500&&(n-=20),n>80?e.overallScore="excellent":n>60?e.overallScore="good":n>40?e.overallScore="fair":e.overallScore="poor",e}calculateVariance(e){const t=e.reduce((i,s)=>i+s)/e.length,n=e.reduce((i,s)=>i+Math.pow(s-t,2),0)/e.length;return Math.sqrt(n)}calculateTrend(e){if(e.length<2)return 0;const t=e.slice(0,Math.floor(e.length/2)),n=e.slice(Math.floor(e.length/2)),i=t.reduce((o,a)=>o+a)/t.length;return(n.reduce((o,a)=>o+a)/n.length-i)/i}suggestOptimizations(){const e=[];return this.analyzePerformance(),this.metrics.fps<30&&(e.push({type:"performance",priority:"high",message:"Enable WebGL2 LOD system for distant objects",action:"enableLOD"}),e.push({type:"performance",priority:"medium",message:"Reduce shadow map resolution",action:"reduceShadowQuality"})),this.metrics.drawCalls>100&&e.push({type:"optimization",priority:"medium",message:"Use instanced rendering for repeated objects",action:"enableInstancing"}),this.metrics.memoryMB>200&&e.push({type:"memory",priority:"high",message:"Implement texture compression",action:"compressTextures"}),e}onAlert(e){this.callbacks.add(e)}offAlert(e){this.callbacks.delete(e)}triggerCallbacks(e,t){this.callbacks.forEach(n=>{try{n(e,t)}catch(i){console.error("Performance monitor callback error:",i)}})}enableAutoOptimization(){this.autoOptimization=!0,setInterval(()=>{this.metrics.fps<20&&this.triggerCallbacks("autoOptimize",{action:"reduceQuality",reason:"Low FPS detected"})},5e3)}runBenchmark(e=1e4){return new Promise(t=>{performance.now();const n={...this.metrics};setTimeout(()=>{const i={...this.metrics},s={duration:e,startMetrics:n,endMetrics:i,avgFPS:this.metrics.fps,minFPS:Math.min(...this.samples.frameTimes.map(o=>1e3/o)),maxFPS:Math.max(...this.samples.frameTimes.map(o=>1e3/o)),stability:100-this.calculateVariance(this.samples.frameTimes),score:this.analyzePerformance().overallScore};t(s)},e)})}dispose(){this.stopMonitoring(),this.callbacks.clear(),this.samples={frameTimes:[],drawCalls:[],memoryUsage:[]}}}class Jm{constructor(e,t,n,i=null){this.scene=e,this.camera=t,this.renderer=n,this.viewer=i,this.isCreating=!1,this.previewObject=null,this.currentType="tunnel",this.currentPosition=new b(0,-2,0),this.parameters={tunnel:{width:3,height:3,length:10,orientation:"horizontal",angle:0,direction:{x:0,y:0,z:1},pitch:0,yaw:0,roll:0},road:{width:4,height:.5,length:15,orientation:"horizontal",angle:0},rail:{width:1.5,height:.3,length:20,orientation:"horizontal",angle:0},conveyor:{width:1,height:.8,length:12,orientation:"horizontal",angle:0}},this.createdObjects=new Map,this.nextId=1,this.autoMultiPlace=!1}startCreating(e){this.isCreating=!0,this.currentType=e,this.showCreationUI(),this.createPreview(),console.log(`[MineObjectCreator] Started creating: ${e}`)}stopCreating(){this.isCreating=!1,this.hideCreationUI(),this.removePreview(),this.interactiveClickHandler&&this.viewer&&this.viewer.renderer&&(this.viewer.renderer.domElement.removeEventListener("click",this.interactiveClickHandler),this.interactiveClickHandler=null),this.interactiveState&&(this.interactiveState={mode:"waiting-start",startPoint:null,endPoint:null}),console.log("[MineObjectCreator] Stopped creating")}updateParameter(e,t){this.parameters[this.currentType]&&(e==="orientation"?this.parameters[this.currentType][e]=t:e==="direction"?this.parameters[this.currentType][e]=t:this.parameters[this.currentType][e]=parseFloat(t),this.updatePreview(),console.log(`[MineObjectCreator] Updated ${e}:`,t))}createPreview(){this.removePreview();const e=this.parameters[this.currentType],t=this.createGeometry(this.currentType,e),n=this.createPreviewMaterial(this.currentType);this.previewObject=new te(t,n),this.previewObject.position.copy(this.currentPosition),this.previewObject.name="preview_object",this.scene.add(this.previewObject)}updatePreview(){if(!this.previewObject)return;const e=this.parameters[this.currentType];try{let t;this.currentType==="tunnel"?t=this.create3DTunnel(e.width||5,e.height||5,e.length||10,{orientation:e.orientation||"horizontal",angle:e.angle||0,pitch:e.pitch||0,yaw:e.yaw||0,roll:e.roll||0,direction:e.direction||{x:0,y:0,z:1}}):t=this.createGeometry(this.currentType,e),this.previewObject.geometry.dispose(),this.previewObject.geometry=t,this.previewObject.position.copy(this.currentPosition)}catch(t){console.error("Preview update error:",t);const n=this.createGeometry(this.currentType,e);this.previewObject.geometry.dispose(),this.previewObject.geometry=n}}removePreview(){this.previewObject&&(this.scene.remove(this.previewObject),this.previewObject.geometry.dispose(),this.previewObject.material.dispose(),this.previewObject=null)}createGeometry(e,t){let n;switch(t&&t.orientation&&(t.orientation==="yatay"?t.orientation="horizontal":t.orientation==="dikey"&&(t.orientation="vertical")),e){case"tunnel":n=this.create3DTunnel(t);break;case"road":n=new et(t.width,t.height,t.length);break;case"rail":n=new et(t.width,t.height,t.length);break;case"conveyor":n=new et(t.width,t.height,t.length);break;default:n=new et(2,2,2)}return e!=="tunnel"&&t.angle&&t.angle!==0&&(t.orientation==="vertical"?n.rotateY(t.angle*Math.PI/180):n.rotateZ(t.angle*Math.PI/180)),n}create3DTunnel(e){const t=new Ye(Math.max(e.width,e.height)/2,Math.max(e.width,e.height)/2,e.length,24,1,!1);return e.width!==e.height&&this.applyEllipticalCrossSection(t,e.width,e.height),e.direction&&(e.direction.x!==0||e.direction.y!==0||e.direction.z!==1)?this.apply3DDirectionRotation(t,e.direction):e.pitch!==0||e.yaw!==0||e.roll!==0?this.applyPitchYawRollRotation(t,e.pitch,e.yaw,e.roll):this.applyLegacyOrientation(t,e),t}applyEllipticalCrossSection(e,t,n){t=Number(t),n=Number(n),(!Number.isFinite(t)||t<=0)&&(t=1),(!Number.isFinite(n)||n<=0)&&(n=1);const i=e.attributes.position;if(!i)return;const s=new b,o=Math.max(t,n);if(!(o<=0)){for(let a=0;a<i.count;a++)if(s.fromBufferAttribute(i,a),s.x*s.x+s.z*s.z>1e-9){const h=Math.atan2(s.z,s.x),c=Math.sqrt((n*Math.cos(h))**2+(t*Math.sin(h))**2);if(c<=0||!Number.isFinite(c))continue;const u=t*n/(2*c)/(o/2);if(!Number.isFinite(u))continue;s.x*=u,s.z*=u,i.setXYZ(a,s.x,s.y,s.z)}i.needsUpdate=!0;try{e.computeVertexNormals()}catch{}}}apply3DDirectionRotation(e,t){const n=new b(t.x,t.y,t.z).normalize(),i=new b(0,1,0),s=new Ke;s.setFromUnitVectors(i,n),e.applyQuaternion(s)}applyPitchYawRollRotation(e,t,n,i){const s=t*Math.PI/180,o=n*Math.PI/180,a=i*Math.PI/180;s!==0&&e.rotateX(s),o!==0&&e.rotateY(o),a!==0&&e.rotateZ(a)}applyLegacyOrientation(e,t){t.orientation==="vertical"||e.rotateX(Math.PI/2),t.angle&&t.angle!==0&&e.rotateY(t.angle*Math.PI/180)}createPreviewMaterial(e){const t={tunnel:8421504,road:4210752,rail:6710886,conveyor:16766720};return new wt({color:t[e]||8421504,transparent:!0,opacity:.6,wireframe:!1})}finalizeCreation(){var s,o;if(!this.previewObject)return null;const e=this.parameters[this.currentType],t=this.createGeometry(this.currentType,e),n=this.createFinalMaterial(this.currentType),i=new te(t,n);if(i.position.copy(this.previewObject.position),i.userData={id:this.nextId++,type:this.currentType,parameters:{...e,opacity:((s=this.materialProperties)==null?void 0:s.opacity)??1},selectable:!0},this.viewer&&this.viewer.collisionSystem){const a=Array.from(this.createdObjects.values()),l=this.viewer.collisionSystem.validateTunnelPlacement(i,a);if(!l.isValid){const c=`⚠️ Placement conflict detected!
${l.conflicts.length} collision(s) found.`;if(!confirm(`${c}

Do you want to place anyway?`))return i.geometry.dispose(),i.material.dispose(),null}}if(this.scene.add(i),this.createdObjects.set(i.userData.id,i),this.viewer&&this.viewer.collisionSystem&&this.viewer.collisionSystem.registerObject(i,"static",{type:this.currentType,creator:"MineObjectCreator",parameters:e}),this.viewer&&this.viewer.objectSelector){try{this.viewer.objectSelector.addSelectableObject(i,{id:i.userData.id,type:i.userData.type,name:`${i.userData.type.charAt(0).toUpperCase()+i.userData.type.slice(1)} ${i.userData.id}`,parameters:i.userData.parameters,color:"#"+i.material.color.getHexString()})}catch(a){console.warn("[MineObjectCreator] Selectable eklenemedi:",a)}this.currentType==="tunnel"&&setTimeout(()=>{this.viewer.createTunnelEndpoints(i,i.userData)},100)}if(this.removePreview(),console.log(`[MineObjectCreator] Created ${this.currentType} with ID: ${i.userData.id}`),this.autoMultiPlace)this.createPreview();else if(this.isCreating=!1,(o=this.hideCreationUI)==null||o.call(this),this.viewer&&(this.viewer.isCreatingMode=!1,typeof this.viewer.removePreview=="function"))try{this.viewer.removePreview()}catch{}return i}createFinalMaterial(e){var o,a,l;const t={tunnel:8421504,road:4210752,rail:6710886,conveyor:16766720},n=(o=this.materialProperties)!=null&&o.color?new ge(this.materialProperties.color):new ge(t[e]||8421504),i=((a=this.materialProperties)==null?void 0:a.opacity)??1,s=((l=this.materialProperties)==null?void 0:l.shininess)??30;return new wt({color:n,transparent:i<1,opacity:i,shininess:s,specular:4473924})}showCreationUI(){let e=document.getElementById("creation-panel");e||(e=this.createCreationPanel()),e.style.display="block",this.updateUIForType(this.currentType)}hideCreationUI(){const e=document.getElementById("creation-panel");e&&(e.style.display="none")}createCreationPanel(){const e=document.createElement("div");return e.id="creation-panel",e.className="creation-panel",e.style.cssText=`
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            min-width: 320px;
            max-width: 380px;
            z-index: 1000;
            display: none;
            font-family: Arial, sans-serif;
            border: 2px solid #444;
            box-shadow: 0 4px 20px rgba(0,0,0,0.7);
            max-height: 80vh;
            overflow-y: auto;
        `,e.innerHTML=`
            <h4 id="creation-title" style="margin-top: 0; color: #fff; border-bottom: 1px solid #444; padding-bottom: 10px;">
                🚇 Gelişmiş Tünel Oluştur
            </h4>
            
            <!-- Basic Parameters -->
            <div class="parameter-group" style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; color: #ddd;">
                    <i class="fas fa-arrows-alt-h"></i> Genişlik: <span id="param1-value" style="color: #4CAF50; font-weight: bold;">3</span>m
                </label>
                <input type="range" id="param1" min="1" max="10" step="0.5" value="3" 
                       style="width: 100%; margin-bottom: 5px;">
                <input type="number" id="param1-number" min="1" max="10" step="0.5" value="3"
                       style="width: 100%; padding: 4px; margin-bottom: 10px; background: #333; color: white; border: 1px solid #555; border-radius: 3px;">
                
                <label style="display: block; margin-bottom: 5px; color: #ddd;">
                    <i class="fas fa-arrows-alt-v"></i> Yükseklik: <span id="param2-value" style="color: #4CAF50; font-weight: bold;">3</span>m
                </label>
                <input type="range" id="param2" min="1" max="8" step="0.5" value="3"
                       style="width: 100%; margin-bottom: 5px;">
                <input type="number" id="param2-number" min="1" max="8" step="0.5" value="3"
                       style="width: 100%; padding: 4px; margin-bottom: 10px; background: #333; color: white; border: 1px solid #555; border-radius: 3px;">
                
                <label style="display: block; margin-bottom: 5px; color: #ddd;">
                    <i class="fas fa-ruler"></i> Uzunluk: <span id="param3-value" style="color: #4CAF50; font-weight: bold;">10</span>m
                </label>
                <input type="range" id="param3" min="5" max="100" step="1" value="10"
                       style="width: 100%; margin-bottom: 5px;">
                <input type="number" id="param3-number" min="5" max="100" step="1" value="10"
                       style="width: 100%; padding: 4px; margin-bottom: 15px; background: #333; color: white; border: 1px solid #555; border-radius: 3px;">
            </div>
            
            <!-- 3D Direction Controls -->
            <div id="tunnel-3d-controls" class="tunnel-specific" style="margin-bottom: 15px; border-top: 1px solid #444; padding-top: 15px;">
                <h5 style="margin: 0 0 10px 0; color: #ffd700;">
                    🎯 3D Yön Kontrolleri
                </h5>
                
                <!-- Direction Mode Selection -->
                <div style="margin-bottom: 10px;">
                    <label style="display: block; margin-bottom: 5px; color: #ddd;">
                        <i class="fas fa-cog"></i> Kontrol Modu:
                    </label>
                    <select id="direction-mode" style="width: 100%; padding: 5px; background: #333; color: white; border: 1px solid #555; border-radius: 3px;">
                        <option value="legacy">Basit (Yatay/Dikey)</option>
                        <option value="angles">Gelişmiş (Pitch/Yaw/Roll)</option>
                        <option value="vector">Uzman (Direction Vector)</option>
                        <option value="interactive">İnteraktif (Click-to-Aim)</option>
                    </select>
                </div>

                <!-- Legacy Controls -->
                <div id="legacy-controls" style="display: block;">
                    <label style="display: block; margin-bottom: 5px; color: #ddd;">
                        Yönelim:
                    </label>
                    <select id="orientation" style="width: 100%; padding: 5px; margin-bottom: 10px; background: #333; color: white; border: 1px solid #555;">
                        <option value="horizontal">Yatay</option>
                        <option value="vertical">Dikey</option>
                    </select>
                    
                    <label style="display: block; margin-bottom: 5px; color: #ddd;">
                        Açı: <span id="angle-value" style="color: #4CAF50; font-weight: bold;">0</span>°
                    </label>
                    <input type="range" id="angle" min="0" max="360" step="5" value="0"
                           style="width: 100%; margin-bottom: 10px;">
                </div>

                <!-- Advanced Angle Controls -->
                <div id="angle-controls" style="display: none;">
                    <label style="display: block; margin-bottom: 5px; color: #ddd;">
                        <i class="fas fa-level-up-alt"></i> Pitch (Yukarı/Aşağı): <span id="pitch-value" style="color: #4CAF50; font-weight: bold;">0</span>°
                    </label>
                    <input type="range" id="pitch" min="-90" max="90" step="5" value="0"
                           style="width: 100%; margin-bottom: 8px;">
                    
                    <label style="display: block; margin-bottom: 5px; color: #ddd;">
                        <i class="fas fa-undo"></i> Yaw (Sol/Sağ): <span id="yaw-value" style="color: #4CAF50; font-weight: bold;">0</span>°
                    </label>
                    <input type="range" id="yaw" min="0" max="360" step="5" value="0"
                           style="width: 100%; margin-bottom: 8px;">
                    
                    <label style="display: block; margin-bottom: 5px; color: #ddd;">
                        <i class="fas fa-redo"></i> Roll (Döndürme): <span id="roll-value" style="color: #4CAF50; font-weight: bold;">0</span>°
                    </label>
                    <input type="range" id="roll" min="0" max="360" step="5" value="0"
                           style="width: 100%; margin-bottom: 10px;">
                </div>

                <!-- Material Controls -->
                <div id="material-controls" style="margin-top: 15px; padding: 10px; background: #444; border-radius: 5px;">
                    <label style="display: block; margin-bottom: 5px; color: #ddd;">
                        <i class="fas fa-palette"></i> Material Ayarları:
                    </label>
                    
                    <!-- Renk Seçici -->
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; margin-bottom: 3px; color: #ccc; font-size: 12px;">
                            Renk:
                        </label>
                        <input type="color" id="tunnel-color" value="#808080" 
                               style="width: 100%; height: 30px; border: none; border-radius: 3px; cursor: pointer;">
                    </div>
                    
                    <!-- Saydamlık Slider -->
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; margin-bottom: 3px; color: #ccc; font-size: 12px;">
                            Saydamlık: <span id="opacity-value">1.0</span>
                        </label>
                        <input type="range" id="tunnel-opacity" min="0.1" max="1.0" step="0.1" value="1.0"
                               style="width: 100%; margin-bottom: 5px;">
                    </div>
                    
                    <!-- Parlaklık Slider -->
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; margin-bottom: 3px; color: #ccc; font-size: 12px;">
                            Parlaklık: <span id="shininess-value">30</span>
                        </label>
                        <input type="range" id="tunnel-shininess" min="0" max="100" step="5" value="30"
                               style="width: 100%; margin-bottom: 5px;">
                    </div>
                    
                    <!-- Material Presets -->
                    <div style="margin-top: 10px;">
                        <label style="display: block; margin-bottom: 5px; color: #ccc; font-size: 12px;">
                            Hazır Material'ler:
                        </label>
                        <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                            <button class="material-preset" data-preset="concrete" 
                                    style="padding: 4px 8px; background: #666; color: white; border: none; border-radius: 3px; font-size: 11px; cursor: pointer;">
                                Beton
                            </button>
                            <button class="material-preset" data-preset="metal" 
                                    style="padding: 4px 8px; background: #888; color: white; border: none; border-radius: 3px; font-size: 11px; cursor: pointer;">
                                Metal
                            </button>
                            <button class="material-preset" data-preset="rock" 
                                    style="padding: 4px 8px; background: #654321; color: white; border: none; border-radius: 3px; font-size: 11px; cursor: pointer;">
                                Kaya
                            </button>
                            <button class="material-preset" data-preset="glass" 
                                    style="padding: 4px 8px; background: #add8e6; color: black; border: none; border-radius: 3px; font-size: 11px; cursor: pointer;">
                                Cam
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Vector Controls -->
                <div id="vector-controls" style="display: none;">
                    <label style="display: block; margin-bottom: 5px; color: #ddd;">
                        <i class="fas fa-vector-square"></i> Yön Vektörü (X, Y, Z):
                    </label>
                    <div style="display: flex; gap: 5px; margin-bottom: 10px;">
                        <input type="number" id="dir-x" value="0" step="0.1" min="-1" max="1" 
                               style="flex: 1; padding: 4px; background: #333; color: white; border: 1px solid #555; border-radius: 3px;"
                               placeholder="X">
                        <input type="number" id="dir-y" value="0" step="0.1" min="-1" max="1"
                               style="flex: 1; padding: 4px; background: #333; color: white; border: 1px solid #555; border-radius: 3px;"
                               placeholder="Y">
                        <input type="number" id="dir-z" value="1" step="0.1" min="-1" max="1"
                               style="flex: 1; padding: 4px; background: #333; color: white; border: 1px solid #555; border-radius: 3px;"
                               placeholder="Z">
                    </div>
                    <button id="normalize-vector" style="padding: 4px 8px; background: #555; color: white; border: none; border-radius: 3px; font-size: 12px;">
                        Normalize
                    </button>
                </div>

                <!-- Interactive Controls -->
                <div id="interactive-controls" style="display: none;">
                    <p style="color: #ddd; font-size: 13px; margin: 10px 0;">
                        <i class="fas fa-mouse-pointer"></i> <strong>İnteraktif Mod:</strong><br>
                        1. 3D sahnede başlangıç noktasını tıklayın<br>
                        2. Bitiş noktasını tıklayın (yön otomatik hesaplanır)
                    </p>
                    <div id="interactive-status" style="padding: 8px; background: #444; border-radius: 4px; font-size: 12px; color: #ddd;">
                        Başlangıç noktası bekleniyor...
                    </div>
                </div>

                <!-- Direction Preview -->
                <div style="margin-top: 10px; padding: 8px; background: #444; border-radius: 4px;">
                    <div style="font-size: 12px; color: #ddd;">
                        <strong>Önizleme:</strong><br>
                        Yön: <span id="direction-preview">→ İleri (Z+)</span><br>
                        Eğim: <span id="slope-preview">0°</span>
                    </div>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="button-group" style="margin-top: 15px;">
                <button id="create-confirm" class="btn btn-success" 
                        style="background: #4CAF50; color: white; border: none; padding: 10px 16px; border-radius: 4px; margin-right: 10px; cursor: pointer; font-weight: bold;">
                    <i class="fas fa-plus"></i> Oluştur
                </button>
                <button id="create-cancel" class="btn btn-secondary"
                        style="background: #666; color: white; border: none; padding: 10px 16px; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-times"></i> İptal
                </button>
            </div>
        `,document.body.appendChild(e),this.setupCreationPanelEvents(),e}setupCreationPanelEvents(){const e=document.getElementById("param1"),t=document.getElementById("param2"),n=document.getElementById("param3"),i=document.getElementById("param1-number"),s=document.getElementById("param2-number"),o=document.getElementById("param3-number"),a=document.getElementById("orientation"),l=document.getElementById("angle"),h=document.getElementById("direction-mode"),c=document.getElementById("pitch"),d=document.getElementById("yaw"),u=document.getElementById("roll"),p=document.getElementById("dir-x"),g=document.getElementById("dir-y"),y=document.getElementById("dir-z"),m=document.getElementById("normalize-vector"),f=document.getElementById("tunnel-color"),M=document.getElementById("tunnel-opacity"),v=document.getElementById("tunnel-shininess"),_=document.querySelectorAll(".material-preset"),E=document.getElementById("create-confirm"),T=document.getElementById("create-cancel");this.interactiveState={mode:"waiting-start",startPoint:null,endPoint:null},e.addEventListener("input",x=>{const D=x.target.value;document.getElementById("param1-value").textContent=D,i.value=D,this.updateParameter("width",D)}),t.addEventListener("input",x=>{const D=x.target.value;document.getElementById("param2-value").textContent=D,s.value=D,this.updateParameter("height",D)}),n.addEventListener("input",x=>{const D=x.target.value;document.getElementById("param3-value").textContent=D,o.value=D,this.updateParameter("length",D)}),i.addEventListener("input",x=>{const D=x.target.value;document.getElementById("param1-value").textContent=D,e.value=D,this.updateParameter("width",D)}),s.addEventListener("input",x=>{const D=x.target.value;document.getElementById("param2-value").textContent=D,t.value=D,this.updateParameter("height",D)}),o.addEventListener("input",x=>{const D=x.target.value;document.getElementById("param3-value").textContent=D,n.value=D,this.updateParameter("length",D)}),h.addEventListener("change",x=>{this.switchDirectionMode(x.target.value)}),a.addEventListener("change",x=>{this.updateParameter("orientation",x.target.value),this.updateDirectionPreview()}),l.addEventListener("input",x=>{document.getElementById("angle-value").textContent=x.target.value,this.updateParameter("angle",x.target.value),this.updateDirectionPreview()}),c&&c.addEventListener("input",x=>{document.getElementById("pitch-value").textContent=x.target.value,this.updateParameter("pitch",x.target.value),this.updateDirectionPreview()}),d&&d.addEventListener("input",x=>{document.getElementById("yaw-value").textContent=x.target.value,this.updateParameter("yaw",x.target.value),this.updateDirectionPreview()}),u&&u.addEventListener("input",x=>{document.getElementById("roll-value").textContent=x.target.value,this.updateParameter("roll",x.target.value),this.updateDirectionPreview()}),p&&g&&y&&[p,g,y].forEach(x=>{x.addEventListener("input",()=>{this.updateParameter("direction",{x:parseFloat(p.value)||0,y:parseFloat(g.value)||0,z:parseFloat(y.value)||1}),this.updateDirectionPreview()})}),m&&m.addEventListener("click",()=>{const x=parseFloat(p.value)||0,D=parseFloat(g.value)||0,S=parseFloat(y.value)||1,A=Math.sqrt(x*x+D*D+S*S);A>0&&(p.value=(x/A).toFixed(3),g.value=(D/A).toFixed(3),y.value=(S/A).toFixed(3),this.updateParameter("direction",{x:x/A,y:D/A,z:S/A}),this.updateDirectionPreview())}),f&&f.addEventListener("change",x=>{this.updateMaterialProperty("color",x.target.value)}),M&&M.addEventListener("input",x=>{const D=parseFloat(x.target.value);document.getElementById("opacity-value").textContent=D.toFixed(1),this.updateMaterialProperty("opacity",D)}),v&&v.addEventListener("input",x=>{const D=parseInt(x.target.value);document.getElementById("shininess-value").textContent=D,this.updateMaterialProperty("shininess",D)}),_.forEach(x=>{x.addEventListener("click",D=>{const S=D.target.dataset.preset;this.applyMaterialPreset(S)})}),E.addEventListener("click",()=>{const x=this.finalizeCreation();x&&(this.stopCreating(),this.viewer&&this.viewer.saveObjectToServer(x))}),T.addEventListener("click",()=>{this.stopCreating()}),this.setupInteractiveMode()}switchDirectionMode(e){["legacy-controls","angle-controls","vector-controls","interactive-controls"].forEach(s=>{const o=document.getElementById(s);o&&(o.style.display="none")});const n=e+"-controls",i=document.getElementById(n);i&&(i.style.display="block"),this.updateDirectionMode(e),this.updateDirectionPreview()}updateDirectionMode(e){const t=this.parameters[this.currentType];switch(e){case"legacy":t.pitch=0,t.yaw=0,t.roll=0,t.direction={x:0,y:0,z:1};break;case"angles":t.pitch=t.pitch||0,t.yaw=t.yaw||0,t.roll=t.roll||0;break;case"vector":t.direction||(t.direction={x:0,y:0,z:1});break;case"interactive":this.initializeInteractiveMode();break}this.updatePreview()}setupInteractiveMode(){!this.viewer||!this.viewer.renderer||(this.interactiveClickHandler=e=>{var n;if(((n=document.getElementById("direction-mode"))==null?void 0:n.value)!=="interactive"||!this.isCreating)return;const t=this.getClickPoint(e);t&&(this.interactiveState.mode==="waiting-start"?this.setInteractiveStartPoint(t):this.interactiveState.mode==="waiting-end"&&this.setInteractiveEndPoint(t))},this.viewer.renderer.domElement.addEventListener("click",this.interactiveClickHandler))}initializeInteractiveMode(){this.interactiveState={mode:"waiting-start",startPoint:null,endPoint:null};const e=document.getElementById("interactive-status");e&&(e.textContent="Başlangıç noktası için 3D sahnede bir yere tıklayın...",e.style.background="#444")}getClickPoint(e){if(!this.viewer||!this.viewer.camera||!this.viewer.raycaster)return null;const t=this.viewer.renderer.domElement.getBoundingClientRect(),n=new ae;n.x=(e.clientX-t.left)/t.width*2-1,n.y=-((e.clientY-t.top)/t.height)*2+1,this.viewer.raycaster.setFromCamera(n,this.viewer.camera);const i=new Vt(new b(0,1,0),0),s=new b;return this.viewer.raycaster.ray.intersectPlane(i,s)?s:null}setInteractiveStartPoint(e){this.interactiveState.startPoint=e.clone(),this.interactiveState.mode="waiting-end",this.currentPosition.copy(e),this.previewObject&&this.previewObject.position.copy(e);const t=document.getElementById("interactive-status");t&&(t.textContent="Bitiş noktası için başka bir yere tıklayın...",t.style.background="#445")}setInteractiveEndPoint(e){this.interactiveState.endPoint=e.clone();const t=e.clone().sub(this.interactiveState.startPoint).normalize();this.updateParameter("direction",{x:t.x,y:t.y,z:t.z});const n=this.interactiveState.startPoint.distanceTo(e);this.updateParameter("length",Math.max(5,Math.round(n)));const i=document.getElementById("param3"),s=document.getElementById("param3-number"),o=document.getElementById("param3-value");i&&(i.value=Math.round(n)),s&&(s.value=Math.round(n)),o&&(o.textContent=Math.round(n));const a=document.getElementById("interactive-status");a&&(a.textContent=`✅ Yön ayarlandı! Uzunluk: ${Math.round(n)}m`,a.style.background="#446644"),this.updateDirectionPreview(),this.updatePreview()}updateDirectionPreview(){var a;const e=document.getElementById("direction-preview"),t=document.getElementById("slope-preview");if(!e||!t)return;const n=this.parameters[this.currentType],i=((a=document.getElementById("direction-mode"))==null?void 0:a.value)||"legacy";let s="",o="";switch(i){case"legacy":n.orientation==="vertical"?(s="↑ Dikey",o="90°"):(s=`→ Yatay (${n.angle||0}°)`,o="0°");break;case"angles":const l=n.pitch||0;s=`Yaw: ${n.yaw||0}°, Pitch: ${l}°`,o=`${l}°`;break;case"vector":if(n.direction){const c=n.direction;s=`(${c.x.toFixed(2)}, ${c.y.toFixed(2)}, ${c.z.toFixed(2)})`,o=`${(Math.asin(c.y)*180/Math.PI).toFixed(1)}°`}break;case"interactive":if(this.interactiveState.startPoint&&this.interactiveState.endPoint){const c=this.interactiveState.endPoint.clone().sub(this.interactiveState.startPoint).normalize();s=`İnteraktif: (${c.x.toFixed(2)}, ${c.y.toFixed(2)}, ${c.z.toFixed(2)})`,o=`${(Math.asin(c.y)*180/Math.PI).toFixed(1)}°`}else s="Noktalar bekleniyor...",o="-";break}e.textContent=s,t.textContent=o}updateUIForType(e){const t={tunnel:"Tünel Oluştur",road:"Yol Oluştur",rail:"Ray Oluştur",conveyor:"Konveyör Oluştur"};document.getElementById("creation-title").textContent=t[e]||"Obje Oluştur";const n=this.parameters[e];document.getElementById("param1").value=n.width,document.getElementById("param1-value").textContent=n.width,document.getElementById("param1-number").value=n.width,document.getElementById("param2").value=n.height,document.getElementById("param2-value").textContent=n.height,document.getElementById("param2-number").value=n.height,document.getElementById("param3").value=n.length,document.getElementById("param3-value").textContent=n.length,document.getElementById("param3-number").value=n.length,document.getElementById("sel-angle"),document.getElementById("sel-opacity");const i=document.getElementById("tunnel-controls");e==="tunnel"?(i.style.display="block",document.getElementById("orientation").value=n.orientation||"horizontal",document.getElementById("angle").value=n.angle||0,document.getElementById("angle-value").textContent=n.angle||0):i.style.display="none"}async saveToServer(e){var t,n,i;try{const s={mine_id:this.mineId||1,name:`${e.userData.type.charAt(0).toUpperCase()+e.userData.type.slice(1)} ${e.userData.id}`,geometry:{type:e.userData.type,...e.userData.parameters},material:{color:e.material.color.getHex(),opacity:e.material.opacity||1},position:[e.position.x,e.position.y,e.position.z],rotation:[e.rotation.x,e.rotation.y,e.rotation.z],scale:[e.scale.x,e.scale.y,e.scale.z],properties:{createdAt:new Date().toISOString(),tool:e.userData.type},visible:!0,order:e.userData.id},o=await fetch(`/api/mines/${this.mineId||1}/models`,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":((t=document.querySelector('meta[name="csrf-token"]'))==null?void 0:t.getAttribute("content"))||"",Accept:"application/json"},body:JSON.stringify(s)});if(o.ok){const a=await o.json();e.userData.serverId=(n=a.data)==null?void 0:n.id,console.log("[MineObjectCreator] Successfully saved to server:",a)}else throw new Error(`HTTP ${o.status}: ${o.statusText}`)}catch(s){console.error("[MineObjectCreator] Error saving to server:",s),(i=this.showError)==null||i.call(this,"Obje kaydedilemedi: "+s.message)}}showError(e){const t=document.createElement("div");t.style.cssText=`
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff4444;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
        `,t.textContent=e,document.body.appendChild(t),setTimeout(()=>{document.body.removeChild(t)},3e3)}updateMaterialProperty(e,t){if(!(!this.previewObject||!this.previewObject.material)){switch(e){case"color":const n=new ge(t);this.previewObject.material.color=n;break;case"opacity":this.previewObject.material.opacity=t,this.previewObject.material.transparent=t<1;break;case"shininess":this.previewObject.material.shininess!==void 0&&(this.previewObject.material.shininess=t);break}this.previewObject.material.needsUpdate=!0,this.materialProperties||(this.materialProperties={}),this.materialProperties[e]=t}}applyMaterialPreset(e){const n={concrete:{color:"#888888",opacity:1,shininess:10},metal:{color:"#c0c0c0",opacity:.9,shininess:80},rock:{color:"#8b4513",opacity:1,shininess:5},glass:{color:"#add8e6",opacity:.3,shininess:100}}[e];if(!n)return;const i=document.getElementById("tunnel-color"),s=document.getElementById("tunnel-opacity"),o=document.getElementById("tunnel-shininess");i&&(i.value=n.color,this.updateMaterialProperty("color",n.color)),s&&(s.value=n.opacity,document.getElementById("opacity-value").textContent=n.opacity.toFixed(1),this.updateMaterialProperty("opacity",n.opacity)),o&&(o.value=n.shininess,document.getElementById("shininess-value").textContent=n.shininess,this.updateMaterialProperty("shininess",n.shininess))}}class Qm{constructor(e,t,n){this.scene=e,this.camera=t,this.renderer=n,this.isDrawing=!1,this.currentPath=[],this.tempPath=null,this.paths=new Map,this.raycaster=new Un,this.mouse=new ae,this.groundPlane=new Vt(new b(0,1,0),-2),this.tunnelConstraintMode=!1,this.constraintTunnel=null,this.currentDrawingType="tunnel",this.previewMesh=null,this.distanceLabel=null,this.drawingCallbacks={onPathStart:null,onPathUpdate:null,onPathComplete:null},this._lodFrame=0,this.debug=!1}startDrawing(e={}){this.stopDrawing(),this.isDrawing=!0,this.currentPath=[],this.drawingCallbacks={...this.drawingCallbacks,...e},console.log("[MinePathDrawer] Yol çizimi başladı - state temizlendi, type:",this.currentDrawingType)}setDrawingType(e){this.currentDrawingType=e,console.log("[MinePathDrawer] Drawing type set to:",e)}setAxisConstraint(e){this.axisConstraint=e,console.log("[MinePathDrawer] Axis constraint set to:",e)}stopDrawing(){this.isDrawing=!1,this.currentPath=[],this.removeTempPath(),this.removePreviewMesh(),this.removeDistanceLabel(),console.log("[MinePathDrawer] Yol çizimi durdu - temizlik yapıldı")}handleClick(e){if(!this.isDrawing)return;this.updateMousePosition(e);const t=this.getGroundIntersection();t&&(this.currentPath.push(t),this.updateTempPath(),this.drawingCallbacks.onPathUpdate&&this.drawingCallbacks.onPathUpdate(this.currentPath))}handleMouseMove(e){if(!this.isDrawing||this.currentPath.length===0)return;this.updateMousePosition(e);let t=this.getGroundIntersection();if(t){if(this.axisConstraint&&this.currentPath.length>0){const i=this.currentPath[this.currentPath.length-1];switch(this.axisConstraint){case"x":t.y=i.y,t.z=i.z;break;case"y":t.x=i.x,t.z=i.z;break;case"z":t.x=i.x,t.y=i.y;break}}this.viewer.constrainToAxis&&(t=this.viewer.constrainToAxis(t)),this.updatePreview(t);const n=[...this.currentPath,t];this.updateTempPath(n)}}updateMousePosition(e){const t=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-((e.clientY-t.top)/t.height)*2+1}getGroundIntersection(){this.raycaster.setFromCamera(this.mouse,this.camera);const e=new b;if(this.tunnelConstraintMode&&this.constraintTunnel){const t=this.raycaster.intersectObject(this.constraintTunnel,!0);if(t.length>0){const n=t[0].point;return n.y=-2.5,this.debug&&console.log("[MinePathDrawer] Tunnel constraint intersection found:",{x:n.x.toFixed(2),y:n.y.toFixed(2),z:n.z.toFixed(2)}),n}else return this.debug&&console.log("[MinePathDrawer] No tunnel constraint intersection found"),null}else return this.raycaster.ray.intersectPlane(this.groundPlane,e)?(this.debug&&console.log("[MinePathDrawer] Ground intersection found:",{x:e.x.toFixed(2),y:e.y.toFixed(2),z:e.z.toFixed(2)}),e):(this.debug&&console.log("[MinePathDrawer] No ground intersection found"),null)}updateTempPath(e=null){this.removeTempPath();const t=e||this.currentPath;if(t.length<2)return;const n=new rt().setFromPoints(t),i=new Jt({color:16711680,linewidth:3,opacity:.8,transparent:!0});this.tempPath=new Ft(n,i),this.scene.add(this.tempPath)}removeTempPath(){this.tempPath&&(console.log("[MinePathDrawer] Removing temp path"),this.scene.remove(this.tempPath),this.tempPath.geometry.dispose(),this.tempPath.material.dispose(),this.tempPath=null)}completePath(){if(this.currentPath.length<2)return console.log("[MinePathDrawer] Complete path failed: not enough points"),null;console.log("[MinePathDrawer] Completing path with",this.currentPath.length,"points"),this.removeTempPath(),this.drawingCallbacks.onPathComplete&&this.drawingCallbacks.onPathComplete(this.currentPath);const e=[...this.currentPath];return this.currentPath=[],e}createPath(e){const{id:t,points:n,width:i=2.5,height:s=2.5,color:o="#808080",type:a="tunnel"}=e;if(!n||n.length<2)return null;const l=this.createPathMesh(n,i,s,o,a);if(l.userData={id:t,type:a,pathData:e},this.viewer&&this.viewer.collisionSystem){const h=Array.from(this.paths.values());let c=!1;h.forEach(d=>{var p;const u=this.viewer.collisionSystem.detectPathIntersections(l,d);u.length>0&&(c=!0,console.warn(`⚠️ Path intersection detected with path ${d.userData.id}:`,u),(p=this.viewer.options)!=null&&p.debugCollisions&&u.forEach(g=>{const y=new te(new Qn(.2),new Dt({color:16711680}));y.position.copy(g.point),this.scene.add(y),setTimeout(()=>this.scene.remove(y),5e3)}))}),c&&console.log(`⚠️ Path ${t} has intersections with existing paths`),this.viewer.collisionSystem.registerObject(l,"static",{type:"path",pathType:a,points:n,width:i,height:s})}return this.paths.set(t,l),this.scene.add(l),a==="tunnel"&&this.viewer&&this.viewer.createTunnelEndpoints&&setTimeout(()=>{this.viewer.createTunnelEndpoints(l,e)},100),console.log(`[MinePathDrawer] Yol oluşturuldu: ${t}, boyutlar: ${i}x${s}`),l}createPathMesh(e,t,n,i,s){const o=new Dn,a=this.createTubeGeometry(e,t,n),l=this.createPathMaterial(i,s),h=new te(a,l);h.castShadow=!0,h.receiveShadow=!0;const c=this.createTubeGeometry(e,t,n,{quality:"low"});h.userData.highGeometry=a,h.userData.lowGeometry=c,h.userData.lodState="high",o.add(h);const d=new Vl(a),u=new Jt({color:new ge(i).multiplyScalar(.5),opacity:.6,transparent:!0,linewidth:1}),p=new nr(d,u);return o.add(p),s==="conveyor"?this.addConveyorBelt(o,e,t):s==="rail"&&this.addRailTracks(o,e,t),o}createPathMaterial(e,t,n=null){const i=new ge(e);switch(t){case"tunnel":return new wt({color:i,transparent:!0,opacity:n??.9,shininess:30,specular:4473924});case"road":return new qs({color:i.multiplyScalar(.7),transparent:!0,opacity:n??.95});case"rail":return new wt({color:i,metalness:.7,roughness:.3,transparent:!0,opacity:n??.9});case"conveyor":return new wt({color:i,transparent:!0,opacity:n??.8,shininess:50,specular:8947848});default:return new qs({color:i,transparent:!0,opacity:n??.9})}}createTubeGeometry(e,t,n,i={}){if(e.length<2)return new et(1,1,1);const s=e.map(u=>u?u.isVector3?u:typeof u.x=="number"&&typeof u.y=="number"&&typeof u.z=="number"?new b(u.x,u.y,u.z):(console.warn("[createTubeGeometry] Unexpected point format, coercing to (0,0,0):",u),new b):new b),o=new An(s);o.tension=.2;const a=Math.max(e.length*6,24);let l=a;i.quality==="low"&&(l=Math.max(Math.floor(a*.35),8)),l=Math.min(l,360);const h=i.quality==="low"?8:16,c=new fn(o,l,Math.max(t,n)/2,h,!1),d=c.attributes.position.array;for(let u=0;u<d.length;u+=3){const p=d[u],g=d[u+1],y=d[u+2];if(Math.sqrt(p*p+y*y)>0){const f=Math.atan2(y,p),v=t*n/Math.sqrt((n*Math.cos(f))**2+(t*Math.sin(f))**2)/(Math.max(t,n)/2);d[u]=p*v,d[u+2]=y*v,g<0&&(d[u+1]=g*.8)}}return c.attributes.position.needsUpdate=!0,c.computeVertexNormals(),c}updateLOD(){if(this._lodFrame++,this._lodFrame%10===0)for(const[,e]of this.paths){if(!e)continue;const t=e.children.find(o=>o.isMesh);if(!t||!t.userData.highGeometry)continue;t.userData._bs||(t.userData.highGeometry.computeBoundingSphere(),t.userData._bs=t.userData.highGeometry.boundingSphere.clone());const n=t.userData._bs.center.clone();e.localToWorld(n);const s=n.distanceTo(this.camera.position)>180?"low":"high";s!==t.userData.lodState&&(s==="low"?(t.geometry=t.userData.lowGeometry,t.userData.lodState="low"):(t.geometry=t.userData.highGeometry,t.userData.lodState="high"))}}addConveyorBelt(e,t,n){const i=new An(t),s=new fn(i,t.length*2,n/3,8,!1),o=new wt({color:3355443,shininess:100,transparent:!0,opacity:.8}),a=new te(s,o);a.position.y+=.1,e.add(a)}addRailTracks(e,t,n){const i=new An(t),s=new fn(i,t.length*4,.05,6,!1),o=new wt({color:6710886,metalness:.8,roughness:.2}),a=new te(s,o.clone());a.position.x-=n/3,a.position.y+=.05,e.add(a);const l=new te(s.clone(),o.clone());l.position.x+=n/3,l.position.y+=.05,e.add(l)}removePath(e){const t=this.paths.get(e);t&&(this.scene.remove(t),t.traverse(n=>{n.geometry&&n.geometry.dispose(),n.material&&(Array.isArray(n.material)?n.material.forEach(i=>i.dispose()):n.material.dispose())}),this.paths.delete(e),console.log(`[MinePathDrawer] Yol silindi: ${e}`))}clearAllPaths(){for(const[e,t]of this.paths)this.removePath(e);console.log("[MinePathDrawer] Tüm yollar silindi")}getPath(e){return this.paths.get(e)}getAllPaths(){return Array.from(this.paths.values())}calculatePathLength(e){if(!e||e.length<2)return 0;let t=0;for(let n=1;n<e.length;n++){const i=e[n-1],s=e[n],o=s.x-i.x,a=s.y-i.y,l=s.z-i.z;t+=Math.sqrt(o*o+a*a+l*l)}return t}enableTunnelConstraint(e){this.tunnelConstraintMode=!0,this.constraintTunnel=e,console.log("[MinePathDrawer] Tunnel constraint mode enabled")}disableTunnelConstraint(){this.tunnelConstraintMode=!1,this.constraintTunnel=null,console.log("[MinePathDrawer] Tunnel constraint mode disabled")}updatePreview(e){if(!this.isDrawing||this.currentPath.length===0)return;const t=[...this.currentPath,e];this.createPreviewMesh(t),this.updateDistanceLabel(e)}createPreviewMesh(e){if(this.removePreviewMesh(),e.length<2)return;let t,n;switch(this.currentDrawingType){case"tunnel":t=this.createTubeGeometry(e,2.5,2.5),n=new Dt({color:6710886,transparent:!0,opacity:.3,wireframe:!0});break;case"road":t=this.createRoadGeometry(e,3),n=new Dt({color:3355443,transparent:!0,opacity:.4});break;case"rail":t=this.createRailGeometry(e,1.5),n=new Dt({color:6710886,transparent:!0,opacity:.5});break;case"conveyor":t=this.createConveyorGeometry(e,1),n=new Dt({color:4473924,transparent:!0,opacity:.4});break;default:t=new rt().setFromPoints(e),n=new Jt({color:16711680,transparent:!0,opacity:.7})}this.currentDrawingType==="tunnel"||this.currentDrawingType==="road"||this.currentDrawingType==="rail"||this.currentDrawingType==="conveyor"?this.previewMesh=new te(t,n):this.previewMesh=new Ft(t,n),this.scene.add(this.previewMesh)}removePreviewMesh(){this.previewMesh&&(this.scene.remove(this.previewMesh),this.previewMesh.geometry&&this.previewMesh.geometry.dispose(),this.previewMesh.material&&this.previewMesh.material.dispose(),this.previewMesh=null)}updateDistanceLabel(e){if(this.currentPath.length===0)return;const n=this.currentPath[this.currentPath.length-1].distanceTo(e);this.updateDistanceDisplay(n)}updateDistanceDisplay(e){const t=document.getElementById("distance-display"),n=document.getElementById("distance-value");t&&n&&(t.style.display="block",n.textContent=`${e.toFixed(1)}m`)}removeDistanceLabel(){const e=document.getElementById("distance-display");e&&(e.style.display="none")}createRoadGeometry(e,t){const n=new An(e);return new fn(n,e.length*2,t/2,8,!1)}createRailGeometry(e,t){const n=new An(e);return new fn(n,e.length*2,.1,6,!1)}createConveyorGeometry(e,t){const n=new An(e);return new fn(n,e.length*2,t/2,6,!1)}}class eg{constructor(e,t,n,i){this.scene=e,this.camera=t,this.renderer=n,this.pathDrawer=i,this.raycaster=new Un,this.mouse=new ae,this.isEditing=!1,this.activePath=null,this.handles=[],this.draggingHandle=null,this.dragPlane=new Vt(new b(0,1,0),0),this.offset=new b,this.intersection=new b,this.callbacks={onPointChange:null,onEditStart:null,onEditEnd:null},this.undoStack=[],this.redoStack=[],this.maxHistory=50}setCallbacks(e){this.callbacks={...this.callbacks,...e}}startEditing(e){if(!e||!e.userData||!e.userData.pathData)return;this.stopEditing(),this.isEditing=!0,this.activePath=e;const t=e.userData.pathData,n=(t.points||t.path_points||[]).map(s=>({...s}));this.undoStack=[n],this.redoStack=[],this.buildHandles(),this.callbacks.onEditStart&&this.callbacks.onEditStart(e);const i=document.getElementById("save-path-btn");i&&(i.disabled=!1)}stopEditing(){this.clearHandles(),this.isEditing=!1,this.activePath=null,this.draggingHandle=null,this.callbacks.onEditEnd&&this.callbacks.onEditEnd();const e=document.getElementById("save-path-btn");e&&(e.disabled=!0)}buildHandles(){this.clearHandles();const e=this.activePath.userData.pathData,t=e.points||e.path_points||[],n=new Qn(.6,12,12),i=new Dt({color:16763904});t.forEach((s,o)=>{const a=new te(n.clone(),i.clone());a.position.set(s.x,s.y,s.z),a.userData.isPathHandle=!0,a.userData.pointIndex=o,this.scene.add(a),this.handles.push({mesh:a,index:o})})}clearHandles(){this.handles.forEach(e=>{this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose()}),this.handles=[]}updateMouse(e){const t=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-((e.clientY-t.top)/t.height)*2+1}pointerDown(e){if(!this.isEditing)return;this.updateMouse(e),this.raycaster.setFromCamera(this.mouse,this.camera);const t=this.raycaster.intersectObjects(this.handles.map(n=>n.mesh),!0);if(t.length>0){const n=t[0].object;this.draggingHandle=this.handles.find(i=>i.mesh===n),this.dragPlane.set(new b(0,1,0),-n.position.y)}}pointerMove(e){if(!this.isEditing||!this.draggingHandle)return;this.updateMouse(e),this.raycaster.setFromCamera(this.mouse,this.camera);const t=new b;if(this.raycaster.ray.intersectPlane(this.dragPlane,t)){const n=this.draggingHandle;t.y=-2.5,n.mesh.position.copy(t),this.applyHandlePosition(n.index,t,{skipHistory:!0,skipDirty:!0})}}pointerUp(){var e;if(this.isEditing){if(this.draggingHandle){const t=(e=this.activePath)==null?void 0:e.userData.pathData;t&&t.points&&(this.pushHistory(t.points),this.viewer&&this.viewer.markPathDirty(t.id||t.path_id||this.activePath.userData.id))}this.draggingHandle=null}}applyHandlePosition(e,t,n={}){if(!this.activePath)return;const i=this.activePath.userData.pathData,s=i.points||i.path_points||[];if(!s[e])return;s[e]={x:t.x,y:t.y,z:t.z};const o=this.viewer&&this.viewer.pathSimplifyMultiplier?this.viewer.pathSimplifyMultiplier:1,a=ng(s,o),l=tg(s,a);this.rebuildPath(l,i),this.callbacks.onPointChange&&this.callbacks.onPointChange(l,i),n.skipHistory||this.pushHistory(l),!n.skipDirty&&this.viewer&&this.viewer.markPathDirty(i.id||i.path_id||this.activePath.userData.id)}pushHistory(e){const t=e.map(i=>({...i})),n=this.undoStack[this.undoStack.length-1];n&&n.length===t.length&&n.every((i,s)=>i.x===t[s].x&&i.y===t[s].y&&i.z===t[s].z)||(this.undoStack.push(t),this.undoStack.length>this.maxHistory&&this.undoStack.shift(),this.redoStack=[])}undo(){if(this.undoStack.length<=1)return;const e=this.undoStack.pop();this.redoStack.push(e);const t=this.undoStack[this.undoStack.length-1];this.applyHistoryState(t)}redo(){if(this.redoStack.length===0)return;const e=this.redoStack.pop();this.undoStack.push(e),this.applyHistoryState(e)}applyHistoryState(e){if(!this.activePath)return;const t=this.activePath.userData.pathData;this.rebuildPath(e,t),this.callbacks.onPointChange&&this.callbacks.onPointChange(e,t),this.clearHandles(),this.buildHandles()}rebuildPath(e,t){const n=this.activePath;[...n.children].forEach(c=>{n.remove(c),c.geometry&&c.geometry.dispose(),c.userData&&(c.userData.lowGeometry&&c.userData.lowGeometry!==c.geometry&&(c.userData.lowGeometry.dispose(),c.userData.lowGeometry=null),c.userData.highGeometry&&c.userData.highGeometry!==c.geometry&&(c.userData.highGeometry!==c.geometry&&c.userData.highGeometry.dispose(),c.userData.highGeometry=null)),c.material&&(Array.isArray(c.material)?c.material.forEach(d=>d.dispose()):c.material.dispose())});const s=t.width||2.5,o=t.height||2.5,a=t.color||"#808080",l=t.type||"tunnel";this.pathDrawer.createPathMesh(e.map(c=>new b(c.x,c.y,c.z)),s,o,a,l).children.forEach(c=>n.add(c)),t.points=e,t.path_points=e,this.clearHandles(),this.buildHandles(),n.traverse(c=>{c.userData&&c.userData._bs&&(c.userData._bs=null)})}}function tg(r,e){if(!r||r.length<3)return r;const t=e*e;function n(o,a,l){let h=a.x,c=a.y,d=a.z,u=l.x-h,p=l.y-c,g=l.z-d;if(u!==0||p!==0||g!==0){let y=((o.x-h)*u+(o.y-c)*p+(o.z-d)*g)/(u*u+p*p+g*g);y>1?(h=l.x,c=l.y,d=l.z):y>0&&(h+=u*y,c+=p*y,d+=g*y)}return u=o.x-h,p=o.y-c,g=o.z-d,u*u+p*p+g*g}function i(o,a,l,h,c){let d=h,u=-1;for(let p=a+1;p<l;p++){const g=n(o[p],o[a],o[l]);g>d&&(u=p,d=g)}d>h&&u!==-1&&(u-a>1&&i(o,a,u,h,c),c.push(o[u]),l-u>1&&i(o,u,l,h,c))}const s=[r[0]];return i(r,0,r.length-1,t,s),s.push(r[r.length-1]),s}function ng(r,e=1){if(!r||r.length<3)return .05*e;let t=0;for(let c=1;c<r.length;c++){const d=r[c].x-r[c-1].x,u=r[c].y-r[c-1].y,p=r[c].z-r[c-1].z;t+=Math.sqrt(d*d+u*u+p*p)}let n=0,i=0;for(let c=1;c<r.length-1;c++){const d=r[c-1],u=r[c],p=r[c+1],g=u.x-d.x,y=u.y-d.y,m=u.z-d.z,f=p.x-u.x,M=p.y-u.y,v=p.z-u.z,_=Math.sqrt(g*g+y*y+m*m)+1e-6,E=Math.sqrt(f*f+M*M+v*v)+1e-6,T=(g*f+y*M+m*v)/(_*E),x=Math.acos(Math.min(1,Math.max(-1,T)));n+=x,i++}const s=i?n/i:0,o=Math.min(1,t/500),a=1-Math.min(1,s/.8),h=(.05+.4*o*a)*e;return Math.min(1,Math.max(.02,h))}class ig{constructor(e,t,n){this.scene=e,this.camera=t,this.renderer=n,this.raycaster=new Un,this.mouse=new ae,this.selectedObject=null,this.multiSelect=!0,this.selectedObjects=new Set,this.selectableObjects=new Set,this.highlightMaterial=new Dt({color:16729156,transparent:!0,opacity:.3,depthTest:!1}),this.outlineColor=16711680,this.xrayModeObject=null,this.originalMaterials=new Map,this.callbacks={onObjectSelect:null,onObjectDeselect:null,onObjectDelete:null}}setCallbacks(e){this.callbacks={...this.callbacks,...e}}addSelectableObject(e,t={}){e.userData.selectable=!0,e.userData.objectData=t,this.selectableObjects.add(e)}removeSelectableObject(e){this.selectableObjects.delete(e),this.selectedObject===e&&this.deselectObject()}handleClick(e){this.updateMousePosition(e),this.raycaster.setFromCamera(this.mouse,this.camera);const t=Array.from(this.selectableObjects),n=this.raycaster.intersectObjects(t,!0);if(n.length>0){let i=null;for(const s of n){let o=s.object;for(;o&&!o.userData.selectable;)o=o.parent;if(o&&this.selectableObjects.has(o)){i=o;break}}if(i){const s=e.shiftKey;this.multiSelect&&s?this.selectedObjects.has(i)?this.deselectObject(i):this.addToSelection(i):(this.clearMultiSelection(),this.selectObject(i))}}else this.clearMultiSelection(),this.deselectObject()}updateMousePosition(e){const t=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-((e.clientY-t.top)/t.height)*2+1}selectObject(e){if(this.selectedObject===e){e.userData.objectData&&e.userData.objectData.pathType==="tunnel"&&this.toggleXRayMode(e);return}this.deselectObject(),this.selectedObject=e,this.selectedObjects.add(e),this.addHighlight(e),e.userData.objectData&&e.userData.objectData.pathType==="tunnel"&&this.enableXRayMode(e),this.callbacks.onObjectSelect&&this.callbacks.onObjectSelect(e,e.userData.objectData)}deselectObject(){this.selectedObject&&(this.removeHighlight(this.selectedObject),this.disableXRayMode(),this.callbacks.onObjectDeselect&&this.callbacks.onObjectDeselect(this.selectedObject),this.selectedObject=null)}deleteSelectedObject(){if(this.selectedObject){const e=this.selectedObject;this.deselectObject(),this.callbacks.onObjectDelete&&this.callbacks.onObjectDelete(e)}}addHighlight(e){e.traverse(t=>{if(t.isMesh&&t.geometry){const n=new Vl(t.geometry),i=new nr(n,new Jt({color:this.outlineColor,linewidth:3}));i.name="highlight_outline",t.add(i)}})}removeHighlight(e){e.traverse(t=>{const n=t.getObjectByName("highlight_outline");n&&(t.remove(n),n.geometry.dispose(),n.material.dispose())})}deselectObject(e=null){if(e){this.removeHighlight(e),this.xrayModeObject===e&&this.disableXRayMode(),this.selectedObjects.delete(e),this.selectedObject===e&&(this.selectedObject=null),this.callbacks.onObjectDeselect&&this.callbacks.onObjectDeselect(e);return}this.selectedObject&&(this.removeHighlight(this.selectedObject),this.xrayModeObject===this.selectedObject&&this.disableXRayMode(),this.callbacks.onObjectDeselect&&this.callbacks.onObjectDeselect(this.selectedObject)),this.selectedObject=null,this.selectedObjects.clear()}addToSelection(e){this.selectedObjects.has(e)||(this.selectedObjects.add(e),this.addHighlight(e),this.callbacks.onObjectSelect&&this.callbacks.onObjectSelect(e,e.userData.objectData))}clearMultiSelection(){if(this.selectedObjects.size>1){for(const e of this.selectedObjects)e!==this.selectedObject&&this.removeHighlight(e);this.selectedObjects=this.selectedObject?new Set([this.selectedObject]):new Set}}enableXRayMode(e){this.xrayModeObject!==e&&(this.disableXRayMode(),this.xrayModeObject=e,e.traverse(t=>{if(t.isMesh){this.originalMaterials.set(t,t.material.clone());const n=t.material.clone();n.transparent=!0,n.opacity=.3,n.side=Wt,t.material=n}}),console.log("[ObjectSelector] X-Ray mode enabled for tunnel"))}disableXRayMode(){this.xrayModeObject&&(this.xrayModeObject.traverse(e=>{e.isMesh&&this.originalMaterials.has(e)&&(e.material.dispose(),e.material=this.originalMaterials.get(e),this.originalMaterials.delete(e))}),this.xrayModeObject=null,console.log("[ObjectSelector] X-Ray mode disabled"))}toggleXRayMode(e){this.xrayModeObject===e?this.disableXRayMode():this.enableXRayMode(e)}updateSelectedObjectMaterial(e,t){if(this.selectedObject){if(console.log(`[ObjectSelector] Updating ${e} to ${t} for object type:`,this.selectedObject.type||"unknown"),this.selectedObject.material)console.log("[ObjectSelector] Applying to single mesh material"),this.applyMaterialProperty(this.selectedObject.material,e,t);else if(this.selectedObject.isGroup||this.selectedObject.type==="Group"){console.log("[ObjectSelector] Applying to group children");let n=0;this.selectedObject.traverse(i=>{if(i.isMesh&&i.material)n++,this.applyMaterialProperty(i.material,e,t);else if(i.isLineSegments&&i.material){if(e==="color"){const s=new ge(t).multiplyScalar(.5);i.material.color=s}else e==="opacity"&&(i.material.opacity=Math.min(t*.6,.6),i.material.transparent=!0);i.material.needsUpdate=!0}}),console.log(`[ObjectSelector] Updated ${n} meshes in group`)}else console.warn("[ObjectSelector] No material found on selected object");console.log(`[ObjectSelector] Material update completed for ${e}`)}}applyMaterialProperty(e,t,n){switch(t){case"color":const i=new ge(n);e.color=i;break;case"opacity":e.opacity=n,e.transparent=n<1;break;case"shininess":e.shininess!==void 0&&(e.shininess=n);break}e.needsUpdate=!0}showMaterialEditor(){if(!this.selectedObject)return;let e=[];if(this.selectedObject.material?e.push(this.selectedObject.material):(this.selectedObject.isGroup||this.selectedObject.type==="Group")&&this.selectedObject.traverse(p=>{p.isMesh&&p.material&&e.push(p.material)}),e.length===0){console.warn("[ObjectSelector] No material found for selected object");return}let t=0,n=0,i=0,s=0,o=0;e.forEach(p=>{t+=p.color.r,n+=p.color.g,i+=p.color.b,s+=p.opacity||1,o+=p.shininess||30});const l="#"+new ge(t/e.length,n/e.length,i/e.length).getHexString(),h=s/e.length,c=Math.round(o/e.length);console.log(`[ObjectSelector] Material editor opening with ${e.length} materials, avg values:`,{color:l,opacity:h,shininess:c});const d=`
            <div id="material-editor" style="position: absolute; top: 50px; right: 10px; width: 250px; 
                 background: rgba(0,0,0,0.9); border: 1px solid #555; border-radius: 8px; padding: 15px; 
                 color: white; font-family: Arial; z-index: 10000;">
                <h4 style="margin: 0 0 15px 0; color: #fff;">Material Editor</h4>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; margin-bottom: 5px; font-size: 12px;">Renk:</label>
                    <input type="color" id="selected-color" value="${l}" 
                           style="width: 100%; height: 30px; border: none; border-radius: 3px;">
                </div>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; margin-bottom: 5px; font-size: 12px;">
                        Saydamlık: <span id="selected-opacity-value">${h.toFixed(1)}</span>
                    </label>
                    <input type="range" id="selected-opacity" min="0.1" max="1.0" step="0.1" value="${h}"
                           style="width: 100%;">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-size: 12px;">
                        Parlaklık: <span id="selected-shininess-value">${c}</span>
                    </label>
                    <input type="range" id="selected-shininess" min="0" max="100" step="5" value="${c}"
                           style="width: 100%;">
                </div>
                
                <div style="display: flex; gap: 8px;">
                    <button id="apply-material" style="flex: 1; padding: 8px; background: #28a745; 
                            color: white; border: none; border-radius: 4px; cursor: pointer;">Uygula</button>
                    <button id="close-material-editor" style="flex: 1; padding: 8px; background: #dc3545; 
                            color: white; border: none; border-radius: 4px; cursor: pointer;">Kapat</button>
                </div>
            </div>
        `,u=document.getElementById("material-editor");u&&u.remove(),document.body.insertAdjacentHTML("beforeend",d),document.getElementById("selected-color").addEventListener("change",p=>{this.updateSelectedObjectMaterial("color",p.target.value)}),document.getElementById("selected-opacity").addEventListener("input",p=>{const g=parseFloat(p.target.value);document.getElementById("selected-opacity-value").textContent=g.toFixed(1),this.updateSelectedObjectMaterial("opacity",g)}),document.getElementById("selected-shininess").addEventListener("input",p=>{const g=parseInt(p.target.value);document.getElementById("selected-shininess-value").textContent=g,this.updateSelectedObjectMaterial("shininess",g)}),document.getElementById("close-material-editor").addEventListener("click",()=>{document.getElementById("material-editor").remove()})}}class sg{constructor(e,t,n={}){if(console.log("%c[SimpleMine3DViewer] Constructor called","color: blue; font-weight: bold;"),console.log("[SimpleMine3DViewer] Parameters:",{containerId:e,mineId:t,options:n}),this.containerId=e,this.mineId=t,this.container=document.getElementById(e),this.options={enableWebGL2:!0,enableCollisionDetection:!0,enableAdvancedShaders:!0,debugCollisions:!1,debugPerformance:!1,...n},this.actionHistory={undo:[],redo:[]},this.mergePersistEndpoint=n.mergePersistEndpoint||`/api/mines/${t}/merge-connections`,this.enableMergePersistence=n.enableMergePersistence??!1,this.orientationAnimations=[],console.log("[SimpleMine3DViewer] Container element:",this.container),!this.container){const i=`Container with id "${e}" not found`;throw console.error("[SimpleMine3DViewer]",i),new Error(i)}console.log("[SimpleMine3DViewer] THREE.js (ESM) version:",$s),this.scene=null,this.camera=null,this.renderer=null,this.controls=null,this.webgl2Renderer=null,this.collisionSystem=null,this.shaderManager=null,this.performanceMonitor=null,this.pathDrawer=null,this.pathEditor=null,this.objectCreator=null,this.transformControls=null,this.isPathDrawingMode=!1,this.isCreatingMode=!1,this.selectedObject=null,this.objectSelector=null,this.endpointIndicators=new Map,this.showEndpoints=!0,this.tunnelExtensionPoints=new Map,this.showExtensionPoints=!0,this.activeExtensionPoint=null,console.log("[SimpleMine3DViewer] Starting initialization..."),this._dirtyPaths=new Set,this._dirtyIndicatorEl=null,this.measurementsEnabled=!0,this.measurementStep=5,this._lastMeasuredTunnel=null,this.autoSaveSelection=!0,this.autoSaveDelay=800,this._autoSaveTimer=null,this._autoSaveInFlight=!1,this.init()}_getSelEls(){return this._selCache||(this._selCache={card:document.getElementById("selection-detail-card"),title:document.getElementById("sel-title"),meta:document.getElementById("sel-meta"),dyn:document.getElementById("sel-dynamic-fields"),gen:document.getElementById("sel-generic-fields"),status:document.getElementById("sel-status"),saveBtn:document.getElementById("sel-save-btn"),deleteBtn:document.getElementById("sel-delete-btn"),closeBtn:document.getElementById("sel-close-btn")},this._selCache.closeBtn&&this._selCache.closeBtn.addEventListener("click",()=>this.hideSelectionCard()),this._selCache.deleteBtn&&this._selCache.deleteBtn.addEventListener("click",()=>{var e;if(this.selectedObject&&confirm("Seçili nesneyi silmek istiyor musunuz?")){const t=this.selectedObject.userData.objectData||this.selectedObject.userData;t&&t.type==="path"?(e=this.objectSelector)==null||e.deleteSelectedObject():this.deleteSelectedObject()}}),this._selCache.saveBtn&&this._selCache.saveBtn.addEventListener("click",()=>this.saveSelectionEdits())),this._selCache}showSelectionCard(e,t){const n=this._getSelEls();n.card&&(n.card.style.display="block",this.populateSelectionCard(e,t))}hideSelectionCard(){const e=this._getSelEls();e.card&&(e.card.style.display="none")}markSelectionDirty(e=!0){const t=this._getSelEls();t.saveBtn&&(e?(t.saveBtn.disabled=!1,t.saveBtn.classList.add("btn-warning"),this.autoSaveSelection&&(clearTimeout(this._autoSaveTimer),this._autoSaveTimer=setTimeout(async()=>{if(!this._autoSaveInFlight){this._autoSaveInFlight=!0;try{await this.saveSelectionEdits()}catch(n){console.warn("[AutoSave] Selection auto-save failed:",n.message)}finally{this._autoSaveInFlight=!1}}},this.autoSaveDelay))):(t.saveBtn.disabled=!0,t.saveBtn.classList.remove("btn-warning")))}populateSelectionCard(e,t){var a,l,h;const n=this._getSelEls();if(!n.card)return;if(t=t||((a=e==null?void 0:e.userData)==null?void 0:a.objectData)||(e==null?void 0:e.userData)||{},e!=null&&e.userData){const c=e.userData.parameters||t.parameters,d={width:(c==null?void 0:c.width)??t.width??e.userData.width,height:(c==null?void 0:c.height)??t.height??e.userData.height,length:(c==null?void 0:c.length)??t.length??e.userData.length,orientation:(c==null?void 0:c.orientation)??t.orientation??"yatay"};e.userData.parameters?["width","height","length","orientation"].forEach(u=>{e.userData.parameters[u]==null&&d[u]!=null&&(e.userData.parameters[u]=d[u])}):e.userData.parameters={...d},e.userData.objectData?e.userData.objectData.parameters||(e.userData.objectData.parameters=e.userData.parameters):e.userData.objectData={id:t.id||e.userData.serverId,type:t.type||t.pathType||e.userData.type||"tunnel",name:t.name||`Tünel ${e.userData.serverId||""}`.trim(),parameters:e.userData.parameters,width:e.userData.parameters.width,height:e.userData.parameters.height,length:e.userData.parameters.length,pathType:t.pathType||t.type==="path"?t.pathType:void 0,color:t.color||((l=e.material)!=null&&l.color?`#${e.material.color.getHex().toString(16).padStart(6,"0")}`:"#808080")},t=e.userData.objectData}const i=t.type==="path",s=t.type==="tunnel"||t.pathType==="tunnel";if(n.title&&(n.title.innerHTML=`<i class="fas fa-cube me-1"></i>${t.name||"Obje"}${i?' <span class="badge bg-info ms-1">Path</span>':""}`),n.meta&&(n.meta.innerHTML=`ID: <span class="text-light">${t.id??"-"}</span> · Tip: <span class="text-light">${t.pathType||t.type||"-"}</span>`),n.dyn){let c="";if(i){c+=this._buildNumberField("Genişlik (m)","sel-width",t.width,.1,100,.1),c+=this._buildNumberField("Yükseklik (m)","sel-height",t.height,.1,100,.1),c+=`<div class="mb-2"><label class="form-label mb-1">Segment Sayısı</label><div class="form-control form-control-sm bg-dark text-light">${(t.points||[]).length}</div></div>`,c+=`<div class="mb-2"><label class="form-label mb-1">Uzunluk</label><div class="form-control form-control-sm bg-dark text-light">${(t.length||0).toFixed(2)} m</div></div>`,c+=this._buildColorField("Renk","sel-color",t.color||"#808080");let d=1;if(t.opacity!==void 0)d=t.opacity;else if(e&&e.children&&e.children.length>0){const u=e.children[0];u.material&&u.material.opacity!==void 0&&(d=u.material.opacity)}c+=this._buildNumberField("Saydamlık","sel-opacity",d,.1,1,.1)}else if(s&&((h=e==null?void 0:e.userData)!=null&&h.parameters)){const d=e.userData.parameters;d.opacity==null&&e.material&&typeof e.material.opacity=="number"&&(d.opacity=e.material.opacity),c+=this._buildNumberField("Genişlik (m)","sel-width",d.width,.5,50,.1),c+=this._buildNumberField("Yükseklik (m)","sel-height",d.height,.5,50,.1),c+=this._buildNumberField("Uzunluk (m)","sel-length",d.length,1,1e4,.5),c+=this._buildSelectField("Yön","sel-orientation",["yatay","dikey"],d.orientation),c+=this._buildColorField("Renk","sel-color",t.color||"#808080"),c+=this._buildNumberField("Ölçüm Adımı (m)","sel-meas-step",this.measurementStep,1,100,1)}else c+='<div class="text-muted small">Bu obje için düzenlenebilir alan yok.</div>';n.dyn.innerHTML=c}n.gen&&(n.gen.innerHTML=`<div class="mb-2"><label class="form-label mb-1">Pozisyon</label><div class="form-control form-control-sm bg-dark text-light">${e.position.x.toFixed(2)}, ${e.position.y.toFixed(2)}, ${e.position.z.toFixed(2)}</div></div>`),["sel-width","sel-height","sel-length","sel-orientation","sel-color","sel-opacity"].forEach(c=>{const d=document.getElementById(c);d&&d.addEventListener("input",()=>{d.type==="number"&&typeof d.value=="string"&&d.value.includes(",")&&(d.value=d.value.replace(",",".")),this.markSelectionDirty(!0),this._liveSelectionChange(c)})});const o=document.getElementById("sel-meas-step");o&&o.addEventListener("input",()=>{const c=parseInt(o.value,10);!isNaN(c)&&c>0&&(this.measurementStep=c,s&&this.buildTunnelMeasurements(e,t))}),s&&this.setupTunnelMergeEvents(e,t),this.markSelectionDirty(!1),n.status&&(n.status.textContent="")}_liveSelectionChange(e){if(!this.selectedObject)return;const t=this.selectedObject.userData&&(this.selectedObject.userData.objectData||this.selectedObject.userData)||{},n=t.type==="path",i=t.type==="tunnel"||t.pathType==="tunnel";if(n){const s=this.selectedObject,o=document.getElementById("sel-width"),a=document.getElementById("sel-height"),l=document.getElementById("sel-color"),h=document.getElementById("sel-opacity"),c=parseFloat(o==null?void 0:o.value),d=parseFloat(a==null?void 0:a.value),u=l==null?void 0:l.value,p=parseFloat(h==null?void 0:h.value),g=s.userData.objectData||t;let y=!1;if(!isNaN(p)&&p>=.1&&p<=1&&(this.updateSelectedObjectMaterial("opacity",p),g&&(g.opacity=p)),!isNaN(c)&&c>0&&c!==g.width&&(g.width=c,y=!0),!isNaN(d)&&d>0&&d!==g.height&&(g.height=d,y=!0),u&&u!==g.color&&(g.color=u,y=!0),y){const m=(g.points||g.path_points||[]).map(f=>new b(f.x,f.y,f.z));if(m.length>=2&&this.pathDrawer){const f=g.width||2.5,M=g.height||2.5,v=g.color||"#808080",_=g.pathType||g.type||"tunnel";if(!(this.pathEditor&&this.pathEditor.isEditing&&this.pathEditor.activePath===s)){for(;s.children.length;){const x=s.children.pop();x.geometry&&x.geometry.dispose(),x.material&&(Array.isArray(x.material)?x.material.forEach(D=>D.dispose()):x.material.dispose()),s.remove(x)}this.pathDrawer.createPathMesh(m,f,M,v,_).children.forEach(x=>s.add(x)),g.length=this.pathDrawer.calculatePathLength(m.map(x=>({x:x.x,y:x.y,z:x.z})));const T=document.getElementById("sel-dynamic-fields");T&&T.innerHTML.includes("Uzunluk")&&T.querySelectorAll("div")}}}}else if(i){const s={...this.selectedObject.userData.parameters||{}},o=document.getElementById("sel-width"),a=document.getElementById("sel-height"),l=document.getElementById("sel-length"),h=document.getElementById("sel-orientation"),c=document.getElementById("sel-color");let d=!1,u=!1;const p=o&&!isNaN(parseFloat(o.value))?parseFloat(o.value):s.width,g=a&&!isNaN(parseFloat(a.value))?parseFloat(a.value):s.height,y=l&&!isNaN(parseFloat(l.value))?parseFloat(l.value):s.length,m=p&&p>.01?p:s.width||1,f=g&&g>.01?g:s.height||1,M=y&&y>.1?y:s.length||1;if(m!==s.width&&(s.width=m,d=!0),f!==s.height&&(s.height=f,d=!0),M!==s.length&&(s.length=M,d=!0),h&&h.value&&h.value!==s.orientation&&(u=!0,s.orientation=h.value,d=!0),c&&c.value&&this.selectedObject.material&&"#"+this.selectedObject.material.color.getHexString()!==c.value&&this.selectedObject.material.color.set(c.value),d){const v=this.selectedObject.material,_=v==null?void 0:v.opacity,E=v==null?void 0:v.transparent;if(this._validateTunnelParams(s)?this.replaceTunnelGeometry(this.selectedObject,s):console.warn("[SimpleMine3DViewer] Geçersiz tünel parametreleri, geometry rebuild iptal",s),this.selectedObject.material&&v&&(this.selectedObject.material.opacity=_,this.selectedObject.material.transparent=E||_<1,this.selectedObject.material.needsUpdate=!0),u&&this.camera&&this.controls){const T=this.selectedObject.position.clone(),x=this.camera.position.distanceTo(T);let D;s.orientation==="dikey"||s.orientation==="vertical"?D=new b(T.x+x*.6,T.y+x*.8,T.z+x*.3):D=new b(T.x+x*.6,T.y+x*.3,T.z+x*.8);const S=this.camera.position.clone(),A=performance.now(),F=650,G=Z=>{const R=Math.min(1,(Z-A)/F),O=R<.5?2*R*R:-1+(4-2*R)*R;this.camera.position.lerpVectors(S,D,O),this.controls.target.lerpVectors(this.controls.target.clone(),T,O),R<1?requestAnimationFrame(G):this.controls.update()};requestAnimationFrame(G)}}}}_buildNumberField(e,t,n,i,s,o){return n==null&&(n=""),`<div class="mb-2"><label class="form-label mb-1" for="${t}">${e}</label><input type="number" class="form-control form-control-sm bg-dark text-light" id="${t}" value="${n}" min="${i}" max="${s}" step="${o}"></div>`}_buildColorField(e,t,n){return`<div class="mb-2"><label class="form-label mb-1" for="${t}">${e}</label><input type="color" class="form-control form-control-color form-control-sm p-0 bg-dark border-0" id="${t}" value="${n}" title="Renk seç"></div>`}_buildSelectField(e,t,n,i){let s=a=>a;if(t==="sel-orientation"){const a={horizontal:"Yatay",vertical:"Dikey",yatay:"Yatay",dikey:"Dikey"};s=l=>a[l]||l,i==="horizontal"&&(i="yatay"),i==="vertical"&&(i="dikey"),n=n.map(l=>l==="horizontal"?"yatay":l==="vertical"?"dikey":l)}const o=n.map(a=>`<option value="${a}" ${a===i?"selected":""}>${s(a)}</option>`).join("");return`<div class="mb-2"><label class="form-label mb-1" for="${t}">${e}</label><select class="form-select form-select-sm bg-dark text-light" id="${t}">${o}</select></div>`}async saveSelectionEdits(){var i,s,o,a,l,h,c,d,u,p;const e=this._getSelEls();if(!this.selectedObject||!e.saveBtn)return;const t=this.selectedObject.userData.objectData||this.selectedObject.userData||{},n=t.type==="path";try{if(n){const g={},y=parseFloat((i=document.getElementById("sel-width"))==null?void 0:i.value),m=parseFloat((s=document.getElementById("sel-height"))==null?void 0:s.value),f=(o=document.getElementById("sel-color"))==null?void 0:o.value,M=parseFloat((a=document.getElementById("sel-opacity"))==null?void 0:a.value);isNaN(y)||(g.width=y),isNaN(m)||(g.height=m),f&&(g.color=f),!isNaN(M)&&M>=.1&&M<=1&&(g.opacity=M,this.updateSelectedObjectMaterial("opacity",M)),await this.updatePathToServer(t.id,g)}else if((t.type==="tunnel"||t.pathType==="tunnel")&&this.selectedObject.userData.serverId){const g={...this.selectedObject.userData.parameters},y=parseFloat((l=document.getElementById("sel-width"))==null?void 0:l.value),m=parseFloat((h=document.getElementById("sel-height"))==null?void 0:h.value),f=parseFloat((c=document.getElementById("sel-length"))==null?void 0:c.value),M=(d=document.getElementById("sel-orientation"))==null?void 0:d.value,v=(u=document.getElementById("sel-color"))==null?void 0:u.value;isNaN(y)||(g.width=y),isNaN(m)||(g.height=m),isNaN(f)||(g.length=f),M&&(g.orientation=M),v&&this.selectedObject.material&&this.selectedObject.material.color.set(v);const _=this.selectedObject.material,E=_==null?void 0:_.opacity,T=_==null?void 0:_.transparent;if(this._validateTunnelParams(g))this.replaceTunnelGeometry(this.selectedObject,g);else{console.warn("[SimpleMine3DViewer] Geçersiz parametreler, server update iptal",g);return}this.selectedObject.material&&_&&(this.selectedObject.material.opacity=E,this.selectedObject.material.transparent=T||E<1,this.selectedObject.material.needsUpdate=!0),await fetch(`/api/mines/${this.mineId}/models/${this.selectedObject.userData.serverId}`,{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json","X-CSRF-TOKEN":((p=document.querySelector('meta[name="csrf-token"]'))==null?void 0:p.getAttribute("content"))||""},body:JSON.stringify({geometry:{type:"tunnel",width:g.width,height:g.height,length:g.length,orientation:g.orientation},material:{color:this.selectedObject.material.color.getHex(),opacity:this.selectedObject.material.opacity}})}).then(x=>x.ok?x.json():Promise.reject(new Error("Model update failed "+x.status))).then(()=>{this.selectedObject.userData.parameters={...g},this.selectedObject.userData.objectData&&(this.selectedObject.userData.objectData.parameters=this.selectedObject.userData.parameters,this.selectedObject.userData.objectData.width=g.width,this.selectedObject.userData.objectData.height=g.height,this.selectedObject.userData.objectData.length=g.length)}).catch(x=>console.warn("[SimpleMine3DViewer] Server model update failed",x))}e.status&&(e.status.textContent="Kaydedildi"),this.markSelectionDirty(!1),setTimeout(()=>{this.deselectObject(),console.log("[SimpleMine3DViewer] Selection edits saved and object deselected")},500)}catch(g){console.error("Selection save error",g),e.status&&(e.status.style.color="#ff6b6b",e.status.textContent="Kaydetme hatası")}}async init(){var e,t;try{console.log("%c[SimpleMine3DViewer] Initializing 3D system...","color: green; font-weight: bold;");const n=document.getElementById("loading-container");n&&(n.style.opacity="0",n.style.pointerEvents="none",n.style.transition="opacity .3s",setTimeout(()=>{n&&(n.style.display="none")},350)),this.container.style.display="block",console.log("[SimpleMine3DViewer] Container dimensions:",{clientWidth:this.container.clientWidth,clientHeight:this.container.clientHeight,offsetWidth:this.container.offsetWidth,offsetHeight:this.container.offsetHeight}),(this.container.clientWidth===0||this.container.clientHeight===0)&&console.warn("[SimpleMine3DViewer] Container has zero dimensions, using default sizes"),console.log("[SimpleMine3DViewer] Creating scene..."),this.scene=new pm,this.scene.background=new ge(8900331),console.log("[SimpleMine3DViewer] Scene created:",this.scene),console.log("[SimpleMine3DViewer] Creating camera...");const i=this.container.clientWidth/this.container.clientHeight||16/9;this.camera=new Bt(60,i,.1,500),this.camera.position.set(15,5,25),this.camera.lookAt(0,-2,0),console.log("[SimpleMine3DViewer] Camera created:",{fov:this.camera.fov,aspect:this.camera.aspect,position:this.camera.position,near:this.camera.near,far:this.camera.far}),console.log("[SimpleMine3DViewer] Creating renderer..."),this.renderer=new js({antialias:!0,alpha:!0,powerPreference:"high-performance"});const s=this.container.clientWidth||800,o=this.container.clientHeight||600;if(this.renderer.setSize(s,o),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!1,this.renderer.toneMapping=lo,this.renderer.toneMappingExposure=1.2,this.renderer.outputColorSpace=ft,this.renderer.domElement.style.width="100%",this.renderer.domElement.style.height="100%",this.renderer.domElement.style.display="block",this.renderer.domElement.style.position="relative",console.log("[SimpleMine3DViewer] Renderer created:",{width:s,height:o,shadowMap:this.renderer.shadowMap.enabled,toneMapping:this.renderer.toneMapping,domElement:this.renderer.domElement}),console.log("[SimpleMine3DViewer] Appending renderer to container..."),this.container.appendChild(this.renderer.domElement),console.log("[SimpleMine3DViewer] Renderer appended successfully"),console.log("[SimpleMine3DViewer] Adding lights..."),this.addLights(),this.options.enableWebGL2)try{console.log("🚀 Initializing WebGL2 Enhanced Renderer..."),this.webgl2Renderer=new qm(this.container,{debug:this.options.debugPerformance,...this.options}),this.webgl2Renderer.isWebGL2Supported?(this.container.removeChild(this.renderer.domElement),this.renderer.dispose(),this.renderer=this.webgl2Renderer.renderer,console.log("✅ WebGL2 Enhanced Renderer activated")):console.log("⚠️ WebGL2 not supported, using standard renderer")}catch(l){console.warn("⚠️ WebGL2 Enhanced Renderer failed to initialize:",l)}if(this.options.enableCollisionDetection)try{console.log("🔍 Initializing Collision Detection System..."),this.collisionSystem=new $m(this.scene,{debug:this.options.debugCollisions,enableSpatialPartitioning:!0,gridSize:10,debugVisualization:this.options.debugCollisions}),console.log("✅ Collision Detection System activated")}catch(l){console.warn("⚠️ Collision Detection System failed to initialize:",l)}if(this.options.enableAdvancedShaders&&this.renderer)try{if(console.log("🎨 Initializing Advanced Shader Manager..."),this.shaderManager=new Zm(this.renderer),(e=this.webgl2Renderer)!=null&&e.isWebGL2Supported){const l=this.webgl2Renderer.createAdvancedLighting(this.scene);console.log("✨ Enhanced WebGL2 lighting activated")}console.log("✅ Advanced Shader Manager activated")}catch(l){console.warn("⚠️ Advanced Shader Manager failed to initialize:",l)}if(this.options.debugPerformance||this.options.enablePerformanceMonitoring)try{console.log("📊 Initializing Performance Monitor..."),this.performanceMonitor=new Km({enableGPUTiming:((t=this.webgl2Renderer)==null?void 0:t.isWebGL2Supported)||!1,enableMemoryMonitoring:!0,alertThresholds:{fps:20,memoryMB:300,drawCalls:800}}),this.performanceMonitor.onAlert((l,h)=>{h.forEach(c=>{console.warn(`📊 Performance Alert [${c.type}]:`,c.message),c.severity==="critical"&&this.showError(`Performance issue: ${c.message}`)})}),this.performanceMonitor.startMonitoring(this.renderer),console.log("✅ Performance Monitor activated")}catch(l){console.warn("⚠️ Performance Monitor failed to initialize:",l)}console.log("[SimpleMine3DViewer] Adding test geometry..."),this.addTestGeometry(),console.log("[SimpleMine3DViewer] Setting up controls..."),this.controls=new Bm(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.enableZoom=!0,this.controls.enablePan=!0,this.controls.enableRotate=!0,this.controls.rotateSpeed=4,this.controls.zoomSpeed=5,this.controls.panSpeed=4.5,this.controls.minDistance=1,this.controls.maxDistance=1e3,this.controls.zoomToCursor=!0,this.controls.maxPolarAngle=Math.PI*.9,this.controls.minPolarAngle=Math.PI*.1,this.controls.maxAzimuthAngle=1/0,this.controls.minAzimuthAngle=-1/0,this.controls.autoRotate=!1,this.controls.autoRotateSpeed=1,this.controls.enableKeys=!0,this.controls.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.controls.mouseButtons={LEFT:un.ROTATE,MIDDLE:un.DOLLY,RIGHT:un.PAN},this.controls.touches={ONE:Tn.ROTATE,TWO:Tn.DOLLY_PAN},this.controls.target.set(0,-3,0),this.controls.update(),console.log("[SimpleMine3DViewer] OrbitControls initialized with enhanced settings:",this.controls),console.log("[SimpleMine3DViewer] Initializing path drawer..."),this.pathDrawer=new Qm(this.scene,this.camera,this.renderer),this.setupPathDrawingEvents(),this.pathEditor=new eg(this.scene,this.camera,this.renderer,this.pathDrawer),this.pathEditor.setCallbacks({onPointChange:(l,h)=>{var c,d;if(this.markPathDirty(h.id||h.pathId),this.selectedObject&&(((c=this.selectedObject.userData.objectData)==null?void 0:c.id)===h.id||((d=this.selectedObject.userData.objectData)==null?void 0:d.pathId)===h.id)){const u=this.selectedObject.userData.objectData;u&&(u.points=l,u.path_points=l,u.length=this.pathDrawer.calculatePathLength(l),this.populateSelectionCard(this.selectedObject,u))}}}),console.log("[SimpleMine3DViewer] Initializing object creator..."),this.objectCreator=new Jm(this.scene,this.camera,this.renderer,this),console.log("[SimpleMine3DViewer] Initializing transform controls..."),this.transformControls=new km(this.camera,this.renderer.domElement),this.transformControls.addEventListener("change",()=>this.renderer.render(this.scene,this.camera)),this.transformControls.addEventListener("dragging-changed",l=>{this.controls.enabled=!l.value}),this.scene.add(this.transformControls),setTimeout(()=>{this.setupMiningControls()},100),console.log("[SimpleMine3DViewer] Initializing object selector..."),this.objectSelector=new ig(this.scene,this.camera,this.renderer),this.setupObjectSelection(),this.ensureUndoRedoUI(),this.renderer.domElement.addEventListener("pointerdown",l=>{this.pathEditor&&this.pathEditor.isEditing&&this.pathEditor.pointerDown(l)}),this.renderer.domElement.addEventListener("pointermove",l=>{this.pathEditor&&this.pathEditor.isEditing&&this.pathEditor.pointerMove(l)}),this.renderer.domElement.addEventListener("pointerup",l=>{this.pathEditor&&this.pathEditor.isEditing&&this.pathEditor.pointerUp(l)}),console.log("[SimpleMine3DViewer] Loading mine data..."),await this.loadMineData(),console.log("[SimpleMine3DViewer] Starting render loop..."),this.animate(),console.log("%c[SimpleMine3DViewer] Initialization completed successfully!","color: green; font-weight: bold; font-size: 14px;"),setTimeout(()=>{this.updateAllTunnelExtensionPoints(),console.log("[ExtensionSystem] Tunnel extension points initialized")},200);const a=document.getElementById("loading-container");a&&a.style.display!=="none"&&(console.log("[SimpleMine3DViewer] Forcing loading container hide at end"),a.remove())}catch(n){throw console.error("%c[SimpleMine3DViewer] Initialization failed:","color: red; font-weight: bold;",{message:n.message,stack:n.stack,name:n.name}),n}}addLights(){console.log("[SimpleMine3DViewer] Adding shadowless lights to scene...");const e=new jl(4210752,.6);this.scene.add(e),console.log("[SimpleMine3DViewer] Ambient light added:",e);const t=new Xl(16777215,.9);t.position.set(50,50,50),t.castShadow=!1,this.scene.add(t),console.log("[SimpleMine3DViewer] Directional light added (shadowless):",t);const n=new Im(8900331,9127187,.5);n.position.set(0,20,0),this.scene.add(n),console.log("[SimpleMine3DViewer] Hemisphere light added:",n),[{pos:[10,2,10],color:16768324,intensity:.4},{pos:[-10,2,10],color:16768324,intensity:.4},{pos:[10,2,-10],color:16768324,intensity:.4},{pos:[-10,2,-10],color:16768324,intensity:.4}].forEach((s,o)=>{const a=new oo(s.color,s.intensity,25);a.position.set(...s.pos),a.castShadow=!1,this.scene.add(a)}),console.log("[SimpleMine3DViewer] Mining lights added successfully")}setupMiningControls(){console.log("[SimpleMine3DViewer] Setting up mining controls...");const e=document.querySelectorAll(".mining-tool-btn");console.log("[SimpleMine3DViewer] Found tool buttons:",e.length,e),e.forEach(h=>{const c=h.getAttribute("data-tool");console.log("[SimpleMine3DViewer] Setting up button for tool:",c),h.addEventListener("click",d=>{d.preventDefault(),console.log(`🛠️ Mining tool butonuna tıklandı: ${c}`),this.startMiningTool(c)})});const t=document.getElementById("axis-x-btn"),n=document.getElementById("axis-y-btn"),i=document.getElementById("axis-z-btn"),s=document.getElementById("free-draw-btn");t&&t.addEventListener("click",()=>this.setDrawingConstraint("x")),n&&n.addEventListener("click",()=>this.setDrawingConstraint("y")),i&&i.addEventListener("click",()=>this.setDrawingConstraint("z")),s&&s.addEventListener("click",()=>this.setDrawingConstraint("free"));const o=document.getElementById("reset-camera-btn"),a=document.getElementById("toggle-grid-btn");o&&o.addEventListener("click",()=>{this.camera.position.set(15,5,25),this.camera.lookAt(0,-2,0),this.controls.target.set(0,-3,0),this.controls.update()}),a&&a.addEventListener("click",()=>{const h=this.scene.getObjectByName("grid_helper");h&&(h.visible=!h.visible)});const l=document.getElementById("toggle-extension-btn");l?l.addEventListener("click",()=>{this.toggleExtensionPointsVisibility();const h=this.showExtensionPoints?"Uzatma Noktalarını Gizle":"Uzatma Noktalarını Göster";l.textContent=h}):this.createExtensionToggleButton(),console.log("[SimpleMine3DViewer] Mining controls setup completed")}createExtensionToggleButton(){const e=document.querySelector(".view-controls")||document.querySelector("#view-controls")||document.querySelector('[data-section="view"]');if(e){const t=document.createElement("button");t.id="toggle-extension-btn",t.className="btn btn-outline-info btn-sm",t.textContent="Uzatma Noktalarını Gizle",t.style.marginLeft="5px",t.addEventListener("click",()=>{this.toggleExtensionPointsVisibility();const n=this.showExtensionPoints?"Uzatma Noktalarını Gizle":"Uzatma Noktalarını Göster";t.textContent=n}),e.appendChild(t),console.log("[ExtensionSystem] Extension toggle button created dynamically")}}startMiningTool(e){console.log("🚀 [SimpleMine3DViewer] Starting mining tool:",e),this.isPathDrawingMode&&(console.log("🛑 Mevcut çizim modu durduruluyor..."),this.stopPathDrawing()),this.isCreatingMode&&(console.log("� Mevcut oluşturma modu durduruluyor..."),this.stopCreating()),console.log("🔧 Object creation mode başlatılıyor:",e),this.isCreatingMode=!0,this.controls.enabled=!1,this.objectCreator.startCreating(e),console.log("� Button states güncelleniyor..."),this.updateToolButtonStates(e),console.log("🎉 Mining tool başlatma işlemi tamamlandı:",e)}stopCreating(){this.isCreatingMode&&(this.isCreatingMode=!1,this.controls.enabled=!0,this.objectCreator.stopCreating(),this.deselectObject(),this.updateToolButtonStates(null),console.log("[SimpleMine3DViewer] Creating mode stopped"))}updateToolIndicator(e){const t=document.getElementById("tool-indicator"),n=document.getElementById("tool-name");if(t&&n){const s={tunnel:{icon:"fas fa-mountain",name:"Tünel Kazma"},road:{icon:"fas fa-road",name:"Yol İnşaası"},rail:{icon:"fas fa-train",name:"Ray Döşeme"},conveyor:{icon:"fas fa-conveyor-belt",name:"Konveyör Kurma"}}[e]||{icon:"fas fa-tools",name:"Bilinmeyen Araç"};t.querySelector("i").className=s.icon+" me-2",n.textContent=s.name,t.style.display="block"}}updateToolButtonStates(e){document.querySelectorAll(".mining-tool-btn").forEach(n=>{const i=n.getAttribute("data-tool");n.classList.remove("btn-warning","btn-info","btn-success","btn-danger","btn-outline-warning","btn-outline-info","btn-outline-success","btn-outline-danger"),i===e?n.classList.add(`btn-${this.getToolColor(i)}`):n.classList.add(`btn-outline-${this.getToolColor(i)}`)}),console.log("[SimpleMine3DViewer] Tool button states updated, active tool:",e)}getToolColor(e){return{tunnel:"warning",road:"info",rail:"success",conveyor:"danger"}[e]||"secondary"}setDrawingConstraint(e){console.log("[SimpleMine3DViewer] Setting drawing constraint to:",e),this.activeConstraint=e,document.querySelectorAll("#axis-x-btn, #axis-y-btn, #axis-z-btn, #free-draw-btn").forEach(i=>{i.classList.remove("btn-light","btn-outline-light"),i.classList.add("btn-outline-light")});let n=null;switch(e){case"x":n=document.getElementById("axis-x-btn");break;case"y":n=document.getElementById("axis-y-btn");break;case"z":n=document.getElementById("axis-z-btn");break;case"free":n=document.getElementById("free-draw-btn");break}n&&(n.classList.remove("btn-outline-light"),n.classList.add("btn-light")),this.pathDrawer&&this.pathDrawer.setAxisConstraint(e),console.log("[SimpleMine3DViewer] Constraint set to:",e)}addTestGeometry(){console.log("[SimpleMine3DViewer] Adding test geometry...");try{console.log("[SimpleMine3DViewer] Creating infinite ground plane...");const e=2e4,t=new Di(e,e,50,50),n=new qs({color:5668166,transparent:!1}),i=new te(t,n);i.rotation.x=-Math.PI/2,i.position.y=-5,i.receiveShadow=!0,i.name="ground_plane",this.scene.add(i),console.log("[SimpleMine3DViewer] Infinite ground plane added:",i);const s=new Nm(e,100,8947848,4473924);s.position.y=-4.9,s.material.opacity=.3,s.material.transparent=!0,this.scene.add(s);const o=new Di(e,e),a=new qs({color:9127187,transparent:!0,opacity:.8}),l=new te(o,a);l.rotation.x=-Math.PI/2,l.position.y=-10,l.receiveShadow=!0,l.name="underground_layer",this.scene.add(l),console.log("[SimpleMine3DViewer] Test geometry added successfully"),console.log("[SimpleMine3DViewer] Scene children count:",this.scene.children.length),setTimeout(()=>{this.updateAllTunnelEndpoints()},500)}catch(e){throw console.error("[SimpleMine3DViewer] Error adding test geometry:",e),e}}async loadMineData(){console.log("[SimpleMine3DViewer] Loading mine data for mine ID:",this.mineId);try{const e=`/api/mines/${this.mineId}/scene-data`;console.log("[SimpleMine3DViewer] Fetching from URL:",e);const t=await fetch(e);if(console.log("[SimpleMine3DViewer] Fetch response:",{ok:t.ok,status:t.status,statusText:t.statusText,headers:Object.fromEntries(t.headers.entries())}),!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);const n=await t.json();console.log("[SimpleMine3DViewer] Mine data loaded successfully:",n),Array.isArray(n.models)&&(console.log("[SimpleMine3DViewer] Processing",n.models.length,"models"),n.models.forEach(i=>{var s,o,a,l,h;try{if(!i.geometry||!i.geometry.type)return;const c=i.geometry;if(c.type==="tunnel"){const d={width:c.width||((s=c.params)==null?void 0:s.width)||3,height:c.height||((o=c.params)==null?void 0:o.height)||3,length:c.length||((a=c.params)==null?void 0:a.length)||10},u=Math.max(d.width,d.height)/2,p=new Ye(u,u,d.length,24,1,!1);p.rotateX(Math.PI/2);const g=((l=i.material)==null?void 0:l.color)!=null?typeof i.material.color=="number"?i.material.color:parseInt(i.material.color):8421504,y=((h=i.material)==null?void 0:h.opacity)??1,m=new wt({color:g,opacity:y,transparent:y<1}),f=new te(p,m);Array.isArray(i.position)&&i.position.length===3&&f.position.set(i.position[0],i.position[1],i.position[2]),Array.isArray(i.rotation)&&i.rotation.length===3&&f.rotation.set(i.rotation[0],i.rotation[1],i.rotation[2]),Array.isArray(i.scale)&&i.scale.length===3&&f.scale.set(i.scale[0],i.scale[1],i.scale[2]),f.userData={selectable:!0,serverId:i.id,type:"tunnel",objectData:{id:i.id,type:"tunnel",name:i.name,parameters:{...d},width:d.width,height:d.height,length:d.length,color:`#${g.toString(16).padStart(6,"0")}`}},this.scene.add(f),this.objectSelector&&this.objectSelector.addSelectableObject(f,f.userData.objectData)}}catch(c){console.warn("[SimpleMine3DViewer] Model load error for id",i.id,c)}})),Array.isArray(n.layers)&&console.log("[SimpleMine3DViewer] Processing",n.layers.length,"layers"),Array.isArray(n.paths)&&(console.log("[SimpleMine3DViewer] Processing",n.paths.length,"paths"),this.loadPaths(n.paths)),setTimeout(()=>{this.updateAllTunnelEndpoints()},1e3)}catch(e){console.warn("[SimpleMine3DViewer] Could not load mine data:",{message:e.message,stack:e.stack}),console.log("[SimpleMine3DViewer] Continuing with test geometry only")}}loadPaths(e){console.log("[SimpleMine3DViewer] Loading paths:",e),e.forEach(t=>{if(t.path_points&&t.path_points.length>1){const n=t.path_points.map(s=>new b(s.x,s.y,s.z)),i=this.pathDrawer.createPath({id:t.id,points:n,width:t.width||3,height:t.height||3,color:t.color||"#808080",type:t.type||"tunnel"});i&&this.objectSelector&&this.objectSelector.addSelectableObject(i,{id:t.id,type:"path",name:t.name,pathType:t.type,width:t.width,height:t.height,color:t.color,material:t.material,points:t.path_points,length:this.pathDrawer.calculatePathLength(t.path_points)})}})}animate(){const e=performance.now(),t=e*.001;requestAnimationFrame(()=>this.animate());try{if(this.controls&&this.controls.update(),this.collisionSystem&&this.collisionSystem.update(),this.shaderManager&&this.shaderManager.updateShaderUniforms(t,this.camera),this.performanceMonitor&&this.performanceMonitor.update(),this.pathDrawer&&this.pathDrawer.updateLOD(),this._measurementGroup&&this.camera){const s=this.camera.quaternion;this._measurementGroup.traverse(o=>{o.isSprite&&o.quaternion.copy(s)})}this.webgl2Renderer?this.webgl2Renderer.render(this.scene,this.camera):this.renderer&&this.scene&&this.camera?this.renderer.render(this.scene,this.camera):console.error("[SimpleMine3DViewer] Missing components for rendering:",{renderer:!!this.renderer,scene:!!this.scene,camera:!!this.camera})}catch(s){console.error("[SimpleMine3DViewer] Render error:",s)}const i=performance.now()-e;this.frameCount||(this.frameCount=0),this.frameCount++,this.frameCount%60===0&&console.log(`[SimpleMine3DViewer] Performance - Frame ${this.frameCount}, Frame time: ${i.toFixed(2)}ms`)}destroy(){this.renderer&&(this.container.removeChild(this.renderer.domElement),this.renderer.dispose())}setupPathDrawingEvents(){const e=this.renderer.domElement;this.boundHandlers={click:t=>this.handleCanvasClick(t),mousemove:t=>this.handleCanvasMouseMove(t),keydown:t=>this.handleKeyDown(t)},e.addEventListener("click",this.boundHandlers.click),e.addEventListener("mousemove",this.boundHandlers.mousemove),document.addEventListener("keydown",this.boundHandlers.keydown)}handleCanvasClick(e){e.preventDefault(),e.stopPropagation(),!this.checkExtensionPointClick(e)&&(this.isPathDrawingMode?this.pathDrawer.handleClick(e):this.isCreatingMode?this.updateCreationPosition(e):(this.objectSelector?this.objectSelector.handleClick(e):this.handleObjectSelection(e),!this.selectedObject&&this.objectCreator&&this.objectCreator.previewObject&&this.objectCreator.removePreview()))}checkExtensionPointClick(e){const t=this.renderer.domElement.getBoundingClientRect(),n=new ae;n.x=(e.clientX-t.left)/t.width*2-1,n.y=-((e.clientY-t.top)/t.height)*2+1;const i=new Un;i.setFromCamera(n,this.camera);const s=[];if(this.tunnelExtensionPoints)for(const[a,l]of this.tunnelExtensionPoints)s.push(...l.allPoints);if(s.length===0)return!1;const o=i.intersectObjects(s);if(o.length>0){const a=o[0].object;if(a.userData.isExtensionPoint)return this.handleExtensionPointClick(a,e),!0}return!1}updateCreationPosition(e){const t=this.renderer.domElement.getBoundingClientRect(),n=new ae;n.x=(e.clientX-t.left)/t.width*2-1,n.y=-((e.clientY-t.top)/t.height)*2+1;const i=new Un;i.setFromCamera(n,this.camera);const s=new Vt(new b(0,1,0),-2),o=new b;i.ray.intersectPlane(s,o)&&(this.objectCreator.currentPosition.copy(o),this.objectCreator.createPreview(),console.log("[SimpleMine3DViewer] Updated creation position:",o))}handleObjectSelection(e){const t=this.renderer.domElement.getBoundingClientRect(),n=new ae;n.x=(e.clientX-t.left)/t.width*2-1,n.y=-((e.clientY-t.top)/t.height)*2+1;const i=new Un;i.setFromCamera(n,this.camera);const s=[];this.scene.traverse(a=>{a.userData&&a.userData.selectable&&a.isMesh&&s.push(a)});const o=i.intersectObjects(s);if(o.length>0){const a=o[0].object;this.selectObject(a)}else this.deselectObject()}selectObject(e){this.selectedObject&&this.deselectObject(),this.selectedObject=e,this.transformControls.attach(e),this.addHighlight(e)}deselectObject(){this.selectedObject&&(this.transformControls.detach(),this.removeHighlight(this.selectedObject),this.selectedObject=null,console.log("[SimpleMine3DViewer] Object deselected")),this.objectCreator&&this.objectCreator.removePreview()}addHighlight(e){e.userData.originalMaterial||(e.userData.originalMaterial=e.material,e.material=e.material.clone(),e.material.emissive.setHex(4473924))}removeHighlight(e){e.userData.originalMaterial&&(e.material.dispose(),e.material=e.userData.originalMaterial,delete e.userData.originalMaterial)}markPathDirty(e){e&&(clearTimeout(this._pathSaveTimer),this.setPathDirtyVisual(!0),this._dirtyPaths.add(e),this._pathSaveTimer=setTimeout(async()=>{const t=this.pathDrawer.getPath(e);if(!t)return;const n=t.userData.pathData||{};try{await this.updatePathToServer(e,{points:n.points||n.path_points}),this._dirtyPaths.delete(e),this._dirtyPaths.size===0&&this.setPathDirtyVisual(!1)}catch{}},600))}setPathDirtyVisual(e){this._dirtyIndicatorEl||(this._dirtyIndicatorEl=document.getElementById("save-path-btn")),this._dirtyIndicatorEl&&(e?this._dirtyIndicatorEl.classList.add("dirty"):this._dirtyIndicatorEl.classList.remove("dirty"))}handleCanvasMouseMove(e){this.isPathDrawingMode&&this.pathDrawer.handleMouseMove(e)}handleKeyDown(e){console.log("[SimpleMine3DViewer] Key pressed:",e.key),e.key==="Escape"?(e.preventDefault(),this.isPathDrawingMode?(this.pathDrawer.stopDrawing(),this.stopPathDrawing()):this.isCreatingMode?this.stopCreating():this.selectedObject&&this.deselectObject()):e.key==="Enter"&&this.isPathDrawingMode?(e.preventDefault(),this.completeCurrentPath()):e.key==="Delete"||e.key==="Backspace"?(e.preventDefault(),this.selectedObject?this.deleteSelectedObject():console.log("[SimpleMine3DViewer] No object selected for deletion")):e.key==="g"||e.key==="G"?(e.preventDefault(),this.selectedObject&&this.transformControls.object&&this.cycleTransformMode()):(e.metaKey||e.ctrlKey)&&(e.key==="z"||e.key==="Z")?(e.preventDefault(),this.pathEditor&&this.pathEditor.isEditing&&this.pathEditor.undo()):(e.metaKey||e.ctrlKey)&&e.shiftKey&&(e.key==="z"||e.key==="Z")?(e.preventDefault(),this.pathEditor&&this.pathEditor.isEditing&&this.pathEditor.redo()):e.key==="m"||e.key==="M"?(e.preventDefault(),this.toggleMeasurements()):e.key==="e"||e.key==="E"?(e.preventDefault(),this.updateAllTunnelEndpoints(),console.log("[SimpleMine3DViewer] Endpoint update triggered by E key")):(e.key==="h"||e.key==="H")&&(e.preventDefault(),this.objectSelector&&this.objectSelector.selectedObject?(console.log("[SimpleMine3DViewer] Opening material editor for object:",{type:this.objectSelector.selectedObject.type,isGroup:this.objectSelector.selectedObject.isGroup,hasMaterial:!!this.objectSelector.selectedObject.material,userData:this.objectSelector.selectedObject.userData}),this.objectSelector.showMaterialEditor(),console.log("[SimpleMine3DViewer] Material editor opened for selected object")):console.log("[SimpleMine3DViewer] No object selected for material editing"))}toggleMeasurements(e=null){const t=e===null?!this.measurementsEnabled:!!e;if(t!==this.measurementsEnabled){if(this.measurementsEnabled=t,!t)this._measurementGroup&&(this._measurementGroup.traverse(n=>{n.geometry&&n.geometry.dispose(),n.material&&n.material.dispose()}),this.scene.remove(this._measurementGroup),this._measurementGroup=null);else if(this._lastMeasuredTunnel){const{object:n,data:i}=this._lastMeasuredTunnel;this.buildTunnelMeasurements(n,i)}console.log("[SimpleMine3DViewer] Measurements toggled ->",this.measurementsEnabled)}}cycleTransformMode(){const e=this.transformControls.getMode(),t=["translate","rotate","scale"],n=t.indexOf(e),i=t[(n+1)%t.length];this.transformControls.setMode(i),console.log("[SimpleMine3DViewer] Transform mode changed to:",i)}async saveObjectToServer(e){var t,n;try{const i={mine_id:this.mineId,name:`${e.userData.type.charAt(0).toUpperCase()+e.userData.type.slice(1)} ${e.userData.id}`,type:e.userData.type,geometry:{type:e.userData.type,...e.userData.parameters},material:{color:e.material.color.getHex(),opacity:e.material.opacity||1},position:[e.position.x,e.position.y,e.position.z],rotation:[e.rotation.x,e.rotation.y,e.rotation.z],scale:[e.scale.x,e.scale.y,e.scale.z],properties:{createdAt:new Date().toISOString(),tool:e.userData.type},visible:!0,order:e.userData.id},s=await fetch(`/api/mines/${this.mineId}/models`,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":((t=document.querySelector('meta[name="csrf-token"]'))==null?void 0:t.getAttribute("content"))||"",Accept:"application/json"},body:JSON.stringify(i)});if(s.ok){const o=await s.json();e.userData.serverId=(n=o.data)==null?void 0:n.id,console.log("[SimpleMine3DViewer] Successfully saved object to server:",o),this.showSuccess("Obje başarıyla kaydedildi!"),this.deselectObject(),this.forceExitCreationMode(),console.log("[SimpleMine3DViewer] Obje kaydedildi ve düzenleme modu kapatıldı")}else throw new Error(`HTTP ${s.status}: ${s.statusText}`)}catch(i){console.error("[SimpleMine3DViewer] Error saving object to server:",i),this.showError("Obje kaydedilemedi: "+i.message)}}forceExitCreationMode(){var t,n;if(this.objectCreator){this.objectCreator.isCreating=!1;try{(n=(t=this.objectCreator).hideCreationUI)==null||n.call(t)}catch{}try{this.objectCreator.removePreview()}catch{}}this.isCreatingMode=!1,this.isPathDrawingMode=!1,this.transformControls&&this.transformControls.detach(),this.selectedObject&&(this.removeHighlight(this.selectedObject),this.selectedObject=null),this.controls&&(this.controls.enabled=!0);const e=document.getElementById("creation-panel");e&&(e.style.display="none"),this.showPathDrawingUI(!1),this.updateToolButtonStates(null),console.log("[SimpleMine3DViewer] Force exited all creation/editing modes")}showSuccess(e){const t=document.createElement("div");t.style.cssText=`
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #44aa44;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
        `,t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&document.body.removeChild(t)},3e3)}showError(e){const t=document.createElement("div");t.style.cssText=`
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff4444;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
        `,t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&document.body.removeChild(t)},3e3)}deleteSelectedObject(){if(this.selectedObject){const e=this.selectedObject;this.transformControls.detach(),this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose(),this.objectCreator.createdObjects.has(e.userData.id)&&this.objectCreator.createdObjects.delete(e.userData.id),this.selectedObject=null,console.log("[SimpleMine3DViewer] Object deleted:",e.userData),e.userData.serverId&&this.deleteFromServer(e.userData.serverId)}}async deleteFromServer(e){var t;try{const n=await fetch(`/api/mines/${this.mineId}/models/${e}`,{method:"DELETE",headers:{"X-CSRF-TOKEN":((t=document.querySelector('meta[name="csrf-token"]'))==null?void 0:t.getAttribute("content"))||"",Accept:"application/json"}});if(n.ok)console.log("[SimpleMine3DViewer] Successfully deleted from server"),this.showSuccess("Obje başarıyla silindi!");else throw new Error(`HTTP ${n.status}: ${n.statusText}`)}catch(n){console.error("[SimpleMine3DViewer] Error deleting from server:",n),this.showError("Obje silinemedi: "+n.message)}}setupObjectSelection(){this.objectSelector.setCallbacks({onObjectSelect:(e,t)=>this.onObjectSelected(e,t),onObjectDeselect:e=>this.onObjectDeselected(e),onObjectDelete:e=>this.onObjectDelete(e)})}onObjectSelected(e,t){const n=t||e&&e.userData&&e.userData.objectData||e.userData||{};if(console.log("[SimpleMine3DViewer] Object selected:",n),this.selectedObject=e,this.showSelectionCard(e,n),n&&(n.pathType||n.type==="path")&&this.pathEditor){const i=e.parent&&e.parent.userData&&e.parent.userData.pathData?e.parent:e;this.pathEditor.startEditing(i)}n&&n.type==="tunnel"&&this.buildTunnelMeasurements(e,n)}onObjectDeselected(e){console.log("[SimpleMine3DViewer] Object deselected"),this._measurementGroup&&(this._measurementGroup.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}),this.scene.remove(this._measurementGroup),this._measurementGroup=null),this.selectedObject=null,this.hideSelectionCard(),this.pathEditor&&this.pathEditor.isEditing&&this.pathEditor.stopEditing()}async onObjectDelete(e){var n;console.log("[SimpleMine3DViewer] Deleting object:",e.userData.objectData);const t=e.userData.objectData;if(t&&t.id&&t.type==="path")try{const i=await fetch(`/api/mines/${this.mineId}/paths/${t.id}`,{method:"DELETE",headers:{"X-CSRF-TOKEN":((n=document.querySelector('meta[name="csrf-token"]'))==null?void 0:n.getAttribute("content"))||"",Accept:"application/json"}});if(i.ok)this.pathDrawer.removePath(t.id),this.objectSelector.removeSelectableObject(e),console.log("[SimpleMine3DViewer] Path deleted successfully");else throw new Error(`HTTP ${i.status}: ${i.statusText}`)}catch(i){console.error("[SimpleMine3DViewer] Error deleting path:",i),this.showError("Yol silinemedi: "+i.message)}}startPathDrawing(){this.isPathDrawingMode=!0,this.controls.enabled=!1,this.pathDrawer.startDrawing({onPathStart:()=>console.log("[SimpleMine3DViewer] Yol çizimi başladı"),onPathUpdate:e=>console.log("[SimpleMine3DViewer] Yol güncellendi, nokta sayısı:",e.length),onPathComplete:e=>this.onPathDrawingComplete(e)}),this.showPathDrawingUI(!0),console.log("[SimpleMine3DViewer] Yol çizim modu aktif")}stopPathDrawing(){this.isPathDrawingMode=!1,this.controls.enabled=!0,this.pathDrawer.stopDrawing(),this.showPathDrawingUI(!1),console.log("[SimpleMine3DViewer] Yol çizim modu pasif")}completeCurrentPath(){if(this.isPathDrawingMode){console.log("[SimpleMine3DViewer] Manual path completion");const e=this.pathDrawer.completePath();e&&e.length>1&&(this.onPathDrawingComplete(e),this.stopPathDrawing())}}onPathDrawingComplete(e){console.log("[SimpleMine3DViewer] Yol çizimi tamamlandı:",e),this.savePathToServer(e).then(t=>{if(t){const n=this.pathDrawer.createPath({id:t.id,points:e,width:t.width||2.5,height:t.height||2.5,color:t.color||"#808080",type:t.type||"tunnel"});n&&this.objectSelector&&this.objectSelector.addSelectableObject(n,{id:t.id,type:"path",name:t.name,pathType:t.type,width:t.width,height:t.height,color:t.color,material:t.material,points:e.map(i=>({x:i.x,y:i.y,z:i.z})),length:this.pathDrawer.calculatePathLength(e.map(i=>({x:i.x,y:i.y,z:i.z})))}),this.deselectObject(),this.forceExitCreationMode(),console.log("[SimpleMine3DViewer] Yol kaydedildi ve düzenleme modu kapatıldı")}}).catch(t=>{console.error("[SimpleMine3DViewer] Yol kaydetme hatası:",t),this.showError("Yol kaydedilemedi: "+t.message)})}async savePathToServer(e){var t;try{const n={mine_id:this.mineId,name:`Yol ${Date.now()}`,type:"tunnel",path_points:e.map(a=>({x:a.x,y:a.y,z:a.z})),width:2.5,height:2.5,color:"#808080",status:"active"},i=await fetch(`/api/mines/${this.mineId}/paths`,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":((t=document.querySelector('meta[name="csrf-token"]'))==null?void 0:t.getAttribute("content"))||"",Accept:"application/json"},body:JSON.stringify(n)});if(!i.ok){const a=await i.json().catch(()=>({}));throw new Error(a.message||`HTTP ${i.status}: ${i.statusText}`)}const s=await i.json(),o=s.data||s;return console.log("[SimpleMine3DViewer] Yol başarıyla kaydedildi:",o),o}catch(n){throw console.error("[SimpleMine3DViewer] Yol kaydetme hatası:",n),n}}async updatePathToServer(e,t){var n;try{const i={...t};i.points&&!i.path_points&&(i.path_points=i.points.map(l=>({x:l.x,y:l.y,z:l.z})),delete i.points);const s=await fetch(`/api/mines/${this.mineId}/paths/${e}`,{method:"PUT",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":((n=document.querySelector('meta[name="csrf-token"]'))==null?void 0:n.getAttribute("content"))||"",Accept:"application/json"},body:JSON.stringify(i)});if(!s.ok){const l=await s.json().catch(()=>({}));throw new Error(l.message||`HTTP ${s.status}: ${s.statusText}`)}const o=await s.json();console.log("[SimpleMine3DViewer] Yol güncellendi:",o.data||o),this.showSuccess("Yol güncellendi");const a=document.getElementById("save-path-btn");return a&&(a.classList.add("saved-once"),setTimeout(()=>a.classList.remove("saved-once"),400)),o.data||o}catch(i){throw console.error("[SimpleMine3DViewer] Yol güncelleme hatası:",i),this.showError("Yol güncellenemedi: "+i.message),i}}dispose(){if(console.log("[SimpleMine3DViewer] Disposing viewer"),window.removeEventListener("resize",this._resizeHandler),document.removeEventListener("keydown",this._keyHandler),this.renderer&&this.renderer.domElement){const e=this.renderer.domElement;e.removeEventListener("click",this._clickHandler),e.removeEventListener("mousemove",this._mouseMoveHandler)}this.scene&&this.scene.traverse(e=>{e.isMesh&&(e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()))}),this.renderer&&this.renderer.dispose(),this.scene=null,this.camera=null,this.renderer=null}buildTunnelMeasurements(e,t){if(!this.measurementsEnabled||!e||!e.geometry)return;this._measurementGroup&&(this._measurementGroup.traverse(v=>{v.geometry&&v.geometry.dispose(),v.material&&v.material.dispose()}),this.scene.remove(this._measurementGroup));const n=new Dn;n.name="tunnel_measurements",this._measurementGroup=n,this.scene.add(n),this._lastMeasuredTunnel={object:e,data:t};const i=t.parameters||{};i.orientation==="yatay"&&(i.orientation="horizontal"),i.orientation==="dikey"&&(i.orientation="vertical");let s=i.width||3,o=i.height||3,a=i.length||10,l=i.orientation||"horizontal";try{e.geometry.computeBoundingBox();const v=e.geometry.boundingBox,_=new b;v.getSize(_),l==="vertical"?(a=_.y,s=_.x,o=_.z):(a=_.z,s=_.x,o=_.y)}catch{}const h=l==="vertical"?"y":"z",c=e.position.clone(),d=new Jt({color:43775,transparent:!0,opacity:.85,depthTest:!1,depthWrite:!1}),u=new Jt({color:30668,transparent:!0,opacity:.45,depthTest:!1,depthWrite:!1}),p="#00aaff",g=(v,_,E)=>{const T=new rt().setFromPoints([v,_]);return new Ft(T,E)},y=Math.max(1,this.measurementStep||5);{const E=(0/a-.5)*a;let T;if(h==="z"){const x=c.y+o/2+.02;T=new b(c.x+s/2+.2,x,c.z+E)}else{const x=c.z-o/2-.02;T=new b(c.x+s/2+.2,c.y+E,x)}this._addSpriteLabel("0m",T,p,n)}for(let v=y;v<a+.001;v+=y){const E=(v/a-.5)*a;let T,x;if(h==="z"){const S=c.y+o/2+.02;T=new b(c.x-s/2,S,c.z+E),x=new b(c.x+s/2,S,c.z+E)}else{const S=c.z-o/2-.02;T=new b(c.x-s/2,c.y+E,S),x=new b(c.x+s/2,c.y+E,S)}const D=g(T,x,d);n.add(D),this._addSpriteLabel(`${v}m`,x.clone().add(new b(.2,.2,0)),p,n)}const m=.5,f=.5,M=0;for(let v=-s/2;v<=s/2+.001;v+=m){let _,E;if(h==="z"){const T=c.z+M;_=new b(c.x+v,c.y-o/2+.01,T),E=new b(c.x+v,c.y+o/2+.01,T)}else{const T=c.z-o/2;_=new b(c.x+v,c.y+M,T+.01),E=new b(c.x+v,c.y+M,c.z+o/2+.01)}n.add(g(_,E,u))}for(let v=-o/2;v<=o/2+.001;v+=f){let _,E;if(h==="z"){const T=c.z+M;_=new b(c.x-s/2,c.y+v,T+.01),E=new b(c.x+s/2,c.y+v,T+.01)}else{const T=c.z-o/2-.01;_=new b(c.x-s/2,c.y+M,T+v),E=new b(c.x+s/2,c.y+M,T+v)}n.add(g(_,E,u))}try{const v=h==="z"?"Z Ekseni":"Y Ekseni",_=h==="z"?new b(c.x+s/2+.6,c.y+o/2+.4,c.z):new b(c.x+s/2+.6,c.y,c.z-o/2-.6);this._addSpriteLabel(v,_,"#ffaa00",n)}catch{}}replaceTunnelGeometry(e,t){var s;if(!this.objectCreator)return;if(t.orientation==="yatay"&&(t.orientation="horizontal"),t.orientation==="dikey"&&(t.orientation="vertical"),t=this._sanitizeTunnelParams(t),!this._validateTunnelParams(t)){console.error("[SimpleMine3DViewer] replaceTunnelGeometry: invalid params after sanitize",t);return}const n=this.objectCreator.createGeometry("tunnel",t),i=(s=n.attributes)==null?void 0:s.position;if(i){let o=!1,a=-1,l;for(let h=0;h<i.count;h++){const c=i.getX(h),d=i.getY(h),u=i.getZ(h);if(!(Number.isFinite(c)&&Number.isFinite(d)&&Number.isFinite(u))){o=!0,a=h,l={x:c,y:d,z:u};break}}if(o){console.error("[SimpleMine3DViewer] Geometry creation produced invalid vertex, aborting apply",{params:t,firstBadIndex:a,firstBadVal:l}),n.dispose();return}}e.geometry&&e.geometry.dispose(),e.geometry=n,e.userData.parameters={...t},this.measurementsEnabled&&this.buildTunnelMeasurements(e,{type:"tunnel",parameters:t})}_validateTunnelParams(e){if(!e)return!1;const t=(n,i)=>typeof n=="number"&&!isNaN(n)&&isFinite(n)&&n>=i;return!(!t(e.width,.01)||!t(e.height,.01)||!t(e.length,.1))}_sanitizeTunnelParams(e){const t={...e};return t.width=Number(t.width),(!Number.isFinite(t.width)||t.width<=.01)&&(t.width=1),t.height=Number(t.height),(!Number.isFinite(t.height)||t.height<=.01)&&(t.height=t.width),t.length=Number(t.length),(!Number.isFinite(t.length)||t.length<=.1)&&(t.length=10),t.orientation||(t.orientation="horizontal"),!t.direction||typeof t.direction!="object"?t.direction={x:0,y:0,z:1}:(t.direction={x:Number(t.direction.x)||0,y:Number(t.direction.y)||0,z:Number(t.direction.z)||1},Math.abs(t.direction.x)+Math.abs(t.direction.y)+Math.abs(t.direction.z)===0&&(t.direction.z=1)),t.pitch=Number(t.pitch)||0,t.yaw=Number(t.yaw)||0,t.roll=Number(t.roll)||0,t}_addSpriteLabel(e,t,n,i){const s=document.createElement("canvas"),o=256;s.width=o,s.height=o;const a=s.getContext("2d");a.fillStyle="rgba(0,0,0,0.0)",a.fillRect(0,0,o,o),a.fillStyle=n||"#ffffff",a.font="48px Arial",a.textAlign="center",a.textBaseline="middle",a.fillText(e,o/2,o/2);const l=new vm(s);l.needsUpdate=!0;const h=new Bl({map:l,transparent:!0}),c=new gm(h);c.scale.set(1.5,1.5,1.5),c.position.copy(t),i.add(c)}showPathDrawingUI(e){console.log("[SimpleMine3DViewer] Path drawing UI:",e?"show":"hide");const t=document.getElementById("path-controls"),n=document.getElementById("draw-path-btn"),i=document.getElementById("path-btn-text");e?(t&&(t.style.display="block"),i&&(i.textContent="Çizimi Bitir"),n&&(n.classList.remove("btn-outline-warning"),n.classList.add("btn-warning"))):(t&&(t.style.display="none"),i&&(i.textContent="Yol Çiz"),n&&(n.classList.remove("btn-warning"),n.classList.add("btn-outline-warning")));const s=document.getElementById("path-drawing-overlay");if(e&&!s){const o=document.createElement("div");o.id="path-drawing-overlay",o.innerHTML=`
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                           background: rgba(0,0,0,0.8); color: white; padding: 20px; border-radius: 10px;
                           text-align: center; z-index: 1000;">
                    <h5>Yol Çizim Modu</h5>
                    <p>Yol noktalarını tıklayarak belirleyin</p>
                    <small>Enter: Tamamla | Escape: İptal</small>
                </div>
            `,this.container.appendChild(o)}else!e&&s&&s.remove()}showError(e){const t=document.getElementById("error-content");t?(t.textContent=e,new bootstrap.Modal(document.getElementById("errorModal")).show()):console.error(e)}getTypeDisplayName(e){return{tunnel:"Tünel",road:"Yol",rail:"Ray",conveyor:"Konveyör"}[e]||e}editSelectedObject(){if(this.selectedObject){const e=this.selectedObject.userData.objectData;console.log("[SimpleMine3DViewer] Editing object:",e),console.info("Düzenleme özelliği yakında gelecek!")}}deleteSelectedObject(){this.selectedObject&&confirm("Bu objeyi silmek istediğinizden emin misiniz?")&&this.objectSelector.deleteSelectedObject()}setCameraPreset(e){switch(e){case"overview":this.camera.position.set(25,15,35),this.controls.target.set(0,-2,0);break;case"side":this.camera.position.set(40,0,0),this.controls.target.set(0,-3,0);break;case"top":this.camera.position.set(0,30,0),this.controls.target.set(0,-3,0);break;case"underground":this.camera.position.set(10,-40,25),this.controls.target.set(0,-45,0);break;case"close":this.camera.position.set(8,2,12),this.controls.target.set(0,-1,0);break;default:this.camera.position.set(15,5,25),this.controls.target.set(0,-3,0)}this.controls.update()}setupTunnelMergeEvents(e,t){const n=document.getElementById("start-tunnel-merge"),i=document.getElementById("tunnel-merge-ui");document.getElementById("target-tunnel-select");const s=document.getElementById("execute-tunnel-merge"),o=document.getElementById("cancel-tunnel-merge");n&&(n.addEventListener("click",()=>{this.populateTargetTunnels(e,t),n.style.display="none",i.style.display="block"}),s&&s.addEventListener("click",()=>{this.executeTunnelMerge(e,t)}),o&&o.addEventListener("click",()=>{this.cancelTunnelMerge()}))}populateTargetTunnels(e,t){const n=document.getElementById("target-tunnel-select");if(!n)return;n.innerHTML='<option value="">Tünel seçin...</option>';const i=[];if(this.scene.traverse(s=>{s.userData&&s.userData.selectable&&s.userData.type==="tunnel"&&s!==e&&i.push({object:s,data:s.userData})}),this.pathDrawer&&this.pathDrawer.paths)for(const[s,o]of this.pathDrawer.paths){const a=o.userData.pathData;a&&a.type==="tunnel"&&o!==e&&i.push({object:o,data:a,isPath:!0})}i.forEach((s,o)=>{const a=s.data.name||`Tünel ${s.data.id||o+1}`,l=document.createElement("option");l.value=s.isPath?`path_${s.data.id}`:`tunnel_${s.data.id}`,l.textContent=a,l.dataset.tunnelType=s.isPath?"path":"tunnel",n.appendChild(l)}),console.log(`[TunnelMerge] Found ${i.length} target tunnels`)}executeTunnelMerge(e,t){var a,l,h;const n=(a=document.getElementById("current-tunnel-endpoint"))==null?void 0:a.value,i=(l=document.getElementById("target-tunnel-select"))==null?void 0:l.value,s=(h=document.getElementById("target-tunnel-endpoint"))==null?void 0:h.value;if(!n||!i||!s){this.showError("Lütfen tüm alanları doldurun!");return}const o=this.findTunnelById(i);if(!o){this.showError("Hedef tünel bulunamadı!");return}console.log("[TunnelMerge] Merging tunnels:",{current:{tunnel:e,endpoint:n,meta:t},target:{tunnel:o.object,endpoint:s,data:o.data}}),this.performTunnelMerge({tunnel:e,endpoint:n,meta:t},{tunnel:o.object,endpoint:s,data:o.data})}findTunnelById(e){const[t,n]=e.split("_");if(t==="path"&&this.pathDrawer&&this.pathDrawer.paths){const i=this.pathDrawer.paths.get(parseInt(n));if(i)return{object:i,data:i.userData.pathData,isPath:!0}}else if(t==="tunnel"){let i=null;return this.scene.traverse(s=>{s.userData&&s.userData.selectable&&s.userData.type==="tunnel"&&s.userData.id==n&&(i={object:s,data:s.userData,isPath:!1})}),i}return null}performTunnelMerge(e,t){try{console.log("[TunnelMerge] Starting merge operation:",{source:e,target:t});const n=this.calculateTunnelEndpoint(e.tunnel,e.endpoint,e.meta),i=this.calculateTunnelEndpoint(t.tunnel,t.endpoint,t.data);if(console.log("[TunnelMerge] Calculated endpoints:",{sourceEndpoint:n,targetEndpoint:i}),!n||!i){this.showError("Tünel uç noktaları hesaplanamadı!"),console.error("[TunnelMerge] Failed to calculate endpoints");return}const s=n.position.distanceTo(i.position);console.log("[TunnelMerge] Distance between endpoints:",s),this.visualizeMergeConnection(n,i),s<2?(console.log("[TunnelMerge] Endpoints are very close, creating simple connection"),this.createDirectConnection(n,i,e,t)):this.createTunnelConnection(n,i,e,t),this.showSuccess(`Tüneller başarıyla birleştirildi! (Mesafe: ${s.toFixed(2)}m)`),setTimeout(()=>{this.cancelTunnelMerge()},3e3)}catch(n){console.error("[TunnelMerge] Merge failed:",n),this.showError("Birleştirme işlemi başarısız: "+n.message)}}createDirectConnection(e,t,n,i){var a,l;if(((a=this.options)==null?void 0:a.mergeStrategy)==="extend-and-fuse"||((l=this.options)==null?void 0:l.mergeStrategy)===void 0){console.log("[TunnelMerge] Skipping direct path because extend-and-fuse mode active"),this.createTunnelConnection(e,t,n,i);return}const o=[e.position.clone(),t.position.clone()];this.createConnectionPath(o,n,i,"direct")}calculateTunnelEndpoint(e,t,n){let i,s;if(console.log("[TunnelEndpoint] Calculating for:",{endpoint:t,metadata:n,tunnel:e}),n.type==="path"||n.pathType==="tunnel"){const a=n.points||n.path_points||[];if(console.log("[TunnelEndpoint] Path points:",a),a.length<2)return console.warn("[TunnelEndpoint] Not enough points for path tunnel"),null;if(t==="A")i=new b(a[0].x,a[0].y,a[0].z),a.length>1?s=new b(a[1].x-a[0].x,a[1].y-a[0].y,a[1].z-a[0].z).normalize():s=new b(1,0,0);else{const l=a.length-1;i=new b(a[l].x,a[l].y,a[l].z),l>0?s=new b(a[l].x-a[l-1].x,a[l].y-a[l-1].y,a[l].z-a[l-1].z).normalize():s=new b(1,0,0)}if(s.lengthSq()<1e-6&&a.length>=3)if(t==="A"){const l=a[0];a[1];const h=a[2];s=new b(h.x-l.x,h.y-l.y,h.z-l.z).normalize()}else{const l=a.length,h=a[l-3],c=a[l-1];s=new b(c.x-h.x,c.y-h.y,c.z-h.z).normalize()}Math.abs(s.y)<.001&&(s.y=0),s.normalize()}else{const a=n.parameters||n,l=a.length||10,h=(a.orientation||"horizontal").toLowerCase(),c=new vn;c.setFromObject(e);const d=new b;c.getSize(d);let u=0;d.y>=d.x&&d.y>=d.z?u=1:d.z>=d.x&&d.z>=d.y&&(u=2);const p=e.rotation?e.rotation.clone():new Ri,g=new b(1,0,0).applyEuler(p).normalize(),y=new b(0,1,0).applyEuler(p).normalize(),m=new b(0,0,1).applyEuler(p).normalize(),f=[g,y,m];let M=f[u];h==="horizontal"&&u===0&&Math.abs(d.z-l)<Math.abs(d.x-l)&&(M=m),h==="horizontal"&&u===1&&(d.z>d.x?M=m:M=g),h==="vertical"&&(M=y);const v=[d.x,d.y,d.z][f.indexOf(M)]||l,_=v/2,E=new b;c.getCenter(E),t==="A"?(i=E.clone().add(M.clone().multiplyScalar(-_)),s=M.clone()):(i=E.clone().add(M.clone().multiplyScalar(_)),s=M.clone()),console.log("[TunnelEndpoint] Improved parametric endpoint:",{orientation:h,realLength:v,chosenAxis:M.toArray(),position:i.toArray()})}const o={position:i,direction:s,tunnel:e,metadata:n};return console.log("[TunnelEndpoint] Final calculated result:",o),o}visualizeMergeConnection(e,t){this.clearMergeVisualization();const n=this.generateCurvedConnection(e,t),i=new rt().setFromPoints(n),s=new Jt({color:65280,linewidth:4,transparent:!0,opacity:.8});this.mergeConnectionLine=new Ft(i,s),this.scene.add(this.mergeConnectionLine);const o=new Qn(.8,16,16),a=new Dt({color:16711680,transparent:!0,opacity:.9}),l=new Dt({color:255,transparent:!0,opacity:.9});this.mergeEndpoint1=new te(o,a),this.mergeEndpoint1.position.copy(e.position),this.scene.add(this.mergeEndpoint1),this.mergeEndpoint2=new te(o,l),this.mergeEndpoint2.position.copy(t.position),this.scene.add(this.mergeEndpoint2),this.animateEndpoints(),console.log("[TunnelMerge] Visualized curved connection with",n.length,"points")}createTunnelConnection(e,t,n,i){var l,h,c,d;const s=e.position.distanceTo(t.position);console.log("[TunnelConnection] Creating connection with distance:",s);const o=((l=this.options)==null?void 0:l.mergeStrategy)||"extend-gap-fill";if(console.log("[TunnelConnection] Strategy:",o),o==="extend-gap-fill")try{this.extendAndFillGap(e,t,n,i),this.clearMergeVisualization(),(h=this.updateAllTunnelEndpoints)==null||h.call(this),this.showSuccess("Tüneller uzatılarak boşluk dolduruldu"),this.persistMergeRecord("extend-gap-fill",e,t,n,i);return}catch(u){console.error("[TunnelConnection] extend-gap-fill failed, fallback curved:",u)}else if(o==="segment-blend")try{this.createSegmentBlend(e,t,n,i),this.clearMergeVisualization(),(c=this.updateAllTunnelEndpoints)==null||c.call(this),this.showSuccess("Parametrik blend segmentleri oluşturuldu"),this.persistMergeRecord("segment-blend",e,t,n,i);return}catch(u){console.error("[TunnelConnection] segment-blend failed, fallback curved:",u)}else if(o==="extend-and-fuse"||o==="fuse-single")try{this.fuseTunnels(e,t,n,i),this.clearMergeVisualization(),(d=this.updateAllTunnelEndpoints)==null||d.call(this),this.showSuccess("Tüneller tek bir tünelde birleştirildi"),this.persistMergeRecord("fuse",e,t,n,i);return}catch(u){console.error("[TunnelConnection] Fuse failed, fallback curved path:",u)}else console.log("[TunnelConnection] Using curved path strategy (no extend)");const a=this.generateCurvedConnection(e,t);this.createConnectionPath(a,n,i,"curved")}extendTunnelToPoint(e,t,n,i,s){if(!e||!t||!n)return;const o=t.parameters?{...t.parameters}:{...t};let a=n.direction?n.direction.clone():null;if(!a||a.lengthSq()===0?a=i.clone().sub(n.position).normalize():a.normalize(),a.lengthSq()===0)return;const l=o.length||t.length||10,h=n.position.distanceTo(i);if(h<.001)return;const c=l+h,d=a.clone().multiplyScalar(h/2*(s==="B"?1:-1));o.length=c;const u=(o.height||o.width||3)/2;if(typeof this.replaceTunnelGeometry=="function")this.replaceTunnelGeometry(e,o,{direction:a});else{e.geometry&&e.geometry.dispose();const y=new Ye(u,u,c,16,1,!1);y.rotateX(Math.PI/2),e.geometry=y}const p=new b(0,0,1),g=new Ke().setFromUnitVectors(p,a.clone().normalize());e.setRotationFromQuaternion(g),e.position.add(d),e.userData.parameters={...o},e.userData.objectData&&(e.userData.objectData.parameters={...o})}extendAndFillGap(e,t,n,i){var S,A,F,G;if(!(n!=null&&n.tunnel)||!(i!=null&&i.tunnel))throw new Error("Missing tunnels");const s=n.tunnel,o=i.tunnel,a=n.meta,l=i.data,h=e.position.clone(),c=t.position.clone(),d=c.clone().sub(h),u=d.length();if(u<.01)return;const p=h.clone().add(c).multiplyScalar(.5),g=d.clone().normalize(),y=u/2,m=[s,o].map(Z=>this.serializeTunnel(Z)),f=m.map(Z=>{var R,O,X;return{id:Z.id,connected:(((X=(O=(R=this.findSelectableById(Z.id))==null?void 0:R.userData)==null?void 0:O.objectData)==null?void 0:X.connectedTunnels)||[]).slice()}});this.extendTunnelHalfGapPrecise(s,a,e.endpoint,g,y),this.extendTunnelHalfGapPrecise(o,l,t.endpoint,g.clone().negate(),y);const M=this.calculateTunnelEndpoint(s,e.endpoint,a).position,v=this.calculateTunnelEndpoint(o,t.endpoint,l).position,_=p.clone().sub(M),E=p.clone().sub(v);_.length()<.2&&s.position.add(_.multiplyScalar(.5)),E.length()<.2&&o.position.add(E.multiplyScalar(.5));const T=Math.min(u*.15,1);let x=null;if(T>.02){const Z=((a.width||((S=a.parameters)==null?void 0:S.width)||3)+(l.width||((A=l.parameters)==null?void 0:A.width)||3))/2,R=((a.height||((F=a.parameters)==null?void 0:F.height)||3)+(l.height||((G=l.parameters)==null?void 0:G.height)||3))/2,O=Math.max(Z,R)/2*1.03,X=new Ye(O,O,T,24,1,!1);X.rotateX(Math.PI/2);const H=new wt({color:3355443,transparent:!0,opacity:.9});x=new te(X,H);const J=new b(0,0,1),Y=new Ke().setFromUnitVectors(J,g);x.setRotationFromQuaternion(Y),x.position.copy(p),x.userData={selectable:!1,helper:!0,type:"merge-sleeve"},this.scene.add(x)}this.addConnectionMeta(s,a,l),this.addConnectionMeta(o,l,a);const D=[s,o].map(Z=>this.serializeTunnel(Z));this.pushHistory({type:"extend-gap-fill",before:m,after:D,helperSleeve:x,metaBefore:f})}extendTunnelHalfGapPrecise(e,t,n,i,s){if(!e)return;const o=t.parameters||t,a=o.length||t.length||10,l=new b(0,0,1);l.clone().applyQuaternion(e.quaternion).normalize();const h=new Ke().setFromUnitVectors(l,i.clone());this.animateQuaternionSlerp(e,h,400);const c=s,d=a+c,u=n==="B"?1:-1,p=i.clone().multiplyScalar(u*c/2);if(o.length=d,typeof this.replaceTunnelGeometry=="function")this.replaceTunnelGeometry(e,o,{direction:i});else{e.geometry&&e.geometry.dispose();const g=(o.width||o.height||3)/2,y=new Ye(g,g,d,16,1,!1);y.rotateX(Math.PI/2),e.geometry=y}e.position.add(p),e.userData.parameters={...o},e.userData.objectData&&(e.userData.objectData.parameters={...o})}addConnectionMeta(e,t,n){var s;if(!((s=e==null?void 0:e.userData)!=null&&s.objectData))return;const i=e.userData.objectData;i.connectedTunnels||(i.connectedTunnels=[]),i.connectedTunnels.includes(n.id)||i.connectedTunnels.push(n.id)}createSegmentBlend(e,t,n,i){var A,F,G,Z;const s=n.tunnel,o=i.tunnel;if(!s||!o)throw new Error("Missing tunnels");const a=e.position.clone(),l=t.position.clone(),h=l.clone().sub(a),c=h.length();if(c<.05)return;const d=h.clone().normalize(),u=a.clone().add(l).multiplyScalar(.5),p=n.meta.width||((A=n.meta.parameters)==null?void 0:A.width)||3,g=n.meta.height||((F=n.meta.parameters)==null?void 0:F.height)||p,y=i.data.width||((G=i.data.parameters)==null?void 0:G.width)||3,m=i.data.height||((Z=i.data.parameters)==null?void 0:Z.height)||y,f=Math.max(p,g)/2,M=Math.max(y,m)/2,v=6,_=new Dn;_.userData={selectable:!1,type:"blend-group",connects:[n.meta.id,i.data.id]};const E=new b(0,0,1),T=new Ke().setFromUnitVectors(E,d),x=c/2,D=v/2,S=(R,O,X,H)=>{const J=new Ye(H,X,O,20,1,!1);J.rotateX(Math.PI/2);const Y=new wt({color:4473924,shininess:30,specular:2236962}),$=new te(J,Y);return $.castShadow=!0,$.receiveShadow=!0,$.setRotationFromQuaternion(T),$.position.copy(R.clone().add(d.clone().multiplyScalar(O/2))),$};for(let R=0;R<D;R++){const O=R/D,X=(R+1)/D,H=tn.lerp(f,(f+M)/2,O),J=tn.lerp(f,(f+M)/2,X),Y=x/D,$=a.clone().add(d.clone().multiplyScalar(Y*R));_.add(S($,Y,H,J))}for(let R=0;R<D;R++){const O=R/D,X=(R+1)/D,H=tn.lerp((f+M)/2,M,O),J=tn.lerp((f+M)/2,M,X),Y=x/D,$=u.clone().add(d.clone().multiplyScalar(Y*R));_.add(S($,Y,H,J))}this.scene.add(_),this.addConnectionMeta(s,n.meta,i.data),this.addConnectionMeta(o,i.data,n.meta),this.pushHistory({type:"segment-blend",groupRef:_,data:{posA:a,posB:l,rA:f,rB:M,segmentCount:v}})}animateQuaternionSlerp(e,t,n=400){const i=e.quaternion.clone(),s=performance.now(),o={object:e,startQuat:i,targetQuat:t.clone(),duration:n,start:s,done:!1},a=l=>{if(o.done)return;const h=Math.min(1,(l-s)/n);Ke.slerp(i,t,e.quaternion,h),h<1?requestAnimationFrame(a):o.done=!0};requestAnimationFrame(a)}async persistMergeRecord(e,t,n,i,s){if(this.enableMergePersistence)try{const o={strategy:e,mine_id:this.mineId,tunnels:[i.meta.id,s.data.id],endpoint_a:{x:t.position.x,y:t.position.y,z:t.position.z},endpoint_b:{x:n.position.x,y:n.position.y,z:n.position.z},timestamp:Date.now()},a=await fetch(this.mergePersistEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!a.ok)throw new Error("HTTP "+a.status);console.log("[MergePersist] Saved:",await a.json().catch(()=>"ok"))}catch(o){console.warn("[MergePersist] Failed:",o)}}ensureUndoRedoUI(){if(document.getElementById("undo-redo-panel"))return;const e=document.createElement("div");e.id="undo-redo-panel",e.style.cssText="position:absolute;top:10px;right:10px;z-index:9999;display:flex;gap:6px;font-family:Arial;";const t=(n,i,s)=>{const o=document.createElement("button");return o.id=n,o.textContent=i,o.style.cssText="padding:6px 10px;background:#222;color:#fff;border:1px solid #555;border-radius:4px;cursor:pointer;font-size:12px;",o.onclick=s,o};e.appendChild(t("btn-undo","Undo",()=>{this.undo()})),e.appendChild(t("btn-redo","Redo",()=>{this.redo()})),this.container.style.position=this.container.style.position||"relative",this.container.appendChild(e)}fuseTunnels(e,t,n,i){var X,H,J,Y,$;if(!(n!=null&&n.tunnel)||!(i!=null&&i.tunnel))throw new Error("Missing tunnel references");const s=n.tunnel,o=i.tunnel,a=n.meta,l=i.data,h=[s,o].map(U=>this.serializeTunnel(U)),c=e.endpoint==="A"?"B":"A",d=t.endpoint==="A"?"B":"A",u=this.calculateTunnelEndpoint(s,c,a),p=this.calculateTunnelEndpoint(o,d,l),g=u.position.clone(),y=p.position.clone(),m=g.distanceTo(y);if(m<.05)throw new Error("Too short to fuse");const f=y.clone().sub(g).normalize(),M=a.width||((X=a.parameters)==null?void 0:X.width)||3,v=l.width||((H=l.parameters)==null?void 0:H.width)||3,_=a.height||((J=a.parameters)==null?void 0:J.height)||M,E=l.height||((Y=l.parameters)==null?void 0:Y.height)||v,T=Math.max(M,_)/2,x=Math.max(v,E)/2,D=new Ye(x,T,m,32,1,!1);D.rotateX(Math.PI/2);const S=D.attributes.position;for(let U=0;U<S.count;U++)S.getY(U);const A=new wt({color:5592405,shininess:35,specular:3355443}),F=new te(D,A);F.castShadow=!0,F.receiveShadow=!0;const G=new b(0,0,1),Z=new Ke().setFromUnitVectors(G,f);F.setRotationFromQuaternion(Z),F.position.copy(g.clone().add(y).multiplyScalar(.5));const R=`fused_${a.id}_${l.id}`,O={length:m,width:Math.min(M,v),height:Math.min(_,E)};F.userData={selectable:!0,objectData:{id:R,type:"tunnel",parameters:O,width:O.width,height:O.height}},this.scene.add(F),($=this.objectSelector)!=null&&$.addSelectableObject&&this.objectSelector.addSelectableObject(F,F.userData.objectData),[s,o].forEach(U=>{U.visible=!1,U.userData.selectable=!1}),this.pushHistory({type:"merge-fuse",resultId:R,originals:h})}serializeTunnel(e){var i,s,o,a;const t=((i=e.userData)==null?void 0:i.objectData)||{},n=t.parameters||((s=e.userData)==null?void 0:s.parameters)||{};return{id:t.id,width:t.width||n.width,height:t.height||n.height,length:n.length,position:e.position.clone(),quaternion:e.quaternion.clone(),color:(a=(o=e.material)==null?void 0:o.color)!=null&&a.getHex?e.material.color.getHex():6710886}}recreateTunnel(e){var s;const t=Math.max(e.width||3,e.height||3)/2,n=new Ye(t,t,e.length,24,1,!1);n.rotateX(Math.PI/2);const i=new te(n,new wt({color:e.color}));return i.position.copy(e.position),i.setRotationFromQuaternion(e.quaternion),i.castShadow=!0,i.receiveShadow=!0,i.userData={selectable:!0,objectData:{id:e.id,type:"tunnel",parameters:{length:e.length,width:e.width,height:e.height},width:e.width,height:e.height}},this.scene.add(i),(s=this.objectSelector)!=null&&s.addSelectableObject&&this.objectSelector.addSelectableObject(i,i.userData.objectData),i}pushHistory(e){this.actionHistory.undo.push(e),this.actionHistory.redo.length=0}undo(){var t,n,i;const e=this.actionHistory.undo.pop();if(e){if(e.type==="merge-fuse"){const s=this.findSelectableById(e.resultId);s&&(this.scene.remove(s),(t=s.geometry)==null||t.dispose()),e.originals.forEach(o=>this.recreateTunnel(o)),(n=this.updateAllTunnelEndpoints)==null||n.call(this)}else e.type==="extend-gap-fill"?(e.after.forEach(s=>{const o=this.findSelectableById(s.id);o&&this.scene.remove(o)}),e.before.forEach(s=>this.recreateTunnel(s)),e.helperSleeve&&(this.scene.remove(e.helperSleeve),e.helperSleeve.geometry.dispose()),(i=this.updateAllTunnelEndpoints)==null||i.call(this)):e.type==="segment-blend"&&e.groupRef&&e.groupRef.parent&&(e.groupRef.parent.remove(e.groupRef),e.groupRef.traverse(s=>{s.isMesh&&(s.geometry.dispose(),s.material.dispose())}));this.actionHistory.redo.push(e)}}redo(){var t,n,i;const e=this.actionHistory.redo.pop();if(e){if(e.type==="merge-fuse"){e.originals.forEach(a=>{const l=this.findSelectableById(a.id);l&&this.scene.remove(l)});const s=e.originals[0],o=e.originals[1];if(s&&o){const a=s.position.clone(),l=o.position.clone(),h=l.clone().sub(a).normalize(),c=a.distanceTo(l),d=new Ye(Math.max(o.width,o.height)/2,Math.max(s.width,s.height)/2,c,32,1,!1);d.rotateX(Math.PI/2);const u=new te(d,new wt({color:5592405})),p=new b(0,0,1),g=new Ke().setFromUnitVectors(p,h);u.setRotationFromQuaternion(g),u.position.copy(a.clone().add(l).multiplyScalar(.5)),u.userData={selectable:!0,objectData:{id:e.resultId,type:"tunnel",parameters:{length:c,width:Math.min(s.width,o.width),height:Math.min(s.height,o.height)},width:Math.min(s.width,o.width),height:Math.min(s.height,o.height)}},this.scene.add(u),(t=this.objectSelector)!=null&&t.addSelectableObject&&this.objectSelector.addSelectableObject(u,u.userData.objectData)}(n=this.updateAllTunnelEndpoints)==null||n.call(this)}else if(e.type==="extend-gap-fill")e.before.forEach(s=>{const o=this.findSelectableById(s.id);o&&this.scene.remove(o)}),e.after.forEach(s=>this.recreateTunnel(s)),e.helperSleeve&&!e.helperSleeve.parent&&this.scene.add(e.helperSleeve),(i=this.updateAllTunnelEndpoints)==null||i.call(this);else if(e.type==="segment-blend"){const{posA:s,posB:o,rA:a,rB:l,segmentCount:h}=e.data,c=o.clone().sub(s),d=c.length(),u=c.clone().normalize(),p=s.clone().add(o).multiplyScalar(.5),g=new Dn,y=new b(0,0,1),m=new Ke().setFromUnitVectors(y,u),f=d/2,M=h/2,v=(_,E,T,x)=>{const D=new Ye(x,T,E,20,1,!1);D.rotateX(Math.PI/2);const S=new wt({color:4473924}),A=new te(D,S);return A.setRotationFromQuaternion(m),A.position.copy(_.clone().add(u.clone().multiplyScalar(E/2))),A};for(let _=0;_<M;_++){const E=_/M,T=(_+1)/M,x=tn.lerp(a,(a+l)/2,E),D=tn.lerp(a,(a+l)/2,T),S=f/M,A=s.clone().add(u.clone().multiplyScalar(S*_));g.add(v(A,S,x,D))}for(let _=0;_<M;_++){const E=_/M,T=(_+1)/M,x=tn.lerp((a+l)/2,l,E),D=tn.lerp((a+l)/2,l,T),S=f/M,A=p.clone().add(u.clone().multiplyScalar(S*_));g.add(v(A,S,x,D))}this.scene.add(g),e.groupRef=g}this.actionHistory.undo.push(e)}}findSelectableById(e){let t=null;return this.scene.traverse(n=>{var i,s;!t&&((s=(i=n.userData)==null?void 0:i.objectData)==null?void 0:s.id)===e&&(t=n)}),t}createConnectionPath(e,t,n,i){var s,o,a,l,h;if(!this.pathDrawer){console.error("[TunnelConnection] PathDrawer not available");return}try{const c=e.map(T=>T&&T.isVector3?T:new b(T.x,T.y,T.z)),d=t.meta.width||((s=t.meta.parameters)==null?void 0:s.width)||3,u=n.data.width||((o=n.data.parameters)==null?void 0:o.width)||3,p=t.meta.height||((a=t.meta.parameters)==null?void 0:a.height)||3,g=n.data.height||((l=n.data.parameters)==null?void 0:l.height)||3,y=Math.min(d,u),m=Math.min(p,g),f=`${t.meta.id}-${n.data.id}-${i}`;let M=0;for(let T=0;T<f.length;T++)M=(M<<5)-M+f.charCodeAt(T),M|=0;const v=`merge_${Math.abs(M)}`;if(this.pathDrawer.paths.has(v))return console.warn("[TunnelConnection] Merge path already exists, skipping duplicate."),this.pathDrawer.paths.get(v);const _={id:v,points:c.map(T=>({x:T.x,y:T.y,z:T.z})),width:y,height:m,color:i==="curved"?"#00ff88":"#ffaa00",type:"tunnel",name:`Birleştirme Tüneli (${i})`,path_points:c.map(T=>({x:T.x,y:T.y,z:T.z}))},E=this.pathDrawer.createPath(_);if(console.log("[TunnelConnection] Created connection path:",E),this.objectSelector&&E){const T={id:v,type:"path",pathType:"tunnel",name:`Birleştirme Tüneli (${i})`,isConnection:!0,connectionType:i,connectedTunnels:[t.meta.id,n.data.id],width:y,height:m,points:c.map(x=>({x:x.x,y:x.y,z:x.z}))};this.objectSelector.addSelectableObject(E,T),setTimeout(()=>{this.createTunnelEndpoints(E,T)},50)}if(setTimeout(()=>{var T;(T=this.updateAllTunnelEndpoints)==null||T.call(this)},80),this.mineId&&((h=this.options)!=null&&h.enableMergePersistence)){const T={name:_.name,type:"tunnel",path_points:_.points,width:y,height:m,color:_.color,description:"Auto-created merge tunnel",material:"concrete"};fetch(`/api/mines/${this.mineId}/paths`,{method:"POST",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify(T)}).then(x=>x.ok?x.json():Promise.reject(x)).then(x=>{var D;if((D=x==null?void 0:x.data)!=null&&D.id){const S=x.data.id;if(S!==v){if(this.pathDrawer.paths.has(v)){const A=this.pathDrawer.paths.get(v);this.pathDrawer.paths.delete(v),A.userData.id=S,this.pathDrawer.paths.set(S,A)}this.objectSelector&&this.objectSelector.selectableObjects&&this.objectSelector.selectableObjects.forEach(A=>{var F;((F=A==null?void 0:A.data)==null?void 0:F.id)===v&&(A.data.id=S)})}}}).catch(x=>console.warn("[TunnelConnection] Persist failed",x))}return E}catch(c){throw console.error("[TunnelConnection] Failed to create connection path:",c),c}}generateCurvedConnection(e,t){const n=e.position.clone(),i=t.position.clone();let s=e.direction?e.direction.clone():new b().subVectors(i,n).normalize(),o=t.direction?t.direction.clone().negate():new b().subVectors(n,i).normalize();const a=new b().subVectors(i,n).normalize();Math.abs(s.dot(a))<.3&&(s=a.clone()),Math.abs(o.clone().negate().dot(a))<.3&&(o=a.clone().negate());const l=n.distanceTo(i);new b().addVectors(n,i).multiplyScalar(.5);const h=Math.max(l*.3,5),c=n.clone().add(s.clone().multiplyScalar(h)),d=i.clone().add(o.clone().multiplyScalar(h)),u=[],p=Math.max(8,Math.floor(l/3));for(let g=0;g<=p;g++){const y=g/p,m=this.calculateBezierPoint(n,c,d,i,y);u.push(m)}return this.optimizeCurve(u)}calculateBezierPoint(e,t,n,i,s){const o=1-s,a=s*s,l=o*o,h=l*o,c=a*s,d=new b;return d.addScaledVector(e,h),d.addScaledVector(t,3*l*s),d.addScaledVector(n,3*o*a),d.addScaledVector(i,c),d}optimizeCurve(e,t=.5){if(e.length<=2)return e;const n=[e[0]];for(let i=1;i<e.length-1;i++){const s=n[n.length-1],o=e[i];s.distanceTo(o)>=t&&n.push(o)}return n.push(e[e.length-1]),n}animateEndpoints(){if(!this.mergeEndpoint1||!this.mergeEndpoint2)return;const e=Date.now(),t=2e3,n=()=>{const s=(Date.now()-e)%t/t,o=.8+.4*(Math.sin(s*Math.PI*2)*.5+.5);this.mergeEndpoint1&&this.mergeEndpoint1.scale.setScalar(o),this.mergeEndpoint2&&this.mergeEndpoint2.scale.setScalar(o),this.mergeEndpoint1&&this.mergeEndpoint2&&requestAnimationFrame(n)};n()}clearMergeVisualization(){this.mergeConnectionLine&&(this.scene.remove(this.mergeConnectionLine),this.mergeConnectionLine.geometry.dispose(),this.mergeConnectionLine.material.dispose(),this.mergeConnectionLine=null),this.mergeEndpoint1&&(this.scene.remove(this.mergeEndpoint1),this.mergeEndpoint1.geometry.dispose(),this.mergeEndpoint1.material.dispose(),this.mergeEndpoint1=null),this.mergeEndpoint2&&(this.scene.remove(this.mergeEndpoint2),this.mergeEndpoint2.geometry.dispose(),this.mergeEndpoint2.material.dispose(),this.mergeEndpoint2=null)}cancelTunnelMerge(){const e=document.getElementById("start-tunnel-merge"),t=document.getElementById("tunnel-merge-ui");e&&(e.style.display="block"),t&&(t.style.display="none"),this.clearMergeVisualization(),console.log("[TunnelMerge] Merge operation cancelled")}animateCameraTo(e,t,n=1500){if(!this.camera||!this.controls)return;const i=this.camera.position.clone(),s=this.controls.target.clone(),o=new b().copy(e),a=new b().copy(t);let l=null;const h=c=>{l||(l=c);const d=c-l,u=Math.min(d/n,1),p=u<.5?4*u*u*u:(u-1)*(2*u-2)*(2*u-2)+1;this.camera.position.lerpVectors(i,o,p),this.controls.target.lerpVectors(s,a,p),this.controls.update(),u<1&&requestAnimationFrame(h)};requestAnimationFrame(h)}showError(e){console.error("[TunnelMerge] Error:",e),window.toastr&&toastr.error(e)}showSuccess(e){console.log("[TunnelMerge] Success:",e),window.toastr&&toastr.success(e)}showInfo(e){console.info("[TunnelMerge] Info:",e),window.toastr&&toastr.info(e)}createTunnelEndpoints(e,t){if(!e||!t)return;const n=t.id;console.log("[EndpointSystem] Creating endpoints for tunnel:",n,t),this.endpointIndicators.has(n)&&this.removeTunnelEndpoints(n),e.geometry&&(e.geometry.computeBoundingBox(),e.updateMatrixWorld(!0));const i=this.calculateTunnelEndpoint(e,"A",t),s=this.calculateTunnelEndpoint(e,"B",t);if(console.log("[EndpointSystem] Calculated endpoints:",{endpointA:i,endpointB:s}),!i||!s){console.warn("[EndpointSystem] Could not calculate endpoints");return}const o=this.createEndpointMesh("G",65348);o.position.copy(i.position),this.scene.add(o);const a=this.createEndpointMesh("B",16729156);a.position.copy(s.position),this.scene.add(a),this.endpointIndicators.set(n,{G:o,B:a,tunnel:e,metadata:t}),console.log(`[EndpointSystem] Created endpoints for tunnel ${n} at:`,{G:i.position.toArray(),B:s.position.toArray()})}createEndpointMesh(e,t){const s=new Ye(.8,.8,1.5,16),o=new wt({color:t,transparent:!0,opacity:.8,shininess:50}),a=new te(s,o);return a.castShadow=!0,a.receiveShadow=!0,a.userData={isEndpoint:!0,label:e,originalScale:a.scale.clone()},a}removeTunnelEndpoints(e){const t=this.endpointIndicators.get(e);t&&(t.G&&(this.scene.remove(t.G),t.G.geometry&&t.G.geometry.dispose(),t.G.material&&t.G.material.dispose()),t.B&&(this.scene.remove(t.B),t.B.geometry&&t.B.geometry.dispose(),t.B.material&&t.B.material.dispose()),this.endpointIndicators.delete(e))}updateAllTunnelEndpoints(){console.log("[EndpointSystem] Updating all tunnel endpoints...");for(const[t,n]of this.endpointIndicators)this.removeTunnelEndpoints(t);let e=0;if(this.scene.traverse(t=>{if(t.userData&&t.userData.selectable){const n=t.userData.objectData||t.userData;(n.type==="tunnel"||n.pathType==="tunnel")&&(console.log("[EndpointSystem] Found scene tunnel:",n),this.createTunnelEndpoints(t,n),e++)}}),this.pathDrawer&&this.pathDrawer.paths)for(const[t,n]of this.pathDrawer.paths){const i=n.userData.pathData;i&&i.type==="tunnel"&&(console.log("[EndpointSystem] Found path tunnel:",i),this.createTunnelEndpoints(n,i),e++)}console.log(`[EndpointSystem] Updated endpoints for ${e} tunnels`)}toggleEndpointVisibility(){this.showEndpoints=!this.showEndpoints;for(const[e,t]of this.endpointIndicators)t.G&&(t.G.visible=this.showEndpoints),t.B&&(t.B.visible=this.showEndpoints);console.log(`[EndpointSystem] Endpoints ${this.showEndpoints?"shown":"hidden"}`)}createTunnelExtensionPoints(e,t){if(!e||!t)return;const n=t.id;console.log("[ExtensionSystem] Creating extension points for tunnel:",n),this.removeTunnelExtensionPoints(n);const i=e.userData.parameters||t.parameters||{},s=i.width||3,o=i.height||3;i.length,i.orientation;const a=this.calculateTunnelEndpoint(e,"A",t),l=this.calculateTunnelEndpoint(e,"B",t);if(!a||!l){console.warn("[ExtensionSystem] Could not calculate tunnel endpoints");return}const h=this.create8ExtensionPoints(a,s,o,"A",n),c=this.create8ExtensionPoints(l,s,o,"B",n),d=[...h,...c];d.forEach(u=>{this.scene.add(u)}),this.tunnelExtensionPoints||(this.tunnelExtensionPoints=new Map),this.tunnelExtensionPoints.set(n,{tunnel:e,metadata:t,pointsA:h,pointsB:c,allPoints:d}),console.log(`[ExtensionSystem] Created 16 extension points for tunnel ${n}`)}create8ExtensionPoints(e,t,n,i,s){const o=[],a=Math.max(t,n)/2,l=.1;return[{name:"top",offset:[0,a+l,0]},{name:"bottom",offset:[0,-a-l,0]},{name:"right",offset:[a+l,0,0]},{name:"left",offset:[-a-l,0,0]},{name:"top-right",offset:[(a+l)*Math.cos(Math.PI/4),(a+l)*Math.sin(Math.PI/4),0]},{name:"top-left",offset:[-(a+l)*Math.cos(Math.PI/4),(a+l)*Math.sin(Math.PI/4),0]},{name:"bottom-right",offset:[(a+l)*Math.cos(Math.PI/4),-(a+l)*Math.sin(Math.PI/4),0]},{name:"bottom-left",offset:[-(a+l)*Math.cos(Math.PI/4),-(a+l)*Math.sin(Math.PI/4),0]}].forEach((c,d)=>{const u=this.createExtensionPointMesh(c.name,i,s);u.position.copy(e.position),u.position.x+=c.offset[0],u.position.y+=c.offset[1],u.position.z+=c.offset[2],u.userData={isExtensionPoint:!0,tunnelId:s,side:i,direction:c.name,pointIndex:d,originalPosition:u.position.clone(),extensionVector:new b(...c.offset).normalize()},o.push(u)}),o}createExtensionPointMesh(e,t,n){const i=new Qn(.3,12,8),s=t==="A"?4491519:16746564,o=new wt({color:s,transparent:!0,opacity:.8,emissive:s,emissiveIntensity:.2}),a=new te(i,o);return a.castShadow=!0,a.userData.selectable=!0,a}removeTunnelExtensionPoints(e){if(!this.tunnelExtensionPoints)return;const t=this.tunnelExtensionPoints.get(e);t&&(t.allPoints.forEach(n=>{this.scene.remove(n),n.geometry&&n.geometry.dispose(),n.material&&n.material.dispose()}),this.tunnelExtensionPoints.delete(e))}updateAllTunnelExtensionPoints(){if(console.log("[ExtensionSystem] Updating all tunnel extension points..."),this.tunnelExtensionPoints)for(const[t,n]of this.tunnelExtensionPoints)this.removeTunnelExtensionPoints(t);let e=0;if(this.scene.traverse(t=>{if(t.userData&&t.userData.selectable){const n=t.userData.objectData||t.userData;(n.type==="tunnel"||n.pathType==="tunnel")&&(this.createTunnelExtensionPoints(t,n),e++)}}),this.pathDrawer&&this.pathDrawer.paths)for(const[t,n]of this.pathDrawer.paths){const i=n.userData.pathData;i&&i.type==="tunnel"&&(this.createTunnelExtensionPoints(n,i),e++)}console.log(`[ExtensionSystem] Updated extension points for ${e} tunnels`)}toggleExtensionPointsVisibility(){if(this.tunnelExtensionPoints){this.showExtensionPoints=!this.showExtensionPoints;for(const[e,t]of this.tunnelExtensionPoints)t.allPoints.forEach(n=>{n.visible=this.showExtensionPoints});console.log(`[ExtensionSystem] Extension points ${this.showExtensionPoints?"shown":"hidden"}`)}}handleExtensionPointClick(e,t){e.userData.isExtensionPoint&&(console.log("[ExtensionSystem] Extension point clicked:",e.userData),this.hideExtensionTooltip(),this.showExtensionTooltip(e,t),this.activeExtensionPoint=e)}showExtensionTooltip(e,t){const n=e.userData,{tunnelId:i,side:s,direction:o}=n,a=`
            <div id="extension-tooltip" style="
                position: absolute;
                background: rgba(20, 20, 20, 0.95);
                color: white;
                padding: 15px;
                border-radius: 8px;
                border: 2px solid #4488ff;
                min-width: 250px;
                z-index: 10000;
                font-family: Arial, sans-serif;
                box-shadow: 0 4px 15px rgba(0,0,0,0.5);
            ">
                <div style="margin-bottom: 10px; font-weight: bold; color: #4488ff;">
                    🎯 Tünel Uzatma - ${s} Ucu
                </div>
                <div style="margin-bottom: 8px; font-size: 12px; color: #aaa;">
                    Yön: ${o} | Tünel: ${i}
                </div>
                
                <div style="margin: 15px 0;">
                    <label style="display: block; margin-bottom: 5px; font-size: 12px;">
                        Uzatma Katsayısı:
                    </label>
                    <input type="range" id="extension-multiplier" 
                           min="-10" max="10" step="0.5" value="1"
                           style="width: 100%; margin-bottom: 8px;">
                    <div style="text-align: center; font-size: 11px; color: #888;">
                        <span id="multiplier-value">1.0</span>x
                    </div>
                </div>
                
                <div style="display: flex; gap: 8px; margin-top: 15px;">
                    <button id="extend-minus" style="
                        flex: 1; padding: 8px; background: #ff4444; color: white; 
                        border: none; border-radius: 4px; cursor: pointer; font-size: 12px;
                    ">➖ Azalt</button>
                    
                    <button id="extend-plus" style="
                        flex: 1; padding: 8px; background: #44ff44; color: white; 
                        border: none; border-radius: 4px; cursor: pointer; font-size: 12px;
                    ">➕ Artır</button>
                </div>
                
                <div style="display: flex; gap: 8px; margin-top: 8px;">
                    <button id="reset-extension" style="
                        flex: 1; padding: 6px; background: #666; color: white; 
                        border: none; border-radius: 4px; cursor: pointer; font-size: 11px;
                    ">🔄 Sıfırla</button>
                    
                    <button id="close-tooltip" style="
                        flex: 1; padding: 6px; background: #333; color: white; 
                        border: none; border-radius: 4px; cursor: pointer; font-size: 11px;
                    ">✖ Kapat</button>
                </div>
            </div>
        `,l=document.createElement("div");l.innerHTML=a,document.body.appendChild(l.firstElementChild);const h=document.getElementById("extension-tooltip");h.style.left=`${t.clientX+10}px`,h.style.top=`${t.clientY-50}px`,this.attachTooltipEventListeners(e)}attachTooltipEventListeners(e){const t=document.getElementById("extension-multiplier"),n=document.getElementById("multiplier-value"),i=document.getElementById("extend-plus"),s=document.getElementById("extend-minus"),o=document.getElementById("reset-extension"),a=document.getElementById("close-tooltip");t.addEventListener("input",l=>{n.textContent=parseFloat(l.target.value).toFixed(1)}),i.addEventListener("click",()=>{const l=parseFloat(t.value);this.extendTunnelFromPoint(e,l)}),s.addEventListener("click",()=>{const l=parseFloat(t.value);this.extendTunnelFromPoint(e,-l)}),o.addEventListener("click",()=>{this.resetTunnelExtension(e)}),a.addEventListener("click",()=>{this.hideExtensionTooltip()})}hideExtensionTooltip(){const e=document.getElementById("extension-tooltip");e&&e.remove(),this.activeExtensionPoint=null}extendTunnelFromPoint(e,t){const n=e.userData,{tunnelId:i,side:s,direction:o,extensionVector:a}=n;console.log("[ExtensionSystem] Extending tunnel:",{tunnelId:i,side:s,direction:o,multiplier:t});const l=this.tunnelExtensionPoints.get(i);if(!l){console.error("[ExtensionSystem] Tunnel extension data not found:",i);return}const h=l.tunnel,c=l.metadata,d=h.userData.parameters||c.parameters||{};d.originalLength||d.length,d.width,d.height;const u=Math.abs(t)*2,p=t*.5,g=this.calculateExtendedTunnelParams(d,e,u,p,s,o);this.applyTunnelExtension(h,g,c),this.updateTunnelExtensionPointsAfterChange(i),this.saveTunnelExtensionToDatabase(h,g,c),console.log("[ExtensionSystem] Tunnel extended successfully")}calculateExtendedTunnelParams(e,t,n,i,s,o){const a={...e};a.originalLength||(a.originalLength=a.length),a.length=(a.originalLength||10)+n,a.bendPoints||(a.bendPoints=[]);const l=a.originalLength||10,h=a.length;let c;s==="A"?c=0:c=l/h;const d={position:c,direction:o,intensity:i,side:s};return a.bendPoints.push(d),a.curveSegments=Math.max(16,a.bendPoints.length*8),a.smoothBends=!0,a}applyTunnelExtension(e,t,n){try{const i=this.createCurvedTunnelGeometry(t);if(!i){console.error("[ExtensionSystem] Failed to create curved geometry");return}e.geometry&&e.geometry.dispose(),e.geometry=i,e.userData.parameters=t,n.parameters&&(n.parameters=t),console.log("[ExtensionSystem] Tunnel geometry updated successfully")}catch(i){console.error("[ExtensionSystem] Error applying tunnel extension:",i)}}createCurvedTunnelGeometry(e){const{width:t=3,height:n=3,length:i=10,bendPoints:s=[]}=e;try{const o=this.createTunnelCurve(i,s),a=Math.max(t,n)/2,l=new fn(o,Math.max(32,s.length*16),a,24,!1);return l.computeVertexNormals(),l}catch(o){console.error("[ExtensionSystem] Error creating curved geometry:",o);const a=Math.max(e.width||3,e.height||3)/2;return new Ye(a,a,e.length||10,24,1,!1)}}createTunnelCurve(e,t){const n=[],i=Math.max(32,t.length*16);for(let s=0;s<=i;s++){const o=s/i,a=o*e-e/2;let l=0,h=0;t.forEach(c=>{const{position:d,direction:u,intensity:p,side:g}=c;let y=0;if(g==="A"){if(o>=d){const m=o-d;y=Math.max(0,1-m*2)}}else if(o<=d){const m=d-o;y=Math.max(0,1-m*2)}if(y>0){const m=p*y;switch(u){case"top":h+=m;break;case"bottom":h-=m;break;case"right":l+=m;break;case"left":l-=m;break;case"top-right":l+=m*.7,h+=m*.7;break;case"top-left":l-=m*.7,h+=m*.7;break;case"bottom-right":l+=m*.7,h-=m*.7;break;case"bottom-left":l-=m*.7,h-=m*.7;break}}}),n.push(new b(l,h,a))}return new An(n)}resetTunnelExtension(e){const t=e.userData,{tunnelId:n}=t;console.log("[ExtensionSystem] Resetting tunnel extension:",n);const i=this.tunnelExtensionPoints.get(n);if(!i)return;const s=i.tunnel,o=i.metadata,a=s.userData.parameters||{},l={...a,length:a.originalLength||a.length||10,bendPoints:[],curveSegments:16};delete l.originalLength,this.applyTunnelExtension(s,l,o),this.updateTunnelExtensionPointsAfterChange(n),this.saveResetToDatabase(s,l,o),console.log("[ExtensionSystem] Tunnel extension reset successfully")}updateTunnelExtensionPointsAfterChange(e){const t=this.tunnelExtensionPoints.get(e);t&&(console.log("[ExtensionSystem] Updating extension points for tunnel:",e),this.removeTunnelExtensionPoints(e),setTimeout(()=>{this.recreateExtensionPointsWithUpdatedGeometry(e,t),console.log("[ExtensionSystem] Extension points updated successfully")},100))}recreateExtensionPointsWithUpdatedGeometry(e,t){const{tunnel:n,metadata:i}=t;n.geometry.computeBoundingBox(),n.updateMatrixWorld(!0);const s=this.calculateUpdatedTunnelEndpoint(n,"A",i),o=this.calculateUpdatedTunnelEndpoint(n,"B",i);if(!s||!o){console.warn("[ExtensionSystem] Could not calculate updated endpoints");return}const a=n.userData.parameters||i.parameters||{},l=a.width||3,h=a.height||3,c=this.create8ExtensionPoints(s,l,h,"A",e),d=this.create8ExtensionPoints(o,l,h,"B",e),u=[...c,...d];u.forEach(p=>{this.scene.add(p)}),this.tunnelExtensionPoints.set(e,{tunnel:n,metadata:i,pointsA:c,pointsB:d,allPoints:u}),this.endpointIndicators.has(e)&&(this.removeTunnelEndpoints(e),this.createTunnelEndpoints(n,i))}calculateUpdatedTunnelEndpoint(e,t,n){const i=new vn;i.setFromObject(e);const s=new b;i.getCenter(s);const o=new b;i.getSize(o);let a,l;const h=e.userData.parameters||n.parameters||{};if(h.bendPoints&&h.bendPoints.length>0){const c=this.createTunnelCurve(h.length||10,h.bendPoints);t==="A"?(a=c.getPoint(0),l=c.getTangent(0).clone().negate()):(a=c.getPoint(1),l=c.getTangent(1).clone()),a.applyMatrix4(e.matrixWorld),l.transformDirection(e.matrixWorld).normalize()}else{Math.max(o.x,o.y,o.z);let c;o.z>=o.x&&o.z>=o.y?(c=t==="A"?-o.z/2:o.z/2,a=new b(s.x,s.y,s.z+c),l=new b(0,0,t==="A"?-1:1)):o.y>=o.x&&o.y>=o.z?(c=t==="A"?-o.y/2:o.y/2,a=new b(s.x,s.y+c,s.z),l=new b(0,t==="A"?-1:1,0)):(c=t==="A"?-o.x/2:o.x/2,a=new b(s.x+c,s.y,s.z),l=new b(t==="A"?-1:1,0,0))}return{position:a,direction:l,endpoint:t}}saveTunnelExtensionToDatabase(e,t,n){var o;if(!this.mineId){console.warn("[ExtensionSystem] Mine ID not found, skipping database save");return}const i=n.id||n.serverId||e.userData.id;if(!i){console.warn("[ExtensionSystem] Tunnel ID not found, skipping database save");return}console.log("[ExtensionSystem] Saving tunnel extension to database:",{tunnelId:i,newParams:t});const s={width:t.width,height:t.height,length:t.length,parameters:JSON.stringify(t),bend_points:t.bendPoints?JSON.stringify(t.bendPoints):null,orientation:t.orientation||"horizontal"};fetch(`/api/mines/${this.mineId}/tunnels/${i}`,{method:"PUT",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":((o=document.querySelector('meta[name="csrf-token"]'))==null?void 0:o.getAttribute("content"))||""},body:JSON.stringify(s)}).then(a=>{if(!a.ok)throw new Error(`HTTP ${a.status}: ${a.statusText}`);return a.json()}).then(a=>{console.log("[ExtensionSystem] Tunnel extension saved to database successfully:",a),window.toastr&&toastr.success("Tünel uzatma kaydedildi!"),n&&(n.parameters=t,n.width=t.width,n.height=t.height,n.length=t.length)}).catch(a=>{console.error("[ExtensionSystem] Failed to save tunnel extension to database:",a),window.toastr?toastr.error("Tünel uzatma kaydedilemedi: "+a.message):this.showError("Tünel uzatma kaydedilemedi: "+a.message)})}saveResetToDatabase(e,t,n){var o;if(!this.mineId){console.warn("[ExtensionSystem] Mine ID not found, skipping database save");return}const i=n.id||n.serverId||e.userData.id;if(!i){console.warn("[ExtensionSystem] Tunnel ID not found, skipping database save");return}console.log("[ExtensionSystem] Saving tunnel reset to database:",{tunnelId:i,originalParams:t});const s={width:t.width,height:t.height,length:t.length,parameters:JSON.stringify(t),bend_points:null,orientation:t.orientation||"horizontal"};fetch(`/api/mines/${this.mineId}/tunnels/${i}`,{method:"PUT",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":((o=document.querySelector('meta[name="csrf-token"]'))==null?void 0:o.getAttribute("content"))||""},body:JSON.stringify(s)}).then(a=>{if(!a.ok)throw new Error(`HTTP ${a.status}: ${a.statusText}`);return a.json()}).then(a=>{console.log("[ExtensionSystem] Tunnel reset saved to database successfully:",a),window.toastr&&toastr.success("Tünel sıfırlama kaydedildi!")}).catch(a=>{console.error("[ExtensionSystem] Failed to save tunnel reset to database:",a),window.toastr?toastr.error("Tünel sıfırlama kaydedilemedi: "+a.message):this.showError("Tünel sıfırlama kaydedilemedi: "+a.message)})}}window.SimpleMine3DViewer=sg;
