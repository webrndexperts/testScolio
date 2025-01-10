var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,t,r)=>t in e?__defProp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,__spreadValues=(e,t)=>{for(var r in t||(t={}))__hasOwnProp.call(t,r)&&__defNormalProp(e,r,t[r]);if(__getOwnPropSymbols)for(var r of __getOwnPropSymbols(t))__propIsEnum.call(t,r)&&__defNormalProp(e,r,t[r]);return e},__spreadProps=(e,t)=>__defProps(e,__getOwnPropDescs(t));(self.webpackChunk=self.webpackChunk||[]).push([[125],{2648:(e,t,r)=>{var o,s=Object.create,a=Object.defineProperty,l=Object.getOwnPropertyDescriptor,n=Object.getOwnPropertyNames,p=Object.getPrototypeOf,i=Object.prototype.hasOwnProperty,u=(e,t,r,o)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let s of n(t))i.call(e,s)||s===r||a(e,s,{get:()=>t[s],enumerable:!(o=l(t,s))||o.enumerable});return e},d=(e,t,r)=>(((e,t,r)=>{t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r})(e,"symbol"!=typeof t?t+"":t,r),r),h={};((e,t)=>{for(var r in t)a(e,r,{get:t[r],enumerable:!0})})(h,{default:()=>f}),e.exports=(o=h,u(a({},"__esModule",{value:!0}),o));var c=((e,t,r)=>(r=null!=e?s(p(e)):{},u(!t&&e&&e.__esModule?r:a(r,"default",{value:e,enumerable:!0}),e)))(r(7294)),y=r(8045),_=r(1776);class f extends c.Component{constructor(){super(...arguments),d(this,"callPlayer",y.callPlayer),d(this,"duration",null),d(this,"currentTime",null),d(this,"fractionLoaded",null),d(this,"mute",(()=>{this.setVolume(0)})),d(this,"unmute",(()=>{null!==this.props.volume&&this.setVolume(this.props.volume)})),d(this,"ref",(e=>{this.iframe=e}))}componentDidMount(){this.props.onMount&&this.props.onMount(this)}load(e,t){(0,y.getSDK)("https://w.soundcloud.com/player/api.js","SC").then((r=>{if(!this.iframe)return;const{PLAY:o,PLAY_PROGRESS:s,PAUSE:a,FINISH:l,ERROR:n}=r.Widget.Events;t||(this.player=r.Widget(this.iframe),this.player.bind(o,this.props.onPlay),this.player.bind(a,(()=>{this.duration-this.currentTime<.05||this.props.onPause()})),this.player.bind(s,(e=>{this.currentTime=e.currentPosition/1e3,this.fractionLoaded=e.loadedProgress})),this.player.bind(l,(()=>this.props.onEnded())),this.player.bind(n,(e=>this.props.onError(e)))),this.player.load(e,__spreadProps(__spreadValues({},this.props.config.options),{callback:()=>{this.player.getDuration((e=>{this.duration=e/1e3,this.props.onReady()}))}}))}))}play(){this.callPlayer("play")}pause(){this.callPlayer("pause")}stop(){}seekTo(e,t=!0){this.callPlayer("seekTo",1e3*e),t||this.pause()}setVolume(e){this.callPlayer("setVolume",100*e)}getDuration(){return this.duration}getCurrentTime(){return this.currentTime}getSecondsLoaded(){return this.fractionLoaded*this.duration}render(){const{display:e}=this.props,t={width:"100%",height:"100%",display:e};return c.default.createElement("iframe",{ref:this.ref,src:`https://w.soundcloud.com/player/?url=${encodeURIComponent(this.props.url)}`,style:t,frameBorder:0,allow:"autoplay"})}}d(f,"displayName","SoundCloud"),d(f,"canPlay",_.canPlay.soundcloud),d(f,"loopOnEnded",!0)}}]);