import HomeHeader from './home-components/HomeHeader';
import HomeLanding from './home-components/HomeLanding';
import { fetchAuthMe, selectIsAuth } from '../redux/slices/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  const isAuth = useSelector(selectIsAuth);

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <HomeHeader />
      <HomeLanding />
    </div>
  );
}

export default HomePage;
