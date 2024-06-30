import config from '@src/config'
import AnalyzeScreen from '@src/screen/AnalyzeScreen/AnalyzeScreen'
import HomeScreen from '@src/screen/HomeScreen/HomeScreen'
import DoneScreen from '@src/screen/SuccessScreen/SuccessScreen'

const publicRoutes = [
  { path: config.routes.HOME, component: HomeScreen },
  { path: config.routes.SUCCESS, component: DoneScreen },
  { path: config.routes.LANDINGPAGE, component: AnalyzeScreen },
  { path: config.routes.ANALYZE_ADMIN, component: AnalyzeScreen },
]
const privateRoutes = []
export { privateRoutes, publicRoutes }
