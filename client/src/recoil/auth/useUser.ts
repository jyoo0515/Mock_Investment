import { useRecoilValue } from 'recoil';
import authState from './atom';

function useUser() {
  const auth = useRecoilValue(authState);
  return auth.user;
}

export default useUser;
