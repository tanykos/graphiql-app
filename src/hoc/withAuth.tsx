import { ComponentType, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const withAuth = <P extends object>(Component: ComponentType<P & { user: User | null }>) => {
  return function WithAuthRedirectWrapper(props: P) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          setUser(authUser);
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe();
    });

    return <Component {...props} user={user} />;
  };
};

export default withAuth;
