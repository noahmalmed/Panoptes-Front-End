import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar';
import Background from '../Background';
import NarrowMenu from './NarrowMenu';
import NarrowMenuButton from './NarrowMenuButton';
import ProjectTitle from '../ProjectTitle';
import { pxToRem } from '../../../../../../theme';
import StyledHeader from '../StyledHeader';
import Wrapper from '../Wrapper';

export const StyledBackground = styled(Background)`
  z-index: 20;
  box-shadow: 0 ${pxToRem(2)} ${pxToRem(4)} 0 rgba(0,0,0,0.5);
`;

export const StyledOuterWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  position: relative;
  z-index: 30;
`;

export const StyledInnerWrapper = Wrapper.extend`
  flex-direction: column;
  justify-content: center;
  padding: ${pxToRem(20)} 0;
`;

class ProjectNavbarNarrow extends Component {
  constructor() {
    super();
    this.handleOpen = this.handleOpen.bind(this);
    this.state = {
      menuOpen: false
    };
  }

  handleOpen() {
    this.setState((prevState) => {
      return { menuOpen: !this.state.menuOpen };
    });
  }

  render() {
    const { avatarSrc, backgroundSrc, projectLink, projectTitle, navLinks } = this.props;
    return (
      <StyledHeader>
        <NarrowMenu
          toggleMenuFn={this.handleOpen}
          open={this.state.menuOpen}
          links={navLinks}
        />

        <StyledBackground src={backgroundSrc} />

        <StyledOuterWrapper>
          <StyledInnerWrapper>
            <Avatar
              src={avatarSrc}
              projectTitle={projectTitle}
            />
            <ProjectTitle
              link={projectLink}
              title={projectTitle}
            />
            <NarrowMenuButton
              open={this.state.menuOpen}
              onClick={this.handleOpen}
            />
          </StyledInnerWrapper>
        </StyledOuterWrapper>

      </StyledHeader>
    );
  }
}

ProjectNavbarNarrow.defaultProps = {
  avatarSrc: '',
  backgroundSrc: '',
  navLinks: [
    { url: '' }
  ],
  projectLink: '',
  projectTitle: ''
};

ProjectNavbarNarrow.propTypes = {
  avatarSrc: PropTypes.string,
  backgroundSrc: PropTypes.string,
  navLinks: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string
  })),
  projectLink: PropTypes.string,
  projectTitle: PropTypes.string
};

export default ProjectNavbarNarrow;
