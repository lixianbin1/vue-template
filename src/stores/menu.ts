// @unocss-include
const common = [
  {
    index: '/DataSubmission',
    icon: 'i-grommet-icons:document-update',
    title: 'menu.DataSubmission',
  },
  {
    index: '/DataCorrection',
    icon: 'i-carbon:change-catalog',
    title: 'menu.DataCorrection',
  },
]

// user
export const userList = [
  ...common,
]

// admin
export const adminList = [
  ...common,
  {
    index: '/Encryption',
    icon: 'i-material-symbols:credit-score-outline',
    title: 'menu.Encryption',
    children: [
      {
        index: '/Encryption',
        title: 'menu.Encryption',
      },
      {
        index: '/Encryption/info',
        title: 'menu.EncryptionInfo',
      },
    ],
  },
]