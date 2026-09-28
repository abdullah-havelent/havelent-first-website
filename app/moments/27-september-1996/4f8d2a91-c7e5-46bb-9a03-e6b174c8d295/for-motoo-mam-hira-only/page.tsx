import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PRIVATE_ENTRY_COOKIE,validEntryToken } from '@/lib/privateAccess';
import BirthdayCelebration from '@/components/BirthdayCelebration';
import VaultEntryConsumer from '@/components/VaultEntryConsumer';
import { birthdayFeatureEnabled } from '@/lib/birthdayFeature';

export const dynamic='force-dynamic';
export default function PrivateBirthdayPage(){
  if(!birthdayFeatureEnabled())redirect('/');
  if(!validEntryToken(cookies().get(PRIVATE_ENTRY_COOKIE)?.value))redirect('/?private-access=required');
  return <><VaultEntryConsumer/><BirthdayCelebration/></>;
}
