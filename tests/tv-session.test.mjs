import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveTvExit} from '../lib/tv-session.mjs';
test('Exit TV restores host or phone in the same room without clearing gameplay',()=>{const current={code:'SNOW24',observer:true};for(const credential of ['secret','token']){const saved={code:'SNOW24',[credential]:'private'};assert.deepEqual(resolveTvExit(current,saved),saved)}});
test('Exit TV never leaves the room or borrows another room’s credentials',()=>{const current={code:'SNOW24',observer:true};for(const saved of [null,{code:'OTHER1',secret:'private'},{code:'SNOW24'}])assert.deepEqual(resolveTvExit(current,saved),current)});
