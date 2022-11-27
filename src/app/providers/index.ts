import compose from 'compose-function'
import mantineSettings from './mantineSettings'
import reactQuery from './reactQuery'

export const withHocs = compose(mantineSettings, reactQuery)
