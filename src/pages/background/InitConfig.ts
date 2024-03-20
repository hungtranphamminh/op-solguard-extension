import { LocalStorage } from '@src/utils/localStorage'

export const InitConfig = async () => {
  for (let i = 1; i <= 3; i++) {
    await LocalStorage.setConfigStatus(i, 1)
  }
}
