import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar';
import Background from '../Background';
import NavLink from '../NavLink';
import ProjectTitle from '../ProjectTitle';
import StyledHeader from '../StyledHeader';
import Wrapper from '../Wrapper';
import { pxToRem } from '../../../../../../theme';

const StyledHeaderWide = StyledHeader.extend`
  box-shadow: 0 ${pxToRem(2)} ${pxToRem(4)} 0 rgba(0,0,0,0.5);
`;

const StyledAvatar = styled(Avatar)`
  margin-right: ${pxToRem(20)};
`;

const StyledWrapper = styled(Wrapper)`
  box-sizing: border-box;
  min-height: ${pxToRem(150)};
  padding: 0 ${pxToRem(10)};
`;

const Nav = styled.nav`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-left: ${pxToRem(20)}
`;

const StyledNavLink = styled(NavLink)`
  border-bottom: ${pxToRem(3)} solid transparent;
  margin-top: ${pxToRem(2)};

  &:hover,
  &.active {
    border-color: white;
  }

  &:not(:last-of-type) {
    margin-right: ${pxToRem(30)}
  }
`;

function ProjectNavbarWide(props) {
  const {
    avatarSrc,
    backgroundSrc,
    navLinks,
    projectTitle,
    projectLink,
    ...otherProps
  } = props;

  return (
    <StyledHeaderWide {...otherProps}>
      <Background src={backgroundSrc} />
      <StyledWrapper>
        <StyledAvatar
          src={avatarSrc}
          projectTitle={projectTitle}
          size={80}
        />
        <ProjectTitle
          link={projectLink}
          title={projectTitle}
        />
        <Nav>
          {navLinks.map(link => <StyledNavLink key={link.url || link.to} {...link} />)}
        </Nav>
      </StyledWrapper>
    </StyledHeaderWide>
  );
}

ProjectNavbarWide.propTypes = {
  avatarSrc: PropTypes.string,
  backgroundSrc: PropTypes.string,
  navLinks: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string
  })),
  projectLink: PropTypes.string,
  projectTitle: PropTypes.string
};

export default ProjectNavbarWide;
