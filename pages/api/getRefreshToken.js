import constants from "../../constants";
import axiosApiInstance from "./axios-instance";

const getRefreshToken = async (walletAddress) => {
  const result = await axiosApiInstance.get(`${constants.origin}/v1/auth/wallet-login?code=${walletAddress}`)

  if (result) {
    localStorage.setItem('tokens', JSON.stringify(result?.data?.tokens))
  }

  return {
    tokens: result?.data?.tokens
  }
}

export default getRefreshToken;