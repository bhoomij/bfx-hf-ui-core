import { connect } from 'react-redux'

import { handleActiveOrders } from '../../redux/actions/ao'
import { getActiveAlgoOrders } from '../../redux/selectors/ao'

import ActiveAlgoOrdersModal from './ActiveAlgoOrdersModal'

const mapStateToProps = (state = {}) => ({
  activeAlgoOrders: getActiveAlgoOrders(state),
})

const mapDispatchToProps = {
  handleActiveOrders,
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAlgoOrdersModal)
