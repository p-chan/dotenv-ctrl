export const toObject = ({ key, value }: { key: string; value: string }) => {
  const data: any = {}

  data[key] = value

  return data as { [key: string]: string }
}
