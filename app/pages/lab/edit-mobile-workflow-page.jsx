import React from 'react';
import PropTypes from 'prop-types';
import apiClient from 'panoptes-client/lib/api-client';
import RetirementRulesEditor from '../../components/retirement-rules-editor';
import MobilePreviewer from './mobile/mobile_previewer';

export default class EditMobileWorkflowPage extends React.Component {
  constructor(props) {
    super();

    this.state = {
      projectSubjectSets: [],
      workflowSubjectSets: [],
      projectTutorials: [],
      workflowTutorials: [],
      showTutorials: false
    };

    this.showTutorials = this.showTutorials.bind(this);
    this.removeTutorial = this.removeTutorial.bind(this);
    this.addTutorial = this.addTutorial.bind(this);
  }

  componentDidMount() {
    this.props.project.get('subject_sets', { sort: 'display_name', page_size: 250 })
      .then((projectSubjectSets) => {
        this.setState({ projectSubjectSets });
      });
    this.props.workflow.get('subject_sets', { sort: 'display_name', page_size: 250 })
      .then((workflowSubjectSets) => {
        this.setState({ workflowSubjectSets });
      });
    apiClient.type('tutorials').get({ project_id: this.props.project.id, page_size: 100 })
      .then((projectTutorials) => {
        this.setState({ projectTutorials });
      });
    apiClient.type('tutorials').get({ workflow_id: this.props.workflow.id, page_size: 100 })
      .then((workflowTutorials) => {
        this.setState({ workflowTutorials });
      });
  }

  handleSubjectSetToggle(subjectSet, e) {
    const shouldAdd = e.target.checked;
    if (shouldAdd) {
      this.props.workflow.addLink('subject_sets', [subjectSet.id]);
    } else {
      this.props.workflow.removeLink('subject_sets', subjectSet.id);
    }
  }

  removeTutorial() {
    this.setState({ showTutorials: false });
    const currentTutorial = this.state.workflowTutorials[0];
    this.props.workflow.removeLink('tutorials', currentTutorial.id);
  }

  addTutorial(tutorial) {
    this.setState({ showTutorials: false });
    this.props.workflow.addLink('tutorials', [tutorial.id]);
  }

  showTutorials() {
    this.setState({ showTutorials: !this.state.showTutorials });
  }

  renderTutorial(tutorial) {
    return (
      <button onClick={this.addTutorial.bind(this, tutorial)}>
        {tutorial.display_name}
      </button>
    );
  }

  renderTutorials() {
    const tutorials = this.state.projectTutorials.filter((value) => {
      if (value.kind === "tutorial" || value.kind === null) {
        return value;
      }
    })
    const currentTutorial = this.state.workflowTutorials[0];

    return (
      <div className="tutorial-dropdown">
        <button onClick={this.showTutorials}>
          {currentTutorial ? currentTutorial.display_name : 'No Tutorial'}
          <i className="fa fa-chevron-down" />
        </button>
        {this.state.showTutorials && (
          <div className="tutorial-dropdown__menu" ref={(c) => { this.dropdown = c; }}>
            <button onClick={this.removeTutorial}>
              No Tutorial
            </button>
            {this.state.projectTutorials.map((tutorial, i) => this.renderTutorial(tutorial))}
          </div>
        )}
      </div>
    )
  }

  renderSubjectSets() {
    return (
      <table>
        <tbody>
          {this.state.projectSubjectSets.map((set) => {
            const assigned = this.state.workflowSubjectSets.includes(set);
            const toggle = this.handleSubjectSetToggle.bind(this, set);
            return (
              <tr key={set.id}>
                <td><input type="checkbox" checked={assigned} onChange={toggle} /></td>
                <td>{set.display_name} (#{set.id})</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    const { workflow } = this.props;

    return (
      <div className="mobile-workflow-edit">
        <span>{workflow.display_name}</span>

        <div className="mobile-workflow-edit__menu">
          <div>
            <span className="form-label">Associated subject sets</span>
            {this.renderSubjectSets()}
          </div>

          <div>
            <span className="form-label">Associated tutorial</span>
            <div>
              {this.renderTutorials()}
            </div>
          </div>

          <div>
            <span className="form-label">Retirement Rules</span><br />
            <RetirementRulesEditor workflow={this.props.workflow} />
          </div>
        </div>

        <MobilePreviewer />
      </div>
    );
  }
}

EditMobileWorkflowPage.propTypes = {
  workflow: PropTypes.shape({
    id: PropTypes.string
  })
};

EditMobileWorkflowPage.defaultProps = {
  workflow: null
};
