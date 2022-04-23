import { useSetRecoilState } from 'recoil';
import authAtom from './atom';

function useAuthAction() {
  const setAuthState = useSetRecoilState(authAtom);

  const authorize = () => setAuthState({ authenticated: true });
  const logout = () => setAuthState({ authenticated: false });
  return { authorize, logout };
}

export default useAuthAction;
