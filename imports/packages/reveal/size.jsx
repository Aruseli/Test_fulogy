import Reveal from 'react-reveal/Reveal';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
  size: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
}));

export const Size = (props) => {
  const classes = useStyle();

  return <Reveal effect={'sandbox-reveal-size-in'} effectOut={'sandbox-reveal-size-out'} className={classes.size} {...props}/>;
};