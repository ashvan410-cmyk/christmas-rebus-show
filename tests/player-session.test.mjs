import test from 'node:test';
import assert from 'node:assert/strict';
import {joinedSession,connectedHostSession} from '../lib/player-session.mjs';
test('joining on the host phone preserves its host key and player token',()=>{const s=joinedSession({code:'SNOW24',secret:'host-key'},'SNOW24','player-token',' Ashley ');assert.equal(s.secret,'host-key');assert.equal(s.token,'player-token');assert.equal(s.name,'Ashley');assert.equal(JSON.parse(JSON.stringify(s)).secret,'host-key')});
test('joining another room never carries over the previous room host key',()=>{assert.equal(joinedSession({code:'OLD123',secret:'old-host'},'NEW123','token','A').secret,undefined)});

test('connecting host controls retains an existing player on the same phone',()=>{const s=connectedHostSession({code:'SNOW24',token:'player-token',name:'Ashley'},'SNOW24','host-key');assert.equal(s.token,'player-token');assert.equal(s.secret,'host-key');assert.equal(s.name,'Ashley');assert.equal(connectedHostSession({code:'OLD123',token:'old'},'SNOW24','key').token,undefined)});
