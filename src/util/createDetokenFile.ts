import { BlockingListContent } from '@/types/DetokenizationType'
import zipPasswordFile from './zipPasswordFile'

export default function createDetokenFile(
  BlockingListContent: BlockingListContent
) {
  const buffer = new Buffer(BlockingListContent.content)
  const fileName = BlockingListContent.fileName
  const zipBlob = zipPasswordFile(
    buffer,
    `${fileName}.detok`,
    BlockingListContent.passphrase
  )

  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(zipBlob)

  link.download = fileName
  link.click()
}
