export function $ms (message, description) {
  this.$notification.success({
    message: message,
    description: description,
  })
}

export function $me (message, description) {
  this.$notification.error({
    message: message,
    description: description,
  })
}

export function $mi (message, description) {
  this.$notification.info({
    message: message,
    description: description,
  })
}

export function $mw (message, description) {
  this.$notification.warning({
    message: message,
    description: description,
  })
}


