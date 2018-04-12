import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { zooTheme } from '../../../theme'

export default class MobilePreviewer extends Component {
  constructor(props) {
    super(props);
  }

  renderButtonContainer() {
      return (
        <div style={{display: 'flex', justifyContent: 'space-evenly' }} >
            <TealBox text={this.props.leftText} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px', width: '95px', boxShadow: '1px 1px 2px 0 rgba(0,0,0,0.5)' }} >
                <span> Field Guide </span>
            </div>
            <TealBox text={this.props.rightText} />
        </div>
      )
  }

  render() {
    return (
        <section style={{fontFamily: 'Karla'}}>
            <div style={{ height: 667, width: 375, backgroundColor: 'rgba(239,242,245,1)' }} >
                {/* navbar */}
                <div style={{ backgroundColor: zooTheme.colors.teal.mid }} >
                    <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: 32, paddingLeft: 25, paddingRight: 25 }} >
                        <i className="fa fa-chevron-left" style={{margin: 'auto 0', fontSize: 26, color: 'white'}} />
                        <span style={{flex: 1, textAlign: 'center', fontSize: 24, color: 'white' }}> {this.props.projectTitle} </span>
                        <i className="fa fa-bars" style={{margin: 'auto 0', fontSize: 26, color: 'white'}} />
                    </div>
                </div>
                {/* question view */}
                <div style={{flexDirection: 'column'}} >
                    <div style={{display: 'flex', justifyContent: 'center', paddingTop: 25 }}>
                        <div style={styles.questionView} >
                            {/* Question Header */}
                            <div style={{display: 'flex' }}>
                                <div style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                                    <span style={{fontSize: 14, color: 'black', paddingTop: 15, paddingBottom: 15 }}> Question </span>
                                </div>
                                <div style={styles.tutorialContainer}>
                                    <span style={{fontSize: 14, color: '#5C5C5C', paddingTop: 15, paddingBottom: 15 }}> Tutorial </span>
                                </div>
                            </div>
                            {/* Question */}
                            <div style={{ display: 'flex', paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 15 }} >
                                <span> {this.props.question} </span>
                            </div>
                            {/* image views */}
                            <ImageComponent />
                        </div>
                    </div>
                    <div style={{paddingTop: 15, paddingBottom: 15, display: 'flex', justifyContent: 'center' }}>
                        <span style={styles.needSomeHelpStyle}> NEED SOME HELP WITH THIS TASK? </span>
                    </div>
                    { this.renderButtonContainer() }
                </div>
            </div>
        </section>
    );
  }
}

const ImageComponent = () => {
    return (
        <div style={styles.behindImageContainer}>
            <img src="https://i.ytimg.com/vi/AzkEf84J6aY/hqdefault.jpg" style={{ maxHeight: '210px', maxWidth: '265px', objectFit: 'contain', flex: 1 }} />
            <img src="https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg" style={styles.inFrontImage} />
        </div>
    )
}

const TealBox = ({text}) => {
    return (
        <div style={styles.tealBoxContainer}>
            <span style={{color: 'white'}}> {text} </span>
        </div>
    )
}

const styles = {
    tealBoxContainer: {
        height: '40px',
        width: '95px',
        backgroundColor: zooTheme.colors.teal.mid,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12pt',
    },
    tutorialContainer: {
        display: 'flex', 
        flex: 1,
        justifyContent: 'center',
        border: '1px solid rgba(226,229,233,1)',
        backgroundColor: '#EFF2F5',
        boxShadow:'0 10px 20px 0 rgba(0,0,0,0.05)'
    },
    questionView: {
        height: 470,
        width: 325,
        borderColor: '#E2E5E9',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 10px 20px 0 rgba(0,0,0,0.05)',
        border: '1px solid rgba(226,229,233,1)',
        borderTopWidth: 0,
        borderRightWidth: 0
    },
    behindImageContainer: {
        justifyContent: 'center',
        display: 'flex',
        position: 'relative'
    }, 
    inFrontImage: {
        maxHeight: '234px',
        maxWidth: '295px',
        objectFit: 'contain',
        position: 'absolute',
        top: '15px'
    },
    needSomeHelpStyle: {
        color: 'rgba(0,93,105,1)',
        fontSize: '12px',
    }   
}

MobilePreviewer.propTypes = {
    leftText: PropTypes.string,
    rightText: PropTypes.string,
    projectTitle: PropTypes.string,
    question: PropTypes.string
};
  
  MobilePreviewer.defaultProps = {
    leftText: 'No',
    rightText: 'Yes',
    projectTitle: 'Project Title',
    question: 'Workflow question?'
  };
