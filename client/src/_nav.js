export default {
  items: [
    {
      name: 'الصفحة الرئيسية',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'المستخدمين',
      icon: 'icon-cursor',
      children: [
        {
          name: 'اضافة مستخدم كاشير',
          url: '/register-user',
          icon: 'icon-cursor',
        },
        {
          name: 'جميع مستخدمين الكاشير',
          url: '/all-users',
          icon: 'icon-cursor',
        }
      ],
    },
    {
      name: 'الأصناف',
      icon: 'icon-cursor',
      children: [
        {
          name: 'اضافة صنف',
          url: '/add-product',
          icon: 'icon-cursor',
        }
      ],
    },
    {
      name: 'المصروفات',
      icon: 'icon-cursor',
      children: [
        {
          name: 'اضافة مصروفات',
          url: '/add-expenses',
          icon: 'icon-cursor',
        },
        {
          name: 'جميع مصروفات',
          url: '/get-expenses',
          icon: 'icon-cursor',
        }
      ],
    },
    {
      name: 'الكاشير',
      icon: 'icon-cursor',
      children: [
        {
          name: 'اضافة اوردر',
          url: '/add-order',
          icon: 'icon-cursor',
        }
      ],
    },
    {
      name: 'المبيعات',
      icon: 'icon-cursor',
      children: [
        {
          name: 'تقرير المبيعات',
          url: '/get-orders',
          icon: 'icon-cursor',
        }
      ],
    },
  ]
};
