function reduceError(
  ex,
  entity='record',
  action='process',
  logger=console.error
) {
  if (typeof ex == 'string') {
    return {
      title: 'An error occurred',
      message: ex
    }
  }
  if (!ex.response) {
    logger(`Error ${action} ${entity} -`, ex)
    if (ex.message === 'Network Error') {
      return {
        title: '\uD83D\uDD0C Network Error',
        message: 'You are having network issues, check your Internet connection.',
        cause: ex
      }
    }
    if (ex.message) {
      return {
        title: 'Unexpected error',
        message: ex.message,
        cause: ex
      }
    }
    return {
      title: 'Unknown error',
      message: `An error occurred trying to ${action} the ${entity}. Try again later.`,
      cause: ex
    }
  }
  if (ex.response.status === 403) {
    return {
      title: 'Access denied',
      message: `You are not authorized to ${action} this ${entity}.`,
      cause: ex
    }
  }
  if (ex.response.status === 412) {
    return {
      title: 'Access denied',
      message: `Unable to ${action} the ${entity}. Your copy is stale.`,
      cause: ex
    }
  }

  logger(`Unknown error ${action} ${entity} -`, ex)
  return  {
    title: 'Unknown error',
    message: `An error occurred trying to ${action} the ${entity}. Try again later.`,
    cause: ex
  }
}

export {reduceError}
