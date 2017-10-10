import React from 'react';
import merge from 'lodash/merge';
import translations from '../../pages/project/translations';

function TaskTranslations(props) {
  const { task } = props;
  const taskStrings = translations.strings.workflow.tasks;
  let translation = merge({}, task);

  function explodeTranslationKey(translationKey, value) {
    const translationKeys = translationKey.split('.');
    const translationObject = {};
    let temp = translationObject;
    while (translationKeys.length) {
      temp[translationKeys[0]] = (translationKeys.length === 1) ? value : {};
      temp = temp[translationKeys[0]];
      translationKeys.shift();
    }
    return translationObject;
  }

  Object.keys(taskStrings).map((translationKey) => {
    const newTranslation = explodeTranslationKey(translationKey, taskStrings[translationKey]);
    if (newTranslation[props.taskKey]) {
      translation = merge(translation, newTranslation[props.taskKey]);
    }
  });

  return React.cloneElement(props.children, { translation });
}

TaskTranslations.propTypes = {
  children: React.PropTypes.node,
  task: React.PropTypes.shape({
    answers: React.PropTypes.array,
    question: React.PropTypes.string
  }),
  taskKey: React.PropTypes.string
};

export default TaskTranslations;
