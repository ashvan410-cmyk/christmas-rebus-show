// Keep the host key on the same device when it also joins as a player.
export function joinedSession(previous,code,token,name){return {...(previous?.secret&&previous.code===code?previous:{}),code,token,name:name.trim()}}
