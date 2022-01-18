import { isValidDate } from '../util/date'

export default (t) => ({
  label: t('orderForm.limitTitle'),
  uiIcon: 'limit-active',
  customHelp: t('orderForm.limitHelp'),
  id: 'limit',

  generateOrder: (data = {}, symbol, context) => {
    const {
      oco,
      hidden,
      postonly,
      tif,
      reduceonly,
      tifDate,
      ocoStop,
      price,
      amount,
      lev,
      visibleOnHit,
    } = data

    if (tif && (!isValidDate(tifDate) || tifDate === 0)) {
      throw new Error('TIF date required')
    }

    const orderDefinition = {
      type: context === 'm' || context === 'f' ? 'LIMIT' : 'EXCHANGE LIMIT',
      price,
      amount,
      hidden,
      symbol,
      postonly,
      oco,
      reduceonly,
      visibleOnHit,
    }

    if (oco) {
      orderDefinition.priceAuxLimit = ocoStop
    }

    if (tif) {
      orderDefinition.tif = new Date(+tifDate).toISOString()
    }

    if (context === 'f') {
      orderDefinition.lev = lev
    }

    if (hidden && visibleOnHit) {
      orderDefinition.visibleOnHit = true
    } else {
      orderDefinition.visibleOnHit = false
    }

    return orderDefinition
  },

  header: {
    component: 'ui.checkbox_group',
    fields: ['oco', 'hidden', 'postonly', 'tif', 'reduceonly', 'visibleOnHit'],
  },

  sections: [
    {
      title: '',
      name: 'general',
      rows: [['price', 'amount']],
    },
    {
      title: '',
      name: 'tif',
      fullWidth: true,
      rows: [['tifDate']],

      visible: {
        tif: { eq: true },
      },
    },
    {
      title: '',
      name: 'oco',
      rows: [['ocoStop', null]],

      visible: {
        oco: { eq: true },
      },
    },
    {
      title: '',
      name: 'lev',
      fullWidth: true,
      rows: [['lev']],

      visible: {
        _context: { eq: 'f' },
      },
    },
    {
      title: '',
      name: 'ticker',
      fullWidth: true,
      rows: [['ticker']],
    },
  ],

  fields: {
    reduceonly: {
      component: 'input.checkbox',
      label: t('orderForm.reduceOnlyCheckbox'),
      customHelp: t('orderForm.reduceOnlyMessage'),
      trading: ['m', 'f'],
      default: false,
      visible: {
        _orderEditing: { neq: true },
      },
    },

    hidden: {
      component: 'input.checkbox',
      label: t('orderForm.hiddenCheckbox'),
      customHelp: t('orderForm.hiddenMessage'),
      default: false,
    },

    visibleOnHit: {
      component: 'input.checkbox',
      label: t('orderForm.visibleOnHit'),
      customHelp: t('orderForm.visibleOnHitHelp'),
      default: false,
      visible: {
        hidden: { eq: true },
      },
    },

    oco: {
      component: 'input.checkbox',
      label: t('orderForm.ocoCheckbox'),
      customHelp: t('orderForm.ocoMessage'),
      default: false,
      visible: {
        _orderEditing: { neq: true },
      },
    },

    postonly: {
      component: 'input.checkbox',
      label: t('orderForm.postOnlyCheckbox'),
      customHelp: t('orderForm.postOnlyMessage'),
      default: false,
      visible: {
        _orderEditing: { neq: true },
      },
    },

    tif: {
      component: 'input.checkbox',
      label: t('orderForm.tifCheckbox'),
      customHelp: t('orderForm.tifMessage'),
      default: false,
      visible: {
        _orderEditing: { neq: true },
      },
    },

    price: {
      component: 'input.price',
      label: `${t('table.price')} $QUOTE`,
    },

    ocoStop: {
      component: 'input.price',
      label: `${t('orderForm.ocoStop')} $QUOTE`,
    },

    amount: {
      component: 'input.amount',
      label: `${t('table.amount')} $BASE`,
    },

    tifDate: {
      component: 'input.date',
      label: t('orderForm.tifDate'),
      default: new Date(Date.now() + 86400000),
      minDate: new Date(),
    },

    lev: {
      component: 'input.range',
      label: t('orderForm.laverage'),
      min: 1,
      max: 100,
      default: 10,
    },

    ticker: {
      component: 'ui.ticker',
    },
  },

  actions: ['buy', 'sell'],
})
