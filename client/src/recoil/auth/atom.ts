import { atom } from 'recoil';

interface Auth {
  authenticated: boolean;
}

const authAtom = atom<Auth>({
  key: 'authAtom',
  default: {
    authenticated: false,
  },
});

export default authAtom;
