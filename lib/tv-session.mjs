// Leaving the presentation restores only credentials for this same room.
export function resolveTvExit(current,saved){
 if(saved&&saved.code===current.code&&(saved.secret||saved.token))return saved;
 return {...current,observer:true};
}
