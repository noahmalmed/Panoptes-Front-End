import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { IndexLink } from 'react-router';
import { pxToRem } from '../../../../../../theme';

export const H1 = styled.h1`
  color: white;
  font-family: Karla;
  font-size: ${pxToRem(30)};
  font-weight: bold;
  letter-spacing: ${pxToRem(-1)};
  line-height: 1.2;
  text-shadow: 0 ${pxToRem(2)} ${pxToRem(3)} rgba(0,0,0,0.5);
`;

export const StyledLink = styled(IndexLink).attrs({
  activeClassName: 'active'
})`
  text-decoration: none;
  color: white;

  &:hover,
  &:focus {
    border-bottom: ${pxToRem(3)} solid white;
  }
`;

function ProjectTitle({ link, title }) {
  return (
    <H1>
      <StyledLink to={`${link}?facelift=true`}>
        {title}
      </StyledLink>
    </H1>
  );
}

ProjectTitle.defaultProps = {
  link: '',
  title: ''
};

ProjectTitle.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string
};

export default ProjectTitle;
