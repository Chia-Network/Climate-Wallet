import { CW_LINK } from '@/constants/link'
import { getConfig } from '@/util/yamlConfigLoader'

export default function getCWLink() {
  return getConfig().cadtUiHost || CW_LINK
}
