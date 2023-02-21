import _  from 'lodash'

function getTargetValue(target, emptyToNull = false) {
  if (target.type === "checkbox") return target.checked
  if (target.type === "select-multiple") {
    const values = []
    for (let i = 0; i < target.options.length; i++) {
      if (target.options[i].selected) {
        values.push(target.options[i].value)
      }
    }
    return values
  }
  if (target.type === "select-one" && target.value === "") {
    return null
  }
  if (emptyToNull && target.value === "") {
    return null
  }
  return target.value
}

function applyEventToState(event, state, stateElName, setState) {
  const stateEl = _.cloneDeep(state[stateElName])
  const name = event.target.name
  const value = getTargetValue(event.target, true)
  _.set(stateEl, name, value)
  const stateElNameRoot = stateElName.split('.')[0]
  setState({[stateElNameRoot]: stateEl})
}

export {getTargetValue, applyEventToState}
