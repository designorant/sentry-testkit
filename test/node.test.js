const NodeSentry = require('@sentry/node')
const sentryTestkit = require('../src/index')
const { createCommonTests } = require('./commonTests')

require('@sentry/tracing')

const { testkit, sentryTransport } = sentryTestkit()
const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001'
const Sentry = NodeSentry

describe('sentry test-kit test suite - @sentry/node', function() {
  beforeAll(() =>
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      tracesSampleRate: 1,
      transport: sentryTransport,
      beforeSend(event) {
        event.extra = { os: 'mac-os' }
        return event
      },
    })
  )

  beforeEach(() => testkit.reset())

  createCommonTests({ Sentry, testkit })
})
