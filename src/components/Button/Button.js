import React from 'react';
import { Button } from 'reactstrap';
import './Button.styles.css';

const StyledButton = (props) => (
  <Button className={'Button'} outline={false} {...props} />
);

export default StyledButton;
