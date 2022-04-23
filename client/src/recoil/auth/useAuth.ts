import { useRecoilValue } from 'recoil';
import authAtom from './atom';

function useAuth() {
  const auth = useRecoilValue(authAtom);
  return auth;
}

export default useAuth;
