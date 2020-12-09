export default  {
  items: [
    {
      name: 'الصفحه الرئيسيه',
      url: '/user/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'المصروفات',
      icon: 'icon-cursor',
      children: [
        {
          name: 'اضافة مصروفات',
          url: '/user/add-expenses',
          icon: 'icon-cursor',
        },
        {
          name: 'جميع مصروفات',
          url: '/user/get-expenses',
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
          url: '/user/add-order',
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
          url: '/user/get-orders',
          icon: 'icon-cursor',
        }
      ],
    },
  ]
};
