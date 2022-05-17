import axiosApiInstance from "./axios-instance";

const getRefreshToken = async (walletAddress) => {
  if (walletAddress) {
    const result = await axiosApiInstance.get(`${process.env.API}/v1/auth/wallet-login?code=${walletAddress}`)

    if (result) {
      localStorage.setItem('tokens', JSON.stringify(result?.data?.tokens))
    }

    return result?.data?.tokens || null
  }

  return null
}

export default getRefreshToken;