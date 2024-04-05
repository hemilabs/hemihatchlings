const network = import.meta.env.VITE_CHAIN_NETWORK

export const getImage = (name: string) => {
  return `./${network}/${name}`
}
