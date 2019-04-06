export async function getLeftMenuData() {
  return [
    {
      title: 'Settings',
      key: 'settings',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
    {
      title: 'Documentation',
      key: 'documentation',
      url: 'https://docs.cleanuitemplate.com/react/getting-started',
      target: '_blank',
      icon: 'icmn icmn-books',
    },
    {
      divider: true,
    },
    {
      title: 'Dashboard',
      key: 'dashboard',
      url: '/dashboard/alpha',
      icon: 'icmn icmn-home',
    },
    {
      title: 'Clientes',
      key: 'Clients',
      url: '/dashboard/clients',
      icon: 'icmn icmn-users',
    },
  ]
}
export async function getTopMenuData() {
  return [
    {
      title: 'Settings',
      key: 'settings',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
    {
      title: 'Docs',
      key: 'documentation',
      url: 'https://docs.cleanuitemplate.com/react/getting-started',
      target: '_blank',
      icon: 'icmn icmn-books',
    },
    {
      title: 'Dashboards',
      key: 'dashboards',
      icon: 'icmn icmn-stack',
      children: [
        {
          title: 'Dashboard',
          key: 'dashboard',
          url: '/dashboard/alpha',
        },
        {
          title: 'Clientes',
          key: 'clients',
          url: '/dashboard/clients',
        },
      ],
    },
  ]
}
