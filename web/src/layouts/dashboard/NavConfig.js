// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
    visible: false
  },
  {
    title: 'take-action',
    path: '/dashboard/take-action',
    icon: getIcon('eva:people-fill'),
    visible: false
  },
  {
    title: 'allocate-space',
    path: '/dashboard/allocate-space',
    icon: getIcon('eva:shopping-bag-fill'),
    visible: false
  },
  {
    title: 'book-seat',
    path: '/dashboard/book-seat',
    icon: getIcon('eva:shopping-bag-fill'),
    visible: true
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
    visible: true
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
    visible: true
  },
  {
    title: 'logout',
    path: '/login',
    icon: getIcon('ant-design:logout-outlined'),
    visible: false
  }
];
function checkIfScreenShouldBeVisible(item,employeeData){
  let isVisible = item.visible;
  if(item.title === 'dashboard'){
    // TODO: check if user is logged in
    const isUserLoggedIn = sessionStorage.getItem('isUserLoggedIn')
    isVisible = isUserLoggedIn
  }
  if(item.title === 'take-action' || item.title === 'allocate-space'){
    if(employeeData.role === 'space-manager' || employeeData.role === 'space-owner'){
      isVisible = true
    }
  }

  return isVisible
}

export function createNavConfig(employeeData){
  const mNavConfig =  navConfig.map((item)=>{
    return {
      ...item,
      visible: checkIfScreenShouldBeVisible(item,employeeData)
    }
  })
  return mNavConfig
}
