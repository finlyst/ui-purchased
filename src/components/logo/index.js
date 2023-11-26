import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Card, CardMedia } from '@mui/material';
import FinlystLog from '../../assets/images/finlystLogo/finlystLogo2.png';
import FinlystWord from '../../assets/images/finlystLogo/image.png';

// project import
// import Logo from './LogoMain';
// import LogoIcon from './LogoIcon';
import { APP_DEFAULT_PATH } from 'config';
import useAuth from 'hooks/useAuth';
// import { Box } from '@mui/system';
// import Avatar from 'components/@extended/Avatar';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({  isIcon, sx, to }) => {
  const { isLoggedIn } = useAuth();

  return (
    <ButtonBase disableRipple {...(isLoggedIn && { component: Link, to: !to ? APP_DEFAULT_PATH : to, sx })}>
      {isIcon ? (
        <img src={FinlystLog} alt="HeaderLogo" />
      ) : (<>
        <Card variant="outlined" column raised sx={{ minWidth: 45 }}>
          <CardMedia component="img" image={FinlystLog} alt="HeaderLogo" height="45" sx={{ objectFit: 'contain',p:1 }} />{' '}
          </Card>
          <Card variant="outlined" column raised sx={{ minWidth: 130,margin: '0 auto' }}>
          <CardMedia component="img" image={FinlystWord} alt="HeaderLogo" height="45" sx={{ objectFit: 'contain' }} />{' '}
        </Card>
        </>
      )}
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  reverse: PropTypes.bool,
  isIcon: PropTypes.bool,
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
