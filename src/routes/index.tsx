import config from '@src/config'
import AmazonScreen from '@src/screen/AmazonScreen/AmazonScreen'
import HomeScreen from '@src/screen/HomeScreen/HomeScreen'
import DoneScreen from '@src/screen/SuccessScreen/SuccessScreen'

const publicRoutes = [
  { path: config.routes.HOME, component: HomeScreen },
  { path: config.routes.SUCCESS, component: DoneScreen },
  { path: config.routes.LANDINGPAGE, component: AmazonScreen },
  { path: config.routes.AMAZON_CHECKOUT, component: AmazonScreen },
]
const privateRoutes = []
export { privateRoutes, publicRoutes }
