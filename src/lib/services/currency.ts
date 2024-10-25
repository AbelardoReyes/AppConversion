import axios from "axios";
const apiUrl = import.meta.env.VITE_APIKEY

export const GetExchangeRateAsync = async (baseCurrency: string, targetCurrency: string) => {
 try
 {
    const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiUrl}/pair/${baseCurrency}/${targetCurrency}`
      );
      return response.data;
 }
    catch (error)
    {
    }
};

export const GetStantarCurrency = async (newCurrency: string) => {
    try {
        const response = await axios.get(
            `https://v6.exchangerate-api.com/v6/${apiUrl}/latest/${newCurrency}`
        );
        return response;
    } catch (error) {
    }
};