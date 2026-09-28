import 'server-only';
import { readFileSync } from 'fs';
import { join } from 'path';

const SWITCH_FILE='yes or no.txt';

export function birthdayFeatureEnabled(){
  try{
    return readFileSync(join(process.cwd(),SWITCH_FILE),'utf8').trim().toLowerCase()==='yes';
  }catch{
    return false;
  }
}
