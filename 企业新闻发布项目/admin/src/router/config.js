import Home from '../views/home//Home.vue'
import Center from '../views/center/Center.vue'
import UserAdd from '../views/user-manage/UserAdd.vue'
import UserList from '../views/user-manage/UserList.vue'
import NewsAdd from '../views/news-manage/NewsAdd.vue'
import NewsList from '../views/news-manage/NewsList.vue'
import NewsEdit from '../views/news-manage/NewsEdit.vue'
import ProductAdd from '../views/product-manage/ProductAdd.vue'
import ProductLsit from '../views/product-manage/ProductList.vue'
import ProductEdit from '../views/product-manage/ProductEdit.vue'
import NotFound from '../views/NotFound.vue'
/* 注意path中添加'/'和不添加''的区别
  '/index'：代表放在MainBox组件中显示，但是路径为http://xxx:8080/index
  'index'：代表放在MainBox组件中显示，但是路径为http://xxx:8080/mainbox/index
*/
const MyConfigRoutes = [
  {
    path: '/:pathMatch(.*)*', //匹配任意长度的路径
    name: "NotFount",
    component: NotFound
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Home
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/user-manage/useradd',
    component: UserAdd,
    meta: {
      isAuth: true
    }
  },
  {
    path: '/user-manage/userlist',
    component: UserList,
    meta: {
      isAuth: true
    }
  },
  {
    path: '/news-manage/newsadd',
    component: NewsAdd
  },
  {
    path: '/news-manage/newslist',
    component: NewsList
  },
  {
    path: '/news-manager/editnews/:id',
    component: NewsEdit
  },
  {
    path: '/product-manage/productadd',
    component: ProductAdd
  },
  {
    path: '/product-manage/productlist',
    component: ProductLsit
  },
  {
    path: '/product-manage/productEdit/:id',
    component: ProductEdit
  }
]
export default MyConfigRoutes

