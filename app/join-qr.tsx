'use client';
import {useEffect,useRef,useState} from 'react';
// qrcode supplies the encoder; the canvas remains local to this page.
// @ts-ignore — this package has no bundled TypeScript declarations.
import QRCode from 'qrcode';
export const JOIN_ORIGIN='https://christmas-tradition-games.steadytogether.workers.dev';
export function joinUrl(room?:string,origin:string=JOIN_ORIGIN){return origin+'/?'+(room?'room='+encodeURIComponent(room.toUpperCase()):'join=1');}
export default function JoinQr({room}:{room?:string}){
 const canvas=useRef<HTMLCanvasElement>(null),[failed,setFailed]=useState(false),[origin,setOrigin]=useState("");
 const url=joinUrl(room,origin||JOIN_ORIGIN);
 useEffect(()=>setOrigin(window.location.origin),[]);
 useEffect(()=>{let active=true;setFailed(false);if(origin&&canvas.current)QRCode.toCanvas(canvas.current,url,{width:180,margin:4,errorCorrectionLevel:'M',color:{dark:'#082f23',light:'#ffffff'}},(error:any)=>{if(active)setFailed(!!error)});return()=>{active=false}},[url,origin]);
 return <aside className="join-qr" aria-label="Join this game"><a href={url} aria-label={room?'Join room '+room:'Join a Game'}><canvas ref={canvas} role="img" aria-label="Scan with your phone camera to join"/><strong>{failed?'Join a Game':'Scan to join'}</strong>{room&&<span>{room}</span>}</a></aside>;
}
