export function $ms (message, description) {
  this.$notification.success({
    message: message,
    description: description,
    duration: 2,
  })
}

export function $me (message, description) {
  this.$notification.error({
    message: message,
    description: description,
    duration: 2,
  })
}

export function $mi (message, description) {
  this.$notification.info({
    message: message,
    description: description,
    duration: 2,
  })
}

export function $mw (message, description) {
  this.$notification.warning({
    message: message,
    description: description,
    duration: 2,
  })
}


