import Minizip from 'minizip-asm.js'

export default function zipPasswordFile(
  buffer: Buffer,
  fileName: string,
  password?: string
): Blob {
  const mz = new Minizip()
  mz.append(fileName, buffer, { password: password })
  const zip = mz.zip()
  const blob = new Blob([zip], { type: 'application/zip' })

  return blob
}
